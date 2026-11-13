import type { ComponentProps, ReactNode } from "react";
import "./switch.css";

export type SwitchProps = Omit<ComponentProps<"input">, "type" | "role" | "size"> & {
  /** Visible label. Without one, pass aria-label. */
  children?: ReactNode;
  /** "start" puts the label first and the switch at the far end (settings rows). */
  labelPosition?: "start" | "end";
  size?: "sm" | "md";
};

/** Native checkbox with role="switch". Controlled (checked + onChange) or uncontrolled (defaultChecked). */
export function Switch({ children, labelPosition = "end", size = "md", className, ...input }: SwitchProps) {
  return (
    <label
      className={className ? `x-switch ${className}` : "x-switch"}
      data-label={labelPosition === "start" ? "start" : undefined}
      data-size={size === "md" ? undefined : size}
    >
      <input type="checkbox" role="switch" {...input} />
      <span className="x-switch-track" aria-hidden="true">
        <span className="x-switch-thumb" />
      </span>
      {children != null && <span className="x-switch-label">{children}</span>}
    </label>
  );
}
