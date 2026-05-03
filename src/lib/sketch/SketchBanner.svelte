<script>
  import { fly, fade, slide } from 'svelte/transition';
  import { marked } from 'marked';

  import { sectionContent } from './content/index.js';

  function sectionBody(id) {
    return sectionContent[id] ? marked(sectionContent[id]) : '';
  }

  let { sketch, showBack = false, backLabel = '← Back', backHref = '/', thisPage = undefined } = $props();
  let drawerOpen = $state(false);
  let openSection = $state('this-page');

  function openDrawer() {
    drawerOpen = true;
    openSection = 'this-page';
  }

  function toggle(id) {
    openSection = openSection === id ? null : id;
  }
</script>

<div class="sb-bar">
  <span class="sb-left">
    {#if showBack}
      <a class="sb-back" href={backHref}>{backLabel}</a>
    {/if}
  </span>
  <button class="sb-center" data-real onclick={openDrawer}>
    {sketch.title}
    <span class="sb-info">ⓘ</span>
  </button>
  <span class="sb-right"></span>
</div>
<div class="sb-spacer"></div>

{#if drawerOpen}
<div class="sb-overlay" role="button" tabindex="-1" transition:fade={{ duration: 200 }} style="pointer-events: {drawerOpen ? 'auto' : 'none'}" onclick={() => drawerOpen = false} onkeydown={(e) => e.key === 'Escape' && (drawerOpen = false)}></div>
<div class="sb-drawer" transition:fly={{ x: 360, duration: 250, opacity: 1 }}>
  <div class="sb-head">
    <span class="sb-head-title">{sketch.title}</span>
    <button class="sb-close" data-real onclick={() => drawerOpen = false}>✕</button>
  </div>

  <div class="sb-body">
    <p class="sb-lede">{sketch.lede}</p>
    {#if sketch.callout}
      <div class="sb-callout">{sketch.callout}</div>
    {/if}

    <div class="sb-accordion">

      {#each sketch.sections as section}
      {#if !section.thisPage || thisPage}
      <div class="sb-item">
        <button class="sb-trigger" data-real onclick={() => toggle(section.id)}>
          {section.header}
          <span class="sb-arrow" class:open={openSection === section.id}>▶</span>
        </button>
        {#if openSection === section.id}
        <div class="sb-content" class:sb-this-page={section.thisPage} transition:slide={{ duration: 200 }}>
          {#if section.thisPage}
            {@render thisPage()}
          {:else}
            {@html sectionBody(section.id)}
          {/if}
        </div>
        {/if}
      </div>
      {/if}
      {/each}

    </div>
  </div>
</div>
{/if}

<style>
  .sb-bar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    background: #e8f1ff;
    border-bottom: 1px solid #bfdbfe;
    height: 30px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    font-size: 11px;
  }

  .sb-spacer { height: 30px; flex-shrink: 0; }

  .sb-left { flex: 1; display: flex; align-items: center; }
  .sb-right { flex: 1; }

  .sb-back {
    color: #2563eb;
    font-weight: 600;
    text-decoration: none;
  }
  .sb-back:hover { color: #1d4ed8; }

  .sb-center {
    flex: 1;
    font-weight: 700;
    color: #1e3a5f;
    letter-spacing: .05em;
    text-transform: uppercase;
    font-size: 10px;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 0;
    font-family: inherit;
    transition: opacity .15s;
  }
  .sb-center:hover { opacity: .7; }

  .sb-info {
    font-size: 11px;
    color: #3b82f6;
    text-transform: none;
    letter-spacing: 0;
    opacity: .75;
    font-style: normal;
  }

  /* Overlay + drawer */
  .sb-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.25);
    z-index: 999;
  }

  .sb-drawer {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: 360px;
    background: #fff;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    box-shadow: -4px 0 24px rgba(0,0,0,.15);
    overflow: hidden;
  }

  .sb-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    background: #e8f1ff;
    border-bottom: 1px solid #bfdbfe;
    flex-shrink: 0;
  }

  .sb-head-title {
    font-size: 11px;
    font-weight: 700;
    color: #1e3a5f;
    letter-spacing: .05em;
    text-transform: uppercase;
  }

  .sb-close {
    background: none;
    border: none;
    cursor: pointer;
    color: #64748b;
    font-size: 16px;
    padding: 2px 6px;
    border-radius: 4px;
    line-height: 1;
    transition: background .15s;
  }
  .sb-close:hover { background: #dbeafe; color: #1e3a5f; }

  .sb-body {
    flex: 1;
    overflow-y: auto;
    padding: 20px 20px 32px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    font-size: 13px;
    line-height: 1.65;
    color: #374151;
  }

  .sb-lede {
    font-size: 14px;
    color: #1e3a5f;
    line-height: 1.6;
    margin: 0;
  }

  .sb-callout {
    background: #eff6ff;
    border-left: 3px solid #3b82f6;
    padding: 10px 14px;
    border-radius: 0 6px 6px 0;
    font-weight: 700;
    font-size: 13px;
    color: #1e40af;
    font-style: italic;
  }

  /* Accordion */
  .sb-accordion {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
  }

  .sb-item {
    border-bottom: 1px solid #e2e8f0;
  }
  .sb-item:last-child { border-bottom: none; }

  .sb-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    color: #1e3a5f;
    text-align: left;
    font-family: inherit;
    transition: background .12s;
  }
  .sb-trigger:hover { background: #f5f8ff; }

  .sb-arrow {
    font-size: 9px;
    color: #94a3b8;
    transition: transform .18s;
    display: inline-block;
    flex-shrink: 0;
  }
  .sb-arrow.open { transform: rotate(90deg); }

  .sb-content {
    padding: 2px 14px 14px;
    font-size: 13px;
    color: #374151;
    line-height: 1.65;
  }

  /* Shared content styles — use :global since content is injected via {@html} or {@render} */
  .sb-content :global(ol) {
    padding-left: 18px;
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin: 0;
  }
  .sb-content :global(p) { margin: 0 0 8px; }
  .sb-content :global(p:last-child) { margin-bottom: 0; }
  .sb-content :global(code) {
    font-family: "SFMono-Regular", Consolas, monospace;
    font-size: 11px;
    background: #f1f5f9;
    padding: 1px 5px;
    border-radius: 3px;
    color: #1e3a5f;
  }
  .sb-content :global(strong) { color: #1e3a5f; }

  /* "This page" section gets slightly warmer bg to distinguish it */
  .sb-this-page {
    background: #fafbff;
  }
</style>
