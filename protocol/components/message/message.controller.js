import { afterTransition, createFlip } from "../../core/motion.js";

const CLOSE = '<svg class="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6l12 12"/></svg>';

/** The outline icon for each tone. */
export const MESSAGE_ICONS = {
  info: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z",
  success: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  warning: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z",
  danger: "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
};

/**
 * Messages for any framework. Creates (or adopts) the top-right region and returns message().
 *
 *   import { createMessenger } from "./message.controller.js";
 *   const { message } = createMessenger();
 *   message({ tone: "success", title: "Payment confirmed", text: "A receipt is on its way to your inbox." });
 *   message({ tone: "warning", title: "Seat limit reached", action: { label: "Change plan", onClick } , duration: Infinity });
 *
 * - the newest message is on top; it slides in from the right on the liquid spring
 * - the stack reflows with FLIP on the soft spring; at most `max` messages, the oldest leaves first
 * - timers pause while the pointer or focus is inside the region
 *
 * @param {{ region?: HTMLElement, max?: number, position?: "top" | "bottom" }} [options]
 */
export function createMessenger({ region, max = 4, position } = {}) {
  const owned = !region;
  if (!region) {
    region = document.createElement("section");
    region.className = "x-messages";
    region.setAttribute("aria-label", "Messages");
    document.body.append(region);
  }
  const host = region;
  if (position === "bottom") host.dataset.position = "bottom";
  host.setAttribute("aria-live", "polite");
  if (!host.hasAttribute("popover")) host.setAttribute("popover", "manual");

  const timers = new Map(); // message -> { remaining, started, id }
  const flip = createFlip(() => host.children);
  let paused = false;

  // Re-entering the top layer keeps the region above a modal dialog that opened after it.
  const raise = () => {
    if (typeof host.showPopover !== "function") return;
    if (host.matches(":popover-open")) {
      if (!document.querySelector("dialog:modal")) return;
      host.hidePopover();
    }
    host.showPopover();
  };

  const startTimer = (el) => {
    const t = timers.get(el);
    if (!t || !Number.isFinite(t.remaining) || paused) return;
    t.started = performance.now();
    t.id = setTimeout(() => dismiss(el), t.remaining);
  };
  const stopTimer = (el) => {
    const t = timers.get(el);
    if (!t || t.id == null) return;
    clearTimeout(t.id);
    t.id = null;
    t.remaining -= performance.now() - t.started;
  };

  function dismiss(el) {
    if (!el.isConnected || el.dataset.state === "closing") return;
    stopTimer(el);
    timers.delete(el);
    el.dataset.state = "closing";
    afterTransition(el, () => {
      flip.measure();
      el.remove();
      flip.play();
    }, "--x-duration-base");
  }

  const node = (tag, className, text) => {
    const el = document.createElement(tag);
    el.className = className;
    if (text != null) el.textContent = text;
    return el;
  };

  /**
   * @param {{ title?: string, text?: string, tone?: "info" | "success" | "warning" | "danger", duration?: number,
   *   action?: { label: string, onClick: () => void }, dismissible?: boolean }} options
   *   duration: ms before it leaves on its own; Infinity keeps it until dismissed. Default 6000, 10000 with an action.
   */
  function message({ title, text, tone, duration, action, dismissible = true }) {
    const el = node("div", "x-message");
    el.setAttribute("role", tone === "danger" || tone === "warning" ? "alert" : "status");
    if (tone) {
      el.dataset.tone = tone;
      el.insertAdjacentHTML("beforeend", `<svg class="x-message-icon x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${MESSAGE_ICONS[tone]}"/></svg>`);
    }
    const content = node("div", "x-message-content");
    if (title) content.append(node("p", "x-message-title", title));
    if (text) content.append(node("p", "x-message-text", text));
    if (action) {
      const actions = node("div", "x-message-actions");
      const button = node("button", "x-button", action.label);
      button.type = "button";
      button.dataset.variant = "chip";
      button.addEventListener("click", () => { action.onClick(); dismiss(el); });
      actions.append(button);
      content.append(actions);
    }
    el.append(content);
    if (dismissible) {
      const close = node("button", "x-icon-button");
      close.type = "button";
      close.dataset.size = "sm";
      close.setAttribute("aria-label", "Dismiss");
      close.innerHTML = CLOSE;
      close.addEventListener("click", () => dismiss(el));
      el.append(close);
    }

    raise();
    flip.measure();
    host.prepend(el);
    flip.play();

    timers.set(el, { remaining: duration ?? (action ? 10000 : 6000), started: 0, id: null });
    startTimer(el);

    const live = [...host.children].filter((c) => c.getAttribute("data-state") !== "closing");
    for (const old of live.slice(max)) dismiss(/** @type {HTMLElement} */ (old));

    return { dismiss: () => dismiss(el) };
  }

  const pause = () => { paused = true; timers.forEach((_, el) => stopTimer(el)); };
  const resume = () => {
    if (host.matches(":hover, :focus-within")) return;
    paused = false;
    timers.forEach((_, el) => startTimer(el));
  };
  const onFocusOut = () => setTimeout(resume);
  host.addEventListener("pointerenter", pause);
  host.addEventListener("pointerleave", resume);
  host.addEventListener("focusin", pause);
  host.addEventListener("focusout", onFocusOut);

  raise();

  return {
    message,
    dismissAll: () => [...host.children].forEach((el) => dismiss(/** @type {HTMLElement} */ (el))),
    destroy: () => {
      timers.forEach((t) => t.id != null && clearTimeout(t.id));
      timers.clear();
      host.removeEventListener("pointerenter", pause);
      host.removeEventListener("pointerleave", resume);
      host.removeEventListener("focusin", pause);
      host.removeEventListener("focusout", onFocusOut);
      if (owned) host.remove();
    },
  };
}
