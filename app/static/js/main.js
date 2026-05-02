/* Avatar color palette — deterministic from seed string */
const AVATAR_COLORS = [
  "#6366f1","#8b5cf6","#ec4899","#f59e0b",
  "#10b981","#0ea5e9","#ef4444","#14b8a6",
];

function avatarColor(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) & 0xffffffff;
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

function initials(name) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

/* Apply avatar colours on load */
document.querySelectorAll("[data-avatar-seed]").forEach(el => {
  const seed = el.dataset.avatarSeed;
  el.style.background = avatarColor(seed);
});

/* Relative time */
function relativeTime(isoStr) {
  const diff = (Date.now() - new Date(isoStr)) / 1000;
  if (diff < 60)   return `${Math.floor(diff)}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

document.querySelectorAll("[data-created-at]").forEach(el => {
  el.textContent = relativeTime(el.dataset.createdAt);
});

/* Label badge tooltip-style hover hint */
document.querySelectorAll(".label-badge").forEach(badge => {
  badge.title = badge.dataset.tooltip || "";
});
