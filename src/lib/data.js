// ---------------------------------------------------------------------------
// Labeler definitions
// ---------------------------------------------------------------------------

export const LABELERS = {
  bookwatcher: {
    id: "did:plc:bookwatcher0000000000001",
    name: "BookWatcher",
    short: "BW",
    emoji: "📚",
    description: "Identifies books in posts and surfaces reading list & library integrations. Also verifies authors.",
    color: "#6366f1",
    bg: "#eef2ff",
    label_values: ["bookwatcher-book", "bookwatcher-author"],
    action_url_template: "/labeler/bookwatcher?post={at_uri}&label={label_val}",
  },
  openlibrary: {
    id: "did:plc:openlibrary000000000001",
    name: "OpenLibrary",
    short: "OL",
    emoji: "📖",
    description: "Links posts to Open Library records.",
    color: "#0ea5e9",
    bg: "#e0f2fe",
    label_values: ["openlibrary"],
    action_url_template: "/labeler/openlibrary?post={at_uri}&label=openlibrary",
  },
  scholarwatch: {
    id: "did:plc:scholarwatch000000000001",
    name: "ScholarWatch",
    short: "SW",
    emoji: "🔬",
    description: "Detects DOIs and surfaces academic paper metadata.",
    color: "#10b981",
    bg: "#d1fae5",
    label_values: ["scholarwatch"],
    action_url_template: "/labeler/scholarwatch?post={at_uri}&label=scholarwatch",
  },
};

// ---------------------------------------------------------------------------
// Book metadata store (keyed by ISBN-13)
// ---------------------------------------------------------------------------

export const BOOKS = {
  "9780143127741": {
    isbn: "9780143127741",
    title: "The Fifth Season",
    author: "N.K. Jemisin",
    year: 2015,
    publisher: "Orbit",
    cover_color: "#7c3aed",
    cover_text_color: "#ffffff",
    description: "The first book of the Broken Earth trilogy — a stunning world of catastrophic seasons, oppressed people, and geological power.",
    pages: 468,
    genres: ["Science Fiction", "Fantasy", "Dystopian"],
    openlibrary_id: "OL26461540M",
    goodreads_id: "19161852",
    avg_rating: 4.3,
    ratings_count: 189452,
    readers_count: 47823,
    lists_count: 312,
    review_snippets: [
      { text: "The second-person narration shouldn't work but it absolutely does. One of the most original fantasy novels I've ever read.", rating: 5 },
      { text: "Dense and rewarding. Jemisin rewards careful readers with layers of meaning that only become clear later.", rating: 4 },
    ],
  },
  "9780525559474": {
    isbn: "9780525559474",
    title: "The Ministry for the Future",
    author: "Kim Stanley Robinson",
    year: 2020,
    publisher: "Orbit",
    cover_color: "#065f46",
    cover_text_color: "#ffffff",
    description: "A near-future novel about the desperate attempts to prevent a climate catastrophe, told through a kaleidoscope of characters.",
    pages: 576,
    genres: ["Science Fiction", "Climate Fiction", "Political Fiction"],
    openlibrary_id: "OL29555375M",
    goodreads_id: "50998056",
    avg_rating: 3.9,
    ratings_count: 54231,
    readers_count: 31204,
    lists_count: 187,
    review_snippets: [
      { text: "Essential reading for anyone who cares about climate. Not a fun read, but an important one.", rating: 4 },
      { text: "The mosaic structure is fascinating — almost like a documentary novel. Some chapters hit you like a freight train.", rating: 5 },
    ],
  },
  "9780374533557": {
    isbn: "9780374533557",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    year: 2011,
    publisher: "Farrar, Straus and Giroux",
    cover_color: "#1e3a5f",
    cover_text_color: "#ffffff",
    description: "A groundbreaking exploration of the two systems that drive the way we think — System 1 (fast, intuitive) and System 2 (slow, deliberate).",
    pages: 499,
    genres: ["Psychology", "Behavioral Economics", "Non-fiction"],
    openlibrary_id: "OL25671095M",
    goodreads_id: "11468377",
    avg_rating: 4.2,
    ratings_count: 412893,
    readers_count: 118547,
    lists_count: 891,
    review_snippets: [
      { text: "Kahneman writes about cognitive biases so clearly that you immediately recognize them in yourself. A bit long but worth it.", rating: 4 },
      { text: "Changed how I think about thinking. The Linda problem alone is worth the price of admission.", rating: 5 },
    ],
  },
  "9780062316097": {
    isbn: "9780062316097",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    year: 2015,
    publisher: "Harper",
    cover_color: "#92400e",
    cover_text_color: "#ffffff",
    description: "A sweeping narrative of human history from the Stone Age to the present.",
    pages: 464,
    genres: ["History", "Anthropology", "Non-fiction"],
    openlibrary_id: "OL26207120M",
    goodreads_id: "23692271",
    avg_rating: 4.1,
    ratings_count: 534021,
    readers_count: 203441,
    lists_count: 1204,
    review_snippets: [
      { text: "Sweeping and provocative. Harari simplifies sometimes, but it's in service of seeing the big picture.", rating: 4 },
      { text: "The chapter on money and collective myths changed my entire framework. Finished it in a weekend.", rating: 5 },
    ],
  },
  "9781250301697": {
    isbn: "9781250301697",
    title: "The Calculating Stars",
    author: "Mary Robinette Kowal",
    author_did: "did:plc:maryrobinette0000001",
    year: 2018,
    publisher: "Tor Books",
    cover_color: "#1a1a2e",
    cover_text_color: "#e0e0ff",
    description: "After a meteorite destroys Washington DC in 1952, mathematician Elma York fights to join the space program as Earth becomes uninhabitable.",
    pages: 384,
    genres: ["Science Fiction", "Alternate History", "Space Opera"],
    openlibrary_id: "OL27165450M",
    goodreads_id: "33080122",
    avg_rating: 4.4,
    ratings_count: 41203,
    readers_count: 22918,
    lists_count: 145,
    review_snippets: [
      { text: "Kowal nails the period detail while making it feel completely relevant to today. Elma is such a great protagonist.", rating: 5 },
      { text: "The tension between the space race urgency and the sexism Elma faces makes for a genuinely gripping read.", rating: 4 },
    ],
  },
};

