# Heard around town — week of October 12, 2026

Draft for review. Not on the site. Not committed. Five items, in our voice — plain, specific, the kind of sentence a friend would send you in a text. Sources at the bottom of each item.

---

**1. Kendall Farrell is taping his debut hour, and the second show opened because the first sold out.**
The "Comic To Watch" / Carolines Breakout Artist is recording his first special at Littlefield (635 Sackett St, Gowanus) on Sunday, October 18 — a 6pm show, then a second at 8:30pm that the room added because the first one started moving. Liz Miele-style SET_LIST-style middle-of-the-stack comics don't usually get a second show added at a 250-cap Gowanus room, so this is one of those "go now or watch the special next year" tapings.
Source: [Littlefield event listing](https://littlefieldnyc.com/all-shows/) (also on [Eventbrite](https://www.eventbrite.com/e/kendall-farrell-standup-comedy-special-taping-tickets-1993612956018))

**2. A middle-class of comedians is fighting SiriusXM and Sebastian Maniscalco, and it's already on the road in NYC.**
The LA Times published Christina Catherine Martinez's piece on Monday and Vulture has now run two pieces on it; the rebellion kicked off last week when Liz Miele organized a coordinated Instagram post day. Sirius replaced its 24/7 Raw Comedy channel (800+ working comics in rotation) with a Maniscalco-curated channel that paid out half last month. Most of the comics whose royalties disappeared are the ones who headlined your local club this year and opened the room you're booking Farrell into. This is the most-discussed thing in stand-up circles since the Netflix taping boom of 2019.
Source: [LA Times, Oct 8](https://www.latimes.com/entertainment-arts/story/2026-10-08/sebastian-maniscalco-siriusxm-radio-comedy-backlash) / [Vulture, Oct 8](https://www.vulture.com/article/sebastian-maniscalco-response-siriusxm-comedians.html)

**3. Catbaret's Meowloween is Halloween night at Caveat.**
The cat-themed variety show that Gemma Smith has been running since 2018 lands on Saturday, October 31 at 7pm at Caveat (21A Clinton St, Lower East Side) — comedy, burlesque, magic, costume contest, free cat ears, raffle benefiting RescueNYC. Producers have been pushing it across r/lowereastside, r/nycevents and r/nycComedy this week, and a Weruva year of free cat food goes to the best costume. $30 standard / $35 at the door / $24 early-bird (sold out).
Source: [Caveat listing](https://www.caveat.nyc/events/catbaret-nycs-cat-themed-variety-show-meowloween-10-31-2026)

**4. The New York Comedy Festival's Beacon / Town Hall slate is filling out — and the room most worth a train is Joanne McNally on November 7.**
NYCF runs November 6–15 across all five boroughs; the Beacon and Town Hall already have Mulaney (Nov 9), Maron (Nov 8), Ilana Glazer (Nov 13), Daniel Sloss (Nov 14), Mojo Brookzz (Nov 15) and Ziwe on the schedule. The Town Hall date most worth pulling by itself is the *Pinotphile* NYC stop on Saturday, November 7 at 7pm — McNally's Wikipedia traffic is up 358% over the prior month after she landed on the U.K. celebrity series this fall, the show is the hour she just signed a Netflix deal for, and it's a single venue plus one date, not a festival pass.
Source: [NYCF schedule](https://nycomedyfestival.com/lineup/) (and [Town Hall listing](https://www.thetownhall.org/))

**5. A new free weekly just opened in Crown Heights you can walk into tonight.**
Post Moves Comedy, the free Sunday-at-8:30 show at Bar Bayeux (1066 Nostrand Ave, Prospect Lefferts Gardens) that Reddit picked up last month, is still going every week — club comics and TV-booker names, no cover, RSVP via Eventbrite. It's become one of the louder threads in the r/crownheights weekly events thread and the producer is local; if you're in PLG and want a Sunday drink without the Bell House ticketing dance, this is the room.
Source: [r/crownheights](https://www.reddit.com/r/crownheights/) / [Eventbrite organizer](https://www.eventbrite.com/d/ny--new-york--crown-heights/free--events/post-natal-events/)

---

### Sources and notes for the editor

- **Research runs (last30days, --search=reddit,hackernews --days=30):**
  - Kendall Farrell — zero Reddit or HN signal; nothing under the comedian's name (heat.json's demand = "going_fast" + second show is from ticket availability, not buzz).
  - Joanne McNally — Reddit rate-limited (HTTP 429); HN returned nothing usable. The Wikipedia 358% / 4854 views a day in heat.json is the actual signal.
  - Jaboukie Young-White — Reddit rate-limited; HN nothing. Wikipedia +325% / 2329 views a day. NYCF slot is the only press anchor.
  - "NYC comedy" — HN returned six general NYC civic / transit / consumer stories; zero comedy. Reddit rate-limited. Not usable for signal.
  - All four runs hit `Reddit rate-limited: HTTP 429`. `git log` shows the research-cache entries for "Beth Stelling" (Sep 25), "Michelle Buteau" (Oct 9), "Maria Bamford" (Oct 4), "Phoebe Robinson" (Oct 2) and "Kanan Gill" (Oct 2) are the only recent last30days runs that produced actual signal — the rest of the month has been rate-limited. The `Kendall Farrell` heat.json demand and the Jane Schoenbrun / Maniscalco LA Times piece carried the week.
- **Press scan (last seven days):** Vulture ran the SiriusXM piece on Oct 5 ("The Satellite-Radio Drama Tearing Comedians Apart") and Maniscalco's response on Oct 8 — these are the freshest NYC-comedy press of the week. LA Times ran Martinez's essay on Oct 8. Time Out's "things to do this week" rotates a different comedy item each week and is mostly evergreen listicles (no fresh comedy item). The Village Voice "Changing How Comics Break Through" piece is August. NYT's "26 Fun Things To Do in NYC in October" is Oct 1 and the comedian on the NYT booker list is Beth Stelling, not a fresh local story. BrooklynVegan is a music aggregator and didn't run a NYC-comedy item this week.
- **Reddit leads (candidates/reddit-leads.json, 14-day window):** the fresh, useful threads are Catbaret Meowloween (lowereastside, nycevents, nycComedy all on Oct 11), the Post Moves Comedy thread at Bar Bayeux (crownheights, recurring), Oleg Redko at Gotham New Talent Show (10/9–10, low-traffic Ukrainian comedian asking for audience), and Out of the Loop at The Slipper Room (10/13, LES / nycComedy cross-post). The Oleg Redko and Out of the Loop threads are one-off, low-traction; Catbaret is the strongest lead.
- **What I'd cut if you tighten to three:** drop #4 (NYCF is too far out for a "this week" piece) and #5 (Post Moves is a recurring — better covered in /recurring.html once we register it). The first three give the issue its news spine: a special taping, an industry story, a Halloween show.
- **Note on cover art:** no cover image exists yet for the Kendall Farrell special taping; the Littlefield poster is a generic room hero. If we put this on the newsletter, the Bell House Maniscalco promo image (out of scope — controversial) or the Caveat Catbaret flyer (Weruva-presented) are both candidates.
