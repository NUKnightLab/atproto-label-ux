# UX Sketch System — Agent Guide

You are helping implement a UX sketch using a small Svelte toolkit. A sketch is a prototype meant to communicate a design concept clearly — not to be production-ready. Your job is to build something that *looks and feels* like the experience being described, using the conventions below. The human should not need to tell you when to use these tools; apply your judgment based on what's implemented vs. what's faked.

## What the library provides

Three exports from `$lib/sketch` (or wherever the library was copied to):

- **`SketchBanner`** — A fixed top bar + slide-out drawer that labels the sketch and provides context. Every sketch page uses this.
- **`DesignAnnotation`** — A dashed callout box for inline design notes. Use it to explain intent, flag open questions, or note what's deliberately unimplemented.
- **`handleFauxClick`** — A body-level click handler. Wire it up once in the root layout; after that it works automatically on every page.

## Setting up a new sketch

### 1. Global layout (once per project)

Your root `+layout.svelte` needs two things:

```svelte
<script>
  import { handleFauxClick } from '$lib/sketch';
</script>

<svelte:body onclick={handleFauxClick} />
{@render children()}
```

And your global CSS needs the wiggle keyframes (copy this block):

```css
@keyframes wiggle {
  0%, 100% { transform: translateX(0) rotate(0deg); }
  25%       { transform: translateX(-5px) rotate(-1.5deg); }
  60%       { transform: translateX(5px) rotate(1.5deg); }
  85%       { transform: translateX(-3px) rotate(-0.75deg); }
}
.wiggling { animation: wiggle 0.35s ease-in-out; }
```

### 2. Sketch config (once per sketch)

Create a `sketchConfig.js` alongside your page file. This is the single file that configures everything in the banner and drawer. Import your markdown files and export a config object:

```js
import welcome from './content/welcome.md?raw';
import conceptContent from './content/concept.md?raw';
import detailsContent from './content/details.md?raw';

export const sketchConfig = {
  title: 'My Sketch Title',
  lede: 'One sentence describing the concept being explored.',
  callout: '',        // optional — a short highlighted note shown above the accordion
  welcome,            // shown in the lightbox when the user clicks "more" in the lede
  sections: [
    { id: 'this-page', header: 'This page', thisPage: true },  // always include this
    { id: 'concept',   header: 'The concept',  content: conceptContent },
    { id: 'details',   header: 'More details', content: detailsContent },
  ] // sections after this-page would be sketch specific and provide places to briefly explain key concepts for the sketch
};
```

Write the markdown files yourself — don't ask the human to write them. Draw on what they've described about the concept and what the sketch is trying to show. When useful,`welcome.md` can be 2–5 sentences giving a plain-language overview beyond the lede and sections, but it can be omitted. Section files should be 1–3 short paragraphs each.

### 3. Page structure

```svelte
<script>
  import { SketchBanner, DesignAnnotation } from '$lib/sketch';
  import { sketchConfig } from './sketchConfig.js';
</script>

<SketchBanner sketch={sketchConfig}>
  {#snippet thisPage()}
    <p>Describe what this specific page shows — what the user is looking at and what they can interact with.</p>
  {/snippet}
</SketchBanner>

<!-- your sketch content here -->
```

For sub-pages (detail views, etc.), pass `showBack`, `backLabel`, and `backHref` to the banner:

```svelte
<SketchBanner sketch={sketchConfig} showBack backLabel="← Home" backHref="/">
```

## The `data-real` convention

This is the most important convention. **Every `<button>` and `<a href="#">` that you haven't actually implemented must not have `data-real`.** The wiggle handler targets those elements automatically. For anything you have implemented — navigation links, the banner open button, dismiss buttons — add `data-real`:

```svelte
<button data-real onclick={doSomething}>This actually works</button>
<button>This wiggles — clearly unimplemented</button>
<a href="/real-route" data-real>Real link</a>
<a href="#">Dead link — will wiggle</a>
```

Apply this judgment without being asked: if you've wired up a handler, add `data-real`. If it's a placeholder UI element, omit it.

## When to use `DesignAnnotation`

Use it when something on the page needs explanation that isn't obvious from the UI itself:

- A placeholder area where real content would go
- A UI pattern that's intentionally simplified
- An interaction that's faked or omitted, with a note about what it would do
- An open design question worth surfacing to reviewers

Don't use it to explain things that are already clear from context. One or two annotations per screen is usually right; more than three is probably too many.

```svelte
<DesignAnnotation>
  In production this would show real-time inventory. For the sketch,
  availability is randomized on page load.
</DesignAnnotation>
```

It accepts any Svelte children — plain text, `<strong>`, inline `<code>`, etc.

## Reference implementation

The `/demo` route in this project is itself a sketch built with this system. Read `src/routes/demo/+page.svelte` and `src/routes/demo/sketchConfig.js` as a working example of all three components in use.

The `src/routes/` directory for the main sketch (`/`) shows a more complex example with multiple routes sharing a single `sketchConfig`.
