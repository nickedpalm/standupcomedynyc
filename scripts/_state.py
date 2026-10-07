#!/usr/bin/env python3
"""Quick state inspection."""
import json
from collections import Counter, defaultdict

with open('web/data/picks.json') as f:
    picks = json.load(f)
print(f'Total picks: {len(picks)}')
month_counter = Counter()
for p in picks:
    m = p['date'][:7]
    month_counter[m] += 1
for m in sorted(month_counter):
    print(f'{m}: {month_counter[m]}')

# Group by week (Mon-Sun)
from datetime import date, timedelta
week_counter = Counter()
week_dates = defaultdict(list)
for p in picks:
    d = date.fromisoformat(p['date'])
    monday = d - timedelta(days=d.weekday())
    week_counter[monday.isoformat()] += 1
    week_dates[monday.isoformat()].append(p)
print()
print("Weekly breakdown:")
for w in sorted(week_counter):
    print(f'  Week of {w}: {week_counter[w]} picks')

# Last 7 days
today = date.today()
week_start = today
week_end = today + timedelta(days=6)
print(f"\nNext 7 days ({week_start} to {week_end}):")
next7 = [p for p in picks if week_start <= date.fromisoformat(p['date']) <= week_end]
next7_by_day = defaultdict(list)
for p in next7:
    d = p['date']
    next7_by_day[d].append(p)
for d in sorted(next7_by_day):
    print(f'  {d}: {len(next7_by_day[d])} picks - {" / ".join(p["venue"] for p in next7_by_day[d])}')
days_with_picks = set(next7_by_day.keys())
all_days = set((week_start + timedelta(days=i)).isoformat() for i in range(7))
empty_days = sorted(all_days - days_with_picks)
print(f"  Days with no picks: {empty_days}")
