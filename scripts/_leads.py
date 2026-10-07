#!/usr/bin/env python3
"""Inspect Eventbrite leads."""
import json
with open('candidates/eventbrite.json') as f:
    data = json.load(f)
print('Total events:', len(data['events']))
print('Already picks:', sum(1 for e in data['events'] if e.get('already_a_pick')))
print()
new_leads = [e for e in data['events'] if not e.get('already_a_pick') and not e.get('seen_before')]
print('New leads (not already pick, not seen before):', len(new_leads))
for e in new_leads:
    print(f'  {e["date"]} {e["time"]:8s} {e["title"][:60]:60s} @ {e["venue"]:20s} ${e["price_from"]}')
    print(f'    url: {e["url"]}')
    print(f'    desc: {e.get("description", "")[:100]}')
    print()