// ---------------------------------------------------------------------------
// Paper metadata store (keyed by DOI)
// ---------------------------------------------------------------------------

export const PAPERS = {
  "10.1145/3442188.3445922": {
    doi: "10.1145/3442188.3445922",
    title: "On the Dangers of Stochastic Parrots: Can Language Models Be Too Big?",
    authors: ["Emily M. Bender", "Timnit Gebru", "Angelina McMillan-Major", "Shmargaret Shmitchell"],
    year: 2021,
    venue: "FAccT '21",
    abstract: "The authors question whether the trend toward ever larger language models in NLP is actually beneficial, examining environmental costs, financial cost, data issues, and risk of harm.",
    url: "https://dl.acm.org/doi/10.1145/3442188.3445922",
    citation_count: 2847,
    influential_citations: 341,
    open_access: true,
    tldr: "Questions whether scaling LLMs without regard for cost, data quality, and societal risk produces benefits that outweigh the harms.",
    related: [
      { title: "Model Cards for Model Reporting", authors: "Mitchell et al.", year: 2019, citations: 1823 },
      { title: "Datasheets for Datasets", authors: "Gebru et al.", year: 2021, citations: 1456 },
      { title: "Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification", authors: "Buolamwini & Gebru", year: 2018, citations: 2103 },
    ],
  },
  "10.48550/arxiv.2005.14165": {
    doi: "10.48550/arxiv.2005.14165",
    title: "Language Models are Few-Shot Learners",
    authors: ["Tom Brown", "Benjamin Mann", "Nick Ryder", "et al."],
    year: 2020,
    venue: "NeurIPS 2020",
    abstract: "GPT-3 demonstrates that scaling up language models greatly improves task-agnostic, few-shot performance, sometimes even reaching competitiveness with prior state-of-the-art fine-tuning approaches.",
    url: "https://arxiv.org/abs/2005.14165",
    citation_count: 21483,
    influential_citations: 4812,
    open_access: true,
    tldr: "Shows that 175B-parameter language models can perform few-shot learning across a wide range of NLP tasks without gradient updates.",
    related: [
      { title: "Attention Is All You Need", authors: "Vaswani et al.", year: 2017, citations: 47291 },
      { title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding", authors: "Devlin et al.", year: 2019, citations: 31847 },
      { title: "Scaling Laws for Neural Language Models", authors: "Kaplan et al.", year: 2020, citations: 4203 },
    ],
  },
};

// ---------------------------------------------------------------------------
// Author profiles (keyed by DID) — for bookwatcher-author label
// ---------------------------------------------------------------------------

export const AUTHOR_PROFILES = {
  "did:plc:maryrobinette0000001": {
    did: "did:plc:maryrobinette0000001",
    handle: "maryrobinette.bsky.social",
    display_name: "Mary Robinette Kowal",
    avatar_seed: "maryrobinette",
    bio: "Hugo & Nebula award-winning author. SFWA President Emeritus. Puppeteer. The Lady Astronaut series. She/her.",
    books: ["9781250301697"],
    follower_count: 18420,
    following_count: 892,
    post_count: 3104,
  },
};

// ---------------------------------------------------------------------------
// Timestamp helper
// ---------------------------------------------------------------------------

function ago({ days = 0, hours = 0, minutes = 0 } = {}) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(d.getHours() - hours);
  d.setMinutes(d.getMinutes() - minutes);
  return d.toISOString().replace(/\.\d+Z$/, 'Z');
}

