import { duration, easing } from "../../core/motion.js";

/** The transition in flight for each container, so a new one can finish it first. */
const running = new WeakMap();
/** The screen each container is showing, or heading for. */
const current = new WeakMap();

/**
 * Plays one screen replacing another. Both must be laid out and stacked (the .x-screens grid does that): show
 * `to` first, and hide `from` when the promise resolves.
 *
 * - forward: the new screen slides in from the end, over the old one, which eases back a little and dims.
 * - back: the reverse. The old screen slides away to the end and uncovers the one it came from.
 * - fade: for screens side by side in the hierarchy (tabs). The old one fades out, the new one fades in.
 *
 * The screen that arrives travels on the soft spring; the one that leaves is an exit, on --x-ease.
 * Reduced motion: it resolves at once.
 *
 * @param {HTMLElement} from  the screen that is leaving
 * @param {HTMLElement} to  the screen that is arriving
 * @param {{ direction?: "forward" | "back" | "fade" }} [options]
 * @returns {Promise<boolean>} true when it ran to the end; false when it was cut short
 */
export function screenTransition(from, to, { direction = "forward" } = {}) {
  const container = to.parentElement;
  running.get(container)?.(false);
  const enter = { duration: duration(to, "--x-spring-soft-duration"), easing: easing(to, "--x-spring-soft") };
  const exit = { duration: duration(to, "--x-duration-slow"), easing: easing(to, "--x-ease") };
  if (!enter.duration) return Promise.resolve(true);

  // The one that covers is on top: the arriving screen going forward, the leaving one going back.
  const [top, under] = direction === "back" ? [from, to] : [to, from];
  top.style.zIndex = "1";
  under.style.zIndex = "0";
  from.setAttribute("data-leaving", "");
  from.inert = true;

  const hold = { fill: "both" };
  const animations =
    direction === "fade"
      ? [from.animate([{ opacity: 1 }, { opacity: 0 }], { ...exit, duration: exit.duration / 2, ...hold }), to.animate([{ opacity: 0 }, { opacity: 1 }], { ...exit, delay: exit.duration / 2, duration: exit.duration / 2, ...hold })]
      : direction === "back"
        ? [from.animate([{ translate: "0 0" }, { translate: "100% 0" }], { ...exit, ...hold }), to.animate([{ translate: "-24% 0", opacity: 0.4 }, { translate: "0 0", opacity: 1 }], { ...exit, ...hold })]
        : [to.animate([{ translate: "100% 0" }, { translate: "0 0" }], { ...enter, ...hold }), from.animate([{ translate: "0 0", opacity: 1 }, { translate: "-24% 0", opacity: 0.4 }], { ...exit, ...hold })];

  return new Promise((resolve) => {
    const stop = (finished) => {
      if (running.get(container) === stop) running.delete(container);
      for (const animation of animations) animation.cancel();
      for (const screen of [from, to]) screen.style.zIndex = "";
      from.removeAttribute("data-leaving");
      from.inert = false;
      resolve(finished);
    };
    running.set(container, stop);
    Promise.all(animations.map((animation) => animation.finished)).then(() => stop(true), () => {});
  });
}

/**
 * Screens for plain HTML: shows the screen named `id` in a .x-screens container, with the transition.
 *
 *   <div class="x-screens"> <section class="x-screen" data-screen="list">…</section>
 *     <section class="x-screen" data-screen="detail" hidden>…</section> </div>
 *   showScreen(container, "detail");                       // forward
 *   showScreen(container, "list", { direction: "back" });
 *
 * Focus moves to the new screen's [data-autofocus], or to the screen itself, and `change` fires on the container:
 * detail is { screen, from, direction }.
 *
 * @param {HTMLElement} container
 * @param {string} id
 * @param {{ direction?: "forward" | "back" | "fade" }} [options]
 * @returns {Promise<void>}
 */
export async function showScreen(container, id, { direction = "forward" } = {}) {
  running.get(container)?.(false);
  const screens = [...container.querySelectorAll(":scope > .x-screen")];
  const to = screens.find((screen) => screen.dataset.screen === id);
  const from = current.get(container) ?? screens.find((screen) => !screen.hidden);
  if (!to || to === from) return;
  current.set(container, to);
  to.hidden = false;
  for (const screen of screens) if (screen !== to && screen !== from) screen.hidden = true;
  const target = to.querySelector("[data-autofocus]") ?? to;
  if (target === to) to.tabIndex = -1;
  target.focus({ preventScroll: true });
  container.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { screen: id, from: from?.dataset.screen ?? null, direction } }));
  if (!from) return;
  await screenTransition(from, to, { direction });
  // Cut short or not, the old screen goes, unless a later change has made it the current one again.
  if (current.get(container) !== from) from.hidden = true;
}

/**
 * Wires navigation in markup: a control with data-x-screen-to="id" shows that screen in the container it is in.
 * data-x-screen-direction on it sets the direction ("forward" by default, "back", "fade").
 *
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initScreens(root = document) {
  const onClick = (event) => {
    const control = /** @type {HTMLElement | null} */ (event.target.closest?.("[data-x-screen-to]"));
    const container = control?.closest(".x-screens");
    if (!control || !container) return;
    event.preventDefault();
    showScreen(/** @type {HTMLElement} */ (container), control.dataset.xScreenTo, { direction: /** @type {"forward" | "back" | "fade"} */ (control.dataset.xScreenDirection ?? "forward") });
  };
  root.addEventListener("click", onClick);
  return () => root.removeEventListener("click", onClick);
}
