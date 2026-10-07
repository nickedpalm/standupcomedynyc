#!/usr/bin/env python3
"""Show week 4 picks to understand gaps."""
import json
from collections import defaultdict
from datetime import date, timedelta

with open('web/data/picks.json') as f:
    picks = json.load(f)

# Group by week
for week_start_day in [date(2026,10,26), date(2026,11,2), date(2026,11,9), date(2026,11,16)]:
    week_end = week_start_day + timedelta(days=6)
    week_picks = [p for p in picks if week_start_day <= date.fromisoformat(p['date']) <= week_end]
    by_day = defaultdict(list)
    for p in week_picks:
        by_day[p['date']].append(p)
    print(f'\n=== Week of {week_start_day} ({len(week_picks)} picks) ===')
    for d in sorted(by_day):
        print(f'  {d}: {", ".join(p["title"][:40] for p in by_day[d])}')
    # Days with no picks in this week
    for i in range(7):
        d = (week_start_day + timedelta(days=i)).isoformat()
        if d not in by_day:
            print(f'  {d}: -- (empty)')
