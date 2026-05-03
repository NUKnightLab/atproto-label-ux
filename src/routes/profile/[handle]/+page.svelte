<script>
  import { avatarColor, initials, currentUser } from '$lib/utils.js';
  import { SketchBanner } from '$lib/sketch';
  import { sketchConfig } from '$lib/sketchConfig';
  let { data } = $props();

  const { profile, labels, posts, labelers } = data;
</script>

<svelte:head>
  <title>{profile.display_name} (@{profile.handle}) — Skyline</title>
</svelte:head>

<SketchBanner sketch={sketchConfig} showBack={true} backLabel="← Feed">
  {#snippet thisPage()}
    <p>Skyline profile view for <strong>{profile.display_name}</strong>, showing labels applied to this AT Protocol account by subscribed labelers.</p>
    <p>The <code>bookwatcher-author</code> badge here is the same label shown on posts from this account in the feed — surfaced on the profile itself.</p>
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
      <a class="nav-item" href="/">
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
      <a class="nav-item active" href="#">
        <span class="nav-icon">👤</span> Profile
      </a>
    </nav>

    <div class="sidebar-section">
      <div class="sidebar-section-title">Active Labelers</div>
      {#each Object.values(labelers) as labeler}
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

  <!-- Profile main -->
  <main class="main">

    <div class="profile-cover"></div>

    <div class="profile-header">
      <div class="profile-avatar-wrap">
        <div class="avatar profile-avatar" style="background: {avatarColor(profile.avatar_seed)}">
          {initials(profile.display_name)}
        </div>
      </div>
      <div class="profile-actions">
        <button class="btn-follow">Follow</button>
        <button class="btn-more">⋯</button>
      </div>
    </div>

    <div class="profile-identity">
      <div class="profile-display-name">{profile.display_name}</div>
      <div class="profile-handle">@{profile.handle}</div>
      <p class="profile-bio">{profile.bio}</p>
      <div class="profile-stats">
        <span><strong>{profile.following_count.toLocaleString()}</strong> <span class="stat-label">Following</span></span>
        <span><strong>{profile.follower_count.toLocaleString()}</strong> <span class="stat-label">Followers</span></span>
      </div>
    </div>

    {#if labels.length > 0}
    <div class="profile-labels-section">
      <div class="profile-labels-heading">Labels from subscribed labelers</div>
      <div class="labels-row">
        {#each labels as label}
        {@const lb = labelers[label.labeler]}
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
    </div>
    {/if}

    <div class="profile-tabs">
      <button class="tab active">Posts</button>
      <button class="tab">Replies</button>
      <button class="tab">Media</button>
      <button class="tab">Likes</button>
    </div>

    {#each posts as post}
    <article class="post-card">
      <div class="post-header">
        <div class="avatar" style="background: {avatarColor(post.author.avatar_seed)}">
          {initials(post.author.display_name)}
        </div>
        <div class="author-info">
          <div class="author-name">{post.author.display_name}</div>
          <div class="author-handle">@{post.author.handle}</div>
        </div>
      </div>

      <div class="post-text">{post.text}</div>

      {#if post.labels.length > 0}
      <div class="labels-row">
        {#each post.labels as label}
        {@const lb = labelers[label.labeler]}
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
      </div>
    </article>
    {/each}

  </main>

  <!-- Right panel -->
  <aside class="right-panel">
    <div class="panel-card">
      <h3>About this profile</h3>
      <p>Labels from subscribed labelers appear here — the same labels shown on posts from this account in the feed.</p>
      <p>Clients decide which labelers to subscribe to and how prominently to surface their labels.</p>
    </div>
  </aside>

</div>

<style>
  .profile-cover {
    height: 160px;
    background: linear-gradient(135deg, #1a1a2e 0%, #4f46e5 60%, #818cf8 100%);
    border-radius: var(--radius);
    margin-bottom: 0;
  }

  .profile-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 4px;
    margin-top: -36px;
    margin-bottom: 12px;
  }

  .profile-avatar-wrap {
    border: 4px solid var(--bg);
    border-radius: 50%;
  }

  .profile-avatar {
    width: 72px;
    height: 72px;
    font-size: 26px;
  }

  .profile-actions {
    display: flex;
    gap: 8px;
    margin-top: 44px;
  }

  .btn-follow {
    padding: 8px 18px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 700;
    background: var(--text-primary);
    color: white;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  .btn-more {
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 700;
    background: transparent;
    color: var(--text-primary);
    border: 1px solid var(--border);
    cursor: pointer;
    font-family: inherit;
  }

  .profile-identity {
    padding: 0 4px;
    margin-bottom: 16px;
  }

  .profile-display-name {
    font-size: 22px;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 2px;
  }

  .profile-handle {
    font-size: 14px;
    color: var(--text-secondary);
    margin-bottom: 10px;
  }

  .profile-bio {
    font-size: 15px;
    color: var(--text-primary);
    line-height: 1.6;
    margin-bottom: 10px;
  }

  .profile-stats {
    display: flex;
    gap: 16px;
    font-size: 14px;
    color: var(--text-secondary);
  }

  .stat-label { color: var(--text-muted); }

  .profile-labels-section {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 14px 16px;
    margin-bottom: 12px;
  }

  .profile-labels-heading {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .08em;
    color: var(--text-muted);
    margin-bottom: 10px;
  }

  .profile-tabs {
    display: flex;
    border-bottom: 1px solid var(--border);
    margin-bottom: 8px;
  }

  .tab {
    padding: 12px 16px;
    font-size: 15px;
    font-weight: 500;
    color: var(--text-secondary);
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    cursor: pointer;
    font-family: inherit;
    transition: color .15s;
  }

  .tab.active {
    color: var(--text-primary);
    font-weight: 700;
    border-bottom-color: var(--text-primary);
  }

  .tab:hover:not(.active) { color: var(--text-primary); }

  .sidebar-user-info { flex: 1; min-width: 0; }
</style>
