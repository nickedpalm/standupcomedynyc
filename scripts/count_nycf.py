#!/usr/bin/env python3
"""Count the New York Comedy Festival shows on our board, for links.json.

Usage:  python3 scripts/count_nycf.py [--write]

WHAT THIS COUNTS
A board pick is a festival show when:
  (a) its ticket_url or source_url is on nycomedyfestival.com, OR
  (b) its URL matches the festival's own "Get Tickets" link, OR
  (c) the festival lists that same show title at our venue on that date.
One board pick counts once, even when the festival lists it twice.

TWO PARSER BUGS FIXED 2026-11-08 (both had been silently under-counting):

1. The venue was read from an element with class="venue". The festival's
   markup has no such element -- each show block is

       <div class="post">
         <div class="img"> ... </div>
         <div class="info">
           <h2><a href="/lineup/...">TITLE</a></h2>
           <div class="content">
             <span>Fri 11/6 6:00 pm</span><br>
             <span>New York Comedy Club East Village</span>
           </div>
           <a href="..." class="btn btn-black">Get Tickets</a>
         </div>
       </div>

   so the venue is the SECOND span in div.content. The old parser returned
   an empty venue for all 250 blocks, so rule (c) NEVER FIRED.

2. The board date was converted to the festival's M/D format as day/month
   instead of month/day, so rule (c) never matched on date either.

With both fixed, plus a title normalization for the presenting prefix
("NYCF Presents: X" -> "X"), the counter reproduces every figure published
since 2026-11-01 exactly:

   defe3eba (Nov 7)  published 33  counted 33
   c7c71f7c (Nov 5)  published 34  counted 34
   cc8c7f15 (Nov 4)  published 33  counted 33
   00353ae7 (Nov 3)  published 32  counted 32
   ad5bf7e2 (Nov 1)  published 31  counted 31

The three older revisions (Oct 27/29/31) were written with a weaker method
that predates the venue alias and are NOT expected to reproduce; do not chase
them.

RULE: always run the validation before trusting a number on a changed tree.
"""
import json, os, re, subprocess, sys, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCHEDULE = 'https://nycomedyfestival.com/schedule/'
CACHE = os.path.join(ROOT, 'candidates', 'tmp', 'nycf_schedule.html')

# The revisions whose published figure the method must reproduce.
VALIDATE = ['ad5bf7e2', '00353ae7', 'cc8c7f15', 'c7c71f7c', 'defe3eba']


def git(*args):
    return subprocess.check_output(['git'] + list(args), cwd=ROOT).decode()


def strip_q(u):
    """Normalize a URL for comparison. Both normalizations are needed:
    the festival links some shows over http, and our Caveat picks use
    www.caveat.nyc where the festival uses caveat.nyc."""
    u = (u or '').split('?')[0].rstrip('/')
    if u.startswith('http://'):
        u = 'https://' + u[len('http://'):]
    u = u.lower()
    if u.startswith('https://www.'):
        u = 'https://' + u[len('https://www.'):]
    return u


def venue_alias(name):
    """The festival prints 'New York Comedy Club'; our registry prints
    'New York Comedy Club (Midtown)'. Strip the parenthetical."""
    return re.sub(r'\s*\([^)]*\)\s*', '', name or '').strip().lower()


TITLE_PREFIX = re.compile(
    r'^(?:new\s+york\s+comedy\s+festival\s+)?'
    r'(?:nycf\s+)?'
    r'(?:presents|presented\s+by)\s*[:\-]?\s*',
    re.I)


def title_alias(title):
    t = (title or '').strip().lower()
    t = TITLE_PREFIX.sub('', t)
    return re.sub(r'\s+', ' ', t).strip()


def schedule_html():
    try:
        return open(CACHE, encoding='utf-8').read()
    except OSError:
        pass
    req = urllib.request.Request(SCHEDULE, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req, timeout=60).read().decode('utf-8', 'replace')
    os.makedirs(os.path.dirname(CACHE), exist_ok=True)
    with open(CACHE, 'w', encoding='utf-8') as f:
        f.write(html)
    return html


