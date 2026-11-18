/**
 * Tabs for plain HTML: clicking a tab makes it the current one (aria-current="page") and fires
 * a "change" event on the .x-tabs element with detail.value (the tab's data-value).
 * In an app with a router, set aria-current from the route instead and skip this controller.
 * Views: a tab with aria-controls shows that .x-tabs-panel and hides the others; a <template data-lazy> inside a
 * panel is rendered the first time the panel shows.
 *
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initTabs(root = document) {
  const onClick = (event) => {
    const target = /** @type {Element} */ (event.target);
    if (target.closest(".x-tab-action")) return;
    const tab = target.closest(".x-tab-main, button.x-tab");
    const tabs = tab?.closest(".x-tabs");
    if (!tab || !tabs) return;
    for (const other of tabs.querySelectorAll('[aria-current="page"]')) other.removeAttribute("aria-current");
    tab.setAttribute("aria-current", "page");
    for (const other of tabs.querySelectorAll("[aria-controls]")) {
      const panel = document.getElementById(other.getAttribute("aria-controls") ?? "");
      if (!panel?.classList.contains("x-tabs-panel")) continue;
      panel.hidden = other !== tab;
      if (other === tab) for (const template of panel.querySelectorAll("template[data-lazy]")) template.replaceWith(template.content.cloneNode(true));
    }
    tab.scrollIntoView({ block: "nearest", inline: "nearest" });
    tabs.dispatchEvent(new CustomEvent("change", { detail: { value: tab.getAttribute("data-value") }, bubbles: true }));
  };
  root.addEventListener("click", onClick);
  return () => root.removeEventListener("click", onClick);
}
