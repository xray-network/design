/**
 * Dialog behavior for plain HTML. One delegated listener per root handles every dialog:
 *
 *   <button data-x-dialog-open="confirm">Open</button>
 *   <dialog class="x-dialog" id="confirm"> … <button data-x-dialog-close>Cancel</button> … </dialog>
 *
 * - [data-x-dialog-open="<id>"] opens that dialog as a modal
 * - [data-x-dialog-close] (optionally ="<returnValue>") closes the dialog it is in
 * - a click on the backdrop closes the dialog (opt out with data-x-dismiss="none" on the dialog)
 * Esc and focus trapping are native.
 *
 * @param {Document | HTMLElement} [root]
 * @returns {() => void} cleanup
 */
export function initDialogs(root = document) {
  const onClick = (event) => {
    const target = /** @type {Element} */ (event.target);

    const opener = target.closest("[data-x-dialog-open]");
    if (opener) {
      const dialog = document.getElementById(opener.getAttribute("data-x-dialog-open") ?? "");
      if (dialog instanceof HTMLDialogElement && !dialog.open) dialog.showModal();
      return;
    }

    const closer = target.closest("[data-x-dialog-close]");
    if (closer) {
      closer.closest("dialog")?.close(closer.getAttribute("data-x-dialog-close") || undefined);
      return;
    }

    if (target instanceof HTMLDialogElement && target.matches(".x-dialog") && isBackdropClick(target, event)) {
      if (target.dataset.xDismiss !== "none") target.close();
    }
  };
  root.addEventListener("click", onClick);
  return () => root.removeEventListener("click", onClick);
}

/** True when a click on the dialog element landed outside its box (on the ::backdrop). */
export function isBackdropClick(dialog, event) {
  if (event.target !== dialog) return false;
  // Keyboard-triggered clicks report 0,0; never treat those as backdrop clicks.
  if (event.detail === 0) return false;
  const r = dialog.getBoundingClientRect();
  return event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom;
}
