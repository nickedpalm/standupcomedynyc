#!/usr/bin/env node
// Publish cards to Instagram through the Instagram API with Instagram Login.
//   node scripts/ig-post.js --tonight [--date=YYYY-MM-DD]     carousel: cover + up to 9 pick cards, one post
//   --no-mix  skip the per-venue cap and house interleaving (raw start-time order)
//   node scripts/ig-post.js --pick <id> [--caption="..."]      single image post for one pick
//   node scripts/ig-post.js --image=URL --caption="..."        any hosted JPEG
//   --story                                                    post as a story instead of a feed post
//   --dry-run                                                  print what would be posted, call nothing
//   --refresh-token                                            extend the long-lived token by 60 days
// Env: IG_ACCESS_TOKEN, IG_USER_ID. Optional IG_TOKEN_FILE (path to write a refreshed token).
// Every publish is appended to POSTED-IG.json; a pick already posted the same day is refused.
'use strict';
require('./env.js')(['IG_ACCESS_TOKEN', 'IG_USER_ID']);
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const SITE = 'https://standupcomedynyc.com';
const API = 'https://graph.instagram.com/v23.0';
const logFile = path.join(root, 'POSTED-IG.json');

const args = { pick: [] };
for (const a of process.argv.slice(2)) {
  const m = a.match(/^--([a-z-]+)(?:=(.*))?$/);
  if (!m) { if (args._last === 'pick') args.pick.push(a); continue; }
  if (m[1] === 'pick') { if (m[2]) args.pick.push(m[2]); args._last = 'pick'; continue; }
  args[m[1]] = m[2] ?? true; args._last = m[1];
}
const dryRun = Boolean(args['dry-run']);
const token = process.env.IG_ACCESS_TOKEN, userId = process.env.IG_USER_ID;
if (!dryRun && (!token || !userId)) { console.error('ig-post: IG_ACCESS_TOKEN and IG_USER_ID must be set'); process.exit(2); }

const nyDate = (d = new Date()) => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
const longDate = (day) => new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'long', month: 'long', day: 'numeric' }).format(new Date(day + 'T12:00:00-04:00'));
const picks = JSON.parse(fs.readFileSync(path.join(root, 'web', 'data', 'picks.json'), 'utf8'));
const venuesByName = new Map(JSON.parse(fs.readFileSync(path.join(root, 'web', 'data', 'venues.json'), 'utf8')).map((v) => [v.name, v]));
const { selectTonight } = require('./tonight-set.js');
const { firstSentence } = require('./blurb.js');
const { tonightCaption, LIMIT } = require('./caption.js');
const log = fs.existsSync(logFile) ? JSON.parse(fs.readFileSync(logFile, 'utf8')) : [];
// The URL carries a content hash so Instagram and the CDN never reuse a cached copy of an older render.
const crypto = require('crypto');
const cardUrl = (id) => { const f = path.join(root, 'web', 'assets', 'ig', id + '.jpg'); const v = fs.existsSync(f) ? crypto.createHash('md5').update(fs.readFileSync(f)).digest('hex').slice(0, 10) : Date.now(); return `${SITE}/assets/ig/${id}.jpg?v=${v}`; };
const cardExists = (id) => fs.existsSync(path.join(root, 'web', 'assets', 'ig', id + '.jpg'));

