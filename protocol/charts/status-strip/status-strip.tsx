"use client";

import { useEffect, useRef } from "react";
import type { ChartData } from "../../core/chart.js";
import { bindStatusStrip } from "./status-strip.controller.js";
import "../../core/chart.css";
import "./status-strip.css";

export type { ChartData };

export type StatusStripProps = {
  /** The chart's data, as its table: the first column in `labels`, every other column a series. */
  data: ChartData;
  /** Shown above the chart, and its accessible name. Without one, pass aria-label. */
  title?: string;
  "aria-label"?: string;
  /** The header of the first column of the data table: what the rows are. */
  category?: string;
  /** The plot's height in px, where the chart has one of its own. */
  height?: number;
  /** How a value is written on the chart and in the table. Default: short numbers (12.9K). */
  format?: (value: number) => string;
  /** "table" shows the data table in place of the plot. */
  view?: "chart" | "table";
  className?: string;
};

/** A row of thin bars, one per period, colored by the state of a service in that period. */
export function StatusStrip({ data, title, category = "", height, format, view, className, "aria-label": label }: StatusStripProps) {
  const ref = useRef<HTMLElement>(null);
  const write = useRef(format);
  write.current = format;
  const key = JSON.stringify(data);

  // The controller draws the plot from the table below, and again whenever the data or the options change.
  useEffect(() => {
    if (!ref.current) return;
    return bindStatusStrip(ref.current, write.current ? { format: (value) => write.current!(value) } : undefined);
  }, [key, height]);

  return (
    <figure ref={ref} className={className ? `x-chart x-status-strip ${className}` : "x-chart x-status-strip"} data-height={height} data-view={view === "table" ? "table" : undefined} aria-label={title ? undefined : label}>
      {title && <figcaption className="x-chart-title">{title}</figcaption>}
      <table className="x-chart-data">
        <thead>
          <tr><th scope="col">{category}</th>{data.series.map((series) => <th key={series.name} scope="col">{series.name}</th>)}</tr>
        </thead>
        <tbody>
          {data.labels.map((name, i) => (
            <tr key={name}>
              <th scope="row">{name}</th>
              {data.series.map((series) => <td key={series.name} data-value={series.texts ? undefined : series.values[i]}>{series.texts?.[i] ?? (format ? format(series.values[i]) : series.values[i])}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
