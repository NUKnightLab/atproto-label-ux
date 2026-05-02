<script>
  import '../app.css';
  let { children } = $props();

  function handleBodyClick(e) {
    const target = e.target.closest('a[href="#"], button');
    if (!target) return;
    e.preventDefault();
    target.classList.remove('wiggling');
    void target.offsetWidth; // force reflow to restart animation
    target.classList.add('wiggling');
    target.addEventListener('animationend', () => target.classList.remove('wiggling'), { once: true });
  }
</script>

<svelte:body onclick={handleBodyClick} />
{@render children()}
