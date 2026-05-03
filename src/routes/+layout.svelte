<script>
  import '../app.css';
  import { handleFauxClick } from '$lib/sketch';
  let { children } = $props();
</script>

<svelte:body onclick={handleFauxClick} />
{@render children()}