async function api(pathname, params, method = 'POST') {
  const url = new URL(API + pathname);
  const body = new URLSearchParams({ ...params, access_token: token });
  const res = method === 'GET' ? await fetch(url + '?' + body) : await fetch(url, { method, body });
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(`${pathname}: ${data.error?.message || res.status}`);
  return data;
}
async function waitReady(containerId) {
  for (let i = 0; i < 20; i++) {
    const s = await api(`/${containerId}`, { fields: 'status_code,status' }, 'GET');
    if (s.status_code === 'FINISHED') return;
    if (s.status_code === 'ERROR' || s.status_code === 'EXPIRED') throw new Error(`container ${containerId} ${s.status_code}: ${s.status || ''}`);
    await new Promise((r) => setTimeout(r, 3000));
  }
  throw new Error(`container ${containerId} not ready after 60s`);
}
async function recentDuplicate(caption, kind) {
  // API-side guard: refuse if the account already has a post of the same kind with the same first line in the last 3 hours.
  try {
    const r = await api(`/${userId}/media`, { fields: 'id,caption,media_type,timestamp,permalink', limit: 10 }, 'GET');
    const firstLine = String(caption || '').split('\n')[0].trim();
    const since = Date.now() - 3 * 3600 * 1000;
    return (r.data || []).find((m) => Date.parse(m.timestamp) >= since && (kind === 'story' ? false : String(m.caption || '').split('\n')[0].trim() === firstLine && firstLine)) || null;
  } catch { return null; }
}
// Stories are not in /{user-id}/media, so the guard above never saw them: a failed-then-published story could be
// published twice. Guard on the account's live stories instead.
async function storySince(sinceIso) {
  try {
    const r = await api(`/${userId}/stories`, { fields: 'id,media_type,timestamp,permalink' }, 'GET');
    const since = Date.parse(sinceIso);
    return (r.data || []).find((m) => Date.parse(m.timestamp) >= since) || null;
  } catch { return null; }
}
// media_publish sometimes returns an error even though Instagram created the item. Look for the item that
// actually went up instead of declaring failure and leaving the log unwritten.
async function findJustPublished(kind, sinceIso) {
  try {
    const since = Date.parse(sinceIso);
    if (kind === 'story') {
      const s = await api(`/${userId}/stories`, { fields: 'id,media_type,timestamp,permalink' }, 'GET');
      const hit = (s.data || []).find((m) => Date.parse(m.timestamp) >= since);
      return hit ? { id: hit.id, permalink: hit.permalink } : null;
    }
    const r = await api(`/${userId}/media`, { fields: 'id,media_type,timestamp,permalink', limit: 10 }, 'GET');
    // Only a published album counts. Carousel children are published as containers, not feed albums.
    const hit = (r.data || []).find((m) => Date.parse(m.timestamp) >= since && m.media_type === 'CAROUSEL_ALBUM');
    return hit ? { id: hit.id, permalink: hit.permalink } : null;
  } catch { return null; }
}
async function publish(kind, items, caption, meta) {
  if (!dryRun) {
    const dup = await recentDuplicate(caption, kind);
    if (dup) { console.error(`ig-post: refusing; the same post went up ${dup.timestamp} (${dup.permalink})`); process.exit(1); }
    // Stories never appear in /{user-id}/media, so the guard above cannot see them. Check live stories.
    if (kind === 'story') {
      const live = await storySince(new Date(Date.now() - 20 * 3600 * 1000).toISOString());
      if (live) { console.error(`ig-post: refusing; a story already went up ${live.timestamp} (${live.permalink})`); process.exit(1); }
    }
  }
  if (dryRun) { console.log(`[dry-run] ${kind}\n  ${items.join('\n  ')}\n--- caption ---\n${caption}\n--- end ---`); return null; }
  // Instagram rejects a caption over 2200 characters. Fail loudly before the API call
  // rather than after Instagram has already created the carousel container.
  if (caption.length > LIMIT) { console.error(`ig-post: caption is ${caption.length} characters, over Instagram's ${LIMIT}-character limit`); process.exit(1); }
  const startedAt = new Date().toISOString();
  let container;
  if (kind === 'carousel') {
    const children = [];
    for (const url of items) { const c = await api(`/${userId}/media`, { image_url: url, is_carousel_item: 'true' }); await waitReady(c.id); children.push(c.id); }
    container = await api(`/${userId}/media`, { media_type: 'CAROUSEL', children: children.join(','), caption });
  } else if (kind === 'story') {
    container = await api(`/${userId}/media`, { image_url: items[0], media_type: 'STORIES' });
  } else {
    container = await api(`/${userId}/media`, { image_url: items[0], caption });
  }
  await waitReady(container.id);
  let result;
  try {
    result = await api(`/${userId}/media_publish`, { creation_id: container.id });
  } catch (e) {
    // Instagram can create the item and still answer with an error. If the item actually went up, log it
    // instead of leaving POSTED-IG.json unwritten and letting the next run publish it again.
    const found = await findJustPublished(kind, startedAt);
    if (!found) throw e;
    console.error(`ig-post: media_publish reported "${e.message}" but the item did go up as ${found.id}`);
    result = found;
  }
  let permalink = result.permalink || null;
  if (!permalink) { try { permalink = (await api(`/${result.id}`, { fields: 'permalink' }, 'GET')).permalink; } catch {} }
  const entry = { id: result.id, permalink, kind, posted_at: new Date().toISOString(), items, ...meta };
  log.push(entry); fs.writeFileSync(logFile, JSON.stringify(log, null, 1) + '\n');
  console.log(`posted ${kind} ${result.id}${permalink ? ' ' + permalink : ''}`);
  return result.id;
}
const alreadyToday = (pickIds, kind) => log.find((e) => e.kind === kind && e.posted_at.slice(0, 10) === new Date().toISOString().slice(0, 10) && (e.picks || []).some((p) => pickIds.includes(p)));
const hashtags = '#nyccomedy #nycstandup #brooklyncomedy #standupnyc';
const blurb = (p) => firstSentence(p.description, 240, 240);
const clock = (p) => { const t = p.time_label.split(' · ')[0]; return t.includes(':') ? t.replace(/\s*(am|pm)$/i, '') : t; };
const weekdayOf = (day) => new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'long' }).format(new Date(day + 'T12:00:00-04:00'));
// Every neighborhood on the board tonight, joined so the list reads as English.
// Capped at 4 so a crowded night cannot turn the closing line into a paragraph.
const p0 = (list) => {
  const hoods = [...new Set(list.map((p) => p.neighborhood))];
  const shown = hoods.length > 4 ? hoods.slice(0, 4) : hoods;
  if (shown.length === 1) return shown[0];
  return shown.slice(0, -1).join(', ') + ' and ' + shown[shown.length - 1];
};
const bets = (n) => n === 1 ? 'One good bet.' : n === 2 ? 'Two good bets.' : n === 3 ? 'Three good bets.' : `${n} good bets.`;
const credits = (list) => { const c = [...new Set(list.filter((p) => p.poster && p.poster.credit).map((p) => p.poster.credit.replace(/^(Artwork|Photo|Poster):\s*/i, '')))]; return c.length ? `\n\nArt: ${c.join(' · ')}` : ''; };

