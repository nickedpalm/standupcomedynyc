#!/usr/bin/env node
// One-off: add the 2026-11-24 edition picks. Every page was opened before writing.
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const file = path.join(root, 'web', 'data', 'picks.json');
const picks = JSON.parse(fs.readFileSync(file, 'utf8'));

const T = '2026-11-24';

const newPicks = [
  {
    id: 'thankful-for-laughs-union-hall-2026-11-27',
    title: 'Thankful for Laughs with Jenny Gorelick and Friends',
    date: '2026-11-27',
    starts_at: '2026-11-27T19:30:00-05:00',
    ends_at: '2026-11-27T21:00:00-05:00',
    end_time_confirmed: true,
    time_label: '7:30pm · doors 7pm',
    venue: 'Union Hall',
    neighborhood: 'Park Slope',
    price_amount: 15.92,
    price_label: '$15.92 incl. fees',
    ticket_url: 'https://www.eventbrite.com/e/thankful-for-laughs-with-jenny-gorelick-and-friends-tickets-2005299914024',
    source_url: 'https://www.eventbrite.com/e/thankful-for-laughs-with-jenny-gorelick-and-friends-tickets-2005299914024',
    verified_at: T,
    description: 'Jenny Gorelick hosts a Black Friday bill built around her own crowd: Jessie Lee, Charlie Flynn, Julia Shiplett, Nataly Aukar and Shaunak Godkhindi, 90 minutes in the Park Slope room with no refunds and no surprises.',
    tier: 'special',
    featured: false,
    poster: {
      src: '/assets/posters/thankful-for-laughs-union-hall-2026-11-27.png',
      width: 2160,
      height: 1080,
      source_url: 'https://www.eventbrite.com/e/thankful-for-laughs-with-jenny-gorelick-and-friends-tickets-2005299914024',
      credit: 'Artwork: Union Hall / show organizer',
      alt: 'Thankful for Laughs with Jenny Gorelick and Friends flyer for Union Hall, Friday November 27, 2026.',
      kind: 'dated event flyer'
    },
    demand: null,
    demand_checked: T
  },
  {
    id: 'immigrant-jam-caveat-2026-12-04',
    title: 'Immigrant Jam',
    date: '2026-12-04',
    starts_at: '2026-12-04T19:00:00-05:00',
    ends_at: '2026-12-04T21:00:00-05:00',
    end_time_confirmed: false,
    time_label: '7pm · doors 6:30pm',
    venue: 'Caveat',
    neighborhood: 'Lower East Side',
    price_amount: 18.76,
    price_label: '$18.76 early bird incl. fees (until Nov 27); $24.41 standard; $25 at the door',
    ticket_url: 'https://www.eventbrite.com/e/immigrant-jam-tickets-1998827650309',
    source_url: 'https://www.caveat.nyc/events/immigrant-jam-2026-12-04',
    verified_at: T,
    description: 'Lucie Pohl hosts the Lower East Side room with Bini Yamin, Loyiso Madinga, Julio Diaz, Cansu Karabiyik and Pedro Gonzalez, 21+, no drink minimum, and early-bird tickets that go up before the holiday.',
    tier: 'special',
    featured: false,
    poster: {
      src: '/assets/posters/immigrant-jam-caveat-2026-12-04.jpg',
      width: 2000,
      height: 1000,
      source_url: 'https://www.caveat.nyc/events/immigrant-jam-2026-12-04',
      credit: 'Artwork: Caveat',
      alt: 'Immigrant Jam promotional artwork for Caveat, Friday December 4, 2026.',
      kind: 'dated event flyer'
    },
    demand: null,
    demand_checked: T
  },
  {
    id: 'feel-the-news-friends-and-lovers-2026-12-05',
    title: 'Feel The News',
    date: '2026-12-05',
    starts_at: '2026-12-05T19:00:00-05:00',
    ends_at: '2026-12-05T21:30:00-05:00',
    end_time_confirmed: true,
    time_label: '7pm',
    venue: 'Friends and Lovers',
    neighborhood: 'Crown Heights',
    price_amount: 12.51,
    price_label: '$12.51 incl. fees',
    ticket_url: 'https://www.eventbrite.com/e/feel-the-news-comedy-tickets-2005296025393',
    source_url: 'https://www.fnlbk.com/upcoming/2026/12/5/feel-the-news-live-comedy',
    verified_at: T,
    description: 'Marcela Onyango hands the news back to the room for two and a half hours on the first Saturday of the month, with books, guests and a different worry every time, and it raises money for mutual aid.',
    tier: 'special',
    featured: false,
    poster: {
      src: '/assets/posters/feel-the-news-friends-and-lovers-2026-12-05.webp',
      width: 1080,
      height: 1350,
      source_url: 'https://www.fnlbk.com/upcoming/2026/12/5/feel-the-news-live-comedy',
      credit: 'Artwork: Friends and Lovers / show organizer',
      alt: 'Feel The News December flyer for Friends and Lovers.',
      kind: 'dated event flyer'
    },
    demand: null,
    demand_checked: T
  },
  {
    id: 'ruperto-vanderpool-comic-strip-2026-12-05',
    title: 'Ruperto Vanderpool, Nick Griffin, Vanessa Hollingshead, Joe Matarese and more',
    date: '2026-12-05',
    starts_at: '2026-12-05T20:00:00-05:00',
    ends_at: '2026-12-05T21:30:00-05:00',
    end_time_confirmed: false,
    time_label: '8pm · doors 7:30pm',
    venue: 'Comic Strip Live',
    neighborhood: 'Upper East Side',
    price_amount: 25.71,
    price_label: '$25.71 incl. fees (two-item minimum inside the show room)',
    ticket_url: 'https://www.eventbrite.com/e/ruperto-vanderpool-nick-griffin-vanessa-hollingshead-joe-matarese-more-tickets-2004550794387',
    source_url: 'https://www.eventbrite.com/e/ruperto-vanderpool-nick-griffin-vanessa-hollingshead-joe-matarese-more-tickets-2004550794387',
    verified_at: T,
    description: 'Fifty years of the Strip in one bill: Ruperto Vanderpool and Nick Griffin headlining with Vanessa Hollingshead and Joe Matarese, 17+ unless a guardian comes along, and a second set at 10:30pm on the same night.',
    tier: 'special',
    featured: false,
    poster: {
      src: '/assets/posters/ruperto-vanderpool-comic-strip-2026-12-05.jpg',
      width: 1880,
      height: 1058,
      source_url: 'https://www.eventbrite.com/e/ruperto-vanderpool-nick-griffin-vanessa-hollingshead-joe-matarese-more-tickets-2004550794387',
      credit: 'Artwork: Comic Strip Live / show organizer',
      alt: 'Comic Strip Live flyer for the December 5, 2026 lineup with Ruperto Vanderpool and Nick Griffin.',
      kind: 'dated event flyer'
    },
    demand: null,
    demand_checked: T
  },
  {
    id: 'family-therapy-wscc-2026-11-27',
    title: 'Family Therapy',
    date: '2026-11-27',
    starts_at: '2026-11-27T18:00:00-05:00',
    ends_at: '2026-11-27T19:30:00-05:00',
    end_time_confirmed: true,
    time_label: '6pm',
    venue: 'West Side Comedy Club',
    neighborhood: 'Upper West Side',
    price_amount: null,
    price_label: 'See ticket page for price (two-item minimum)',
    ticket_url: 'https://westsidecomedyclub.com/shows/family-therapy-16577',
    source_url: 'https://westsidecomedyclub.com/shows/family-therapy-16577',
    verified_at: T,
    description: 'The early Friday show under Playa Betty\u2019s on the Upper West Side, and the one the club bills as clean and all ages: no swearing, no phones, just comics working out the week\u2019s mess in front of you.',
    tier: 'special',
    featured: false,
    demand: null,
    demand_checked: T
  },
  {
    id: 'jordan-rock-greenbaum-wscc-2026-11-25',
    title: 'Jordan Rock, Harrison Greenbaum, Erin Maguire, Eagle Witt, Chris Barnes & more',
    date: '2026-11-25',
    starts_at: '2026-11-25T20:00:00-05:00',
    ends_at: '2026-11-25T21:30:00-05:00',
    end_time_confirmed: true,
    time_label: '8pm',
    venue: 'West Side Comedy Club',
    neighborhood: 'Upper West Side',
    price_amount: null,
    price_label: 'See ticket page for price (two-item minimum)',
    ticket_url: 'https://westsidecomedyclub.com/shows/jordan-rock-harrison-greenbaum-erin-maguire-eagle-witt-chris-barnes-and-more-15925',
    source_url: 'https://westsidecomedyclub.com/shows/jordan-rock-harrison-greenbaum-erin-maguire-eagle-witt-chris-barnes-and-more-15925',
    verified_at: T,
    description: 'Five of the sharpest names on the West Side circuit in one 90-minute room: Jordan Rock, Harrison Greenbaum, Erin Maguire, Eagle Witt and Chris Barnes, with the late show behind it at ten.',
    tier: 'special',
    featured: false,
    demand: null,
    demand_checked: T
  },
  {
    id: 'wednesday-favs-wscc-2026-12-30',
    title: 'Wednesday Favs',
    date: '2026-12-30',
    starts_at: '2026-12-30T20:00:00-05:00',
    ends_at: '2026-12-30T21:30:00-05:00',
    end_time_confirmed: true,
    time_label: '8pm',
    venue: 'West Side Comedy Club',
    neighborhood: 'Upper West Side',
    price_amount: null,
    price_label: 'See ticket page for price (two-item minimum)',
    ticket_url: 'https://westsidecomedyclub.com/shows/wednesday-favs-16821',
    source_url: 'https://westsidecomedyclub.com/shows/wednesday-favs-16821',
    verified_at: T,
    description: 'New Year\u2019s Eve week at the West Side room starts with Brittany Carney and Fumi Abe on the early bill, and it is the quietest way to be in a comedy club on the Wednesday before the year turns.',
    tier: 'special',
    featured: false,
    poster: {
      src: '/assets/posters/wednesday-favs-wscc-2026-12-30.jpg',
      width: 748,
      height: 874,
      source_url: 'https://westsidecomedyclub.com/shows/wednesday-favs-16821',
      credit: 'Artwork: West Side Comedy Club',
      alt: 'Wednesday Favs artwork for West Side Comedy Club, showing Brittany Carney.',
      kind: 'dated event flyer'
    },
    demand: null,
    demand_checked: T
  },
  {
    id: 'immigrant-jam-caveat-2027-01-01',
    title: 'Immigrant Jam',
    date: '2027-01-01',
    starts_at: '2027-01-01T19:00:00-05:00',
    ends_at: '2027-01-01T21:00:00-05:00',
    end_time_confirmed: false,
    time_label: '7pm · doors 6:30pm',
    venue: 'Caveat',
    neighborhood: 'Lower East Side',
    price_amount: 18.76,
    price_label: '$18.76 early bird incl. fees (until Dec 25); $24.41 standard; $25 at the door',
    ticket_url: 'https://www.eventbrite.com/e/immigrant-jam-tickets-1998827650309',
    source_url: 'https://www.caveat.nyc/events/immigrant-jam-2027-01-01',
    verified_at: T,
    description: 'The room that keeps a New Year\u2019s Day show: Lucie Pohl hosts the Lower East Side with immigrant and first-generation comics, and the early-bird price still holds through Christmas night.',
    tier: 'special',
    featured: false,
    poster: {
      src: '/assets/posters/immigrant-jam-caveat-2027-01-01.jpg',
      width: 2000,
      height: 1000,
      source_url: 'https://www.caveat.nyc/events/immigrant-jam-2027-01-01',
      credit: 'Artwork: Caveat',
      alt: 'Immigrant Jam promotional artwork for Caveat, Friday January 1, 2027.',
      kind: 'dated event flyer'
    },
    demand: null,
    demand_checked: T
  },
  {
    id: 'yurie-collins-nycc-2027-01-06',
    title: 'Yurie Collins: People Different',
    date: '2027-01-06',
    starts_at: '2027-01-06T19:00:00-05:00',
    ends_at: '2027-01-06T21:00:00-05:00',
    end_time_confirmed: false,
    time_label: '7pm',
    venue: 'New York Comedy Club (Upper West Side)',
    neighborhood: 'Upper West Side',
    price_amount: 30.85,
    price_label: '$30.85 incl. fees GA; $47.15 premium seating',
    ticket_url: 'https://newyorkcomedyclub.com/events/yurie-collins-2027-01-06190000',
    source_url: 'https://newyorkcomedyclub.com/events/yurie-collins-2027-01-06190000',
    verified_at: T,
    description: 'A bilingual English-and-Japanese comic brings her first U.S. solo headline tour to the West Side room, on the back of two Japanese specials and a Monsters of Tokyo run that sold out across America.',
    tier: 'special',
    featured: false,
    poster: {
      src: '/assets/posters/yurie-collins-nycc-2027-01-06.jpg',
      width: 1040,
      height: 660,
      source_url: 'https://newyorkcomedyclub.com/events/yurie-collins-2027-01-06190000',
      credit: 'Artwork: New York Comedy Club',
      alt: 'Yurie Collins: People Different promotional artwork for the New York Comedy Club Upper West Side, January 6, 2027.',
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

fs.writeFileSync(file, JSON.stringify(picks, null, 1) + '\n');
console.log(`picks: ${added} added, ${picks.length} total`);
