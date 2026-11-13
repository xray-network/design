"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";
import "./option.css";

export type OptionCard<T extends string> = {
  value: T;
  title: ReactNode;
  /** Second line: what this option means ("About 20 s"). */
  description?: ReactNode;
  /** Third line in mono: its cost or amount ("0.17 ADA"). */
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
  className?: string;
};

export function OptionCards<T extends string>({ options, value, defaultValue, onValueChange, name, columns, className, "aria-label": label }: OptionCardsProps<T>) {
  const autoName = useId();
  const [inner, setInner] = useState<T | undefined>(defaultValue);
  const current = value ?? inner;
  return (
    <div
      className={className ? `x-options ${className}` : "x-options"}
      role="radiogroup"
      aria-label={label}
      style={columns ? ({ "--x-options-columns": columns } as CSSProperties) : undefined}
    >
      {options.map((option) => (
        <label key={option.value} className="x-option">
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
          <span className="x-option-title">{option.title}</span>
          {option.description != null && <span>{option.description}</span>}
          {option.detail != null && <span className="x-option-value">{option.detail}</span>}
        </label>
      ))}
    </div>
  );
}
