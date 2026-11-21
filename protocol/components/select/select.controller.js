/**
 * Select behavior, shared by the HTML version (initSelects) and the React component (bindSelect).
 *
 *   <button class="x-select" popovertarget="fee-list" aria-haspopup="listbox" aria-labelledby="fee-label fee-value">
 *     <span class="x-select-value" id="fee-value">Standard</span> …chevron…
 *   </button>
 *   <div class="x-select-list" id="fee-list" popover role="listbox" aria-labelledby="fee-label">
 *     <div class="x-select-option" role="option" data-value="standard" aria-selected="true" tabindex="-1">…</div>
 *   </div>
 *   <input type="hidden" name="fee" value="standard">   (optional: submits the value with a form)
 *
 * The Popover API supplies top layer, light dismiss and Esc. This adds:
 * - opening from the keyboard: ArrowDown, ArrowUp, Enter and Space on the trigger
 * - inside: arrows, Home/End and type-to-find move focus; Enter or Space picks; Tab closes
 * - focus starts on the selected option and returns to the trigger on close
 * - positioning: under the trigger and at least as wide, above it when there is no room below, and never taller
 *   than the room it has (the list scrolls)
 */

import { onViewportChange, placeElement } from "../../core/place.js";

/**
 * @param {HTMLElement} trigger
 * @param {HTMLElement} list
 * @param {{ onSelect?: (value: string) => void }} [options]
 *   onSelect: the caller owns the selection (React). Without it, the controller updates the markup itself.
 * @returns {() => void} cleanup
 */
export function bindSelect(trigger, list, { onSelect } = {}) {
  const options = () => [...list.querySelectorAll('[role="option"]:not([aria-disabled="true"])')];
  const selected = () => list.querySelector('[role="option"][aria-selected="true"]');
  let typed = "";
  let typedAt = 0;

  const place = () => {
    const pos = placeElement(list, trigger, { side: "bottom", align: "start", gap: 6, matchWidth: true, fitHeight: true });
    list.style.setProperty("--x-select-origin", pos.side === "top" ? "bottom center" : "top center");
  };

  const pick = (option) => {
    if (!option || option.getAttribute("aria-disabled") === "true") return;
    const value = option.dataset.value ?? "";
    if (onSelect) onSelect(value);
    else {
      for (const o of list.querySelectorAll('[role="option"]')) o.setAttribute("aria-selected", String(o === option));
      const label = trigger.querySelector(".x-select-value");
      if (label) label.textContent = option.querySelector(":scope > span")?.textContent ?? option.textContent ?? "";
      const input = trigger.parentElement?.querySelector(`input[type="hidden"][data-for="${list.id}"]`);
      if (input) input.value = value;
      trigger.dispatchEvent(new CustomEvent("change", { detail: { value }, bubbles: true }));
    }
    list.hidePopover();
    trigger.focus({ preventScroll: true });
  };

  const onBeforeToggle = (event) => {
    if (event.newState !== "open") return;
    const t = trigger.getBoundingClientRect();
    list.style.top = `${Math.round(t.bottom + 6)}px`;
    list.style.left = `${Math.round(t.left)}px`;
    list.style.minWidth = `${t.width}px`;
  };

  const onToggle = (event) => {
    const open = event.newState === "open";
    trigger.setAttribute("aria-expanded", String(open));
    if (open) {
      place();
      const start = selected() ?? options()[0];
      start?.focus({ preventScroll: true });
      start?.scrollIntoView({ block: "nearest" });
    }
  };

  const onTriggerKey = (event) => {
    if (["ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      list.showPopover();
    }
  };

  const onListKey = (event) => {
    const list_ = options();
    const i = list_.indexOf(/** @type {HTMLElement} */ (document.activeElement));
    const go = (n) => {
      event.preventDefault();
      const next = list_[Math.max(0, Math.min(list_.length - 1, n))];
      next?.focus();
      next?.scrollIntoView({ block: "nearest" });
    };
    if (event.key === "ArrowDown") go(i + 1);
    else if (event.key === "ArrowUp") go(i - 1);
    else if (event.key === "Home") go(0);
    else if (event.key === "End") go(list_.length - 1);
    else if (event.key === "Enter" || event.key === " ") { event.preventDefault(); pick(list_[i]); }
    else if (event.key === "Tab") list.hidePopover();
    else if (event.key.length === 1 && /\S/.test(event.key)) {
      // Type to find: jump to the next option that starts with the typed text.
      const now = performance.now();
      typed = now - typedAt > 700 ? event.key.toLowerCase() : typed + event.key.toLowerCase();
      typedAt = now;
      const rotated = [...list_.slice(i + 1), ...list_.slice(0, i + 1)];
      const match = rotated.find((o) => (o.textContent ?? "").trim().toLowerCase().startsWith(typed));
      if (match) go(list_.indexOf(match));
    }
  };

  const onListClick = (event) => pick(/** @type {Element} */ (event.target).closest('[role="option"]'));
  const onViewport = () => { if (list.matches(":popover-open")) place(); };

  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-expanded", "false");
  trigger.addEventListener("keydown", onTriggerKey);
  list.addEventListener("beforetoggle", onBeforeToggle);
  list.addEventListener("toggle", onToggle);
  list.addEventListener("keydown", onListKey);
  list.addEventListener("click", onListClick);
  const stopWatching = onViewportChange(onViewport);

  return () => {
    trigger.removeEventListener("keydown", onTriggerKey);
    list.removeEventListener("beforetoggle", onBeforeToggle);
    list.removeEventListener("toggle", onToggle);
    list.removeEventListener("keydown", onListKey);
    list.removeEventListener("click", onListClick);
    stopWatching();
  };
}

/**
 * Binds every .x-select trigger under root whose popovertarget is an .x-select-list.
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initSelects(root = document) {
  const cleanups = [];
  for (const trigger of root.querySelectorAll(".x-select[popovertarget]:not([data-x-ready])")) {
    const list = document.getElementById(trigger.getAttribute("popovertarget") ?? "");
    if (!list?.classList.contains("x-select-list")) continue;
    trigger.setAttribute("data-x-ready", "");
    cleanups.push(bindSelect(/** @type {HTMLElement} */ (trigger), list));
  }
  return () => cleanups.forEach((fn) => fn());
}
