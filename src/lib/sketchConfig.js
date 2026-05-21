import welcome from './sketch/content/welcome.md?raw';
import howItWorks from './sketch/content/how-it-works.md?raw';
import multipleLabelersContent from './sketch/content/multiple-labelers.md?raw';
import actionUrl from './sketch/content/action-url.md?raw';
import about from './sketch/content/about.md?raw';

export const sketchConfig = {
  title: 'Labels beyond Moderation',
  lede: 'A UX sketch exploring how AT Protocol labelers could provide much richer experience beyond content warnings.',
  callout: '',
  welcome,
  sections: [
    { id: 'this-page', header: 'This page', thisPage: true },
    { id: 'how-it-works', header: 'How it works', content: howItWorks },
    { id: 'multiple-labelers', header: 'Multiple labelers', content: multipleLabelersContent },
    { id: 'action-url', header: 'Action URL pattern', content: actionUrl },
    { id: 'about', header: 'About this demo', content: about }
  ]
};
