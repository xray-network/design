---
id: button
name: Button
summary: Capsule action button, chip button, and quiet square or round icon button.
motion: 0
requires: [tokens]
components: []
files: [button.css, button.html, button.tsx]
---

# Button

Capsule action button (`.x-button`) and quiet icon button (`.x-icon-button`), exactly as in the
XRAY app. Feedback is color only: one step lighter on hover, one step darker on press.

## Anatomy

```
.x-button                    [icon?] label [icon?]    40px, pill, 18px side padding, 14/600
.x-button[data-variant=chip] label                    28px, pill, 12px side padding, 12/700
.x-icon-button               [icon]                   36px square, 10px radius, no fill at rest
.x-icon-button[data-shape=round]                      32px circle, for use inside content
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `.x-button` `data-variant` | `ghost` (hairline), `chip` (small filled capsule), `danger` | primary (accent fill) |
| `.x-button` `data-size` | `sm` 32px / 13px, `lg` 48px / 15px (not for chips) | 40px / 14px |
| `.x-button` `data-width` | `full` | content width |
| `.x-icon-button` `data-size` | `sm` 28px / 8px radius, `xs` 22px / 6px radius | 36px / 10px |
| `.x-icon-button` `data-shape` | `round` (32px circle) | square |

Use one primary button per region. Pair it with `ghost`. Use `chip` for inline helpers next to data
or inside inputs (Max, Paste, Retry). `danger` is a kit extension for destructive confirmations only.

## States

| State | Attribute | Look |
|---|---|---|
| hover | `:hover` | primary `--x-accent-hover`; ghost `--x-border-hover` + `--x-bg-soft`; chip `--x-border-hover` fill; icon `--x-bg-soft` + `--x-fg-1` |
| pressed | `:active` | primary `--x-accent-press`; others keep the hover look |
| focus | `:focus-visible` | global 2px accent ring |
| disabled | `disabled` or `aria-disabled="true"` | 40% opacity, no pointer |
| loading | `aria-busy="true"` | label hidden, width kept, spinner |
| toggled (icon) | `aria-pressed="true"` / `aria-expanded="true"` | like hover |

## Accessibility

- `<button type="button">` unless it submits a form. Links that look like buttons use `<a class="x-button">`.
- Icon buttons need `aria-label`; the icon gets `aria-hidden="true"`.
- Use `aria-disabled="true"` instead of `disabled` when the button must stay focusable to explain why it is unavailable.
- 22px icon buttons are for dense desktop chrome only; on touch layouts use 36px.

## Motion

Tier 0. Background, border and text color transition on `--x-duration-fast` with `--x-ease`. No scale and no spring.

## Component tokens

`--x-button-bg`, `-bg-hover`, `-bg-press`, `-fg`, `-border`, `-border-hover`, `-height`, `-pad`, `-font-size`, `-font-weight`;
`--x-icon-button-size`, `-radius`, `-icon`.

## Invariants (do not change when adapting)

- Pill radius on every `.x-button`. Icon-button radius follows its size (36/10, 28/8, 22/6, round).
- Labels in sentence case, weight 600 (chips 700). No shadows or gradients.
- Icon buttons have no fill at rest.
- The focus ring stays visible.
- State lives in attributes, never in state classes.

## Safe edits

- New variants as new `data-variant` values that only reassign component tokens.
- Leading or trailing icons, a counter, a `kbd` hint.
- Wrapping for routing (`<Link className="x-button">`) or for framework form actions.

## Checklist

- [ ] Both themes: every variant at rest, hover, pressed, focus, disabled and loading
- [ ] Every icon-only button has `aria-label`
- [ ] Keyboard: Tab reaches it; Enter and Space activate it
