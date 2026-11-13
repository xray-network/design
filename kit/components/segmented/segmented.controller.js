import { trackIndicator } from "../../core/motion.js";

/**
 * Enhances every .x-segmented under root with the liquid indicator.
 * Safe to call again after new markup is added; already enhanced controls are skipped.
 *
 *   import { initSegmented } from "./segmented.controller.js";
 *   initSegmented();
 *
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initSegmented(root = document) {
  const cleanups = [];
  for (const el of root.querySelectorAll(".x-segmented:not([data-x-ready])")) {
    el.dataset.xReady = "";
    let indicator = el.querySelector(":scope > .x-segmented-indicator");
    if (!indicator) {
      indicator = document.createElement("span");
      indicator.className = "x-segmented-indicator";
      indicator.setAttribute("aria-hidden", "true");
      el.append(indicator);
    }
    const tracker = trackIndicator(el, () => el.querySelector(":scope > .x-segmented-item:has(input:checked)"));
    const onChange = () => tracker.update();
    const onReset = () => requestAnimationFrame(tracker.update); // form reset restores checked state after the event
    el.addEventListener("change", onChange);
    el.closest("form")?.addEventListener("reset", onReset);
    cleanups.push(() => {
      tracker.destroy();
      el.removeEventListener("change", onChange);
      el.closest("form")?.removeEventListener("reset", onReset);
      delete el.dataset.xReady;
    });
  }
  return () => cleanups.forEach((fn) => fn());
}
