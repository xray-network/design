import type { ReactNode } from "react";
import "../../components/input/input.css";
import "./table-view.css";

export type TableViewProps = {
  /** Names the whole view ("Payments"). */
  "aria-label": string;
  /** The search field. Leave out for a table that is short enough to scan. */
  search?: { value: string; onChange: (value: string) => void; label: string; placeholder?: string };
  /** One or two filters: a small Segmented, Chips, a Select. */
  filters?: ReactNode;
  /** The view's actions, at the end of the toolbar: Export, New. */
  actions?: ReactNode;
  /** The Table. */
  children: ReactNode;
  /** What is showing of what there is: "1–20 of 312", "3 results". */
  count?: ReactNode;
  /** The Pagination. */
  pagination?: ReactNode;
  className?: string;
};

const Glass = () => <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>;

/** A table with its search, filters, count and pages. The app filters, sorts and pages the rows. */
export function TableView({ search, filters, actions, children, count, pagination, className, "aria-label": label }: TableViewProps) {
  return (
    <section className={className ? `x-table-view ${className}` : "x-table-view"} aria-label={label}>
      {(search || filters != null || actions != null) && (
        <div className="x-table-view-toolbar">
          {search && <div className="x-input x-table-view-search" data-size="sm"><Glass /><input type="search" aria-label={search.label} placeholder={search.placeholder} value={search.value} onChange={(event) => search.onChange(event.target.value)} /></div>}
          {filters != null && <div className="x-table-view-filters">{filters}</div>}
          {actions != null && <div className="x-table-view-actions">{actions}</div>}
        </div>
      )}
      {children}
      {(count != null || pagination != null) && (
        <footer className="x-table-view-foot">
          {count != null && <span className="x-table-view-count" aria-live="polite">{count}</span>}
          {pagination}
        </footer>
      )}
    </section>
  );
}
