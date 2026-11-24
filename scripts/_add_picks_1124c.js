#!/usr/bin/env node
// 2026-11-24 edition, part 4: the Flop House week. The room's own calendar and
// its Eventbrite listings give exact times and prices.
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const file = path.join(root, 'web', 'data', 'picks.json');
const picks = JSON.parse(fs.readFileSync(file, 'utf8'));
const T = '2026-11-24';

const newPicks = [
  {
    id: 'prime-time-flop-house-2026-11-27',
    title: 'The Prime Time Show at Flop House',
    date: '2026-11-27',
    starts_at: '2026-11-27T20:00:00-05:00',
    ends_at: '2026-11-27T21:30:00-05:00',
    end_time_confirmed: true,
    time_label: '8pm',
    venue: 'Flop House Comedy',
    neighborhood: 'Williamsburg',
    price_amount: 7.18,
    price_label: '$7.18 early bird incl. fees',
    ticket_url: 'https://www.eventbrite.com/e/the-prime-time-show-at-flop-house-stand-up-comedy-in-williamsburg-tickets-2005230578640',
    source_url: 'https://www.eventbrite.com/e/the-prime-time-show-at-flop-house-stand-up-comedy-in-williamsburg-tickets-2005230578640',
    verified_at: T,
    description: 'Six to eight of the city\u2019s working comics take eight-to-twelve-minute sets and are done by half past nine, so the Williamsburg room still leaves you the rest of your Friday, and there is no drink minimum.',
    tier: 'special',
    featured: false,
    demand: null,
    demand_checked: T
  },
  {
    id: 'grapevine-flop-house-2026-11-25',
    title: 'Grapevine Comedy - NYC Stand Up',
    date: '2026-11-25',
    starts_at: '2026-11-25T21:31:00-05:00',
    ends_at: '2026-11-25T23:00:00-05:00',
    end_time_confirmed: true,
    time_label: '9:31pm',
    venue: 'Flop House Comedy',
    neighborhood: 'Williamsburg',
    price_amount: 12.51,
    price_label: '$12.51 incl. fees',
    ticket_url: 'https://www.eventbrite.com/e/grapevine-comedy-nyc-stand-up-tickets-2004408077517',
    source_url: 'https://flophousecomedy.com/',
    verified_at: T,
    description: 'The 9:31 slot on the Flop House calendar, which is late enough to count as a second show and cheap enough that nobody minds if you duck out halfway through.',
    tier: 'special',
    featured: false,
    demand: null,
    demand_checked: T
  }
];

const have = new Set(picks.map((p) => p.id));
let added = 0;
for (const p of newPicks) {
  if (have.has(p.id)) { console.log('skip (exists):', p.id); continue; }
  picks.push(p);
  have.add(p.id);
  added++;
}
fs.writeFileSync(file, JSON.stringify(picks, null, 1) + '\n');
console.log(`picks: ${added} added, ${picks.length} total`);
