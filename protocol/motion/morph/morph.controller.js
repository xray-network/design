import { duration, easing } from "../../core/motion.js";

/** The morph in flight for each large form, so a new one continues from where it is. */
const running = new WeakMap();

/** The element that draws the surface: the element itself, or its only child when it is a bare wrapper. */
function surfaceOf(el) {
  const s = getComputedStyle(el);
  const drawn = parseFloat(s.borderTopWidth) > 0 || parseFloat(s.borderTopLeftRadius) > 0 || !BLANK.test(s.backgroundColor);
  return !drawn && el.childElementCount === 1 ? el.firstElementChild : el;
}
const BLANK = /^(transparent|rgba\(0, 0, 0, 0\))$/;
/** True for a colour with no transparency: only such a fill can hide what is under it. A hover wash is not one. */
function opaque(color) {
  if (BLANK.test(color)) return false;
  const alpha = color.match(/^rgba\(.*,\s*([\d.]+%?)\s*\)$/)?.[1] ?? color.match(/\/\s*([\d.]+%?)\s*\)$/)?.[1];
  return !alpha || (alpha.endsWith("%") ? parseFloat(alpha) >= 100 : parseFloat(alpha) >= 1);
}
/** The corner radius as drawn, in px: a percentage or an oversized pill radius is resolved against the box, so two
    radii can be interpolated (999px to 16px would otherwise stay a pill until the last moment). */
function radiusOf(el, rect) {
  const value = getComputedStyle(el).borderTopLeftRadius.split(" ")[0];
  const px = value.endsWith("%") ? (parseFloat(value) / 100) * rect.width : parseFloat(value) || 0;
  return `${Math.min(px, rect.width / 2, rect.height / 2)}px`;
}

/**
 * Morph: one surface grows out of another, or shrinks back into it.
 *
 * Nothing is scaled and nothing slides, so text and corners never distort. The large form stays laid out at its
 * real size and is shown through a window (clip-path) that travels from the small form's box to its own, with the
 * corner radius changing on the way. A frame on the window's edge carries the border, and the contents fade through:
 * the frame's veil, in the surface's own colour, covers the old content while the window is small and lifts off the
 * new content as it arrives, so no half-revealed text is ever on show.
 *
 * Both elements must be laid out when it is called: show `to` first, and hide `from` with visibility (not display).
 *
 *   to.hidden = false; group.setAttribute("data-open", ""); morph(from, to);                     // open
 *   if (await morph(from, to, { open: false })) { to.hidden = true; group.removeAttribute("data-open"); }   // close
 *
 * Calling it again mid-flight continues from where the window is. Opening runs on the soft spring; closing is an
 * exit, on --x-ease. Reduced motion: it resolves at once.
 *
 * @param {Element} from  the small form: a card, a row, a button
 * @param {HTMLElement} to  the large form
 * @param {{ open?: boolean, space?: HTMLElement }} [options]
 *   open: false closes (the large form shrinks into the small one). space: an element whose room in the flow
 *   follows the morph (the group, when the large form opens in place), so what comes after it glides, not jumps.
 * @returns {Promise<boolean>} true when it ran to the end; false when another morph took over
 */
