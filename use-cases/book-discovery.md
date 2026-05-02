# Use Case: Book Discovery

*Status: prototype built. The feed and label detail views are running. This document describes the scenario and the design choices behind it.*

---

## The scenario

Someone posts on Bluesky about a book they're reading. They mention the title or link to a page about it. They're not thinking about labelers — they're just talking about a book.

Behind the scenes, a labeler service called **BookWatcher** is watching the firehose for posts that are about books. It finds this post, maps it to a book record in its metadata store, confirms it's a real book it knows about, and applies a label to the post. The label is a flat token: `bookwatcherbook`. Nothing about the book title is in the label value — that would go against the [AT Protocol's guidance against hierarchical label semantics](https://atproto.com/specs/label#value).

What the label *does* carry is an action URL, pointing back to BookWatcher's own service with the post URI in scope. Any client that understands the label can follow that URL to get everything BookWatcher knows: title, author, cover art, genre, and a set of actions specific to books.

---

## What the user sees

**In the feed:** A small colored badge appears below the post text (currently in BlueSky labels appear above post text and on user profiles). In this prototype there are two labeler badges on most book posts — one for BookWatcher (indigo) and one for OpenLibrary (sky blue). The badges are unobtrusive but clickable.

**Clicking a badge** takes you to that labeler's own website, with a detail view relevant to that post. The page shows:

- The original post in context
- The book metadata the labeler surfaced (title, author, cover, description, genres)
- A grid of actions specific to that labeler

---

## Two labelers, one post

The same post can simultaneously carry a `bookwatcher-book` label and an `openlibrary` label. In the general feed-reading AppView, labelers have no relationship to each other. If it suits a user to run two labelers concerned with the same subject domain, they just do it.

**BookWatcher** thinks in terms of personal reading: add to list, find in a local library, buy from an indie bookstore, log a rating.

**OpenLibrary** thinks in terms of the commons: link to the OL record, borrow the digital edition, contribute an edit to the record, generate a citation.

These aren't competing interpretations — they're complementary services that the client can surface independently. The "also labeled by" section in the detail view links between them. A user can subscribe to both, or choose one, or neither. The client decides how much weight to give each labeler.

This is the analog to Wikipedia's book link feature, where editors can configure which source links redirect to (WorldCat, Open Library, Google Books, etc.). The same data, different affordances, user-controlled.

---

## The label wire format

What actually exists on the AT Protocol network for a labeled post looks like this:

```
{
  src: "did:plc:bookwatcher0000000000001",
  val: "bookwatcher-book",
  uri: "at://did:plc:alice.../app.bsky.feed.post/3kvzgb2qfzk2e",
  cts: "2026-05-02T12:34:56Z"
}
```

That's it. No book title, no ISBN, no action URL — just a source DID, a flat token value, and the URI of the labeled subject. The richness lives at the labeler's service, not in the label record. The label is a pointer.

The action URL is a convention proposed on top of this — the labeler publishes a well-known endpoint where clients can GET metadata for a given post URI. It's not yet in the spec, but it's a natural extension.

---

## TODOs

* Change the examples to not use explicit IDs in the UX, but rather because they have links to pages that are "about" subjects of interest to the labeler. It may not need demonstrating in the prototype UX, but the idea is the labeler use more sophisticated methods than just the bare ISBN or DOI awkwardly jammed in the post.
* update the current labeler page to support a lightweight AppView. Rather than being a full-scale microblogger clone, users login with an atmosphere count to use personalized services.
  * They could ask the labeler app to scan their feed(s) for posts that it knows are, for example, about books. It could provide summary services like [Sill.social](https://sill.social), or 'automatically add books mentioned by particular accounts to my "want to read" list'
  * They could limit searches or prioritize results based on what "people I follow" (or some more trusted subset) have posted, like Foursquare's old "filter by places your friends have checked in at"
* Are there posting use cases? A person could explicitly tag the book as part of a post, maybe removing the need to have the ISBN directly

## Open questions

- **Discovery:** How does a user find out about any given labeler service? They are still kind of esoteric to casual users.
  - Generally worth some thought, but there's a lot more to figure out before this is ready for mass adoption.
- **False positives and trust:** What happens when BookWatcher labels a post that contains a 13-digit number that isn't a book? The label still appears.
  - "report this post" feature built in to labeling should provide a mechanism
- User agency:** Should a user be able to say "don't label my posts" per labeler? The AT Protocol has an opt-out mechanism for labels, but the UX for that isn't shown here.
  - Important to track. As much as the protocol has
- **Rich ISBN variants:** Some books have multiple ISBNs (hardcover, paperback, different editions). The labeler currently treats each ISBN as a distinct lookup. Ideally it would resolve to a canonical work record and surface edition info separately.
