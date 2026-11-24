#!/usr/bin/env node
// 2026-11-24 edition, part 3: Flop House Comedy joins the clubs guide.
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const file = path.join(root, 'web', 'data', 'clubs.json');
const clubs = JSON.parse(fs.readFileSync(file, 'utf8'));

if (clubs.some((c) => c.id === 'flop-house-comedy')) {
  console.log('already present');
  process.exit(0);
}

clubs.push({
  id: 'flop-house-comedy',
  tier: 'club',
  name: 'Flop House Comedy',
  rooms: 'One room at 362 Grand St, with the same bills also played at two other addresses',
  address: '362 Grand St, Brooklyn',
  neighborhood: 'Williamsburg',
  price_label: 'From $12.51 to $23.18 incl. fees depending on the show; a $20 monthly pass covers the whole calendar',
  price_low: 12.51,
  price_high: 23.18,
  minimum: 'No drink minimum. The club sells a $20 monthly pass that covers every show on the calendar and auto-renews unless you cancel.',
  age: 'Not stated on the club\u2019s own pages; check the show listing before you go',
  reservations: 'Tickets through Eventbrite, under the Flop House Comedy organizer page. Every listing says no refunds.',
  character: 'A Williamsburg room run by the comedian brothers Nicholas and Nathan Hopping, with a 90-minute showcase most nights: a prime-time bill at eight, a late show at nine-thirty, and an after-hours slot at eleven. The sets are eight to twelve minutes each, so the line-up changes often and somebody new is up every few minutes.',
  calendar_url: 'https://flophousecomedy.com/',
  source_url: 'https://flophousecomedy.com/about',
  source_label: 'The club\u2019s own About page, its monthly-pass page and its Eventbrite organizer page',
  verified_at: '2026-11-24',
  verification_note: 'The no-drink-minimum policy, the $20 monthly pass and the founders come from the club\u2019s own About and Monthly Pass pages. Prices come from the club\u2019s own Eventbrite listings (OnlyFriends $12.51, The Facebook $17.85, The Late Show $23.18) and the Prime Time listing, which states the 90-minute format, six to eight comics with eight-to-twelve-minute sets, no drink minimum, and a done-by-9:30 finish. The club publishes no age policy and no seat count, so both lines say to check the listing rather than guessing.'
});

fs.writeFileSync(file, JSON.stringify(clubs, null, 1) + '\n');
console.log(`clubs: ${clubs.length} entries`);
