---
id: usage-meters
name: UsageMeters
summary: How much of a plan is used, one meter per limit with the amount written out, turning to a warning as a limit gets near.
motion: 0
requires: [tokens]
components: [progress, button]
files: [usage-meters.css, usage-meters.html, usage-meters.tsx]
---

# UsageMeters

The usage page of a plan: bandwidth, build minutes, seats, requests. Each limit is a meter with the amount
written beside it, because "913 of 1,000 GB" answers the question a bar alone cannot. A meter turns to a warning
from 80% and to danger at its limit, and the line under it says what happens next.

The app supplies the numbers, the period and what Upgrade does.

## Anatomy

```
section.x-usage-meters[aria-labelledby]
├── header.x-usage-meters-head
│   ├── div › h2.x-usage-meters-title + p.x-usage-meters-period
│   └── button.x-button                       optional; small, ghost
└── ul.x-usage-meters-list
    └── li.x-usage-meters-item
        ├── div.x-progress[role="meter"][data-size="sm"][data-tone]    label, "913 of 1,000 GB", the bar
        └── p.x-usage-meters-note             optional
```

## Variants and sizes

None.

## States

| State | Source | Look |
|---|---|---|
| near the limit | `data-tone="warning"` on the meter, from 80% | the bar in the warning color |
| at the limit | `data-tone="danger"`, at 100% | the bar in the danger color |

## Accessibility

- Each meter is a `meter` named by its label, with the amount as its value text.
- The amount is always written; the bar's color only repeats it.
- The section is named by its title.

## Motion

Tier 0. None: a meter shows a state, it does not fill in.

## Component tokens

None.

## Invariants

- Every meter writes used and limit in the same unit.
- Warning from 80%, danger at 100%: the same for every meter.
- At most six meters; the plan's other facts belong on the plan page.

## Safe edits

- The limits, the period and the action.
- A note under any meter.

## Checklist

- [ ] A meter at 80% warns and one at 100% is at danger, each also in text
- [ ] Long labels and amounts wrap instead of overlapping
- [ ] Both themes
