/**
 * Tooltip behavior, shared by the HTML version (initTooltips) and the React component (bindTooltip).
 *
 *   <button class="x-icon-button" aria-label="Copy address" data-x-tooltip="tip-copy">…</button>
 *   <div class="x-tooltip" id="tip-copy" popover="manual" aria-hidden="true">Copy address</div>
 *
 * - shows at once on hover and on keyboard focus
 * - hides on pointer leave, blur, Esc and click
 * - sits on its data-placement side (top by default, or bottom, left, right), centered; flips when there is no
 *   room (a side tooltip moves above or below on narrow screens); stays inside the viewport and follows scrolling
 */

import { onViewportChange, placeElement } from "../../core/place.js";

/**
 * @param {HTMLElement} trigger
 * @param {HTMLElement} tip
 * @returns {() => void} cleanup
 */
export function bindTooltip(trigger, tip) {
  const place = () => {
    const pos = placeElement(tip, trigger, { side: tip.dataset.placement || "top", align: "center", gap: 9, arrowInset: 12 });
    tip.dataset.side = pos.side;
    // The arrow points at the trigger's center, kept off the rounded corners.
    tip.style.setProperty("--x-tooltip-arrow", `${pos.arrow}px`);
  };
  const show = () => {
    if (tip.matches(":popover-open")) return;
    tip.showPopover();
    place();
  };
  const hide = () => {
    if (!tip.matches(":popover-open")) return;
    tip.hidePopover();
  };
  const onFocus = () => { if (trigger.matches(":focus-visible")) show(); };
  const onKey = (event) => { if (event.key === "Escape") hide(); };
  const stopWatching = onViewportChange(() => { if (tip.matches(":popover-open")) place(); });

  trigger.addEventListener("pointerenter", show);
  trigger.addEventListener("pointerleave", hide);
  trigger.addEventListener("focus", onFocus);
  trigger.addEventListener("blur", hide);
  trigger.addEventListener("click", hide);
  trigger.addEventListener("keydown", onKey);
  return () => {
    hide();
    stopWatching();
    trigger.removeEventListener("pointerenter", show);
    trigger.removeEventListener("pointerleave", hide);
    trigger.removeEventListener("focus", onFocus);
    trigger.removeEventListener("blur", hide);
    trigger.removeEventListener("click", hide);
    trigger.removeEventListener("keydown", onKey);
  };
}

/**
 * Binds every [data-x-tooltip] trigger under root to the tooltip it names.
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initTooltips(root = document) {
  const cleanups = [];
  for (const trigger of root.querySelectorAll("[data-x-tooltip]:not([data-x-ready])")) {
    const tip = document.getElementById(trigger.getAttribute("data-x-tooltip") ?? "");
    if (!tip?.classList.contains("x-tooltip")) continue;
    trigger.setAttribute("data-x-ready", "");
    cleanups.push(bindTooltip(/** @type {HTMLElement} */ (trigger), tip));
  }
  return () => cleanups.forEach((fn) => fn());
}
