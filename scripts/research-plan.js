#!/usr/bin/env node
// Research planner: decide which performers deserve a last30days run today, cheaply.
//   node scripts/research-plan.js                 rank, shortlist, print the plan, write candidates/research-plan.json
//   node scripts/research-plan.js --record "Name" --note "one sentence"   store a finished run in the cache
// Ranking uses only static data and cheap signals already on disk: picks.json, candidates/heat.json
// (availability, second shows, Wikipedia, Reddit-lite), candidates/eventbrite.json and the cache.
// A run is scheduled only when it could change a decision: the show is within the decision window,
// the performer is not already decided (sold out / clearly cold), and no fresh cached result exists.
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const cand = (f) => path.join(root, 'candidates', f);
const readJson = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return d; } };
const args = process.argv.slice(2);
const arg = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
const cacheFile = cand('research-cache.json');
const cache = readJson(cacheFile, { runs: {} });
const FRESH_DAYS = 7, WINDOW_DAYS = 10, MIN = 5, MAX = 10, TOKENS_PER_RUN = 9000; // ~36k chars of evidence per run, measured Sep 15 2026
const today = new Date();
const days = (d) => Math.round((new Date(d + 'T12:00:00-04:00') - today) / 86400000);

if (arg('--record')) {
  const name = arg('--record'); cache.runs[name] = { at: today.toISOString(), note: arg('--note') || '', source: 'last30days' };
  fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 1) + '\n'); console.log(`cached: ${name}`); process.exit(0);
}

const NOT_A_NAME = /\b(comedy|show|night|live|club|architecture|game|party|hour|tour|special|presents|festival|showcase|open|mic|the|an|a|of|and|with|in|at|for|from|to|vs|trivia|taping|drinking|fun|looking|laugh|laughs|whine|list|bisque|charity|obey|advance|moderation|invisible|jokes|jranks|backroom|wits|end|stand|up|sorry|here|fix|laff|spell|checc|voices|cabaret|interview|experts|watch|dating|story|facts|machine|major|just|famous|words|dress|rehearsal|speakeasy|pizzazz|banana|bananas|improv|difficult|people|double|edged|riot|ask|ripe|seated|table|read|experience|workout|mob|battle|draft|fantasy|puzzle|contest|review|stories|more|and|plus|featuring)\b/i;
// Function words never sit inside a person's name. A phrase carrying one is a show
// title, not a performer ("Doctors Without Boundaries", "Not Ripe Bananas",
// "Please Stay Seated"). Same job as NOT_A_NAME, for the words that are not nouns.
const NOT_IN_A_NAME = /\b(the|a|an|and|or|with|without|from|for|to|in|on|at|of|by|not|please|per|via|plus|versus|vs)\b/i;
// A title can name a brand before "Presents with" and put the actual performers after it
// ("Steve Martin Presents with Andrew Dismukes and Michael Good"). Rank the hosts, not the brand.
const isPerson = (s) => Boolean(s) && s.length <= 40 && !NOT_A_NAME.test(s) && !NOT_IN_A_NAME.test(s);
// Split a credit list on commas and conjunctions: "Francis Ellis, Caitlin Peluffo, Peyton Ruddy, & More!"
const splitNames = (s) => String(s)
  .split(/\s*(?:,|&|\/|\+)\s*|\s+(?:and|with)\s+/i)
  .map((x) => x.trim().replace(/[.!]+$/, ''))
  .filter(isPerson);
