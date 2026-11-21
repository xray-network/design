"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Skeleton } from "../skeleton/skeleton";
import "./table-compact.css";

export type Column<Row> = {
  key: string;
  header: ReactNode;
  /** Cell content. Defaults to row[key]. */
  render?: (row: Row) => ReactNode;
  align?: "start" | "center" | "end";
  width?: number | string;
  /** Value to sort by. Giving one makes the column sortable. */
  sortValue?: (row: Row) => number | string;
};

export type Sort = { key: string; direction: "ascending" | "descending" };

export type TableCompactProps<Row> = {
  columns: Column<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  /** Names the table for screen readers. */
  caption: string;
  /** Visible heading above the table, and a line under it. */
  title?: ReactNode;
  description?: ReactNode;
  /** Makes the first cell a link and the whole row clickable. */
  rowHref?: (row: Row) => string | undefined;
  /** Shown as one row when there are no rows. */
  empty?: ReactNode;
  /** Shows skeleton rows instead of data and marks the table busy. */
  loading?: boolean;
  /** How many skeleton rows to show while loading. Default 5. */
  loadingRows?: number;
  /** Under the rows, usually a Pagination. */
  footer?: ReactNode;
  defaultSort?: Sort;
  sort?: Sort;
  onSortChange?: (sort: Sort) => void;
  className?: string;
};

const Arrow = () => (
  <svg className="x-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 4.5v15m0 0 6.75-6.75M12 19.5l-6.75-6.75" />
  </svg>
);
const LinkArrow = () => (
  <svg className="x-table-compact-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);
const align = (a?: Column<unknown>["align"]) => (a === "end" || a === "center" ? a : undefined);

export function TableCompact<Row>({
  columns, rows, rowKey, caption, title, description, rowHref, empty = "Not found", loading = false, loadingRows = 5, footer, defaultSort, sort, onSortChange, className,
}: TableCompactProps<Row>) {
  const [inner, setInner] = useState<Sort | undefined>(defaultSort);
  const current = sort ?? inner;

  const sorted = useMemo(() => {
    const by = columns.find((c) => c.key === current?.key)?.sortValue;
    if (!by || !current) return rows;
    return [...rows].sort((a, b) => {
      const x = by(a), y = by(b);
      const order = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y));
      return current.direction === "ascending" ? order : -order;
    });
  }, [rows, columns, current]);

  const toggle = (key: string) => {
    const next: Sort = { key, direction: current?.key === key && current.direction === "descending" ? "ascending" : "descending" };
    if (sort === undefined) setInner(next);
    onSortChange?.(next);
  };

  return (
    <section className={className ? `x-table-compact ${className}` : "x-table-compact"} aria-label={title ? undefined : caption}>
      {title != null && (
        <div className="x-table-compact-head">
          <h3 className="x-table-compact-title">{title}</h3>
          {description != null && <p className="x-table-compact-description">{description}</p>}
        </div>
      )}
      <div className="x-table-compact-scroll" aria-busy={loading || undefined}>
        <table>
          <caption>{caption}</caption>
          <colgroup>
            {columns.map((c) => <col key={c.key} style={c.width === undefined ? undefined : { width: c.width }} />)}
          </colgroup>
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key} scope="col" data-align={align(c.align)} aria-sort={current?.key === c.key ? current.direction : undefined}>
                  {c.sortValue ? <button type="button" className="x-table-compact-sort" onClick={() => toggle(c.key)}>{c.header}<Arrow /></button> : c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: loadingRows }, (_, r) => (
                <tr key={r} className="x-table-compact-loading">
                  {columns.map((c, i) => {
                    const width = `${[72, 56, 64, 48, 80][(r + i) % 5]}%`;
                    return i === 0
                      ? <th key={c.key} scope="row" data-align={align(c.align)}><Skeleton shape="text" width={width} /></th>
                      : <td key={c.key} data-align={align(c.align)}><Skeleton shape="text" width={width} /></td>;
                  })}
                </tr>
              ))
            ) : sorted.length === 0 ? (
              <tr className="x-table-compact-empty"><td colSpan={columns.length}>{empty}</td></tr>
            ) : (
              sorted.map((row) => {
                const href = rowHref?.(row);
                return (
                  <tr key={rowKey(row)}>
                    {columns.map((c, i) => {
                      const content = c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? "");
                      if (i === 0) {
                        return (
                          <th key={c.key} scope="row" data-align={align(c.align)}>
                            {href ? <a className="x-table-compact-link" href={href}>{content}<LinkArrow /></a> : content}
                          </th>
                        );
                      }
                      return <td key={c.key} data-align={align(c.align)}>{content}</td>;
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {footer != null && <div className="x-table-compact-foot">{footer}</div>}
    </section>
  );
}
