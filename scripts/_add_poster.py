#!/usr/bin/env python3
"""Add PRETTY MAJOR poster source record."""
import json

with open('POSTER-SOURCES.json') as f:
    sources = json.load(f)

new_source = {
    "event_id": "pretty-major-union-hall-2026-10-13",
    "src": "/assets/posters/pretty-major-union-hall-2026-10-13.jpg",
    "width": 1880,
    "height": 940,
    "source_url": "https://www.eventbrite.com/e/pretty-major-hosted-by-jay-jurden-tickets-2001136537252",
    "credit": "Artwork: Union Hall / show organizer",
    "alt": "PRETTY MAJOR Hosted by Jay Jurden promotional artwork.",
    "kind": "dated event flyer",
    "original_image_url": "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1127766923%2F282041210522%2F1%2Foriginal.20250918-031114?crop=focalpoint&fit=crop&w=1880&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=dbb75376db82deea9df46feee03e1d82",
    "retrieved_at": "2026-10-05",
    "bytes": 106198,
    "sha256": "c673282016b648b029779a9b2de406ffa109357c86d74e72c75a89c35757c378",
    "reuse_status": "Official promotional artwork; no separate reuse license identified. Local review draft only."
}

sources.append(new_source)

with open('POSTER-SOURCES.json', 'w') as f:
    f.write(json.dumps(sources, indent=1) + "\n")

print(f"Added poster record. Total: {len(sources)}")
