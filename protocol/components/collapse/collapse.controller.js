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
  // toggle does not bubble: listen in the capture phase.
  root.addEventListener("toggle", onToggle, true);
  return () => root.removeEventListener("toggle", onToggle, true);
}

/** Replaces each <template data-lazy> inside el with its content. */
export function renderLazy(el) {
  for (const template of el.querySelectorAll("template[data-lazy]")) template.replaceWith(template.content.cloneNode(true));
}
