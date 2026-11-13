"use client";

import { useId, type ComponentProps, type ReactNode } from "react";
import "./field.css";

type FieldIds = { id: string; "aria-describedby"?: string; "aria-invalid"?: true };

export type FieldProps = {
  label: ReactNode;
  hint?: ReactNode;
  /** Error message. Replaces the hint and marks the control invalid. */
  error?: ReactNode;
  /** Use an existing id for the control; generated otherwise. */
  id?: string;
  className?: string;
  /** Render the control with the ids and ARIA wiring it needs. */
  children: (control: FieldIds) => ReactNode;
};

/** Label + any control + hint/error, wired for screen readers. */
export function Field({ label, hint, error, id, className, children }: FieldProps) {
  const auto = useId();
  const controlId = id ?? auto;
  const hintId = `${controlId}-hint`;
  const errorId = `${controlId}-error`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div className={className ? `x-field ${className}` : "x-field"}>
      <label className="x-field-label" htmlFor={controlId}>{label}</label>
      {children({ id: controlId, "aria-describedby": describedBy, "aria-invalid": error ? true : undefined })}
      {hint && !error && <p className="x-field-hint" id={hintId}>{hint}</p>}
      {error && <p className="x-field-error" id={errorId} role="alert">{error}</p>}
    </div>
  );
}

export type InputProps = Omit<ComponentProps<"input">, "size" | "prefix"> & {
  size?: "sm" | "md" | "lg";
  /** Leading content: an icon or text. */
  prefix?: ReactNode;
  /** Trailing content: a ticker, a unit, or a Button/IconButton. */
  suffix?: ReactNode;
};

/** The pill input on its own (search bars, inline filters). */
export function Input({ size = "md", prefix, suffix, className, ...input }: InputProps) {
  const affix = (node: ReactNode) => (typeof node === "string" ? <span className="x-input-affix">{node}</span> : node);
  return (
    <div className={className ? `x-input ${className}` : "x-input"} data-size={size === "md" ? undefined : size}>
      {prefix != null && affix(prefix)}
      <input {...input} />
      {suffix != null && affix(suffix)}
    </div>
  );
}

export type TextFieldProps = InputProps & Pick<FieldProps, "label" | "hint" | "error">;

/** Field + Input in one: the usual form row. */
export function TextField({ label, hint, error, id, className, ...input }: TextFieldProps) {
  return (
    <Field label={label} hint={hint} error={error} id={id} className={className}>
      {(control) => <Input {...input} {...control} />}
    </Field>
  );
}
