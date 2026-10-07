#!/usr/bin/env python3
"""Search Eventbrite feed for Union Hall events after Oct 16."""
import json
with open('candidates/eventbrite.json') as f:
    data = json.load(f)
for e in data['events']:
    if e['venue'] == 'Union Hall' and e['date'] >= '2026-10-16':
        print(f"{e['date']} {e['time']:8s} {e['title'][:60]:60s} {e['url']}")
print()
print("All Organizer events Oct 16+ (any venue):")
for e in data['events']:
    if e['date'] >= '2026-10-16' and not e.get('already_a_pick'):
        print(f"{e['date']} {e['time']:8s} {e['title'][:50]:50s} @ {e['venue']:25s} {e.get('seen_before', 'NEW')}")
