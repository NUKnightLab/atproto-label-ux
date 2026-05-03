import { getLabelDetail, getProfileLabelDetail, LABELERS } from '$lib/data.js';
import { error } from '@sveltejs/kit';

export function load({ params, url }) {
  const postUri = url.searchParams.get('post');
  const profileUri = url.searchParams.get('profile');
  const labelVal = url.searchParams.get('label');

  if (postUri) {
    const detail = getLabelDetail(params.labeler_id, postUri, labelVal);
    if (!detail) throw error(404, 'Not found');
    return { ...detail, labelers: LABELERS, labeler_id: params.labeler_id };
  }

  if (profileUri) {
    const detail = getProfileLabelDetail(params.labeler_id, profileUri, labelVal);
    if (!detail) throw error(404, 'Not found');
    return { ...detail, labelers: LABELERS, labeler_id: params.labeler_id };
  }

  throw error(400, 'Missing post or profile parameter');
}
