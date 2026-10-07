#!/usr/bin/env python3
"""Compare registered comedy clubs to clubs.json entries."""
import json
with open('web/data/venues.json') as f:
    venues = json.load(f)
with open('web/data/clubs.json') as f:
    clubs = json.load(f)

club_ids = {c['id'] for c in clubs}
club_names = {c['name'] for c in clubs}

# Find comedy-like venues not in clubs.json
for v in venues:
    name = v['name']
    # Heuristic: named with "comedy" or "stand up" and not a theater
    lname = name.lower()
    is_comedy_club = ('comedy' in lname or 'stand up' in lname or 'stand-up' in lname) and v.get('kind') != 'theater'
    if is_comedy_club and name not in club_names:
        print(f'  {name} ({v.get("neighborhood", "?")}, {v.get("address", "?")}) - kind={v.get("kind")} - eventbrite_organizer={v.get("eventbrite_organizer", "n/a")}')
