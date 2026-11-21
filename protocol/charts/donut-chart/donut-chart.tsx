"use client";

import { useEffect, useRef } from "react";
import type { ChartData } from "../../core/chart.js";
import { bindDonutChart } from "./donut-chart.controller.js";
import "../../core/chart.css";
import "./donut-chart.css";

export type { ChartData };

export type DonutChartProps = {
  /** The parts and their amounts, as the labels and the first series. Past five parts, the rest become Other. */
  data: ChartData;
  /** Shown above the chart, and its accessible name. Without one, pass aria-label. */
  title?: string;
  "aria-label"?: string;
  /** The header of the first column of the data table: what the categories are ("Month"). */
  category?: string;
  /** The caption under the total in the middle ("Portfolio"). */
  total?: string;
  /** The plot's height in px. Default 200. */
  height?: number;
  /** How a value is written on the axis, in the readout and in the table. Default: short numbers (12.9K). */
  format?: (value: number) => string;
  /** "table" shows the data table in place of the plot. */
  view?: "chart" | "table";
  className?: string;
};

/** The parts of one whole, with the total in the middle. */
export function DonutChart({ data, title, category = "", total, height, format, view, className, "aria-label": label }: DonutChartProps) {
  const ref = useRef<HTMLElement>(null);
  const write = useRef(format);
  write.current = format;
  const key = JSON.stringify(data);

  // The controller draws the plot from the table below, and again whenever the data or the options change.
  useEffect(() => {
    if (!ref.current) return;
    return bindDonutChart(ref.current, write.current ? { format: (value) => write.current!(value) } : undefined);
  }, [key, total, height]);

  return (
    <figure ref={ref} className={className ? `x-chart x-donut-chart ${className}` : "x-chart x-donut-chart"} data-total={total} data-height={height} data-view={view === "table" ? "table" : undefined} aria-label={title ? undefined : label}>
      {title && <figcaption className="x-chart-title">{title}</figcaption>}
      <table className="x-chart-data">
        <thead>
          <tr><th scope="col">{category}</th>{data.series.map((series) => <th key={series.name} scope="col">{series.name}</th>)}</tr>
        </thead>
        <tbody>
          {data.labels.map((name, i) => (
            <tr key={name}>
              <th scope="row">{name}</th>
              {data.series.map((series) => <td key={series.name} data-value={series.values[i]}>{format ? format(series.values[i]) : series.values[i]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
