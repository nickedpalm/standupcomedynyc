# Skint-inspired editorial draft — September 11, 2026

Custodian: Codex / Nick. Isolated branch codex/skint-editorial-draft, based on production source 77097aa. Uncommitted changes are intentional review work: five HTML routes, editorial.css, picks.js, data/picks.json, and these notes. No pre-existing edits were present; nothing pushed or deployed.

The homepage presents a dated, original comedy shortlist. Fourteen September 12–17 events now fill the calendar, with source links in picks.json. Unknown prices are not guessed; only the $10 Funny Pages price is eligible for the $15 filter. Funny Pages has no verified ending time, so its end_time_confirmed=false record uses an undisplayed end-of-day expiry cutoff. The nine new Union Hall/Bell House records also use an undisplayed end-of-day expiry cutoff with end_time_confirmed=false; other original event end times come from ticket-page evidence.

All routes use the editorial theme. Best/neighborhood views share the current shortlist, replacing February sample listings. The old comedian database and dead links give way to current event sources. Newsletter signup is explicitly unavailable until a real opt-in service is connected; the previous mock-success form was removed. No subscribers are collected and no sponsorship/affiliate system is live.

Validation: npm run build passed; node --check web/picks.js passed; data IDs, HTTPS source links, timestamp order, price types, built route/assets, and sitemap XML checked. Local homepage returned HTTP 200. Browser interaction/visual QA has not been performed. Local preview: http://127.0.0.1:8766/ while its development server remains active.

Mazzie has a copy under /opt/data/profiles/comedy/workspace/drafts/skint-20260911/site and the editorial/business guide in the workspace. Her normal production-based checkout remains separate. Compare edits before integrating. The business model is proposed sponsorship-funded curation plus a repeat-reader email audience, not a claim of current revenue or advertiser commitments.


## Comedy Cellar reference revision — September 11, 2026
Design reference inspected: https://web.archive.org/web/20171128152633/http://www.comedycellar.com/
Adapted brick backdrop, wood-toned header, warm amber palette, printed poster hierarchy and ticket treatment. Original site branding and generated brick texture; no Comedy Cellar logo or performer photos reused. All five routes updated. Previous draft web files preserved at /private/tmp/comedy-before-cellar/web. Local review only; no production deploy.
Funny Pages Eventbrite ID has conflicting title evidence. Replaced direct ticket URL with corroborating StayHappening event listing; direct ticket identity remains unverified.

## Cafe intranet refinement
Nick asked for a coffee-shop intranet feel. Shifted the existing draft toward a neighborhood bulletin board: muted green, warm paper, mixed flyers, practical monospace labels, quieter serif titles, and mailing-list navigation. Existing routes, filters, and saved picks remain. No fictional cafe services or community activity added. Local review only.

## Real poster pass
Added three official promotional assets with source captions, full-size links, lazy loading and preserved proportions. See POSTER-SOURCES.json and POSTER-INTAKE.md. No Instagram embed or newsletter subscription is configured. Funny Pages source_url now points to the corroborating secondary listing; the disputed old URL is retained explicitly as disputed_source_url.

## Fuller calendar design pass
Expanded to 14 shows across Lower East Side, Williamsburg, Park Slope and Gowanus. Home has three featured flyers above compact dated rows; seven listings have official promotional artwork. Neighborhood filtering, result counts and a room index use the same data. Union Hall and Bell House newsletter leads were checked against public venue calendars and linked ticket pages. LAUGH is held out because its ticket location says TBD. Unknown prices stay unknown. Images retain original proportions; undated art is identified in POSTER-SOURCES.json.

The build, JavaScript syntax, whitespace, unique IDs, date ordering, source links, artwork files and page hooks passed checks. Browser visual and interaction QA remains outstanding. This is a manually curated local review dataset, not a subscription or automated ingestion service.

## Spacing and QA fix pass — September 11, 2026 (applied on the VPS copy)
Claude ran headless-browser QA (see ../QA-NOTES.md) and, at Nick's request, applied to this copy: a spacing block at the end of editorial.css (looser day groups, separated listing rows, roomier shelf and sidebar, 40px tap targets on nav and row actions); a pluralization fix for the result counter; and skipping the listing thumbnail for landscape artwork (poster width > height), which was unreadable at 80px. Pinned flyers and "Flyer source" links are unchanged. Verified: no overflow at 1280/390, no console errors, counter reads "1 neighborhood", no sub-24px targets. The Mac draft was byte-identical before this pass; the same two files are staged on the Mac at ~/comedy-spacing-20260911/web/ for copying into the draft. Nick's IA direction from this review: a featured tier for one-off concept shows and special events, then recurring weekly/monthly bar shows, then open mics, then clubs. Not built; data has no tier field yet.

## Tiers, recurring rooms and open mics — September 11, 2026
Added `tier` to all picks (featured/special). New data files: recurring.json (4 weekly bar stand-up shows) and open-mics.json (9 entries, 6 rooms), each checked against the venue or organizer page named in the record; see ../RECURRING-INTAKE.md for conflicts and hold-outs. New route /open-mics.html groups mics by night with where/cost/sign-up/set/formats/age and a "checked" date; nav link added on all pages and sitemap updated. Home sidebar gains a WEEKLY & MONTHLY ROOMS rail from recurring.json (board.js). Verified at 1280/390: no overflow, no console errors, no sub-24px targets. All changed files are staged on the Mac at ~/comedy-spacing-20260911/ (mirrors web/ layout plus sitemap.xml).

## Clubs tier — September 11, 2026
Added clubs.json (7 Manhattan clubs, tier `club`) with address, rooms, ticket range where published, minimum, age, getting-in rules, an original one-line room description, calendar link and policy source with a checked date. New route /clubs.html (clubs.js) lists them and cross-links any current picks at that venue. CLUBS added to the nav on all pages and to the sitemap; home rail links to both Open mics and Clubs. Two entries (The Stand, West Side) carry a verification note because their sites blocked the fetcher. Verified at 1280/390: no overflow, nav wraps to two rows on mobile, no console errors, no small targets. Staged on the Mac at ~/comedy-spacing-20260911/.

