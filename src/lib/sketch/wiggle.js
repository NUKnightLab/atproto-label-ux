/**
 * Global click handler for faux UX elements — buttons and dead links that exist
 * for demo verisimilitude but do nothing. Clicking them wiggles to signal
 * "nothing to see here."
 *
 * Exempt real interactive elements by adding data-real to them.
 * The .wiggling class and @keyframes wiggle must be defined globally (app.css).
 */
export function handleFauxClick(e) {
  const target = e.target.closest('a[href="#"], button:not([data-real])');
  if (!target) return;
  e.preventDefault();
  target.classList.remove('wiggling');
  void target.offsetWidth; // force reflow to restart animation
  target.classList.add('wiggling');
  target.addEventListener('animationend', () => target.classList.remove('wiggling'), { once: true });
}
