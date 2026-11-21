import { duration, easing } from "../../core/motion.js";

/** A pull past the last resting place stretches like a rubber band: the element follows less and less, and never
    further than this many px, so a sheet that reaches a little past its edge is never pulled clear of it. */
const STRETCH = 40;
const stretched = (pull) => (1 - 1 / ((pull * 0.5) / STRETCH + 1)) * STRETCH;
/** Before this many px the gesture is still a press, so buttons inside keep working. */
const SLOP = 6;
/** A release is thrown this far ahead of the finger (seconds of travel at the release speed). */
const THROW = 0.18;
/** Thrown this share of its own size past the last resting place, it leaves. */
const AWAY = 0.35;

/**
 * Drag: the element follows the pointer along one axis and, when let go, settles on the nearest resting place
 * on the spring, or leaves.
 *
 *   bindDrag(sheet, { axis: "y", snap: [0, 240], dismiss: "end" });        // a bottom sheet: open, or peeking
 *   bindDrag(row, { dismiss: "both" });                                    // swipe a row away, either way
 *   sheet.addEventListener("settle", (e) => e.detail);                     // { offset, index }
 *   row.addEventListener("dismiss", (e) => row.remove());                  // it has flown out; detail: { direction }
 *   row.addEventListener("leave", (e) => …);                               // it was just thrown: react at once
 *
 * The offset is a translate on the element, in px from where the layout puts it. Past the first or last resting
 * place the element stretches like a rubber band, 40px at most. A release is judged by where the throw would end, so a
 * quick flick counts as much as a long drag: thrown a third of its own size past the end, on a side it may leave
 * by, it goes. Reduced motion: it settles at once.
 *
 * A drag is never the only way: give every dismissal and every resting place a button or a key as well.
 *
 * @param {HTMLElement} el
 * @param {{ axis?: "x" | "y", snap?: number[], dismiss?: "start" | "end" | "both", handle?: Element | null, start?: number }} [options]
 *   axis: "x" (default) or "y". snap: the resting places, as offsets in px (default [0]). dismiss: the side(s) it
 *   can be thrown away to: "start" is left or up, "end" is right or down. handle: only this part starts a drag.
 *   start: the offset it rests at to begin with (default 0, or the first resting place when 0 is not one).
 * @returns {{ moveTo: (offset: number) => void, destroy: () => void }} moveTo settles on an offset from code
 */
