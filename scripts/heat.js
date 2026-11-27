#!/usr/bin/env node
// Heat: a transparent demand score for every upcoming pick, from signals we can actually read.
//   - ticket availability from the Eventbrite page's structured data (SoldOut / LimitedAvailability / InStock)
//   - a second show of the same title at the same room on the same day (our picks + candidates/eventbrite.json)
//   - Wikipedia pageviews for the performer, last 30 days vs the 30 before (touring names only)
//   - how many rooms list the performer this month (picks + Eventbrite leads)
//   - Reddit mentions in the last 30 days when REDDIT_CLIENT_ID / REDDIT_CLIENT_SECRET are set (scripts/reddit.js)
// Writes candidates/heat.json (for the editor) and sets `demand` on picks.json: "sold_out", "going_fast" or null,
// with demand_checked. Only availability and a second show drive the reader-facing tag. Run with `npm run heat`.
'use strict';
require('./env.js')(['REDDIT_CLIENT_ID', 'REDDIT_CLIENT_SECRET']);
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const { buzz } = require('./reddit.js');
const UA = 'standupcomedynyc.com heat check (info@standupcomedynyc.com) Mozilla/5.0';
const headers = { 'User-Agent': UA, 'Accept': 'text/html,application/json' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const picksFile = path.join(root, 'web', 'data', 'picks.json');
const picks = JSON.parse(fs.readFileSync(picksFile, 'utf8'));
const leads = fs.existsSync(path.join(root, 'candidates', 'eventbrite.json')) ? JSON.parse(fs.readFileSync(path.join(root, 'candidates', 'eventbrite.json'), 'utf8')).events : [];
const today = new Date().toISOString().slice(0, 10);
const norm = (s) => String(s || '').toLowerCase().replace(/[’']/g, "'").replace(/\s*[:–—-].*$/, '').replace(/\b(live|presents.*|headlines.*|in the round|special taping|tries out new ideas)\b.*/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const ebId = (u) => ((String(u || '').match(/tickets-(\d+)|wfea_eb_id=(\d+)/) || []).slice(1).find(Boolean)) || null;
const NOT_A_NAME = /\b(comedy|show|night|live|club|architecture|game|party|hour|tour|special|presents|festival|showcase|open|mic|the|an|a|of|and|with|in|at|for|from|to|vs|trivia|taping|drinking|fun|looking|laugh|laughs|whine|list|bisque|charity|obey|advance|fun|moderation|invisible|jokes|jranks|backroom|wits|end|stand|up|sorry|here|fix|laff|spell|checc|voices|cabaret|interview|experts|watch|dating|story|facts|machine|major|just)\b/i;
const performer = (title) => { const t = String(title || ''); const m = t.match(/^([A-Z][a-z]+(?: [A-Z][a-zA-Z'’.-]+){1,2})(?::| Live| Presents| Headlines|$)/); if (!m) return null; const name = m[1]; return NOT_A_NAME.test(name) ? null : name; };

// A title can name a brand before "Presents with" and put the actual performers after it
// ("Steve Martin Presents with Andrew Dismukes and Michael Good"). The brand is not on the bill,
// so credit the hosts instead of the brand. Mirrors the same fix in research-plan.js.
const HOSTED_WITH = /^.+?\bPresents with\s+(.+)$/;
const performers = (title) => {
  const hosted = String(title || '').trim().match(HOSTED_WITH);
  if (hosted) {
    return hosted[1]
      .split(/\s+(?:and|with|w\/|&)\s+/i)
      .map((s) => s.trim())
      .filter((s) => s && s.length <= 40 && !NOT_A_NAME.test(s));
  }
  const name = performer(title);
  return name ? [name] : [];
};

// Eventbrite shows can be listed under a vanity domain (e.g. silverman_ip.eventbrite.com) instead of
// the canonical /e/ path, so resolve the vanity URL to its event id before deciding we cannot read it.
// A venue can also hand out the event id in its own link: Littlefield's ticket pages carry it as
// ?wfea_eb_id=2003588724811. That id IS the Eventbrite event, so it has to be read before we give up
// on a URL that is not on eventbrite.com -- otherwise the show's own Eventbrite listing looks like a
// different show, and the pick gets a false "a second show the same night at the same room" tag.
const ebIdCache = new Map();
async function eventbriteEventId(url) {
  const direct = ebId(url);
  if (direct) return direct;
  if (!/eventbrite\.com/i.test(url || '')) return null;
  if (ebIdCache.has(url)) return ebIdCache.get(url);
  let found = null;
  try {
    const html = await (await fetch(url, { headers })).text();
    const fromPage = ebId(html.match(/"(?:event_id|eventId|event_id_str)"\s*:\s*"?(\d{10,})"?/) ?.[1] || '');
    if (fromPage) found = fromPage;
    if (!found) {
      const canonical = html.match(/"(?:url|vanity_url)"\s*:\s*"([^"]*eventbrite\.com\/e\/[^"]*tickets-(\d{10,}))"/);
      if (canonical) found = canonical[2];
    }
  } catch {}
  ebIdCache.set(url, found);
  return found;
}

// Eventbrite's JSON-LD offers block states availability, but the event type is not always "Event":
// a talk or a panel is published as "EducationEvent" (and "SocialEvent"). Read every event-ish type.
// A venue's own ticket page (Littlefield's ?wfea_eb_id=...) is the same event as its Eventbrite
// listing, so read availability from the canonical Eventbrite page for that id too -- otherwise a
// sold-out or low-availability night reads as unknown and the pick carries no demand signal.
async function availability(url) {
  if (!url) return null;
  const targets = [];
  if (/eventbrite\.com/i.test(url)) targets.push(url);
  const id = ebId(url);
  if (id && !targets.some((t) => ebId(t) === id)) targets.push(`https://www.eventbrite.com/e/${id}`);
  let fallback = null;
  for (const target of targets) {
    try {
      const html = await (await fetch(target, { headers })).text();
      for (const m of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
        let j; try { j = JSON.parse(m[1]); } catch { continue; }
        for (const x of (Array.isArray(j) ? j : [j])) {
          if (!x || typeof x !== 'object') continue;
          const type = String(x['@type'] || '');
          if (!/Event$/.test(type) || /WebPage|BreadcrumbList|ImageObject|Organization/.test(type)) continue;
          const offers = [].concat(x.offers || []);
          const a = offers.map((o) => String(o.availability || '').replace(/.*\//, '')).filter(Boolean);
          if (a.includes('SoldOut') && a.every((v) => v === 'SoldOut')) return 'SoldOut';
          if (a.includes('LimitedAvailability')) return 'LimitedAvailability';
          if (a.includes('SoldOut')) return 'LimitedAvailability';
          if (a.includes('InStock')) fallback = fallback || 'InStock';
        }
      }
    } catch {}
  }
  return fallback;
}

// Live Nation and Ticketmaster have no JSON-LD offers block, but their event pages put the
// state in the <title>: "SOLD OUT - <show> at <venue> on <date> - Live Nation". Without this,
// a sold-out Bell House night reads as untagged and lands in the Tonight carousel.
async function ticketPageSoldOut(url) {
  if (!/livenation\.com\/event\/|ticketmaster\.com\/.*\/event\//.test(url || '')) return false;
  try {
    const html = await (await fetch(url, { headers })).text();
    const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    return Boolean(m) && /SOLD\s*OUT/i.test(m[1]);
  } catch { return false; }
}

// Ticketmaster's own page body says "Tickets are sold out now. Check back soon." when an
// event is gone, but its <title> does NOT carry the "SOLD OUT - " prefix for every venue.
// Seen 2026-11-17: the Jaboukie Young-White page at the Bell House rendered the sold-out
// body with a plain title, while the venue's own calendar listed the same show with no
// "SOLD OUT" prefix -- so the title check alone left it untagged and it landed in the
// Tonight carousel as if tickets were still on sale.
//
// The string alone is NOT a signal: Ticketmaster ships that exact sentence as a translation
// key ("edp.event.state.soldOut") inside EVERY event page's payload, sold out or not.
// Verified 2026-11-17: the raw HTML of the available Nov 19 Bell House showcase contains
// "Tickets are sold out now" as well. So we cannot match the string in the source.
//
// The signal is what Ticketmaster RENDERS in place of the quantity picker. An event with
// tickets left renders a picker ("1 Ticket 2 Tickets 3 Tickets ..." plus a price range);
// a sold-out event renders the sold-out sentence and a Seat Map with no picker. That
// difference lives in the rendered DOM, so it needs the browser -- a plain fetch of a
// Ticketmaster page gets a 403 anyway.
//
// heat.js runs headless and cannot render, so this reader reports the ticket page as
// unreadable rather than guessing. The sold-out Jaboukie night was verified by hand in
// the browser and tagged by hand on the board.
async function ticketBodySoldOut(url) {
  return false;
}

// Other ticket hosts say it in the body instead of the title, and some of them never say it in
// their structured data either -- New York Comedy Club's JSON-LD offers block still says InStock
// on a night whose own page says "This event is SOLD OUT". Without this, three sold-out NYCC
// shows read as untagged and land in a Tonight carousel as if tickets were still on sale.
//
// Only the event-level sentences count. A comic's bio ("a recent sold-out, 500-seat headline
// show") must not match, so every pattern has to be about *this* event, not about a show the
// performer once sold out.
const EVENT_SOLD_OUT = [
  /this event is (?:currently )?sold\s*out/i,
  /sorry[,—\s]+this event is currently sold\s*out/i,
  /sold\s*out\s*[—–-]\s*(?:join|add) (?:the|our) wait\s*list/i,
  /this (?:show|performance|gig) is sold\s*out/i,
];
async function bodySoldOut(url) {
  if (!url || !/^https?:\/\//i.test(url)) return false;
  try {
    const html = await (await fetch(url, { headers })).text();
    const txt = html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ');
    return EVENT_SOLD_OUT.some((re) => re.test(txt));
  } catch { return false; }
}

// improv.com prints a "Wait List" button on a show that is no longer buyable, and the
// matching TicketWeb page says there are no tickets available. Seen 2026-11-17: the Cemented
// Comedy Showcase at Brooklyn Improv was on our board for that night, its improv.com page
// rendered a Wait List button, and nothing tagged it -- so it sat in the Tonight carousel as
// if tickets were still on sale.
//
// The button is per-show: it carries the show's own date and time in its aria-label
// ("Wait List for Tue Nov 17 07:00PM at Brooklyn Improv (The Main Room)"). A performer page
// lists that performer's other dates too, so match the date AND the time of OUR pick -- a
// Wait List on someone else's date is not our show being sold out.
// Calibration 2026-11-17: On Deck the same night at the same venue renders "Buy Tickets",
// so the button state really is per-show.
async function improvWaitList(pick) {
  const url = pick.source_url || pick.ticket_url;
  if (!url || !/improv\.com/i.test(url)) return false;
  const start = String(pick.starts_at || '').match(/T(\d{2}):(\d{2})/);
  if (!start) return false;
  const wantTime = `${start[1]}:${start[2]}`;
  const wantDate = String(pick.date || '').match(/(\d{4})-(\d{2})-(\d{2})/);
  if (!wantDate) return false;
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  try {
    const html = await (await fetch(url, { headers })).text();
    const re = /aria-label="Wait List for [A-Za-z]{3} ([A-Za-z]{3}) (\d{1,2}) (\d{1,2}):(\d{2})(AM|PM)[^"]*"/gi;
    let m;
    while ((m = re.exec(html))) {
      // The label reads "Wait List for Tue Nov 17 07:00PM at ..." -- weekday, then month.
      const mon = MONTHS.indexOf(m[1]);
      const day = Number(m[2]);
      const h24 = Number(m[3]) % 12 + (m[5].toUpperCase() === 'PM' ? 12 : 0);
      const tm = `${String(h24).padStart(2, '0')}:${m[4]}`;
      const monOk = mon === Number(wantDate[2]) - 1;
      const dayOk = day === Number(wantDate[3]);
      if (monOk && dayOk && tm === wantTime) return true;
    }
  } catch { return false; }
  return false;
}

// A box office that prints "only N left!" on its quantity picker is telling us the show is
// nearly gone -- but on New York Comedy Club's pages that counter belongs to a DIFFERENT show
// listed on the same page. Seen 2026-11-17: the Jessica Kirson page showed "only 2 left" while
// its own event block said "This event is SOLD OUT"; the number was another show's inventory.
// So this reader is not safe: it cannot tell whose counter it read. Availability that matters
// (sold out / going fast) is read from the event's own block by bodySoldOut() above, and from
// Eventbrite's structured data. The "only N left" signal is deliberately not used.
async function limitedLeft(url) {
  return false;
}
async function wikipedia(name) {
  if (!name) return null;
  try {
    const q = new URL('https://en.wikipedia.org/w/api.php'); q.search = new URLSearchParams({ action: 'query', generator: 'search', gsrsearch: name + ' comedian', gsrlimit: 3, prop: 'description', format: 'json' });
    const r = await (await fetch(q, { headers })).json();
    const pages = Object.values(r.query?.pages || {});
    const page = pages.find((p) => p.title.toLowerCase().replace(/ \(.*\)/, '') === name.toLowerCase() && /comedian|comic|comedy|actor|writer|host/i.test(p.description || ''));
    if (!page) return null;
    const day = (d) => d.toISOString().slice(0, 10).replace(/-/g, '');
    const end = new Date(Date.now() - 86400000), mid = new Date(Date.now() - 31 * 86400000), start = new Date(Date.now() - 61 * 86400000);
    const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/${encodeURIComponent(page.title.replace(/ /g, '_'))}/daily/${day(start)}/${day(end)}`;
    const v = await (await fetch(url, { headers })).json();
    const items = v.items || []; const recent = items.filter((i) => i.timestamp >= day(mid) + '00').reduce((s, i) => s + i.views, 0); const prior = items.filter((i) => i.timestamp < day(mid) + '00').reduce((s, i) => s + i.views, 0);
    return { title: page.title, views_30d: recent, views_prior_30d: prior, change: prior ? Math.round(((recent - prior) / prior) * 100) : null };
  } catch { return null; }
}

(async () => {
  const upcoming = picks.filter((p) => Date.parse(p.ends_at) > Date.now());
  const out = []; const wikiCache = new Map();
  for (const p of upcoming) {
    const reasons = []; let score = 0;
    let avail = await availability(p.ticket_url || p.source_url); await sleep(300);
    if (!avail) {
      // Non-Eventbrite ticket pages carry the state in the page title instead.
      for (const u of [p.ticket_url, p.source_url].filter(Boolean)) {
        if (await ticketPageSoldOut(u)) { avail = 'SoldOut'; break; }
        await sleep(300);
      }
    }
    if (!avail) {
      // Ticketmaster says it in the body on some venues even when the title has no prefix.
      for (const u of [p.ticket_url, p.source_url].filter(Boolean)) {
        if (await ticketBodySoldOut(u)) { avail = 'SoldOut'; break; }
        await sleep(300);
      }
    }
    if (!avail) {
      // Other hosts say it in the body. Read the page we actually link to, not a generic one.
      if (await bodySoldOut(p.ticket_url)) { avail = 'SoldOut'; await sleep(300); }
    }
    if (!avail) {
      // improv.com's own page prints a "Wait List" button on a show that is no longer buyable.
      // The button carries the show's own date and time, so this is scoped to our show.
      if (await improvWaitList(p)) { avail = 'SoldOut'; await sleep(300); }
    }
    if (!avail) {
      // A box office with only a handful of seats left is going fast, not sold out.
      if (await limitedLeft(p.ticket_url)) { avail = 'LimitedAvailability'; await sleep(300); }
    }

    if (avail === 'SoldOut') { score += 100; reasons.push('sold out on the ticket page'); }
    else if (avail === 'LimitedAvailability') { score += 70; reasons.push('ticket page says limited availability'); }
    else if (avail === 'InStock') reasons.push('tickets available');
    const key = norm(p.title);
    // A vanity Eventbrite URL resolves to the same event id as its canonical /e/ page, so compare
    // resolved ids: otherwise a show and its own lead page look like two different shows.
    const myId = await eventbriteEventId(p.ticket_url || p.source_url);
    const pickIds = new Map();
    for (const q of picks) pickIds.set(q.id, await eventbriteEventId(q.ticket_url || q.source_url));
    const sameDay = [...picks.filter((q) => q.id !== p.id && q.venue === p.venue && q.date === p.date && norm(q.title) === key), ...leads.filter((l) => l.venue === p.venue && l.date === p.date && norm(l.title) === key && ebId(l.url) !== myId && ![...pickIds.values()].includes(ebId(l.url)))];
    if (sameDay.length) { score += 25; reasons.push('a second show the same night at the same room'); }
    // Every performer the title actually names, so "Steve Martin Presents with Andrew Dismukes
    // and Michael Good" is scored on Dismukes and Good, not on the brand in front.
    const names = performers(p.title);
    const name = names[0] || null;
    const bookings = names.length ? [...picks.filter((q) => names.some((n) => norm(q.title).includes(n.toLowerCase()))), ...leads.filter((l) => names.some((n) => norm(l.title).includes(n.toLowerCase())))].length : 0;
    if (bookings >= 3) { score += 10; reasons.push(`${bookings} listings this month`); }
    let wiki = null;
    for (const n of names) { if (!wikiCache.has(n)) { wikiCache.set(n, await wikipedia(n)); await sleep(300); } const w = wikiCache.get(n); if (w && !wiki) wiki = w; }
    if (wiki) { const perDay = wiki.views_30d / 30; if (perDay >= 1000) { score += 20; reasons.push(`Wikipedia: ${Math.round(perDay)} views a day`); } else if (perDay >= 200) { score += 10; reasons.push(`Wikipedia: ${Math.round(perDay)} views a day`); } if (wiki.change !== null && wiki.change >= 50) { score += 15; reasons.push(`Wikipedia views up ${wiki.change}% over the prior month`); } }
    let reddit = null;
    if (name && process.env.REDDIT_CLIENT_ID) { try { reddit = await buzz(name); await sleep(1100); } catch (e) { reddit = { error: e.message }; } }
    if (reddit && reddit.posts_30d) { const pts = Math.min(25, reddit.posts_30d * 5 + Math.floor(reddit.upvotes / 50)); score += pts; reasons.push(`Reddit: ${reddit.posts_30d} post${reddit.posts_30d === 1 ? '' : 's'} in 30 days, ${reddit.upvotes} upvotes${reddit.top ? ` (top: r/${reddit.top.subreddit})` : ''}`); }
    const demand = avail === 'SoldOut' ? 'sold_out' : (avail === 'LimitedAvailability' || sameDay.length) ? 'going_fast' : null;
    p.demand = demand; p.demand_checked = today;
    out.push({ id: p.id, title: p.title, venue: p.venue, date: p.date, heat: Math.min(100, score), demand, availability: avail, second_show: sameDay.length > 0, performer: name, wikipedia: wiki, reddit, reasons });
  }
  for (const p of picks) if (!upcoming.includes(p)) { delete p.demand; delete p.demand_checked; }
  out.sort((a, b) => b.heat - a.heat);
  fs.mkdirSync(path.join(root, 'candidates'), { recursive: true });
  fs.writeFileSync(path.join(root, 'candidates', 'heat.json'), JSON.stringify({ generated_at: new Date().toISOString(), note: 'Demand signals for the editor. Only availability and second shows set the public demand tag.', picks: out }, null, 1) + '\n');
  fs.writeFileSync(picksFile, JSON.stringify(picks, null, 1) + '\n');
  console.log(`heat: ${out.length} upcoming picks scored; ${out.filter((o) => o.demand === 'sold_out').length} sold out, ${out.filter((o) => o.demand === 'going_fast').length} going fast`);
  out.filter((o) => o.heat > 0).slice(0, 12).forEach((o) => console.log(`  ${String(o.heat).padStart(3)}  ${o.date} ${o.title} @ ${o.venue}: ${o.reasons.join('; ')}`));
})().catch((e) => { console.error('heat:', e.message); process.exit(1); });
