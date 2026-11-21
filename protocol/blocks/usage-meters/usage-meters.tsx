"use client";

import { useId, type ReactNode } from "react";
import { Meter } from "../../components/progress/progress";
import "./usage-meters.css";

export type UsageMeter = {
  label: string;
  used: number;
  limit: number;
  /** After the numbers: "GB". */
  unit?: string;
  /** Under the meter: what is left, or what going over costs. */
  note?: ReactNode;
};

export type UsageMetersProps = {
  title: ReactNode;
  /** When the counts start again: "This billing period ends on Nov 30." */
  period?: ReactNode;
  /** One small button: Upgrade, Manage plan. */
  action?: ReactNode;
  items: UsageMeter[];
  /** How a number is written. Default: grouped digits (3,240). */
  format?: (value: number) => string;
  className?: string;
};

const grouped = (value: number) => value.toLocaleString("en-US");

/** Usage against a plan's limits. A meter warns from 80% and is at its limit at 100%. */
export function UsageMeters({ title, period, action, items, format = grouped, className }: UsageMetersProps) {
  const titleId = useId();
  return (
    <section className={className ? `x-usage-meters ${className}` : "x-usage-meters"} aria-labelledby={titleId}>
      <header className="x-usage-meters-head">
        <div>
          <h2 className="x-usage-meters-title" id={titleId}>{title}</h2>
          {period != null && <p className="x-usage-meters-period">{period}</p>}
        </div>
        {action}
      </header>
      <ul className="x-usage-meters-list">
        {items.map((item) => {
          const text = `${format(item.used)} of ${format(item.limit)}${item.unit ? ` ${item.unit}` : ""}`;
          return (
            <li key={item.label} className="x-usage-meters-item">
              <Meter size="sm" label={item.label} value={item.used} max={item.limit} warning={item.limit * 0.8} danger={item.limit} valueText={text} aria-valuetext={text} />
              {item.note != null && <p className="x-usage-meters-note">{item.note}</p>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
