import { getLabelDetail, LABELERS } from '$lib/data.js';
import { error } from '@sveltejs/kit';

export function load({ params }) {
  const detail = getLabelDetail(params.labeler_id, params.post_id);
  if (!detail) throw error(404, 'Not found');
  return { ...detail, labelers: LABELERS, labeler_id: params.labeler_id };
}
