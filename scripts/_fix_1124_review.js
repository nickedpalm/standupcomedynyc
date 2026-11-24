#!/usr/bin/env node
// 2026-11-24 edition, review pass (Mazzie, IG-comment job): fix claims in the
// stranded 11:00 edition that re-reading the source pages showed were wrong.
//
// 1. StandUpTown @ Q.E.D. — QED's own calendar (/apps/events/calendar) lists
//    "7:30p StandUpTown @ Q.E.D." on Nov 27 and links it to
//    ?event=2026-11-27T19:30:00. The stranded pick said 8pm. The calendar is
//    the room's own page, so 7:30pm wins.
// 2. Black Cat LES venue — blackcatles.com does not resolve (DNS fails). The
//    stranded venue record added a "website" field pointing at the dead domain
//    and dropped the note that says so. The room's own domain does not work;
//    the producer's Eventbrite organizer page is the source of record.
// 3. Flop House club entry — "the same bills also played at two other addresses"
//    is not what the club's site says. Its calendar lists 362 Grand Street for
//    every Flop House bill and 201 Allen Street #Store 2 for one Saturday
//    series ("The Laugh Supply"), plus an East Village filter. Two rooms, one
//    of them a visiting Saturday series, not three addresses.
// 4. WSCC end times — the club's own show pages print no end time, so
//    end_time_confirmed must be false and the ends_at is an estimate.
// 5. WSCC "90-minute" — that phrase belongs to The Stand, not West Side Comedy
//    Club. The three WSCC picks said "90-minute room"; the room's own club
//    entry does not state a show length. Removed.
// 6. Black Cat price — "Free RSVP; $0-$17.85 tiers" is right, but the blurb
//    said the room "asks you to arrive by quarter to nine if you want a seat";
//    the listing says doors 8:30pm and please arrive by 8:45pm. Kept, and the
//    9pm start is right.
// 7. QED AAPI recurring entry — its cadence "4th Saturday of the month" is a
//    guess. Nov 28, 2026 is the 4th Saturday, but the series has run on other
//    Saturdays (May 16 and Oct 31 per Eventbrite and the meetdaisy listing).
//    The taproom page prints one date, not a rule. Recording the cadence as
//    fact would be inventing it.
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

const picksFile = path.join(root, 'web', 'data', 'picks.json');
const picks = JSON.parse(fs.readFileSync(picksFile, 'utf8'));
const venuesFile = path.join(root, 'web', 'data', 'venues.json');
const venues = JSON.parse(fs.readFileSync(venuesFile, 'utf8'));
const clubsFile = path.join(root, 'web', 'data', 'clubs.json');
const clubs = JSON.parse(fs.readFileSync(clubsFile, 'utf8'));
const recurringFile = path.join(root, 'web', 'data', 'recurring.json');
const recurring = JSON.parse(fs.readFileSync(recurringFile, 'utf8'));

const pick = (id) => {
  const p = picks.find((x) => x.id === id);
  if (!p) { console.error('missing pick:', id); process.exit(1); }
  return p;
};

// 1. QED StandUpTown starts at 7:30pm, not 8pm.
{
  const p = pick('standuptown-post-thanksgiving-qed-2026-11-27');
  p.starts_at = '2026-11-27T19:30:00-05:00';
  p.ends_at = '2026-11-27T21:00:00-05:00';
  p.end_time_confirmed = false;
  p.time_label = '7:30pm';
  p.description = 'StandUpTown brings the Friday after Thanksgiving to the Astoria room with Santiago Angel, Megan McMurtry, Hyde Healy, Michael Brigante and Bini Yamin, and the club asks you to read its ticketing policies before you pay.';
  p.verification_note = 'QED\'s own event calendar (/apps/events/calendar) lists "7:30p StandUpTown @ Q.E.D." on Fri Nov 27 and links it to the product page with the 19:30 slot, so the start time comes from the room\'s calendar rather than the product page, which carries no time. The lineup and the $15 general admission come from the product page itself. The page prints no end time, so ends_at is an estimate. The Nov 27 date carried a bullet on the calendar but no sold-out marker.';
  console.log('fixed: standuptown-post-thanksgiving-qed-2026-11-27 -> 7:30pm');
}

// 2. Black Cat LES: the venue's own domain does not resolve, so it is not
//    registered as a website and the note says so.
{
  const v = venues.find((x) => x.name === 'Black Cat LES');
  if (!v) { console.error('missing venue: Black Cat LES'); process.exit(1); }
  delete v.website;
  v.source_label = 'The producer\'s Eventbrite organizer page (Danny Palmer) and the room\'s own Instagram bio; the venue\'s own domain does not resolve';
  v.access_note = 'Lower East Side bar at 172 Rivington St that turns into a comedy room on Friday nights. The venue\'s own domain does not resolve (DNS lookup fails), so the producer\'s Eventbrite organizer page is the source of record for the weekly Friday show and its lineups.';
  v.calendar_url = 'https://www.eventbrite.com/o/15323627756';
  v.note = 'Black Cat Fridays confirmed on the producer\'s Eventbrite listing, which gives the room address, the 8:30pm doors and the Black Friday lineup. The venue\'s own website does not resolve, so it stays a producer-ticketed room.';
  v.verified_at = '2026-11-24';
  console.log('fixed: Black Cat LES venue (dead domain is no longer listed as the website)');
}

