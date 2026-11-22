import { scrollStrip } from "../../core/motion.js";

/**
 * Stories rows wider than their place: a mouse drags them sideways like a finger does, and a shade marks the side
 * with hidden people (scrollStrip). The row works without it: it scrolls, with no scrollbar.
 *
 *   import { initStories } from "./stories.controller.js";
 *   initStories();
 *
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initStories(root = document) {
  const strips = [...root.querySelectorAll(".x-stories:not([data-x-ready])")].map((row) => {
    row.setAttribute("data-x-ready", "");
    const strip = scrollStrip(/** @type {HTMLElement} */ (row));
    return () => { strip.destroy(); row.removeAttribute("data-x-ready"); };
  });
  return () => strips.forEach((fn) => fn());
}
