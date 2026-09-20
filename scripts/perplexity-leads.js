#!/usr/bin/env node
// Discovery leads from Perplexity Sonar: who to follow (producers, comics, newsletters, Instagram
// accounts), independent recurring shows, and announced dated events, each with the article it came from.
// Sonar is weak at date-specific listings and good at round-ups, so the questions lean on "who to follow"
// and "best independent shows" pieces. Matches names against the venue registry, picks and recurring rooms
// so the editor sees what is new. Writes candidates/perplexity-leads.json. Leads, never sources: open the
// venue or ticket page before anything reaches web/data. `npm run perplexity-leads` (about 1 cent a question).
'use strict';
require('./env.js')(['PERPLEXITY_API_KEY']);
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const out = path.join(root, 'candidates', 'perplexity-leads.json');
const read = (f) => JSON.parse(fs.readFileSync(path.join(root, 'web', 'data', f), 'utf8'));
const venues = read('venues.json'), picks = read('picks.json'), rooms = read('recurring.json'), mics = read('open-mics.json');
const holdouts = JSON.stringify(JSON.parse(fs.readFileSync(path.join(root, 'editorial', 'holdouts.json'), 'utf8'))).toLowerCase();
const month = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', month: 'long', year: 'numeric' }).format(new Date());
const SHAPE = 'Return JSON only, no prose: an array of objects {"name","kind","where","handle_or_url","detail","evidence_url","source_year"}. "kind" is one of producer, comic, show, venue, newsletter, account, event. "where" is the venue and neighborhood if known, else null. "detail" is one sentence of fact from the source (day of week, price, date, what they book). "evidence_url" is the article or page you took it from. "source_year" is the year that page was published or last updated (a number, or null if unknown). Name the specific show, person or account, never the general programming of a venue. Leave out anything you cannot tie to a source. New York City only.';
const QUESTIONS = [
  { id: 'who-to-follow', ask: `Independent stand-up show producers, bookers and production companies in New York City who run their own live shows and announce them on Instagram or a newsletter (for example the people behind bar shows, rooftop shows, backyard shows and themed showcases). Give the Instagram handle or site and the show they run. Not podcasts, not national media. Up to 25.` },
  { id: 'rising-comics', ask: `Name individual New York City based stand-up comics who were singled out in 2025 or 2026: Just For Laughs New Faces, Vulture "Comedians You Should and Will Know", Time Out New York comics to watch, New York Comedy Festival "New York's Funniest" finalists, Netflix or Comedy Central debut specials and late-night stand-up debuts. One comic per row, with the list or credit in "detail". Up to 30.` },
  { id: 'independent-shows', ask: `Independent recurring stand-up shows in New York City bars, backrooms, bookstores and small theaters (not the big comedy clubs) recommended in articles or listings in the last 12 months. Include the night of the week and the venue. Up to 25.` },
  { id: 'new-rooms', ask: `Comedy venues, rooms or recurring comedy nights that opened, moved or closed in New York City in the last 12 months. Up to 15.` },
  { id: 'announced-dates', ask: `Stand-up comedy events in New York City announced for the next eight weeks from ${month}: touring headliners at theaters, special or album tapings, festival line-ups, one-off benefit shows. Only events with a stated date and a ticket or venue page. Up to 20.` },
];
const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\bthe\b/g, ' ').replace(/\s+/g, ' ').trim();
const known = { venue: venues.map((v) => norm(v.name)), show: [...rooms, ...mics, ...picks].map((r) => norm(r.title)), text: norm(JSON.stringify(picks.map((p) => [p.title, p.description]))) };
function status(lead) {
  const n = norm(lead.name); if (!n) return 'unnamed';
  if (holdouts.includes(String(lead.name).toLowerCase())) return 'holdout';
  if (lead.source_year && Number(lead.source_year) < 2025) return 'stale source';
  if (/\b(closed|closing|shut|shuttered)\b/i.test(lead.detail || '')) return 'closed';
  if (known.venue.some((v) => v && n.replace(/ (shows?|comedy shows?)$/, '') === v)) return 'known venue';
  if (known.venue.includes(n) || known.venue.includes(norm(lead.where).split(' ').slice(0, 3).join(' '))) return lead.kind === 'venue' ? 'known venue' : 'at known venue';
  if (known.show.some((t) => t && (t.includes(n) || n.includes(t)))) return 'already listed';
  if (n.length > 5 && known.text.includes(n)) return 'named in a pick';
  return 'new';
}
async function ask(q) {
  const r = await fetch('https://api.perplexity.ai/chat/completions', { method: 'POST', headers: { Authorization: 'Bearer ' + process.env.PERPLEXITY_API_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'sonar-pro', web_search_options: { search_context_size: 'high' }, messages: [{ role: 'system', content: SHAPE }, { role: 'user', content: q.ask }] }) });
  if (!r.ok) throw new Error(`${q.id}: HTTP ${r.status}`);
  const j = await r.json(); const text = j.choices?.[0]?.message?.content || ''; const m = text.match(/\[[\s\S]*\]/);
  let rows = []; try { rows = JSON.parse(m ? m[0] : '[]'); } catch { console.error(`perplexity-leads: ${q.id} returned unparseable JSON`); }
  return { rows: rows.filter((x) => x && x.name), citations: j.citations || [], cost: j.usage?.cost?.total_cost || 0 };
}
(async () => {
  if (!process.env.PERPLEXITY_API_KEY) { console.error('perplexity-leads: PERPLEXITY_API_KEY not set'); process.exit(2); }
  const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7); const leads = []; const sources = {}; let cost = 0; const errors = [];
  for (const q of QUESTIONS.filter((x) => !only || x.id === only)) {
    try {
      const a = await ask(q); cost += a.cost; sources[q.id] = a.citations;
      for (const row of a.rows) leads.push({ question: q.id, name: row.name, kind: row.kind || null, where: row.where || null, handle_or_url: row.handle_or_url || null, detail: row.detail || null, evidence_url: row.evidence_url || null, source_year: Number(row.source_year) || null, status: status(row) });
      console.log(`perplexity-leads: ${q.id} -> ${a.rows.length}`);
    } catch (e) { errors.push(String(e.message || e)); console.error('perplexity-leads: ' + e.message); }
  }
  const seen = new Set(); const unique = leads.filter((l) => { const k = norm(l.name); if (seen.has(k)) return false; seen.add(k); return true; });
  const order = { new: 0, 'at known venue': 1, 'named in a pick': 2, 'known venue': 3, 'already listed': 4, 'stale source': 5, closed: 5, unnamed: 6, holdout: 7 };
  unique.sort((a, b) => order[a.status] - order[b.status]);
  fs.writeFileSync(out, JSON.stringify({ retrieved_at: new Date().toISOString(), note: 'Perplexity Sonar round-up leads. Unverified and sometimes wrong: confirm on the venue, ticket or producer page before use. Holdout names are flagged, never listed.', estimated_cost_usd: Number(cost.toFixed(4)), leads: unique, sources, errors }, null, 1) + '\n');
  const count = (s) => unique.filter((l) => l.status === s).length;
  console.log(`perplexity-leads: ${unique.length} leads (${count('new')} new, ${count('at known venue')} at known venues, ${count('already listed')} already listed), about $${cost.toFixed(2)} -> candidates/perplexity-leads.json`);
})();
