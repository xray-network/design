---
id: typography
name: Typography
summary: Headings, body text, paragraphs, inline code and keyboard keys on the kit's type scale, so content text matches the components.
motion: 0
requires: [tokens]
components: []
files: [typography.css, typography.html, typography.tsx]
---

# Typography

Text that is not part of a component: page and section titles, paragraphs, secondary notes, inline code
and keyboard shortcuts. Use it so headings and copy follow the same scale, weights and colors as the
controls around them.

## Platform contract

Native GUI implementations map each level and tone to the platform's scalable text styles (Dynamic Type,
Material type scale, JavaFX CSS), keep the weight steps (500 body, 600 label, 700 title) and the color roles,
and let text wrap and grow with the user's font size.

## Anatomy

```
h1–h4.x-title[data-level]          700, --x-fg-1; levels 1–4: 34 / 24 / 22 / 15px
p.x-text, span.x-text              500, --x-fg-2, 14px, body leading
  [data-size=sm|xs]                13 / 12px
  [data-tone=secondary|muted|success|danger]
  [data-weight=label|title]        600 / 700
p.x-paragraph                      prose: 14px (the body size), 1.65 leading, max 68ch, 12px between paragraphs
  [data-size=sm|lg|lead]           13px fine print (--x-fg-3) / 16px articles / 18px lead
code.x-code                        mono, 0.9em, --x-bg-chip fill, 6px radius
kbd.x-kbd                          mono 11px, hairline, 6px radius, 22px tall
```

## Variants

| Attribute | Values |
|---|---|
| `.x-title` `data-level` | `1` article title, `2` page title (shell), `3` page title (app), `4` section title |
| `.x-text` `data-size` | `sm`, `xs` |
| `.x-text` `data-tone` | `secondary` (`--x-fg-3`), `muted` (`--x-fg-4`), `success`, `danger` (text colors, AA on the canvas) |
| `.x-text` `data-weight` | `label`, `title` |
| `.x-paragraph` `data-size` | `sm` (fine print), `lg` (16px, articles), `lead` (18px, an intro under a title); default 14px |

Use `.x-text` for short text in UI (labels, notes, one-line values) and `.x-paragraph` for prose: descriptions,
help, articles. Links and `strong` inside a paragraph take the link color and `--x-fg-1`.

## Accessibility

- Keep the document outline: choose the heading element by structure and `data-level` by look.
- Muted text is for non-essential text only (legal, placeholders); essential text stays at `secondary` or stronger.
- Status tones always come with words, never color alone.

## Motion

None.

## Component tokens

None: the type scale tokens (`--x-text-*`, `--x-weight-*`, `--x-leading-*`) are the API.

## Invariants

- Titles use `--x-weight-title` and `--x-fg-1`; body text uses `--x-weight-body` (500) and `--x-fg-2`.
- Sizes come only from `--x-text-*` tokens.

## Safe edits

- Another heading element for a level (`h2.x-title[data-level=1]`).
- Truncation (`text-overflow: ellipsis`) on single-line text in tight rows.

## Checklist

- [ ] Heading elements follow the outline; levels follow the look
- [ ] Secondary and muted text keep AA contrast for their purpose in both themes
- [ ] Text grows with the user's font size without clipping
