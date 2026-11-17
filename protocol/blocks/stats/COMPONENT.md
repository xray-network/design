---
id: stats
name: Stats
summary: Key figures in a grid, each with a label, a value, and a note or a change.
motion: 0
requires: [tokens]
components: []
files: [stats.css, stats.html, stats.tsx]
---

# Stats

A row of key figures at the top of a dashboard or an account screen: what came in, what went out,
how a service is doing. Three or four figures; more belongs in a table.

## Anatomy

```
dl.x-stats                         grid, --x-stats-columns (default 4), 20px row gap, 24px column gap
└── div.x-stat
    ├── dt.x-stat-label            13px, third text color
    ├── dd.x-stat-value[data-tone] 24/800, tabular, one line
    ├── dd.x-stat-delta[data-tone] (optional) "↑ 6.2%", 13/600
    └── dd.x-stat-sub (optional)   13px note: unit and period, "No incidents"
```

## Variants

| Option | Values | Default |
|---|---|---|
| columns | `--x-stats-columns` / `columns` | 4; 2 on phones |
| value tone | `data-tone="positive"` / `"negative"` | regular text color |
| delta tone | `data-tone="positive"` / `"negative"` | third text color |

## Accessibility

- A description list: screen readers read each label with its value.
- The delta tone says whether a change is good, not its direction: latency going down is positive.
  The arrow shows the direction, so color never carries the meaning alone.

## Component tokens

`--x-stats-columns`.

## Invariants

- Values stay on one line; long values are cut with an ellipsis, so the unit goes in the note.
- Signs in values use the real minus (−), not a hyphen.

## Safe edits

- Columns and gaps.
- A sparkline under the value.
- Each stat as a link to its detail page.

## Checklist

- [ ] Columns match the count on wide screens, two on phones
- [ ] Values do not wrap
- [ ] Positive and negative tones readable in both themes
