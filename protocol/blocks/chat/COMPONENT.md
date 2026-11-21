---
id: chat
name: Chat
summary: A conversation with day separators, incoming and outgoing bubbles with times, and a composer to send the next message.
motion: 0
requires: [tokens]
components: [input, button]
files: [chat.css, chat.html, chat.tsx]
---

# Chat

Messages between people, or between a person and support: a messenger thread, a ticket, comments on an order.
Outgoing messages sit at the end side in the accent fill; incoming ones at the start side on a chip. The block
never sends or stores: the composer hands the text to the app.

## Anatomy

```
div.x-chat
├── ol.x-chat-thread[role=log][aria-label]        scrolls; newest at the bottom
│   ├── li.x-chat-day                             "Today", centered, muted
│   └── li.x-chat-message[data-from=me|them]
│       ├── div.x-chat-bubble                     18px radius; the corner by its sender is tighter
│       └── span.x-chat-meta                      time, and the delivery state for outgoing ones
└── form.x-chat-composer
    ├── div.x-input > input[aria-label]           the message
    └── button.x-icon-button[type=submit]         Send
```

Messages from the same sender in a row sit closer together.

## Variants and sizes

None. Height comes from the container: the thread scrolls, the composer stays at the bottom.

## States

| State | Source | Look |
|---|---|---|
| outgoing | `data-from="me"` | accent fill, accent text, end side |
| incoming | `data-from="them"` | chip fill, strong text, start side |
| empty composer | no text | Send is disabled |

## Accessibility

- The thread is `role="log"` with a name: new messages are announced without moving focus.
- Sender is not color alone: side and, for screen readers, a hidden "You:" before outgoing text.
- The input has a name ("Message"); Enter sends.

## Motion

Tier 0. A new message rises 8px and fades in on `--x-spring-soft` (`@starting-style`). Reduced motion: instant.

## Component tokens

`--x-chat-bubble-radius`, `-bubble-max`, `-mine-bg`, `-mine-fg`, `-theirs-bg`.

## Invariants

- One accent: outgoing bubbles. Incoming bubbles stay neutral.
- The thread scrolls inside the block; the composer never scrolls away.

## Safe edits

- Bubble content: a link, a picture, a quoted reply.
- An Avatar before incoming messages in group chats.
- An attach button before the input.

## Checklist

- [ ] Sending appends the message, clears the input and scrolls to it; Enter sends
- [ ] Long words wrap inside the bubble; bubbles never exceed 80% of the width
- [ ] Screen reader announces a new message
- [ ] Both themes; reduced motion
