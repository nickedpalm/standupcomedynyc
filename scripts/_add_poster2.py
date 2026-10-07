#!/usr/bin/env python3
"""Add Martin Amini poster source record."""
import json

with open('POSTER-SOURCES.json') as f:
    sources = json.load(f)

new_source = {
    "event_id": "martin-amini-gotham-2026-10-13",
    "src": "/assets/posters/martin-amini-gotham-2026-10-13.png",
    "width": 1080,
    "height": 1080,
    "source_url": "https://gothamcomedyclub.com/events/martin-aminioct2026u4n94g1",
    "credit": "Artwork: Gotham Comedy Club / show organizer",
    "alt": "Martin Amini promotional artwork.",
    "kind": "dated event flyer",
    "original_image_url": "https://sc-events.s3.amazonaws.com/30025/10474944/7d043a1c6e04966824510153d5fa4778c86c5717c561f5ca00c8e49948510683/4f98cd4f-320d-457d-b49c-2074f487e06e.png",
    "retrieved_at": "2026-10-05",
    "bytes": 843609,
    "sha256": "2587df3f97ec70609cf5fb4082b56cf036712b6c91ec0487ff1b120e69313fa2",
    "reuse_status": "Official promotional artwork; no separate reuse license identified. Local review draft only."
}

sources.append(new_source)

with open('POSTER-SOURCES.json', 'w') as f:
    f.write(json.dumps(sources, indent=1) + "\n")

print(f"Added poster record. Total: {len(sources)}")
