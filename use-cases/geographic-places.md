# Use Case: Geographic Places

*Status: not yet built. This document is a design sketch — it's more speculative than the book and paper cases. The identifier problem is harder here.*

---

## The scenario

Someone posts from a city, or about a place. Maybe their profile says they're based in Chicago. Maybe they post "just arrived at Logan Square" or tag a location in a post. A labeler service — call it **Atlas** — detects the place reference and applies a flat label. Clicking through surfaces something richer: neighborhood character, relevant local feeds, what else is happening there.

The vision from the CLAUDE.md overview references an "Atlas City-style" service — a place-based context layer that lives outside the post but is reachable from it via the label pattern.

---

## Why place identifiers are harder than ISBNs

ISBNs and DOIs exist as part of formal registration systems. A book has one (or a small number of) canonical identifiers. There's a checksum. Lookup tables are freely available.

Place identifiers are messier:

- **Multiple competing systems:** Wikidata QIDs (Q1297 for Chicago), OpenStreetMap relation IDs, Geonames IDs, What3Words, Plus Codes, FIPS codes... none is universally authoritative.
- **Granularity is ambiguous:** "Chicago" is a city, but also "Logan Square" is a neighborhood, and "the corner of Milwaukee and North" is a point. These are related but distinct.
- **How do you detect place references in text?** You can't regex for them the way you can regex for an ISBN. Named Entity Recognition is probabilistic. "Springfield" could be Illinois, Massachusetts, or the Simpsons' hometown.
- **Profile-level vs. post-level:** A user's location is often on their *profile*, not in individual posts. Labels can apply to profiles (any AT Protocol record) as well as posts — but most of the UI conversation so far has been post-centric.

---

## Possible identifier approaches

A few options with different tradeoffs:

**Wikidata QIDs** — Globally unique, stable, cover nearly every notable place, have a rich knowledge graph behind them. But users don't naturally write them in posts. A labeler would need NER to detect place names and resolve them to QIDs. Ambiguity is real.

**OpenStreetMap relation IDs** — Precise geographic boundaries, open data, well-maintained. Same detection problem. Also OSM IDs can change when geometry is edited, which creates instability.

**Explicit hashtags or place tags** — If clients allowed users to optionally tag a post with `#place:Q1297` or similar, detection becomes trivial. But this requires client-side cooperation and changes user behavior, which the book/paper cases don't require. A different model.

**The labeler's own namespace** — Atlas publishes a list of place slugs it knows about (`atlas:chicago-il`, `atlas:logan-square-chicago`). Detection uses NER + disambiguation, but the identifier is stable once resolved. Other labelers that want to refer to the same place need to map to Atlas's namespace or maintain their own.

---

## What the detail view might show

Unlike books (single cultural object) or papers (single document with stable metadata), places are dynamic. The interesting information changes constantly. A place detail view from Atlas might include:

- **A map** — rendered from OpenStreetMap tiles or a static image, showing the place boundary
- **What's happening nearby** — posts from Bluesky users who are in or talking about this place, aggregated by the labeler
- **Local feeds** — if there are curated Bluesky feeds for this city or neighborhood, Atlas could surface them
- **Place character** — static context: population, timezone, notable things, whatever Atlas has curated
- **Weather or conditions** — dynamic data from an open API

The "posts from this place" angle is particularly interesting: Atlas could aggregate posts that have been labeled with a place identifier to build a location-based feed. That's a social feature that emerges from labeling, not from any user choosing to participate in a place-tagged feed explicitly.

---

## Profile labels vs. post labels

The AT Protocol allows labels to apply to any lexicon record, including profiles (the `app.bsky.actor.profile` record). A user who has set their location to Chicago in their profile could be labeled by Atlas at the profile level.

What this enables:
- A post by a Chicago-based user could show an Atlas badge even if the post text doesn't mention Chicago
- A reader could click that badge to understand the author's context
- Atlas could surface other Chicago-based users the reader might want to follow

This is different from moderation labels on profiles (which typically flag something problematic). It's purely additive context. The UX conventions for profile-level labels vs. post-level labels probably need to be distinct — a badge on a post is natural; a badge on a user's name or avatar requires more care.

---

## The trust question

Place is sensitive in ways books aren't. Knowing where someone is, or surfacing their location to other users, has privacy implications. Atlas would need clear policies:

- Does it only label public location information (the user stated their city in their profile)?
- Does it label based on post content even if the user didn't explicitly declare a location?
- Can users opt out?
- What happens when a place label is wrong — someone gets labeled as being in the wrong city?

The protocol's opt-out mechanism for labels exists, but user-facing controls for place-specific labeling deserve special attention.

---

## Open questions

- **Detection strategy:** NER-based detection is probabilistic. What's the right threshold for applying a label? Should uncertain matches be surfaced differently than confident ones?
- **Granularity UX:** If Atlas labels a post with both a city and a neighborhood, how should two badges coexist? Or should it pick the most specific level?
- **Dynamic vs. static data:** A place detail view that shows current conditions needs live data. How does that fit with the "self-contained, no live dependencies" goal of this prototype?
- **Profile label UI:** The prototype currently only shows post badges. What does a profile badge look like, and where in the Bluesky profile layout would it appear?
- **Reverse lookup:** If a user sees a place badge, can they click through to see *all the posts* Atlas has labeled with this place? That would be a novel location-based feed, but it raises questions about aggregation and surveillance.