export function bindDrag(el, { axis = "x", snap = [0], dismiss, handle = null, start: first } = {}) {
  const horizontal = axis === "x";
  const places = [...snap].sort((a, b) => a - b);
  let offset = first ?? (places.includes(0) ? 0 : places[0]);
  let start = null; // the gesture in progress: { id, point, offset, moved, samples }
  let running = null;

  el.classList.add("x-drag");
  el.dataset.axis = axis;
  const along = (event) => (horizontal ? event.clientX : event.clientY);
  const place = (value) => { offset = value; el.style.translate = horizontal ? `${value}px 0` : `0 ${value}px`; };
  if (offset) place(offset);

  /** Where the element sits for a pull to `raw`: free between the resting places, held back beyond them. */
  const held = (raw) => {
    const min = places[0], max = places.at(-1);
    if (raw < min && dismiss !== "start" && dismiss !== "both") return min - stretched(min - raw);
    if (raw > max && dismiss !== "end" && dismiss !== "both") return max + stretched(raw - max);
    return raw;
  };

  const point = (value) => (horizontal ? `${value}px 0` : `0 ${value}px`);

  /** Springs to a resting place. */
  const settle = (target) => {
    running?.cancel();
    el.removeAttribute("data-leaving");
    const from = offset;
    place(target);
    const ms = duration(el, "--x-spring-duration");
    if (!ms || from === target) return;
    const animation = el.animate([{ translate: point(from) }, { translate: point(target) }], { duration: ms, easing: easing(el, "--x-spring") });
    running = animation;
    animation.finished.then(() => { if (running === animation) running = null; }, () => {});
  };

  /**
   * Thrown away. The flight is a CSS animation (data-leaving, with its two ends in custom properties), not a script
   * one, so that a copy of the element carries on the same flight: a list that removes the row at once and leaves
   * a copy to fade (Reflow does) still shows it flying out. `leave` fires now and `dismiss` when it has gone.
   */
  const leave = (direction, target) => {
    running?.cancel();
    running = null;
    el.style.setProperty("--x-drag-from", point(offset));
    el.style.setProperty("--x-drag-to", point(target));
    place(target);
    el.setAttribute("data-leaving", "");
    const gone = () => el.dispatchEvent(new CustomEvent("dismiss", { bubbles: true, detail: { direction } }));
    if (duration(el, "--x-duration-slow")) el.addEventListener("animationend", gone, { once: true });
    el.dispatchEvent(new CustomEvent("leave", { bubbles: true, detail: { direction } }));
    if (!duration(el, "--x-duration-slow")) gone();
  };

  const release = (velocity) => {
    const size = horizontal ? el.offsetWidth : el.offsetHeight;
    const landing = offset + velocity * THROW * 1000;
    const min = places[0], max = places.at(-1);
    const far = size * AWAY;
    const out = landing < min - far && (dismiss === "start" || dismiss === "both") ? "start" : landing > max + far && (dismiss === "end" || dismiss === "both") ? "end" : null;
    if (out) {
      // Away: past its own size, on the exit curve. The app decides what a dismissal means.
      leave(out, out === "start" ? min - size * 1.1 : max + size * 1.1);
      return;
    }
    const target = places.reduce((best, p) => (Math.abs(p - landing) < Math.abs(best - landing) ? p : best), places[0]);
    settle(target);
    el.dispatchEvent(new CustomEvent("settle", { bubbles: true, detail: { offset: target, index: places.indexOf(target) } }));
  };

  /** Where the element is drawn now, along the axis: its own translate, mid-animation included. */
  const drawn = () => {
    const [x = "0", y = "0"] = getComputedStyle(el).translate.split(" ");
    return parseFloat(horizontal ? x : y) || 0;
  };

  // The gesture is followed on the window from the press to the release: a pointer that leaves the element, or is
  // let go outside it, is never lost.
  const end = (event) => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", end);
    window.removeEventListener("pointercancel", end);
    if (!start) return;
    const { moved, samples } = start;
    start = null;
    if (!moved) return;
    el.removeAttribute("data-dragging");
    // A drag is not a press: the click that follows it goes nowhere.
    el.setAttribute("data-dragged", "");
    setTimeout(() => el.removeAttribute("data-dragged"));
    const first = samples[0], last = samples.at(-1);
    // A pause before letting go is not a throw.
    const fresh = event.timeStamp - last.t < 80 && last.t > first.t;
    release(fresh ? (last.p - first.p) / (last.t - first.t) : 0);
  };
  const onMove = (event) => {
    if (!start || event.pointerId !== start.id) return;
    // The button came up somewhere this page never heard of it.
    if (event.pointerType === "mouse" && event.buttons === 0) { end(event); return; }
    if (!start.moved) {
      if (Math.abs(along(event) - start.point) < SLOP) return;
      // From here it is a drag. It starts under the pointer where it is now, so the element does not jump.
      start.moved = true;
      start.point = along(event);
      el.setAttribute("data-dragging", "");
      el.setPointerCapture?.(event.pointerId);
      getSelection()?.removeAllRanges();
    }
    place(held(start.offset + along(event) - start.point));
    start.samples.push({ t: event.timeStamp, p: along(event) });
    if (start.samples.length > 5) start.samples.shift();
    el.dispatchEvent(new CustomEvent("drag", { bubbles: true, detail: { offset } }));
  };
  const onDown = (event) => {
    if (start || event.button || (handle && !handle.contains(event.target))) return;
    if (!handle && event.target.closest?.("input, textarea, select, [contenteditable]")) return;
    // Mid-settle, the drag takes over from where the element is.
    if (running) { const at = drawn(); running.cancel(); running = null; place(at); }
    start = { id: event.pointerId, point: along(event), offset, moved: false, samples: [{ t: event.timeStamp, p: along(event) }] };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
  };
  const onClick = (event) => { if (el.hasAttribute("data-dragged")) { event.preventDefault(); event.stopPropagation(); } };
  // The browser's own drag of a link, an image or selected text would take the pointer away.
  const onNativeDrag = (event) => event.preventDefault();

  el.addEventListener("pointerdown", onDown);
  el.addEventListener("click", onClick, true);
  el.addEventListener("dragstart", onNativeDrag);
  return {
    // Already there, or already on its way there: nothing to do (and the spring in flight is left alone).
    moveTo: (target) => { if (target !== offset) settle(target); },
    destroy() {
      running?.cancel();
      end(new PointerEvent("pointercancel"));
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("click", onClick, true);
      el.removeEventListener("dragstart", onNativeDrag);
    },
  };
}

/**
 * Drag for plain HTML: binds every [data-x-drag] under root, reading its options from attributes:
 * data-axis ("x" or "y"), data-snap ("0 240"), data-dismiss ("start", "end" or "both"); a .x-drag-handle
 * inside, if there is one, is the only part that starts a drag.
 *
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initDrags(root = document) {
  const drags = [...root.querySelectorAll("[data-x-drag]")].map((el) =>
    bindDrag(/** @type {HTMLElement} */ (el), {
      axis: el.dataset.axis === "y" ? "y" : "x",
      snap: el.dataset.snap ? el.dataset.snap.split(/\s+/).map(Number) : [0],
      dismiss: /** @type {"start" | "end" | "both" | undefined} */ (el.dataset.dismiss || undefined),
      handle: el.querySelector(".x-drag-handle"),
    }),
  );
  return () => drags.forEach((drag) => drag.destroy());
}