// ---------------------------------------------------------------------------
// Raw posts
// ---------------------------------------------------------------------------

const RAW_POSTS = [
  {
    id: "3kvzgb2qfzk2e",
    author: {
      did: "did:plc:alice0000000000000001",
      handle: "alice.bsky.social",
      display_name: "Alice Chen",
      avatar_seed: "alice",
    },
    text: "Finally started The Fifth Season by N.K. Jemisin — three chapters in and already completely hooked. The second-person narration is such a bold choice.",
    isbn: "9780143127741",
    created_at: ago({ hours: 2 }),
    like_count: 47,
    reply_count: 8,
    repost_count: 12,
  },
  {
    id: "3kvzgb2qfzk2f",
    author: {
      did: "did:plc:bob00000000000000001",
      handle: "bob.bsky.social",
      display_name: "Bob Okafor",
      avatar_seed: "bob",
    },
    text: "The Ministry for the Future is on sale right now. If you haven't read Kim Stanley Robinson's climate novel yet — please do. It changed how I think about what's actually possible.",
    isbn: "9780525559474",
    created_at: ago({ hours: 5 }),
    like_count: 132,
    reply_count: 21,
    repost_count: 38,
  },
  {
    id: "3kvzgb2qfzk2g",
    author: {
      did: "did:plc:carol000000000000001",
      handle: "carol.dev",
      display_name: "Carol Matsumoto",
      avatar_seed: "carol",
    },
    text: "Hot take: most \"data-driven decision making\" would be better described as \"vibes with spreadsheets\". Re-reading Thinking, Fast and Slow for the third time because apparently I never learn.",
    isbn: "9780374533557",
    created_at: ago({ hours: 9 }),
    like_count: 289,
    reply_count: 44,
    repost_count: 67,
  },
  {
    id: "3kvzgb2qfzk2h",
    author: {
      did: "did:plc:dave0000000000000001",
      handle: "dave.science.bsky.social",
      display_name: "Dave Krishnamurthy",
      avatar_seed: "dave",
    },
    text: "\"On the Dangers of Stochastic Parrots\" keeps coming up in every LLM discussion for a reason. Essential reading if you're thinking about responsible AI development.",
    doi: "10.1145/3442188.3445922",
    created_at: ago({ hours: 11 }),
    like_count: 94,
    reply_count: 17,
    repost_count: 28,
  },
  {
    id: "3kvzgb2qfzk2i",
    author: {
      did: "did:plc:eve00000000000000001",
      handle: "eve.reads",
      display_name: "Eve Okonkwo",
      avatar_seed: "eve",
    },
    text: "Finished Sapiens last night. Harari's got a gift for making you feel the full weight of time. Some parts are oversimplified but as a big-picture tour of human history it's unmatched.",
    isbn: "9780062316097",
    created_at: ago({ days: 1, hours: 1 }),
    like_count: 61,
    reply_count: 9,
    repost_count: 14,
  },
  {
    id: "3kvzgb2qfzk2j",
    author: {
      did: "did:plc:maryrobinette0000001",
      handle: "maryrobinette.bsky.social",
      display_name: "Mary Robinette Kowal",
      avatar_seed: "maryrobinette",
    },
    text: "Five years since The Calculating Stars came out and readers are still finding it. The Lady Astronaut series started as a short story — I never expected it to become four novels. If you're just discovering it: ISBN 9781250301697",
    isbn: "9781250301697",
    created_at: ago({ days: 1, hours: 3 }),
    like_count: 312,
    reply_count: 47,
    repost_count: 89,
  },
  {
    id: "3kvzgb2qfzk2k",
    author: {
      did: "did:plc:grace000000000000001",
      handle: "grace.ai.bsky.social",
      display_name: "Grace Lindqvist",
      avatar_seed: "grace",
    },
    text: "The GPT-3 paper is now 5 years old and the field has moved so fast that it reads almost like history. Wild how much ground has been covered.",
    doi: "10.48550/arxiv.2005.14165",
    created_at: ago({ days: 1, hours: 6 }),
    like_count: 156,
    reply_count: 31,
    repost_count: 45,
  },
  {
    id: "3kvzgb2qfzk2l",
    author: {
      did: "did:plc:heidi000000000000001",
      handle: "heidi.bsky.social",
      display_name: "Heidi Nakamura",
      avatar_seed: "heidi",
    },
    text: "Good morning. Coffee. No books today, just vibes. Sometimes you need to let your brain breathe.",
    created_at: ago({ days: 1, hours: 8 }),
    like_count: 203,
    reply_count: 28,
    repost_count: 51,
  },
  {
    id: "3kvzgb2qfzk2m",
    author: {
      did: "did:plc:ivan0000000000000001",
      handle: "ivan.reads.bsky.social",
      display_name: "Ivan Petrov",
      avatar_seed: "ivan",
    },
    text: "The way N.K. Jemisin builds a world that feels alien and lived-in at the same time in The Fifth Season is something I study as a writer. Every chapter teaches me something.",
    isbn: "9780143127741",
    created_at: ago({ days: 2, hours: 2 }),
    like_count: 88,
    reply_count: 14,
    repost_count: 19,
  },
  {
    id: "3kvzgb2qfzk2n",
    author: {
      did: "did:plc:julia000000000000001",
      handle: "julia.dev",
      display_name: "Julia Ramirez",
      avatar_seed: "julia",
    },
    text: "Thread on why I think the AT Protocol label spec is underrated for non-moderation use cases. Labels are just pointers. What you do with them is up to the client. 1/",
    created_at: ago({ days: 2, hours: 4 }),
    like_count: 341,
    reply_count: 57,
    repost_count: 89,
  },
];

