<script>
  let { children } = $props();
</script>

<div class="design-annotation">
  <span class="annotation-label">📐 prototype annotation</span>
  {@render children()}
</div>

<style>
  .design-annotation {
    margin-top: 28px;
    padding: 14px 18px;
    border: 1.5px dashed #cbd5e1;
    border-radius: 6px;
    background: #fefce8;
    font-size: 11.5px;
    color: #78716c;
    position: relative;
    line-height: 1.65;
  }
  .annotation-label {
    position: absolute;
    top: -10px;
    left: 14px;
    background: #fefce8;
    padding: 0 8px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .08em;
    color: #a8a29e;
  }
  :global(.design-annotation code) {
    font-family: "SFMono-Regular", Consolas, monospace;
    font-size: 11px;
    background: rgba(0, 0, 0, .07);
    padding: 1px 5px;
    border-radius: 3px;
  }
</style>
