"use client";

import { useState, type ReactNode } from "react";
import { Chips } from "../../components/chips/chips";
import { List, ListHeading, ListIcon, ListRow } from "../list/list";
import { Pagination } from "../../components/pagination/pagination";
import "./transactions.css";

export type TransactionKind = "sent" | "received" | "staking";

export type Transaction = {
  id: string;
  kind: TransactionKind;
  /** Group heading: "Today", "Yesterday", "Nov 9". Items arrive newest first. */
  day: string;
  title: ReactNode;
  /** "14:02 · from addr1q9…7xk2". */
  sub?: ReactNode;
  /** Signed, formatted: "+250.00 ADA", "−42.17 ADA". */
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
  className?: string;
};

const ICONS: Record<TransactionKind, string> = {
  sent: "M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25",
  received: "M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25",
  staking: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
};
const FILTERS = [
  { value: "all", label: "All" },
  { value: "sent", label: "Sent" },
  { value: "received", label: "Received" },
  { value: "staking", label: "Staking" },
] as const;

export function Transactions({ items, title = "Recent activity", action, pageSize = 8, onSelect, className }: TransactionsProps) {
  const [filter, setFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  const shown = filter === "all" ? items : items.filter((t) => t.kind === filter);
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
    <section className={className ? `x-transactions ${className}` : "x-transactions"} aria-label={typeof title === "string" ? title : undefined}>
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
            <List key={group.day} className="x-transactions-day" aria-label={group.day}>
              <ListHeading>{group.day}</ListHeading>
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
                  onClick={onSelect ? () => onSelect(t) : undefined}
                />
              ))}
            </List>
          ))}
        </div>
      )}
      {pageCount > 1 && (
        <div className="x-transactions-foot">
          <Pagination page={current} pageCount={pageCount} total={shown.length} onPageChange={setPage} aria-label="Transaction pages" />
        </div>
      )}
    </section>
  );
}
