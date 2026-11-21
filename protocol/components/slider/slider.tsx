"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";
import { sliderFill } from "./slider.controller.js";
import "./slider.css";

export type SliderProps = {
  /** Visible label. Without one, pass aria-label. */
  label?: ReactNode;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** The text in the head; also read out as aria-valuetext when it is a string. Default: the number. */
  format?: (value: number) => ReactNode;
  /** Scale labels under the track, spread evenly (start, middle, end). */
  marks?: ReactNode[];
  size?: "sm" | "md";
  disabled?: boolean;
  name?: string;
  id?: string;
  "aria-label"?: string;
  className?: string;
};

/** One value on a native range input, with the filled part and an optional formatted value. */
export function Slider({
  label,
  value,
  defaultValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  format,
  marks,
  size = "md",
  disabled,
  name,
  id,
  className,
  "aria-label": ariaLabel,
}: SliderProps) {
  const auto = useId();
  const inputId = id ?? auto;
  const [inner, setInner] = useState(defaultValue ?? min);
  const current = value ?? inner;
  const shown = format ? format(current) : current;
  return (
    <div className={className ? `x-slider ${className}` : "x-slider"} data-size={size === "md" ? undefined : size}>
      {label != null && (
        <div className="x-slider-head">
          <label className="x-slider-label" htmlFor={inputId}>{label}</label>
          <output className="x-slider-value" htmlFor={inputId}>{shown}</output>
        </div>
      )}
      <input
        className="x-slider-input"
        id={inputId}
        type="range"
        name={name}
        min={min}
        max={max}
        step={step}
        value={current}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-valuetext={typeof shown === "string" ? shown : undefined}
        style={{ "--x-slider-fill": sliderFill(current, min, max) } as CSSProperties}
        onChange={(event) => {
          const next = Number(event.target.value);
          if (value === undefined) setInner(next);
          onValueChange?.(next);
        }}
      />
      {marks && marks.length > 0 && (
        <div className="x-slider-marks" aria-hidden="true">
          {marks.map((mark, i) => <span key={i}>{mark}</span>)}
        </div>
      )}
    </div>
  );
}