// ---------------------------------------------------------------------------
// ISBN / DOI extraction
// ---------------------------------------------------------------------------

const ISBN_RE = /\b(?:ISBN[:\s-]*)?(97[89]\d{10}|\d{9}[\dX])\b/gi;
const DOI_RE = /\b(?:doi:\s*|https?:\/\/doi\.org\/)(10\.\S+)/gi;

function normaliseIsbn(raw) {
  return raw.replace(/[\s\-]/g, '').toUpperCase();
}

export function extractIsbns(text) {
  return [...text.matchAll(ISBN_RE)].map(m => normaliseIsbn(m[1]));
}

export function extractDois(text) {
  return [...text.matchAll(DOI_RE)].map(m => m[1].replace(/[.,;)]+$/, ''));
}

// ---------------------------------------------------------------------------
// AT URI helpers
// ---------------------------------------------------------------------------

function postAtUri(authorDid, postId) {
  return `at://${authorDid}/app.bsky.feed.post/${postId}`;
}

function profileAtUri(did) {
  return `at://${did}`;
}

// ---------------------------------------------------------------------------
// Labelling engine
// ---------------------------------------------------------------------------

function applyLabels(posts) {
  return posts.map(post => {
    const labels = [];
    const postUri = postAtUri(post.author.did, post.id);

    const isbns = new Set([
      ...(post.isbn ? [post.isbn] : []),
      ...extractIsbns(post.text),
    ]);
    for (const isbn of isbns) {
      const book = BOOKS[isbn];
      if (book) {
        labels.push({
          labeler: "bookwatcher",
          val: "bookwatcher-book",
          isbn,
          action_url: `/labeler/bookwatcher?post=${encodeURIComponent(postUri)}&label=bookwatcher-book`,
        });
        labels.push({
          labeler: "openlibrary",
          val: "openlibrary",
          isbn,
          action_url: `/labeler/openlibrary?post=${encodeURIComponent(postUri)}&label=openlibrary`,
        });
      }
    }

    const dois = new Set([
      ...(post.doi ? [post.doi] : []),
      ...extractDois(post.text),
    ]);
    for (const doi of dois) {
      const paper = PAPERS[doi];
      if (paper) {
        labels.push({
          labeler: "scholarwatch",
          val: "scholarwatch",
          doi,
          action_url: `/labeler/scholarwatch?post=${encodeURIComponent(postUri)}&label=scholarwatch`,
        });
      }
    }

    // Apply author label if this post's author is a BookWatcher-verified author
    if (AUTHOR_PROFILES[post.author.did]) {
      labels.push({
        labeler: "bookwatcher",
        val: "bookwatcher-author",
        action_url: `/labeler/bookwatcher?profile=${encodeURIComponent(profileAtUri(post.author.did))}&label=bookwatcher-author`,
      });
    }

    return { ...post, labels };
  });
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function getFeed() {
  return applyLabels(RAW_POSTS);
}

export function getPost(postId) {
  return getFeed().find(p => p.id === postId) ?? null;
}

/** Returns the BookWatcher action URL for the first post that has a bookwatcher-book label for the given ISBN. */
export function getBookActionUrl(isbn) {
  const posts = getFeed();
  for (const post of posts) {
    const label = post.labels.find(l => l.labeler === 'bookwatcher' && l.val === 'bookwatcher-book' && l.isbn === isbn);
    if (label) return label.action_url;
  }
  return null;
}

/** Look up enriched label detail by labeler, post AT URI, and label value. */
export function getLabelDetail(labelerId, atUri, labelVal) {
  const match = atUri.match(/^at:\/\/(did:[^/]+)\/app\.bsky\.feed\.post\/(.+)$/);
  if (!match) return null;
  const [, , rkey] = match;

  const post = getPost(rkey);
  if (!post) return null;

  const labeler = LABELERS[labelerId];
  if (!labeler) return null;

  const label = post.labels.find(l => l.labeler === labelerId && l.val === labelVal);
  if (!label) return null;

  const detail = { post, labeler, label, labeler_id: labelerId };

  if (labelVal === "bookwatcher-book" || labelerId === "openlibrary") {
    detail.book = BOOKS[label.isbn] ?? null;
    if (detail.book?.author_did) {
      detail.authorProfile = AUTHOR_PROFILES[detail.book.author_did] ?? null;
    }
  }
  if (labelerId === "scholarwatch") {
    detail.paper = PAPERS[label.doi] ?? null;
  }

  return detail;
}

/** Look up enriched author profile detail by labeler, profile AT URI, and label value. */
export function getProfileLabelDetail(labelerId, atUri, labelVal) {
  const match = atUri.match(/^at:\/\/(did:.+)$/);
  if (!match) return null;
  const [, did] = match;

  const labeler = LABELERS[labelerId];
  if (!labeler) return null;

  const author = AUTHOR_PROFILES[did];
  if (!author) return null;

  const label = {
    labeler: labelerId,
    val: labelVal,
    action_url: `/labeler/${labelerId}?profile=${encodeURIComponent(atUri)}&label=${labelVal}`,
  };

  const authorBooks = (author.books ?? []).map(isbn => {
    const book = BOOKS[isbn];
    if (!book) return null;
    return { ...book, bookwatcher_url: getBookActionUrl(isbn) };
  }).filter(Boolean);

  return { labeler, label, author, labeler_id: labelerId, authorBooks };
}

/** Look up a profile by handle (for Skyline profile pages). */
export function getProfile(handle) {
  return Object.values(AUTHOR_PROFILES).find(p => p.handle === handle) ?? null;
}

/** Get labels applied to a profile DID. */
export function getProfileLabels(did) {
  const labels = [];
  if (AUTHOR_PROFILES[did]) {
    labels.push({
      labeler: "bookwatcher",
      val: "bookwatcher-author",
      action_url: `/labeler/bookwatcher?profile=${encodeURIComponent(profileAtUri(did))}&label=bookwatcher-author`,
    });
  }
  return labels;
}