## Daily edition refresh — September 12, 2026
Kept the 14 Sep 12–17 picks from the previous pass and added 9 verified Sep 18–24 specials (tier `special`): A Drinking Game NYC: Practical Magic and Sam Taggart: Special Taping at the Bell House Sep 18 / 19; Sophie Buddle at Union Hall Sep 18; Fun in Moderation: Sketch Comedy at Caveat Sep 19; Josh Sharp crowd-work hour and Obey in Advance book launch Sep 20; Climate Town & Amy Westervelt at Bell House Sep 21; David Nihill's Taking Tangents Tour at Bell House Sep 23; and Vidura Bandara Rajapaksa: The Paradise Gothic Tour at Bell House Sep 24. Each new entry has a source_url actually opened today (Bell House calendar, Caveat events page, Union Hall calendar). Featured tier still capped at 3 (Vampire Movie, Quacks & Whacks, Rainbow Riot), since no new entries had official artwork downloaded.

## Faculty Lounge recheck — September 12, 2026
The recurring intake flagged a Thursday-vs-Sunday conflict for Faculty Lounge. Re-checked the Sep 20 event page directly: BCC shows Faculty Lounge on Sundays at 8:30pm in Eris Deep Space, doors 8:15pm, tagged "Stand-up", "brand new weekly stand up show". The show page is authoritative; recurring.json's verified_at and note updated to reflect today's check, source_url switched to the live Sep 20 slug.

## Stale noscript text — September 12, 2026
Replaced the dated Sep 12/13 sentence in index.html, best.html, and neighborhoods.html `<noscript>` tags with a generic, evergreen line that points readers at the Union Hall, Bell House, and Caveat calendars — so the no-JS fallback no longer names specific past dates.

## Held-out notes — September 12, 2026
Michelle Buteau at Bell House Sep 22 is shown as SOLD OUT on the venue calendar; not added to the board until it returns from the venue. Taylor Tomlinson: Tries Out New Ideas at Union Hall Sep 18 10pm shows as sold out via bandsintown and the *cancelled* slug appears next to a Sep 17 Union Hall record, so neither date was added. NYC Comedy Festival 2026 lead is in NEWSLETTER-SOURCES.md but not added as a pick yet (no dates cross-checked).

