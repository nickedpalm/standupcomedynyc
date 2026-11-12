'use strict';
// How a venue is printed to a reader.
//
// The registry disambiguates sister rooms with a parenthetical: "New York Comedy Club
// (Upper West Side)", "Talea Beer Co. (Cobble Hill)". Printed next to the neighborhood --
// which the registry also carries -- that says the same thing twice. On the 9:16 story
// frame of 2026-11-12 the repeated line was long enough to wrap and collide with the
// next row, and the same redundancy reached the Instagram caption, which cannot be
// edited once published.
//
// The registry key is never changed. This only affects what a reader sees.

// The venue as printed: drop a trailing parenthetical when it is only restating the
// neighborhood ("New York Comedy Club (Upper West Side)" -> "New York Comedy Club").
// A parenthetical that says something else ("Union Hall (Greenpoint)") is kept.
const venueLabel = (venue, neighborhood) => {
  const hood = String(neighborhood || '').trim().toLowerCase();
  return String(venue || '')
    .replace(/\s*\(([^()]*)\)\s*$/, (all, inner) => (hood && inner.trim().toLowerCase() === hood ? '' : all))
    .trim();
};

// The neighborhood as printed: dropped when the venue name already carries it
// ("Greenpoint Comedy Club" needs no "Greenpoint" after it).
// Tested against the printed venue label, so a stripped parenthetical does not
// take the neighborhood down with it.
const hoodLabel = (venue, neighborhood) => {
  const hood = String(neighborhood || '').trim();
  if (!hood) return '';
  return String(venue || '').toLowerCase().includes(hood.toLowerCase()) ? '' : hood;
};

// "New York Comedy Club · Upper West Side" -- the venue and its hood, with the
// separator only when there is something to separate.
const venueLine = (venue, neighborhood, sep = ' · ') => {
  const v = venueLabel(venue, neighborhood);
  const h = hoodLabel(v, neighborhood);
  return h ? `${v}${sep}${h}` : v;
};

module.exports = { venueLabel, hoodLabel, venueLine };
