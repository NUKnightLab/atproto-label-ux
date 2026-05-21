## Labels beyond Moderation

AT Protocol labelers exist today — mostly for content warnings. This prototype asks: what if labels could do much more?

**Labels are pointers, not containers.** A label identifies the issuing service and can carry an action URL. Any client that sees the label can follow that URL to get rich metadata directly from the labeler's own service. This keeps labels protocol-compliant (flat, token-based) while enabling arbitrarily rich downstream experiences.

In this demo, posts containing book ISBNs or paper DOIs are automatically labeled by mock services. Look for the colored badges beneath posts — clicking one opens the labeler's enriched view. The same post can be labeled by multiple independent services, and clients choose which labelers to trust.

This is a concept demo only. No live AT Protocol connections are made, and all posts and labeler data are mock.
