"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";
import { Skeleton, skeletonWidth } from "../../components/skeleton/skeleton";
import "./option.css";

export type OptionCard<T extends string> = {
  value: T;
  title: ReactNode;
  /** Second line: what this option means ("About 20 s"). */
  description?: ReactNode;
  /** Third line in mono: its cost or amount ("$1.00"). */
  detail?: ReactNode;
  disabled?: boolean;
};

export type OptionCardsProps<T extends string> = {
  options: OptionCard<T>[];
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  name?: string;
  /** Columns on wide screens (one column under 420px). Default 3. */
  columns?: number;
  "aria-label": string;
  /** While the options load: bars of varied widths in place of their texts, and they cannot be chosen. */
  loading?: boolean;
  className?: string;
};

export function OptionCards<T extends string>({ options, value, defaultValue, onValueChange, name, columns, loading, className, "aria-label": label }: OptionCardsProps<T>) {
  const bar = (i: number, min: number, max: number) => <Skeleton shape="text" width={skeletonWidth(i, min, max)} />;
  const autoName = useId();
  const [inner, setInner] = useState<T | undefined>(defaultValue);
  const current = value ?? inner;
  return (
    <div
      className={className ? `x-options ${className}` : "x-options"}
      role="radiogroup"
      aria-label={label}
      aria-busy={loading || undefined}
      style={columns ? ({ "--x-options-columns": columns } as CSSProperties) : undefined}
    >
      {options.map((option, i) => (
        <label key={option.value} className="x-option">
          <input
            type="radio"
            name={name ?? autoName}
            value={option.value}
            checked={option.value === current}
            disabled={option.disabled || loading}
            onChange={() => {
              if (value === undefined) setInner(option.value);
              onValueChange?.(option.value);
            }}
          />
          <span className="x-option-title">{loading ? bar(i * 3, 35, 60) : option.title}</span>
          {option.description != null && <span>{loading ? bar(i * 3 + 1, 55, 85) : option.description}</span>}
          {option.detail != null && <span className="x-option-value">{loading ? bar(i * 3 + 2, 25, 40) : option.detail}</span>}
        </label>
      ))}
    </div>
  );
}
