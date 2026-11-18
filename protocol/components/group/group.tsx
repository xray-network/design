import type { ReactNode } from "react";
import "./group.css";

export type GroupProps = {
  /** Inputs, selects and buttons, joined in this order. */
  children: ReactNode;
  /** One size for every part, overriding their own. */
  size?: "sm" | "md" | "lg";
  /** Text or an icon before the parts (`https://`). */
  prefix?: ReactNode;
  /** Text or an icon after the parts (`USD`, `.io`). Put buttons in children instead. */
  suffix?: ReactNode;
  orientation?: "horizontal" | "vertical";
  /** Names the group when its parts answer one question ("Amount"). */
  "aria-label"?: string;
  className?: string;
};

/** Joins controls into one: shared size, square inner corners, one hairline between parts. */
export function Group({ children, size = "md", prefix, suffix, orientation = "horizontal", className, "aria-label": label }: GroupProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={className ? `x-group ${className}` : "x-group"}
      data-size={size === "md" ? undefined : size}
      data-orientation={orientation === "vertical" ? "vertical" : undefined}
    >
      {prefix != null && <span className="x-group-addon">{prefix}</span>}
      {children}
      {suffix != null && <span className="x-group-addon">{suffix}</span>}
    </div>
  );
}
