#!/usr/bin/env python3
"""List all clubs."""
import json
with open('web/data/clubs.json') as f:
    clubs = json.load(f)
print(f'Total clubs: {len(clubs)}')
for c in clubs:
    print(f'  {c.get("id")} - {c.get("name")} - {c.get("neighborhood", "?")}')
