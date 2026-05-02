"""Mock data: posts, labelers, and book/paper metadata."""

import re
from datetime import datetime, timedelta

# ---------------------------------------------------------------------------
# Labeler definitions
# ---------------------------------------------------------------------------

LABELERS = {
    "bookwatcher": {
        "id": "did:plc:bookwatcher0000000000001",
        "name": "BookWatcher",
        "short": "BW",
        "emoji": "📚",
        "description": "Identifies books in posts and surfaces reading list & library integrations.",
        "color": "#6366f1",       # indigo
        "bg": "#eef2ff",
        "label_value": "bookwatcher",
        "action_url_template": "http://localhost:5000/labeler/bookwatcher/post/{post_id}",
    },
    "openlibrary": {
        "id": "did:plc:openlibrary000000000001",
        "name": "OpenLibrary",
        "short": "OL",
        "emoji": "📖",
        "description": "Links posts to Open Library records.",
        "color": "#0ea5e9",       # sky blue
        "bg": "#e0f2fe",
        "label_value": "openlibrary",
        "action_url_template": "http://localhost:5000/labeler/openlibrary/post/{post_id}",
    },
    "scholarwatch": {
        "id": "did:plc:scholarwatch000000000001",
        "name": "ScholarWatch",
        "short": "SW",
        "emoji": "🔬",
        "description": "Detects DOIs and surfaces academic paper metadata.",
        "color": "#10b981",       # emerald
        "bg": "#d1fae5",
        "label_value": "scholarwatch",
        "action_url_template": "http://localhost:5000/labeler/scholarwatch/post/{post_id}",
    },
}

# ---------------------------------------------------------------------------
# Book metadata store  (keyed by ISBN-13 or ISBN-10, normalised)
# ---------------------------------------------------------------------------

BOOKS = {
    "9780143127741": {
        "isbn": "9780143127741",
        "title": "The Fifth Season",
        "author": "N.K. Jemisin",
        "year": 2015,
        "publisher": "Orbit",
        "cover_color": "#7c3aed",
        "cover_text_color": "#ffffff",
        "description": "The first book of the Broken Earth trilogy — a stunning world of catastrophic seasons, oppressed people, and geological power.",
        "pages": 468,
        "genres": ["Science Fiction", "Fantasy", "Dystopian"],
        "openlibrary_id": "OL26461540M",
        "goodreads_id": "19161852",
        "avg_rating": 4.3,
        "ratings_count": 189452,
        "readers_count": 47823,
        "lists_count": 312,
        "review_snippets": [
            {"text": "The second-person narration shouldn't work but it absolutely does. One of the most original fantasy novels I've ever read.", "rating": 5},
            {"text": "Dense and rewarding. Jemisin rewards careful readers with layers of meaning that only become clear later.", "rating": 4},
        ],
    },
    "9780525559474": {
        "isbn": "9780525559474",
        "title": "The Ministry for the Future",
        "author": "Kim Stanley Robinson",
        "year": 2020,
        "publisher": "Orbit",
        "cover_color": "#065f46",
        "cover_text_color": "#ffffff",
        "description": "A near-future novel about the desperate attempts to prevent a climate catastrophe, told through a kaleidoscope of characters.",
        "pages": 576,
        "genres": ["Science Fiction", "Climate Fiction", "Political Fiction"],
        "openlibrary_id": "OL29555375M",
        "goodreads_id": "50998056",
        "avg_rating": 3.9,
        "ratings_count": 54231,
        "readers_count": 31204,
        "lists_count": 187,
        "review_snippets": [
            {"text": "Essential reading for anyone who cares about climate. Not a fun read, but an important one.", "rating": 4},
            {"text": "The mosaic structure is fascinating — almost like a documentary novel. Some chapters hit you like a freight train.", "rating": 5},
        ],
    },
    "9780374533557": {
        "isbn": "9780374533557",
        "title": "Thinking, Fast and Slow",
        "author": "Daniel Kahneman",
        "year": 2011,
        "publisher": "Farrar, Straus and Giroux",
        "cover_color": "#1e3a5f",
        "cover_text_color": "#ffffff",
        "description": "A groundbreaking exploration of the two systems that drive the way we think — System 1 (fast, intuitive) and System 2 (slow, deliberate).",
        "pages": 499,
        "genres": ["Psychology", "Behavioral Economics", "Non-fiction"],
        "openlibrary_id": "OL25671095M",
        "goodreads_id": "11468377",
        "avg_rating": 4.2,
        "ratings_count": 412893,
        "readers_count": 118547,
        "lists_count": 891,
        "review_snippets": [
            {"text": "Kahneman writes about cognitive biases so clearly that you immediately recognize them in yourself. A bit long but worth it.", "rating": 4},
            {"text": "Changed how I think about thinking. The Linda problem alone is worth the price of admission.", "rating": 5},
        ],
    },
    "9780062316097": {
        "isbn": "9780062316097",
        "title": "Sapiens: A Brief History of Humankind",
        "author": "Yuval Noah Harari",
        "year": 2015,
        "publisher": "Harper",
        "cover_color": "#92400e",
        "cover_text_color": "#ffffff",
        "description": "A sweeping narrative of human history from the Stone Age to the present.",
        "pages": 464,
        "genres": ["History", "Anthropology", "Non-fiction"],
        "openlibrary_id": "OL26207120M",
        "goodreads_id": "23692271",
        "avg_rating": 4.1,
        "ratings_count": 534021,
        "readers_count": 203441,
        "lists_count": 1204,
        "review_snippets": [
            {"text": "Sweeping and provocative. Harari simplifies sometimes, but it's in service of seeing the big picture.", "rating": 4},
            {"text": "The chapter on money and collective myths changed my entire framework. Finished it in a weekend.", "rating": 5},
        ],
    },
    "9781250301697": {
        "isbn": "9781250301697",
        "title": "The Calculating Stars",
        "author": "Mary Robinette Kowal",
        "year": 2018,
        "publisher": "Tor Books",
        "cover_color": "#1a1a2e",
        "cover_text_color": "#e0e0ff",
        "description": "After a meteorite destroys Washington DC in 1952, mathematician Elma York fights to join the space program as Earth becomes uninhabitable.",
        "pages": 384,
        "genres": ["Science Fiction", "Alternate History", "Space Opera"],
        "openlibrary_id": "OL27165450M",
        "goodreads_id": "33080122",
        "avg_rating": 4.4,
        "ratings_count": 41203,
        "readers_count": 22918,
        "lists_count": 145,
        "review_snippets": [
            {"text": "Kowal nails the period detail while making it feel completely relevant to today. Elma is such a great protagonist.", "rating": 5},
            {"text": "The tension between the space race urgency and the sexism Elma faces makes for a genuinely gripping read.", "rating": 4},
        ],
    },
}

