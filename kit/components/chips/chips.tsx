"use client";

import { useId, useState, type ReactNode } from "react";
import "./chips.css";

export type ChipOption<T extends string> = { value: T; label: ReactNode; count?: ReactNode; disabled?: boolean };

export type ChipsProps<T extends string> = {
  options: ChipOption<T>[];
  /** Selected values. With `multiple` off, at most one. */
  value?: T[];
  defaultValue?: T[];
  onValueChange?: (value: T[]) => void;
  /** Checkboxes instead of radios: any number of chips can be on. */
  multiple?: boolean;
  name?: string;
  "aria-label": string;
  className?: string;
};

/** Filter chips. Single choice uses radios; `multiple` uses checkboxes. */
export function Chips<T extends string>({ options, value, defaultValue, onValueChange, multiple, name, className, "aria-label": label }: ChipsProps<T>) {
  const autoName = useId();
  const [inner, setInner] = useState<T[]>(defaultValue ?? []);
  const current = value ?? inner;
  const set = (next: T[]) => {
    if (value === undefined) setInner(next);
    onValueChange?.(next);
  };
  return (
    <div className={className ? `x-chips ${className}` : "x-chips"} role={multiple ? "group" : "radiogroup"} aria-label={label}>
      {options.map((option) => (
        <label key={option.value} className="x-chip">
          <input
            type={multiple ? "checkbox" : "radio"}
            name={name ?? autoName}
            value={option.value}
            checked={current.includes(option.value)}
            disabled={option.disabled}
            onChange={(event) =>
              set(multiple ? (event.target.checked ? [...current, option.value] : current.filter((v) => v !== option.value)) : [option.value])
            }
          />
          <span>
            {option.label}
            {option.count != null && <i>{option.count}</i>}
          </span>
        </label>
      ))}
    </div>
  );
}
