/**
 * Popover behavior, shared by the HTML version (initPopovers) and React (bindPopover).
 *
 *   <button popovertarget="fee-info">Fee</button>
 *   <div class="x-popover" id="fee-info" popover role="dialog" aria-labelledby="fee-title">…</div>
 *
 * The Popover API supplies top layer, light dismiss and Esc. This adds placement on the data-placement side (top by
 * default; bottom, left, right), flipped when there is no room (a side panel moves above or below on narrow screens),
 * with data-side set to the side it took and --x-popover-arrow to where its arrow meets the trigger's center; aria-expanded on the trigger; initial
 * focus on [data-autofocus]; and focus back to the trigger on close when focus was inside.
 */

import { onViewportChange, placeElement } from "../../core/place.js";

/**
 * @param {HTMLElement} trigger
 * @param {HTMLElement} panel
 * @returns {() => void} cleanup
 */
export function bindPopover(trigger, panel) {
  const place = () => {
    const pos = placeElement(panel, trigger, { side: panel.dataset.placement || "top", align: "start", gap: 10, arrowInset: 16 });
    panel.dataset.side = pos.side;
    panel.style.setProperty("--x-popover-arrow", `${pos.arrow}px`);
  };

  // Before it shows: the requested side, so the entry starts from the right direction.
  const onBeforeToggle = (event) => {
    if (event.newState !== "open") return;
    panel.dataset.side = panel.dataset.placement || "top";
  };

  const onToggle = (event) => {
    const open = event.newState === "open";
    trigger.setAttribute("aria-expanded", String(open));
    if (open) {
      place();
      panel.querySelector("[data-autofocus]")?.focus({ preventScroll: true });
    } else if (panel.contains(document.activeElement) || document.activeElement === document.body) {
      trigger.focus({ preventScroll: true });
    }
  };

  const onViewport = () => { if (panel.matches(":popover-open")) place(); };

  trigger.setAttribute("aria-haspopup", "dialog");
  trigger.setAttribute("aria-expanded", "false");
  panel.addEventListener("beforetoggle", onBeforeToggle);
  panel.addEventListener("toggle", onToggle);
  const stopWatching = onViewportChange(onViewport);

  return () => {
    panel.removeEventListener("beforetoggle", onBeforeToggle);
    panel.removeEventListener("toggle", onToggle);
    stopWatching();
  };
}

/**
 * Binds every trigger under root whose popovertarget is an .x-popover.
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initPopovers(root = document) {
  const cleanups = [];
  for (const trigger of root.querySelectorAll("[popovertarget]:not([data-x-ready]):not([popovertargetaction=hide])")) {
    const panel = document.getElementById(trigger.getAttribute("popovertarget") ?? "");
    if (!panel?.classList.contains("x-popover")) continue;
    trigger.setAttribute("data-x-ready", "");
    cleanups.push(bindPopover(/** @type {HTMLElement} */ (trigger), panel));
  }
  return () => cleanups.forEach((fn) => fn());
}
