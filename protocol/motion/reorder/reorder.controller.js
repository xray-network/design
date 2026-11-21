import { duration, easing } from "../../core/motion.js";

/**
 * Reorder: an item is picked up by its grip, follows the pointer along the list, and the others step aside as
 * it passes them. Let go, it settles into its new place on the spring.
 *
 *   <ul class="x-reorder"> <li data-id="a"><button class="x-reorder-handle" aria-label="Move Ether">…</button> Ether</li> … </ul>
 *   bindReorder(list);  list.addEventListener("reorder", (e) => e.detail);   // { id, from, to, order }
 *
 * From the keyboard: with the grip focused, ArrowUp and ArrowDown move the item a place at a time.
 * While an item is dragged the DOM order follows the pointer, so the list reads right at every moment. On
 * release the controller fires `reorder` and, where `restore` is set, first puts the DOM back as it was: for a
 * list that a framework renders from state, which then renders the new order itself.
 *
 * @param {HTMLElement} list  the .x-reorder; its direct children are the items, each with a data-id
 * @param {{ restore?: boolean }} [options]
 * @returns {() => void} cleanup
 */
export function bindReorder(list, { restore = false } = {}) {
  const items = () => /** @type {HTMLElement[]} */ ([...list.children]);
  let drag = null; // { item, id, pointer, start, top, from, before }

  const report = (item, from, before) => {
    const to = items().indexOf(item);
    const order = items().map((el) => el.dataset.id ?? "");
    if (restore) list.replaceChildren(...before);
    if (to !== from) list.dispatchEvent(new CustomEvent("reorder", { bubbles: true, detail: { id: item.dataset.id ?? "", from, to, order } }));
  };
  /** The others glide from where they were (FLIP); the dragged item is placed by the pointer instead. */
  const shift = (change, except) => {
    const before = new Map(items().map((el) => [el, el.offsetTop]));
    change();
    const ms = duration(list, "--x-spring-soft-duration");
    for (const el of items()) {
      const dy = before.get(el) - el.offsetTop;
      if (el !== except && dy && ms) el.animate([{ translate: `0 ${dy}px` }, { translate: "0 0" }], { duration: ms, easing: easing(list, "--x-spring-soft"), composite: "add" });
    }
  };

  const onMove = (event) => {
    if (!drag || event.pointerId !== drag.pointer) return;
    const { item } = drag;
    // Where the item's box would be, were it simply following the pointer from where it was picked up.
    const top = drag.top + event.clientY - drag.start;
    const middle = top + item.offsetHeight / 2;
    const others = items().filter((el) => el !== item);
    // It takes the place of the first item whose middle it has not passed.
    const next = others.find((el) => middle < el.offsetTop + el.offsetHeight / 2) ?? null;
    if (next !== item.nextElementSibling) shift(() => list.insertBefore(item, next), item);
    item.style.translate = `0 ${top - item.offsetTop}px`;
  };
  const onUp = (event) => {
    if (!drag || (event.pointerId !== undefined && event.pointerId !== drag.pointer)) return;
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onUp);
    const { item, from, before } = drag;
    drag = null;
    const offset = parseFloat(item.style.translate.split(" ")[1] ?? "0") || 0;
    item.style.translate = "";
    item.removeAttribute("data-dragging");
    // It settles from where it was let go into its place.
    const ms = duration(list, "--x-spring-duration");
    if (ms && offset) item.animate([{ translate: `0 ${offset}px` }, { translate: "0 0" }], { duration: ms, easing: easing(list, "--x-spring") });
    report(item, from, before);
  };
  const onDown = (event) => {
    const handle = event.target.closest?.(".x-reorder-handle");
    const item = /** @type {HTMLElement | null} */ (handle?.closest(".x-reorder > *"));
    if (!item || item.parentElement !== list || event.button || drag) return;
    event.preventDefault(); // no text selection, no native drag
    drag = { item, pointer: event.pointerId, start: event.clientY, top: item.offsetTop, from: items().indexOf(item), before: items() };
    item.setAttribute("data-dragging", "");
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };
  const onKey = (event) => {
    const step = { ArrowUp: -1, ArrowDown: 1 }[event.key];
    const handle = event.target.closest?.(".x-reorder-handle");
    const item = /** @type {HTMLElement | null} */ (handle?.closest(".x-reorder > *"));
    if (!step || !item || item.parentElement !== list) return;
    event.preventDefault();
    const before = items();
    const from = before.indexOf(item);
    const to = from + step;
    if (to < 0 || to >= before.length) return;
    shift(() => list.insertBefore(item, step > 0 ? before[to].nextElementSibling : before[to]));
    report(item, from, before);
    // The grip keeps the focus, so the item can go on moving. Moving an element can drop its focus, and a
    // framework may move it once more as it renders the new order: so the focus is given back after that.
    const id = item.dataset.id ?? "";
    handle.focus();
    requestAnimationFrame(() => list.querySelector(`[data-id="${CSS.escape(id)}"] .x-reorder-handle`)?.focus());
  };
  list.addEventListener("pointerdown", onDown);
  list.addEventListener("keydown", onKey);
  return () => { onUp({}); list.removeEventListener("pointerdown", onDown); list.removeEventListener("keydown", onKey); };
}

/**
 * Binds every .x-reorder under root.
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initReorders(root = document) {
  const cleanups = [...root.querySelectorAll(".x-reorder")].map((el) => bindReorder(/** @type {HTMLElement} */ (el)));
  return () => cleanups.forEach((fn) => fn());
}
