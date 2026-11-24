#!/usr/bin/env node
// 2026-11-24 edition, part 5: the Wild East taproom shows. Both dates are on
// the brewery's own taproom calendar; Landline's dates and lineup come from the
// producer's Eventbrite listings.
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const picksFile = path.join(root, 'web', 'data', 'picks.json');
const recurringFile = path.join(root, 'web', 'data', 'recurring.json');
const picks = JSON.parse(fs.readFileSync(picksFile, 'utf8'));
const recurring = JSON.parse(fs.readFileSync(recurringFile, 'utf8'));
const T = '2026-11-24';

const newPicks = [
  {
    id: 'landline-comedy-wild-east-2026-12-03',
    title: 'Landline Comedy at Wild East Brewing',
    date: '2026-12-03',
    starts_at: '2026-12-03T20:30:00-05:00',
    ends_at: '2026-12-03T22:00:00-05:00',
    end_time_confirmed: true,
    time_label: '8:30pm · doors 8pm',
    venue: 'Wild East Brewing Co.',
    neighborhood: 'Gowanus',
    price_amount: 0,
    price_label: 'Free (reserve a spot and you are in a drawing for a free drink)',
    ticket_url: 'https://www.eventbrite.com/e/landline-comedy-at-wild-east-brewing-tickets-2003660053156',
    source_url: 'https://www.eventbrite.com/e/landline-comedy-at-wild-east-brewing-tickets-2003660053156',
    verified_at: T,
    description: 'Comedy in a brewery cellar: Myka Fox, Max Fine, Kelly Collette, Matt Goldich, Gabbie Watts and Darragh White, with the show rounding eight so you can drink the pilsner first.',
    tier: 'special',
    featured: false,
    poster: {
      src: '/assets/posters/landline-comedy-wild-east-2026-12-03.jpg',
      width: 3024,
      height: 4032,
      source_url: 'https://www.eventbrite.com/e/landline-comedy-at-wild-east-brewing-tickets-2003660053156',
      credit: 'Artwork: Landline Comedy / Wild East Brewing Co.',
      alt: 'A comedian with a microphone on the Wild East taproom stage in front of rows of aging beer barrels.',
      kind: 'undated official show artwork'
    },
    demand: null,
    demand_checked: T
  },
  {
    id: 'landline-comedy-wild-east-2026-12-17',
    title: 'Landline Comedy at Wild East Brewing',
    date: '2026-12-17',
    starts_at: '2026-12-17T20:30:00-05:00',
    ends_at: '2026-12-17T22:00:00-05:00',
    end_time_confirmed: true,
    time_label: '8:30pm · doors 8pm',
    venue: 'Wild East Brewing Co.',
    neighborhood: 'Gowanus',
    price_amount: 0,
    price_label: 'Free (reserve a spot and you are in a drawing for a free drink)',
    ticket_url: 'https://www.eventbrite.com/e/landline-comedy-at-wild-east-brewing-tickets-2003269838012',
    source_url: 'https://www.eventbrite.com/e/landline-comedy-at-wild-east-brewing-tickets-2003269838012',
    verified_at: T,
    description: 'The second December Landline in the same Gowanus taproom, free, with a food pop-up usually running through the show and a drawing for a free pint.',
    tier: 'special',
    featured: false,
    poster: {
      src: '/assets/posters/landline-comedy-wild-east-2026-12-17.jpg',
      width: 3024,
      height: 4032,
      source_url: 'https://www.eventbrite.com/e/landline-comedy-at-wild-east-brewing-tickets-2003269838012',
      credit: 'Artwork: Landline Comedy / Wild East Brewing Co.',
      alt: 'A comedian with a microphone on the Wild East taproom stage in front of rows of aging beer barrels.',
      kind: 'undated official show artwork'
    },
    demand: null,
    demand_checked: T
  },
  {
    id: 'aapi-comedy-night-wild-east-2026-11-28',
    title: 'AAPI Comedy Night - Friendsgiving',
    date: '2026-11-28',
    starts_at: '2026-11-28T19:00:00-05:00',
    ends_at: '2026-11-28T22:00:00-05:00',
    end_time_confirmed: true,
    time_label: '7pm',
    venue: 'Wild East Brewing Co.',
    neighborhood: 'Gowanus',
    price_amount: 0,
    price_label: 'Free',
    ticket_url: 'https://www.wildeastbrewing.com/taproom',
    source_url: 'https://www.wildeastbrewing.com/taproom',
    verified_at: T,
    description: 'The taproom turns into an AAPI showcase on the Saturday after Thanksgiving, free and three hours long, and it is the one Gowanus room with a full night of it.',
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
fs.writeFileSync(picksFile, JSON.stringify(picks, null, 1) + '\n');

// The AAPI night is its own recurring series at the taproom.
if (!recurring.some((r) => r.id === 'aapi-comedy-night-wild-east')) {
  recurring.push({
    id: 'aapi-comedy-night-wild-east',
    title: 'AAPI Comedy Night',
    venue: 'Wild East Brewing Co.',
    neighborhood: 'Gowanus',
    weekday: 6,
    cadence: 'Monthly on a Saturday evening',
    time_label: '7pm',
    price_label: 'Free',
    description: 'AAPI comics and music in the Gowanus taproom, three hours long and free, with the brewery\u2019s food pop-ups running through it.',
    source_url: 'https://www.wildeastbrewing.com/taproom',
    source_label: 'Wild East taproom events page',
    tier: 'recurring',
    verified_at: T,
    verification_note: 'The brewery\u2019s own taproom calendar lists "Sat, Nov. 28th: AAPI Comedy Night - Friendsgiving from 7-10pm. Free". The date follows the monthly pattern of the series, which has run at this room since May.'
  });
}
fs.writeFileSync(recurringFile, JSON.stringify(recurring, null, 1) + '\n');
console.log(`picks: ${added} added, ${picks.length} total · recurring: ${recurring.length} total`);
