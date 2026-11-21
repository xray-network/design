/**
 * Calendar: the date logic the HTML controller and the React component share, and the controller itself.
 *
 * Dates are ISO strings ("2026-11-21") and months are "2026-11", so a value is a calendar day, not a moment:
 * no time zone ever moves it. All arithmetic runs in UTC for the same reason.
 */

const pad = (n) => String(n).padStart(2, "0");
const utc = (iso) => { const [y, m, d] = iso.split("-").map(Number); return new Date(Date.UTC(y, m - 1, d || 1)); };
const iso = (date) => `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;

/** Today in the person's own time zone, as an ISO date. */
export function todayISO() {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/** The month of a date: "2026-11-21" is in "2026-11". */
export const monthOf = (date) => date.slice(0, 7);

/** @param {string} date  @param {number} days  @returns {string} */
export function addDays(date, days) {
  const d = utc(date);
  d.setUTCDate(d.getUTCDate() + days);
  return iso(d);
}

/** Moves a date by whole months, staying on the same day where the month has it (Jan 31 + 1 month is Feb 28). */
export function addMonths(date, months) {
  const d = utc(date);
  const day = d.getUTCDate();
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() + months);
  const last = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  d.setUTCDate(Math.min(day, last));
  return iso(d);
}

/** A month moved by whole months: ("2026-11", 2) is "2027-01". */
export const shiftMonth = (month, months) => monthOf(addMonths(`${month}-01`, months));

/**
 * The days a month's grid shows: always six weeks, so the calendar never changes height between months.
 * @param {string} month  "2026-11"
 * @param {number} [weekStartsOn]  0 Sunday … 6 Saturday; default 1, Monday
 * @returns {string[][]} six weeks of seven ISO dates
 */
export function calendarWeeks(month, weekStartsOn = 1) {
  const first = `${month}-01`;
  const lead = (utc(first).getUTCDay() - weekStartsOn + 7) % 7;
  return Array.from({ length: 6 }, (_, week) => Array.from({ length: 7 }, (_, day) => addDays(first, week * 7 + day - lead)));
}

/**
 * The names a calendar shows, from the locale.
 * @param {string} [locale]
 * @param {number} [weekStartsOn]
 */
export function calendarNames(locale = "en-US", weekStartsOn = 1) {
  const zone = { timeZone: "UTC" };
  const short = new Intl.DateTimeFormat(locale, { weekday: "short", ...zone });
  const long = new Intl.DateTimeFormat(locale, { weekday: "long", ...zone });
  const title = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", ...zone });
  const full = new Intl.DateTimeFormat(locale, { dateStyle: "full", ...zone });
  // 2023-01-01 was a Sunday.
  const weekdays = Array.from({ length: 7 }, (_, i) => { const d = new Date(Date.UTC(2023, 0, 1 + ((i + weekStartsOn) % 7))); return { short: short.format(d), long: long.format(d) }; });
  return { weekdays, month: (month) => title.format(utc(`${month}-01`)), day: (date) => full.format(utc(date)) };
}

/**
 * Range selection, one press at a time: the first press starts a range, the second ends it (in either order), and
 * a press on a finished range starts a new one.
 * @param {{ start: string | null, end: string | null }} range
 * @param {string} date
 * @returns {{ start: string | null, end: string | null }}
 */
export function nextRange(range, date) {
  if (!range.start || range.end) return { start: date, end: null };
  return date < range.start ? { start: date, end: range.start } : { start: range.start, end: date };
}

/**
 * Where a day stands in a range: "single" (start and end are the same day), "start", "middle", "end", or null.
 * While a range is open (no end yet), `hover` stands in for the end, so the range is previewed.
 */
export function rangePart(date, range, hover = null) {
  const other = range.end ?? (range.start && hover ? hover : null);
  if (!range.start) return null;
  if (!other) return date === range.start ? "single" : null;
  const [from, to] = other < range.start ? [other, range.start] : [range.start, other];
  if (date < from || date > to) return null;
  return from === to ? "single" : date === from ? "start" : date === to ? "end" : "middle";
}

/** True when a date is outside [min, max]. */
export const outOfBounds = (date, min, max) => Boolean((min && date < min) || (max && date > max));

/**
 * Where a key moves the focused day, or null for keys the calendar leaves alone. Arrows move by a day or a week,
 * Home and End go to the ends of the week, PageUp and PageDown move a month, and with Shift a year.
 */
export function moveByKey(date, key, { shiftKey = false, weekStartsOn = 1 } = {}) {
  const weekday = (utc(date).getUTCDay() - weekStartsOn + 7) % 7;
  switch (key) {
    case "ArrowLeft": return addDays(date, -1);
    case "ArrowRight": return addDays(date, 1);
    case "ArrowUp": return addDays(date, -7);
    case "ArrowDown": return addDays(date, 7);
    case "Home": return addDays(date, -weekday);
    case "End": return addDays(date, 6 - weekday);
    case "PageUp": return addMonths(date, shiftKey ? -12 : -1);
    case "PageDown": return addMonths(date, shiftKey ? 12 : 1);
    default: return null;
  }
}

/** The day that takes Tab: the selected day when the month shows it, else today, else the first of the month. */
export function tabStop(month, selected, today) {
  return [selected, today].find((date) => date && monthOf(date) === month) ?? `${month}-01`;
}

/**
 * Calendar for plain HTML: fills the grid of a .x-calendar and keeps it current.
 *
 *   <div class="x-calendar" data-mode="range" data-start="2026-11-12" data-end="2026-11-18">… see calendar.html</div>
 *
 * Reads, and keeps up to date, on the root: data-mode ("single" by default, or "range"), data-value (single),
 * data-start and data-end (range), data-month (the month on show), data-min, data-max, data-week-start (0 to 6) and
 * the nearest lang. Fires `change` on the root: detail is { value } or { start, end }.
 *
 * @param {HTMLElement} root
 * @returns {() => void} cleanup
 */
export function bindCalendar(root) {
  const title = root.querySelector(".x-calendar-title");
  const table = root.querySelector(".x-calendar-grid");
  if (!title || !table) return () => {};
  const head = table.tHead ?? table.createTHead();
  const body = table.tBodies[0] ?? table.createTBody();
  const weekStartsOn = Number(root.dataset.weekStart ?? 1);
  const names = calendarNames(root.closest("[lang]")?.getAttribute("lang") || "en-US", weekStartsOn);
  const range = () => root.dataset.mode === "range";
  const selection = () => ({ start: root.dataset.start || null, end: root.dataset.end || null });
  const selected = () => (range() ? selection().start : root.dataset.value || null);
  let hover = null;
  let focusNext = null;

  head.replaceChildren(document.createElement("tr"));
  for (const day of names.weekdays) {
    const th = head.rows[0].appendChild(document.createElement("th"));
    th.className = "x-calendar-weekday";
    th.scope = "col";
    th.abbr = day.long;
    th.textContent = day.short;
  }

  const render = () => {
    const month = root.dataset.month || monthOf(selected() ?? todayISO());
    const today = todayISO();
    const stop = focusNext ?? tabStop(month, selected(), today);
    root.dataset.month = month;
    title.textContent = names.month(month);
    body.replaceChildren();
    for (const week of calendarWeeks(month, weekStartsOn)) {
      const row = body.appendChild(document.createElement("tr"));
      for (const date of week) {
        const part = range() ? rangePart(date, selection(), hover) : date === root.dataset.value ? "single" : null;
        const cell = row.appendChild(document.createElement("td"));
        cell.className = "x-calendar-cell";
        cell.setAttribute("role", "gridcell");
        cell.setAttribute("aria-selected", String(Boolean(part)));
        if (part) cell.dataset.range = part;
        if (part && range() && !selection().end) cell.dataset.preview = "";
        const day = cell.appendChild(document.createElement("button"));
        day.type = "button";
        day.className = "x-calendar-day";
        day.dataset.date = date;
        day.textContent = String(Number(date.slice(8)));
        day.setAttribute("aria-label", names.day(date));
        day.tabIndex = date === stop ? 0 : -1;
        day.disabled = outOfBounds(date, root.dataset.min, root.dataset.max);
        if (monthOf(date) !== month) day.dataset.outside = "";
        if (date === today) day.setAttribute("aria-current", "date");
      }
    }
    if (focusNext) body.querySelector(`[data-date="${focusNext}"]`)?.focus();
    focusNext = null;
  };

  const show = (date) => { root.dataset.month = monthOf(date); focusNext = date; render(); };
  const pick = (date) => {
    if (range()) {
      const next = nextRange(selection(), date);
      root.dataset.start = next.start ?? "";
      root.dataset.end = next.end ?? "";
      root.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: next }));
    } else {
      root.dataset.value = date;
      root.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { value: date } }));
    }
    hover = null;
    show(date);
  };

  const dayOf = (event) => /** @type {HTMLElement | null} */ (event.target.closest?.(".x-calendar-day"));
  const onClick = (event) => {
    const step = event.target.closest?.(".x-calendar-step");
    if (step) { root.dataset.month = shiftMonth(root.dataset.month, step.dataset.step === "previous" ? -1 : 1); render(); return; }
    const day = dayOf(event);
    if (day && !day.disabled) pick(day.dataset.date);
  };
  const onKey = (event) => {
    const day = dayOf(event);
    const to = day && moveByKey(day.dataset.date, event.key, { shiftKey: event.shiftKey, weekStartsOn });
    if (!to || outOfBounds(to, root.dataset.min, root.dataset.max)) return;
    event.preventDefault();
    if (range() && selection().start && !selection().end) hover = to;
    show(to);
  };
  // An open range follows the pointer, so the days it would take in are seen before the second press.
  const onOver = (event) => {
    const date = dayOf(event)?.dataset.date ?? null;
    if (!range() || !selection().start || selection().end || date === hover) return;
    hover = date;
    focusNext = root.contains(document.activeElement) ? document.activeElement?.dataset?.date ?? null : null;
    render();
  };

  root.addEventListener("click", onClick);
  root.addEventListener("keydown", onKey);
  root.addEventListener("pointerover", onOver);
  render();
  return () => { root.removeEventListener("click", onClick); root.removeEventListener("keydown", onKey); root.removeEventListener("pointerover", onOver); };
}

/**
 * Binds every .x-calendar under root.
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initCalendars(root = document) {
  const cleanups = [...root.querySelectorAll(".x-calendar")].map((el) => bindCalendar(/** @type {HTMLElement} */ (el)));
  return () => cleanups.forEach((fn) => fn());
}
