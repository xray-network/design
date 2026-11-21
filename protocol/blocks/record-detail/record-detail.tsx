"use client";

import { useId, type ReactNode } from "react";
import { Skeleton } from "../../components/skeleton/skeleton";
import "./record-detail.css";

export type RecordDetailProps = {
  /** What identifies the record at a glance: an amount, a name, a number. */
  title: ReactNode;
  /** The record's state: a small Tag with a status dot. */
  status?: ReactNode;
  /** One line under the title: what it is, who, when. */
  sub?: ReactNode;
  /** What can be done to it: small ghost buttons. A destructive one comes last. */
  actions?: ReactNode;
  /** The record's facts, the ones people look up first at the top. */
  facts: { label: string; value: ReactNode }[];
  /** Sections under the facts: RecordSection. */
  children?: ReactNode;
  loading?: boolean;
  className?: string;
};

/** One record in full. The app supplies the record and what its actions do. */
export function RecordDetail({ title, status, sub, actions, facts, children, loading, className }: RecordDetailProps) {
  const titleId = useId();
  return (
    <article className={className ? `x-record-detail ${className}` : "x-record-detail"} aria-labelledby={titleId} aria-busy={loading || undefined}>
      <header className="x-record-detail-head">
        <div className="x-record-detail-id">
          <div className="x-record-detail-line">
            <h2 className="x-record-detail-title" id={titleId}>{loading ? <Skeleton shape="text" width="5em" /> : title}</h2>
            {!loading && status}
          </div>
          {sub != null && <p className="x-record-detail-sub">{loading ? <Skeleton shape="text" width="14em" /> : sub}</p>}
        </div>
        {actions != null && !loading && <div className="x-record-detail-actions">{actions}</div>}
      </header>
      <dl className="x-record-detail-facts">
        {facts.map((fact) => (
          <div key={fact.label} className="x-record-detail-fact"><dt>{fact.label}</dt><dd>{loading ? <Skeleton shape="text" width="8em" /> : fact.value}</dd></div>
        ))}
      </dl>
      {!loading && children}
    </article>
  );
}

/** A titled part of a record under its facts: the timeline, the line items, the raw payload. */
export function RecordSection({ title, children }: { title: ReactNode; children: ReactNode }) {
  const id = useId();
  return (
    <section className="x-record-detail-section" aria-labelledby={id}>
      <h3 className="x-record-detail-heading" id={id}>{title}</h3>
      {children}
    </section>
  );
}
