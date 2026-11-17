"use client";

import { useEffect, useRef, type ComponentProps, type ReactNode } from "react";
import "./checkbox.css";

export type CheckboxProps = Omit<ComponentProps<"input">, "type"> & {
  /** Visible label. */
  children?: ReactNode;
  /** Second line under the label. */
  description?: ReactNode;
  /** "Some of the children are checked": a dash instead of the check. */
  indeterminate?: boolean;
};

/** Native checkbox. Controlled (checked + onChange) or uncontrolled (defaultChecked). */
export function Checkbox({ children, description, indeterminate, className, ...input }: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = Boolean(indeterminate);
  }, [indeterminate]);
  return (
    <label className={className ? `x-checkbox ${className}` : "x-checkbox"}>
      <input ref={ref} type="checkbox" {...input} />
      {(children != null || description != null) && (
        <span className="x-checkbox-text">
          {children}
          {description != null && <span className="x-checkbox-description">{description}</span>}
        </span>
      )}
    </label>
  );
}

/** A labelled group of checkboxes (a fieldset with a legend). */
export function CheckboxGroup({ legend, children, className }: { legend: ReactNode; children: ReactNode; className?: string }) {
  return (
    <fieldset className={className ? `x-checkbox-group ${className}` : "x-checkbox-group"}>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  );
}
