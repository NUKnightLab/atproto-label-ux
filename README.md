# atproto-label-ux

Experimenting with UX for cases where atproto labels support more than just moderation

related to [community discourse post](https://discourse.atprotocol.community/t/labels-beyond-moderation/832)

also an experiment with Claude as sketching partner

## For now

This is a SvelteKit app that you can run to see some of these ideas.

```
npm install
npm run dev
```

## Next thoughts

* a "light" AppView that one of these labeling services might implement that filters your feed to only posts that it has labeled; For bookwatcher, perhaps affordance to configure preferences like "whenever X posts about a book, automatically add it to my 'want to read' list"
* A podcast use case that facilitates "subscribe to this podcast" and "save this episode in your podcatcher" and maybe other natural options. "Subscribe to this podcast" would be relevant on a user profile page, so maybe we want to flesh that out. (Might be less obvious to users but we'll work that out.)
* a posting use case where someone is explicitly attempting to link their post to an entity (book, paper, etc). This might exist as an interface on the remote site. It would facilitate not including the DOI directly in the post (although while these features are novel, maybe it's still needed).
* A WebTiles case where instead of the buttons we see now, the AppView uses the labeler's preferred WebTile (or inlay.at) "template" to present an even richer experience than the simple CTA button. (Stipulated that web tiles are prohibited from network activity, so there's some handwaving here)
