# Roadmap

This document captures the near-term and speculative next steps for the AT Protocol label UX prototype. It's meant to be a stable reference across sessions — update it as priorities shift.
---

## Phase 2: Lightweight labeler AppView

This is the most important next concept to demonstrate. Instead of showing the labeler only as a badge-and-detail-page bolt-on to a generic feed, show the labeler running *its own* feed-like surface.

A labeler AppView would:

- Let a user sign in with their AT Protocol account (atmosphere/OAuth)
- Scan their follows' posts (or a configurable set of accounts) for content the labeler recognizes
- Surface only the labeled posts, filtered and ranked by the labeler's own logic
- Support personalized automation, e.g. "whenever someone I follow posts about a book, add it to my want-to-read list" — analogous to [Sill.social](https://sill.social) for links
- Support social filtering, like Foursquare's old "places my friends checked in" — prioritizing posts from trusted accounts

This demonstrates the labeler as a *service*, not just a passive tagger. It also makes the "subscribe to this labeler" framing concrete.

---

## Phase 3: Additional use cases

### Podcast labeler

A post mentions a podcast or episode — the labeler surfaces "subscribe to this podcast" and "save this episode in your podcatcher" as actions. The subscribe case is especially interesting on *user profiles* (not just posts): if someone's bio or pinned post signals they host a podcast, the labeler could surface a subscribe button there. Worth sketching before building.

### Explicit posting / entity tagging

Right now the labeler is entirely reactive — it watches for signals in posts after the fact. A complementary flow: the user *explicitly* links their post to an entity (a book, paper, place) before or during posting. This could live as an interface on the labeler's own site, removing the need to include a raw identifier in the post text. Ties back to Phase 1's "more natural posts" goal, but from the posting side.

---

## Phase 4: Stretch concepts

These are worth keeping in mind but don't need to be specified yet.

- **WebTiles / inlay.at.** Instead of a simple CTA button, the labeler's detail view could use a WebTile template for a richer embedded experience. WebTiles are specified to be network-free, so there's some handwaving to work out — but the concept (labeler ships a display template, client renders it) is worth illustrating.

- **Multi-labeler coordination.** The current demo shows two labelers on the same post and links between them. A richer version might let users configure which labeler "wins" for a given domain, or surface explicit trust tiers (community labeler vs. institutional labeler).

- **Discovery.** How does a user find out about labelers? The protocol doesn't have an answer yet. Worth tracking as labelers become less esoteric.

- **User opt-out UX.** The AT Protocol has an opt-out mechanism for labels. What does the UX for that look like in a labeler AppView?
