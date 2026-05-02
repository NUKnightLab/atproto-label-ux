<script>
  import BookwatcherDetail from '$lib/components/BookwatcherDetail.svelte';
  import OpenLibraryDetail from '$lib/components/OpenLibraryDetail.svelte';
  import ScholarwatchDetail from '$lib/components/ScholarwatchDetail.svelte';
  let { data } = $props();
</script>

{#if data.labeler_id === 'bookwatcher'}
  <BookwatcherDetail {data} />
{:else if data.labeler_id === 'openlibrary'}
  <OpenLibraryDetail {data} />
{:else if data.labeler_id === 'scholarwatch'}
  <ScholarwatchDetail {data} />
{/if}
