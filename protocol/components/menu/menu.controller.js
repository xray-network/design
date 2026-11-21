/**
 * Menu behavior, shared by the HTML version (initMenus) and the React component (bindMenu).
 *
 *   <button popovertarget="row-menu" aria-haspopup="menu">…</button>
 *   <div class="x-menu" id="row-menu" popover role="menu"> <button class="x-menu-item" role="menuitem">…</button> </div>
 *
 * The Popover API supplies top layer, light dismiss and Esc. This adds:
 * - positioning: under the trigger, start-aligned; above it when there is no room below; always inside the viewport
 * - keyboard: focus the first item on open; ArrowUp/ArrowDown/Home/End move; Tab closes
 * - activating an item closes the menu; aria-expanded on the trigger follows the menu
 */

import { onViewportChange, placeElement } from "../../core/place.js";

/**
 * @param {HTMLElement} trigger
 * @param {HTMLElement} menu
 * @returns {() => void} cleanup
 */
export function bindMenu(trigger, menu) {
  const items = () => [...menu.querySelectorAll('[role^="menuitem"]:not(:disabled):not([aria-disabled="true"])')];

  const place = () => {
    const pos = placeElement(menu, trigger, { side: "bottom", align: "start", gap: 6, fitHeight: true });
    const pushedBack = pos.left < Math.round(trigger.getBoundingClientRect().left);
    menu.style.setProperty("--x-menu-origin", `${pos.side === "top" ? "bottom" : "top"} ${pushedBack ? "right" : "left"}`);
  };

  // Before the menu shows: a first guess (below, start-aligned) so it never flashes elsewhere.
  const onBeforeToggle = (event) => {
    if (event.newState !== "open") return;
    const t = trigger.getBoundingClientRect();
    menu.style.top = `${Math.round(t.bottom + 6)}px`;
    menu.style.left = `${Math.round(t.left)}px`;
  };

  const onToggle = (event) => {
    const open = event.newState === "open";
    trigger.setAttribute("aria-expanded", String(open));
    if (open) {
      place();
      items()[0]?.focus({ preventScroll: true });
    }
  };

  const onKeydown = (event) => {
    const list = items();
    const i = list.indexOf(/** @type {HTMLElement} */ (document.activeElement));
    const go = (n) => { event.preventDefault(); list[(n + list.length) % list.length]?.focus(); };
    if (event.key === "ArrowDown") go(i + 1);
    else if (event.key === "ArrowUp") go(i < 0 ? list.length - 1 : i - 1);
    else if (event.key === "Home") go(0);
    else if (event.key === "End") go(list.length - 1);
    else if (event.key === "Tab") menu.hidePopover();
  };

  const onClick = (event) => {
    const item = /** @type {Element} */ (event.target).closest('[role^="menuitem"]');
    if (!item || item.matches(':disabled, [aria-disabled="true"]')) return;
    if (item.getAttribute("role") === "menuitem") {
      menu.hidePopover();
      trigger.focus({ preventScroll: true });
    }
  };

  const onViewport = () => { if (menu.matches(":popover-open")) place(); };

  trigger.setAttribute("aria-haspopup", "menu");
  trigger.setAttribute("aria-expanded", "false");
  menu.addEventListener("beforetoggle", onBeforeToggle);
  menu.addEventListener("toggle", onToggle);
  menu.addEventListener("keydown", onKeydown);
  menu.addEventListener("click", onClick);
  const stopWatching = onViewportChange(onViewport);

  return () => {
    menu.removeEventListener("beforetoggle", onBeforeToggle);
    menu.removeEventListener("toggle", onToggle);
    menu.removeEventListener("keydown", onKeydown);
    menu.removeEventListener("click", onClick);
    stopWatching();
  };
}

/**
 * Binds every trigger under root whose popovertarget is an .x-menu.
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initMenus(root = document) {
  const cleanups = [];
  for (const trigger of root.querySelectorAll("[popovertarget]:not([data-x-ready])")) {
    const menu = document.getElementById(trigger.getAttribute("popovertarget") ?? "");
    if (!menu?.classList.contains("x-menu")) continue;
    trigger.setAttribute("data-x-ready", "");
    cleanups.push(bindMenu(/** @type {HTMLElement} */ (trigger), menu));
  }
  return () => cleanups.forEach((fn) => fn());
}
