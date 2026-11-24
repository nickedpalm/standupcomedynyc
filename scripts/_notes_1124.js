#!/usr/bin/env node
// 2026-11-24 edition, second review pass: give every new pick the
// verification note it should have had, and fix the end-time flags that the
// source pages do not support.
//
// The house rule (DRAFT-NOTES.md, 2026-09-12): end_time_confirmed is true
// only where the source page actually prints an end time. The stranded 11:00
// edition set it true on several picks whose pages print none.
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const picksFile = path.join(root, 'web', 'data', 'picks.json');
const picks = JSON.parse(fs.readFileSync(picksFile, 'utf8'));
const pick = (id) => {
  const p = picks.find((x) => x.id === id);
  if (!p) { console.error('missing pick:', id); process.exit(1); }
  return p;
};

const notes = {
  'thankful-for-laughs-union-hall-2026-11-27':
    'The Union Hall Eventbrite listing gives Friday November 27, doors at 7pm, show 7:30pm to 9pm, 21+, no refunds, and the $15.92 price with fees, and names Jenny Gorelick with Jessie Lee, Charlie Flynn, Julia Shiplett, Nataly Aukar and Shaunak Godkhindi. The end time is on the listing, so end_time_confirmed is true.',
  'immigrant-jam-caveat-2026-12-04':
    "Caveat's own show page for Fri Dec 4 gives doors 6:30pm, show 7:00pm, 21+, no drink minimum, and the three prices: $18.76 early bird until Nov 27, $24.41 standard, $25 at the door. The lineup is Bini Yamin, Loyiso Madinga, Julio Diaz, Cansu Karabiyik and Pedro Gonzalez, hosted by Lucie Pohl. The page prints no end time, so ends_at is an estimate.",
  'feel-the-news-friends-and-lovers-2026-12-05':
    "The room's own event page gives Saturday December 5, 7:00pm to 9:30pm, with Marcela Onyango hosting, books and guests, and the first-Saturday-of-the-month pattern. The end time is on the page, so end_time_confirmed is true. The $12.51 price with fees is from the room's Eventbrite listing.",
  'ruperto-vanderpool-comic-strip-2026-12-05':
    'The Comic Strip Eventbrite listing gives Saturday December 5, doors 7:30pm, show 8pm, 17+ unless with a guardian, a two-item minimum, and the $25.71 price with fees. It names Ruperto Vanderpool, Nick Griffin, Vanessa Hollingshead and Joe Matarese, and a second set at 10:30pm the same night. The listing prints no end time for the 8pm show, so ends_at is an estimate.',
  'immigrant-jam-caveat-2027-01-01':
    "Caveat's own show page for Fri Jan 1 gives doors 6:30pm, show 7:00pm, 21+, no drink minimum, and the three prices: $18.76 early bird until Dec 25, $24.41 standard, $25 at the door. The page prints no end time, so ends_at is an estimate.",
  'yurie-collins-nycc-2027-01-06':
    "The New York Comedy Club Upper West Side event page gives Wednesday January 6 at 7pm, $30.85 GA with fees and $47.15 premium seating, 16+, a $20 per-person minimum in the showroom, and all sales final. The room's own page says the Monsters of Tokyo US tour sold out multiple cities and that this is her first-ever US solo headlining tour. It prints no end time, so ends_at is an estimate.",
  'black-cat-fridays-les-2026-11-27':
    "The producer's Eventbrite listing gives Friday November 27, doors and playlist at 8:30pm, show 9pm to 10:30pm, and asks you to arrive by 8:45pm for the best seating. Kate Willett headlines with Tom McCaffrey, Olivia Stadler, Caroline Hanes, Nina Tarr and Flora Manon. The listing runs free RSVP alongside paid tiers up to $17.85, which is why the price line says both.",
  'prime-time-flop-house-2026-11-27':
    "The Flop House Eventbrite listing gives Friday November 27, 8:00pm to 9:30pm at 362 Grand St, and states the format in its own copy: a 90-minute showcase of six to eight working comics on eight-to-twelve-minute sets, done by 9:30, no drink minimum, no refunds. The end time is on the listing, so end_time_confirmed is true.",
  'grapevine-flop-house-2026-11-25':
    "The Flop House Eventbrite listing gives Wednesday November 25, 9:31pm to 11pm at 362 Grand St, with $12.51 including fees and no refunds. The club's own calendar lists the same slot. The end time is on the listing, so end_time_confirmed is true.",
  'landline-comedy-wild-east-2026-12-03':
    "The Landline Eventbrite listing gives Thursday December 3, doors 8pm, show 8:30pm to 10pm, free with a reserved spot entering you in a drawing for a free drink, and a food pop-up usually running. Myka Fox, Max Fine, Kelly Collette, Matt Goldich, Gabbie Watts and Darragh White are on the bill. The end time is on the listing, so end_time_confirmed is true.",
  'landline-comedy-wild-east-2026-12-17':
    "The Landline Eventbrite listing gives Thursday December 17, doors 8pm, show 8:30pm to 10pm, free with a reserved spot entering you in a drawing for a free drink. Chris Barnes, Sam Evans, Salma Zaky, Hannah Jones, Erik Bergstrom and Vernon Payne are on the bill. The end time is on the listing, so end_time_confirmed is true.",
  'aapi-comedy-night-wild-east-2026-11-28':
    "The brewery's own taproom page lists 'Sat, Nov. 28th: AAPI Comedy Night - Friendsgiving from 7-10pm. Free'. The address, 623 Sackett St, comes from the brewery's own footer. The page prints the end time (10pm), so end_time_confirmed is true."
};

for (const [id, note] of Object.entries(notes)) {
  const p = pick(id);
  p.verification_note = note;
  console.log('note:', id);
}

// The QED pick was already given a note in the first pass; leave it alone.
console.log('done');
fs.writeFileSync(picksFile, JSON.stringify(picks, null, 1) + '\n');
