---
id: icon
name: Icon
summary: 24×24 outline icons (interface, social and crypto) that take the text color, by import or by name.
motion: 0
requires: [tokens]
components: []
files: [icon.css, icon.html, icons.js, icons.d.ts, socials.js, socials.d.ts, crypto.js, crypto.d.ts, icon.controller.js, icon.controller.d.ts, icon.tsx]
---

# Icon

The icons XRAY interfaces use, in one place, all in one outline style: **interface icons** (`icons.js`),
**social icons** for networks and messengers (`socials.js`, `category: "social"`), and **crypto icons** for the
chains XRAY works with (`crypto.js`, `category: "crypto"`). Every icon is a 24×24 drawing stroked with the text
color, so it follows hover, disabled and theme states with no extra CSS.

## Anatomy

```
svg.x-icon[viewBox="0 0 24 24"][data-size][data-set]   18px by default; stroke and caps from tokens
└── path, circle, rect                                  the icon's body
```

## Using icons

| Where | How |
|---|---|
| React | `import { Icon } from "./icon"` and `import { bell } from "./icons.js"` (or from `socials.js`, `crypto.js`), then `<Icon icon={bell} />`. Each icon is its own export, so a build keeps only the icons it imports. |
| HTML | Paste the icon's `body` into `<svg class="x-icon" viewBox="0 0 24 24" aria-hidden="true">`, or write `<svg data-x-icon="bell"></svg>` and call `initIcons()` from `icon.controller.js`. |
| Strings | `iconSvg("bell", { size: "sm" })` returns the markup, for templates and server rendering. |
| Your own icons | Add an export to `icons.js` (a 24×24 outline `body` without stroke attributes), or call `registerIcons([...])` at runtime. A filled mark sets `brand: true`. |

The wiki's Icons page lists every icon with its name.

## Variants

| Option | Values | Default |
|---|---|---|
| `data-size` / `size` | `sm` 14, `md` 16, `lg` 18 | `lg` |
| `data-set="brand"` | for filled marks a project registers with `brand: true`: filled, no stroke | outline |
| `--x-icon-size` | any length | `--x-icon-lg` |
| `--x-icon-stroke` | stroke width for outline icons | `--x-stroke-icon` (1.75) |

## Accessibility

- Decorative by default (`aria-hidden="true"`): most icons sit next to text that already names the action.
- An icon that is the only content of a control gets its name on the control (`aria-label` on the button or link).
  A standalone meaningful icon gets `label` / `aria-label`, which also sets `role="img"`.
- Icons never carry meaning by color alone.

## Motion

None. Icons rotate or move only as part of their component (a chevron that turns, for example).

## Component tokens

`--x-icon-size`, `--x-icon-stroke`.

## Invariants

- 24×24 viewBox, `currentColor`, no fills on outline icons, no hard-coded stroke widths in bodies.
- Social and crypto icons are trademarks of their owners: use them only to refer to that service or chain.
- Sources: interface icons from Heroicons (MIT) and Lucide (ISC), plus XRAY drawings; social and crypto icons from
  Tabler Icons (MIT), plus XRAY drawings (Farcaster, Substack, the XRAY mark, and chains Tabler lacks, after the XRAY
  app's chain marks). Keep the license notes at the top of `icons.js`, `socials.js` and `crypto.js`.

## Safe edits

- Add icons to `icons.js`, keeping the 24×24 outline style.
- Remove icons a project never uses.
- Other sizes through `--x-icon-size`; a lighter or heavier stroke through `--x-icon-stroke`.

## Checklist

- [ ] The icon follows the text color in both themes and in hover and disabled states
- [ ] Icon-only controls have an accessible name
- [ ] New icons use a 24×24 viewBox and no stroke attributes
