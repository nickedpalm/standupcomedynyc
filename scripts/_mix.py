#!/usr/bin/env python3
"""Check Bell House/Union Hall mix."""
import json
from collections import Counter
from datetime import date, timedelta

with open('web/data/picks.json') as f:
    picks = json.load(f)

today = date.today()
week_end = today + timedelta(days=6)
next7 = [p for p in picks if today <= date.fromisoformat(p['date']) <= week_end]
print(f'Next 7 days: {len(next7)} picks')
venue_counter = Counter(p['venue'] for p in next7)
for v, c in venue_counter.most_common():
    print(f'  {v}: {c}')
total = len(next7)
bh_uh = venue_counter.get('The Bell House', 0) + venue_counter.get('Union Hall', 0)
print(f'BH + UH: {bh_uh}/{total} = {bh_uh/total*100:.0f}%')

# Also: 2 weeks out (up to Oct 19)
two_week_end = today + timedelta(days=13)
two_week = [p for p in picks if today <= date.fromisoformat(p['date']) <= two_week_end]
print(f'\nNext 14 days: {len(two_week)} picks')
venue_counter = Counter(p['venue'] for p in two_week)
for v, c in venue_counter.most_common():
    print(f'  {v}: {c}')
total = len(two_week)
bh_uh = venue_counter.get('The Bell House', 0) + venue_counter.get('Union Hall', 0)
print(f'BH + UH: {bh_uh}/{total} = {bh_uh/total*100:.0f}%')
