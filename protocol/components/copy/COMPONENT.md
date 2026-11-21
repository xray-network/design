---
id: copy
name: Copy
summary: A value people copy whole (an address, a hash, a key, a code, a link) with a copy button; long values shorten in the middle so both ends stay readable.
motion: 0
requires: [tokens]
components: [button]
files: [copy.css, copy.html, copy.controller.js, copy.controller.d.ts, copy.tsx]
---

# Copy

Shows a value and copies it in one press: wallet addresses, transaction hashes, API keys, referral codes, invite
links. Long identifiers shorten in the middle, because people compare them by their first and last characters;
the end always shows. Links and codes shorten at the end instead. To show a value in full (a receive screen, a
key shown once), use the `block` variant.

## Anatomy

```
div.x-copy[data-variant][data-font]
├── span.x-copy-value                  the full value, in two parts
│   ├── span.x-copy-head               everything but the end; shortens with an ellipsis
│   └── span.x-copy-tail               the last characters (6 by default), never cut; empty to shorten at the end
├── button.x-icon-button.x-copy-button the icon turns into a check while data-copied is set
│   ├── svg.x-icon.x-copy-icon
│   └── svg.x-icon.x-copy-done
└── span.x-copy-status[role=status]    "Copied", for screen readers (visually hidden)
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-variant` | `block`: the full value wrapped in a framed panel, the button on the right | inline, shortened |
| `data-font` | `sans`: body type, for codes and links that are read rather than compared | mono, tabular |

## States

| State | Source | Look |
|---|---|---|
| copied | `data-copied` on the root, for 1.6s | check icon in success color; "Copied" announced |
| hover | `:hover` on the button | Icon button hover |

## Accessibility

- The full value stays in the DOM (both parts), so screen readers and text selection get all of it. Shortening is
  visual only.
- The button says what it copies ("Copy address", "Copy invite link"); after copying, a status region announces
  "Copied".
- Mono with tabular figures by default: characters keep their width, so two values compare by eye.

## Motion

Tier 0. The check pops in on `--x-spring`; it returns on `--x-ease`. Reduced motion: instant.

## Component tokens

`--x-copy-font-size`.

## Invariants

- The tail is never cut when the value shortens in the middle: the last characters are what people check.
- The button copies the full value, never the shortened text.
- Copying fires `copied` (HTML: a `copied` event with `detail.value`; React: `onCopy`), not the native `copy` event.

## Safe edits

- Tail length (4–8 characters), or none to shorten at the end.
- A label or a network tag before the value.
- A toast on copy, in addition to the check, when the button is far from where people look.

## Checklist

- [ ] Narrow container: the middle shortens and the tail stays whole (or the end shortens when there is no tail)
- [ ] The button copies the full value; the check shows, then returns; "Copied" is announced
- [ ] Selecting the text selects the full value
- [ ] Both themes; `block` wraps the full value with balanced lines; `sans`