def parse_schedule(html):
    """Parse the festival schedule into (date, time, venue, title, ticket url)."""
    blocks = re.split(r'<div[^>]*class="[^"]*\bpost\b[^"]*"', html)
    out = []
    for b in blocks:
        tm = re.search(r'<h2[^>]*>\s*<a[^>]*>(.*?)</a>', b, re.S)
        if not tm:
            continue
        title = re.sub(r'<[^>]+>', '', tm.group(1)).strip()

        cm = re.search(r'<div[^>]*class="[^"]*\bcontent\b[^"]*"[^>]*>(.*?)</div>', b, re.S)
        if not cm:
            continue
        spans = re.findall(r'<span[^>]*>(.*?)</span>', cm.group(1), re.S)
        spans = [re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', s)).strip() for s in spans]
        spans = [s for s in spans if s]
        if not spans:
            continue
        dstr = spans[0]
        venue = spans[1] if len(spans) > 1 else None

        dm = re.search(r'\b(\d{1,2})/(\d{1,2})\b', dstr)
        if not dm:
            continue
        date = '%s/%s' % (dm.group(1), dm.group(2))
        tm2 = re.search(r'\b(\d{1,2}):(\d{2})\s*(am|pm)', dstr, re.I)
        time = ('%s:%s %s' % (tm2.group(1), tm2.group(2), tm2.group(3).lower())) if tm2 else None

        # The href comes BEFORE the link text.
        hm = re.search(r'<a\s+href="([^"]+)"[^>]*>\s*Get Tickets', b, re.I)
        ticket = hm.group(1) if hm else None

        out.append({'date': date, 'time': time, 'venue': venue, 'title': title, 'ticket': ticket})
    return out


def count(picks, fest):
    fest_by_ticket = {}
    for f in fest:
        if f['ticket']:
            fest_by_ticket.setdefault(strip_q(f['ticket']), []).append(f)

    n = 0
    hits = []
    for p in picks:
        urls = {strip_q(p.get('ticket_url')), strip_q(p.get('source_url'))}
        urls.discard(None)
        urls.discard('')
        why = None
        if any(u.startswith('https://nycomedyfestival.com') for u in urls):
            why = 'a'
        else:
            for u in urls:
                if u in fest_by_ticket:
                    why = 'b'
                    break
        if why is None:
            pv = venue_alias(p.get('venue'))
            ptitle = title_alias(p.get('title'))
            mm = re.match(r'(\d{4})-(\d{2})-(\d{2})', p.get('date') or '')
            pdate = '%s/%s' % (int(mm.group(2)), int(mm.group(3))) if mm else ''
            for f in fest:
                if title_alias(f['title']) != ptitle:
                    continue
                if venue_alias(f['venue']) != pv:
                    continue
                if f['date'] != pdate:
                    continue
                why = 'c'
                break
        if why:
            n += 1
            hits.append({'id': p['id'], 'why': why, 'date': p.get('date'),
                         'venue': p.get('venue'), 'title': p.get('title')})
    return n, hits


def published(rev):
    raw = git('show', rev + ':web/data/links.json')
    m = re.search(r'([0-9]+) shows on our board', raw)
    return int(m.group(1)) if m else None


def main():
    html = schedule_html()
    fest = parse_schedule(html)
    print('festival blocks: %d (with venue %d, with ticket %d)' % (
        len(fest), sum(1 for f in fest if f['venue']), sum(1 for f in fest if f['ticket'])))

    print('validation against published figures:')
    ok = True
    for rev in VALIDATE:
        pub = published(rev)
        picks = json.loads(git('show', rev + ':web/data/picks.json'))
        n, _ = count(picks, fest)
        good = (n == pub)
        if not good:
            ok = False
        print('  %-8s rev %-9s counted %2d  published %2d  %s' %
              ('OK' if good else 'FAIL', rev[:9], n, pub, '' if good else '<< method is wrong'))
    if not ok:
        print('\nMETHOD DOES NOT REPRODUCE THE PUBLISHED FIGURES -- do not publish a count.')
        return 1

    picks = json.load(open(os.path.join(ROOT, 'web', 'data', 'picks.json')))
    n, hits = count(picks, fest)
    print('\nworking tree: %d festival shows on our board' % n)
    out = os.path.join(ROOT, 'candidates', 'tmp', 'nycf_hits.json')
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, 'w') as f:
        json.dump(hits, f, indent=1)

    if '--write' in sys.argv:
        lp = os.path.join(ROOT, 'web', 'data', 'links.json')
        raw = open(lp, encoding='utf-8').read()
        ensure_ascii = '\\u' in raw
        links = json.loads(raw)
        for link in links.get('links', []):
            if link.get('id') == 'nycf':
                old = link.get('note')
                link['note'] = '%d shows on our board, Nov 6-15' % n
                print('links.json note: %r -> %r' % (old, link['note']))
        with open(lp, 'w', encoding='utf-8') as f:
            f.write(json.dumps(links, indent=1, ensure_ascii=ensure_ascii) + '\n')
    return 0


sys.exit(main())
