"use client";

import { useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { scrollStrip, trackIndicator } from "../../core/motion.js";
import "./segmented.css";

export type SegmentedOption<T extends string> = {
  value: T;
  label: ReactNode;
  /** Muted count after the label. */
  count?: ReactNode;
  disabled?: boolean;
  /** The option's view, shown in a panel under the control while the option is selected. */
  content?: ReactNode;
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
  /** Render every option's content up front. By default content renders when its option is first selected, then stays. */
  forceMount?: boolean;
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
  forceMount,
  className,
  "aria-label": label,
}: SegmentedProps<T>) {
  const autoName = useId();
  const [inner, setInner] = useState<T | undefined>(defaultValue ?? options[0]?.value);
  const current = value ?? inner;
  const [seen, setSeen] = useState<Set<T | undefined>>(() => new Set([current]));
  if (!seen.has(current)) setSeen(new Set(seen).add(current));
  const panels = options.some((option) => option.content != null);
  const rootRef = useRef<HTMLDivElement>(null);
  const tracker = useRef<ReturnType<typeof trackIndicator> | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    tracker.current = trackIndicator(root, () => root.querySelector<HTMLElement>(":scope > .x-segmented-item:has(input:checked)"));
    const strip = scrollStrip(root);
    return () => { tracker.current?.destroy(); strip.destroy(); };
  }, []);

  useLayoutEffect(() => {
    tracker.current?.update();
  }, [current, options.length]);

  const control = (
    <div
      ref={rootRef}
      role="radiogroup"
      aria-label={label}
      className={className ? `x-segmented ${className}` : "x-segmented"}
      data-size={size === "md" ? undefined : size}
      data-width={fullWidth ? "full" : undefined}
    >
      {options.map((option) => (
        <label key={option.value} className="x-segmented-item" id={option.content != null ? `${autoName}-${option.value}-label` : undefined}>
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
  if (!panels) return control;

  return (
    <>
      {control}
      <div className="x-segmented-panels">
        {options.filter((option) => option.content != null).map((option) => (
          <section key={option.value} className="x-segmented-panel" data-value={option.value} aria-labelledby={`${autoName}-${option.value}-label`} hidden={option.value !== current}>
            {forceMount || seen.has(option.value) ? option.content : null}
          </section>
        ))}
      </div>
    </>
  );
}
