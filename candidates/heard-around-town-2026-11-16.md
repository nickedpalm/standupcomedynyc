# Heard around town — week of November 16, 2026

Draft for review. Not on the site. Not committed. Five items, in our voice — plain, specific, the kind of sentence a friend would send you in a text. Sources at the bottom of each item.

The New York Comedy Festival closed on Sunday, November 15. That takes the festival out of the way and puts the city back in its regular rooms, which is where this week's five come from.

---

**1. Michelle Wolf plays The Town Hall on Thursday, and it is the political hour live, not a filmed version.**
Her new hour, Best Job in the World, plays The Town Hall, 123 W 43rd St, Manhattan, Thursday, November 19, 7:00 PM, doors at 6:00 PM. The Village Voice has been calling her "the voice comedy needs right now," and four specials in she still does the political show she writes every week — in the room where Andy Kaufman played in the 1970s, per the Town Hall's own history page. Price is on the Town Hall ticket page.

Source: [Michelle Wolf: Best Job in the World at The Town Hall](https://www.thetownhall.org/event/michelle-wolf-best-job-in-the-world)

**2. Fahim Anwar sold out the early show at the Bell House, so the late one is the one to book.**
The 7:30 PM set on Friday, November 20 is marked SOLD OUT on Ticketmaster; there is a second 10:00 PM show on its own ticket page and it is still selling at $38.20 including fees. The Bell House, 149 7th St, Brooklyn, Friday, November 20, 10:00 PM. If you had the early show in your calendar, move it rather than give up on it.

Source: [Fahim Anwar at The Bell House, Nov 20 10:00 PM](https://www.ticketmaster.com/fahim-anwar-brooklyn-new-york-11-20-2026/event/300065560B2A0F77)

**3. The Whiskey Cellar show with 35 seats and a bar tab up for grabs is nearly out of tickets.**
Team Comedy's One in 35 runs Thursday, November 19, 8:30 PM at the Whiskey Cellar, 77 East 7th St, Manhattan, $15 with no drink minimum. The promoter says the last three shows sold out and that four seats are left; Eventbrite now reads "few tickets left." Thirty-five numbered seats, one number drawn at the end, and whoever is sitting in it gets the bar tab paid.

Source: [ONE IN 35 at Whiskey Cellar NYC](https://www.eventbrite.com/e/one-in-35-stand-up-comedy-with-a-one-in-35-chance-your-drinks-are-on-us-tickets-1988657104934)

**4. The Pachelbel Rant turns 20 this month, and Rob Paravonian is marking it in a room instead of on a feed.**
The 2006 video about his hatred of the Canon in D built a career years before the feed existed, and he is marking the anniversary with stories, songs and an updated version of the rant. Caveat, 21A Clinton St, New York, NY, Monday, November 23, doors 6:30 PM, show 7:00 PM, $18.76 standard or $20 at the door, and an $11.63 livestream if you would rather watch from your couch.

Source: [The Pachelbel Rant 20th Anniversary Show at Caveat](https://caveat.nyc/events/the-pachelbel-rant-20th-anniversary-show-2026-11-23)

**5. There is free comedy in a Bushwick cellar on Tuesday, with a Last Comic Standing finalist headlining.**
The producer's own post: a cellar in the quiet part of Bushwick, shows Tuesdays at 7:00 PM and an open mic Fridays at 10 and midnight, free entry and free beer while it lasts. Tuesday, November 17, 7:00 PM, tickets by comment on the post. Rob Cantrell headlines, hosted by Victor Varnado. Bibblebash, 1139 Jefferson Ave #1, Brooklyn.

Source: [The Tuesday 7pm Show at Bibblebash](https://www.reddit.com/r/Bushwick/comments/1xwgiwn/the_tuesday_7pm_show_at_bibblebash_off_the_halsey/)

---

### Sources and notes for the editor

- **Research runs (last30days, `--search=reddit,hackernews --days=30`, four runs, all recorded in candidates/research-cache.json).** The three highest-heat performers in candidates/heat.json are Jessica Kirson, Fahim Anwar and Demetri Martin, all at heat 100 and all sold out; I ran those three plus "NYC comedy". Raw files in workspace/research/*-2026-11-16.md.
  - **Jessica Kirson** — zero threads on Reddit, zero on Hacker News. Both her NYCC dates (Nov 17 and Nov 23) are sold out.
  - **Fahim Anwar** — zero threads in 30 days on Reddit, zero on Hacker News. No New York signal on the Bell House date, but the room's calendar carries the second 10:00 PM show, which is item 2.
  - **Demetri Martin** — zero on both. His Dec 4 and Dec 5 Bell House Christmas dates are sold out.
  - **"NYC comedy"** — Hacker News returned 9 stories and not one is about comedy: the surveillance-pricing vote, a false smoke alarm at a Jane Street datacenter, NYT subscriber earnings, a parking-ticket quiz. The one useful signal came from Reddit instead, re-read through the repo's own read-only OAuth path.
  - **Caveat on all four runs:** last30days' keyless Reddit leg came back rate-limited on three runs (HTTP 429) and auth-failed on one (HTTP 403), so its Reddit counts are zero because Reddit was not read, not because nobody was talking. Every Reddit number in this draft was re-checked with the repo's own script-app OAuth path (scripts/reddit.js pattern), read-only, no posting.
  - **Press scan (Nov 9–16).** Thin, and the draft does not pretend otherwise. Time Out's comedy desk has nothing newer than the Nov 9–15 "best things to do" list, where the festival is still the lead item. Vulture's newest stand-up piece (Nov 10) is about Dave Chappelle's leaked Madison Square Garden material; he is on the hold-out list, so it is not usable and it is not in the draft. Brooklyn Vegan's comedy category still has nothing since Aug 4 and its NYC shows feed carries listings only. The Village Voice's last comedy-desk piece is still the Oct 19 Alex Lewis / Slam Frank Q&A, though its Michelle Wolf line ("the voice comedy needs right now") is reprinted on the Town Hall page, and that is the line I trust in item 1. The New York Times' only fresh comedy story is Anthony Clark's obituary (Nov 12) — real news, but not a show anyone can act on, so it did not earn an item. **That is why five of the five come from the rooms' and producers' own pages rather than from the press: the festival is over and this week's news is in the rooms.**
- **Reddit leads (candidates/reddit-leads.json, 14-day window).** The "all new lineup, 4 tickets left" post in r/nycevents is the same One in 35 producer posting in a different subreddit — that is item 3, and it is why I wrote four tickets rather than "few." The Ukrainian refugee comic at Gotham tonight (r/nycevents, Nov 15, also 110 points on r/StandUpComedy) is tonight only and Gotham's calendar lists the New Talent Show at 7:00 PM with no lineup, so it is not in the five — Gotham Comedy Club, 208 W 23rd St, if you want it as a sixth. The free Wednesday show at Rose's R&R Bar (457 Graham Ave, Williamsburg, 8:00 PM, hosted by Christine Fiala, sponsored by Ayrloom) last posted for a Nov 11 date and the next one is unverified, so it stays out. The Secret Comedy Show at Cozy Art Land, 10-40 45th Ave #3F, Long Island City, is next Saturday, December 5, doors 9:30 PM, BYOB, no drink minimum, $12.51. Haiders Mutual Aid Comedy Show at Greenpoint Comedy Club is Sunday, December 6, 7:00 PM, proceeds to North Brooklyn Mutual Aid. Bibblebash has no website of its own (bibblebash.com does not resolve), so its date, time and lineup come from the producer's Reddit post, and the address comes from Badslava through the venue registry.
- **Not on the board, worth a look for the board itself:** Not Ripe Bananas at West Side Comedy Club, 201 W 75th St — free, no cover, no drink or food minimum, Tuesdays at 8:00 PM, and the room's own calendar lists Nov 17, Nov 24 and Dec 8, 15, 22, 29, while our board carries only the Dec 1 date. AYOOO Comedy Show at Friends and Lovers, 641 Classon Ave, Brooklyn, Saturday, November 21, 7:00–9:30 PM, $10.38, hosted by Darius Dinkins; it went up on the room's Eventbrite on Nov 13. Ask Ronna has two Ronnukah Live shows at the Bell House on Saturday, 5:00 PM and 8:30 PM, and we list only the 8:30.
- **One thing for Nick to decide.** The board's Michelle Wolf pick still points at thetownhall.org/event/michelle-wolf, which no longer resolves to the show page; the live URL is thetownhall.org/event/michelle-wolf-best-job-in-the-world. Worth fixing whichever way you want it.
- **Time-sensitive.** Items 1 and 3 are Thursday, item 2 is Friday, item 5 is Tuesday night, item 4 is Monday. **If this gets tightened to three,** they are One in 35 (four seats left), the Fahim Anwar 10:00 PM (the sold-out fix) and Michelle Wolf (the room of the week) — those are the three a reader can act on with the most certainty.
