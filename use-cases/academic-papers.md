# Use Case: Academic Papers

*Status: prototype built (ScholarWatch labeler, DOI detection). This document describes the scenario and the design questions it raises.*

---

## The scenario

A researcher posts a link to a paper, or mentions a DOI inline. The post might be a recommendation, a critique, a quick citation in an argument — the post author doesn't know or care that labelers are watching.

A labeler called **ScholarWatch** scans for DOI patterns (`doi:10.xxx` or `https://doi.org/10.xxx`) and checks them against a metadata store. When it finds one it recognises, it applies a `scholarwatch` label pointing to its detail view for that post.

The detail view surfaces: title, authors, venue, year, abstract, and actions relevant to researchers (read, cite, save to reference manager, find related work).

---

## Why this case is interesting

Books have ISBNs. Papers have DOIs. The pattern is the same — structured identifier in post text, labeler detects it, label is flat, richness lives at the action URL.

But papers reveal something books don't: **DOIs already have their own resolution infrastructure.** `doi.org` is itself a pointer system — a DOI resolves to wherever the publisher decides to put the paper. ScholarWatch is building *on top of* that infrastructure, adding a social-network layer. The label says "I, ScholarWatch, know about this DOI in this post and have something to say about it." The DOI says where the paper lives. The two systems are independent and composable.

This also makes the "labels are pointers, not containers" principle especially visible. The DOI is already a pointer. The label is a pointer to a pointer-enricher. The actual document is somewhere else entirely. No one is copying text into the protocol.

---

## Identifier notes

DOIs start with `10.` followed by a registrant prefix and a suffix. They're case-insensitive but conventionally lowercase. Common forms in social posts:

- `doi:10.1145/3442188.3445922`
- `https://doi.org/10.1145/3442188.3445922`
- Just the DOI string pasted bare: `10.1145/3442188.3445922`

The prototype regex handles the first two. Bare DOIs are harder to detect without false positives (any `10.` followed by digits could match). A production labeler would probably require the `doi:` prefix or a `doi.org` URL.

Preprints complicate things. The same paper might appear at `arxiv.org/abs/2005.14165` before it gets a formal DOI, then later at `doi.org/10.48550/arxiv.2005.14165` once it's registered. These are different identifiers for arguably the same work. ScholarWatch could maintain a resolution map; it's not trivial.

---

## Multiple labelers in this space

The book case has two labelers with different *purposes* (personal reading vs. the commons). The paper case suggests labelers with different *perspectives*:

- **ScholarWatch** — general academic paper detection, citation-focused
- A hypothetical **PubMed labeler** — only labels biomedical papers, links to PubMed records, surfaces MeSH terms
- A **Retraction Watch labeler** — flags papers that have been retracted or have open expressions of concern
- A **Open Access labeler** — detects papers behind paywalls and surfaces free legal alternatives (OA Button, Unpaywall)

The Retraction Watch case is particularly compelling because it's genuinely protective information that doesn't fit the moderation label model. A retracted paper isn't *harmful content* in the moderation sense, but it's something a reader deserves to know about. A label with an action URL to the retraction notice is exactly the right mechanism.

---

## The detail view

Currently shows:

- Paper title, authors, venue, year
- Abstract
- DOI chip (same visual pattern as the ISBN chip in the book view)
- Four action buttons: Read Paper, Copy Citation, Save to Library (Zotero/Mendeley), Related Papers

What's not there yet that would be worth adding:

- **Open access status** — is this paper freely readable, or behind a paywall?
- **Citation count** — gives a sense of the paper's influence
- **Citation export** — actually generating BibTeX or APA, not just labeling the button
- **A "cited by" feed** — posts on Bluesky that cite this same paper, surfaced through label aggregation

That last one is interesting: because ScholarWatch labels all posts mentioning a given DOI, it implicitly has a list of every post in the network that cited a paper. A detail view could show that list — a social annotation layer on top of the academic literature. That's something that doesn't exist anywhere else in the current academic publishing ecosystem.

---

## Open questions

- **Preprints vs. published versions:** Should a label applied to a preprint DOI automatically extend to the published version when it's registered? The labeler would need to maintain a resolution graph.
- **Author disambiguation:** Papers often have many authors. How should the label detail represent authorship — full list, first+last, "et al."? Different use cases have different conventions.
- **Conference vs. journal:** The venue field currently just shows a string. A more structured representation might distinguish conference papers from journal articles, enable filtering by venue type.
- **Labeler authority:** For a retraction or correction flag, the labeler's identity matters a lot. How does a client communicate "this retraction flag comes from Retraction Watch, an authoritative source" vs. "this flag was applied by an anonymous bot"? The DID in the label identifies the source, but clients need UI conventions for representing trust levels.
