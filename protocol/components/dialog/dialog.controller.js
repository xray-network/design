/**
 * Dialog behavior for plain HTML. One delegated listener per root handles every dialog:
 *
 *   <button data-x-dialog-open="confirm">Open</button>
 *   <dialog class="x-dialog" id="confirm"> … <button data-x-dialog-close>Cancel</button> … </dialog>
 *
 * - [data-x-dialog-open="<id>"] opens that dialog as a modal
 * - [data-x-dialog-close] (optionally ="<returnValue>") closes the dialog it is in
 * - a click on the backdrop closes the dialog (opt out with data-x-dismiss="none" on the dialog)
 * Esc and focus trapping are native. lockScroll() keeps the page from shifting when the dialog hides its scrollbar.
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
      if (dialog instanceof HTMLDialogElement && !dialog.open) {
        lockScroll();
        dialog.showModal();
      }
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
  // "close" does not bubble; listen in the capture phase for every dialog under root.
  const onClose = (event) => { if (/** @type {Element} */ (event.target).matches?.(".x-dialog")) unlockScroll(); };
  root.addEventListener("click", onClick);
  root.addEventListener("close", onClose, true);
  const untrack = trackScrollbar();
  return () => {
    root.removeEventListener("click", onClick);
    root.removeEventListener("close", onClose, true);
    untrack();
  };
}

/**
 * Marks the page with data-x-scrollbar while it shows a classic scrollbar, so the scroll lock keeps that space
 * (no sideways shift) and pages without one get no gutter. Measured only while no modal is open: a locked page
 * reports its full width.
 */
function measureScrollbar() {
  if (document.querySelector(".x-dialog:modal")) return;
  const root = document.documentElement;
  root.toggleAttribute("data-x-scrollbar", innerWidth - root.clientWidth > 0);
}

let tracking = 0;
let observer = null;

/**
 * Keeps the scrollbar mark current while dialogs exist on the page (content and window size change it), so a dialog
 * opened any way, even with a direct showModal(), locks the page without a shift. Called by initDialogs and the
 * React Dialog; returns a cleanup.
 */
export function trackScrollbar() {
  if (tracking++ === 0) {
    observer = new ResizeObserver(measureScrollbar);
    observer.observe(document.documentElement);
    if (document.body) observer.observe(document.body);
    addEventListener("resize", measureScrollbar);
  }
  measureScrollbar();
  return () => {
    if (--tracking > 0) return;
    observer?.disconnect();
    observer = null;
    removeEventListener("resize", measureScrollbar);
  };
}

/** Call right before showModal() for an up-to-date measurement (the controller and React do it). */
export function lockScroll() {
  measureScrollbar();
}

/** Call after a dialog closes, to measure again once no modal is open. */
export function unlockScroll() {
  measureScrollbar();
}

/** True when a click on the dialog element landed outside its box (on the ::backdrop). */
export function isBackdropClick(dialog, event) {
  if (event.target !== dialog) return false;
  // Keyboard-triggered clicks report 0,0; never treat those as backdrop clicks.
  if (event.detail === 0) return false;
  const r = dialog.getBoundingClientRect();
  return event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom;
}
