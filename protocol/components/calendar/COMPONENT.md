---
id: calendar
name: Calendar
summary: A month of days for picking one day, or a range by its first and last day, with full keyboard support.
motion: 0
requires: [tokens]
components: []
files: [calendar.css, calendar.html, calendar.controller.js, calendar.controller.d.ts, calendar.tsx]
---

# Calendar

Picks a day, or a range of days, by looking at a month: a delivery date, the dates of a stay, the period of a
report. It is the calendar itself, shown in place; put it in a Popover under an Input to make a date field. For a
date people know by heart (a birthday), a typed field is faster.

Dates are ISO strings (`"2026-11-21"`) and months are `"2026-11"`: a value is a calendar day, never a moment, so
no time zone moves it.

## Anatomy

```
div.x-calendar[data-mode][data-frame]              hairline frame, 16px radius, panel surface; as wide as seven days
├── div.x-calendar-head
│   ├── button.x-calendar-step[data-step=previous]     28px, chevron
│   ├── div.x-calendar-title[aria-live=polite]         "November 2026", 14/600, centered
│   └── button.x-calendar-step[data-step=next]
└── table.x-calendar-grid[role=grid][aria-labelledby]  [aria-multiselectable] for a range
    ├── thead › tr › th.x-calendar-weekday[scope=col][abbr]   "Mon": 11px, muted; the full name in abbr
    └── tbody › tr × 6                                 always six weeks: the height never changes between months
        └── td.x-calendar-cell[role=gridcell][aria-selected][data-range][data-preview]
            └── button.x-calendar-day[data-date][tabindex][aria-label][aria-current=date][data-outside]   36px, 10px radius
```

## Variants and sizes

| Attribute | Values | Default |
|---|---|---|
| `data-mode` | `range`: the first press starts a range and the second ends it | one day |
| `data-frame` | `none`: no frame, padding or surface of its own, inside a popover, a card or a dialog | framed |

One size. `--x-calendar-cell` sets the day size; keep it at 36px or more so days stay easy to press.

## States

| State | Source | Look |
|---|---|---|
| selected day | `td[data-range="single"]`, `aria-selected="true"` | accent fill, text on accent |
| range ends | `td[data-range="start" \| "end"]` | accent fill; the band begins and ends under them |
| range middle | `td[data-range="middle"]` | the band: accent wash, rounded where a week breaks it |
| open range | `td[data-preview]` (start picked, no end yet) | the same shape in a quiet fill, following the pointer or the focus |
| today | `aria-current="date"` | heavier number with a dot under it |
| outside the month | `data-outside` | muted; pressing it picks the day and shows its month |
| hover | `:hover` | soft wash |
| focus | `:focus-visible` | ring; one day at a time takes Tab |
| disabled | `disabled` | 40% opacity, skipped by the pointer |

## Accessibility

- The grid is a `table` with `role="grid"`, named by the month title; each day is a button in a `gridcell`,
  labelled with the full date ("Saturday, November 21, 2026"). `aria-selected` marks the day or every day of the range.
- One day is in the Tab order: the selected day, else today, else the first of the month.
- Keyboard: arrows move by a day or a week and carry on into the next month; Home and End go to the ends of the
  week; PageUp and PageDown move a month, with Shift a year; Enter or Space picks.
- The month title is a live region, so a change of month is announced.
- Selection never relies on color alone: `aria-selected` and `aria-current` carry it.
- Names come from `Intl` for the locale (HTML: the nearest `lang`); the week starts on Monday unless set.

## Motion

Tier 0. Fills and text change color on `--x-ease`. The month changes at once: nothing slides, so the days are
readable from the first frame.

## Component tokens

`--x-calendar-cell`, `-pad`, `-day-radius`, `-range-bg`.

## Invariants

- Web: the date logic is shared (`calendar.controller.js`): the HTML controller (`bindCalendar`) and the React
  component both build the grid from it.
- Six weeks, every month. Days from the neighboring months fill the first and last weeks.
- A range is picked in two presses, in either order; a third press starts a new range. While it is open, `end` is
  null: treat the range as not yet chosen.
- The calendar reports a choice and never acts on it: HTML fires `change` on the root with `{ value }` or
  `{ start, end }`; React calls `onValueChange`.
- Values are ISO dates in the person's own calendar day. Convert to a time only where the app needs one.

## Safe edits

- Bounds (`min`, `max`) and days that are off (React: `disabledDate`).
- The first day of the week and the locale.
- Dropping the frame inside another surface; the day size and radius through the tokens.
- Presets beside it ("Last 7 days") that set the range from outside.

## Checklist

- [ ] One day: a press selects it; the selection survives a change of month
- [ ] Range: two presses in either order; the band joins the ends across week breaks; a third press starts over
- [ ] An open range previews under the pointer and under the arrow keys
- [ ] Arrows cross into the next month and the focus follows; Home, End, PageUp, PageDown, with Shift
- [ ] Days outside `min` and `max` cannot be picked or focused by keys
- [ ] The height is the same for every month; both themes; phone width
