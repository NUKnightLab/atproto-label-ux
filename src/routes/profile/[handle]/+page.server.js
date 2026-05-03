import { getProfile, getProfileLabels, getFeed, LABELERS } from '$lib/data.js';
import { error } from '@sveltejs/kit';

export function load({ params }) {
  const profile = getProfile(params.handle);
  if (!profile) throw error(404, 'Profile not found');

  const labels = getProfileLabels(profile.did);
  const posts = getFeed().filter(p => p.author.did === profile.did);

  return { profile, labels, posts, labelers: LABELERS };
}