# ---------------------------------------------------------------------------
# Paper metadata store  (keyed by normalised DOI)
# ---------------------------------------------------------------------------

PAPERS = {
    "10.1145/3442188.3445922": {
        "doi": "10.1145/3442188.3445922",
        "title": "On the Dangers of Stochastic Parrots: Can Language Models Be Too Big?",
        "authors": ["Emily M. Bender", "Timnit Gebru", "Angelina McMillan-Major", "Shmargaret Shmitchell"],
        "year": 2021,
        "venue": "FAccT '21",
        "abstract": "The authors question whether the trend toward ever larger language models in NLP is actually beneficial, examining environmental costs, financial cost, data issues, and risk of harm.",
        "url": "https://dl.acm.org/doi/10.1145/3442188.3445922",
        "citation_count": 2847,
        "influential_citations": 341,
        "open_access": True,
        "tldr": "Questions whether scaling LLMs without regard for cost, data quality, and societal risk produces benefits that outweigh the harms.",
        "related": [
            {"title": "Model Cards for Model Reporting", "authors": "Mitchell et al.", "year": 2019, "citations": 1823},
            {"title": "Datasheets for Datasets", "authors": "Gebru et al.", "year": 2021, "citations": 1456},
            {"title": "Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification", "authors": "Buolamwini & Gebru", "year": 2018, "citations": 2103},
        ],
    },
    "10.48550/arxiv.2005.14165": {
        "doi": "10.48550/arxiv.2005.14165",
        "title": "Language Models are Few-Shot Learners",
        "authors": ["Tom Brown", "Benjamin Mann", "Nick Ryder", "et al."],
        "year": 2020,
        "venue": "NeurIPS 2020",
        "abstract": "GPT-3 demonstrates that scaling up language models greatly improves task-agnostic, few-shot performance, sometimes even reaching competitiveness with prior state-of-the-art fine-tuning approaches.",
        "url": "https://arxiv.org/abs/2005.14165",
        "citation_count": 21483,
        "influential_citations": 4812,
        "open_access": True,
        "tldr": "Shows that 175B-parameter language models can perform few-shot learning across a wide range of NLP tasks without gradient updates.",
        "related": [
            {"title": "Attention Is All You Need", "authors": "Vaswani et al.", "year": 2017, "citations": 47291},
            {"title": "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding", "authors": "Devlin et al.", "year": 2019, "citations": 31847},
            {"title": "Scaling Laws for Neural Language Models", "authors": "Kaplan et al.", "year": 2020, "citations": 4203},
        ],
    },
}