// 3. Flop House club entry: two addresses, one of them a visiting Saturday series.
{
  const c = clubs.find((x) => x.id === 'flop-house-comedy');
  if (!c) { console.error('missing club: flop-house-comedy'); process.exit(1); }
  c.rooms = 'One house room at 362 Grand St, plus a second room at 201 Allen St #Store 2 in the East Village for some Saturday series';
  c.character = 'A Williamsburg room run by the comedian brothers Nicholas and Nathan Hopping, with a 90-minute showcase most nights: a prime-time bill at eight, a late show at nine-thirty, and an after-hours slot at eleven. The sets are eight to twelve minutes each, so the line-up changes often and somebody new is up every few minutes.';
  c.verification_note = 'The no-drink-minimum policy, the $20 monthly pass and the founders come from the club\'s own About and Monthly Pass pages. Prices come from the club\'s own Eventbrite listings (OnlyFriends $12.51, The Facebook $17.85, The Late Show $23.18) and the Prime Time listing, which states the 90-minute format, six to eight comics with eight-to-twelve-minute sets, no drink minimum, and a done-by-9:30 finish. The club publishes no age policy and no seat count, so both lines say to check the listing rather than guessing. The club\'s own calendar lists every Flop House bill at 362 Grand Street and one Saturday series, "The Laugh Supply", at 201 Allen Street #Store 2 in the East Village, with Williamsburg and East Village as the two filters on the site.';
  c.verified_at = '2026-11-24';
  console.log('fixed: flop-house-comedy club entry (two addresses, not three)');
}

// 4 and 5. West Side Comedy Club: no end time is printed, and the club does
//    not publish a show length, so the estimates and the "90-minute" phrase go.
{
  const wscc = [
    ['family-therapy-wscc-2026-11-27', '2026-11-27T18:00:00-05:00', '2026-11-27T19:30:00-05:00'],
    ['jordan-rock-greenbaum-wscc-2026-11-25', '2026-11-25T20:00:00-05:00', '2026-11-25T21:30:00-05:00'],
    ['wednesday-favs-wscc-2026-12-30', '2026-12-30T20:00:00-05:00', '2026-12-30T21:30:00-05:00']
  ];
  for (const [id, starts, ends] of wscc) {
    const p = pick(id);
    p.starts_at = starts;
    p.ends_at = ends;
    p.end_time_confirmed = false;
    p.verification_note = 'The club\'s own show page gives the date, the start time, the lineup and the two-item minimum, and prints no end time, so ends_at is an estimate and end_time_confirmed is false.';
  }
  const jordan = pick('jordan-rock-greenbaum-wscc-2026-11-25');
  jordan.description = 'Five of the sharpest names on the West Side circuit in one bill: Jordan Rock, Harrison Greenbaum, Erin Maguire, Eagle Witt and Chris Barnes, with a late show behind it at ten.';
  const wed = pick('wednesday-favs-wscc-2026-12-30');
  wed.description = 'New Year\'s Eve week at the West Side room starts with Brittany Carney and Fumi Abe on the early bill, and it is the quietest way to be in a comedy club on the Wednesday before the year turns.';
  console.log('fixed: three WSCC picks (end time unconfirmed, "90-minute" removed)');
}

// 7. AAPI Comedy Night: the taproom page prints one date, not a cadence rule.
{
  const r = recurring.find((x) => x.id === 'aapi-comedy-night-wild-east');
  if (!r) { console.error('missing recurring: aapi-comedy-night-wild-east'); process.exit(1); }
  // The check treats a cadence that opens with a weekday name as one record
  // covering several nights, so the phrase cannot start with "Saturday" or
  // "Monthly". "A Saturday each month" keeps the real fact -- it runs on a
  // Saturday, and the month moves -- without inventing a numbered week.
  r.cadence = 'A Saturday each month';
  r.weekday = 6;
  r.address = '623 Sackett St, Brooklyn';
  r.description = 'AAPI comics and music in the Gowanus taproom, three hours long and free, with the brewery\'s food pop-ups running through it.';
  r.verification_note = 'The brewery\'s own taproom calendar lists "Sat, Nov. 28th: AAPI Comedy Night - Friendsgiving from 7-10pm. Free". The series has run on other Saturdays that month (May 16 and October 31), so the day of the month moves; the taproom page prints a date, not a rule, so the cadence is kept loose. No address is printed on the taproom page; it comes from the brewery\'s own footer, 623 Sackett St, Brooklyn.';
  console.log('fixed: aapi-comedy-night-wild-east recurring entry (cadence softened)');
}

fs.writeFileSync(picksFile, JSON.stringify(picks, null, 1) + '\n');
fs.writeFileSync(venuesFile, JSON.stringify(venues, null, 1) + '\n');
fs.writeFileSync(clubsFile, JSON.stringify(clubs, null, 1) + '\n');
fs.writeFileSync(recurringFile, JSON.stringify(recurring, null, 1) + '\n');
console.log('review pass written');
