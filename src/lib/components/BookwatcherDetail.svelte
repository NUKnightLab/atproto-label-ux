<script>
  import { avatarColor, initials, currentUser } from '$lib/utils.js';
  import { SketchBanner, DesignAnnotation } from '$lib/sketch';
  import { sketchConfig } from '$lib/sketchConfig';
  let { data } = $props();

  const { book, post, labeler, label, labeler_id, authorProfile } = data;
  const authorProfileUrl = authorProfile
    ? `/labeler/bookwatcher?profile=${encodeURIComponent(`at://${authorProfile.did}`)}&label=bookwatcher-author`
    : null;
</script>

<svelte:head>
  <title>{book.title} — BookWatcher</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📚</text></svg>" />
</svelte:head>

<SketchBanner sketch={sketchConfig} showBack={true} backLabel="← Skyline">
  {#snippet thisPage()}
    <p>BookWatcher's enriched view for a post mentioning <strong>{book.title}</strong>.</p>
    <p>Arrived by following BookWatcher's <strong>action URL</strong> from a <code>bookwatcher-book</code> label. The action URL carries the post's AT Protocol URI as a <code>post=</code> query parameter, and the label value as <code>label=</code>.</p>
    <p><code>src: {labeler.id}</code> · <code>val: {label.val}</code> · <code>isbn: {label.isbn}</code></p>
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
      <div class="bw-user-avatar" style="background: {avatarColor(currentUser.avatar_seed)}">{initials(currentUser.display_name)}</div>
      <span class="bw-user-handle">@{currentUser.handle}</span>
    </div>
  </div>
</nav>

<div class="bw-container">

  <div class="bw-hero">
    <div class="bw-cover" style="background: {book.cover_color}; color: {book.cover_text_color}">
      {book.title}
    </div>
    <div class="bw-hero-info">
      <div class="bw-hero-title">{book.title}</div>
      <div class="bw-hero-author">by {book.author}</div>

      <div class="bw-stars">
        <span class="bw-star-icons">{'★'.repeat(Math.round(book.avg_rating))}{'☆'.repeat(5 - Math.round(book.avg_rating))}</span>
        <span class="bw-rating-num">{book.avg_rating}</span>
        <span class="bw-rating-count">({book.ratings_count.toLocaleString()} ratings)</span>
      </div>

      <div class="bw-community-stats">
        <div>
          <div class="bw-stat-num">{book.readers_count.toLocaleString()}</div>
          <div class="bw-stat-label">on shelves</div>
        </div>
        <div>
          <div class="bw-stat-num">{book.lists_count}</div>
          <div class="bw-stat-label">lists</div>
        </div>
        <div>
          <div class="bw-stat-num">{book.pages}</div>
          <div class="bw-stat-label">pages</div>
        </div>
        <div>
          <div class="bw-stat-num">{book.year}</div>
          <div class="bw-stat-label">published</div>
        </div>
      </div>

      <div class="bw-shelf-row">
        <button class="bw-shelf-btn primary">📚 Currently Reading</button>
        <button class="bw-shelf-btn secondary">Want to Read</button>
        <button class="bw-shelf-btn ghost">Read It</button>
        <button class="bw-shelf-btn ghost">🏛️ Find in Library</button>
      </div>
    </div>
  </div>

  <div class="bw-genres">
    {#each book.genres as g}<span class="bw-genre">{g}</span>{/each}
    <span class="bw-genre">{book.publisher}</span>
  </div>

  {#if authorProfile && authorProfileUrl}
  <div class="bw-card bw-author-card">
    <div class="bw-card-title">Verified Author on BookWatcher</div>
    <div class="bw-author-row">
      <div class="bw-author-avatar" style="background: {avatarColor(authorProfile.avatar_seed)}">{initials(authorProfile.display_name)}</div>
      <div class="bw-author-info">
        <div class="bw-author-name">{authorProfile.display_name}</div>
        <div class="bw-author-handle">@{authorProfile.handle}</div>
      </div>
      <div class="bw-author-links">
        <a class="bw-author-link" href={authorProfileUrl}>📚 BookWatcher profile</a>
        <a class="bw-author-link bw-author-link-skyline" href="/profile/{authorProfile.handle}">🦋 Skyline profile</a>
      </div>
    </div>
  </div>
  {/if}

  <div class="bw-card">
    <div class="bw-card-title">About this book</div>
    <div class="bw-description">{book.description}</div>
  </div>

  {#if book.review_snippets && book.review_snippets.length > 0}
  <div class="bw-card">
    <div class="bw-card-title">What readers are saying</div>
    {#each book.review_snippets as r}
    <div class="bw-review">
      <div class="bw-review-stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
      <div class="bw-review-text">"{r.text}"</div>
      <div class="bw-review-attr">BookWatcher community review</div>
    </div>
    {/each}
  </div>
  {/if}

  <div class="bw-card">
    <div class="bw-card-title">From Bluesky</div>
    <div class="bw-original-post">
      <div class="bw-op-header">
        <div class="bw-op-avatar" style="background: {avatarColor(post.author.avatar_seed)}">{initials(post.author.display_name)}</div>
        <div>
          <div class="bw-op-name">{post.author.display_name}</div>
          <div class="bw-op-handle">@{post.author.handle}</div>
        </div>
      </div>
      <div class="bw-op-text">{post.text}</div>
    </div>
  </div>

  <div class="bw-footer">
    <strong>BookWatcher</strong> — Track what you read. Discover what's next.<br>
    <a href="#">Terms</a> · <a href="#">Privacy</a> · <a href="#">About</a> · <a href="#">Blog</a>
  </div>

  <!-- <DesignAnnotation>
    This page was reached by following an AT Protocol <strong>action URL</strong> embedded in a label — not a link the site itself generated.<br>
    <code>src: {labeler.id}</code> &nbsp;·&nbsp; <code>val: {label.val}</code> &nbsp;·&nbsp; <code>isbn: {label.isbn}</code><br>
    <code>uri: at://{post.author.did}/app.bsky.feed.post/{post.id}</code>
  </DesignAnnotation> -->
</div>

<style>
  :global(*, *::before, *::after) { box-sizing: border-box; margin: 0; padding: 0; }
  :global(body) { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f0f0ff; color: #1a1a2e; line-height: 1.5; }
  :global(a) { color: #6366f1; text-decoration: none; }
  :global(a:hover) { text-decoration: underline; }

  .bw-nav { background: #6366f1; color: white; padding: 0 24px; height: 52px; display: flex; align-items: center; gap: 28px; }
  .bw-nav-logo { font-size: 18px; font-weight: 800; letter-spacing: -0.5px; }
  .bw-nav-links { display: flex; gap: 20px; font-size: 14px; }
  .bw-nav-links a { color: rgba(255,255,255,.8); }
  .bw-nav-links a:hover { color: white; text-decoration: none; }
  .bw-nav-right { margin-left: auto; font-size: 13px; display: flex; align-items: center; gap: 16px; }
  .bw-nav-right a { color: rgba(255,255,255,.7); }
  .bw-nav-right a:hover { color: white; text-decoration: none; }
  .bw-current-user { display: flex; align-items: center; gap: 7px; }
  .bw-user-avatar { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: white; flex-shrink: 0; border: 2px solid rgba(255,255,255,.4); }
  .bw-user-handle { font-size: 12px; color: rgba(255,255,255,.8); }

  .bw-container { max-width: 760px; margin: 28px auto; padding: 0 20px; }

  .bw-hero { display: flex; gap: 24px; background: white; border-radius: 16px; padding: 28px; margin-bottom: 16px; box-shadow: 0 2px 12px rgba(99,102,241,.12); }
  .bw-cover { width: 120px; height: 168px; border-radius: 8px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; padding: 12px; text-align: center; font-size: 12px; font-weight: 700; line-height: 1.3; box-shadow: 3px 4px 14px rgba(0,0,0,.3); }
  .bw-hero-info { flex: 1; }
  .bw-hero-title { font-size: 24px; font-weight: 800; line-height: 1.2; margin-bottom: 4px; }
  .bw-hero-author { font-size: 15px; color: #6366f1; margin-bottom: 14px; }

  .bw-stars { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
  .bw-star-icons { color: #f59e0b; font-size: 17px; letter-spacing: 1px; }
  .bw-rating-num { font-size: 20px; font-weight: 700; }
  .bw-rating-count { font-size: 13px; color: #9ca3af; }

  .bw-community-stats { display: flex; gap: 24px; margin-bottom: 18px; }
  .bw-stat-num { font-size: 16px; font-weight: 700; }
  .bw-stat-label { font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: .05em; }

  .bw-shelf-row { display: flex; gap: 8px; flex-wrap: wrap; }
  .bw-shelf-btn { padding: 9px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; border: 1.5px solid; transition: all .15s; cursor: pointer; font-family: inherit; }
  .bw-shelf-btn.primary { background: #6366f1; color: white; border-color: #6366f1; }
  .bw-shelf-btn.primary:hover { background: #4f46e5; }
  .bw-shelf-btn.secondary { background: white; color: #6366f1; border-color: #6366f1; }
  .bw-shelf-btn.secondary:hover { background: #eef2ff; }
  .bw-shelf-btn.ghost { background: white; color: #374151; border-color: #d1d5db; }
  .bw-shelf-btn.ghost:hover { background: #f3f4f6; }

  .bw-genres { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
  .bw-genre { font-size: 12px; padding: 3px 10px; border-radius: 20px; background: #eef2ff; color: #4f46e5; border: 1px solid #c7d2fe; }

  .bw-card { background: white; border-radius: 12px; padding: 20px 24px; margin-bottom: 14px; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
  .bw-card-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #9ca3af; margin-bottom: 14px; }

  .bw-description { font-size: 15px; color: #374151; line-height: 1.7; }

  .bw-review { padding: 14px 0; border-bottom: 1px solid #f3f4f6; }
  .bw-review:last-child { border-bottom: none; padding-bottom: 0; }
  .bw-review-stars { color: #f59e0b; font-size: 13px; margin-bottom: 6px; }
  .bw-review-text { font-size: 14px; color: #374151; line-height: 1.6; font-style: italic; }
  .bw-review-attr { font-size: 12px; color: #9ca3af; margin-top: 4px; }

  .bw-original-post { background: #f9fafb; border-radius: 8px; padding: 14px; }
  .bw-op-header { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .bw-op-avatar { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: white; flex-shrink: 0; }
  .bw-op-name { font-weight: 600; font-size: 14px; }
  .bw-op-handle { font-size: 12px; color: #9ca3af; }
  .bw-op-text { font-size: 14px; line-height: 1.6; color: #374151; }

  .bw-author-card { }
  .bw-author-row { display: flex; align-items: center; gap: 12px; }
  .bw-author-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 700; color: white; flex-shrink: 0; }
  .bw-author-info { flex: 1; }
  .bw-author-name { font-size: 15px; font-weight: 600; }
  .bw-author-handle { font-size: 12px; color: #9ca3af; }
  .bw-author-links { display: flex; flex-direction: column; gap: 6px; align-items: flex-end; }
  .bw-author-link { font-size: 13px; font-weight: 600; color: #6366f1; white-space: nowrap; }
  .bw-author-link:hover { text-decoration: underline; }
  .bw-author-link-skyline { color: #1d9bf0; }

  .bw-other-chips { display: flex; gap: 8px; flex-wrap: wrap; }
  .bw-other-chip { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; transition: opacity .15s; }
  .bw-other-chip:hover { opacity: .8; text-decoration: none; }

  .bw-footer { text-align: center; font-size: 12px; color: #9ca3af; padding: 28px 0 16px; border-top: 1px solid #d1d5db; margin-top: 8px; line-height: 1.9; }

</style>
