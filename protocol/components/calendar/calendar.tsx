"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactElement } from "react";
import { calendarNames, calendarWeeks, monthOf, moveByKey, nextRange, outOfBounds, rangePart, shiftMonth, tabStop, todayISO, type CalendarRange } from "./calendar.controller.js";
import "./calendar.css";

export type { CalendarRange };

type CalendarBase = {
  /** The month on show, "2026-11". Controlled; leave it out and the calendar keeps its own. */
  month?: string;
  /** The month shown first. Default: the selected day's month, or the current one. Set it when rendering on a server. */
  defaultMonth?: string;
  onMonthChange?: (month: string) => void;
  /** The first and last day that can be picked, as ISO dates. */
  min?: string;
  max?: string;
  /** Days that cannot be picked: weekends, holidays, days already taken. */
  disabledDate?: (date: string) => boolean;
  /** 0 Sunday … 6 Saturday. Default 1, Monday. */
  weekStartsOn?: number;
  /** A BCP 47 locale for the names. Default "en-US". */
  locale?: string;
  /** false: no frame of its own, for a calendar inside a popover or a card. */
  frame?: boolean;
  /** Names the grid when the month's name is not enough ("Stay"): it is read with the month, "Stay, November 2026". */
  "aria-label"?: string;
  className?: string;
};

export type CalendarSingleProps = CalendarBase & {
  mode?: "single";
  /** The selected day as an ISO date, "2026-11-21". */
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string) => void;
};

export type CalendarRangeProps = CalendarBase & {
  mode: "range";
  /** The selected range. `end` is null while only the first day is picked. */
  value?: CalendarRange;
  defaultValue?: CalendarRange;
  onValueChange?: (value: CalendarRange) => void;
};

const Chevron = ({ d }: { d: string }) => <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>;
const NONE: CalendarRange = { start: null, end: null };

/** A month of days, for picking one day or, with mode="range", a first and a last day. Dates are ISO strings. */
export function Calendar(props: CalendarSingleProps): ReactElement;
export function Calendar(props: CalendarRangeProps): ReactElement;
export function Calendar(props: CalendarSingleProps | CalendarRangeProps): ReactElement {
  const { month: monthProp, defaultMonth, onMonthChange, min, max, disabledDate, weekStartsOn = 1, locale = "en-US", frame = true, className, "aria-label": label } = props;
  const range = props.mode === "range";
  const titleId = useId();
  const grid = useRef<HTMLTableElement>(null);

  const [own, setOwn] = useState<string | null | CalendarRange>(props.defaultValue ?? (range ? NONE : null));
  const value = props.value !== undefined ? props.value : own;
  const picked: CalendarRange = range ? ((value as CalendarRange | null) ?? NONE) : { start: value as string | null, end: value as string | null };

  // Today is read after mounting, so a page rendered on a server on another day never disagrees with the browser.
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(todayISO()), []);

  const [ownMonth, setOwnMonth] = useState(() => defaultMonth ?? monthOf(picked.start ?? todayISO()));
  const month = monthProp ?? ownMonth;
  const [hover, setHover] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const moveFocus = useRef(false);

  const names = useMemo(() => calendarNames(locale, weekStartsOn), [locale, weekStartsOn]);
  const weeks = useMemo(() => calendarWeeks(month, weekStartsOn), [month, weekStartsOn]);
  const off = (date: string) => outOfBounds(date, min, max) || Boolean(disabledDate?.(date));
  const open = range && Boolean(picked.start) && !picked.end;
  const stop = focused && monthOf(focused) === month ? focused : tabStop(month, picked.start, today);

  const show = (next: string) => { if (next !== month) { setOwnMonth(next); onMonthChange?.(next); } };
  // After a key moved the day (and maybe the month), the new day takes the focus.
  useEffect(() => {
    if (!moveFocus.current || !focused) return;
    moveFocus.current = false;
    grid.current?.querySelector<HTMLElement>(`[data-date="${focused}"]`)?.focus();
  }, [focused, month]);

  const pick = (date: string) => {
    setFocused(date);
    setHover(null);
    show(monthOf(date));
    if (props.mode === "range") {
      const next = nextRange(picked, date);
      setOwn(next);
      props.onValueChange?.(next);
    } else {
      setOwn(date);
      props.onValueChange?.(date);
    }
  };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, date: string) => {
    const to = moveByKey(date, event.key, { shiftKey: event.shiftKey, weekStartsOn });
    if (!to || outOfBounds(to, min, max)) return;
    event.preventDefault();
    moveFocus.current = true;
    setFocused(to);
    if (open) setHover(to);
    show(monthOf(to));
  };

  return (
    <div className={className ? `x-calendar ${className}` : "x-calendar"} data-mode={range ? "range" : undefined} data-frame={frame ? undefined : "none"}>
      <div className="x-calendar-head">
        <button type="button" className="x-calendar-step" data-step="previous" aria-label="Previous month" disabled={Boolean(min) && shiftMonth(month, -1) < monthOf(min!)} onClick={() => show(shiftMonth(month, -1))}>
          <Chevron d="M15.75 19.5 8.25 12l7.5-7.5" />
        </button>
        <div className="x-calendar-title" id={titleId} aria-live="polite">{names.month(month)}</div>
        <button type="button" className="x-calendar-step" data-step="next" aria-label="Next month" disabled={Boolean(max) && shiftMonth(month, 1) > monthOf(max!)} onClick={() => show(shiftMonth(month, 1))}>
          <Chevron d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </button>
      </div>
      <table ref={grid} className="x-calendar-grid" role="grid" aria-labelledby={label ? undefined : titleId} aria-label={label ? `${label}, ${names.month(month)}` : undefined} aria-multiselectable={range || undefined} onPointerLeave={() => setHover(null)}>
        <thead>
          <tr>{names.weekdays.map((day) => <th key={day.long} className="x-calendar-weekday" scope="col" abbr={day.long}>{day.short}</th>)}</tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <tr key={week[0]}>
              {week.map((date) => {
                const part = rangePart(date, picked, open ? hover : null);
                return (
                  <td key={date} className="x-calendar-cell" role="gridcell" aria-selected={Boolean(part)} data-range={part ?? undefined} data-preview={part && open ? "" : undefined}>
                    <button
                      type="button"
                      className="x-calendar-day"
                      data-date={date}
                      data-outside={monthOf(date) === month ? undefined : ""}
                      tabIndex={date === stop ? 0 : -1}
                      disabled={off(date)}
                      aria-label={names.day(date)}
                      aria-current={date === today ? "date" : undefined}
                      onClick={() => pick(date)}
                      onKeyDown={(event) => onKeyDown(event, date)}
                      onPointerEnter={open ? () => setHover(date) : undefined}
                    >
                      {Number(date.slice(8))}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
