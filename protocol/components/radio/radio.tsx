"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";
import "./radio.css";

export type RadioProps = Omit<ComponentProps<"input">, "type"> & {
  children?: ReactNode;
  description?: ReactNode;
};

/** Native radio. Give radios of one group the same `name`, or use RadioGroup. */
export function Radio({ children, description, className, ...input }: RadioProps) {
  return (
    <label className={className ? `x-radio ${className}` : "x-radio"}>
      <input type="radio" {...input} />
      {(children != null || description != null) && (
        <span className="x-radio-text">
          {children}
          {description != null && <span className="x-radio-description">{description}</span>}
        </span>
      )}
    </label>
  );
}

export type RadioGroupProps<T extends string> = {
  legend: ReactNode;
  options: { value: T; label: ReactNode; description?: ReactNode; disabled?: boolean }[];
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  /** Radio group name; generated when omitted. */
  name?: string;
  direction?: "column" | "row";
  className?: string;
};

/** A labelled group of radios with one value. Controlled (value) or uncontrolled (defaultValue). */
export function RadioGroup<T extends string>({ legend, options, value, defaultValue, onValueChange, name, direction = "column", className }: RadioGroupProps<T>) {
  const autoName = useId();
  const [inner, setInner] = useState<T | undefined>(defaultValue);
  const current = value ?? inner;
  return (
    <fieldset className={className ? `x-radio-group ${className}` : "x-radio-group"} data-direction={direction === "row" ? "row" : undefined}>
      <legend>{legend}</legend>
      {options.map((o) => (
        <Radio
          key={o.value}
          name={name ?? autoName}
          value={o.value}
          checked={o.value === current}
          disabled={o.disabled}
          description={o.description}
          onChange={() => {
            if (value === undefined) setInner(o.value);
            onValueChange?.(o.value);
          }}
        >
          {o.label}
        </Radio>
      ))}
    </fieldset>
  );
}
