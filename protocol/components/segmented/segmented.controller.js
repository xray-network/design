import { scrollStrip, trackIndicator } from "../../core/motion.js";

/**
 * Enhances every .x-segmented under root with the liquid indicator. When the next element is .x-segmented-panels,
 * the panel whose data-value matches the selected option shows; a <template data-lazy> in it renders on first show.
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
    const strip = scrollStrip(el);
    const panels = el.nextElementSibling?.classList.contains("x-segmented-panels") ? el.nextElementSibling : null;
    const showPanel = () => {
      const value = el.querySelector(":scope > .x-segmented-item > input:checked")?.getAttribute("value");
      for (const panel of panels?.querySelectorAll(":scope > .x-segmented-panel") ?? []) {
        panel.hidden = panel.getAttribute("data-value") !== value;
        if (!panel.hidden) for (const t of panel.querySelectorAll("template[data-lazy]")) t.replaceWith(t.content.cloneNode(true));
      }
    };
    showPanel();
    const onChange = () => { tracker.update(); showPanel(); };
    const onReset = () => requestAnimationFrame(tracker.update); // form reset restores checked state after the event
    el.addEventListener("change", onChange);
    el.closest("form")?.addEventListener("reset", onReset);
    cleanups.push(() => {
      tracker.destroy();
      strip.destroy();
      el.removeEventListener("change", onChange);
      el.closest("form")?.removeEventListener("reset", onReset);
      delete el.dataset.xReady;
    });
  }
  return () => cleanups.forEach((fn) => fn());
}
