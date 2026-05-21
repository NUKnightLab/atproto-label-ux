<script>
  import { SketchBanner } from '$lib/sketch';
  import { sketchConfig } from '../sketchConfig.js';
</script>

<SketchBanner sketch={sketchConfig} showBack backLabel="← Demo" backHref="/demo">
  {#snippet thisPage()}
    <p>Step-by-step instructions for creating a new sketch in this system.</p>
  {/snippet}
</SketchBanner>

<div class="guide-layout">
  <h1>Making a new sketch</h1>

  <section>
    <h2>Projects vs. sketches</h2>
    <p>A <strong>project</strong> is the SvelteKit app — the repository, the global layout, the shared CSS. It can contain any number of sketches. You set up the project once.</p>
    <p>A <strong>sketch</strong> is a single design exploration: one route (or a small cluster of related routes) with its own <code>sketchConfig.js</code> and markdown files. Each sketch has a title, a lede, and its own drawer content. You can add as many sketches as you like to the same project — each lives under its own path in <code>src/routes/</code>.</p>
    <p>The steps below are numbered to reflect this split: step 1 is per-project (do it once), steps 2–5 are per-sketch (repeat for each new concept).</p>
  </section>

  <section>
    <h2>Recommended: use AGENT_GUIDE.md</h2>
    <p>The fastest path is to give an AI coding agent (Claude Code, Cursor, etc.) the file <code>src/lib/sketch/AGENT_GUIDE.md</code> as context. It covers every convention and pattern the system uses. The agent can scaffold a new sketch from scratch without further instructions — just describe the concept you want to explore.</p>
  </section>

  <section>
    <h2>1. Global layout <span class="once">(once per project)</span></h2>
    <p>Your root <code>+layout.svelte</code> needs two things:</p>
    <pre><code>&lt;script&gt;
  import &#123; handleFauxClick &#125; from '$lib/sketch';
&lt;/script&gt;

&lt;svelte:body onclick=&#123;handleFauxClick&#125; /&gt;
&#123;@render children()&#125;</code></pre>
    <p>And your global CSS needs the wiggle keyframes:</p>
    <pre><code>@keyframes wiggle &#123;
  0%, 100% &#123; transform: translateX(0) rotate(0deg); &#125;
  25%       &#123; transform: translateX(-5px) rotate(-1.5deg); &#125;
  60%       &#123; transform: translateX(5px) rotate(1.5deg); &#125;
  85%       &#123; transform: translateX(-3px) rotate(-0.75deg); &#125;
&#125;
.wiggling &#123; animation: wiggle 0.35s ease-in-out; &#125;</code></pre>
  </section>

  <section>
    <h2>2. Sketch config <span class="once">(once per sketch)</span></h2>
    <p>Create a <code>sketchConfig.js</code> alongside your page file. Import your markdown files and export a config object:</p>
    <pre><code>import welcome from './content/welcome.md?raw';
import conceptContent from './content/concept.md?raw';

export const sketchConfig = &#123;
  title: 'My Sketch Title',
  lede: 'One sentence describing the concept.',
  callout: '',   // optional highlighted note
  welcome,       // shown in the "more" lightbox
  sections: [
    &#123; id: 'this-page', header: 'This page', thisPage: true &#125;,
    &#123; id: 'concept',   header: 'The concept', content: conceptContent &#125;,
  ]
&#125;;</code></pre>
  </section>

  <section>
    <h2>3. Page structure</h2>
    <pre><code>&lt;script&gt;
  import &#123; SketchBanner, DesignAnnotation &#125; from '$lib/sketch';
  import &#123; sketchConfig &#125; from './sketchConfig.js';
&lt;/script&gt;

&lt;SketchBanner sketch=&#123;sketchConfig&#125;&gt;
  &#123;#snippet thisPage()&#125;
    &lt;p&gt;What this page shows.&lt;/p&gt;
  &#123;/snippet&#125;
&lt;/SketchBanner&gt;

&lt;!-- your sketch content here --&gt;</code></pre>
    <p>For sub-pages, pass <code>showBack</code>, <code>backLabel</code>, and <code>backHref</code> to the banner.</p>
  </section>

  <section>
    <h2>4. The <code>data-real</code> convention</h2>
    <p>Every <code>&lt;button&gt;</code> and <code>&lt;a href="#"&gt;</code> that isn't actually implemented will wiggle on click — no setup needed. Add <code>data-real</code> to anything you've actually wired up:</p>
    <pre><code>&lt;button data-real onclick=&#123;doSomething&#125;&gt;This works&lt;/button&gt;
&lt;button&gt;This wiggles&lt;/button&gt;</code></pre>
  </section>

  <section>
    <h2>5. Design annotations</h2>
    <p>Use <code>&lt;DesignAnnotation&gt;</code> to explain intent, flag open questions, or note what's deliberately unimplemented. One or two per screen is usually right.</p>
    <pre><code>&lt;DesignAnnotation&gt;
  In production this would show real-time data.
  For the sketch, values are randomized on load.
&lt;/DesignAnnotation&gt;</code></pre>
  </section>
</div>

<style>
  .guide-layout {
    max-width: 640px;
    margin: 0 auto;
    padding: 32px 20px 64px;
  }

  h1 {
    font-size: 24px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 36px;
  }

  section {
    margin-bottom: 40px;
  }

  h2 {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .07em;
    color: #9ca3af;
    margin-bottom: 10px;
  }

  .once {
    font-size: 11px;
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0;
    color: #d1d5db;
  }

  p {
    font-size: 14px;
    color: #374151;
    line-height: 1.65;
    margin-bottom: 12px;
  }

  code {
    font-family: "SFMono-Regular", Consolas, monospace;
    font-size: 12px;
    background: #f1f5f9;
    padding: 1px 5px;
    border-radius: 3px;
    color: #1e3a5f;
  }

  pre {
    background: #1e1e2e;
    border-radius: 10px;
    padding: 16px;
    overflow-x: auto;
    margin-bottom: 12px;
  }

  pre code {
    font-size: 12.5px;
    line-height: 1.7;
    color: #cdd6f4;
    background: none;
    padding: 0;
    border-radius: 0;
  }
</style>
