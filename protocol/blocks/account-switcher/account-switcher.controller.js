import { bindMenu } from "../../components/menu/menu.controller.js";
import { avatarSvg, initAvatars } from "../../components/avatar/avatar.controller.js";

/**
 * Account switcher for plain HTML. Opens the account menu (Menu's controller), and choosing an account
 * marks it checked, copies its avatar, label and balance into the trigger, and fires "change" with
 * detail.id on the .x-account-switcher element.
 *
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initAccountSwitchers(root = document) {
  initAvatars(root);
  const cleanups = [];
  for (const switcher of root.querySelectorAll(".x-account-switcher:not([data-x-ready])")) {
    const trigger = /** @type {HTMLElement | null} */ (switcher.querySelector(".x-account-switcher-trigger"));
    const menu = /** @type {HTMLElement | null} */ (switcher.querySelector(".x-account-switcher-menu"));
    if (!trigger || !menu) continue;
    switcher.setAttribute("data-x-ready", "");

    const onClick = (event) => {
      const item = /** @type {Element} */ (event.target).closest('[role="menuitemradio"]');
      if (!item) return;
      for (const other of menu.querySelectorAll('[role="menuitemradio"]')) other.setAttribute("aria-checked", String(other === item));
      const from = item.querySelector(".x-avatar");
      const to = trigger.querySelector(".x-avatar");
      if (from && to) {
        const seed = from.getAttribute("data-seed") ?? "";
        const palette = from.getAttribute("data-palette") ?? undefined;
        to.setAttribute("data-seed", seed);
        if (palette) to.setAttribute("data-palette", palette);
        to.querySelector(":scope > svg")?.remove();
        to.insertAdjacentHTML("afterbegin", avatarSvg(seed, /** @type {any} */ (palette)));
      }
      for (const part of [".x-account-switcher-label", ".x-account-switcher-sub"]) {
        const text = item.querySelector(part)?.textContent;
        const target = trigger.querySelector(part);
        if (text != null && target) target.textContent = text;
      }
      menu.hidePopover();
      trigger.focus({ preventScroll: true });
      switcher.dispatchEvent(new CustomEvent("change", { detail: { id: item.getAttribute("data-id") }, bubbles: true }));
    };
    menu.addEventListener("click", onClick);
    const unbind = bindMenu(trigger, menu);
    cleanups.push(() => {
      unbind();
      menu.removeEventListener("click", onClick);
      switcher.removeAttribute("data-x-ready");
    });
  }
  return () => cleanups.forEach((fn) => fn());
}
