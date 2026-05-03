<script>
  import { avatarColor, initials, relativeTime, currentUser } from '$lib/utils.js';
  import { SketchBanner } from '$lib/sketch';
  import { sketchConfig } from '$lib/sketchConfig';
  let { data } = $props();
</script>

<svelte:head>
  <title>Skyline Feed - {sketchConfig.title}</title>
</svelte:head>

<SketchBanner sketch={sketchConfig}>
  {#snippet thisPage()}
    <p>The Skyline feed shows mock Bluesky posts. Posts about books or academic papers have been automatically labeled by mock labeler services — look for the colored badges beneath each post. Clicking a badge opens the labeler's enriched view.</p>
  {/snippet}
</SketchBanner>

<div class="layout">

  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="logo">
      <div class="logo-icon">🦋</div>
      <span class="logo-text">Skyline</span>
    </div>

    <nav>
      <a class="nav-item active" href="/">
        <span class="nav-icon">🏠</span> Home
      </a>
      <a class="nav-item" href="#">
        <span class="nav-icon">🔍</span> Search
      </a>
      <a class="nav-item" href="#">
        <span class="nav-icon">🔔</span> Notifications
      </a>
      <a class="nav-item" href="#">
        <span class="nav-icon">✉️</span> Messages
      </a>
      <a class="nav-item" href="#">
        <span class="nav-icon">👤</span> Profile
      </a>
    </nav>

    <div class="sidebar-section">
      <div class="sidebar-section-title">Active Labelers</div>
      {#each Object.values(data.labelers) as labeler}
      <div class="labeler-nav-item">
        <div class="labeler-dot" style="background: {labeler.color}"></div>
        {labeler.name}
      </div>
      {/each}
    </div>

    <div class="sidebar-user">
      <div class="avatar sidebar-user-avatar" style="background: {avatarColor(currentUser.avatar_seed)}">{initials(currentUser.display_name)}</div>
      <div class="sidebar-user-info">
        <div class="sidebar-user-name">{currentUser.display_name}</div>
        <div class="sidebar-user-handle">@{currentUser.handle}</div>
      </div>
    </div>
  </aside>

  <!-- Main feed -->
  <main class="main">
    <div class="feed-header">
      <h1>Following</h1>
      <div class="feed-subhead">Posts enriched with label context where available</div>
    </div>

    <div class="explainer">
      <strong>Prototype demo:</strong> Posts below are mock data. Posts containing ISBNs or DOIs have been labeled by mock labeler services — look for the colored badges. Clicking a badge opens the labeler's enriched view for that post.
    </div>

    {#each data.posts as post}
    <article class="post-card">
      <div class="post-header">
        <div class="avatar" style="background: {avatarColor(post.author.avatar_seed)}">
          {initials(post.author.display_name)}
        </div>
        <div class="author-info">
          {#if data.authorProfiles[post.author.did]}
          <a class="author-name author-name-link" href="/profile/{post.author.handle}">{post.author.display_name}</a>
          {:else}
          <div class="author-name">{post.author.display_name}</div>
          {/if}
          <div class="author-handle">@{post.author.handle}</div>
        </div>
        <div class="post-time">{relativeTime(post.created_at)}</div>
      </div>

      <div class="post-text">{post.text}</div>

      {#if post.labels.length > 0}
      <div class="labels-row">
        {#each post.labels as label}
        {@const lb = data.labelers[label.labeler]}
        <a class="label-badge"
           href={label.action_url}
           style="background: {lb.bg}; color: {lb.color}; border-color: {lb.color}22"
           title="View {lb.name} details">
          <span class="label-badge-icon" style="background: {lb.color}">
            {lb.emoji}
          </span>
          {label.val}
        </a>
        {/each}
      </div>
      {/if}

      <div class="post-actions">
        <button class="action-btn">💬 {post.reply_count}</button>
        <button class="action-btn">🔁 {post.repost_count}</button>
        <button class="action-btn">❤️ {post.like_count}</button>
        <button class="action-btn">⋯</button>
      </div>
    </article>
    {/each}
  </main>

  <!-- Right panel -->
  <aside class="right-panel">

        <div class="panel-card">
      <h3>About labels</h3>
      <p>
        Labels in AT Protocol were designed to support content moderation. What if we thought bigger?
        </p>
        <p>
          This demo explores the premise that a simple extension to the current model could enable a wide variety of useful services.
      </p>
    </div>

    <div class="panel-card">
      <h3>Labelers in this feed</h3>
      {#each Object.values(data.labelers) as labeler}
      <div class="labeler-list-item">
        <div class="labeler-badge-large" style="background: {labeler.color}">
          {labeler.emoji}
        </div>
        <div class="labeler-info">
          <strong>{labeler.name}</strong>
          <span>{labeler.description}</span>
        </div>
      </div>
      {/each}
    </div>
  </aside>

</div>

<style>
  .author-name-link {
    font-weight: 600;
    font-size: 15px;
    color: var(--text-primary);
    text-decoration: none;
  }
  .author-name-link:hover { text-decoration: underline; }
</style>
