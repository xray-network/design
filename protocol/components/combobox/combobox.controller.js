/**
 * Combobox behavior, shared by the HTML version (initComboboxes) and the React component (bindCombobox).
 *
 *   <div class="x-combobox">
 *     <div class="x-combobox-field">
 *       <input class="x-combobox-input" role="combobox" aria-controls="token-list" aria-expanded="false" aria-autocomplete="list">
 *       …chevron…
 *     </div>
 *     <div class="x-combobox-list" id="token-list" popover="manual" role="listbox">
 *       <div class="x-combobox-option" role="option" id="token-eth" data-value="eth" aria-selected="false">…<span>Ether</span></div>
 *       <div class="x-combobox-empty" hidden>No matches</div>
 *     </div>
 *     <input type="hidden" name="token" data-for="token-list">   (optional)
 *   </div>
 *
 * Focus stays in the input (aria-activedescendant). Typing filters by hiding options; arrows move; Enter picks;
 * Esc closes, then clears; Tab and outside clicks close. Positioning: under the field and at least as wide, above it
 * when there is no room below, and never taller than the room it has (it stays clear of the on-screen keyboard).
 *
 * Multiple: data-multiple on .x-combobox. Picking toggles an option and keeps the list open; each picked option
 * shows as a chip before the input (its × removes it, Backspace in an empty input removes the last one).
 * data-name="tokens" on the root submits one hidden input per picked value.
 */

import { onViewportChange, placeElement } from "../../core/place.js";

const labelOf = (option) => (option.querySelector(":scope > span:not(.x-combobox-option-note)")?.textContent ?? option.textContent ?? "").trim();

/**
 * @param {HTMLInputElement} input
 * @param {HTMLElement} list
 * @param {{ onSelect?: (value: string) => void, filter?: (query: string, option: HTMLElement) => boolean }} [options]
 *   onSelect: the caller owns the selection (React); in multiple mode it is called with the value to toggle.
 *   Without it, the controller marks options, draws the chips and fills the hidden inputs.
 *   filter: the match rule; default, the label contains the query (case-insensitive).
 * @returns {() => void} cleanup
 */
