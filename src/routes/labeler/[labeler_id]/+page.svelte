<script>
  import BookwatcherDetail from '$lib/components/BookwatcherDetail.svelte';
  import BookwatcherAuthorProfile from '$lib/components/BookwatcherAuthorProfile.svelte';
  import OpenLibraryDetail from '$lib/components/OpenLibraryDetail.svelte';
  import ScholarwatchDetail from '$lib/components/ScholarwatchDetail.svelte';
  let { data } = $props();
</script>

{#if data.label.val === 'bookwatcher-book'}
  <BookwatcherDetail {data} />
{:else if data.label.val === 'bookwatcher-author'}
  <BookwatcherAuthorProfile {data} />
{:else if data.labeler_id === 'openlibrary'}
  <OpenLibraryDetail {data} />
{:else if data.labeler_id === 'scholarwatch'}
  <ScholarwatchDetail {data} />
{/if}
