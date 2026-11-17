---
id: alert
name: Alert
summary: A message inside the content, with a tone, an optional title and actions; it can be dismissed.
motion: 1
requires: [tokens, motion]
components: [button]
files: [alert.css, alert.html, alert.controller.js, alert.controller.d.ts, alert.tsx]
---

# Alert

A message that belongs to a place in the content: above a form, at the top of a section, next to
the thing it is about. It stays until it is dismissed or the condition ends. For short confirmations
use Toast; for messages about the whole app use Message.

## Anatomy

```
div.x-alert[data-tone][role]              16px radius; hairline and fill tinted by the tone (8% light, 22% dark)
├── svg.x-alert-icon                      20px, tone color
├── div.x-alert-content
│   ├── p.x-alert-title (optional)        14/600
│   ├── p.x-alert-text                    13px
│   └── div.x-alert-actions (optional)    chip or ghost Buttons
└── button.x-icon-button[data-x-alert-dismiss] (optional)   28px "Dismiss"
```

## Tones

| `data-tone` | Icon | Use |
|---|---|---|
| `info` | information circle | context, upcoming events |
| `success` | check circle | a finished action whose result matters later |
| `warning` | exclamation triangle | something will go wrong unless the user acts |
| `danger` | x circle | something went wrong and is still wrong |

## Behavior

- Dismiss folds the alert away: it fades and its height closes on `--x-duration-slow`, then it is removed
  (HTML) or unmounted (React). `dismissAlert(element)` from the controller does this for both.
- HTML fires `dismiss` on the alert before it goes.

## Accessibility

- `role="alert"` for warning and danger (announced at once), `role="status"` for info and success.
- Status is never color alone: each tone has its icon, and the text says what happened.
- The dismiss button is labelled "Dismiss". Dismissal is never the only way to act on the message.

## Motion

Tier 1: the dismissal is a Web Animation that reads the duration and easing tokens. Reduced motion: removed at once.

## Component tokens

`--x-alert-tone`.

## Invariants

- Tinted fill and hairline come from the tone token; text stays in the regular text colors.
- One alert per message; do not stack more than two in one place.

## Safe edits

- Compact single-line alerts (text only, no title).
- A link in the text, or actions such as Retry.
- Remember dismissal (localStorage) when the message is not important enough to show again.

## Checklist

- [ ] Each tone shows its icon and color in both themes
- [ ] Dismiss folds the alert and the content below moves up smoothly
- [ ] Danger and warning are announced
- [ ] Reduced motion: dismissal is instant