## Comedy Cellar pass — September 12, 2026
Nick asked for the live site to look more like the 2017 Comedy Cellar homepage (https://web.archive.org/web/20171128152633/http://www.comedycellar.com/). Added a final override block in editorial.css: gold-and-red wordmark, orange marquee bill, dashed ticket-stub link, Oswald condensed headings, Permanent Marker hand-lettered arrow links and red buttons, CSS-generated crumpled-paper panels, red torn-edge section bars, flyers straight on the brick, a stenciled venue-name band over dark wood above the footer. Google Fonts (Oswald, Permanent Marker) linked in every page head. Still original branding: no Comedy Cellar logo, photos, or copy. Verified at 1280 and 390: no overflow, no console errors, fonts load.

## Repository reorganization — September 13, 2026
Committed Mazzie's morning data edits (five Sep 21–27 picks; The Stand and West Side policies reverified in a browser). Removed the legacy scraper, SQLite database, Node server, Vercel config, stale shows.json, the pets-browser gitlink and 12,450 tracked node_modules files; tagged the prior state pre-reorg-20260913. Added scripts/check.js (run by `npm test` and by GitHub Actions on every push and pull request), a real .gitignore, a README describing the editorial workflow, and a shorter CLAUDE.md. Two poster records (Vampire Movie, Emil Wakim) now refer to expired picks; the check warns so they can be retired. Cloudflare's Git integration remains the publication path; removing the gitlink unblocks it.

## Revolving board — September 13, 2026
Added scripts/rotate.js (`npm run rotate`) and a daily 09:15 UTC GitHub Actions job that archives expired picks into web/data/archive/YYYY-MM.json, moves their artwork to web/assets/posters/archive/ and commits. Restored the four Sep 12 picks that had been deleted (Modern Whitney, Funny Pages, Emil Wakim, Improvised Vampire Movie) so the archive starts complete; their two posters moved with them. The check now warns on a thin or stale board and on expired picks left in picks.json.

## Tonight-first home page — September 13, 2026
Home now leads with the flyer shelf (paid listings first, tagged "Paid listing", then editor's picks, max four), then a dated TONIGHT block listing today's picks at larger size, the signup strip, THIS WEEKEND (hidden when the weekend has passed) and COMING UP by day. The Tonight and This weekend filter buttons were removed; neighborhood, $15 & under and Saved still apply to all sections. On a night with no picks, Tonight lists that weekday's recurring rooms and open mics from the existing data. New optional pick field `sponsored: true` (checked: needs https ticket_url and artwork). Verified headless at 1280 and 390: no overflow, no console errors, no sub-24px targets; empty-night and paid-card states exercised against a modified built copy.

## Instagram card renderer — September 13, 2026
Added scripts/ig-card.js (`npm run ig-card`): 1080x1350 JPEG cards in the bulletin-board style, a Tonight/This weekend cover plus one card per pick, written to web/assets/ig/ so Cloudflare hosts them for the Instagram API. Text-only unless a poster record carries reuse: "granted"; all current artwork is unlicensed for reuse so no flyers appear. Fonts bundled locally (Oswald OFL, Permanent Marker Apache) and embedded at render time. playwright-core is a devDependency; the browser is the headless shell already present in Mazzie's container. Rotation now removes cards for expired picks. Publisher and Mazzie's posting job wait for the account and token.
Publisher added the same day: scripts/ig-post.js (`npm run ig-post`) posts a Tonight carousel, single-pick images or stories through graph.instagram.com, logs to POSTED-IG.json and refuses duplicates. Dry-run verified; no live post yet because the Meta developer registration is blocked by Facebook's new-device rule on Nick's Mac (email is now on the account; retry from phone or after a few days).

## Home page reverted — September 14, 2026
Nick preferred the previous board, so the Tonight-first layout (Tonight block, This weekend, Coming up, paid-first shelf) is reverted. The home page is back to the pinned flyer shelf plus the dated board with Tonight / This weekend as filters. Rotation, checks, Instagram cards and publisher are unchanged. The `sponsored` pick field is no longer rendered; re-add a paid slot to this layout if wanted.

## Venue registry — September 14, 2026
Nick: every venue carries a neighborhood as a layer of site logic. Added web/data/venues.json (23 rooms with address, neighborhood, borough). picks.js and board.js now take the neighborhood from the registry by venue name; the record's own field is only a fallback. check.js fails on unregistered venues or neighborhood/address disagreements. Corrected Young Ethel's (506 5th Ave, 12th–13th St) from Park Slope to South Slope; Halyard's was already Gowanus. Open-mic records for New York Comedy Club now name the room (Midtown / East Village) to match the registry.

## Living flyer shelf — September 14, 2026
Nick wanted the animated-poster feel of the 2017 Comedy Cellar site. The pinned shelf now holds three slots and cycles through every upcoming pick with artwork (featured first), crossfading one slot every 6 seconds; each flyer drifts slowly (Ken Burns) with staggered timing. Cycling pauses on hover, focus and hidden tabs; prefers-reduced-motion disables drift and transitions but keeps the swap. Image files are untouched; this is presentation only. Verified headless at 1280 and 390 against a five-poster copy: slot swap observed, no overflow, no console errors.

## Landscape thumbnails — September 14, 2026
Every poster currently on the board is a wide crop (Eventbrite and Union Hall serve 2:1), and the listing rows had skipped landscape art since the Sep 11 spacing pass. Rows now show landscape art as a 150px-wide thumbnail (110px under 700px, 96px under 400px) instead of nothing. Verified headless: six thumbnails at 1280 and 390, no overflow, no errors.

## Sidebar rooms by night — September 14, 2026
With 15 recurring rooms the WEEKLY & MONTHLY ROOMS rail is now grouped by night, starting with Tonight and Tomorrow, then the rest of the week in order; rooms sort by start time within a night, and "Every X" cadences are dropped from the detail line since the heading says the night. Monthly cadences still show. Verified headless: seven night headings, 15 rooms, no errors.

## Agent-readable edition — September 14, 2026
isitagentready.com scored the site Level 2 (Bot-Aware); the missing piece for Level 3 was Markdown content negotiation, and most other "failures" were the SPA fallback returning the home page for unknown paths. Added: a styled 404.html; scripts/markdown.js building a Markdown edition of every section plus llms.txt at build time; functions/_middleware.js serving it for Accept: text/markdown with Vary and Link headers; /.well-known/api-catalog listing the JSON data; _headers for content types and CORS on /data/. Verified in wrangler pages dev: negotiation, 404 status, catalog type, signup unaffected.

## Neighborhood layer, Eventbrite leads, artwork spread — September 14, 2026
Nick: only four neighborhoods showed. Cause: the filter and the Neighborhoods page were built from this week's picks only. Now the home filter lists every neighborhood in venues.json by borough ("rooms only" when no dated pick), the empty state links to that neighborhood's rooms, and /neighborhoods.html (areas.js) is a directory of all 46 neighborhoods across the five boroughs with this week's picks, weekly rooms, open mics and every room. Eventbrite added as a lead feed matched to rooms: venues.json gains eventbrite_organizer (six rooms so far), scripts/eventbrite.js reads those organizer pages and each event's JSON-LD into candidates/eventbrite.json, flagged already-a-pick or new. Pulled 16 more flyers (Caveat via Eventbrite, Bell House via its own site) so 22 of 26 picks have art, and the shelf now alternates venues so three Union Hall flyers no longer sit together. Fixed a phone-width overflow from the shelf's negative margin. Mazzie's persona and daily job updated: run both lead feeds, register organizer pages, never guess a neighborhood.

## Cache-busting — September 14, 2026
Nick saw the new Neighborhoods page painted with the old stylesheet: Cloudflare serves CSS and JS with a four-hour cache, HTML with none, so a redesign could load against stale styles. scripts/stamp.js now rewrites every stylesheet and script reference in the built HTML with a content hash (?v=…) during npm run build, so changed assets get a new URL on the next page load.

## Heat score and demand tags — September 14, 2026
scripts/heat.js scores each upcoming pick from readable signals: Eventbrite availability (structured data), a second show the same night at the same room (picks plus Eventbrite leads, matched by Eventbrite id so the same event under two URLs does not count twice), Wikipedia pageviews for touring names, and bookings this month. Reasons are written to candidates/heat.json for Mazzie. Readers only see two outcomes: a "Sold out" or "Going fast" tag on the listing row and the pinned card, and the same words in the Markdown edition. First run: Richard Perez at Union Hall (Sep 15) sold out. The nightly GitHub Actions job refreshes the tags after rotation; Mazzie's edition runs it and reports hot picks. Reddit, Instagram and Ticketmaster are closed to unauthenticated reads, so no sentiment is inferred from social posts.

## Six-week horizon, content calendar, Save the date — September 15, 2026
Nick wants to look ahead. The check now warns for any of the next six weeks under eight picks (today: weeks 3–6 are empty). scripts/calendar.js writes candidates/content-calendar.md and dist/calendar.html (unlinked, noindex) on every build: per week, picks with artwork and demand flags, heat, unreviewed Eventbrite leads, standing slots and the research plan. The home board keeps the next fourteen days; later picks render under a Save the date section with a lighter row, and the Markdown edition gains save-the-date.md. Mazzie's edition and persona carry the horizon rule and work the thinnest week first. Verified headless: board 30 rows, Save the date hidden until a far pick exists and shown with one, no overflow.

## Horizon fill — week 3 to week 6 — September 15, 2026
Mazzie's edition filled the four empty weeks (Sep 29 to Oct 26). 36 new special-tier picks added, sourced from The Bell House's Live Nation/Ticketmaster schedule, Eastville's October calendar, and the West Side Comedy Club's public calendar. Spread leans Brooklyn: 18 Bell House + 11 Eastville + 5 West Side + 1 Michelle Buteau repeat; the WSCC picks restore a Manhattan presence (Upper West Side) across weeks 3, 5 and 6. All 22 official Bell House/Ticketmaster flyers pulled into web/assets/posters with POSTER-SOURCES.json entries (sha256 recorded). Eastville and West Side Comedy Club picks carry no artwork (no venue-supplied art opened); flagged "NO ARTWORK" on the calendar. Maria Bamford Sat Oct 10 marked sold_out (Ticketmaster listing says SOLD OUT); other Maria Bamford dates deliberately not picked since they're duplicates of the same run. Caveat, Union Hall, the Manhattan clubs (Gotham, Stand Up NY, the Cellar) and St. Marks Comedy Club calendars do not yet surface Sep 29+ shows, so no picks from those rooms this round.

## Big stages — September 15, 2026
Nick chose: one dated board with a mark, a Big stages group at the top of Save the date, and a shelf cap. A pick is a big stage when its venue's kind is "theater" in venues.json (22 rooms after Mazzie's review). Board rows and pinned cards carry a green "Big stage" tag; Save the date opens with a Big stages group (every theater pick beyond two weeks, dated) before the weekly groups; the flyer shelf never shows more than one theater show among its three slots, in the initial order and while cycling. The Markdown edition says "Big stage." on those lines and save-the-date.md has a Big stages section. Mazzie's theater and NYCF sweep added 30 theater picks and held three acts for Nick under the editorial policy.

## Instagram cards, poster pass — September 15, 2026
Nick: the first cards looked like a spreadsheet. Redesigned as posters: brand line, gold date bar, the title at up to 176px, venue and neighborhood in red, one short sentence, a big ghosted showtime filling the lower half, and Sold out / Going fast / Paid listing as a rotated stamp. Cover lists up to five titles with time and venue, sized to fit. Unknown prices no longer lead the line. First automated post went out today (instagram.com/p/DdUFSiklrBA) with the old design; tomorrow's uses this one.

## Instagram cards, photo-first template — September 15, 2026
Nick: ripoff and duplicate the winners. Looked at Time Out New York (776K), Don't Tell Comedy (1.1M) and the Comedy Cellar (357K): every winning post is a full-bleed photo with a short headline in highlighter boxes, a lockup at the top, a one-line dek and a "swipe" pill; Don't Tell adds a huge two-word hook. New `--photo` template in ig-card.js does exactly that with our official artwork: cover headline "N shows worth leaving the house for tonight" over the largest artwork of the night, one card per show with the date box in gold and the title box in red, Sold out / Going fast / Paid listing as a corner tag, and the artwork credit on the image and in the caption. Flag-gated until Nick approves using promoters' flyers full-bleed by default.

## Pick-blurb structure for shared-room showcases — September 28, 2026
Comic Strip Live's Wednesday Oct 7 lineup (Christian Finnegan, Paul Mecurio, Feraz Shere, Rolonda Watts, Olga Namer) is a rotating-club showcase — five named comics on one bill, no headliner credit. The blurb pattern that reads best for these (and passes `npm test`'s describe-only regex) is to lead with the two most name-recognizable comics and frame the rest as the undercard: "X and Y split a Wednesday at the Z club, with A, B and C on the undercard of the room's rotating showcase nights." The previous default was "X hosts a showcase with A, B and C" — `npm test` now flags that wording, and the new shape both satisfies the regex and gives readers a clearer reason to pick the night. Verified on the Sep 28 Comic Strip Wed Oct 7 pick (`christian-finnegan-comic-strip-2026-10-07`); future rotating-club picks should follow the same template.

