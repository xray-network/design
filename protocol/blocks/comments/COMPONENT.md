---
id: comments
name: Comments
summary: A thread under a record, with comments from people, short lines for what changed in between, and a box to add one.
motion: 0
requires: [tokens]
components: [avatar]
blocks: [composer]
files: [comments.css, comments.html, comments.tsx]
---

# Comments

What people said about one thing, and what happened to it in between: under an issue, an order, a document, a
pull request. Comments are a person, a time and their words; changes ("moved this to In progress") are one quiet
line, so the thread reads as a history without the changes drowning the talk.

The app supplies the thread, oldest first, and stores new comments. The box at the end is the
Composer block, inline.

## Anatomy

```
section.x-comments[aria-label]
├── ol.x-comments-list
│   ├── li.x-comments-item
│   │   ├── span.x-avatar
│   │   └── div.x-comments-body
│   │       ├── div.x-comments-head           span.x-comments-author + time.x-comments-time
│   │       └── div.x-comments-text           paragraphs
│   └── li.x-comments-event                   p (who did what) + time.x-comments-time
└── form.x-composer[data-variant="inline"]    optional; the Composer block, with your Avatar
```

## Variants and sizes

None.

## States

None.

## Accessibility

- A section with a name; the thread is an ordered list, oldest first.
- Every time is a `time` element with a machine-readable moment.
- A change names who made it in text; the dot before it is decoration.
- The box has a name of its own ("Add a comment").

## Motion

Tier 0. None.

## Component tokens

None.

## Invariants

- Oldest first: the box is at the end, where the next comment goes.
- A change is one line. If it needs a paragraph, it is a comment.
- Comments are not bubbles: this is a record, not a chat.

## Safe edits

- A Menu on each comment for edit and delete.
- Reactions under a comment's text.
- A Tag after the author for a role.

## Checklist

- [ ] A long word or link wraps inside its comment
- [ ] Changes line up under the avatars
- [ ] Both themes; 320px wide