# ---------------------------------------------------------------------------
# Fake posts
# ---------------------------------------------------------------------------

def _ago(days=0, hours=0, minutes=0):
    dt = datetime.utcnow() - timedelta(days=days, hours=hours, minutes=minutes)
    return dt.strftime("%Y-%m-%dT%H:%M:%SZ")

RAW_POSTS = [
    {
        "id": "3kvzgb2qfzk2e",
        "author": {
            "did": "did:plc:alice0000000000000001",
            "handle": "alice.bsky.social",
            "display_name": "Alice Chen",
            "avatar_seed": "alice",
        },
        "text": "Finally started The Fifth Season by N.K. Jemisin (ISBN 9780143127741) — three chapters in and already completely hooked. The second-person narration is such a bold choice.",
        "created_at": _ago(hours=2),
        "like_count": 47,
        "reply_count": 8,
        "repost_count": 12,
    },
    {
        "id": "3kvzgb2qfzk2f",
        "author": {
            "did": "did:plc:bob00000000000000001",
            "handle": "bob.bsky.social",
            "display_name": "Bob Okafor",
            "avatar_seed": "bob",
        },
        "text": "Just saw that Kim Stanley Robinson's The Ministry for the Future (9780525559474) is on sale. If you haven't read it yet — please do. It changed how I think about climate policy.",
        "created_at": _ago(hours=5),
        "like_count": 132,
        "reply_count": 21,
        "repost_count": 38,
    },
    {
        "id": "3kvzgb2qfzk2g",
        "author": {
            "did": "did:plc:carol000000000000001",
            "handle": "carol.dev",
            "display_name": "Carol Matsumoto",
            "avatar_seed": "carol",
        },
        "text": "Hot take: most \"data-driven decision making\" would be better described as \"vibes with spreadsheets\". Reading Kahneman's Thinking Fast and Slow (ISBN: 9780374533557) for the third time because apparently I never learn.",
        "created_at": _ago(hours=9),
        "like_count": 289,
        "reply_count": 44,
        "repost_count": 67,
    },
    {
        "id": "3kvzgb2qfzk2h",
        "author": {
            "did": "did:plc:dave0000000000000001",
            "handle": "dave.science.bsky.social",
            "display_name": "Dave Krishnamurthy",
            "avatar_seed": "dave",
        },
        "text": "This paper keeps coming up in every LLM discussion: \"On the Dangers of Stochastic Parrots\" — doi:10.1145/3442188.3445922. Essential reading if you're thinking about responsible AI.",
        "created_at": _ago(hours=11),
        "like_count": 94,
        "reply_count": 17,
        "repost_count": 28,
    },
    {
        "id": "3kvzgb2qfzk2i",
        "author": {
            "did": "did:plc:eve00000000000000001",
            "handle": "eve.reads",
            "display_name": "Eve Okonkwo",
            "avatar_seed": "eve",
        },
        "text": "Finished Sapiens (ISBN 9780062316097) last night. Harari's got a gift for making you feel the full weight of time. Some parts are oversimplified but as a big-picture tour of human history it's unmatched.",
        "created_at": _ago(days=1, hours=1),
        "like_count": 61,
        "reply_count": 9,
        "repost_count": 14,
    },
    {
        "id": "3kvzgb2qfzk2j",
        "author": {
            "did": "did:plc:frank000000000000001",
            "handle": "frank.bsky.social",
            "display_name": "Frank Delacroix",
            "avatar_seed": "frank",
        },
        "text": "Does anyone else read Bluesky on their phone while also having a book open? Currently alternating between doom-scrolling and The Calculating Stars (9781250301697). The 1950s space race but make it feminist. Brilliant.",
        "created_at": _ago(days=1, hours=3),
        "like_count": 78,
        "reply_count": 19,
        "repost_count": 22,
    },
    {
        "id": "3kvzgb2qfzk2k",
        "author": {
            "did": "did:plc:grace000000000000001",
            "handle": "grace.ai.bsky.social",
            "display_name": "Grace Lindqvist",
            "avatar_seed": "grace",
        },
        "text": "GPT-3 paper (doi: 10.48550/arxiv.2005.14165) is now 5 years old and the field has moved so fast that it reads almost like history. Wild.",
        "created_at": _ago(days=1, hours=6),
        "like_count": 156,
        "reply_count": 31,
        "repost_count": 45,
    },
    {
        "id": "3kvzgb2qfzk2l",
        "author": {
            "did": "did:plc:heidi000000000000001",
            "handle": "heidi.bsky.social",
            "display_name": "Heidi Nakamura",
            "avatar_seed": "heidi",
        },
        "text": "Good morning. Coffee. No books today, just vibes. Sometimes you need to let your brain breathe.",
        "created_at": _ago(days=1, hours=8),
        "like_count": 203,
        "reply_count": 28,
        "repost_count": 51,
    },
    {
        "id": "3kvzgb2qfzk2m",
        "author": {
            "did": "did:plc:ivan0000000000000001",
            "handle": "ivan.reads.bsky.social",
            "display_name": "Ivan Petrov",
            "avatar_seed": "ivan",
        },
        "text": "The way N.K. Jemisin builds a world that feels alien and lived-in at the same time (The Fifth Season, ISBN 9780143127741) is something I study as a writer. Every chapter teaches me something.",
        "created_at": _ago(days=2, hours=2),
        "like_count": 88,
        "reply_count": 14,
        "repost_count": 19,
    },
    {
        "id": "3kvzgb2qfzk2n",
        "author": {
            "did": "did:plc:julia000000000000001",
            "handle": "julia.dev",
            "display_name": "Julia Ramirez",
            "avatar_seed": "julia",
        },
        "text": "Thread on why I think the AT Protocol label spec is underrated for non-moderation use cases. Labels are just pointers. What you do with them is up to the client. 1/",
        "created_at": _ago(days=2, hours=4),
        "like_count": 341,
        "reply_count": 57,
        "repost_count": 89,
    },
]

