import { getFeed, LABELERS, AUTHOR_PROFILES } from '$lib/data.js';

export function load() {
  return { posts: getFeed(), labelers: LABELERS, authorProfiles: AUTHOR_PROFILES };
}