const performers = (title) => {
  const t = String(title || '').trim();
  const hosted = t.match(/^.+?\bPresents with\s+(.+)$/);
  if (hosted) return splitNames(hosted[1]);
  // A colon can introduce the people on a brand-named show
  // ("Double Edged: Caroline Hanes and Salma Zaky"). Only take it when the remainder
  // is an explicit list of names -- "Peach Fuzz" after "Ania Magliano:" is the show.
  const listed = t.match(/^.+?:\s*(.+)$/);
  if (listed && /\s(?:and|&|,)\s/i.test(listed[1])) {
    const people = splitNames(listed[1]);
    if (people.length) return people;
  }
  const m = t.match(/^([A-Z][a-z]+(?: [A-Z][a-zA-Z'’.-]+){1,2})(?::| Live| Presents| Headlines|$)/);
  return m && isPerson(m[1]) ? [m[1]] : [];
};

const picks = readJson(path.join(root, 'web', 'data', 'picks.json'), []).filter((p) => Date.parse(p.ends_at) > Date.now());
const heat = new Map((readJson(cand('heat.json'), { picks: [] }).picks || []).map((h) => [h.id, h]));
const leads = (readJson(cand('eventbrite.json'), { events: [] }).events || []);

// One row per performer, best (soonest) show first.
const byName = new Map();
for (const p of picks) {
  for (const name of performers(p.title)) {
    const h = heat.get(p.id) || {};
    const row = byName.get(name) || { name, shows: [], cheap: 0, signals: [] };
    row.shows.push({ id: p.id, date: p.date, venue: p.venue, days: days(p.date), featured: !!p.featured, poster: !!p.poster, demand: h.demand || null });
    if ((h.heat || 0) > row.cheap) { row.cheap = h.heat || 0; row.signals = h.reasons || []; }
    byName.set(name, row);
  }
}
for (const l of leads) { for (const name of performers(l.title)) { if (!byName.has(name)) byName.set(name, { name, shows: [{ id: null, date: l.date, venue: l.venue, days: days(l.date), lead: true }], cheap: 0, signals: ['Eventbrite lead only'] }); } }

const rows = [...byName.values()].map((r) => {
  r.shows.sort((a, b) => a.days - b.days); const next = r.shows[0];
  // Priority = cheap heat + urgency + undecided-ness. Cheap and fast.
  let priority = r.cheap;
  if (next.days <= 3) priority += 30; else if (next.days <= WINDOW_DAYS) priority += 15;
  if (next.featured || next.poster) priority += 5; // candidate for the shelf: worth knowing
  if (next.lead) priority -= 10;
  r.priority = priority; r.next = next;
  const cached = cache.runs[r.name]; const ageDays = cached ? (today - new Date(cached.at)) / 86400000 : null;
  r.cached = cached ? { at: cached.at, age_days: Math.round(ageDays * 10) / 10, fresh: ageDays < FRESH_DAYS, note: cached.note } : null;
  return r;
}).sort((a, b) => b.priority - a.priority);

const shortlist = rows.slice(0, MAX);
const plan = { run: [], reuse: [], skip: [] };
for (const r of rows) {
  const inShort = shortlist.includes(r);
  const why = [];
  if (!inShort) why.push('outside the top ' + MAX + ' by cheap ranking');
  else if (r.cached?.fresh) why.push(`cached ${r.cached.age_days}d ago`);
  else if (r.next.demand === 'sold_out') why.push('already sold out; research cannot change the call');
  else if (r.next.days > WINDOW_DAYS) why.push(`next show in ${r.next.days} days, outside the ${WINDOW_DAYS}-day window`);
  else if (r.next.days < 0) why.push('show already started');
  if (inShort && r.cached?.fresh) plan.reuse.push({ name: r.name, priority: r.priority, cached: r.cached });
  else if (inShort && why.length === 0) plan.run.push({ name: r.name, priority: r.priority, next: r.next, cheap_signals: r.signals, reason: r.next.days <= 3 ? 'show within 3 days and not yet decided' : 'in the decision window and not yet decided' });
  else plan.skip.push({ name: r.name, priority: r.priority, reason: why.join('; ') });
}
// Guarantee a floor of MIN considered names (run or reuse) when enough undecided candidates exist.
if (plan.run.length + plan.reuse.length < MIN) {
  for (const s of [...plan.skip]) { if (plan.run.length + plan.reuse.length >= MIN) break; if (/outside the top|window/.test(s.reason) && !/sold out|started/.test(s.reason)) { plan.skip.splice(plan.skip.indexOf(s), 1); const r = rows.find((x) => x.name === s.name); plan.run.push({ name: r.name, priority: r.priority, next: r.next, cheap_signals: r.signals, reason: 'filled to the minimum of ' + MIN }); } }
}
const noSignal = plan.run.filter((r) => !r.cheap_signals.length).map((r) => r.name);
const savedRuns = rows.length - plan.run.length;
const report = { generated_at: today.toISOString(), performers_considered: rows.length, shortlist: shortlist.map((r) => ({ name: r.name, priority: r.priority })), run: plan.run, reuse: plan.reuse, skip: plan.skip, estimated_tokens_saved: savedRuns * TOKENS_PER_RUN, estimate_basis: `${TOKENS_PER_RUN} tokens per last30days run, ${savedRuns} runs avoided out of ${rows.length}`, no_recent_data: noSignal };
fs.mkdirSync(cand(''), { recursive: true });
fs.writeFileSync(cand('research-plan.json'), JSON.stringify(report, null, 1) + '\n');
console.log(`research-plan: ${rows.length} performers ranked from static data; run ${plan.run.length}, reuse ${plan.reuse.length} cached, skip ${plan.skip.length}; ~${report.estimated_tokens_saved.toLocaleString()} tokens saved`);
plan.run.forEach((r) => console.log(`  RUN   ${r.name} (priority ${r.priority}, ${r.next.venue} in ${r.next.days}d): ${r.reason}${r.cheap_signals.length ? ' · ' + r.cheap_signals.join('; ') : ' · no cheap signals yet'}`));
plan.reuse.forEach((r) => console.log(`  REUSE ${r.name}: cached ${r.cached.age_days}d ago${r.cached.note ? ' · ' + r.cached.note : ''}`));
plan.skip.slice(0, 12).forEach((r) => console.log(`  SKIP  ${r.name}: ${r.reason}`));
if (noSignal.length) console.log(`  note: no recent data for ${noSignal.join(', ')}; ranked on schedule alone`);
