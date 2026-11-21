import { duration, easing } from "../../core/motion.js";

/** The replacement in flight for each region, so a new one finishes it first. */
const running = new WeakMap();

/**
 * Replace: the content of a region fades out, changes, and fades in a little lower than where it settles.
 * Nothing but the region's own content moves, and the region keeps its place.
 *
 *   replace(panel, () => { panel.textContent = "Saved"; });
 *
 * The old content leaves on --x-ease (an exit); the new arrives on the soft spring. A change made mid-flight
 * shows at once and the arrival starts again. Reduced motion: the change is instant.
 *
 * @param {HTMLElement} el  the .x-replace region
 * @param {() => void} change  swaps the content: sets text, replaces children, shows another panel
 * @returns {Promise<void>} resolves when the new content has arrived
 */
export async function replace(el, change) {
  running.get(el)?.cancel();
  const out = duration(el, "--x-duration-fast");
  if (!out) { change(); return; }
  el.setAttribute("data-replacing", "");
  const leaving = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: out, easing: easing(el, "--x-ease"), fill: "forwards" });
  running.set(el, leaving);
  try { await leaving.finished; } catch { change(); return; } // cut short by a newer change, which goes on from here
  change();
  const arriving = el.animate([{ opacity: 0, translate: "0 4px" }, { opacity: 1, translate: "0 0" }], { duration: duration(el, "--x-spring-soft-duration"), easing: easing(el, "--x-spring-soft") });
  running.set(el, arriving);
  leaving.cancel();
  el.removeAttribute("data-replacing");
  await arriving.finished.catch(() => {});
}