export function morph(from, to, { open = true, space } = {}) {
  const prior = running.get(to);
  // Mid-flight: read where things are before the running morph is stopped.
  const now = prior && {
    window: prior.frame.getBoundingClientRect(),
    radius: getComputedStyle(prior.frame).borderRadius,
    color: getComputedStyle(prior.rim).borderTopColor,
    large: parseFloat(getComputedStyle(to).opacity) >= 0.5,
    veil: parseFloat(getComputedStyle(prior.veil).opacity),
    fill: getComputedStyle(prior.veil).backgroundColor,
    margin: space ? parseFloat(getComputedStyle(space).marginBlockEnd) : 0,
  };
  prior?.stop(false);

  const ms = duration(to, open ? "--x-spring-soft-duration" : "--x-duration-slow");
  const small = surfaceOf(from);
  const large = surfaceOf(to);
  const a = small.getBoundingClientRect();
  const b = large.getBoundingClientRect();
  const box = to.getBoundingClientRect();
  if (!ms || !a.width || !a.height || !b.width || !b.height) return Promise.resolve(true);

  // A closing starts with the veil: the window waits a moment, so it never cuts through text that is still on show.
  const wait = open || now ? 0 : ms * 0.2;
  const timing = { delay: wait, duration: ms - wait, easing: easing(to, open ? "--x-spring-soft" : "--x-ease"), fill: open ? "none" : "both" };
  const start = { rect: now?.window ?? (open ? a : b), radius: now?.radius ?? (open ? radiusOf(small, a) : radiusOf(large, b)), color: now?.color ?? getComputedStyle(open ? small : large).borderTopColor };
  const end = { rect: open ? b : a, radius: open ? radiusOf(large, b) : radiusOf(small, a), color: getComputedStyle(open ? large : small).borderTopColor };

  // The frame: a box on the window's edge, in the large form's own containing block, so it scrolls and clips with
  // it. It holds the veil and, over it, the rim that draws the border the window cuts off; and it says where the
  // window is when a morph is interrupted. The alignment is pinned: in a grid, the parent's must not move it.
  const styles = [large, small].map((el) => getComputedStyle(el));
  const edge = styles.find((style) => parseFloat(style.borderTopWidth) > 0);
  // The veil takes the surface's colour, and goes from the one form's to the other's when they differ (a filled
  // button into a panel). A form with no solid fill of its own (none, or a translucent hover wash, which would let
  // the change of content show through) borrows the other's.
  const [largeFill, smallFill] = styles.map((style) => (opaque(style.backgroundColor) ? style.backgroundColor : null));
  const fill = largeFill ?? smallFill;
  const fills = fill && [now?.fill ?? (open ? smallFill : largeFill) ?? fill, (open ? largeFill : smallFill) ?? fill];
  const frame = document.createElement("div");
  const veil = frame.appendChild(document.createElement("div"));
  const rim = frame.appendChild(document.createElement("div"));
  frame.setAttribute("aria-hidden", "true");
  Object.assign(frame.style, {
    position: "absolute", inset: "0 auto auto 0", justifySelf: "start", alignSelf: "start", width: "0", height: "0", margin: "0", overflow: "hidden", pointerEvents: "none",
  });
  Object.assign(veil.style, { position: "absolute", inset: "0", opacity: "0" });
  Object.assign(rim.style, {
    position: "absolute", inset: "0", boxSizing: "border-box", borderRadius: "inherit",
    border: edge ? `${edge.borderTopWidth} ${edge.borderTopStyle} ${start.color}` : "0",
  });
  const layer = getComputedStyle(to).zIndex;
  if (layer !== "auto") frame.style.zIndex = layer;
  to.after(frame);
  const origin = frame.getBoundingClientRect();

  // Half a pixel inside the frame: between whole pixels the two are drawn apart, and no sliver of content may show
  // outside the rim.
  const window = ({ rect, radius }) => `inset(${rect.top - box.top + 0.5}px ${box.right - rect.right + 0.5}px ${box.bottom - rect.bottom + 0.5}px ${rect.left - box.left + 0.5}px round ${radius})`;
  const edgeAt = ({ rect, radius }) => ({
    translate: `${rect.left - origin.left}px ${rect.top - origin.top}px`, width: `${rect.width}px`, height: `${rect.height}px`, borderRadius: radius,
  });

  // The contents, on the clock (not on the spring). `large` says which form shows: 1 the large one, 0 the small one.
  const clock = { duration: ms, fill: open ? "none" : "forwards" };
  const was = +(now?.large ?? !open);
  const will = +open;
  // The veil closes by `swap`, when the forms change places under it; it stays closed until `hold`, while the
  // window does most of its travelling; and it is gone by `lift`.
  const [swap, hold, lift] = open ? [0.15, 0.45, 0.85] : [0.2, 0.5, 1];
  const shows = (large) => [{ opacity: large }, { visibility: "visible", opacity: 1 - large }];
  const content = (frames) => [to.animate(frames.map(([large, offset]) => ({ ...shows(large)[0], offset })), clock), from.animate(frames.map(([large, offset]) => ({ ...shows(large)[1], offset })), clock)];
  const animations = [
    to.animate([{ clipPath: window(start) }, { clipPath: window(end) }], timing),
    frame.animate([edgeAt(start), edgeAt(end)], timing),
    rim.animate([{ borderColor: start.color }, { borderColor: end.color }], timing),
    ...(fills ? [veil.animate([{ backgroundColor: fills[0] }, { backgroundColor: fills[1] }], timing)] : []),
    ...(was === will
      ? // Interrupted before the forms changed places: the right one already shows, so the veil only clears.
        [...content([[will, 0], [will, 1]]), veil.animate([{ opacity: now?.veil ?? 0 }, { opacity: 0, offset: 0.5 }, { opacity: 0 }], clock)]
      : fill
        ? [...content([[was, 0], [was, swap], [will, swap], [will, 1]]), veil.animate([{ opacity: now?.veil ?? 0 }, { opacity: 1, offset: swap }, { opacity: 1, offset: hold }, { opacity: 0, offset: lift }, { opacity: 0 }], clock)]
        : // No surface colour to veil with: a plain cross-fade.
          content([[was, 0], [will, lift], [will, 1]])),
  ];
  if (space && !/^(absolute|fixed)$/.test(getComputedStyle(space).position)) {
    // Room in the flow: the group already has its new height, so a margin gives the difference back over the morph.
    // Only in the flow: a margin would move a positioned group itself.
    const grown = Math.max(0, b.height - a.height);
    const base = parseFloat(getComputedStyle(space).marginBlockEnd);
    const at = now ? now.margin - base : open ? -grown : 0;
    animations.push(space.animate([{ marginBlockEnd: `${at}px` }, { marginBlockEnd: `${open ? 0 : -grown}px` }], { ...timing, composite: "add" }));
  }

  return new Promise((resolve) => {
    const stop = (finished) => {
      if (running.get(to)?.frame === frame) running.delete(to);
      for (const animation of animations) animation.cancel();
      frame.remove();
      resolve(finished);
    };
    running.set(to, { frame, veil, rim, stop });
    animations[0].finished.then(() => stop(true), () => {});
  });
}

