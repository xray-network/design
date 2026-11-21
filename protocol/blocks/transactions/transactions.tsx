"use client";

import { useState, type ReactNode } from "react";
import { Chips } from "../../components/chips/chips";
import { List, ListHeading, ListIcon, ListRow } from "../../components/list/list";
import { Skeleton, skeletonWidth } from "../../components/skeleton/skeleton";
import { Pagination } from "../../components/pagination/pagination";
import "./transactions.css";

export type TransactionKind = "sent" | "received" | "refund";

export type Transaction = {
  id: string;
  kind: TransactionKind;
  /** Group heading: "Today", "Yesterday", "Nov 9". Items arrive newest first. */
  day: string;
  title: ReactNode;
  /** "14:02 · from Jane Cooper". */
  sub?: ReactNode;
  /** Signed, formatted: "+$250.00", "−$42.17". */
  amount: string;
  fiat?: ReactNode;
};

export type TransactionsProps = {
  items: Transaction[];
  title?: ReactNode;
  /** Right side of the header, usually a "View all" link. */
  action?: ReactNode;
  pageSize?: number;
  onSelect?: (item: Transaction) => void;
  /** While the history loads: placeholder rows (the current rows' structure, or `pageSize` rows when there are none yet); rows are not clickable and paging is disabled. */
  loading?: boolean;
  className?: string;
};

const ICONS: Record<TransactionKind, string> = {
  sent: "M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25",
  received: "M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25",
  refund: "M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3",
};
const FILTERS = [
  { value: "all", label: "All" },
  { value: "sent", label: "Sent" },
  { value: "received", label: "Received" },
  { value: "refund", label: "Refunds" },
] as const;

export function Transactions({ items, title = "Recent activity", action, pageSize = 8, onSelect, loading, className }: TransactionsProps) {
  const [filter, setFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  // While loading with no data yet: placeholder rows in one group, so the list has its shape.
  const source = loading && items.length === 0
    ? Array.from({ length: Math.min(pageSize, 5) }, (_, i): Transaction => ({ id: `loading-${i}`, kind: "received", day: "", title: "", sub: "", amount: "", fiat: "" }))
    : items;
  const shown = filter === "all" ? source : source.filter((t) => t.kind === filter);
  const pageCount = Math.max(1, Math.ceil(shown.length / pageSize));
  const current = Math.min(page, pageCount);
  const slice = shown.slice((current - 1) * pageSize, current * pageSize);
  const days = slice.reduce<{ day: string; items: Transaction[] }[]>((groups, t) => {
    const last = groups[groups.length - 1];
    if (last?.day === t.day) last.items.push(t);
    else groups.push({ day: t.day, items: [t] });
    return groups;
  }, []);
  const count = (kind: string) => (kind === "all" ? undefined : items.filter((t) => t.kind === kind).length || undefined);

  return (
    <section className={className ? `x-transactions ${className}` : "x-transactions"} aria-label={typeof title === "string" ? title : undefined} aria-busy={loading || undefined}>
      <div className="x-transactions-head">
        <h2>{title}</h2>
        {action}
      </div>
      <Chips
        aria-label="Transaction type"
        value={[filter]}
        onValueChange={(v) => { setFilter(v[0] ?? "all"); setPage(1); }}
        options={FILTERS.map((f) => ({ value: f.value, label: f.label, count: count(f.value) }))}
      />
      {days.length === 0 ? (
        <p className="x-transactions-empty">No transactions yet</p>
      ) : (
        <div className="x-transactions-days">
          {days.map((group) => (
            <List key={group.day} className="x-transactions-day" aria-label={loading ? "Loading" : group.day}>
              <ListHeading>{loading ? <Skeleton shape="text" width={skeletonWidth(group.day.length + group.items.length, 3.5, 6, "em")} /> : group.day}</ListHeading>
              {group.items.map((t) => (
                <ListRow
                  key={t.id}
                  title={t.title}
                  sub={t.sub}
                  end={t.amount}
                  endSub={t.fiat}
                  tone={t.kind === "sent" ? undefined : "positive"}
                  lead={
                    <ListIcon tone={t.kind === "sent" ? undefined : "positive"}>
                      <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={ICONS[t.kind]} /></svg>
                    </ListIcon>
                  }
                  onClick={onSelect && !loading ? () => onSelect(t) : undefined}
                  loading={loading}
                />
              ))}
            </List>
          ))}
        </div>
      )}
      {pageCount > 1 && (
        <div className="x-transactions-foot">
          <Pagination page={current} pageCount={pageCount} total={shown.length} onPageChange={setPage} disabled={loading} aria-label="Transaction pages" />
        </div>
      )}
    </section>
  );
}
