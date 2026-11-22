import { scrollStrip, trackIndicator } from "../../core/motion.js";

/**
 * LiquidIndicator for plain HTML: adds the pill to a group and keeps it under the current item.
 *
 *   <div class="x-liquid-indicator" role="group" aria-label="View">
 *     <button class="x-liquid-indicator-item" aria-current="true">Day</button>
 *     <button class="x-liquid-indicator-item">Week</button>
 *   </div>
 *
 * A click on a button item makes it the current one and fires "change" with detail.index. Links are left alone: set
 * aria-current="page" from the route, then call the returned update().
 *
 * @param {HTMLElement} root
 * @returns {{ update: () => void, destroy: () => void }}
 */
export function bindLiquidIndicator(root) {
  let pill = root.querySelector(":scope > .x-liquid-indicator-pill");
  if (!pill) {
    pill = document.createElement("span");
    pill.className = "x-liquid-indicator-pill";
    pill.setAttribute("aria-hidden", "true");
    root.append(pill);
  }
  const items = () => [...root.querySelectorAll(":scope > .x-liquid-indicator-item")];
  const tracker = trackIndicator(root, () => root.querySelector(":scope > .x-liquid-indicator-item[aria-current]"));
  const strip = scrollStrip(root);
  const onClick = (event) => {
    const item = /** @type {Element} */ (event.target).closest(".x-liquid-indicator-item");
    if (!item || item.parentElement !== root || item.matches("a[href], :disabled") || item.hasAttribute("aria-current")) return;
    for (const other of items()) other.removeAttribute("aria-current");
    item.setAttribute("aria-current", "true");
    tracker.update();
    root.dispatchEvent(new CustomEvent("change", { detail: { index: items().indexOf(item) }, bubbles: true }));
  };
  root.addEventListener("click", onClick);
  return {
    update: tracker.update,
    destroy: () => { tracker.destroy(); strip.destroy(); root.removeEventListener("click", onClick); },
  };
}

/**
 * Binds every .x-liquid-indicator under root.
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initLiquidIndicators(root = document) {
  const bound = [];
  for (const el of root.querySelectorAll(".x-liquid-indicator:not([data-x-ready])")) {
    el.setAttribute("data-x-ready", "");
    bound.push(bindLiquidIndicator(/** @type {HTMLElement} */ (el)));
  }
  return () => bound.forEach((b) => b.destroy());
}
