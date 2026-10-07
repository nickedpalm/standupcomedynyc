#!/usr/bin/env python3
"""Add Laugh for Sight Gotham pick."""
import json

with open('web/data/picks.json') as f:
    picks = json.load(f)

new_pick = {
    "id": "laugh-for-sight-gotham-2026-10-26",
    "title": "Laugh for Sight",
    "date": "2026-10-26",
    "starts_at": "2026-10-26T20:30:00-04:00",
    "ends_at": "2026-10-26T22:30:00-04:00",
    "end_time_confirmed": True,
    "time_label": "8:30pm · doors 7pm silent auction",
    "venue": "Gotham Comedy Club",
    "neighborhood": "Chelsea",
    "price_amount": 50.00,
    "price_label": "$50 GA + 2-bev min · $150 VIP open bar",
    "ticket_url": "https://gothamcomedyclub.com/events/laugh-for-sightrr0o2ld",
    "source_url": "https://gothamcomedyclub.com/events/laugh-for-sightrr0o2ld",
    "verified_at": "2026-10-05",
    "description": "The 19th annual benefit for InTandem and The Seeing Eye, with Mark Normand, Cory Kahaney, Mike Yard, Aaron Berg, Peter Revello and Brian Fischler hosted by Shaun Eli. Doors open at seven for a silent auction and cocktail hour; the show starts at 8:30.",
    "featured": False,
    "tier": "special",
    "poster": {
        "src": "/assets/posters/laugh-for-sight-gotham-2026-10-26.png",
        "width": 1080,
        "height": 1080,
        "source_url": "https://gothamcomedyclub.com/events/laugh-for-sightrr0o2ld",
        "credit": "Artwork: Gotham Comedy Club / show organizer",
        "alt": "Laugh for Sight 19th annual benefit promotional artwork.",
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
