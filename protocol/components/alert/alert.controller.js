import { duration, easing } from "../../core/motion.js";

/**
 * Dismisses an alert: it fades and folds its height to zero, then is removed (or hidden).
 * Shared by the HTML version (initAlerts) and the React component.
 *
 * @param {HTMLElement} alert
 * @param {{ remove?: boolean }} [options]  remove: true (default) deletes the element; false only hides it.
 * @returns {Promise<void>} resolves when it is gone
 */
export function dismissAlert(alert, { remove = true } = {}) {
  const ms = duration(alert, "--x-duration-slow");
  const done = () => {
    if (remove) alert.remove();
    else alert.hidden = true;
  };
  if (!ms) {
    done();
    return Promise.resolve();
  }
  const { height } = alert.getBoundingClientRect();
  const style = getComputedStyle(alert);
  const animation = alert.animate(
    [
      { height: `${height}px`, opacity: 1, marginBlockStart: style.marginBlockStart, marginBlockEnd: style.marginBlockEnd },
      { height: "0px", opacity: 0, paddingBlock: "0px", marginBlockStart: "0px", marginBlockEnd: "0px", borderWidth: "0px" },
    ],
    { duration: ms, easing: easing(alert, "--x-ease") },
  );
  return animation.finished.then(done, done);
}

/**
 * HTML: any [data-x-alert-dismiss] inside an .x-alert dismisses that alert and fires "dismiss" on it first.
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initAlerts(root = document) {
  const onClick = (event) => {
    const button = /** @type {Element} */ (event.target).closest("[data-x-alert-dismiss]");
    const alert = /** @type {HTMLElement | null} */ (button?.closest(".x-alert"));
    if (!alert) return;
    alert.dispatchEvent(new CustomEvent("dismiss", { bubbles: true }));
    dismissAlert(alert);
  };
  root.addEventListener("click", onClick);
  return () => root.removeEventListener("click", onClick);
}
