<script>
  import { avatarColor, initials, currentUser } from "$lib/utils.js";
  import { SketchBanner, DesignAnnotation } from "$lib/sketch";
  import { sketchConfig } from "$lib/sketchConfig";
  let { data } = $props();

  const { author, labeler, label, labeler_id, authorBooks } = data;
</script>

<svelte:head>
  <title>{author.display_name} — BookWatcher</title>
  <link
    rel="icon"
    href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📚</text></svg>"
  />
</svelte:head>

<SketchBanner sketch={sketchConfig} showBack={true} backLabel="← Skyline">
  {#snippet thisPage()}
    <p>
      BookWatcher's verified author profile for <strong
        >{author.display_name}</strong
      >.
    </p>
    <p>
      Arrived by following BookWatcher's <strong>action URL</strong> from a
      <code>bookwatcher-author</code> label on a post. The label carries the author's
      AT Protocol profile URI as a query parameter.
    </p>
    <p>
      <code>src: {labeler.id}</code> · <code>val: {label.val}</code> ·
      <code>profile: at://{author.did}</code>
    </p>
  {/snippet}
</SketchBanner>

<nav class="bw-nav">
  <span class="bw-nav-logo">📚 BookWatcher</span>
  <div class="bw-nav-links">
    <a href="#">My Shelf</a>
    <a href="#">Discover</a>
    <a href="#">Lists</a>
    <a href="#">Friends</a>
  </div>
  <div class="bw-nav-right">
    <div class="bw-current-user">
      <div
        class="bw-user-avatar"
        style="background: {avatarColor(currentUser.avatar_seed)}"
      >
        {initials(currentUser.display_name)}
      </div>
      <span class="bw-user-handle">@{currentUser.handle}</span>
    </div>
  </div>
</nav>

<div class="bw-container">
  <div class="bw-profile-hero">
    <div class="bw-profile-cover">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="120"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="nebula1" cx="30%" cy="50%" r="40%">
            <stop offset="0%" stop-color="#4f2d8a" stop-opacity="0.6" />
            <stop offset="100%" stop-color="#0a0a1e" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="nebula2" cx="75%" cy="40%" r="35%">
            <stop offset="0%" stop-color="#1a4a8a" stop-opacity="0.5" />
            <stop offset="100%" stop-color="#0a0a1e" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="moon" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#e8e4d0" />
            <stop offset="100%" stop-color="#b8b4a0" />
          </radialGradient>
        </defs>
        <!-- Deep space background -->
        <rect width="100%" height="120" fill="#07071a" />
        <!-- Nebula clouds -->
        <ellipse cx="28%" cy="60" rx="220" ry="80" fill="url(#nebula1)" />
        <ellipse cx="75%" cy="50" rx="200" ry="70" fill="url(#nebula2)" />
        <!-- Stars: tiny -->
        <circle cx="5%" cy="15" r="0.8" fill="white" opacity="0.9" />
        <circle cx="9%" cy="42" r="0.6" fill="white" opacity="0.7" />
        <circle cx="13%" cy="8" r="1" fill="white" opacity="0.8" />
        <circle cx="18%" cy="60" r="0.7" fill="white" opacity="0.6" />
        <circle cx="22%" cy="28" r="0.9" fill="white" opacity="0.9" />
        <circle cx="27%" cy="95" r="0.6" fill="white" opacity="0.7" />
        <circle cx="31%" cy="18" r="1.1" fill="white" opacity="0.85" />
        <circle cx="35%" cy="75" r="0.7" fill="white" opacity="0.8" />
        <circle cx="40%" cy="35" r="0.8" fill="white" opacity="0.6" />
        <circle cx="44%" cy="88" r="0.6" fill="white" opacity="0.75" />
        <circle cx="48%" cy="12" r="1" fill="white" opacity="0.9" />
        <circle cx="52%" cy="55" r="0.7" fill="white" opacity="0.7" />
        <circle cx="57%" cy="22" r="0.9" fill="white" opacity="0.8" />
        <circle cx="61%" cy="78" r="0.6" fill="white" opacity="0.65" />
        <circle cx="65%" cy="40" r="1.1" fill="white" opacity="0.85" />
        <circle cx="69%" cy="100" r="0.7" fill="white" opacity="0.7" />
        <circle cx="73%" cy="25" r="0.8" fill="white" opacity="0.9" />
        <circle cx="78%" cy="68" r="0.6" fill="white" opacity="0.75" />
        <circle cx="82%" cy="14" r="1" fill="white" opacity="0.8" />
        <circle cx="86%" cy="85" r="0.7" fill="white" opacity="0.7" />
        <circle cx="90%" cy="32" r="0.9" fill="white" opacity="0.85" />
        <circle cx="94%" cy="58" r="0.6" fill="white" opacity="0.65" />
        <circle cx="97%" cy="10" r="1.1" fill="white" opacity="0.9" />
        <circle cx="3%" cy="80" r="0.7" fill="white" opacity="0.75" />
        <circle cx="16%" cy="105" r="0.8" fill="white" opacity="0.6" />
        <circle cx="46%" cy="102" r="0.6" fill="white" opacity="0.7" />
        <circle cx="60%" cy="108" r="0.9" fill="white" opacity="0.65" />
        <circle cx="84%" cy="110" r="0.7" fill="white" opacity="0.7" />
        <!-- Brighter accent stars -->
        <circle cx="11%" cy="30" r="1.6" fill="white" opacity="0.95" />
        <circle cx="39%" cy="20" r="1.4" fill="#c8d8ff" opacity="0.9" />
        <circle cx="67%" cy="55" r="1.7" fill="white" opacity="0.95" />
        <circle cx="88%" cy="22" r="1.5" fill="#ffd8c0" opacity="0.9" />
        <circle cx="55%" cy="90" r="1.4" fill="#d0d8ff" opacity="0.85" />
        <!-- Crescent moon -->
        <circle cx="88%" cy="28" r="18" fill="url(#moon)" opacity="0.9" />
        <circle cx="93%" cy="22" r="16" fill="#07071a" />
        <!-- Subtle purple-to-dark gradient overlay at bottom for blending into profile -->
        <rect width="100%" height="40" y="80" fill="url(#fade)" />
        <defs>
          <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#07071a" stop-opacity="0" />
            <stop offset="100%" stop-color="#1a1a3e" stop-opacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div class="bw-profile-identity">
      <div
        class="bw-profile-avatar"
        style="background: {avatarColor(author.avatar_seed)}"
      >
        {initials(author.display_name)}
      </div>
      <div class="bw-profile-names">
        <div class="bw-profile-display-name">{author.display_name}</div>
        <div class="bw-profile-handle">@{author.handle}</div>
      </div>
    </div>
    <div class="bw-verified-badge">
      <span class="bw-verified-icon">✓</span>
      <div class="bw-verified-body">
        <span class="bw-verified-text">Verified Author</span>
        <span class="bw-verified-sub"
          >BookWatcher has confirmed this is a published author</span
        >
      </div>
      <a class="bw-skyline-link" href="/profile/{author.handle}"
        >🦋 View on Skyline</a
      >
    </div>
  </div>

  <div class="bw-card">
    <div class="bw-card-title">About</div>
    <p class="bw-bio">{author.bio}</p>
    <div class="bw-profile-stats">
      <div class="bw-stat">
        <div class="bw-stat-num">{author.follower_count.toLocaleString()}</div>
        <div class="bw-stat-label">Followers</div>
      </div>
      <div class="bw-stat">
        <div class="bw-stat-num">{author.following_count.toLocaleString()}</div>
        <div class="bw-stat-label">Following</div>
      </div>
      <div class="bw-stat">
        <div class="bw-stat-num">{author.post_count.toLocaleString()}</div>
        <div class="bw-stat-label">Posts</div>
      </div>
    </div>
  </div>

  {#if authorBooks.length > 0}
    <div class="bw-card">
      <div class="bw-card-title">Books by this author</div>
      {#each authorBooks as book}
        <div class="bw-book-row">
          {#if book.bookwatcher_url}
            <a
              class="bw-book-cover-sm"
              href={book.bookwatcher_url}
              style="background: {book.cover_color}; color: {book.cover_text_color}"
            >
              {book.title}
            </a>
          {:else}
            <div
              class="bw-book-cover-sm"
              style="background: {book.cover_color}; color: {book.cover_text_color}"
            >
              {book.title}
            </div>
          {/if}
          <div class="bw-book-meta">
            {#if book.bookwatcher_url}
              <a
                class="bw-book-title bw-book-title-link"
                href={book.bookwatcher_url}>{book.title}</a
              >
            {:else}
              <div class="bw-book-title">{book.title}</div>
            {/if}
            <div class="bw-book-year">{book.year} · {book.publisher}</div>
            <div class="bw-stars-sm">
              <span class="bw-star-icons"
                >{"★".repeat(Math.round(book.avg_rating))}{"☆".repeat(
                  5 - Math.round(book.avg_rating),
                )}</span
              >
              <span class="bw-rating-num">{book.avg_rating}</span>
              <span class="bw-rating-count"
                >({book.ratings_count.toLocaleString()} ratings)</span
              >
            </div>
            <div class="bw-shelf-row">
              <button class="bw-shelf-btn primary">📚 Add to Shelf</button>
              <button class="bw-shelf-btn ghost">🏛️ Find in Library</button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <div class="bw-footer">
    <strong>BookWatcher</strong> — Track what you read. Discover what's next.<br
    />
    <a href="#">Terms</a> · <a href="#">Privacy</a> · <a href="#">About</a> ·
    <a href="#">Blog</a>
  </div>

  <!-- <DesignAnnotation>
    This page was reached by following an AT Protocol
    <strong>action URL</strong>
    embedded in a <code>bookwatcher-author</code> label.<br />
    The label was applied to a <em>post</em> whose author's DID matches a
    BookWatcher-verified author.<br />
    Any AT Protocol client subscribed to BookWatcher can surface this badge on posts
    and profiles from this account.<br />
    <code>src: {labeler.id}</code> &nbsp;·&nbsp;
    <code>val: {label.val}</code><br />
    <code>profile: at://{author.did}</code>
  </DesignAnnotation> -->
</div>

<style>
  :global(*, *::before, *::after) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      sans-serif;
    background: #f0f0ff;
    color: #1a1a2e;
    line-height: 1.5;
  }
  :global(a) {
    color: #6366f1;
    text-decoration: none;
  }
  :global(a:hover) {
    text-decoration: underline;
  }

  .bw-nav {
    background: #6366f1;
    color: white;
    padding: 0 24px;
    height: 52px;
    display: flex;
    align-items: center;
    gap: 28px;
  }
  .bw-nav-logo {
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.5px;
  }
  .bw-nav-links {
    display: flex;
    gap: 20px;
    font-size: 14px;
  }
  .bw-nav-links a {
    color: rgba(255, 255, 255, 0.8);
  }
  .bw-nav-links a:hover {
    color: white;
    text-decoration: none;
  }
  .bw-nav-right {
    margin-left: auto;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .bw-current-user {
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .bw-user-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    color: white;
    flex-shrink: 0;
    border: 2px solid rgba(255, 255, 255, 0.4);
  }
  .bw-user-handle {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
  }

  .bw-container {
    max-width: 760px;
    margin: 28px auto;
    padding: 0 20px;
  }

  .bw-profile-hero {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 16px;
    box-shadow: 0 2px 12px rgba(99, 102, 241, 0.12);
  }
  .bw-profile-cover {
    height: 120px;
    background: #07071a;
    overflow: hidden;
    line-height: 0;
  }
  .bw-profile-identity {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 24px;
  }
  .bw-profile-avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    font-weight: 700;
    color: white;
    border: 4px solid white;
    flex-shrink: 0;
  }
  .bw-profile-names {
    padding-bottom: 4px;
  }
  .bw-profile-display-name {
    font-size: 22px;
    font-weight: 800;
    line-height: 1.2;
  }
  .bw-profile-handle {
    font-size: 14px;
    color: #9ca3af;
  }

  .bw-verified-badge {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #eef2ff;
    border-top: 1px solid #c7d2fe;
    padding: 14px 24px;
  }
  .bw-verified-icon {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #6366f1;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    flex-shrink: 0;
  }
  .bw-verified-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .bw-verified-text {
    font-size: 15px;
    font-weight: 700;
    color: #4f46e5;
  }
  .bw-verified-sub {
    font-size: 13px;
    color: #6b7280;
  }
  .bw-skyline-link {
    font-size: 13px;
    font-weight: 600;
    color: #1d9bf0;
    white-space: nowrap;
  }
  .bw-skyline-link:hover {
    text-decoration: underline;
  }

  .bw-card {
    background: white;
    border-radius: 12px;
    padding: 20px 24px;
    margin-bottom: 14px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  }
  .bw-card-title {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #9ca3af;
    margin-bottom: 14px;
  }

  .bw-bio {
    font-size: 15px;
    color: #374151;
    line-height: 1.7;
    margin-bottom: 16px;
  }
  .bw-profile-stats {
    display: flex;
    gap: 28px;
  }
  .bw-stat {
    text-align: center;
  }
  .bw-stat-num {
    font-size: 18px;
    font-weight: 700;
  }
  .bw-stat-label {
    font-size: 11px;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .bw-book-row {
    display: flex;
    gap: 18px;
    padding: 12px 0;
    border-bottom: 1px solid #f3f4f6;
  }
  .bw-book-row:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  .bw-book-cover-sm {
    width: 72px;
    height: 100px;
    border-radius: 6px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    text-align: center;
    font-size: 9px;
    font-weight: 700;
    line-height: 1.3;
    box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.25);
  }
  .bw-book-meta {
    flex: 1;
  }
  .bw-book-title {
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 4px;
    display: block;
  }
  .bw-book-title-link {
    color: #4f46e5;
    text-decoration: none;
  }
  .bw-book-title-link:hover {
    text-decoration: underline;
  }
  .bw-book-cover-sm[href] {
    cursor: pointer;
    transition: opacity 0.15s;
  }
  .bw-book-cover-sm[href]:hover {
    opacity: 0.85;
    text-decoration: none;
  }
  .bw-book-year {
    font-size: 13px;
    color: #9ca3af;
    margin-bottom: 8px;
  }
  .bw-stars-sm {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 10px;
  }
  .bw-star-icons {
    color: #f59e0b;
    font-size: 14px;
  }
  .bw-rating-num {
    font-size: 14px;
    font-weight: 700;
  }
  .bw-rating-count {
    font-size: 12px;
    color: #9ca3af;
  }

  .bw-shelf-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .bw-shelf-btn {
    padding: 7px 14px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    border: 1.5px solid;
    cursor: pointer;
    font-family: inherit;
  }
  .bw-shelf-btn.primary {
    background: #6366f1;
    color: white;
    border-color: #6366f1;
  }
  .bw-shelf-btn.ghost {
    background: white;
    color: #374151;
    border-color: #d1d5db;
  }

  .bw-footer {
    text-align: center;
    font-size: 12px;
    color: #9ca3af;
    padding: 28px 0 16px;
    border-top: 1px solid #d1d5db;
    margin-top: 8px;
    line-height: 1.9;
  }

</style>
