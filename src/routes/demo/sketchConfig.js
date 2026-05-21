import welcome from './content/welcome.md?raw';
import whatsASketch from './content/whats-a-sketch.md?raw';
import newSketch from './content/new-sketch.md?raw';

export const sketchConfig = {
  title: 'UX Sketch System',
  lede: 'A lightweight Svelte toolkit for presenting interactive UX sketches with contextual explanations, design annotations, and faux-interaction feedback.',
  callout: 'The callout can provide a punchy tag—or leave it out!',
  welcome,
  sections: [
    { id: 'this-page', header: 'This page', thisPage: true },
    { id: 'whats-a-sketch', header: "What's a sketch?", content: whatsASketch },
    { id: 'new-sketch', header: 'Making a new sketch', content: newSketch },
  ]
};
