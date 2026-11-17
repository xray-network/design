---
id: avatar
name: Avatar
summary: Deterministic account avatar of overlapping angular color areas, with an optional chain badge.
motion: 0
requires: [tokens]
components: []
files: [avatar.css, avatar.html, avatar.controller.js, avatar.controller.d.ts, avatar.tsx]
---

# Avatar

The account mark: a round drawing of a background color and three translated, rotated squares.
Their straight edges form angular color areas in the Jazzicon style, generated from a seed (the account's address). The same seed and palette always give the same avatar, so accounts stay
recognizable without uploaded images.

## Anatomy

```
span.x-avatar[data-seed][data-palette]     36px
├── svg (40×40 viewBox: a background and three transformed squares, clipped round)
└── span.x-avatar-badge[title]              22px circle on the corner: the chain's filled mark
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-size` | `sm` 28px, `lg` 48px | 36px |
| `data-palette` | `ada`, `btc`, `night`, `xray`, `cool` | `ada` |
| `--x-avatar-ring` | the surface behind the avatar | `--x-bg` |

Pick the palette by chain (Cardano `ada`, Bitcoin `btc`, Midnight `night`, Solana `xray`, EVM chains `cool`) and keep it stable.

## Generating

`avatar.controller.js` is shared by every version:

- `avatarShapes(seed, palette)` returns the background color and three squares' fills, translations and rotations (React uses this).
- `avatarSvg(seed, palette)` returns the SVG markup for server templates.
- `initAvatars(root)` draws every `.x-avatar[data-seed]` on a plain HTML page.

## Accessibility

- Decorative: the drawing is `aria-hidden`. Always show the account's label or address as text beside it.
- The badge has a `title` naming the chain.

## Motion

None.

## Component tokens

`--x-avatar-size`, `--x-avatar-ring`.

## Invariants

- Once released, the generator stays as is: changing the hash, the random sequence, the ranges or the palettes would change every user's avatar.
- Areas are flat fills with straight edges; no gradients, outlines or blur. Paint the squares in generator order, with later squares translated further from the center.
- Avatar colors are identity colors and are the same in both themes.

## Safe edits

- New sizes through `--x-avatar-size`.
- A new palette of four colors for a new chain (add it to `PALETTES`; never reorder existing ones).
- Setting `--x-avatar-ring` on a parent (a row on the panel surface, an active tab).

## Checklist

- [ ] Same seed and palette render identically in HTML and React
- [ ] The badge ring matches the surface behind the avatar, also on hover and selected rows
- [ ] Both themes
