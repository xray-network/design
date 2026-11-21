/**
 * Placement for floating boxes: tooltips, popovers, menus and option lists. No dependencies.
 * One measured path for every browser, so a box lands in the same place in Chrome, Firefox and Safari:
 *
 * - Sizes come from offsetWidth/offsetHeight, which ignore transforms: a box measured while its entry animation
 *   has it scaled down is still placed by its real size.
 * - The room is the visual viewport, so a box stays clear of the on-screen keyboard and inside a zoomed view.
 * - A side with no room flips to the opposite side; a left or right box that fits on neither moves above or below
 *   (a phone is rarely wide enough for a panel beside its trigger); and the box is always kept inside the viewport.
 *
 * The box must be position: fixed (top-layer popovers are); top and left are in viewport pixels.
 */

/** The visible part of the page, in the coordinates fixed boxes and getBoundingClientRect use. */
export function viewportBox() {
  const v = typeof window !== "undefined" ? window.visualViewport : null;
  return v
    ? { left: v.offsetLeft, top: v.offsetTop, right: v.offsetLeft + v.width, bottom: v.offsetTop + v.height }
    : { left: 0, top: 0, right: innerWidth, bottom: innerHeight };
}

const OPPOSITE = { top: "bottom", bottom: "top", left: "right", right: "left" };
const clamp = (v, min, max) => Math.min(Math.max(min, v), Math.max(min, max));

/**
 * Where a box of a given size goes beside an anchor.
 *
 * @param {{ left: number, top: number, right: number, bottom: number, width: number, height: number }} a  the anchor's box
 * @param {{ width: number, height: number }} box  the floating box's layout size
 * @param {{ side?: "top" | "bottom" | "left" | "right", align?: "start" | "center" | "end", gap?: number, edge?: number, arrowInset?: number, flip?: boolean }} [options]
 *   side: the wanted side. align: along that side (above/below: start, center or end; beside: always centered).
 *   gap: space to the anchor. edge: space kept to the viewport. arrowInset: how far an arrow stays from the corners
 *   (also lets a start-aligned box reach back so its arrow can meet a narrow anchor's center). flip: false keeps the side.
 * @returns {{ top: number, left: number, side: "top" | "bottom" | "left" | "right", arrow: number, room: number }}
 *   arrow: where the anchor's center falls along the box's facing edge. room: the space on the chosen side, for a
 *   scrolling box's max-height. Whole pixels: text at fractional positions is redrawn after animations.
 */
export function placeFloating(a, box, { side = "bottom", align = "center", gap = 6, edge = 8, arrowInset = 0, flip = true } = {}) {
  const vp = viewportBox();
  const room = {
    top: a.top - gap - (vp.top + edge),
    bottom: vp.bottom - edge - (a.bottom + gap),
    left: a.left - gap - (vp.left + edge),
    right: vp.right - edge - (a.right + gap),
  };
  const fits = (s) => (s === "top" || s === "bottom" ? box.height : box.width) <= room[s];
  let s = side;
  if (flip && !fits(s)) {
    const vertical = room.bottom >= room.top ? ["bottom", "top"] : ["top", "bottom"];
    // Beside: the other side, then below or above. Above or below: the other one, or whichever has more room.
    const order = s === "left" || s === "right" ? [OPPOSITE[s], ...vertical] : [OPPOSITE[s]];
    s = order.find(fits) ?? (s === "left" || s === "right" ? vertical[0] : room[s] >= room[OPPOSITE[s]] ? s : OPPOSITE[s]);
  }

  if (s === "top" || s === "bottom") {
    const center = a.left + a.width / 2;
    const x = align === "start" ? (arrowInset ? Math.min(a.left, center - arrowInset) : a.left) : align === "end" ? a.right - box.width : center - box.width / 2;
    const left = Math.round(clamp(x, vp.left + edge, vp.right - edge - box.width));
    const top = Math.round(clamp(s === "top" ? a.top - gap - box.height : a.bottom + gap, vp.top + edge, vp.bottom - edge - box.height));
    return { side: s, top, left, arrow: Math.round(clamp(center - left, arrowInset, box.width - arrowInset)), room: Math.floor(room[s]) };
  }
  const middle = a.top + a.height / 2;
  const top = Math.round(clamp(middle - box.height / 2, vp.top + edge, vp.bottom - edge - box.height));
  const left = Math.round(clamp(s === "left" ? a.left - gap - box.width : a.right + gap, vp.left + edge, vp.right - edge - box.width));
  return { side: s, top, left, arrow: Math.round(clamp(middle - top, arrowInset, box.height - arrowInset)), room: Math.floor(room[s]) };
}

/**
 * Measures and places a floating element beside its anchor, and returns where it went.
 *
 * @param {HTMLElement} el  the floating element (position: fixed, displayed)
 * @param {Element} anchor
 * @param {Parameters<typeof placeFloating>[2] & { matchWidth?: boolean, fitHeight?: boolean }} [options]
 *   matchWidth: at least as wide as the anchor (option lists). fitHeight: cap the height to the room on its side,
 *   so a long list scrolls inside the viewport instead of running off it.
 * @returns {ReturnType<typeof placeFloating>}
 */
export function placeElement(el, anchor, options = {}) {
  const a = anchor.getBoundingClientRect();
  if (options.matchWidth) el.style.minWidth = `${Math.round(a.width)}px`;
  if (options.fitHeight) el.style.maxHeight = "";
  let pos = placeFloating(a, { width: el.offsetWidth, height: el.offsetHeight }, options);
  if (options.fitHeight && el.offsetHeight > pos.room) {
    el.style.maxHeight = `${Math.max(96, pos.room)}px`;
    pos = placeFloating(a, { width: el.offsetWidth, height: el.offsetHeight }, { ...options, side: pos.side, flip: false });
  }
  el.style.top = `${pos.top}px`;
  el.style.left = `${pos.left}px`;
  return pos;
}

/**
 * Calls fn whenever an open box may need placing again: the window resizes, anything scrolls, or the visual
 * viewport changes (pinch zoom, the on-screen keyboard).
 * @param {() => void} fn
 * @returns {() => void} cleanup
 */
export function onViewportChange(fn) {
  const v = window.visualViewport;
  addEventListener("resize", fn);
  addEventListener("scroll", fn, true);
  v?.addEventListener("resize", fn);
  v?.addEventListener("scroll", fn);
  return () => {
    removeEventListener("resize", fn);
    removeEventListener("scroll", fn, true);
    v?.removeEventListener("resize", fn);
    v?.removeEventListener("scroll", fn);
  };
}
