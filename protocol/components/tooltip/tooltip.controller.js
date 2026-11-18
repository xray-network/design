/**
 * Tooltip behavior, shared by the HTML version (initTooltips) and the React component (bindTooltip).
 *
 *   <button class="x-icon-button" aria-label="Copy address" data-x-tooltip="tip-copy">…</button>
 *   <div class="x-tooltip" id="tip-copy" popover="manual" aria-hidden="true">Copy address</div>
 *
 * - shows at once on hover and on keyboard focus
 * - hides on pointer leave, blur, Esc and click
 * - sits on its data-placement side (top by default, or bottom, left, right), centered; flips to the opposite
 *   side when there is no room; stays inside the viewport
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
    const gap = 9, edge = 8, inset = 12;
    const want = tip.dataset.placement || "top";
    const fits = {
      top: t.top - gap - r.height >= edge,
      bottom: t.bottom + gap + r.height <= innerHeight - edge,
      left: t.left - gap - r.width >= edge,
      right: t.right + gap + r.width <= innerWidth - edge,
    };
    const opposite = { top: "bottom", bottom: "top", left: "right", right: "left" };
    const side = fits[want] || !fits[opposite[want]] ? want : opposite[want];
    tip.dataset.side = side;
    const clamp = (v, min, max) => Math.min(Math.max(min, v), Math.max(min, max));
    // The arrow points at the trigger's center, kept off the rounded corners.
    if (side === "top" || side === "bottom") {
      const left = Math.round(clamp(t.left + t.width / 2 - r.width / 2, edge, innerWidth - edge - r.width));
      tip.style.top = `${Math.round(side === "top" ? t.top - gap - r.height : t.bottom + gap)}px`;
      tip.style.left = `${left}px`;
      tip.style.setProperty("--x-tooltip-arrow", `${Math.round(clamp(t.left + t.width / 2 - left, inset, r.width - inset))}px`);
    } else {
      const top = Math.round(clamp(t.top + t.height / 2 - r.height / 2, edge, innerHeight - edge - r.height));
      tip.style.top = `${top}px`;
      tip.style.left = `${Math.round(side === "left" ? t.left - gap - r.width : t.right + gap)}px`;
      tip.style.setProperty("--x-tooltip-arrow", `${Math.round(clamp(t.top + t.height / 2 - top, inset, r.height - inset))}px`);
    }
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
