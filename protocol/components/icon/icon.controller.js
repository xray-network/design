import * as outline from "./icons.js";
import * as brands from "./brands.js";

/**
 * Icons by name, for HTML pages and tools that look icons up at runtime. React components import icons
 * directly instead (import { bell } from "./icons.js"), so a bundler keeps only the ones they use.
 */
const registry = new Map();
for (const icon of [...Object.values(outline), ...Object.values(brands)]) registry.set(icon.name, icon);

/** Adds project icons ({ name, body } with a 24×24 body; brand: true for filled marks). A name already taken is replaced. */
export function registerIcons(icons) {
  for (const icon of Array.isArray(icons) ? icons : Object.values(icons)) registry.set(icon.name, icon);
}

/** One icon by name, or undefined. */
export function getIcon(name) {
  return registry.get(name);
}

/** Every registered icon: the interface set first, then brands, then project icons. */
export function allIcons() {
  return [...registry.values()];
}

const escape = (text) => String(text).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

/**
 * The SVG markup of an icon, for templates and server rendering.
 * @param {string | { name: string, body: string, brand?: boolean }} icon  an icon or its name
 * @param {{ size?: "sm" | "md" | "lg", label?: string }} [options]  label: an accessible name; without it the icon is decorative
 */
export function iconSvg(icon, { size, label } = {}) {
  const data = typeof icon === "string" ? registry.get(icon) : icon;
  if (!data) throw new Error(`Unknown icon: ${icon}`);
  const attrs = [
    'class="x-icon"',
    'viewBox="0 0 24 24"',
    size ? `data-size="${size}"` : "",
    data.brand ? 'data-set="brand"' : "",
    label ? `role="img" aria-label="${escape(label)}"` : 'aria-hidden="true"',
  ].filter(Boolean);
  return `<svg ${attrs.join(" ")}>${data.body}</svg>`;
}

/**
 * HTML: fills every <svg data-x-icon="name"> inside root with that icon. Keeps the element's own class,
 * data-size and aria-label. Unknown names are left empty and reported in the console.
 * @param {ParentNode} [root]
 */
export function initIcons(root = document) {
  for (const el of root.querySelectorAll("svg[data-x-icon]")) {
    const icon = registry.get(el.getAttribute("data-x-icon"));
    if (!icon) {
      console.warn(`Unknown icon: ${el.getAttribute("data-x-icon")}`);
      continue;
    }
    el.classList.add("x-icon");
    el.setAttribute("viewBox", "0 0 24 24");
    if (icon.brand) el.setAttribute("data-set", "brand");
    if (!el.hasAttribute("aria-label")) el.setAttribute("aria-hidden", "true");
    else el.setAttribute("role", "img");
    el.innerHTML = icon.body;
  }
}