# ---------------------------------------------------------------------------
# ISBN / DOI extraction
# ---------------------------------------------------------------------------

ISBN_RE = re.compile(r'\b(?:ISBN[:\s-]*)?(97[89]\d{10}|\d{9}[\dX])\b', re.IGNORECASE)
DOI_RE  = re.compile(r'\b(?:doi:\s*|https?://doi\.org/)(10\.\S+)', re.IGNORECASE)


def _normalise_isbn(raw: str) -> str:
    return re.sub(r'[\s\-]', '', raw).upper()


def extract_isbns(text: str) -> list[str]:
    return [_normalise_isbn(m) for m in ISBN_RE.findall(text)]


def extract_dois(text: str) -> list[str]:
    return [m.rstrip('.,;)') for m in DOI_RE.findall(text)]


# ---------------------------------------------------------------------------
# Labelling engine
# ---------------------------------------------------------------------------

def apply_labels(posts: list[dict]) -> list[dict]:
    """Return posts with a `labels` key added to each."""
    labelled = []
    for post in posts:
        text = post["text"]
        labels = []

        isbns = extract_isbns(text)
        for isbn in isbns:
            book = BOOKS.get(isbn)
            if book:
                post_id = post["id"]
                labels.append({
                    "labeler": "bookwatcher",
                    "val": "bookwatcher",
                    "isbn": isbn,
                    "action_url": f"/labeler/bookwatcher/post/{post_id}",
                })
                labels.append({
                    "labeler": "openlibrary",
                    "val": "openlibrary",
                    "isbn": isbn,
                    "action_url": f"/labeler/openlibrary/post/{post_id}",
                })

        dois = extract_dois(text)
        for doi in dois:
            paper = PAPERS.get(doi)
            if paper:
                post_id = post["id"]
                labels.append({
                    "labeler": "scholarwatch",
                    "val": "scholarwatch",
                    "doi": doi,
                    "action_url": f"/labeler/scholarwatch/post/{post_id}",
                })

        labelled.append({**post, "labels": labels})
    return labelled


def get_feed() -> list[dict]:
    return apply_labels(RAW_POSTS)


def get_post(post_id: str) -> dict | None:
    posts = apply_labels(RAW_POSTS)
    return next((p for p in posts if p["id"] == post_id), None)


def get_label_detail(labeler_id: str, post_id: str) -> dict | None:
    """Return enriched detail dict for a labeler+post combination."""
    post = get_post(post_id)
    if not post:
        return None
    labeler = LABELERS.get(labeler_id)
    if not labeler:
        return None

    label = next((l for l in post["labels"] if l["labeler"] == labeler_id), None)
    if not label:
        return None

    detail = {"post": post, "labeler": labeler, "label": label}

    if labeler_id in ("bookwatcher", "openlibrary"):
        book = BOOKS.get(label.get("isbn", ""))
        detail["book"] = book

    if labeler_id == "scholarwatch":
        paper = PAPERS.get(label.get("doi", ""))
        detail["paper"] = paper

    return detail
