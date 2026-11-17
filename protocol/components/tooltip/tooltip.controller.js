/**
 * Tooltip behavior, shared by the HTML version (initTooltips) and the React component (bindTooltip).
 *
 *   <button class="x-icon-button" aria-label="Copy address" data-x-tooltip="tip-copy">…</button>
 *   <div class="x-tooltip" id="tip-copy" popover="manual" aria-hidden="true">Copy address</div>
 *
 * - shows at once on hover and on keyboard focus
 * - hides on pointer leave, blur, Esc and click
 * - sits above the trigger, centered; flips below near the top edge; stays inside the viewport
 */

/**
 * @param {HTMLElement} trigger
 * @param {HTMLElement} tip
 * @returns {() => void} cleanup
 */
export function bindTooltip(trigger, tip) {
  const place = () => {
    const t = trigger.getBoundingClientRect();
    const r = tip.getBoundingClientRect();
    const gap = 6, edge = 8;
    const above = t.top - gap - r.height >= edge;
    tip.dataset.side = above ? "top" : "bottom";
    tip.style.top = `${Math.round(above ? t.top - gap - r.height : t.bottom + gap)}px`;
    tip.style.left = `${Math.round(Math.min(Math.max(edge, t.left + t.width / 2 - r.width / 2), innerWidth - edge - r.width))}px`;
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

  trigger.addEventListener("pointerenter", show);
  trigger.addEventListener("pointerleave", hide);
  trigger.addEventListener("focus", onFocus);
  trigger.addEventListener("blur", hide);
  trigger.addEventListener("click", hide);
  trigger.addEventListener("keydown", onKey);
  return () => {
    hide();
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
