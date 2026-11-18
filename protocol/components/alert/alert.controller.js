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
  /** @type {Animation | undefined} */
  let animation;
  let done = () => {
    if (remove) alert.remove();
    else alert.hidden = true;
    animation?.cancel();
  };
  if (!ms) {
    done();
    return Promise.resolve();
  }
  const { height } = alert.getBoundingClientRect();
  const style = getComputedStyle(alert);
  // In a flex or grid stack the gap to the neighbour stays after the height folds, then vanishes at once when the
  // alert goes: fold it too. In flex, a negative margin on the alert toward the neighbour, ending at minus the gap.
  // Grid rows never shrink below zero, so there the neighbour's own margin takes the gap instead.
  const parent = alert.parentElement ? getComputedStyle(alert.parentElement) : null;
  const gap = parent && /flex|grid/.test(parent.display) ? parseFloat(parent.rowGap) || 0 : 0;
  const grid = gap > 0 && /grid/.test(parent.display);
  const visible = (el) => el && !el.hidden && getComputedStyle(el).display !== "none";
  const next = visible(alert.nextElementSibling) ? /** @type {HTMLElement} */ (alert.nextElementSibling) : null;
  const previous = !next && visible(alert.previousElementSibling) ? /** @type {HTMLElement} */ (alert.previousElementSibling) : null;
  const toNext = gap > 0 && !grid && !!next;
  const toPrevious = gap > 0 && !grid && !!previous;
  if (grid && (next || previous)) {
    const neighbour = next ?? previous;
    const side = next ? "marginBlockStart" : "marginBlockEnd";
    const from = parseFloat(getComputedStyle(neighbour)[side]) || 0;
    const shift = neighbour.animate([{ [side]: `${from}px` }, { [side]: `${from - gap}px` }], {
      duration: ms,
      easing: easing(alert, "--x-ease"),
      fill: "forwards",
    });
    const cancel = () => shift.cancel();
    const finish = done;
    // The neighbour lets go in the same frame the alert (and with it the gap) leaves the layout.
    done = () => { finish(); cancel(); };
  }
  // Borders never animate below 1px (browsers round them up until the last frame), so they stay, and the margin
  // takes their width too: the alert's outer height still ends at exactly zero, with no step at the end.
  const borders = (parseFloat(style.borderTopWidth) || 0) + (parseFloat(style.borderBottomWidth) || 0);
  animation = alert.animate(
    [
      { height: `${height}px`, opacity: 1, marginBlockStart: style.marginBlockStart, marginBlockEnd: style.marginBlockEnd },
      {
        height: "0px",
        opacity: 0,
        paddingBlock: "0px",
        marginBlockStart: toPrevious ? `${-gap}px` : "0px",
        marginBlockEnd: `${-(toNext ? gap : 0) - borders}px`,
      },
    ],
    // Held at the end until the alert is removed or hidden, so it never springs back for a frame.
    { duration: ms, easing: easing(alert, "--x-ease"), fill: "forwards" },
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