/**
 * Morph for plain HTML: [data-x-morph-open] inside the small form opens the group it is in, [data-x-morph-close]
 * inside the large form closes it, and Esc closes an open group that holds the focus.
 *
 *   <div class="x-morph"> <div class="x-morph-from"><button data-x-morph-open aria-expanded="false">…</button></div>
 *     <div class="x-morph-to" hidden> … <button data-x-morph-close>Back</button></div> </div>
 *
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initMorphs(root = document) {
  const closing = new WeakSet();
  const parts = (group) => [group.querySelector(":scope > .x-morph-from"), group.querySelector(":scope > .x-morph-to")];
  const space = (group) => (group.hasAttribute("data-cover") ? undefined : group);
  const open = (group) => {
    const [from, to] = parts(group);
    if (!from || !to || (group.hasAttribute("data-open") && !closing.has(group))) return;
    closing.delete(group);
    to.hidden = false;
    group.setAttribute("data-open", "");
    from.querySelector("[data-x-morph-open]")?.setAttribute("aria-expanded", "true");
    (to.querySelector("[data-autofocus], [data-x-morph-close]") ?? to).focus?.({ preventScroll: true });
    morph(from, to, { space: space(group) });
  };
  const close = async (group) => {
    const [from, to] = parts(group);
    if (!from || !to || !group.hasAttribute("data-open") || closing.has(group)) return;
    closing.add(group);
    const opener = from.querySelector("[data-x-morph-open]");
    opener?.setAttribute("aria-expanded", "false");
    // The large form stays until it has shrunk into the small one; then the two swap, before the next paint.
    if (!(await morph(from, to, { open: false, space: space(group) }))) return;
    closing.delete(group);
    to.hidden = true;
    group.removeAttribute("data-open");
    opener?.focus({ preventScroll: true });
  };
  const onClick = (event) => {
    const target = /** @type {Element} */ (event.target);
    const group = target.closest(".x-morph");
    if (!group) return;
    if (target.closest("[data-x-morph-open]")) open(group);
    else if (target.closest("[data-x-morph-close]")) close(group);
  };
  const onKey = (event) => {
    if (event.key !== "Escape") return;
    const group = /** @type {Element} */ (event.target).closest?.(".x-morph[data-open]");
    if (group) close(group);
  };
  root.addEventListener("click", onClick);
  root.addEventListener("keydown", onKey);
  return () => { root.removeEventListener("click", onClick); root.removeEventListener("keydown", onKey); };
}
