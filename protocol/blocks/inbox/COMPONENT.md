---
id: inbox
name: Inbox
summary: A list of messages, each row with who sent it, the subject, the first words and the time, with unread ones marked and standing out.
motion: 0
requires: [tokens]
components: [avatar]
files: [inbox.css, inbox.html, inbox.tsx]
---

# Inbox

The message list of a mail app, a help desk queue, a notification center. A row is one message: who sent it, what
it is about, how it starts, when it came. Unread messages carry a dot and their sender and subject are set
heavier, so the list can be scanned for what is new.

The app supplies the messages, newest first, opens one and marks it read. To archive or delete with a swipe, put
each row in the Drag pattern.

## Anatomy

```
ul.x-inbox[aria-label]
└── li
    └── a.x-inbox-row[data-unread][aria-current]     or a button
        ├── span.x-avatar                             optional
        └── span.x-inbox-body
            ├── span.x-inbox-head
            │   ├── span.x-inbox-from
            │   ├── span.x-inbox-marks                optional; small icons (attachment, star)
            │   └── span.x-inbox-time
            ├── span.x-inbox-subject                  one line
            └── span.x-inbox-snippet                  two lines at most
```

## Variants and sizes

None.

## States

| State | Source | Look |
|---|---|---|
| unread | `data-unread` on the row | a dot at the row's edge; sender and subject heavier and in the primary color |
| open | `aria-current="true"` | the active fill: this message is showing beside the list |
| hover | the pointer is over a row | the soft fill |

## Accessibility

- A list with a name; each row is a link or a button.
- Unread is told by weight and the dot together, never by color alone; say "unread" in the row's name where the app can.
- The open message is marked with `aria-current`.

## Motion

Tier 0. The row's fill eases on hover. None otherwise.

## Component tokens

None.

## Invariants

- Sender and subject are one line each; the first words are two lines at most.
- Rows are divided by hairlines and run edge to edge: no cards.
- The time is short: a time today, a weekday this week, a date before that.

## Safe edits

- Rows without avatars, for a dense desktop list.
- A Checkbox before the avatar for picking several.
- A Tag after the subject for a label.

## Checklist

- [ ] Unread rows are found at a glance, in both themes
- [ ] A long sender never pushes the time out
- [ ] 320px wide: nothing overlaps
