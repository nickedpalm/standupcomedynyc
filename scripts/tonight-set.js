// Shared "tonight" carousel selection for ig-card.js and ig-post.js, so the rendered cards and the posted
// carousel always agree on which picks are in and what order they go in.
'use strict';

// Sold-out shows stay on the site board but are not a pick anyone can act on tonight, so they leave the Tonight set.
const soldOut = (p) => p.demand === 'sold_out' && !p.walkup_note;

// Same weighting ig-card.js uses to pick a cover hero: bigger names and urgent picks rank first.
const rank = (p) => (p.cover_art ? 16 : 0) + (p.sponsored ? 8 : 0) + (p.featured ? 4 : 0) + (p.demand === 'sold_out' ? 2 : p.demand === 'going_fast' ? 3 : 0) + (p.big_stage ? 1 : 0);

// Two venues sharing a venues.json "group" (e.g. sister rooms) count as one house for the mix cap.
const houseOf = (p, venuesByName) => { const v = venuesByName.get(p.venue); return (v && v.group) || p.venue; };

// At most `cap` picks per house; over the cap, keep the highest-ranked (rank(), then featured, then earliest).
function capPerHouse(list, venuesByName, cap) {
  const byHouse = new Map();
  list.forEach((p) => { const h = houseOf(p, venuesByName); if (!byHouse.has(h)) byHouse.set(h, []); byHouse.get(h).push(p); });
  const kept = new Set();
  for (const picks of byHouse.values()) {
    [...picks].sort((a, b) => rank(b) - rank(a) || (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.starts_at.localeCompare(b.starts_at))
      .slice(0, cap).forEach((p) => kept.add(p.id));
  }
  return list.filter((p) => kept.has(p.id));
}

// Stable round-robin across houses so consecutive cards alternate venues; each house's own picks stay start-time order.
function interleaveByHouse(list, venuesByName) {
  const byHouse = new Map();
  list.forEach((p) => { const h = houseOf(p, venuesByName); if (!byHouse.has(h)) byHouse.set(h, []); byHouse.get(h).push(p); });
  const queues = [...byHouse.values()].map((picks) => [...picks].sort((a, b) => a.starts_at.localeCompare(b.starts_at)));
  const out = [];
  for (let more = true; more; ) { more = false; for (const q of queues) if (q.length) { out.push(q.shift()); more = true; } }
  return out;
}

// Tonight's picks: sold-out shows removed, then (unless mix is off) capped at 2 per house and interleaved.
function selectTonight(picks, venuesByName, day, { mix = true, cap = 2 } = {}) {
  let list = picks.filter((p) => p.date === day && !soldOut(p)).sort((a, b) => a.starts_at.localeCompare(b.starts_at));
  if (mix) list = interleaveByHouse(capPerHouse(list, venuesByName, cap), venuesByName);
  return list;
}

module.exports = { soldOut, rank, selectTonight };
