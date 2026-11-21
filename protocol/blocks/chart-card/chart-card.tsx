"use client";

import { useId, type ReactNode } from "react";
import { Skeleton } from "../../components/skeleton/skeleton";
import { Delta } from "../../components/tag/tag";
import "./chart-card.css";

export type ChartCardProps = {
  /** What is measured: "Gross volume". */
  title: ReactNode;
  /** The headline number for the period, formatted. */
  value: ReactNode;
  /** The change on the period before, in percent. */
  delta?: number;
  /** What the change is compared with: "on the 30 days before". */
  note?: ReactNode;
  /** The period switch: a small Segmented, or a Select. */
  controls?: ReactNode;
  /** The chart. Give it an aria-label and no title of its own. */
  children: ReactNode;
  /** The chart's height while it loads, in px. */
  height?: number;
  loading?: boolean;
  className?: string;
};

/** One measure: its number now, its change, and its shape over the period. */
export function ChartCard({ title, value, delta, note, controls, children, height = 160, loading, className }: ChartCardProps) {
  const titleId = useId();
  return (
    <section className={className ? `x-chart-card ${className}` : "x-chart-card"} aria-labelledby={titleId} aria-busy={loading || undefined}>
      <header className="x-chart-card-head">
        <h3 className="x-chart-card-title" id={titleId}>{title}</h3>
        {controls != null && <div className="x-chart-card-controls">{controls}</div>}
      </header>
      <div className="x-chart-card-figure">
        <span className="x-chart-card-value">{loading ? <Skeleton shape="text" width="5em" /> : value}</span>
        {!loading && delta !== undefined && <Delta value={delta} />}
        {!loading && note != null && <span className="x-chart-card-note">{note}</span>}
      </div>
      <div className="x-chart-card-plot">{loading ? <Skeleton height={height} /> : children}</div>
    </section>
  );
}
