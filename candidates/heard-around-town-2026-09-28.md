# Heard around town — draft for 2026-09-28

Five short items, in our voice. Three ride the heat list (Maria Bamford, Marc Maron, Kanan Gill); one is the New York Comedy Festival calendar quietly loading itself up for November; the fifth is a Reddit promoter post the bar-show circuit has been buzzing about all week. Sources are links I actually opened. Heat-sheet rankings pulled from candidates/heat.json (generated 2026-09-28 11:04 UTC).

---

**1. Maria Bamford sold out the Bell House in both directions and never touched a seat-market price.**

Two nights at The Bell House, 149 7th Street in Gowanus — **Saturday October 10 at 6pm and Sunday October 11 at 5pm**, Jackie Kashian opening, both flagged SOLD OUT on the room's own calendar and Ticketmaster the same week the heat sheet put this run at 60 (the highest score on our board this month). Maria's run is four sold-out nights over the weekend and the kind of weeknight-empty bar pattern the Bell House already has. If you don't have a seat, you don't have a seat — no rush line, no walk-ups. Source: https://www.thebellhouseny.com/shows

**2. Kanan Gill is doing two shows at Town Hall on Saturday and the early one is the move.**

The Town Hall, 123 West 43rd Street in Times Square, has **Kanan Gill: Not This Again at 4pm and again at 7pm on Saturday October 3** — the second show was added this month, the heat sheet has it at 35 with the going_fast tag, and Reddit's been doing the math on which one to grab since the announcement. The 4pm matinee is the play if you want a real seat and not a balcony compromise. Source: https://www.thetownhall.org/event/kanan-gill-not-this-again

**3. Marc Maron's "Yammering Into the Void" tour lands the Beacon as a NYCF date.**

The New York Comedy Festival (Nov 6–15) just posted **Marc Maron: Yammering Into the Void Tour at the Beacon Theatre, 2124 Broadway at 74th Street, on Sunday November 8 at 7:30pm**, his only NYC date, via Outback Presents. Tickets on Ticketmaster and Live Nation now; the Beacon is a step up from any room he's played in the city recently and the tour name is doing the work for him. Source: https://nycomedyfestival.com/lineup/marc-maron-yammering-into-the-void-tour/

**4. Mulaney Takes Manhattan tickets open to the public this week — nine rooms in nine nights, ending at MSG.**

BrooklynVegan and the MSG site both have the full schedule now: **Comedy Cellar Jan 7, Blue Note Jan 8, Joe's Pub Jan 9, Bowery Ballroom Jan 10, Music Box Theater Jan 11, Beacon Theatre Jan 12, Carnegie Hall Jan 14, Radio City Music Hall Jan 14, Madison Square Garden Jan 15**. Nine nights, nine venues, each "with special guests and a whole lot of different." Pre-sale sign-up is at johnmulaney.com — the public on-sale is the thing to watch. Source: https://www.brooklynvegan.com/john-mulaney-announces-9-nyc-shows-including-comedy-cellar-madison-square-garden-more/

**5. Ebony Moore's Comedy Hoedown at Freda is the bar-show pick of the week.**

Three subreddits (r/Bushwick, r/NYCComedy, r/nycevents) have been passing around the same poster all week: **Ebony Moore & Friends Comedy Hoedown at Freda (Basement), 801 Seneca Avenue in Ridgewood, on Sunday October 4 at 6pm**, headliner Simeon Goodson, western wear encouraged, $20, in bed by 10. Early show, easy L/M ride from Manhattan, and it's the kind of bar-room night the rest of the week is missing. Tickets via Venuepilot. Source: https://www.reddit.com/r/Bushwick/comments/1wqyfc9/ebony_moore_friends_comedy_hoedown_at_bar_freda/

---

Notes for Nick:
- Item 1 is a beat on a sold-out pick that's already on the board. heat.json still says `demand: null` for the Maria Bamford run — last30days / heat refresh hasn't caught the sold-out status. Worth running `npm run heat` against the bellhouseny.com calendar before this ships, otherwise the Tonight carousel will try to feature a show nobody can buy. Two-night sell-out means the second night is the one to point readers at; both are sold.
- Item 2 is the most reader-actionable of the five. Kanan Gill is on the board with both times, heat 35, going_fast.
- Item 3 is the NYCF line — Marc Maron is in our registry as Beacon (kind: theater). It's far out enough that "Save the date" framing works; the Seven-day horizon doesn't care about it.
- Item 4 is the long-tail story of the week. Mulaney's nine-venue run is bigger than a stand-up story — it's a New York rooms-are-back story, and the Johnmulaney.com pre-sale page is the action.
- Item 5 is a Reddit lead the heat sheet doesn't see. Freda (Basement) is in our venue registry (Ridgewood). The promoter (Ebony Moore) is hitting the right subreddits, the early-show timing is real, and the headliner (Simeon Goodson) hasn't been on our board before — worth opening the venuepilot link and adding the pick if the lineup looks right.
- Skipped intentionally: Salma Hindy (heat 40, real show at The Stand Nov 4 — `SALMA HINDY: 10 YEARS OF STAND-UP COMEDY, Wed Nov 4, 8pm, $25` — but her heat signal is a political dispute, and the editorial rule is to keep political judgments by name and let you call borderline cases). Skipped Maria Bamford's "Special Special Special" Reddit thread (people re-recommending a 2012 special, not news). Skipped Sam Tallent (heat 31, novel *Brut* dropping — the Bell House Nov 5 show is already on the board, no new news).
- Press pull: last30days returned thin results for all four queries. Reddit rate-limited Salma Hindy (HTTP 429). The Hacker News query for "NYC comedy" returned zero comedy items (door-to-door HVAC, AI in schools, parking). I leaned on web_search for the named outlets — Vulture, Village Voice, BrooklynVegan, NYT On Comedy, Time Out. The Village Voice Cheap Laughs column is dormant (the URL routes to a 2013 archive piece); no fresh weekly column. Vulture's archive server returned a 404 on the comics-on-social-media piece but BrooklynVegan's Mulaney piece is current. NYT On Comedy updated Sept 15 and Sept 17 with Zinoman reviews of Aaron Chen and Dan Mintz — neither is in NYC this week.