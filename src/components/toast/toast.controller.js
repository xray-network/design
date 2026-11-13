import { afterTransition, createFlip } from "../../motion/motion.js";

const CLOSE_ICON = '<svg class="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6l12 12"/></svg>';

/**
 * Toaster for any framework. Creates (or adopts) the live region and returns toast().
 *
 *   import { createToaster } from "./toast.controller.js";
 *   const { toast } = createToaster();
 *   toast("Address copied", { tone: "success" });
 *   toast("Transaction failed", { tone: "danger", action: { label: "Retry", onClick: retry } });
 *
 * - new toasts enter from below on the liquid spring; the stack reflows with FLIP on the soft spring
 * - at most `max` toasts; the oldest leaves first
 * - timers pause while the pointer or focus is inside the region
 *
 * @param {{ region?: HTMLElement, max?: number }} [options]
 */
export function createToaster({ region, max = 3 } = {}) {
  const owned = !region;
  if (!region) {
    region = document.createElement("section");
    region.className = "x-toaster";
    region.setAttribute("aria-label", "Notifications");
    document.body.append(region);
  }
  const host = region;
  host.setAttribute("aria-live", "polite");
  if (!host.hasAttribute("popover")) host.setAttribute("popover", "manual");

  const timers = new Map(); // toast -> { remaining, started, id }
  const flip = createFlip(() => host.children);
  let paused = false;

  // The region stays open (it is empty and click-through when idle). Re-entering the top layer
  // keeps it above a modal dialog that opened after it.
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

  /**
   * @param {string} message
   * @param {{ tone?: "success" | "danger" | "info", duration?: number, action?: { label: string, onClick: () => void }, dismissible?: boolean }} [options]
   *   duration: ms before it leaves on its own; Infinity keeps it until dismissed. Default 4000, 6000 with an action.
   */
  function toast(message, { tone, duration, action, dismissible = true } = {}) {
    const el = document.createElement("div");
    el.className = "x-toast";
    if (tone) {
      el.dataset.tone = tone;
      const dot = document.createElement("span");
      dot.className = "x-toast-dot";
      dot.setAttribute("aria-hidden", "true");
      el.append(dot);
    }
    const text = document.createElement("p");
    text.className = "x-toast-message";
    text.textContent = message;
    el.append(text);

    if (action) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "x-button";
      button.dataset.variant = "chip";
      button.textContent = action.label;
      button.addEventListener("click", () => { action.onClick(); dismiss(el); });
      el.append(button);
    }
    if (dismissible) {
      const close = document.createElement("button");
      close.type = "button";
      close.className = "x-icon-button";
      close.dataset.size = "xs";
      close.setAttribute("aria-label", "Dismiss");
      close.innerHTML = CLOSE_ICON;
      close.addEventListener("click", () => dismiss(el));
      el.append(close);
    }

    raise();
    flip.measure();
    host.append(el);
    flip.play();

    timers.set(el, { remaining: duration ?? (action ? 6000 : 4000), started: 0, id: null });
    startTimer(el);

    const live = [...host.children].filter((c) => c.getAttribute("data-state") !== "closing");
    for (const old of live.slice(0, Math.max(0, live.length - max))) dismiss(/** @type {HTMLElement} */ (old));

    return { dismiss: () => dismiss(el) };
  }

  const pause = () => { paused = true; timers.forEach((_, el) => stopTimer(el)); };
  const resume = () => {
    if (host.matches(":hover, :focus-within")) return;
    paused = false;
    timers.forEach((_, el) => startTimer(el));
  };
  host.addEventListener("pointerenter", pause);
  host.addEventListener("pointerleave", resume);
  const onFocusOut = () => setTimeout(resume);
  host.addEventListener("focusin", pause);
  host.addEventListener("focusout", onFocusOut);

  raise();

  return {
    toast,
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
