"use client";

import { useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { trackIndicator } from "../../core/motion.js";
import "./segmented.css";

export type SegmentedOption<T extends string> = {
  value: T;
  label: ReactNode;
  /** Muted count after the label. */
  count?: ReactNode;
  disabled?: boolean;
};

export type SegmentedProps<T extends string> = {
  options: SegmentedOption<T>[];
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  /** Radio group name; generated when omitted. Set it to submit the value with a form. */
  name?: string;
  size?: "sm" | "md";
  fullWidth?: boolean;
  "aria-label": string;
  className?: string;
};

export function Segmented<T extends string>({
  options,
  value,
  defaultValue,
  onValueChange,
  name,
  size = "md",
  fullWidth,
  className,
  "aria-label": label,
}: SegmentedProps<T>) {
  const autoName = useId();
  const [inner, setInner] = useState<T | undefined>(defaultValue ?? options[0]?.value);
  const current = value ?? inner;
  const rootRef = useRef<HTMLDivElement>(null);
  const tracker = useRef<ReturnType<typeof trackIndicator> | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    tracker.current = trackIndicator(root, () => root.querySelector<HTMLElement>(":scope > .x-segmented-item:has(input:checked)"));
    return () => tracker.current?.destroy();
  }, []);

  useLayoutEffect(() => {
    tracker.current?.update();
  }, [current, options.length]);

  return (
    <div
      ref={rootRef}
      role="radiogroup"
      aria-label={label}
      className={className ? `x-segmented ${className}` : "x-segmented"}
      data-size={size === "md" ? undefined : size}
      data-width={fullWidth ? "full" : undefined}
    >
      {options.map((option) => (
        <label key={option.value} className="x-segmented-item">
          <input
            type="radio"
            name={name ?? autoName}
            value={option.value}
            checked={option.value === current}
            disabled={option.disabled}
            onChange={() => {
              if (value === undefined) setInner(option.value);
              onValueChange?.(option.value);
            }}
          />
          <span>
            {option.label}
            {option.count != null && <i>{option.count}</i>}
          </span>
        </label>
      ))}
      <span className="x-segmented-indicator" aria-hidden="true" />
    </div>
  );
}
