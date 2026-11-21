---
id: post
name: Post
summary: One item of a feed, with who posted and when, the text, an optional media area, and a row of actions with counts.
motion: 0
requires: [tokens]
components: [avatar, button, skeleton]
files: [post.css, post.html, post.controller.js, post.controller.d.ts, post.tsx]
---

# Post

The unit of a feed or a timeline: a status update, a photo, an announcement, a comment. Posts stack with a
hairline between them; a media post puts its picture between the text and the actions. The block never fetches
or counts: the app supplies the content and reacts to the actions.

## Anatomy

```
article.x-post[aria-labelledby]
├── header.x-post-head
│   ├── span.x-post-lead                 the author's Avatar
│   ├── div.x-post-author
│   │   ├── span.x-post-name
│   │   └── span.x-post-meta             "@handle · 2h", muted
│   └── .x-icon-button                   optional: the post's menu
├── p.x-post-text                        optional
├── div.x-post-media[data-ratio]         optional: a picture or video, 14px radius
└── footer.x-post-actions
    └── button.x-post-action[aria-pressed][aria-label]   icon + count: like, reply, repost, share
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `.x-post-media` `data-ratio` | `square`, `portrait` (4:5) | 16:9 |

## States

| State | Source | Look |
|---|---|---|
| action hover | `:hover` | soft wash, strong text |
| action on | `aria-pressed="true"` | accent ink; the icon fills and pops once |
| loading | `aria-busy="true"` | skeletons for the author, two lines of text and the counts |

## Accessibility

- An `article` named by its author line, so a feed reads as separate items.
- Every action is a button with a name that includes its count ("Like, 248"); toggles carry `aria-pressed`.
- Media needs its own text alternative from the app.

## Motion

Tier 0. A toggled action's icon pops on `--x-spring` once; colors change on `--x-ease`. Counts never animate.
Reduced motion: no pop.

## Component tokens

`--x-post-gap`, `-media-radius`.

## Invariants

- Counts and state come from the app; a press fires `toggle` (HTML: an event with `detail.action` and
  `detail.pressed`; React: the action's `onPress`) and shows the new state at once.
- On is the accent ink, the kit's selection color; no per-action colors.

## Safe edits

- Which actions show, and their icons.
- A Tag or a verified mark after the name; a quoted post inside the body.
- Media ratio, or several pictures in a grid inside the media area.

## Checklist

- [ ] Tab reaches the menu and every action; Space and Enter toggle
- [ ] Long names shorten; text wraps; media keeps its ratio
- [ ] Loading keeps the post's height
- [ ] Both themes; reduced motion
