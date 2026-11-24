#!/usr/bin/env node
// Re-stamp the twelve picks whose pages were re-read on 2026-11-24.
// Every one was confirmed on the venue's own page today; the data itself did
// not change, so only verified_at moves.
'use strict';
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'web', 'data', 'picks.json');
const picks = JSON.parse(fs.readFileSync(file, 'utf8'));

const ids = [
  'a-true-york-st-marks-2026-12-01',
  'date-night-comedy-st-marks-2026-12-03',
  'down-bad-comedy-show-st-marks-2026-12-13',
  'mike-feeney-without-a-parachute-nycc-2026-12-13',
  'double-edged-paula-j-leon-mario-pisano-nycc-2026-12-15',
  'good-eggs-nycc-2026-12-16',
  'prime-time-comedy-show-st-marks-2026-12-19',
  'golden-hour-fest-littlefield-2026-12-19',
  'speakeasy-saturday-night-st-marks-2026-12-19',
  'down-bad-comedy-show-st-marks-2026-12-20',
  'carmen-and-fiends-bell-house-2026-12-20',
  'sunday-funday-st-marks-2026-12-20'
];

let n = 0;
for (const id of ids) {
  const p = picks.find((x) => x.id === id);
  if (!p) { console.log('missing:', id); continue; }
  p.verified_at = '2026-11-24';
  n++;
}
fs.writeFileSync(file, JSON.stringify(picks, null, 1) + '\n');
console.log(`re-stamped ${n} picks`);
