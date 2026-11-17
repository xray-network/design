import type { CSSProperties, ReactNode } from "react";
import "./stats.css";

export type StatTone = "positive" | "negative";

export type Stat = {
  /** "Received", "Latency, p95". */
  label: ReactNode;
  /** Formatted value: "+337.90", "84 ms". */
  value: ReactNode;
  /** Colors the value: positive (green) or negative (red). */
  tone?: StatTone;
  /** A note under the value: "ADA, last 14 days". */
  sub?: ReactNode;
  /** Change over the period. `tone` says whether the change is good, independent of its direction
      (latency going down is positive). */
  delta?: { value: ReactNode; direction?: "up" | "down"; tone?: StatTone };
};

export type StatsProps = {
  items: Stat[];
  /** Columns on wide screens; defaults to 4. Phones always show 2. */
  columns?: number;
  className?: string;
};

const ARROWS = { up: "↑", down: "↓" } as const;

/** Key figures in a grid. A description list: each label is a <dt>, value and notes are <dd>. */
export function Stats({ items, columns, className }: StatsProps) {
  return (
    <dl className={className ? `x-stats ${className}` : "x-stats"} style={columns ? ({ "--x-stats-columns": columns } as CSSProperties) : undefined}>
      {items.map((item, i) => (
        <div className="x-stat" key={i}>
          <dt className="x-stat-label">{item.label}</dt>
          <dd className="x-stat-value" data-tone={item.tone}>{item.value}</dd>
          {item.delta != null && (
            <dd className="x-stat-delta" data-tone={item.delta.tone}>
              {item.delta.direction ? `${ARROWS[item.delta.direction]} ` : null}{item.delta.value}
            </dd>
          )}
          {item.sub != null && <dd className="x-stat-sub">{item.sub}</dd>}
        </div>
      ))}
    </dl>
  );
}
