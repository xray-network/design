/**
 * Expand for plain HTML: a button with data-x-expand and aria-controls opens and closes the .x-expand it names,
 * and keeps its own aria-expanded current.
 *
 *   <button type="button" data-x-expand aria-expanded="false" aria-controls="fees">Fee details</button>
 *   <div class="x-expand" id="fees"><div class="x-expand-content">…</div></div>
 *
 * Fires `toggle` on the region: detail is { open }.
 *
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initExpands(root = document) {
  const onClick = (event) => {
    const trigger = /** @type {Element} */ (event.target).closest?.("[data-x-expand][aria-controls]");
    const region = trigger && document.getElementById(trigger.getAttribute("aria-controls"));
    if (!region) return;
    const open = region.toggleAttribute("data-open");
    trigger.setAttribute("aria-expanded", String(open));
    region.dispatchEvent(new CustomEvent("toggle", { bubbles: true, detail: { open } }));
  };
  root.addEventListener("click", onClick);
  return () => root.removeEventListener("click", onClick);
}
