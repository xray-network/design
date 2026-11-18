import type { ReactNode } from "react";
import "./empty.css";

export type EmptyProps = {
  title: ReactNode;
  description?: ReactNode;
  /** A 24px outline icon (svg.x-icon). Omit for text only. */
  icon?: ReactNode;
  /** Buttons or links that fill the region. */
  actions?: ReactNode;
  size?: "md" | "sm";
  className?: string;
};

/** The empty state of a list, table or screen. */
export function Empty({ title, description, icon, actions, size = "md", className }: EmptyProps) {
  return (
    <div className={className ? `x-empty ${className}` : "x-empty"} data-size={size === "md" ? undefined : size}>
      {icon && <span className="x-empty-icon" aria-hidden="true">{icon}</span>}
      <p className="x-empty-title">{title}</p>
      {description != null && <p className="x-empty-description">{description}</p>}
      {actions && <div className="x-empty-actions">{actions}</div>}
    </div>
  );
}
