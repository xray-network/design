/**
 * Popover behavior, shared by the HTML version (initPopovers) and React (bindPopover).
 *
 *   <button popovertarget="fee-info">Fee</button>
 *   <div class="x-popover" id="fee-info" popover role="dialog" aria-labelledby="fee-title">…</div>
 *
 * The Popover API supplies top layer, light dismiss and Esc. This adds placement on the data-placement side (top by
 * default; bottom, left, right), flipped to the opposite side when there is no room, with data-side set to the side
 * it took and --x-popover-arrow to where its arrow meets the trigger's center; aria-expanded on the trigger; initial
 * focus on [data-autofocus]; and focus back to the trigger on close when focus was inside.
 */

/**
 * @param {HTMLElement} trigger
 * @param {HTMLElement} panel
 * @returns {() => void} cleanup
 */
export function bindPopover(trigger, panel) {
  const place = () => {
    const t = trigger.getBoundingClientRect();
    const r = panel.getBoundingClientRect();
    const pos = placeBeside(t, r, panel.dataset.placement || "top", "start", 10);
    panel.dataset.side = pos.side;
    panel.style.top = `${pos.top}px`;
    panel.style.left = `${pos.left}px`;
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
  addEventListener("resize", onViewport);
  addEventListener("scroll", onViewport, true);

  return () => {
    panel.removeEventListener("beforetoggle", onBeforeToggle);
    panel.removeEventListener("toggle", onToggle);
    removeEventListener("resize", onViewport);
    removeEventListener("scroll", onViewport, true);
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

/**
 * Where a floating box goes next to a trigger: on `side` (top, bottom, left, right), flipped to the opposite side
 * when it does not fit, and kept inside the viewport. Above and below it is start-aligned ("start") or centered.
 * `arrow` is where the trigger's center falls along the box's facing edge, kept off the rounded corners.
 * Whole pixels: text at fractional positions is redrawn slightly differently after animations.
 *
 * @param {DOMRect} t   the trigger's box
 * @param {DOMRect} r   the floating box
 * @param {string} side
 * @param {"start" | "center"} [align]
 * @param {number} [gap]  space between trigger and box
 * @returns {{ top: number, left: number, side: string, arrow: number }}
 */
export function placeBeside(t, r, side, align = "center", gap = 6) {
  const edge = 8, inset = 16;
  const fits = {
    top: t.top - gap - r.height >= edge,
    bottom: t.bottom + gap + r.height <= innerHeight - edge,
    left: t.left - gap - r.width >= edge,
    right: t.right + gap + r.width <= innerWidth - edge,
  };
  const opposite = { top: "bottom", bottom: "top", left: "right", right: "left" };
  const s = fits[side] || !fits[opposite[side]] ? side : opposite[side];
  const clamp = (v, min, max) => Math.min(Math.max(min, v), Math.max(min, max));
  if (s === "top" || s === "bottom") {
    const x = align === "start" ? Math.min(t.left, t.left + t.width / 2 - inset) : t.left + t.width / 2 - r.width / 2;
    const left = Math.round(clamp(x, edge, innerWidth - edge - r.width));
    return {
      side: s,
      left,
      top: Math.round(s === "top" ? t.top - gap - r.height : t.bottom + gap),
      arrow: Math.round(clamp(t.left + t.width / 2 - left, inset, r.width - inset)),
    };
  }
  const top = Math.round(clamp(t.top + t.height / 2 - r.height / 2, edge, innerHeight - edge - r.height));
  return {
    side: s,
    top,
    left: Math.round(s === "left" ? t.left - gap - r.width : t.right + gap),
    arrow: Math.round(clamp(t.top + t.height / 2 - top, inset, r.height - inset)),
  };
}
