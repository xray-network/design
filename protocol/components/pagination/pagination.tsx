"use client";

import { useEffect, useState } from "react";
import "./pagination.css";

export type PaginationProps = {
  /** Current page, starting at 1. */
  page: number;
  onPageChange: (page: number) => void;
  /** Number of pages. Omit it, with `hasNext`, for cursor paging where the total is unknown. */
  pageCount?: number;
  /** Number of items, for the count ("312 items"). */
  total?: number;
  /** Cursor paging: whether a next page exists. Only neighbouring pages are reachable. */
  hasNext?: boolean;
  /** While a page loads. */
  disabled?: boolean;
  "aria-label"?: string;
  className?: string;
};

const Chevron = ({ d }: { d: string }) => (
  <svg className="x-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);
const plural = (n: number, one: string, many: string) => `${n.toLocaleString("en-US")} ${n === 1 ? one : many}`;

export function Pagination({ page, onPageChange, pageCount, total, hasNext, disabled, className, "aria-label": label = "Pages" }: PaginationProps) {
  const cursor = pageCount === undefined;
  const last = pageCount ?? page + (hasNext ? 1 : 0);
  const canPrevious = !disabled && page > 1;
  const canNext = !disabled && (cursor ? Boolean(hasNext) : page < last);
  const [draft, setDraft] = useState(String(page));
  useEffect(() => setDraft(String(page)), [page]);

  const commit = () => {
    const parsed = Math.trunc(Number(draft));
    const next = Number.isFinite(parsed) && draft.trim() ? Math.min(last, Math.max(1, parsed)) : page;
    setDraft(String(next));
    if (!disabled && next !== page) onPageChange(next);
  };

  return (
    <nav className={className ? `x-pagination ${className}` : "x-pagination"} aria-label={label}>
      <span className="x-pagination-control">
        <button type="button" className="x-pagination-step" aria-label="Previous page" disabled={!canPrevious} onClick={() => onPageChange(page - 1)}>
          <Chevron d="M15.75 19.5 8.25 12l7.5-7.5" />
        </button>
        <input
          className="x-pagination-input"
          type="number"
          inputMode="numeric"
          aria-label="Page number"
          min={1}
          max={cursor ? undefined : last}
          value={draft}
          disabled={disabled || cursor}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => { if (e.key === "Enter") commit(); }}
        />
        <button type="button" className="x-pagination-step" aria-label="Next page" disabled={!canNext} onClick={() => onPageChange(page + 1)}>
          <Chevron d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </button>
      </span>
      <span className="x-pagination-count">
        {cursor ? `Page ${page.toLocaleString("en-US")}` : `${plural(last, "page", "pages")}${total != null ? ` · ${plural(total, "item", "items")}` : ""}`}
      </span>
    </nav>
  );
}
