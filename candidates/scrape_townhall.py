import re
with open('/tmp/townhall2.html') as f:
    html = f.read()

# Each event block: <previous-event_title>,<previous-event-arrays>},{"id":<next-event-id>,"title":{"rendered":"<next-event-title>"},"slug":"<next-slug>","meta_box":{...,"dates":[{"date":"<NEXT-EVENT-DATE>
# So event_title X maps to the NEXT dates object's date.
# Loop through event_titles and find the next "dates":"YYYY-MM-DD HH:MM:SS" after it
title_pat = re.compile(r'event_title\\":\\"([^"\\]+)\\')
date_pat = re.compile(r'date\\":\\"([0-9-]+ [0-9:]+)')

titles = [(m.start(), m.group(1)) for m in title_pat.finditer(html)]
dates = [(m.start(), m.group(1)) for m in date_pat.finditer(html)]
print('titles:', len(titles), 'dates:', len(dates))

# For each title, find the FIRST date object that comes after the title
results = []
for ti, tt in titles:
    # find first date position > ti
    next_date = None
    for di, dd in dates:
        if di > ti:
            next_date = dd
            break
    if next_date:
        results.append((next_date, tt))

# Print unique sorted by date
seen = set()
for d, t in results:
    key = (d, t)
    if key not in seen:
        seen.add(key)
        # Only Nov 18-24
        if '2026-11-1' in d or '2026-11-20' in d or '2026-11-21' in d or '2026-11-22' in d or '2026-11-23' in d or '2026-11-24' in d:
            print(d[:10], '|', t)
