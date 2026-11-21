/**
 * Command behavior, shared by the HTML version (initCommands) and the React component (bindCommand).
 *
 *   <div class="x-command">
 *     <label class="x-command-search">…<input class="x-command-input" role="combobox" aria-controls="cmd-list"><kbd>esc</kbd></label>
 *     <div class="x-command-list" id="cmd-list" role="listbox">
 *       <div class="x-command-group" role="group" aria-labelledby="cmd-g1"><div class="x-command-group-label" id="cmd-g1">Actions</div>
 *         <div class="x-command-item" role="option" id="cmd-copy" data-value="copy" data-keywords="clipboard">
 *           <span class="x-command-lead">…icon…</span>
 *           <span class="x-command-text"><span class="x-command-label">Copy address</span><span class="x-command-sub">addr1q…lkgc86</span></span>
 *           <kbd class="x-command-enter">Enter</kbd>
 *         </div>
 *       </div>
 *       <p class="x-command-empty" hidden>No results for "<span class="x-command-query"></span>".</p>
 *     </div>
 *     <div class="x-command-foot">…key hints…</div>
 *   </div>
 *
 * Typing filters items (group, label, second line and data-keywords) and hides empty groups; arrows move (wrapping);
 * Enter or a click runs the active item: the root fires "select" with detail.value, or onSelect is called.
 * Esc fires "close" (or calls onClose): the app closes whatever holds the menu.
 */

const textOf = (item) =>
  `${item.closest(".x-command-group")?.querySelector(".x-command-group-label")?.textContent ?? ""} ${item.querySelector(".x-command-text")?.textContent ?? ""} ${item.getAttribute("data-keywords") ?? ""}`.toLowerCase();

/**
 * @param {HTMLElement} root  the .x-command element
 * @param {{ onSelect?: (value: string) => void, onClose?: () => void }} [options]
 * @returns {() => void} cleanup
 */
export function bindCommand(root, { onSelect, onClose } = {}) {
  const input = /** @type {HTMLInputElement | null} */ (root.querySelector(".x-command-input"));
  const list = root.querySelector(".x-command-list");
  if (!input || !list) return () => {};
  const items = () => [...list.querySelectorAll('[role="option"]')];
  const usable = () => items().filter((i) => !i.hidden && i.getAttribute("aria-disabled") !== "true");
  const active = () => list.querySelector('[role="option"][data-active]');

  const setActive = (item) => {
    for (const i of list.querySelectorAll("[data-active]")) { i.removeAttribute("data-active"); i.setAttribute("aria-selected", "false"); }
    if (item) {
      item.setAttribute("data-active", "");
      item.setAttribute("aria-selected", "true");
      input.setAttribute("aria-activedescendant", item.id);
      item.scrollIntoView({ block: "nearest" });
    } else input.removeAttribute("aria-activedescendant");
  };

  const applyFilter = () => {
    const query = input.value.trim();
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    for (const item of items()) item.hidden = !words.every((w) => textOf(item).includes(w));
    for (const group of list.querySelectorAll(".x-command-group")) group.hidden = !group.querySelector('[role="option"]:not([hidden])');
    const empty = list.querySelector(".x-command-empty");
    if (empty) {
      empty.hidden = items().some((i) => !i.hidden);
      const shown = empty.querySelector(".x-command-query");
      if (shown) shown.textContent = query;
    }
    setActive(usable()[0] ?? null);
  };

  const run = (item) => {
    if (!item || item.getAttribute("aria-disabled") === "true") return;
    const value = item.dataset.value ?? "";
    if (onSelect) onSelect(value);
    else root.dispatchEvent(new CustomEvent("select", { detail: { value }, bubbles: true }));
  };

  const onKey = (event) => {
    if (event.key === "Escape") {
      if (onClose) onClose();
      else root.dispatchEvent(new CustomEvent("close", { bubbles: true }));
      return;
    }
    const list_ = usable();
    if (!list_.length) return;
    const i = list_.indexOf(active());
    const go = (n) => { event.preventDefault(); setActive(list_[(n + list_.length) % list_.length]); };
    if (event.key === "ArrowDown") go(i + 1);
    else if (event.key === "ArrowUp") go(i < 0 ? -1 : i - 1);
    else if (event.key === "Enter" && active()) { event.preventDefault(); run(active()); }
  };
  const onDown = (event) => event.preventDefault(); // keep focus in the input
  const onClick = (event) => run(/** @type {Element} */ (event.target).closest('[role="option"]'));
  const onMove = (event) => {
    const item = /** @type {Element} */ (event.target).closest('[role="option"]');
    if (item && !item.hasAttribute("data-active") && item.getAttribute("aria-disabled") !== "true") setActive(item);
  };

  input.setAttribute("role", "combobox");
  input.setAttribute("aria-expanded", "true");
  input.setAttribute("aria-autocomplete", "list");
  input.setAttribute("aria-controls", list.id);
  input.addEventListener("input", applyFilter);
  input.addEventListener("keydown", onKey);
  list.addEventListener("mousedown", onDown);
  list.addEventListener("click", onClick);
  list.addEventListener("pointermove", onMove);
  applyFilter();

  return () => {
    input.removeEventListener("input", applyFilter);
    input.removeEventListener("keydown", onKey);
    list.removeEventListener("mousedown", onDown);
    list.removeEventListener("click", onClick);
    list.removeEventListener("pointermove", onMove);
  };
}

/**
 * Binds every .x-command under root.
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initCommands(root = document) {
  const cleanups = [];
  for (const el of root.querySelectorAll(".x-command:not([data-x-ready])")) {
    el.setAttribute("data-x-ready", "");
    cleanups.push(bindCommand(/** @type {HTMLElement} */ (el)));
  }
  return () => cleanups.forEach((fn) => fn());
}
