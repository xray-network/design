import { trackIndicator } from "../../core/motion.js";

/**
 * TabsLine for plain HTML: adds the line to a row of tabs and keeps it under the current one.
 *
 *   <div class="x-tabs-line" role="group" aria-label="Section">
 *     <button class="x-tabs-line-item" type="button" aria-current="true">Overview</button>
 *     <button class="x-tabs-line-item" type="button">Activity</button>
 *   </div>
 *
 * A click on a button tab makes it the current one, scrolls it into view and fires "change" with detail.index.
 * Links are left alone: set aria-current="page" from the route, then call the returned update().
 *
 * @param {HTMLElement} root
 * @returns {{ update: () => void, destroy: () => void }}
 */
export function bindTabsLine(root) {
  let bar = root.querySelector(":scope > .x-tabs-line-bar");
  if (!bar) {
    bar = document.createElement("span");
    bar.className = "x-tabs-line-bar";
    bar.setAttribute("aria-hidden", "true");
    root.append(bar);
  }
  const items = () => [...root.querySelectorAll(":scope > .x-tabs-line-item")];
  const current = () => root.querySelector(":scope > .x-tabs-line-item[aria-current]");
  const tracker = trackIndicator(root, current);
  const onClick = (event) => {
    const item = /** @type {Element} */ (event.target).closest(".x-tabs-line-item");
    if (!item || item.parentElement !== root || item.matches("a[href], :disabled") || item.hasAttribute("aria-current")) return;
    for (const other of items()) other.removeAttribute("aria-current");
    item.setAttribute("aria-current", "true");
    tracker.update();
    item.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
    root.dispatchEvent(new CustomEvent("change", { detail: { index: items().indexOf(item) }, bubbles: true }));
  };
  root.addEventListener("click", onClick);
  return {
    update: tracker.update,
    destroy: () => { tracker.destroy(); root.removeEventListener("click", onClick); },
  };
}

/**
 * Binds every .x-tabs-line under root.
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initTabsLines(root = document) {
  const bound = [];
  for (const el of root.querySelectorAll(".x-tabs-line:not([data-x-ready])")) {
    el.setAttribute("data-x-ready", "");
    bound.push(bindTabsLine(/** @type {HTMLElement} */ (el)));
  }
  return () => bound.forEach((b) => b.destroy());
}
