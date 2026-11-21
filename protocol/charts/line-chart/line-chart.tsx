"use client";

import { useEffect, useRef } from "react";
import type { ChartData } from "../../core/chart.js";
import { bindLineChart } from "./line-chart.controller.js";
import "../../core/chart.css";
import "./line-chart.css";

export type { ChartData };

export type LineChartProps = {
  /** The categories along the bottom, and one line per series. Six series at most. */
  data: ChartData;
  /** Shown above the chart, and its accessible name. Without one, pass aria-label. */
  title?: string;
  "aria-label"?: string;
  /** The header of the first column of the data table: what the categories are ("Month"). */
  category?: string;
  /** Fills under the lines with a wash, and starts the axis at zero: for amounts that add up to something. */
  area?: boolean;
  /** The plot's height in px. Default 220. */
  height?: number;
  /** How a value is written on the axis, in the readout and in the table. Default: short numbers (12.9K). */
  format?: (value: number) => string;
  /** "table" shows the data table in place of the plot. */
  view?: "chart" | "table";
  className?: string;
};

/** A value over time, or along any ordered scale: one line per series, with a crosshair readout. */
export function LineChart({ data, title, category = "", area, height, format, view, className, "aria-label": label }: LineChartProps) {
  const ref = useRef<HTMLElement>(null);
  const write = useRef(format);
  write.current = format;
  const key = JSON.stringify(data);

  // The controller draws the plot from the table below, and again whenever the data or the options change.
  useEffect(() => {
    if (!ref.current) return;
    return bindLineChart(ref.current, write.current ? { format: (value) => write.current!(value) } : undefined);
  }, [key, area, height]);

  return (
    <figure ref={ref} className={className ? `x-chart x-line-chart ${className}` : "x-chart x-line-chart"} data-area={area ? "" : undefined} data-height={height} data-view={view === "table" ? "table" : undefined} aria-label={title ? undefined : label}>
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