(async () => {
  if (args['refresh-token']) {
    const r = await fetch(`${API.replace('/v23.0', '')}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`).then((x) => x.json());
    if (r.error) throw new Error(r.error.message);
    if (process.env.IG_TOKEN_FILE) fs.writeFileSync(process.env.IG_TOKEN_FILE, r.access_token + '\n', { mode: 0o600 });
    console.log(`token refreshed; expires in ${Math.round(r.expires_in / 86400)} days${process.env.IG_TOKEN_FILE ? ', written to IG_TOKEN_FILE' : ' (not saved: set IG_TOKEN_FILE)'}`);
    return;
  }
  const day = args.date || nyDate();
  if (args.tonight) {
    // Same selection ig-card.js uses to render, so the posted carousel matches the cards on disk.
    const list = selectTonight(picks, venuesByName, day, { mix: !args['no-mix'] });
    if (!list.length) { console.error(`ig-post: no picks with tickets left on ${day}`); process.exit(1); }
    const storyId = 'story-' + day;
    const ids = args.story && cardExists(storyId) ? [storyId] : ['tonight-' + day, ...list.slice(0, 9).map((p) => p.id)];
    const missing = ids.filter((id) => !cardExists(id));
    if (missing.length) { console.error(`ig-post: cards not rendered yet: ${missing.join(', ')} (run npm run ig-card -- --tonight, commit and push first)`); process.exit(1); }
    const kind = args.story ? 'story' : 'carousel';
    if (!dryRun && alreadyToday(list.map((p) => p.id), kind)) { console.error('ig-post: tonight already posted today'); process.exit(1); }
    const caption = args.caption || (() => {
      const { caption, cap, dropped } = tonightCaption(list, day);
      if (dropped.length) console.error(`ig-post: caption over ${LIMIT} chars; dropped the blurb for ${dropped.join(', ')}`);
      else if (cap < 240) console.error(`ig-post: caption over ${LIMIT} chars at blurb cap ${cap}`);
      return caption;
    })();
    await publish(kind, args.story ? [cardUrl(ids[0])] : ids.map(cardUrl), caption, { picks: list.map((p) => p.id), date: day });
    return;
  }
  for (const id of args.pick) {
    const p = picks.find((r) => r.id === id);
    if (!p) { console.error(`ig-post: unknown pick ${id}`); process.exit(1); }
    if (!cardExists(id)) { console.error(`ig-post: card not rendered for ${id}`); process.exit(1); }
    const kind = args.story ? 'story' : 'image';
    if (!dryRun && alreadyToday([id], kind)) { console.error(`ig-post: ${id} already posted today`); process.exit(1); }
    const caption = args.caption || `${p.title}\n${longDate(p.date)} · ${p.time_label} · ${p.venue}, ${p.neighborhood}\n${p.price_label}${p.sponsored ? '\n\nPaid listing.' : ''}\n\n${p.description}\n\nTickets at standupcomedynyc.com, link in bio.${credits([p])}\n\n${hashtags}`;
    await publish(kind, [cardUrl(id)], caption, { picks: [id], date: p.date });
  }
  if (args.image) {
    if (!args.caption && !args.story) { console.error('ig-post: --image needs --caption'); process.exit(1); }
    await publish(args.story ? 'story' : 'image', [args.image], args.caption || '', {});
  }
  if (!args.tonight && !args.pick.length && !args.image) { console.error('ig-post: nothing to do (use --tonight, --pick <id> or --image=URL)'); process.exit(2); }
})().catch((e) => { console.error('ig-post:', e.message); process.exit(1); });
