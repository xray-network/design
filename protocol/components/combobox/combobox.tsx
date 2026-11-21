"use client";

import { useEffect, useId, useRef, useState, type ReactElement, type ReactNode } from "react";
import { bindCombobox } from "./combobox.controller.js";
import "./combobox.css";

export type ComboboxOption<T extends string> = {
  value: T;
  /** Plain text: shown in the list and in the input after a pick, and matched by the filter. */
  label: string;
  /** Muted text on the right: a ticker, a balance, a code. */
  note?: ReactNode;
  /** Extra text the filter matches ("usd coin" for USDC). */
  keywords?: string;
  disabled?: boolean;
};

type ComboboxShared<T extends string> = {
  options: ComboboxOption<T>[];
  placeholder?: string;
  /** Shown when the filter matches nothing. */
  emptyText?: ReactNode;
  /** Submits the value with a form through a hidden input (one per picked value when multiple). */
  name?: string;
  size?: "sm" | "md";
  disabled?: boolean;
  /** From Field: the input becomes the labelled control. */
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "true" | "false";
  /** Needed when the combobox is not inside a Field. */
  "aria-label"?: string;
  className?: string;
};

export type ComboboxSingleProps<T extends string> = ComboboxShared<T> & {
  multiple?: false;
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
};

/** Several values: picked options show as chips in the field and the list stays open. */
export type ComboboxMultipleProps<T extends string> = ComboboxShared<T> & {
  multiple: true;
  value?: T[];
  defaultValue?: T[];
  onValueChange?: (value: T[]) => void;
};

export type ComboboxProps<T extends string> = ComboboxSingleProps<T> | ComboboxMultipleProps<T>;

const Chevron = () => (
  <svg className="x-combobox-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);
const Check = () => (
  <svg className="x-combobox-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);
const Remove = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const list = <T,>(value: T | T[] | undefined): T[] => (value === undefined ? [] : Array.isArray(value) ? value : [value]);

/** A text field that filters options as you type; `multiple` picks several. Works inside Field:
    `<Field label="Token">{(p) => <Combobox {...p} … />}</Field>`. */
export function Combobox<T extends string>(props: ComboboxSingleProps<T>): ReactElement;
export function Combobox<T extends string>(props: ComboboxMultipleProps<T>): ReactElement;
export function Combobox<T extends string>(props: ComboboxProps<T>): ReactElement {
  const {
    options,
    placeholder = "Search",
    emptyText = "No matches",
    name,
    size = "md",
    disabled,
    id,
    className,
    "aria-describedby": describedBy,
    "aria-invalid": invalid,
    "aria-label": label,
  } = props;
  const multiple = props.multiple === true;
  const listId = useId();
  const [inner, setInner] = useState<T[]>(() => list(props.defaultValue));
  const controlled = props.value !== undefined;
  const values = controlled ? list(props.value) : inner;
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const onPick = useRef<(v: string) => void>(() => {});
  onPick.current = (picked) => {
    const v = picked as T;
    const next = multiple ? (values.includes(v) ? values.filter((x) => x !== v) : [...values, v]) : [v];
    if (!controlled) setInner(next);
    if (props.multiple === true) props.onValueChange?.(next);
    else props.onValueChange?.(v);
  };
  const keywords = useRef(new Map<string, string>());
  keywords.current = new Map(options.map((o) => [o.value, `${o.label} ${o.keywords ?? ""}`.toLowerCase()]));

  useEffect(() => {
    if (!inputRef.current || !listRef.current) return;
    return bindCombobox(inputRef.current, listRef.current, {
      onSelect: (v) => onPick.current(v),
      filter: (query, option) => (keywords.current.get(option.dataset.value ?? "") ?? "").includes(query),
    });
  }, []);

  const picked = values.map((v) => options.find((o) => o.value === v)).filter((o): o is ComboboxOption<T> => o !== undefined);
  const single = multiple ? undefined : picked[0];
  // Single: a value set from outside shows its label, unless the person is typing.
  useEffect(() => {
    const input = inputRef.current;
    if (!multiple && input && document.activeElement !== input) input.value = single?.label ?? "";
  }, [multiple, single?.label]);

  return (
    <div className={className ? `x-combobox ${className}` : "x-combobox"} data-multiple={multiple ? "" : undefined}>
      <div className="x-combobox-field" data-size={size === "md" ? undefined : size}>
        {multiple && picked.map((option) => (
          <span key={option.value} className="x-combobox-chip" data-value={option.value}>
            <span>{option.label}</span>
            {/* The controller handles the click (and Backspace), so both call the same toggle. */}
            <button className="x-combobox-chip-remove" type="button" aria-label={`Remove ${option.label}`} disabled={disabled}><Remove /></button>
          </span>
        ))}
        <input
          ref={inputRef}
          id={id}
          className="x-combobox-input"
          type="text"
          role="combobox"
          aria-controls={listId}
          aria-expanded="false"
          aria-autocomplete="list"
          aria-label={label}
          aria-describedby={describedBy}
          aria-invalid={invalid}
          autoComplete="off"
          spellCheck={false}
          placeholder={multiple && picked.length ? undefined : placeholder}
          disabled={disabled}
          defaultValue={single?.label}
        />
        <Chevron />
      </div>
      <div ref={listRef} id={listId} popover="manual" role="listbox" aria-label={label} aria-multiselectable={multiple || undefined} className="x-combobox-list">
        {options.map((option) => (
          <div
            key={option.value}
            id={`${listId}-${option.value}`}
            role="option"
            className="x-combobox-option"
            data-value={option.value}
            aria-selected={values.includes(option.value)}
            aria-disabled={option.disabled || undefined}
          >
            <Check />
            <span>{option.label}</span>
            {option.note != null && <span className="x-combobox-option-note">{option.note}</span>}
          </div>
        ))}
        <div className="x-combobox-empty" hidden>{emptyText}</div>
      </div>
      {name && (multiple
        ? values.map((v) => <input key={v} type="hidden" name={name} value={v} data-for={listId} />)
        : <input type="hidden" name={name} value={values[0] ?? ""} data-for={listId} />)}
    </div>
  );
}
