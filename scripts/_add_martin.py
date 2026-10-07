#!/usr/bin/env python3
"""Add Martin Amini Gotham pick."""
import json

with open('web/data/picks.json') as f:
    picks = json.load(f)

new_pick = {
    "id": "martin-amini-gotham-2026-10-13",
    "title": "Martin Amini",
    "date": "2026-10-13",
    "starts_at": "2026-10-13T19:00:00-04:00",
    "ends_at": "2026-10-13T20:30:00-04:00",
    "end_time_confirmed": False,
    "time_label": "7pm",
    "venue": "Gotham Comedy Club",
    "neighborhood": "Chelsea",
    "price_amount": 40.50,
    "price_label": "$40.50 ($35 + $5.50 service fee)",
    "ticket_url": "https://gothamcomedyclub.com/events/martin-aminioct2026u4n94g1",
    "source_url": "https://gothamcomedyclub.com/events/martin-aminioct2026u4n94g1",
    "verified_at": "2026-10-05",
    "description": "D.C. club-owner-turned-touring-headliner Martin Amini, on a three-continent run, working through the bilingual, bicultural material he's built since founding Room 808 in Washington. The opener pitch lives on the Gotham page; the Tuesday-night room is small enough that the audience sometimes leaves engaged.",
    "featured": False,
    "tier": "special",
    "poster": {
        "src": "/assets/posters/martin-amini-gotham-2026-10-13.png",
        "width": 1080,
        "height": 1080,
        "source_url": "https://gothamcomedyclub.com/events/martin-aminioct2026u4n94g1",
        "credit": "Artwork: Gotham Comedy Club / show organizer",
        "alt": "Martin Amini promotional artwork.",
        "kind": "dated event flyer"
    },
    "demand": None,
    "demand_checked": "2026-10-05"
}

picks.append(new_pick)

with open('web/data/picks.json', 'w') as f:
    f.write(json.dumps(picks, indent=1) + "\n")

print(f"Added: {new_pick['id']}")
print(f"Total picks: {len(picks)}")
