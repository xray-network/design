"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Pagination } from "../pagination/pagination";
import { Skeleton } from "../skeleton/skeleton";
import "./table.css";

export type TableColumn<Row> = {
  key: string;
  header: ReactNode;
  /** Cell content. Defaults to row[key]. */
  render?: (row: Row) => ReactNode;
  align?: "start" | "center" | "end";
  width?: number | string;
  /** Value to sort by. Giving one makes the column sortable. */
  sortValue?: (row: Row) => number | string;
};

export type TableSort = { key: string; direction: "ascending" | "descending" };

export type TableProps<Row> = {
  columns: TableColumn<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  /** Names the table for screen readers. */
  caption: string;
  /** Shown as one row when there are no rows. */
  empty?: ReactNode;
  /** Shows skeleton rows instead of data, marks the table busy and disables paging. */
  loading?: boolean;
  /** How many skeleton rows to show while loading. Defaults to the page size, or 5. */
  loadingRows?: number;
  /** Rows per page. Pages the rows with Pagination under the table; omit to show all. */
  pageSize?: number;
  /** Current page (controlled), starting at 1. */
  page?: number;
  onPageChange?: (page: number) => void;
  defaultSort?: TableSort;
  sort?: TableSort;
  onSortChange?: (sort: TableSort) => void;
  className?: string;
};

const Arrow = () => (
  <svg className="x-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 4.5v15m0 0 6.75-6.75M12 19.5l-6.75-6.75" />
  </svg>
);
const align = (a?: "start" | "center" | "end") => (a === "end" || a === "center" ? a : undefined);

/** A data table like the docs' tables, with optional sorting and paging. */
export function Table<Row>({
  columns, rows, rowKey, caption, empty = "Nothing here yet", loading = false, loadingRows, pageSize, page, onPageChange, defaultSort, sort, onSortChange, className,
}: TableProps<Row>) {
  const [innerSort, setInnerSort] = useState<TableSort | undefined>(defaultSort);
  const [innerPage, setInnerPage] = useState(1);
  const currentSort = sort ?? innerSort;
  const pageCount = pageSize ? Math.max(1, Math.ceil(rows.length / pageSize)) : 1;
  const currentPage = Math.min(page ?? innerPage, pageCount);

  // Back to a valid page when the rows shrink.
  useEffect(() => { if (page === undefined && innerPage > pageCount) setInnerPage(pageCount); }, [page, innerPage, pageCount]);

  const sorted = useMemo(() => {
    const by = columns.find((c) => c.key === currentSort?.key)?.sortValue;
    if (!by || !currentSort) return rows;
    return [...rows].sort((a, b) => {
      const x = by(a), y = by(b);
      const order = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y));
      return currentSort.direction === "ascending" ? order : -order;
    });
  }, [rows, columns, currentSort]);

  const visible = pageSize ? sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize) : sorted;

  const toggle = (key: string) => {
    const next: TableSort = { key, direction: currentSort?.key === key && currentSort.direction === "descending" ? "ascending" : "descending" };
    if (sort === undefined) setInnerSort(next);
    onSortChange?.(next);
  };
  const goTo = (next: number) => {
    if (page === undefined) setInnerPage(next);
    onPageChange?.(next);
  };

  return (
    <div className={className ? `x-table ${className}` : "x-table"}>
      <div className="x-table-frame" aria-busy={loading || undefined}>
        <table>
          <caption>{caption}</caption>
          <colgroup>
            {columns.map((c) => <col key={c.key} style={c.width === undefined ? undefined : { width: c.width }} />)}
          </colgroup>
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key} scope="col" data-align={align(c.align)} aria-sort={currentSort?.key === c.key ? currentSort.direction : undefined}>
                  {c.sortValue ? <button type="button" className="x-table-sort" onClick={() => toggle(c.key)}>{c.header}<Arrow /></button> : c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: loadingRows ?? pageSize ?? 5 }, (_, r) => (
                <tr key={r} className="x-table-loading">
                  {columns.map((c, i) => {
                    // Varied widths read as text; the same pattern on every render.
                    const width = `${[72, 56, 64, 48, 80][(r + i) % 5]}%`;
                    return i === 0
                      ? <th key={c.key} scope="row" data-align={align(c.align)}><Skeleton shape="text" width={width} /></th>
                      : <td key={c.key} data-align={align(c.align)}><Skeleton shape="text" width={width} /></td>;
                  })}
                </tr>
              ))
            ) : visible.length === 0 ? (
              <tr className="x-table-empty"><td colSpan={columns.length}>{empty}</td></tr>
            ) : (
              visible.map((row) => (
                <tr key={rowKey(row)}>
                  {columns.map((c, i) => {
                    const content = c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? "");
                    return i === 0
                      ? <th key={c.key} scope="row" data-align={align(c.align)}>{content}</th>
                      : <td key={c.key} data-align={align(c.align)}>{content}</td>;
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {pageSize && rows.length > pageSize ? (
        <div className="x-table-foot">
          <Pagination page={currentPage} pageCount={pageCount} total={rows.length} onPageChange={goTo} disabled={loading} aria-label={`${caption} pages`} />
        </div>
      ) : null}
    </div>
  );
}
