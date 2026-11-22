/**
 * Drawer behavior for plain HTML. One delegated listener per root handles every drawer:
 *
 *   <button data-x-drawer-open="filters">Filters</button>
 *   <dialog class="x-drawer" id="filters"> … <button data-x-drawer-close>Reset</button> … </dialog>
 *
 * - [data-x-drawer-open="<id>"] opens that drawer as a modal
 * - [data-x-drawer-close] (optionally ="<returnValue>") closes the drawer it is in
 * - a click on the backdrop closes the drawer (opt out with data-x-dismiss="none" on the drawer)
 * Esc and focus trapping are native. The Modal's scrollbar tracking keeps the page from shifting when the drawer
 * hides the page's scrollbar.
 * Lazy content: put it in <template data-lazy> inside the drawer; it is rendered right before the first opening.
 *
 * @param {Document | HTMLElement} [root]
 * @returns {() => void} cleanup
 */
import { isBackdropClick, lockScroll, trackScrollbar, unlockScroll } from "../modal/modal.controller.js";

export function initDrawers(root = document) {
  const onClick = (event) => {
    const target = /** @type {Element} */ (event.target);

    const opener = target.closest("[data-x-drawer-open]");
    if (opener) {
      const drawer = document.getElementById(opener.getAttribute("data-x-drawer-open") ?? "");
      if (drawer instanceof HTMLDialogElement && !drawer.open) {
        for (const template of drawer.querySelectorAll("template[data-lazy]")) template.replaceWith(template.content.cloneNode(true));
        lockScroll();
        drawer.showModal();
      }
      return;
    }

    const closer = target.closest("[data-x-drawer-close]");
    if (closer) {
      closer.closest("dialog")?.close(closer.getAttribute("data-x-drawer-close") || undefined);
      return;
    }

    if (target instanceof HTMLDialogElement && target.matches(".x-drawer") && isBackdropClick(target, event)) {
      if (target.dataset.xDismiss !== "none") target.close();
    }
  };
  // "close" does not bubble; listen in the capture phase for every drawer under root.
  const onClose = (event) => { if (/** @type {Element} */ (event.target).matches?.(".x-drawer")) unlockScroll(); };
  root.addEventListener("click", onClick);
  root.addEventListener("close", onClose, true);
  const untrack = trackScrollbar();
  return () => {
    root.removeEventListener("click", onClick);
    root.removeEventListener("close", onClose, true);
    untrack();
  };
}
