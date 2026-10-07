#!/usr/bin/env python3
"""Add PRETTY MAJOR pick to picks.json."""
import json
from datetime import datetime

with open('web/data/picks.json') as f:
    picks = json.load(f)

new_pick = {
    "id": "pretty-major-union-hall-2026-10-13",
    "title": "PRETTY MAJOR Hosted by Jay Jurden",
    "date": "2026-10-13",
    "starts_at": "2026-10-13T19:30:00-04:00",
    "ends_at": "2026-10-13T21:00:00-04:00",
    "end_time_confirmed": False,
    "time_label": "7:30pm · doors 7pm",
    "venue": "Union Hall",
    "neighborhood": "Park Slope",
    "price_amount": 15.92,
    "price_label": "$15.92",
    "ticket_url": "https://www.eventbrite.com/e/pretty-major-hosted-by-jay-jurden-tickets-2001136537252",
    "source_url": "https://www.eventbrite.com/e/pretty-major-hosted-by-jay-jurden-tickets-2001136537252",
    "verified_at": "2026-10-05",
    "description": "Jay Jurden's Tuesday-night Park Slope variety with Allison O'Conor co-hosting and Peyton Dix, Taylor Garron, Ismael Loutfi and Greta Titelman on the undercard — a six-comic lineup booked by Matt Kelly and Andrew Mumm, with the kind of 'one of the best' curating that makes the room feel picked rather than assembled.",
    "featured": False,
    "tier": "special",
    "poster": {
        "src": "/assets/posters/pretty-major-union-hall-2026-10-13.jpg",
        "width": 1880,
        "height": 940,
        "source_url": "https://www.eventbrite.com/e/pretty-major-hosted-by-jay-jurden-tickets-2001136537252",
        "credit": "Artwork: Union Hall / show organizer",
        "alt": "PRETTY MAJOR Hosted by Jay Jurden promotional artwork.",
        "kind": "dated event flyer"
    },
    "demand": None,
    "demand_checked": "2026-10-05"
}

picks.append(new_pick)

# Write back with 1-space indent per Mazzie convention from Sep 20
with open('web/data/picks.json', 'w') as f:
    f.write(json.dumps(picks, indent=1) + "\n")

print(f"Added: {new_pick['id']}")
print(f"Total picks: {len(picks)}")
