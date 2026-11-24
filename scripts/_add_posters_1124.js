#!/usr/bin/env node
// 2026-11-24 edition: POSTER-SOURCES records for the artwork added today.
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const root = path.join(__dirname, '..');
const file = path.join(root, 'POSTER-SOURCES.json');
const sources = JSON.parse(fs.readFileSync(file, 'utf8'));

const newRecords = [
  {
    event_id: 'thankful-for-laughs-union-hall-2026-11-27',
    src: '/assets/posters/thankful-for-laughs-union-hall-2026-11-27.png',
    width: 2160,
    height: 1080,
    source_url: 'https://www.eventbrite.com/e/thankful-for-laughs-with-jenny-gorelick-and-friends-tickets-2005299914024',
    credit: 'Artwork: Union Hall / show organizer',
    alt: 'Thankful for Laughs with Jenny Gorelick and Friends flyer for Union Hall, Friday November 27, 2026.',
    kind: 'dated event flyer',
    original_image_url: 'https://cdn.evbuc.com/images/1198548867/282041210522/1/original.20261123-180116?crop=focalpoint&fit=crop&w=1880&auto=format,compress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=1c7ce2085a08ffd195cf794cb27fa84f',
    retrieved_at: '2026-11-24'
  },
  {
    event_id: 'immigrant-jam-caveat-2026-12-04',
    src: '/assets/posters/immigrant-jam-caveat-2026-12-04.jpg',
    width: 2000,
    height: 1000,
    source_url: 'https://www.caveat.nyc/events/immigrant-jam-2026-12-04',
    credit: 'Artwork: Caveat',
    alt: 'Immigrant Jam promotional artwork for Caveat, Friday December 4, 2026.',
    kind: 'dated event flyer',
    original_image_url: 'https://caveat-web.s3.us-east-1.amazonaws.com/showposting/recdIV2LPHkipjNLi_20260311_161615_custom_image_url_immigrant.jpeg',
    retrieved_at: '2026-11-24'
  },
  {
    event_id: 'feel-the-news-friends-and-lovers-2026-12-05',
    src: '/assets/posters/feel-the-news-friends-and-lovers-2026-12-05.webp',
    width: 1080,
    height: 1350,
    source_url: 'https://www.fnlbk.com/upcoming/2026/12/5/feel-the-news-live-comedy',
    credit: 'Artwork: Friends and Lovers / show organizer',
    alt: 'Feel The News December flyer for Friends and Lovers.',
    kind: 'dated event flyer',
    original_image_url: 'https://images.squarespace-cdn.com/content/v1/56c6564062cd9453ad1050e8/1795453378618-ZPB0X5G46V234O5PXP12/Feel+the+News+December+.png',
    retrieved_at: '2026-11-24'
  },
  {
    event_id: 'ruperto-vanderpool-comic-strip-2026-12-05',
    src: '/assets/posters/ruperto-vanderpool-comic-strip-2026-12-05.jpg',
    width: 1880,
    height: 1058,
    source_url: 'https://www.eventbrite.com/e/ruperto-vanderpool-nick-griffin-vanessa-hollingshead-joe-matarese-more-tickets-2004550794387',
    credit: 'Artwork: Comic Strip Live / show organizer',
    alt: 'Comic Strip Live flyer for the December 5, 2026 lineup with Ruperto Vanderpool and Nick Griffin.',
    kind: 'dated event flyer',
    original_image_url: 'https://cdn.evbuc.com/images/1198417758/136153380524/1/original.20261120-205132?crop=focalpoint&fit=crop&w=1880&auto=format,compress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=907020bbc3a270c22ea9509f04d32008',
    retrieved_at: '2026-11-24'
  },
  {
    event_id: 'wednesday-favs-wscc-2026-12-30',
    src: '/assets/posters/wednesday-favs-wscc-2026-12-30.jpg',
    width: 748,
    height: 874,
    source_url: 'https://westsidecomedyclub.com/shows/wednesday-favs-16821',
    credit: 'Artwork: West Side Comedy Club',
    alt: 'Wednesday Favs artwork for West Side Comedy Club, showing Brittany Carney.',
    kind: 'dated event flyer',
    original_image_url: 'https://imagedelivery.net/7Ze32-hXUdrEDVtqvlbDMQ/ab9ad952-d30a-47d4-eccb-d68d8f604b00/width=2000,fit=scale-down',
    retrieved_at: '2026-11-24'
  },
  {
    event_id: 'immigrant-jam-caveat-2027-01-01',
    src: '/assets/posters/immigrant-jam-caveat-2027-01-01.jpg',
    width: 2000,
    height: 1000,
    source_url: 'https://www.caveat.nyc/events/immigrant-jam-2027-01-01',
    credit: 'Artwork: Caveat',
    alt: 'Immigrant Jam promotional artwork for Caveat, Friday January 1, 2027.',
    kind: 'dated event flyer',
    original_image_url: 'https://cdn.evbuc.com/images/1198182323/207096185123/1/original.20261117-184120?crop=focalpoint&fit=crop&w=1880&auto=format,compress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=a5a8520c0943e2c2a05d9bff35a4a2f3',
    retrieved_at: '2026-11-24'
  },
  {
    event_id: 'yurie-collins-nycc-2027-01-06',
    src: '/assets/posters/yurie-collins-nycc-2027-01-06.jpg',
    width: 1040,
    height: 660,
    source_url: 'https://newyorkcomedyclub.com/events/yurie-collins-2027-01-06190000',
    credit: 'Artwork: New York Comedy Club',
    alt: 'Yurie Collins: People Different promotional artwork for the New York Comedy Club Upper West Side, January 6, 2027.',
    kind: 'dated event flyer',
    original_image_url: 'https://newyorkcomedyclub.com/img/events/Yurie-Collins-PEOPLE-DIFFERENT-NYCC-UWS-Jan-6-2027-Graphics-1072x680-2-13bb1a62-main-image.jpg',
    retrieved_at: '2026-11-24'
  },
  {
    event_id: 'standuptown-qed-2026-11-27',
    src: '/assets/posters/standuptown-qed-2026-11-27.png',
    width: 1024,
    height: 1024,
    source_url: 'https://qedastoria.com/products/standuptown-q-e-d',
    credit: 'Artwork: Q.E.D. Astoria',
    alt: 'StandUpTown at Q.E.D. artwork for the November 27, 2026 post-Thanksgiving show.',
    kind: 'dated event flyer',
    original_image_url: 'https://qedastoria.com/cdn/shop/files/IMG_3785_1024x1024.png?v=1794369204',
    retrieved_at: '2026-11-24'
  },
  {
    event_id: 'black-cat-fridays-les-2026-11-27',
    src: '/assets/posters/black-cat-fridays-les-2026-11-27.jpg',
    width: 1774,
    height: 887,
    source_url: 'https://www.eventbrite.com/e/black-cat-fridays-stand-up-comedy-tickets-1990458641378',
    credit: 'Artwork: Black Cat LES / show organizer',
    alt: 'Black Cat Fridays promotional artwork for the Lower East Side room.',
    kind: 'dated event flyer',
    original_image_url: 'https://cdn.evbuc.com/images/1182746896/27072033929/1/original.20260422-042616?crop=focalpoint&fit=crop&w=1880&auto=format,compress&q=75&sharp=10&fp-x=0.488&fp-y=0.528&s=d52b114a1e7740c7edeb7a613fb6fafc',
    retrieved_at: '2026-11-24'
  }
];

const have = new Set(sources.map((s) => s.src));
let added = 0;
for (const rec of newRecords) {
  if (have.has(rec.src)) { console.log('skip (exists):', rec.src); continue; }
  const abs = path.join(root, 'web', rec.src.replace(/^\//, ''));
  const buf = fs.readFileSync(abs);
  rec.bytes = buf.length;
  rec.sha256 = crypto.createHash('sha256').update(buf).digest('hex');
  rec.reuse_status = 'Official promotional artwork; no separate reuse license identified. Site display with credit only.';
  sources.push(rec);
  have.add(rec.src);
  added++;
}
fs.writeFileSync(file, JSON.stringify(sources, null, 1) + '\n');
console.log(`poster records: ${added} added, ${sources.length} total`);