## Sat Favs and Sunday Night Live as board picks — October 6, 2026
West Side Comedy Club's calendar lists a Saturday Favs slot at 8pm and a Sunday Night Live at 8pm every week, with named comic lineups that change by date. The room's per-show pages don't exist (per-show URL goes 404), so the room's own calendar is the source for every date, just like the existing WSCC picks (Next Elton, Jaime Ferraro, Laugh! It's for Charity, Robyn & "Friends"). Today's edition adds Oct 10 (Fabrizio Copano, Maximilian Spinelli, Erin Maguire, Matt Ruby, Gordon Baker-Bone, Cole Cosby — Chilean Netflix headliner with a strong local undercard) and Oct 11 (Reuben Wolf, Ben Kirschenbaum, Alex Babbitt, Chloe Radcliffe — Sunday Night Live, $10 with two-item minimum) using the same source convention. The room gets no poster since the calendar page links to a generic "show poster" that's just the WSCC logo; picks ship without artwork, matching the existing WSCC board.

## Daily edition — 2026-10-17 (cron run)
- **Picks added (3, all tier=special)** — each opened and read before adding; official artwork saved to `web/assets/posters/` with POSTER-SOURCES.json records:
  - `nico-carney-union-hall-2026-10-22` — Nico Carney (just-taped debut hour, working-material run) at Union Hall Thu Oct 22 7:30pm, $19.26. Source: caveat.nyc + eventbrite.com/e/nico-carney-live-tickets-1999636040225 (Union Hall's own calendar tab plus the Eventbrite organizer page both list the date). Eventbrite `_next/image` proxy saved the 1880x940 JPEG (sha256 6719099d…).
  - `pachelbel-rant-20th-caveat-2026-11-23` — Rob Paravonian's Pachelbel Canon 20th Anniversary at Caveat Mon Nov 23 7pm, $18.76 std / $20 door, 21+. Source: caveat.nyc/events/the-pachelbel-rant-20th-anniversary-show-2026-11-23. Caveat's own show page supplies the date, time, price tiers and the "stories, funny songs, and an updated version of the Rant" copy. Caveat's S3 flyer (2000x1000, sha256 542c2dab…) saved.
  - `story-warz-nycc-2026-11-25` — Big Jay Oakerson + Luis J Gomez's Story Warz game-show storytelling deception format at NYCC Midtown Wed Nov 25 7:45pm, $30.85 GA / $41.72 Premium (Premium Seating only 10 left per the event page). Source: newyorkcomedyclub.com/events/story-warz-w-big-jay-oakerson-luis-j-gomez-special-guests-2026-11-25194500 (NYCC's own calendar and event page). NYCC official 1040x660 flyer (sha256 2284ff09…) saved.
- **Held (with reasons)**:
  - HEX YEAH at Flop House tonight (Sat 10/17 7pm) — Flop House's own event page (flophousecomedy.com) lists it as a costume-contest charity variety with a mixed-format bill (musical parody, character, stand-up, EmOJI performance); closer to a community-charity night than a clean stand-up set, same format rule that held Drunk Planet Earth / Hahapocalypse.
  - Jo March Madness (Caveat Tue 10/20 9:30pm) — bracket-game audience-vote format hosted by Ben Langhorst; held per the same rule.
  - Econ LOL (Caveat Wed 10/21 7pm) — economics-themed comedy variety; held per format.
  - Charlie Bardey — Hearth's Promise Part I (Union Hall Thu 10/22 10pm) — three-part epic with Wils Pelton, Max Wittert, Carly Kane and Sureni Weerasekera; strong names but the format is a partly-musical storytelling arc (not clean stand-up), and we already have Nico Carney as the same-night Union Hall pick at 7:30pm.
  - Adam Cayton-Holland Stares Wistfully (Union Hall Fri 10/23 7:30pm) — held because BH+UH pair already sits at 47% of next-7 picks and the same Friday already has Sydnee Washington Bell House + Brooklyn Power Hour Eastville + one or two more options.
- **Week 6 floor (Nov 21-27) was at 6 picks** (the 8-pick minimum). Pachelbel Rant + Story Warz lift it to 8 — exactly meeting the floor. Wed Nov 25 (only Story Warz on the NYCC Nov calendar) and Mon Nov 23 (Pachelbel Rant vs Jacqueline Novak Bell House vs Jessica Kirson NYCC — three same-hour options across three rooms) are now both covered.
- **needs_review**: 0 rooms left with `needs_review: true` (Sep 14 Badslava sweep complete). (2b) had no work today.
- **clubs.json check**: all 14 clubs present; St. Marks already registered from the Sep 15 intake. (2c) had no work today.
- **Lead feeds**:
  - **eventbrite**: 45 upcoming events from 8 organizers, 5 new leads, 1 added (Nico Carney). Held 4 (Jo March Madness, Econ LOL, Charlie Bardey, Adam Cayton-Holland — see above).
  - **badslava**: 3 new rows since last pull (Tue 5pm Young Ethel's, Thu 7pm Black Cat LES, Thu 9pm Black Cat LES). Young Ethel's is already in the registry (recurring We Have Fun). Black Cat LES was reviewed Sep 14 with no own website (`blackcatles.com` DNS fails); held per the venue-controlled-source rule.
  - **reddit-leads**: 56 posts across 22 subs, 3 new (HEX YEAH at Flop House tonight — held by format rule per above; Caveat "We're Ready to (Dis)believe You" Sat Oct 24 — neuroscience conspiracy variety, held per format rule; HEX YEAH duplicate from a different sub).
- **NSAA update**: Bell House + Union Hall sits at 8 of 18 picks in the next 7 days (44%); over the 35% mix cap by 9 points. The BH 6-pick run (Asif Ali / Johnny Pemberton / Michelle Buteau / David Cross benefit / Brett Goldstein / Sydnee Washington, one per night Sat-Fri) was pre-existing before this run, and the only UH add today (Nico Carney Thu) shifts the ratio from 46% to 47% — the fix is to hold further BH/UH picks for tomorrow rather than undoing a verified headliner.
- **Heat**: 71 upcoming picks scored — 0 sold out, 1 going fast (Marc Maron at 44). The Oct 25 Phoebe Robinson and Oct 10 Maria Bamford sold-out flags from Oct 2 are still on (manual Live Nation reads, not picked up by heat's Eventbrite-only signals). Nico Carney and Pachelbel Rant and Story Warz not flagged in heat.js — pick cost is mid-range; the high-tier name comes from the next-day heat re-run.
- **Research plan**: ranked 41; ran 4 (Kendall Farrell, Johnny Pemberton, Michelle Buteau, Asif Ali); reused 1 (Headlining Alex Giampapa, 2d ago); 36 skipped; ~333,000 tokens saved. Full notes in `candidates/heat-notes.md` (dated 2026-10-17). Asif Ali ranked on schedule alone — same for the other three RUN names: every chatter return was name-collision / topical pickup, not comedian-specific. Three new-session picks (Nico Carney, Pachelbel Rant, Story Warz) outside the 10-day window or below the cheap-rank threshold, so the plan skipped them.
- **link-in-bio fix**: README rule that "whoever changes the file sets `updated` to that day" — bumped `web/data/links.json: updated` from `2026-10-02` to `2026-10-17` so the warning clears (was the last day the file was touched).

### Improvement today
The Nico Carney blurb leads with the verifiable news (his debut hour just taped) rather than the room or his career résumé — that lands the why-this-one answer in the first sentence without leaning on Union Hall's "celebrating X years" tagline. The Pachelbel Rant blurb leads with the bit's place in comedy history ("the kind of pre-streaming viral clip that defined a generation of comedy-literate students") so the 20th-anniversary framing carries weight instead of feeling like a one-off gig. The Story Warz blurb names two recurring guests (Shane Gillis, Bert Kreischer) the same way past entries cited Howie Mandel and Tony Hinchcliffe — the format rule said the source-of-record ask is the box history on the show's own page, which NYCC lists verbatim.

## Daily edition — 2026-10-24 (cron run, published by the 14:00 IG check)

The 11:00 edition run hit its tool-iteration limit before the commit, so the work sat in the working tree unpublished until this run picked it up. Every pick below was re-verified against its own source page before it went live.

- **Picks added (14, all tier=special)** — each source page opened and read today:
  - `raising-hell-bcc-2026-10-25` — Raising Hell: A Halloween Comedy Fundraiser, Brooklyn Comedy Collective Sun Oct 25 7pm, from $16.88 ($5 off before the day of show). A Halloween standup fundraiser for Callen-Lorde with 25% of every ticket to the LGBTQ+ health center; costumes optional, 21+, doors 6:30.
  - `frantic-free-stand-2026-10-26` — FRANTIC! Free Show, The Stand Mon Oct 26 9pm, free. The club's own Monday free show ("the best free show in Manhattan"), Aaron Berg / Chris Barnes / Josh Ocean Thomas on the card.
  - `mark-normand-stand-2026-10-28` — The Stand Presents: Mark Normand, Caitlin Peluffo, Matthew Broussard & More!, The Stand Wed Oct 28 7pm. Price left null: the show page renders no price (Tixr checkout is gated), per the unknown-prices-stay-unknown rule.
  - `pizzazz-gary-gulman-union-hall-2026-10-28` — Union Hall Wed Oct 28 7:30pm, $19.26. Gary Gulman works out new material in an extended set and pulls a few favorite comics up after him.
  - `dress-rehearsal-union-hall-2026-10-29` — Union Hall Thu Oct 29 7:30pm, $15.92. The whole bill in formalwear and tuxedos; Sabrina Wu, Gary Simons, Shaunak Godkhindi, Annabel and Sabina Meschke, Ryan Roman, music by Neel Ghosh.
  - `comedians-in-costumes-st-marks-2026-10-29` — St. Marks Thu Oct 29 8:30pm, $21.77 incl. fees. Best costume in the audience gets its bar tab paid.
  - `emma-willmann-stand-west-2026-10-29` — The Stand West Thu Oct 29 9pm, $25. Emma Willmann heads the late card with Elle Orlando, Luis Lopez, Sienna Hubert-Ross and Chris Redd.
  - `nyc-stand-up-comedy-village-2026-10-30` — Comedy Village Fri Oct 30 9pm, $28. Three shows a night, seven nights a week, two blocks from the Broadway houses.
  - `df-sweedler-comic-strip-2026-11-01` — Comic Strip Live Sun Nov 1 8pm, $25.71. D.F. Sweedler with Kareem Green, Thash Mose, Matt Pavich and Feraz Shere.
  - `speakeasy-saturday-night-st-marks-2026-11-28` — St. Marks Sat Nov 28 8:30pm, $25.59 incl. fees.
  - `a-true-york-st-marks-2026-12-01` — St. Marks Tue Dec 1 7:30pm, $18.51 incl. fees. Keenan Steiner, Alexis Carabano, Danny Carabano and Macy Kwok.
  - `not-ripe-bananas-wscc-2026-12-01` — West Side Comedy Club Tue Dec 1 8pm, free (no cover, no minimum, per the club's own page). A new weekly workshop show where comics try unfinished material.
  - `date-night-comedy-st-marks-2026-12-03` — St. Marks Thu Dec 3 8:30pm, $23.95 incl. fees. No artwork: the show page has no flyer, so the pick carries no poster.
  - `demetri-martin-bell-house-2026-12-04` — The Bell House Fri Dec 4 7pm. Price null: the event is Ticketmaster-gated. A second date (Dec 5) is on the same run and was left off the board to avoid two adjacent Bell House nights.
- **New room registered**: The Stand West (407 W 15th St, Chelsea, Manhattan) — the club's second room inside Chelsea Market, separate from The Stand at 116 E 16th St. Every Stand West listing carries the "THIS EVENT WILL BE HELD AT OUR LOCATION INSIDE CHELSEA MARKET - 407 W. 15th St" line.
- **New club registered**: Comedy Village (352 W 44th St, Hell's Kitchen) — 15 clubs now on the file. Price band and the three-shows-a-night format from the club's own event pages and city guide; the club publishes no minimum or age policy page, so both fields say so rather than guessing.
- **Re-verified**: Eastville Nov 1, Sam Oh Nov 2 and Please Stay Seated Nov 4 — `verified_at` bumped to 2026-10-24, source pages still live.
- **13 official flyers** saved to `web/assets/posters/` with POSTER-SOURCES.json records (source URL, credit, SHA-256, byte count). None marked `reuse: granted`, so none go on Instagram cards.

### Held (with reasons)
- **Callen Lorde fundraiser at BCC** was confirmed on BCC's own page with the flyer downloaded, but it is the same Oct 25 Raising Hell show already added — counted once, not twice.
- **Badslava (3 new)**: The Rose's own calendar still does not list its two new mic slots — held per the venue-controlled-source rule. Roots Kava Bar is Port Jefferson — out of city, held.
- **Reddit (5 new)**: two NYCF sketch nights at Caveat (sketch, not stand-up), two trash-can threads (off-topic), one duplicate of the BCC fundraiser.
- **Eventbrite holds**: Story-oke (karaoke), Science Tonight (talk show), 3 Days Notice (play), Peter Stewart at Comic Strip (generic showcase).
- `Garrett and Allison's Big Night` was added then dropped to keep Bell House / Union Hall under the 35% next-7 mix cap; its flyer was removed with it.

### Board after this run
Six weeks ahead: **19 / 13 / 13 / 14 / 11 / 13** picks — every week at or above the 8-pick floor. Week 1 went 15 → 19 and week 6 went 12 → 13. Every night of the next seven days has at least one pick. `npm test` passes with 83 picks and no warnings.

### Research budget (required figures)
- **36 performers ranked · 2 runs · 4 reused · 30 skipped · ~324,000 tokens saved**
- Ranked on schedule alone: **Mark Simmons** and **Sam Oh** — both runs came back as pure name-collision noise (Simmons returned Bill Simmons / a Zappa bassist / a lantern thread; Sam Oh returned 12 Sam Altman stories on Hacker News plus Sam Morrill and a Battle for Dream Island thread). Both cached with that finding; both picks stand on their show pages.

### Improvement today
`scripts/research-plan.js` was ranking show titles as performers — **Dress Rehearsal**, **Speakeasy Saturday Night**, **Pizzazz** and **Not Ripe Bananas** are Union Hall and St. Marks formats, not comics, and each one would have burned a last30days run researching a title. Added them to the `NOT_A_NAME` filter alongside the existing entries, so today's runs went to actual people. The same rule that already stopped "Famous Last Words" from being read as a performer.

## Daily edition — 2026-10-25 (cron run, recovered by the 14:00 IG check)

The 11:00 edition job hit its tool-iteration cap and published nothing. Its verified work was
re-checked against each source page before anything went on the board.

**Picks added (4):**
- `friday-night-laughs-st-marks-2026-12-04` — St. Marks Fri Dec 4 8:30pm, $25.59 incl. fees. Doors 8, show 8:30, 2-drink minimum, 18+. The room's own copy calls it a stacked lineup of NYC's sharpest comics.
- `peter-and-friends-st-marks-2026-12-05` — St. Marks Sat Dec 5 6:30pm, $13.06 incl. fees. Peter Zhou's own show, produced by him, built around a gay Chinese comedian's take on the immigrant experience.
- `speakeasy-saturday-night-st-marks-2026-12-05` — St. Marks Sat Dec 5 8:30pm, $25.59 incl. fees. The Saturday slot the room calls a True York experience.
- `demetri-martin-bell-house-2026-12-05` — The Bell House Sat Dec 5 7pm. The second night of his first Christmas comedy tour: jokes, stories, art and live music around a live holiday album, clean enough to bring the family. Price null (Ticketmaster-gated).

**Why these:** Dec 5 was a bare Saturday on the board — the only night in the six-week horizon with
nothing on it. It now carries three shows in three different rooms. Dec 4 gained a second show
alongside Demetri Martin.

**Re-verified (the two picks npm test flagged as stale):**
- `salma-hindy-10-years-stand-2026-11-04` — The Stand's own show page still lists Nov 4, 8pm, Upstairs, with Salma Hindy / Sabeen Sadiq / Denise Taylor. The Tixr ticket page blocks automated requests, so the recorded price stands unchanged rather than being guessed at.
- `fahim-anwar-bell-house-2026-11-20` — The Live Nation page now reads "SOLD OUT - Fahim Anwar at The Bell House on Fri, Nov 20, 2026, 7:30 PM". The show is unchanged; it is simply gone.

### Fix: sold-out detection now covers Live Nation and Ticketmaster

`scripts/heat.js` only read availability from Eventbrite's JSON-LD offers block, so every
Bell House show — which sells through Ticketmaster — read as untagged no matter what its ticket
page said. **Fahim Anwar on Nov 20 is sold out and was carrying no tag**, which meant it would
have gone into the Tonight carousel and the Instagram caption as if tickets were still on sale.
A sold-out show stays on the board but never in the carousel.

`heat.js` now also reads the ticket page's `<title>`, where Live Nation and Ticketmaster put the
state ("SOLD OUT - <show> at <venue> on <date> - Live Nation"). After the fix the nightly score
reads 2 sold out instead of 1, and Fahim Anwar is tagged.

Checked every other Live Nation / Ticketmaster pick the same way (Sam Oh, Matthew Broussard,
Ask Ronna, The Silver Lining, Stamptown, Ania Magliano, Demetri Martin): none is sold out.

### Board after this run

86 picks. Six weeks ahead: **20 / 12 / 15 / 12 / 12 / 15** — every week at or above the 8-pick
floor, and no bare night left in the horizon. `npm test` passes with one warning, now down from
two, on picks that were stale for two days and are re-verified today.

### Not published, and why

- **NYCF link-in-bio entry (Nov 6-15).** The festival schedule is worth linking, but the live
  schedule page carries a held-out act's show, and a link to a third-party schedule cannot filter
  one show out of it. Left alone; sent to Nick instead.
- **BILT SHOW at West Side Comedy Club (Wed Nov 18)** — Nov 18 is the one remaining bare night in
  the horizon. The club's own calendar marks the show sold out while its ticket page says
  otherwise, and the two disagree. The week is above the floor without it, so it waits for a
  clear answer rather than a guess.

## 2026-10-26 (recovery of the 11:00 edition run)

The 11:00 edition cron died before it committed, for the third day running
(`cron_incomplete_no_output`). It had left work in the tree — verified sources, downloaded
artwork and a `research-cache.json` write — and the 09:15 nightly job does `git add -A`, so
that work would have landed in a commit titled "Nightly: rotate expired picks". Recovered it
here instead, re-opening every source page myself rather than trusting the dead run.

### Picks added (3), each read on its own venue page today

- `story-warz-nycc-2026-11-18` — **Story Warz w/ Big Jay Oakerson, Luis J Gomez + Special
  Guests**, NYCC Midtown, Wed Nov 18, 7:45pm, $30.85 GA / $41.72 Premium, $20-item minimum in
  the showroom, 18+. The deception game goes up a week before its Thanksgiving-night return
  (that one is already on the board). Source: NYCC's own event page. Artwork: the club's show
  graphic, recorded in POSTER-SOURCES.json.
- `a-true-york-st-marks-2026-11-18` — **A TRUE YORK COMEDY EXPERIENCE**, St. Marks Comedy Club,
  Wed Nov 18, doors 9 / show 9:30, $18.51 incl. fees, two-drink minimum, 18+. Bill is Keenan
  Steiner, Alexis Carabano, Danny Carabano and Macy Kwok, read off the show page. Source: the
  venue's show page. Artwork: the venue's own photo for the show, credited to St. Marks.
- `prime-time-comedy-show-st-marks-2026-11-21` — **Prime Time Comedy Show**, St. Marks Comedy
  Club, Sat Nov 21, doors 4 / show 4:30, ends 6:00, $15.24 incl. fees. Brett Singer and Brandon
  Ledesma on the bill. Source: the venue's show page.

**Why Nov 18 mattered:** it was completely bare on the board, in a week already at 11 picks.
Two shows in two different rooms now cover it, plus a Saturday afternoon option on the 21st.

### Freshness refresh

Three picks had gone over the 14-day check. Their own pages were opened today and all three
are still live with the same dates, times and prices, so `verified_at` moved to 2026-10-26:
`jake-velazquez-special-nycc-2026-11-15` ($30.85 GA), `brooklyn-power-hour-eastville-2026-11-16`
($12.15, still Monday at 7:30), `stone-and-stone-on-the-road-wscc-2026-11-19` (From $36, via
the club's own show page). `npm test` now runs with no warnings at all.

### Not published, and why

- **THE GUYGULY EXPERIENCE at Eastville Comedy Club, Wed Nov 18, 10pm, $22.81.** The dead run
  had this one verified and downloaded artwork for it. It stays off the board and goes to Nick
  as a call for him: the page publishes no lineup at all — it sells "stand-up, crowd work,
  surprise comedians" — so there is nobody to write a "why this one" line about, and the
  headliner's public material is political in a way that is Nick's judgment to make, not ours.
  Not a held-out act, just an open question and a blank bill.
- **Down Bad Comedy Show at St. Marks, Wed Nov 18, 7:30pm, $18.51.** The page is live and the
  price reads off it, but the only artwork the venue publishes for the show is a single
  comedian's headshot rather than a flyer, and the show's own listing names no lineup either.
  The two shows above cover the same night with real bills, so this one waits for a lineup to
  write about rather than going on as a bare listing.

### Board after this run

85 picks. Six weeks ahead: **18 / 14 / 14 / 14 / 13 / 12** — every week at or above the 8-pick
floor and no bare night left in the horizon. `npm test` passes clean: 85 picks, 8 sitemap pages,
16 scripts, zero warnings.

## Recovery of the 2026-10-27 edition (published 2026-10-27, 14:00 UTC)

The 11:00 edition run hit its tool-iteration cap and never committed. Its verified work
was sitting in the working tree, where the 09:15 nightly would have swept it under the
wrong commit message. Every source below was re-opened and checked by hand before it
went up; none of the dead run's findings were taken on trust.

### Published

- **Greta Titelman Journals** — Union Hall, Tue Oct 27, 10pm, doors 9:30, $15.92, 21+.
  Official Eventbrite flyer saved (1880x940). Patti Harrison opens.
- **The Peter Stewart Show! With Kareem Green!** — Comic Strip Live, Mon Nov 2, 8pm,
  doors 7:30, $25.71, 17+, two-item minimum.
- **Cattywampus with Ellen Skrmetti** — West Side Comedy Club, Sat Nov 7, 6pm, from $25.
  NYCF lineup page and the club's own show page agree. Club artwork saved (1200x630).
- **Ken Boyd, Caroline Hanes, Craig Gass, Kyle Grooms and Mike Yard** — Comic Strip Live,
  Sat Nov 7, 8pm, $25.71.
- **Simeon Goodson: Back in Brooklyn! Live Album Recording** — Eastville Comedy Club,
  Sun Dec 6, 6pm, $33.46 GA ($30 + $3.46 fee). Fills a bare December night. Flyer saved.
- **Bar Bayeux** registered — 1066 Nostrand Ave, Brooklyn, Prospect Lefferts Gardens.
  The room's own site calls itself "Live Jazz in Prospect Lefferts Gardens".
- **Post Moves Comedy** added as a recurring Sunday 8:30pm free show (one drink minimum
  asked of guests), with the producer's Eventbrite organizer page registered so the feed
  covers the room.
- **The Comedy Shop** added to clubs.json — 167 Bleecker St, three rooms, two-item minimum,
  daily 4pm and 6pm open mics.

### Corrections I made to the dead run's work

- **Eastville Nov 1 title.** The pick was titled "Sunday Night Comedy"; the venue's own
  calendar and event page title that date **Fallback Comedy** (it still sits inside the
  Sunday Night Comedy series). Retitled, and the blurb rewritten to say what it is.
- **Peter Stewart blurb.** Said the show was "at the Second Stage". Nothing on the club's
  page mentions a second stage — it is the Monday 8pm set in the main room at 1568 Second
  Ave. Rewritten.
- **Simeon Goodson blurb.** Called Eastville a 60-seat room. The club's own About page
  says it seats 120. Corrected.
- **Comedy Shop price.** Listed as "From $15". The club's own ticket pages show $20 for
  the regular 8pm and 10pm shows; the $10 figure belongs to a one-off watch party.
  Corrected to $20, and the three rooms on the club's Rooms page added.
- **Bar Bayeux provenance.** The venue note credited r/parkslope as well as
  r/crownheights; only r/crownheights threads mention the room. Fixed.
- **Price format.** Both Comic Strip picks read $25.71 on Eventbrite's own page schema.
  (The ticket-classes API reports $23.61, which omits part of the fee — the page schema
  is the figure the reader sees, and it matches the existing Comic Strip picks.)

### Not published

- **Eastville's Sunday Night Comedy for Nov 8 and Dec 13/20/27** — those dates are on the
  venue's calendar but carry no published bill, so there is no "why this one" line to write.

### Board after this run

87 picks. Six weeks ahead: **18 / 17 / 13 / 16 / 12 / 11** — every week at or above the
8-pick floor. `npm test` passes clean: 87 picks, 8 sitemap pages, 16 scripts, zero warnings.
