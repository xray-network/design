export type CalendarRange = { start: string | null; end: string | null };
export type RangePart = "single" | "start" | "middle" | "end";

export function todayISO(): string;
export function monthOf(date: string): string;
export function addDays(date: string, days: number): string;
export function addMonths(date: string, months: number): string;
export function shiftMonth(month: string, months: number): string;
export function calendarWeeks(month: string, weekStartsOn?: number): string[][];
export function calendarNames(locale?: string, weekStartsOn?: number): {
  weekdays: { short: string; long: string }[];
  month: (month: string) => string;
  day: (date: string) => string;
};
export function nextRange(range: CalendarRange, date: string): CalendarRange;
export function rangePart(date: string, range: CalendarRange, hover?: string | null): RangePart | null;
export function outOfBounds(date: string, min?: string | null, max?: string | null): boolean;
export function moveByKey(date: string, key: string, options?: { shiftKey?: boolean; weekStartsOn?: number }): string | null;
export function tabStop(month: string, selected: string | null | undefined, today: string | null | undefined): string;
export function bindCalendar(root: HTMLElement): () => void;
export function initCalendars(root?: ParentNode): () => void;
