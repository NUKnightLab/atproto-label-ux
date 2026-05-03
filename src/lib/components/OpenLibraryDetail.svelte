<script>
  import { avatarColor, initials, currentUser } from '$lib/utils.js';
  import { SketchBanner, DesignAnnotation } from '$lib/sketch';
  import { sketchConfig } from '$lib/sketchConfig';
  let { data } = $props();

  const { book, post, labeler, label, labeler_id } = data;
</script>

<svelte:head>
  <title>{book.title} ({book.year} edition) | Open Library</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📖</text></svg>" />
</svelte:head>

<SketchBanner sketch={sketchConfig} showBack={true} backLabel="← Skyline">
  {#snippet thisPage()}
    <p>Open Library's record for this edition of <strong>{book.title}</strong>.</p>
    <p>Arrived by following an AT Protocol <strong>action URL</strong> embedded in an <code>openlibrary</code> label — the label identified an ISBN in the post; this page was generated from that ISBN.</p>
    <p><code>src: {labeler.id}</code> · <code>val: {label.val}</code> · <code>isbn: {label.isbn}</code></p>
  {/snippet}
</SketchBanner>

<!-- Internet Archive top strip -->
<div class="ia-strip">
  <span class="ia-logo">INTERNET ARCHIVE</span>
  <span>·</span>
  <a href="#">Wayback Machine</a>
  <a href="#">Open Library</a>
  <a href="#">Archive.org</a>
  <a href="#">Software</a>
  <a href="#">Movies</a>
  <span class="ia-current-user" style="margin-left: auto">
    <span class="ia-user-avatar" style="background: {avatarColor(currentUser.avatar_seed)}">{initials(currentUser.display_name)}</span>
    <span class="ia-user-handle">@{currentUser.handle}</span>
  </span>
</div>

<!-- Open Library nav -->
<nav class="ol-nav">
  <div class="ol-nav-inner">
    <a class="ol-logo" href="#">
      <div class="ol-logo-icon">📖</div>
      <span class="ol-logo-text">Open Library</span>
    </a>
    <a class="ol-nav-link" href="#">Books</a>
    <a class="ol-nav-link" href="#">Subjects</a>
    <a class="ol-nav-link" href="#">Collections</a>
    <a class="ol-nav-link" href="#">Lists</a>
    <a class="ol-nav-link" href="#">Recent Changes</a>
    <div class="ol-nav-search">
      <input type="text" placeholder="Search books, authors…" value={book.title}>
      <button>Search</button>
    </div>
  </div>
</nav>

<div class="ol-page">

  <!-- Breadcrumb -->
  <div class="ol-breadcrumb">
    <a href="#">Books</a> ›
    {#each book.genres.slice(0, 1) as g}<a href="#">{g}</a>{/each} ›
    {book.title}
  </div>

  <!-- Book record -->
  <div class="ol-record">
    <div class="ol-cover-col">
      <div class="ol-cover" style="background: {book.cover_color}; color: {book.cover_text_color}">
        {book.title}
      </div>
      <div class="ol-borrow-box">
        <div class="ol-borrow-avail">✓ Available to Borrow</div>
        <div class="ol-copies">3 of 5 copies available</div>
        <button class="ol-borrow-btn">📖 Borrow for 14 days</button>
        <a class="ol-preview-link" href="#">Preview (first 50 pages)</a>
        <button class="ol-want-btn">♡ Want to Read</button>
      </div>
      <div class="ol-buy-links">
        <strong>Buy a copy:</strong>
        <a href="#">Bookshop.org ↗</a>
        <a href="#">Better World Books ↗</a>
        <a href="#">ThriftBooks ↗</a>
      </div>
    </div>

    <div class="ol-meta-col">
      <div class="ol-meta-title">{book.title}</div>
      <div class="ol-meta-author">by <a href="#">{book.author}</a></div>

      <div class="ol-edition-info">
        <table>
          <tbody>
            <tr><td>First published</td><td>{book.year}</td></tr>
            <tr><td>Publisher</td><td>{book.publisher}</td></tr>
            <tr><td>Pages</td><td>{book.pages}</td></tr>
            <tr><td>ISBN-13</td><td><code>{label.isbn}</code></td></tr>
            <tr><td>OL Record</td><td><a href="#">{book.openlibrary_id}</a></td></tr>
            <tr><td>Edition</td><td>First Edition, Hardcover</td></tr>
            <tr><td>Language</td><td>English</td></tr>
          </tbody>
        </table>
      </div>

      <div class="ol-subjects">
        <div class="ol-subjects-label">Subjects</div>
        {#each book.genres as g}<a class="ol-subject-tag" href="#">{g}</a>{/each}
        <a class="ol-subject-tag" href="#">Award Winners</a>
        <a class="ol-subject-tag" href="#">{book.author}</a>
      </div>

      <div class="ol-description">{book.description}</div>

      <div class="ol-ids-row">
        <strong>Identifiers:</strong> ISBN-13: {label.isbn} ·
        Goodreads: <a href="#">{book.goodreads_id}</a> ·
        WorldCat: <a href="#">OCLC/{book.openlibrary_id}</a>
      </div>
    </div>
  </div>

  <!-- Record metadata -->
  <div class="ol-record-info">
    <div>
      <span class="ol-record-id">{book.openlibrary_id}</span>
      <span class="ol-last-edited">Last edited 2 days ago by <a href="#">contributor48271</a></span>
    </div>
    <div class="ol-edit-links">
      <a href="#">Edit this record</a>
      <a href="#">Add an edition</a>
      <a href="#">Report an error</a>
    </div>
  </div>

  <!-- Original post -->
  <div class="ol-post-card">
    <div class="ol-post-section-title">Originating Bluesky post</div>
    <div class="ol-post-header">
      <div class="ol-post-avatar" style="background: {avatarColor(post.author.avatar_seed)}">{initials(post.author.display_name)}</div>
      <div>
        <div class="ol-post-name">{post.author.display_name}</div>
        <div class="ol-post-handle">@{post.author.handle}</div>
      </div>
    </div>
    <div class="ol-post-text">{post.text}</div>
  </div>


  <div class="ol-footer">
    Open Library is an open, editable library catalog, building towards a web page for every book ever published.<br>
    <strong>A project of the <a href="#">Internet Archive</a>.</strong>
    Data available under <a href="#">CC BY</a> ·
    <a href="#">Help</a> · <a href="#">Developers/API</a> · <a href="#">Contact</a>
  </div>

  <!-- <DesignAnnotation>
    This page was reached by following an AT Protocol <strong>action URL</strong> embedded in a label — not a link the site itself generated.<br>
    <code>src: {labeler.id}</code> &nbsp;·&nbsp; <code>val: {label.val}</code> &nbsp;·&nbsp; <code>isbn: {label.isbn}</code><br>
    <code>uri: at://{post.author.did}/app.bsky.feed.post/{post.id}</code>
  </DesignAnnotation> -->

</div>

<style>
  :global(*, *::before, *::after) { box-sizing: border-box; margin: 0; padding: 0; }
  :global(body) { font-family: "Helvetica Neue", Arial, sans-serif; background: #f7f7f5; color: #222; font-size: 14px; line-height: 1.5; }
  :global(a) { color: #1a73a7; text-decoration: none; }
  :global(a:hover) { text-decoration: underline; }

  .ia-strip { background: #2c2c2c; color: #aaa; font-size: 11px; padding: 5px 20px; display: flex; align-items: center; gap: 14px; }
  .ia-logo { font-weight: 700; color: white; font-size: 12px; letter-spacing: .04em; }
  .ia-strip a { color: #888; }
  .ia-strip a:hover { color: white; text-decoration: none; }
  .ia-current-user { display: flex; align-items: center; gap: 7px; }
  .ia-user-avatar { width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700; color: white; flex-shrink: 0; }
  .ia-user-handle { color: #bbb; }

  .ol-nav { background: white; border-bottom: 2px solid #e57c1f; }
  .ol-nav-inner { max-width: 1020px; margin: 0 auto; padding: 0 20px; display: flex; align-items: stretch; }
  .ol-logo { display: flex; align-items: center; gap: 10px; padding: 10px 20px 10px 0; margin-right: 4px; text-decoration: none; }
  .ol-logo:hover { text-decoration: none; }
  .ol-logo-icon { width: 34px; height: 34px; background: #e57c1f; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; }
  .ol-logo-text { font-size: 19px; font-weight: 700; color: #222; }
  .ol-nav-link { padding: 0 14px; font-size: 13px; color: #555; display: flex; align-items: center; border-bottom: 3px solid transparent; margin-bottom: -2px; }
  .ol-nav-link:hover { color: #e57c1f; text-decoration: none; border-bottom-color: #e57c1f; }
  .ol-nav-search { margin-left: auto; display: flex; align-items: center; gap: 6px; padding: 8px 0; }
  .ol-nav-search input { border: 1px solid #ccc; border-radius: 3px; padding: 6px 10px; font-size: 13px; width: 200px; }
  .ol-nav-search button { background: #e57c1f; color: white; border: none; border-radius: 3px; padding: 6px 14px; font-size: 13px; cursor: pointer; }

  .ol-page { max-width: 1020px; margin: 0 auto; padding: 18px 20px; }

  .ol-breadcrumb { font-size: 12px; color: #888; margin-bottom: 14px; }
  .ol-breadcrumb a { color: #1a73a7; }

  .ol-record { display: flex; gap: 32px; background: white; border: 1px solid #ddd; border-radius: 3px; padding: 28px; margin-bottom: 16px; }

  .ol-cover-col { width: 148px; flex-shrink: 0; }
  .ol-cover { width: 148px; height: 208px; border-radius: 3px; display: flex; align-items: center; justify-content: center; padding: 14px; text-align: center; font-size: 12px; font-weight: 700; line-height: 1.3; box-shadow: 2px 3px 10px rgba(0,0,0,.28); margin-bottom: 14px; }

  .ol-borrow-box { border: 2px solid #5cb85c; border-radius: 3px; padding: 12px; text-align: center; margin-bottom: 10px; }
  .ol-borrow-avail { color: #3a7a3a; font-size: 12px; font-weight: 600; margin-bottom: 8px; }
  .ol-copies { font-size: 11px; color: #888; margin-bottom: 8px; }
  .ol-borrow-btn { display: block; width: 100%; background: #5cb85c; color: white; font-size: 13px; font-weight: 600; padding: 8px; border-radius: 2px; text-align: center; cursor: pointer; margin-bottom: 5px; border: none; }
  .ol-borrow-btn:hover { background: #449d44; }
  .ol-preview-link { display: block; color: #1a73a7; font-size: 12px; text-align: center; margin-bottom: 5px; }
  .ol-want-btn { display: block; width: 100%; font-size: 12px; padding: 6px; border: 1px solid #ccc; border-radius: 2px; background: white; cursor: pointer; color: #444; text-align: center; }
  .ol-want-btn:hover { background: #f5f5f5; }

  .ol-buy-links { font-size: 11px; color: #888; margin-top: 10px; }
  .ol-buy-links strong { display: block; margin-bottom: 3px; }
  .ol-buy-links a { display: block; color: #1a73a7; padding: 1px 0; }

  .ol-meta-col { flex: 1; min-width: 0; }
  .ol-meta-title { font-size: 26px; font-weight: 700; line-height: 1.2; color: #111; margin-bottom: 6px; }
  .ol-meta-author { font-size: 16px; margin-bottom: 18px; }

  .ol-edition-info { background: #f7f7f5; border: 1px solid #e0e0e0; border-radius: 2px; padding: 12px 16px; margin-bottom: 16px; }
  .ol-edition-info table { width: 100%; border-collapse: collapse; }
  .ol-edition-info td { padding: 4px 0; vertical-align: top; }
  .ol-edition-info td:first-child { color: #666; width: 120px; font-size: 13px; }
  .ol-edition-info td:last-child { font-size: 13px; font-weight: 500; }
  :global(code) { font-family: "SFMono-Regular", Consolas, monospace; font-size: 12px; }

  .ol-subjects { margin-bottom: 16px; }
  .ol-subjects-label { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: .07em; font-weight: 600; margin-bottom: 7px; }
  .ol-subject-tag { display: inline-block; font-size: 12px; padding: 3px 8px; background: #f0f0ee; border: 1px solid #ddd; border-radius: 2px; color: #1a73a7; margin: 2px 2px 2px 0; }
  .ol-subject-tag:hover { background: #e4e4e0; text-decoration: none; }

  .ol-description { font-size: 14px; color: #444; line-height: 1.7; margin-bottom: 16px; border-left: 3px solid #e57c1f; padding-left: 12px; }

  .ol-ids-row { font-size: 12px; color: #888; }

  .ol-record-info { background: white; border: 1px solid #ddd; border-radius: 3px; padding: 12px 18px; margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
  .ol-record-id { font-family: monospace; font-size: 12px; color: #999; }
  .ol-last-edited { font-size: 12px; color: #888; margin-left: 10px; }
  .ol-edit-links { display: flex; gap: 14px; font-size: 13px; }

  .ol-post-card { background: white; border: 1px solid #ddd; border-radius: 3px; padding: 16px 18px; margin-bottom: 14px; }
  .ol-post-section-title { font-size: 11px; text-transform: uppercase; letter-spacing: .07em; color: #888; font-weight: 600; margin-bottom: 10px; }
  .ol-post-header { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .ol-post-avatar { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: white; flex-shrink: 0; }
  .ol-post-name { font-weight: 600; font-size: 14px; }
  .ol-post-handle { font-size: 12px; color: #888; }
  .ol-post-text { font-size: 14px; line-height: 1.6; color: #333; }

  .ol-other { background: white; border: 1px solid #ddd; border-radius: 3px; padding: 14px 18px; margin-bottom: 14px; }
  .ol-other-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
  .ol-other-chip { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; transition: opacity .15s; }
  .ol-other-chip:hover { opacity: .8; text-decoration: none; }

  .ol-footer { text-align: center; font-size: 12px; color: #888; padding: 22px 0 14px; border-top: 1px solid #ddd; margin-top: 16px; line-height: 1.9; }
  .ol-footer a { color: #1a73a7; }

</style>
