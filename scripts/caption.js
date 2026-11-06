// Shared Instagram caption builder.
//
// Instagram rejects a caption over 2200 characters ("The caption was too long.").
// A crowded night -- ten picks, each with a time, a title, a venue line and a blurb --
// can cross that line, which is exactly what happened on 2026-11-06: the old builder
// produced 2,427 characters and the publish failed.
//
// The builder shrinks the blurb caps until the caption fits, and only then starts
// dropping blurbs (longest first). The show lines -- time, title, venue -- are never
// dropped: a reader must be able to see which shows are on and where.
//
// Both ig-post.js and the check script use this module, so the caption that gets
// proof-read is the caption that gets published.
'use strict';
const { firstSentence } = require('./blurb.js');

const LIMIT = 2200;           // Instagram's hard caption limit
const BLURB_MAX = 240;        // the cap the caption used before
const BLURB_MIN = 100;        // the shortest blurb we will print
const CAP_STEP = 20;

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
const hashtags = '#nyccomedy #nycstandup #brooklyncomedy #standupnyc';

// One block per show: time + title, where it is, then the blurb.
const block = (e, blurb) => {
  const tag = e.demand === 'sold_out' ? ' · sold out' : e.demand === 'going_fast' ? ' · going fast' : '';
  const paid = e.sponsored ? ' · paid listing' : '';
  return `${e.clock} — ${e.title.toUpperCase()}\n${e.venue}, ${e.neighborhood}${tag}${paid}${blurb ? '\n' + blurb : ''}`;
};

const assemble = (head, entries, blurbs, foot) =>
  `${head}\n\n${entries.map((e, i) => block(e, blurbs[i])).join('\n\n')}\n\n${foot}`;

/**
 * Build a caption that is guaranteed to fit.
 * Returns { caption, cap, dropped } where `dropped` lists the shows whose blurb was cut.
 */
function buildCaption({ head, entries, foot, limit = LIMIT }) {
  const caps = [];
  for (let cap = BLURB_MAX; cap > BLURB_MIN; cap -= CAP_STEP) caps.push(cap);
  caps.push(BLURB_MIN);

  for (const cap of caps) {
    const blurbs = entries.map((e) => firstSentence(e.description, cap, cap));
    const caption = assemble(head, entries, blurbs, foot);
    if (caption.length <= limit) return { caption, cap, dropped: [] };
  }

  // Still too long at the shortest cap: cut blurbs, longest first, until it fits.
  const blurbs = entries.map((e) => firstSentence(e.description, BLURB_MIN, BLURB_MIN));
  const dropped = [];
  const order = entries.map((e, i) => i).sort((a, b) => blurbs[b].length - blurbs[a].length);
  for (const i of order) {
    if (assemble(head, entries, blurbs, foot).length <= limit) break;
    blurbs[i] = '';
    dropped.push(entries[i].title);
  }
  const caption = assemble(head, entries, blurbs, foot);
  if (caption.length > limit) {
    throw new Error(`caption cannot fit under ${limit} characters even without blurbs (${caption.length})`);
  }
  return { caption, cap: BLURB_MIN, dropped };
}

/**
 * The full "tonight" carousel caption for a list of picks.
 * `day` is YYYY-MM-DD in New York time.
 */
function tonightCaption(list, day) {
  const head = `${weekdayOf(day)} night. ${bets(list.length)}`;
  const foot = `Full board + tickets → link in bio. NYC comedy tonight, ${p0(list)}.${credits(list)}\n\n${hashtags}`;
  const entries = list.map((p) => ({
    clock: clock(p),
    title: p.title,
    venue: p.venue,
    neighborhood: p.neighborhood,
    demand: p.demand,
    sponsored: p.sponsored,
    description: p.description,
  }));
  return buildCaption({ head, entries, foot });
}

module.exports = { LIMIT, BLURB_MAX, BLURB_MIN, buildCaption, tonightCaption, credits, clock, weekdayOf, p0, bets, hashtags };
