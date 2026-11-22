import { duration, easing } from "../../core/motion.js";

/** Whether the browser animates details content itself (interpolate-size and ::details-content). */
const cssAnimates = () => typeof CSS !== "undefined" && CSS.supports("interpolate-size", "allow-keywords");
/** The height animation running on each item's content. */
const running = new WeakMap();

/**
 * Opens or closes one item, animating its height where the browser cannot do it in CSS. Opening an item of an
 * accordion (a shared name) closes the open one the same way. Reduced motion, and browsers that animate details
 * content themselves: it simply sets `open`.
 *
 * @param {HTMLDetailsElement} item
 * @param {boolean} [open]  default: the other state
 */
export function toggleCollapseItem(item, open = !item.open) {
  const content = /** @type {HTMLElement | null} */ (item.querySelector(":scope > .x-collapse-content"));
  const ms = duration(item, "--x-duration-base");
  running.get(content)?.cancel();
  if (open === item.open && !running.has(content)) return;
  if (cssAnimates() || !content || !ms) { item.open = open; return; }
  const ease = easing(item, "--x-ease");
  // The animation holds its last frame until it is let go, so nothing flashes between its end and the state change.
  const play = (from, to) => {
    content.style.overflow = "clip";
    const animation = content.animate([from, to], { duration: ms, easing: ease, fill: "forwards" });
    running.set(content, animation);
    const done = () => { if (running.get(content) === animation) { running.delete(content); content.style.overflow = ""; } };
    animation.addEventListener("cancel", done);
    return animation.finished.then(() => true, () => false).then((finished) => { if (finished) { animation.cancel(); done(); } return finished; });
  };
  const shut = { height: "0px", paddingBottom: "0px", opacity: 0 };
  if (open) {
    // An accordion closes its open item with the same motion; the name comes back once that one has shut, so the
    // browser does not snap it closed first.
    const name = item.getAttribute("name");
    const others = name ? [...document.querySelectorAll(`details[name="${CSS.escape(name)}"][open]`)].filter((d) => d !== item) : [];
    if (name) item.removeAttribute("name");
    // Shut at once, then measured on the next frames: content a framework renders when the item opens is there by then.
    item.open = true;
    renderLazy(item);
    content.style.overflow = "clip";
    content.style.height = "0px";
    content.style.paddingBottom = "0px";
    content.style.opacity = "0";
    Promise.all(others.map((other) => toggleCollapseItem(/** @type {HTMLDetailsElement} */ (other), false))).then(() => { if (name) item.setAttribute("name", name); });
    return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => {
      content.style.height = content.style.paddingBottom = content.style.opacity = "";
      const full = { height: `${content.offsetHeight}px`, paddingBottom: getComputedStyle(content).paddingBottom, opacity: 1 };
      play(shut, full).then(() => resolve());
    })));
  }
  const full = { height: `${content.offsetHeight}px`, paddingBottom: getComputedStyle(content).paddingBottom, opacity: 1 };
  return play(full, shut).then((finished) => { if (finished) item.open = false; });
}

/**
 * Collapse for plain HTML: renders lazy content on first open. Put an item's content in
 * <template data-lazy> inside .x-collapse-content; it is cloned into place the first time the item opens.
 * Everything else (toggling, keyboard, accordion via the name attribute) is native details/summary.
 * Fires "change" on the .x-collapse with detail.open (the data-value of every open item).
 *
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initCollapse(root = document) {
  const onToggle = (event) => {
    const item = /** @type {Element} */ (event.target);
    if (!(item instanceof HTMLDetailsElement) || !item.classList.contains("x-collapse-item")) return;
    if (item.open) renderLazy(item);
    const collapse = item.closest(".x-collapse");
    const open = [...(collapse?.querySelectorAll(":scope > .x-collapse-item[open]") ?? [])].map((d) => d.getAttribute("data-value"));
    collapse?.dispatchEvent(new CustomEvent("change", { detail: { open }, bubbles: true }));
  };
  for (const item of root.querySelectorAll(".x-collapse-item[open]")) renderLazy(item);
  // Where details content cannot animate in CSS, a press on a header animates the height instead.
  const onClick = (event) => {
    const header = /** @type {Element} */ (event.target).closest?.(".x-collapse-header");
    const item = header?.parentElement;
    if (!(item instanceof HTMLDetailsElement) || header !== item.querySelector(":scope > summary") || cssAnimates()) return;
    event.preventDefault();
    toggleCollapseItem(item);
  };
  // toggle does not bubble: listen in the capture phase.
  root.addEventListener("toggle", onToggle, true);
  root.addEventListener("click", onClick);
  return () => { root.removeEventListener("toggle", onToggle, true); root.removeEventListener("click", onClick); };
}

/** Replaces each <template data-lazy> inside el with its content. */
export function renderLazy(el) {
  for (const template of el.querySelectorAll("template[data-lazy]")) template.replaceWith(template.content.cloneNode(true));
}
