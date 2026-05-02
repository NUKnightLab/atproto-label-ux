# AT Protocol Media Labeler — Project Overview

## Core Concept

This project is a prototype demonstrating a pattern for enriching AT Protocol (Bluesky) posts with semantic context through a labeler service, without requiring custom record types or any changes to how users post.

The key insight: **labels are pointers, not containers.** A label identifies the issuing service and optionally includes an action URL. Any client that sees the label can follow that URL to get rich metadata from the labeler’s own service. This keeps labels protocol-compliant (flat, token-based) while enabling arbitrarily rich downstream experiences.

## How It Works

1. **Users post naturally** on Bluesky or any AT Protocol client. No special app required.
1. **A labeler service** (e.g., “BookWatcher”) watches the firehose for recognizable patterns — ISBNs, DOIs, geographic identifiers, etc.
1. **The labeler applies a flat label** (e.g., `bookwatcher`) to matching posts. The label value is intentionally minimal — the AT Protocol spec explicitly discourages packing structure into label values (no `media:music:jazz`-style hierarchies).
1. **The label carries an action URL** pointing back to the labeler’s service with context about that specific post. This is the escape hatch: all semantic richness lives at that URL, not in the label itself.
1. **Any client** that understands labels can surface the labeler’s branding and action URL, letting users click through to the full context — book metadata, reading list options, library lookup, etc.

## Multiple Labelers

The same post can be labeled by multiple independent services:

- `bookwatcher` — identifies the book, offers library/reading list integration
- `openlibrary` — links to Open Library record
- `libraryassociation` — a more authoritative/neutral source

Different clients can choose which labelers to trust, similar to how Wikipedia lets users redirect links to preferred book sources (Wikidata’s book link feature).

## Action URL Pattern

A proposed convention (not yet in the spec, but under discussion in the ATProto community) is for labelers to include an action URL alongside the label. This URL could be:

- Post-specific: `https://bookwatcher.example/post/at://did:plc:xxx/app.bsky.feed.post/yyy`
- Or general: `https://bookwatcher.example/labeler` — and the client passes the post URI as a query param

This sidesteps the need for hierarchical label namespaces while enabling rich per-post context.

## Demo Scenarios

The prototype should illustrate multiple use cases:

### 1. Book Discovery (primary)

- User posts something mentioning a book, possibly with an ISBN
- BookWatcher labels the post
- A Bluesky-like feed shows the post with a BookWatcher badge
- Clicking the badge shows: book metadata, “add to reading list”, “find in local library”

### 2. Science Paper

- User posts about a paper and includes a DOI
- A labeler detects the DOI, labels the post
- Action URL leads to paper metadata, abstract, citation info

### 3. Geographic / Atlas City-style

- A user’s profile or post is labeled with a place identifier
- The label is flat (not `location:chicago:illinois`) but links to the Atlas City service
- That service surfaces richer location context

## What This Prototype Is NOT

- Not a live AT Protocol app — no real PDS, no firehose
- Not a production-ready labeler
- Not trying to get label adoption yet — this is a concept demo

## Architecture

Use a **mock backend** with:

- Fake post data resembling Bluesky posts (DID-based author IDs, timestamps, text content)
- A simple pattern-matching labeler that scans post text for ISBNs, DOIs, etc.
- A labeler “database” mapping detected identifiers to mock metadata (book title/author, paper title/abstract, etc.)
- Multiple labeler personas with distinct visual branding

The **frontend** should:

- Look and feel like a simplified Bluesky feed
- Show labeled posts with labeler badges
- Allow clicking through to a labeler detail view (the “action URL” experience)
- Ideally show a side-by-side or toggle view of the same post labeled by different services

## Tech Stack Preferences

- Python (Flask) backend preferred, but open to whatever makes sense
- Prioritize the UI — this is a concept demo, and people need to *get it* visually
- Self-contained as much as possible; avoid live network dependencies