export function bindCombobox(input, list, { onSelect, filter } = {}) {
  const field = input.closest(".x-combobox-field") ?? input;
  const root = input.closest(".x-combobox") ?? field;
  const all = () => [...list.querySelectorAll('[role="option"]')];
  const visible = () => all().filter((o) => !o.hidden && o.getAttribute("aria-disabled") !== "true");
  const active = () => list.querySelector('[role="option"][data-active]');
  const open = () => list.matches(":popover-open");
  const matches = filter ?? ((query, option) => labelOf(option).toLowerCase().includes(query));
  const multiple = root.hasAttribute("data-multiple");
  const placeholder = input.placeholder;
  if (multiple) list.setAttribute("aria-multiselectable", "true");

  const place = () => {
    const pos = placeElement(list, field, { side: "bottom", align: "start", gap: 6, matchWidth: true, fitHeight: true });
    list.style.setProperty("--x-combobox-origin", pos.side === "top" ? "bottom center" : "top center");
  };

  const setActive = (option) => {
    for (const o of list.querySelectorAll("[data-active]")) o.removeAttribute("data-active");
    if (option) {
      option.setAttribute("data-active", "");
      input.setAttribute("aria-activedescendant", option.id);
      option.scrollIntoView({ block: "nearest" });
    } else input.removeAttribute("aria-activedescendant");
  };

  const applyFilter = () => {
    const query = input.value.trim().toLowerCase();
    const selected = list.querySelector('[role="option"][aria-selected="true"]');
    // Showing the picked label again lists everything, so reopening after a pick shows the whole list.
    const showAll = !query || (!multiple && selected && labelOf(selected).toLowerCase() === query);
    for (const option of all()) option.hidden = !showAll && !matches(query, option);
    const empty = list.querySelector(".x-combobox-empty");
    if (empty) empty.hidden = all().some((o) => !o.hidden);
  };

  const show = () => {
    if (open()) return;
    list.showPopover();
    input.setAttribute("aria-expanded", "true");
    place();
  };
  const hide = () => {
    if (!open()) return;
    list.hidePopover();
    input.setAttribute("aria-expanded", "false");
    setActive(null);
  };

  // Multiple, HTML only: redraw the chips and hidden inputs from the options' aria-selected.
  const syncMultiple = () => {
    const selected = all().filter((o) => o.getAttribute("aria-selected") === "true");
    for (const chip of field.querySelectorAll(".x-combobox-chip")) chip.remove();
    for (const option of selected) {
      const chip = document.createElement("span");
      chip.className = "x-combobox-chip";
      chip.dataset.value = option.dataset.value ?? "";
      chip.innerHTML = '<span></span><button class="x-combobox-chip-remove" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 18 18 6M6 6l12 12"/></svg></button>';
      chip.firstElementChild.textContent = labelOf(option);
      chip.lastElementChild.setAttribute("aria-label", `Remove ${labelOf(option)}`);
      field.insertBefore(chip, input);
    }
    input.placeholder = selected.length ? "" : placeholder;
    for (const hidden of root.querySelectorAll(`input[type="hidden"][data-for="${list.id}"]`)) hidden.remove();
    const name = root.getAttribute("data-name");
    if (name) for (const option of selected) {
      const hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = name;
      hidden.value = option.dataset.value ?? "";
      hidden.setAttribute("data-for", list.id);
      root.append(hidden);
    }
    root.dispatchEvent(new CustomEvent("change", { detail: { value: selected.map((o) => o.dataset.value ?? "") }, bubbles: true }));
  };

  // Multiple: flip one option, clear the query and keep the list open.
  const toggle = (option) => {
    if (!option || option.getAttribute("aria-disabled") === "true") return;
    input.value = "";
    if (onSelect) onSelect(option.dataset.value ?? "");
    else {
      option.setAttribute("aria-selected", String(option.getAttribute("aria-selected") !== "true"));
      syncMultiple();
    }
    applyFilter();
    requestAnimationFrame(() => { if (open()) place(); }); // the field may have grown or shrunk by a line
  };

  const pick = (option) => {
    if (multiple) return toggle(option);
    if (!option || option.getAttribute("aria-disabled") === "true") return;
    const value = option.dataset.value ?? "";
    input.value = labelOf(option);
    if (onSelect) onSelect(value);
    else {
      for (const o of all()) o.setAttribute("aria-selected", String(o === option));
      const hidden = root.querySelector(`input[type="hidden"][data-for="${list.id}"]`);
      if (hidden) hidden.value = value;
      root.dispatchEvent(new CustomEvent("change", { detail: { value }, bubbles: true }));
    }
    hide();
  };

  const move = (step) => {
    const options = visible();
    if (!options.length) return;
    const i = options.indexOf(active());
    setActive(options[i < 0 ? (step > 0 ? 0 : options.length - 1) : Math.max(0, Math.min(options.length - 1, i + step))]);
  };

  const onInput = () => {
    applyFilter();
    show();
    setActive(visible()[0] ?? null);
  };
  const onKey = (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open()) { applyFilter(); show(); }
      move(event.key === "ArrowDown" ? 1 : -1);
    } else if (event.key === "Enter" && open() && active()) {
      event.preventDefault();
      pick(active());
    } else if (event.key === "Escape") {
      if (open()) { event.preventDefault(); hide(); }
      else if (input.value) { input.value = ""; applyFilter(); }
    } else if (event.key === "Tab") hide();
    else if (multiple && event.key === "Backspace" && !input.value) {
      const last = [...field.querySelectorAll(".x-combobox-chip")].pop();
      if (last) toggle(all().find((o) => o.dataset.value === last.dataset.value));
    }
  };
  const onFieldClick = (event) => {
    if (input.disabled) return;
    const remove = /** @type {Element} */ (event.target).closest(".x-combobox-chip-remove");
    if (remove) {
      const value = remove.closest(".x-combobox-chip")?.getAttribute("data-value");
      toggle(all().find((o) => o.dataset.value === value));
      input.focus();
      return;
    }
    input.focus();
    if (open()) hide(); else { applyFilter(); show(); }
  };
  // Keep focus in the input while the pointer works the list.
  const onListDown = (event) => event.preventDefault();
  const onListClick = (event) => pick(/** @type {Element} */ (event.target).closest('[role="option"]'));
  const onListMove = (event) => {
    const option = /** @type {Element} */ (event.target).closest('[role="option"]');
    if (option && !option.hasAttribute("data-active") && option.getAttribute("aria-disabled") !== "true") setActive(option);
  };
  const onOutside = (event) => {
    const target = /** @type {Node} */ (event.target);
    if (open() && !field.contains(target) && !list.contains(target)) hide();
  };
  const onViewport = () => { if (open()) place(); };

  input.setAttribute("role", "combobox");
  input.setAttribute("aria-expanded", "false");
  input.setAttribute("aria-autocomplete", "list");
  input.setAttribute("aria-controls", list.id);
  input.addEventListener("input", onInput);
  input.addEventListener("keydown", onKey);
  field.addEventListener("click", onFieldClick);
  list.addEventListener("mousedown", onListDown);
  list.addEventListener("click", onListClick);
  list.addEventListener("pointermove", onListMove);
  document.addEventListener("pointerdown", onOutside);
  const stopWatching = onViewportChange(onViewport);

  return () => {
    input.removeEventListener("input", onInput);
    input.removeEventListener("keydown", onKey);
    field.removeEventListener("click", onFieldClick);
    list.removeEventListener("mousedown", onListDown);
    list.removeEventListener("click", onListClick);
    list.removeEventListener("pointermove", onListMove);
    document.removeEventListener("pointerdown", onOutside);
    stopWatching();
  };
}

/**
 * Binds every .x-combobox under root.
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initComboboxes(root = document) {
  const cleanups = [];
  for (const box of root.querySelectorAll(".x-combobox:not([data-x-ready])")) {
    const input = box.querySelector(".x-combobox-input");
    const list = box.querySelector(".x-combobox-list");
    if (!(input instanceof HTMLInputElement) || !(list instanceof HTMLElement)) continue;
    box.setAttribute("data-x-ready", "");
    cleanups.push(bindCombobox(input, list));
  }
  return () => cleanups.forEach((fn) => fn());
}
