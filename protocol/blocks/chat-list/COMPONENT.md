---
id: chat-list
name: ChatList
summary: The list of conversations, each row with who it is, the last message, when it came and how many are unread.
motion: 0
requires: [tokens]
components: [list, avatar]
files: [chat-list.css, chat-list.html, chat-list.tsx]
---

# ChatList

The first screen of a messenger, and the inbox of anything that has conversations: support, a marketplace, a
team. Each row is one conversation: who, the last thing said, when, and how much of it you have not read.

The app supplies the conversations, newest first, and opens one (the Chat block).

## Anatomy

```
div.x-list.x-chat-list[role="list"][aria-label]
└── a.x-list-row[role="listitem"][data-unread]        or a button
    ├── span.x-avatar
    ├── span.x-list-text
    │   ├── span.x-list-title                          the name
    │   └── span.x-list-sub                            the last message, one line
    └── span.x-list-end
        ├── span.x-list-sub                            the time
        └── span.x-chat-list-count[data-muted]         optional; "99+" above 99
```

## Variants and sizes

None.

## States

| State | Source | Look |
|---|---|---|
| unread | `data-unread` on the row | the last message takes the primary text color; the count shows |
| muted | `data-muted` on the count | a grey count |

## Accessibility

- A list with a name; each row is a link or a button.
- The count is named in words ("2 unread").
- Unread is told by the count and the text color together, never by color alone.

## Motion

Tier 0. None.

## Component tokens

None.

## Invariants

- One line for the name and one for the last message; both shorten.
- The time is short: a time today, a weekday this week, a date before that.
- A count above 99 reads 99+.
- A row is the same height read or unread: the count's line is kept when there is no count.

## Safe edits

- A status dot on the Avatar for people who are online.
- A pin or a mute icon before the time.
- ListHeading rows to group pinned and all.

## Checklist

- [ ] A long name and a long message both shorten and never push the time out
- [ ] Unread rows are found at a glance
- [ ] Both themes; 320px wide
