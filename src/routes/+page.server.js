import { getFeed, LABELERS } from '$lib/data.js';

export function load() {
  return { posts: getFeed(), labelers: LABELERS };
}
