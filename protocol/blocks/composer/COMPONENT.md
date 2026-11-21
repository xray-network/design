---
id: composer
name: Composer
summary: The box you write a post or a reply in, which grows with the text, counts what is left and sends when there is something to send.
motion: 0
requires: [tokens]
components: [button, avatar]
files: [composer.css, composer.html, composer.tsx, composer.controller.js, composer.controller.d.ts]
---

# Composer

Where a post, a comment or a reply is written. The box grows with the text instead of scrolling, the button wakes
up when there is something to send, and with a limit the count of what is left sits beside it. Inline, it is a
one-line reply box for the foot of a thread.

The app supplies what sending does. For a message in a conversation use the composer of the
Chat block.

## Anatomy

```
form.x-composer[data-variant="inline"][data-max][data-over]
├── span.x-composer-lead                      optional; the author's Avatar
└── div.x-composer-body
    ├── textarea.x-composer-input[aria-label] grows with the text, to 240px
    └── div.x-composer-foot
        ├── div.x-composer-tools              small icon buttons; not inline
        ├── span.x-composer-count[aria-live]  characters left, with data-max; not inline
        └── button.x-button[type="submit"]    disabled while there is nothing to send
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-variant` | `inline`: one line, the button beside the text | a box with a foot |
| `data-max` | the most characters allowed | no limit |

## States

| State | Source | Look |
|---|---|---|
| empty | no text | the button is disabled |
| over the limit | `data-over` | the count turns to the danger color; the button is disabled |
| focus | the text box has the focus | the frame's hairline steps up |

## Accessibility

- The text box has a name (`aria-label`); the placeholder is not the name.
- The count is a polite live region.
- Enter sends from the one-line box (Shift + Enter for a new line); in the tall box Ctrl or Cmd + Enter sends.
- Every tool is an icon button with a name.

## Motion

Tier 0. The frame's border eases on focus. None otherwise.

## Component tokens

None.

## Invariants

- The box grows to 240px, then scrolls.
- One button, and it says what happens (Post, Reply, Comment), not Submit.
- The count shows what is left, not what is written.

## Safe edits

- The tools, the limit and the button's text.
- Attachments shown between the text and the foot.

## Checklist

- [ ] The button is disabled until there is text, and when the limit is passed
- [ ] Pasting a long text grows the box, then scrolls it
- [ ] Both themes; 320px wide
