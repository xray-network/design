import { duration, easing } from "../../core/motion.js";

const itemsOf = (container) => [...container.children].filter((el) => !el.hasAttribute("data-reflow-exit"));
/** An item's box in the container, from layout: running animations and page scroll do not change it. */
const boxOf = (el) => ({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight });

/**
 * The engine behind Reflow. measure() records where every item is; play(), after the list changed, moves each
 * item from where it was to where it is:
 *
 * - An item that moved glides from its old place (FLIP) on the soft spring. Glides add up, so a change made
 *   mid-flight continues from where the items are, without a snap.
 * - A new item fades and grows in while the others make room.
 * - A removed item leaves a copy where it was, out of the flow, which fades and shrinks away on --x-ease while the
 *   others close the gap.
 * - What follows the list glides too: the list's change in height is given back over the same time.
 *
 * Reduced motion: nothing moves.
 *
 * @param {HTMLElement} container  the .x-reflow element; its direct children are the items
 * @returns {{ measure: () => void, play: () => void }}
 */
export function createReflow(container) {
  let before = null;
  let height = 0;
  return {
    measure() {
      before = new Map(itemsOf(container).map((el) => [el, boxOf(el)]));
      height = container.offsetHeight;
    },
    play() {
      const was = before;
      before = null;
      const ms = duration(container, "--x-spring-soft-duration");
      if (!was || !ms) return;
      const spring = { duration: ms, easing: easing(container, "--x-spring-soft") };

      for (const el of itemsOf(container)) {
        const old = was.get(el);
        if (!old) {
          el.animate([{ opacity: 0, scale: "0.96", offset: 0 }], spring);
          continue;
        }
        const dx = old.x - el.offsetLeft;
        const dy = old.y - el.offsetTop;
        if (dx || dy) el.animate([{ translate: `${dx}px ${dy}px` }, { translate: "0 0" }], { ...spring, composite: "add" });
      }

      for (const [el, old] of was) {
        if (el.isConnected) continue;
        const copy = /** @type {HTMLElement} */ (el.cloneNode(true));
        copy.setAttribute("data-reflow-exit", "");
        copy.setAttribute("aria-hidden", "true");
        copy.inert = true;
        Object.assign(copy.style, { left: `${old.x}px`, top: `${old.y}px`, width: `${old.w}px`, height: `${old.h}px` });
        container.append(copy);
        const exit = { duration: duration(container, "--x-duration-base"), easing: easing(container, "--x-ease"), fill: "forwards" };
        copy.animate([{ opacity: 0, scale: "0.96", offset: 1 }], exit).finished.then(() => copy.remove(), () => copy.remove());
      }

      const grown = container.offsetHeight - height;
      if (grown) container.animate([{ marginBlockEnd: `${-grown}px` }, { marginBlockEnd: "0px" }], { ...spring, composite: "add" });
    },
  };
}

/**
 * Reflow for plain HTML: run a DOM change on a list and animate every item from where it was.
 *
 *   const list = document.querySelector(".x-reflow");
 *   reflow(list, () => list.prepend(newRow));            // or sort, remove, re-append in a new order
 *
 * @param {HTMLElement} container  the .x-reflow element; its direct children are the items
 * @param {() => void} change  changes the DOM: reorder, add or remove direct children
 */
export function reflow(container, change) {
  const engine = createReflow(container);
  engine.measure();
  change();
  engine.play();
}
