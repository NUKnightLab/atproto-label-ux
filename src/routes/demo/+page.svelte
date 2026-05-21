<script>
  import { SketchBanner, DesignAnnotation } from '$lib/sketch';
  import { sketchConfig } from './sketchConfig.js';

  let toast = $state(null);
  let toastTimer;

  function showToast(msg) {
    clearTimeout(toastTimer);
    toast = msg;
    toastTimer = setTimeout(() => toast = null, 2500);
  }
</script>

<SketchBanner sketch={sketchConfig}>
  {#snippet thisPage()}
    <p>A live demonstration of the three sketch system components: the bar and drawer you're looking at now, design annotation boxes, and wiggle feedback on unimplemented UI elements.</p>
  {/snippet}
</SketchBanner>

{#if toast}
  <div class="toast">{toast}</div>
{/if}

<div class="demo-layout">

  <h1 class="demo-title">UX Sketch System</h1>
  <p class="demo-subtitle">Click the bar at the top to open the sketch drawer. The three components are demonstrated below.</p>

  
  <!-- ── 1. Sketch banner (meta) ────────────────────────────── -->
  <section class="demo-section">
    <h2>Sketch bar and drawer</h2>
    <p class="demo-prose">The fixed bar at the top labels the sketch and opens the drawer. The drawer provides more explanation about the concepts the sketch illustrates. It has a lede, an optional callout, a welcome lightbox (the "more" link), and an accordion of sections — all driven by <code>sketchConfig.js</code>.</p>

    <div class="demo-card demo-config-preview">
      <div class="config-label">sketchConfig.js</div>
<pre><code>import welcome from './content/welcome.md?raw';
import whatsASketch from './content/whats-a-sketch.md?raw';

export const sketchConfig = &#123;
  title: 'My Sketch',
  lede: 'One sentence describing the concept.',
  welcome,          // lightbox content
  callout: '', // omit or leave blank if you don't need it
  sections: [
    &#123; id: 'this-page', header: 'This page', thisPage: true &#125;,
    &#123; id: 'concept',   header: 'The concept', content: whatsASketch &#125;,
  ]
&#125;;</code></pre>
    </div>

    <DesignAnnotation>
      Each section with <code>thisPage: true</code> renders a <code>&#123;#snippet thisPage()&#125;</code> from the page that uses the banner — so page-specific "what you're looking at" notes live in the page file, not in the config.
    </DesignAnnotation>
  </section>

  <!-- ── 2. DesignAnnotation ────────────────────────────────── -->
  <section class="demo-section">
    <h2>Design annotation</h2>
    <p class="demo-prose">Use <code>&lt;DesignAnnotation&gt;</code> to add inline design notes. They're visually distinct from UI content — clearly prototype scaffolding, not part of the experience being sketched.</p>

    <div class="demo-card">
      <p style="font-size: 14px; color: #6b7280;">Some UI content being sketched out…</p>
      <div style="height: 48px; background: #f3f4f6; border-radius: 8px; margin-top: 12px; display: flex; align-items: center; justify-content: center; color: #9ca3af; font-size: 13px;">[placeholder area]</div>
    </div>

    <DesignAnnotation>
      This is a <code>&lt;DesignAnnotation&gt;</code>. Use it to explain intent, flag open questions, or note what's not yet implemented. Accepts any Svelte children — plain text, <strong>bold</strong>, or inline code all work.
    </DesignAnnotation>
  </section>


  <!-- ── 3. Wiggle ───────────────────────────────────────────── -->
  <section class="demo-section">
    <h2>Wiggle feedback</h2>
    <p class="demo-prose">Unimplemented UI elements wiggle when clicked. Add <code>data-real</code> to any button or link you've actually wired up — everything else wiggles automatically.</p>

    <div class="demo-card">
      <div class="demo-card-header">
        <div class="demo-avatar">JG</div>
        <div>
          <div class="demo-name">Jane Goodpost</div>
          <div class="demo-handle">@jane.bsky.social · 2h</div>
        </div>
      </div>
      <p class="demo-post-text">Just finished an incredible book. Highly recommend to anyone interested in the intersection of technology and society.</p>
      <div class="demo-actions">
        <button>💬 Reply</button>
        <button>🔁 Repost</button>
        <button>❤️ Like</button>
        <button data-real style="color: #2563eb; font-weight: 600;" onclick={() => showToast('data-real buttons do things — no wiggle')}>⋯ More (real)</button>
      </div>
    </div>

    <DesignAnnotation>
      The first three action buttons have no <code>data-real</code> attribute — they wiggle. The fourth has <code>data-real</code> and a real handler, so it shows a toast instead. The wiggle handler is attached to <code>document.body</code> in the layout, so no per-element setup is needed.
    </DesignAnnotation>
  </section>
</div>

<style>
  .toast {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background: #111827;
    color: #fff;
    font-size: 13px;
    padding: 10px 18px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,.25);
    z-index: 2000;
    pointer-events: none;
    white-space: nowrap;
  }

  .demo-layout {
    max-width: 640px;
    margin: 0 auto;
    padding: 32px 20px 64px;
  }

  .demo-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 8px;
    color: #111827;
  }

  .demo-subtitle {
    font-size: 15px;
    color: #6b7280;
    margin-bottom: 36px;
    line-height: 1.6;
  }

  .demo-section {
    margin-bottom: 48px;
  }

  .demo-section h2 {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .07em;
    color: #9ca3af;
    margin-bottom: 8px;
  }

  .demo-prose {
    font-size: 14px;
    color: #374151;
    line-height: 1.65;
    margin-bottom: 16px;
  }

  .demo-prose code, .demo-section :global(code) {
    font-family: "SFMono-Regular", Consolas, monospace;
    font-size: 12px;
    background: #f1f5f9;
    padding: 1px 5px;
    border-radius: 3px;
    color: #1e3a5f;
  }

  .demo-card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 0;
  }

  .demo-card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .demo-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #6366f1;
    color: white;
    font-size: 13px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .demo-name { font-size: 15px; font-weight: 600; color: #111827; }
  .demo-handle { font-size: 13px; color: #6b7280; }

  .demo-post-text {
    font-size: 15px;
    line-height: 1.6;
    color: #111827;
    margin-bottom: 12px;
  }

  .demo-actions {
    display: flex;
    gap: 8px;
    padding-top: 10px;
    border-top: 1px solid #e5e7eb;
  }

  .demo-actions button {
    font-size: 13px;
    color: #6b7280;
    padding: 4px 8px;
    border-radius: 6px;
    transition: background .12s, color .12s;
  }

  .demo-actions button:hover { background: #f3f4f6; color: #111827; }

  /* Code preview card */
  .demo-config-preview {
    background: #1e1e2e;
    border-color: #313244;
    padding: 0;
    overflow: hidden;
    position: relative;
  }

  .config-label {
    font-size: 11px;
    font-weight: 600;
    color: #6c7086;
    padding: 10px 16px 6px;
    letter-spacing: .05em;
    font-family: "SFMono-Regular", Consolas, monospace;
  }

  .demo-config-preview pre {
    margin: 0;
    padding: 0 16px 16px;
    overflow-x: auto;
  }

  .demo-config-preview code {
    font-family: "SFMono-Regular", Consolas, monospace;
    font-size: 12.5px;
    line-height: 1.7;
    color: #cdd6f4;
    background: none;
    padding: 0;
    border-radius: 0;
  }
</style>
