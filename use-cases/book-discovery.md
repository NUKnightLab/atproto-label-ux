# Use Case: Book Discovery

*Status: prototype built. The feed and label detail views are running. This document describes the scenario and the design choices behind it.*

---

## The scenario

Someone posts on Bluesky about a book they're reading. They mention the title, maybe include the ISBN out of habit or enthusiasm. They're not thinking about labelers — they're just talking about a book.

Behind the scenes, a labeler service called **BookWatcher** is watching the firehose for posts containing ISBNs. It finds this post, looks up the ISBN in its metadata store, confirms it's a real book it knows about, and applies a label to the post. The label is a flat token: `bookwatcher`. Nothing about the book title is in the label value — that would violate the AT Protocol's guidance against hierarchical label semantics.

What the label *does* carry is an action URL, pointing back to BookWatcher's own service with the post URI in scope. Any client that understands the label can follow that URL to get everything BookWatcher knows: title, author, cover art, genre, and a set of actions specific to books.

---

## What the user sees

**In the feed:** A small colored badge appears below the post text. In this prototype there are two labeler badges on most book posts — one for BookWatcher (indigo) and one for OpenLibrary (sky blue). The badges are unobtrusive but clickable.

**Clicking a badge** takes you to that labeler's detail view for that post. The page shows:

- The label's wire format (src, val, uri) — so the pattern is legible, not hidden
- The original post in context
- The book metadata the labeler surfaced (title, author, cover, description, genres)
- A grid of actions specific to that labeler

---

## Two labelers, one post

The same post can simultaneously carry a `bookwatcher` label and an `openlibrary` label. They agree on the ISBN; they disagree on what to do with it.

**BookWatcher** thinks in terms of personal reading: add to list, find in a local library, buy from an indie bookstore, log a rating.

**OpenLibrary** thinks in terms of the commons: link to the OL record, borrow the digital edition, contribute an edit to the record, generate a citation.

These aren't competing interpretations — they're complementary services that the client can surface independently. The "also labeled by" section in the detail view links between them. A user can subscribe to both, or choose one, or neither. The client decides how much weight to give each labeler.

This is the analog to Wikipedia's book link feature, where editors can configure which source links redirect to (WorldCat, Open Library, Google Books, etc.). The same data, different affordances, user-controlled.

---

## The identifier: ISBN

ISBNs are well-suited to this pattern:

- They're globally unique and stable
- They appear naturally in posts (people quote them, share them, paste them from Goodreads)
- Both ISBN-10 and ISBN-13 forms are common; the labeler normalises to ISBN-13
- The lookup is deterministic: same ISBN → same book → same label

The labeler's regex looks for bare 13-digit or 10-digit numbers preceded optionally by `ISBN:` or `ISBN `. False positives are possible (a 13-digit number that isn't an ISBN), but for a prototype this is fine — in production you'd validate the check digit.

---

## The label wire format

What actually exists on the AT Protocol network for a labeled post looks like this:

```
{
  src: "did:plc:bookwatcher0000000000001",
  val: "bookwatcher",
  uri: "at://did:plc:alice.../app.bsky.feed.post/3kvzgb2qfzk2e",
  cts: "2026-05-02T12:34:56Z"
}
```

That's it. No book title, no ISBN, no action URL — just a source DID, a flat token value, and the URI of the labeled subject. The richness lives at the labeler's service, not in the label record. The label is a pointer.

The action URL is a convention proposed on top of this — the labeler publishes a well-known endpoint where clients can GET metadata for a given post URI. It's not yet in the spec, but it's a natural extension.

---

## Open questions

- **Discovery:** How does a user find out about BookWatcher in the first place? Do they subscribe to it explicitly, or does the client surface it opportunistically? This prototype assumes subscription, but opportunistic surfacing is more interesting and harder.
- **False positives and trust:** What happens when BookWatcher labels a post that contains a 13-digit number that isn't a book? The label still appears. The client could show it as lower-confidence, or require a human-verified tier.
- **Labeler competition:** If BookWatcher and OpenLibrary both label the same post, who gets primary placement in the feed badge? The client decides, but it needs a policy. Alphabetical, subscription order, user preference?
- **User agency:** Should a user be able to say "don't label my posts" per labeler? The AT Protocol has an opt-out mechanism for labels, but the UX for that isn't shown here.
- **Rich ISBN variants:** Some books have multiple ISBNs (hardcover, paperback, different editions). The labeler currently treats each ISBN as a distinct lookup. Ideally it would resolve to a canonical work record and surface edition info separately.
