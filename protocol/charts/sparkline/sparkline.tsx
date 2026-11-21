import { sparklineShape } from "./sparkline.controller.js";
import "./sparkline.css";

export type SparklineProps = {
  /** The values, oldest first. Twelve or so read best; at least two. */
  values: number[];
  /** What the line says, in words: "Up 12% over 7 days". A sparkline has no axis, so this is its only reading. */
  "aria-label": string;
  /** Colors the line by its direction: up in the success color, down in the danger color. Default: neutral. */
  trend?: "up" | "down";
  /** The drawing's size in px. Default 96 by 24. */
  width?: number;
  height?: number;
  className?: string;
};

/** A small line with no axes, for a trend beside a number. The last value is marked with a dot. */
export function Sparkline({ values, trend, width = 96, height = 24, className, "aria-label": label }: SparklineProps) {
  const shape = sparklineShape(values, width, height);
  return (
    <span className={className ? `x-sparkline ${className}` : "x-sparkline"} data-trend={trend} data-values={values.join(" ")} role="img" aria-label={label} style={{ width, height }}>
      <svg viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
        <path className="x-sparkline-line" d={shape.line} />
        <circle className="x-sparkline-dot" cx={shape.end.x} cy={shape.end.y} r="2.5" />
      </svg>
    </span>
  );
}
