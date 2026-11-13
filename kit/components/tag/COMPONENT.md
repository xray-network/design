---
id: tag
name: Tag, Status and Delta
summary: Outlined label, status dot with text, and signed change.
motion: 0
requires: [tokens]
components: []
files: [tag.css, tag.html, tag.tsx]
---

# Tag, Status and Delta

Three small, non-interactive labels:

- **Tag** (`.x-tag`): an outlined label for a short fact: network, epoch, role.
- **Status** (`.x-status`): a colored dot with its text: Delegated, Syncing, Offline.
- **Delta** (`.x-delta`): a signed change: +2.4%.

For something the user can press, use a Button (`chip`) or Chips.

## Anatomy

```
span.x-tag[data-size][data-tone]         32px, 10px radius, outlined, 13/600  (sm: 22px, 6px radius, 12px text)
└── [span.x-status-dot]  label

span.x-status[data-tone]                 no outline, 13/600
└── span.x-status-dot  label

span.x-delta[data-trend]                 13/600, tabular digits
```

## Variants

| Attribute | Values | Default |
|---|---|---|
| `.x-tag` `data-size` | `sm` | 32px |
| `data-tone` (on the dot's parent) | `danger`, `warning`, `neutral` | success (green) |
| `.x-delta` `data-trend` | `up`, `down` | flat (muted) |

## Accessibility

- Color never carries the meaning alone: a status always has text, a delta always has its sign (+ or a true minus −).
- Dots are `aria-hidden`.
- For live status that changes while visible, put the Status in an `aria-live="polite"` region.

## Motion

None. Status dots do not pulse (RULES.md section 8: nothing loops).

## Component tokens

`--x-status-color`.

## Invariants

- Tags are outlined, not filled; they are never accent blue.
- Delta text uses `--x-success-fg` / `--x-danger-fg`, the text-safe status colors, not the bright fills.
- Not interactive: no hover, no pointer.

## Safe edits

- A leading icon in a tag.
- New status tones by setting `--x-status-color` to a token.
- Delta for absolute values ("+12.40 ADA") by writing the text yourself with the same `data-trend`.

## Checklist

- [ ] Every status has text; every delta has a sign
- [ ] Both themes: delta colors are readable on the canvas
