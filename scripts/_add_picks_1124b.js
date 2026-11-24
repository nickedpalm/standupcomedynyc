#!/usr/bin/env node
// One-off: 2026-11-24 edition, part 2 — the QED and Black Cat picks plus the
// Jan 1 Immigrant Jam ticket link correction.
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const picksFile = path.join(root, 'web', 'data', 'picks.json');
const picks = JSON.parse(fs.readFileSync(picksFile, 'utf8'));
const T = '2026-11-24';

// The Jan 1 Immigrant Jam has its own Eventbrite listing, not the Dec 4 one.
const jan1 = picks.find((p) => p.id === 'immigrant-jam-caveat-2027-01-01');
if (jan1) {
  jan1.ticket_url = 'https://www.eventbrite.com/e/immigrant-jam-tickets-2004965339302';
  jan1.poster.width = 2000;
  jan1.poster.height = 1000;
}

const newPicks = [
  {
    id: 'standuptown-post-thanksgiving-qed-2026-11-27',
    title: 'StandUpTown: A Post Thanksgiving Special',
    date: '2026-11-27',
    starts_at: '2026-11-27T20:00:00-05:00',
    ends_at: '2026-11-27T21:30:00-05:00',
    end_time_confirmed: false,
    time_label: '8pm',
    venue: 'QED Astoria',
    neighborhood: 'Astoria',
    price_amount: 15,
    price_label: '$15 general admission',
    ticket_url: 'https://qedastoria.com/products/standuptown-q-e-d',
    source_url: 'https://qedastoria.com/products/standuptown-q-e-d',
    verified_at: T,
    description: 'StandUpTown brings the Friday after Thanksgiving to the Astoria room with Santiago Angel, Megan McMurtry, Hyde Healy, Michael Brigante and Bini Yamin, and the club asks you to read its ticketing policies before you pay.',
    tier: 'special',
    featured: false,
    poster: {
      src: '/assets/posters/standuptown-qed-2026-11-27.png',
      width: 1024,
      height: 1024,
      source_url: 'https://qedastoria.com/products/standuptown-q-e-d',
      credit: 'Artwork: Q.E.D. Astoria',
      alt: 'StandUpTown at Q.E.D. artwork for the November 27, 2026 post-Thanksgiving show.',
      kind: 'dated event flyer'
    },
    demand: null,
    demand_checked: T
  },
  {
    id: 'black-cat-fridays-les-2026-11-27',
    title: 'Black Cat Fridays',
    date: '2026-11-27',
    starts_at: '2026-11-27T21:00:00-05:00',
    ends_at: '2026-11-27T22:30:00-05:00',
    end_time_confirmed: true,
    time_label: '9pm · doors 8:30pm',
    venue: 'Black Cat LES',
    neighborhood: 'Lower East Side',
    price_amount: 0,
    price_label: 'Free RSVP; $0-$17.85 tiers on the listing',
    ticket_url: 'https://www.eventbrite.com/e/black-cat-fridays-stand-up-comedy-tickets-1990458641378',
    source_url: 'https://www.eventbrite.com/e/black-cat-fridays-stand-up-comedy-tickets-1990458641378',
    verified_at: T,
    description: 'Kate Willett headlines Black Friday at the Rivington Street cafe-bar with Tom McCaffrey, Olivia Stadler and Caroline Hanes, and the room asks you to arrive by quarter to nine if you want a seat.',
    tier: 'special',
    featured: false,
    poster: {
      src: '/assets/posters/black-cat-fridays-les-2026-11-27.jpg',
      width: 1774,
      height: 887,
      source_url: 'https://www.eventbrite.com/e/black-cat-fridays-stand-up-comedy-tickets-1990458641378',
      credit: 'Artwork: Black Cat LES / show organizer',
      alt: 'Black Cat Fridays promotional artwork for the Lower East Side room.',
      kind: 'dated event flyer'
    },
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
console.log(`picks: ${added} added, ${picks.length} total`);
