"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { bindSelect } from "./select.controller.js";
import "./select.css";

export type SelectOption<T extends string> = {
  value: T;
  label: ReactNode;
  /** Muted text on the right: a balance, a count, a shortcut. */
  note?: ReactNode;
  disabled?: boolean;
};

export type SelectProps<T extends string> = {
  options: SelectOption<T>[];
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  /** Shown while nothing is selected. */
  placeholder?: string;
  /** Submits the value with a form through a hidden input. */
  name?: string;
  size?: "sm" | "md";
  disabled?: boolean;
  /** From Field: the trigger becomes the labelled control. */
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "true" | "false";
  /** Needed when the select is not inside a Field. */
  "aria-label"?: string;
  className?: string;
};

const Chevron = () => (
  <svg className="x-select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);
const Check = () => (
  <svg className="x-select-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

/** Custom single-choice dropdown. Works inside Field: `<Field label="Network">{(p) => <Select {...p} … />}</Field>`. */
export function Select<T extends string>({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select",
  name,
  size = "md",
  disabled,
  id,
  className,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  "aria-label": label,
}: SelectProps<T>) {
  const listId = useId();
  const [inner, setInner] = useState<T | undefined>(defaultValue);
  const current = value ?? inner;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const onPick = useRef<(v: string) => void>(() => {});
  onPick.current = (v) => {
    if (value === undefined) setInner(v as T);
    onValueChange?.(v as T);
  };

  useEffect(() => {
    if (!triggerRef.current || !listRef.current) return;
    return bindSelect(triggerRef.current, listRef.current, { onSelect: (v) => onPick.current(v) });
  }, []);

  const selected = options.find((o) => o.value === current);
  return (
    <>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        popoverTarget={listId}
        className={className ? `x-select ${className}` : "x-select"}
        data-size={size === "md" ? undefined : size}
        disabled={disabled}
        aria-label={label}
        aria-describedby={describedBy}
        aria-invalid={invalid}
      >
        <span className="x-select-value" data-placeholder={placeholder}>{selected?.label}</span>
        <Chevron />
      </button>
      <div ref={listRef} id={listId} popover="auto" role="listbox" aria-label={label} className="x-select-list">
        {options.map((option) => (
          <div
            key={option.value}
            role="option"
            tabIndex={-1}
            className="x-select-option"
            data-value={option.value}
            aria-selected={option.value === current}
            aria-disabled={option.disabled || undefined}
          >
            <Check />
            <span>{option.label}</span>
            {option.note != null && <span className="x-select-option-note">{option.note}</span>}
          </div>
        ))}
      </div>
      {name && <input type="hidden" name={name} value={current ?? ""} data-for={listId} />}
    </>
  );
}
