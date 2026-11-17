"use client";

import { useMemo, useState, type ReactNode } from "react";
import "./table.css";

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

export type TableProps<Row> = {
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
const align = (a?: Column<unknown>["align"]) => (a === "end" || a === "center" ? a : undefined);

export function Table<Row>({
  columns, rows, rowKey, caption, title, description, rowHref, empty = "Not found", footer, defaultSort, sort, onSortChange, className,
}: TableProps<Row>) {
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
    <section className={className ? `x-table ${className}` : "x-table"} aria-label={title ? undefined : caption}>
      {title != null && (
        <div className="x-table-head">
          <h3 className="x-table-title">{title}</h3>
          {description != null && <p className="x-table-description">{description}</p>}
        </div>
      )}
      <div className="x-table-scroll">
        <table>
          <caption>{caption}</caption>
          <colgroup>
            {columns.map((c) => <col key={c.key} style={c.width === undefined ? undefined : { width: c.width }} />)}
          </colgroup>
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key} scope="col" data-align={align(c.align)} aria-sort={current?.key === c.key ? current.direction : undefined}>
                  {c.sortValue ? <button type="button" className="x-table-sort" onClick={() => toggle(c.key)}>{c.header}<Arrow /></button> : c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr className="x-table-empty"><td colSpan={columns.length}>{empty}</td></tr>
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
                            {href ? <a className="x-table-link" href={href}>{content}</a> : content}
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
      {footer != null && <div className="x-table-foot">{footer}</div>}
    </section>
  );
}
