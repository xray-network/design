---
id: timeline
name: Timeline
summary: Events in order, each a dot on a line with a title, a time and an optional note; the last can be pending.
motion: 0
requires: [tokens]
components: []
files: [timeline.css, timeline.html, timeline.tsx]
---

# Timeline

What happened to one thing, in order: a transaction from submitted to confirmed, an account's security
events, an order's delivery. For the stages of a flow the person is going through, use Steps.

## Anatomy

```
ol.x-timeline
└── li.x-timeline-item[data-tone][data-state]
    ├── span.x-timeline-dot (aria-hidden)     8px dot on a 1px line
    └── div.x-timeline-content
        ├── div.x-timeline-head
        │   ├── span.x-timeline-title
        │   └── time.x-timeline-time[datetime] tabular, muted
        └── p.x-timeline-text                 optional note
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-tone` (item) | `accent`, `success`, `warning`, `danger` | neutral dot |
| `data-state` (item) | `pending` | done |

## States

| State | Source | Look |
|---|---|---|
| done | default | filled dot, solid line to the next item |
| pending | `data-state="pending"` | hollow dot, dashed line before it, muted title |

## Accessibility

- An ordered list: the order is the meaning. Newest first or oldest first, but the same on every screen.
- Times are `<time datetime>`, so the exact moment is machine-readable.
- Tone never carries meaning alone: the title says what happened ("Failed", "Confirmed").

## Motion

Tier 0. None: a timeline is a record.

## Component tokens

`--x-timeline-dot`, `-line`, `-tone`, `-gap`.

## Invariants

- The line runs between dots only; it never extends past the first or last item.
- A pending item is the last one in the direction of time.

## Safe edits

- Item content: an avatar or a link in the note; an amount in the head.
- Newest first or oldest first.
- Tones for status events.

## Checklist

- [ ] Line connects every dot and stops at the ends
- [ ] Pending item is hollow with a dashed line
- [ ] Long titles wrap without pushing the time off
- [ ] Both themes; every tone
