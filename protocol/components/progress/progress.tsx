"use client";

import { useId, type CSSProperties, type ReactNode } from "react";
import "./progress.css";

type Tone = "accent" | "success" | "warning" | "danger" | "neutral";

type BarProps = {
  value: number;
  /** Default 100. */
  max?: number;
  /** Visible label, left of the value. Without one, pass aria-label. */
  label?: ReactNode;
  /** The value text on the right. Default: the percentage. false hides it. */
  valueText?: ReactNode | false;
  /** Read out instead of the number ("3.2 of 5 GB"). */
  "aria-valuetext"?: string;
  "aria-label"?: string;
  size?: "sm" | "md";
  className?: string;
};

function Bar({ role, value, max = 100, label, valueText, tone, size = "md", className, ...aria }: BarProps & { role: "progressbar" | "meter"; tone: Tone }) {
  const labelId = useId();
  const fraction = Math.min(1, Math.max(0, max > 0 ? value / max : 0));
  const shown = valueText === undefined ? `${Math.round(fraction * 100)}%` : valueText;
  const head = label != null || shown !== false;
  return (
    <div
      className={className ? `x-progress ${className}` : "x-progress"}
      role={role}
      data-size={size === "md" ? undefined : size}
      data-tone={tone === "accent" ? undefined : tone}
      aria-labelledby={label != null ? labelId : undefined}
      aria-label={aria["aria-label"]}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuetext={aria["aria-valuetext"]}
      style={{ "--x-progress-value": fraction } as CSSProperties}
    >
      {head && (
        <div className="x-progress-head">
          <span className="x-progress-label" id={labelId}>{label}</span>
          {shown !== false && <span className="x-progress-value">{shown}</span>}
        </div>
      )}
      <div className="x-progress-track"><div className="x-progress-fill" /></div>
    </div>
  );
}

export type ProgressProps = BarProps & { tone?: Tone };

/** How far a task with a known length has come. For unknown length, use Spinner. */
export function Progress({ tone = "accent", ...props }: ProgressProps) {
  return <Bar role="progressbar" tone={tone} {...props} />;
}

export type MeterProps = BarProps & {
  /** The level from which the meter turns warning, and danger. Higher is worse (quota, storage, limits). */
  warning?: number;
  danger?: number;
  /** Overrides the level tone. */
  tone?: Tone;
};

/** A reading on a fixed scale (storage, a limit, a quota), colored by its level. */
export function Meter({ warning, danger, tone, value, ...props }: MeterProps) {
  const level: Tone = tone ?? (danger !== undefined && value >= danger ? "danger" : warning !== undefined && value >= warning ? "warning" : "accent");
  return <Bar role="meter" tone={level} value={value} {...props} />;
}
