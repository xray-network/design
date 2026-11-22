import type { ReactNode, CSSProperties } from "react";
import "./result.css";

export type ResultStatus = "success" | "error" | "info" | "warning" | "loading";

export type ResultProps = {
  status: ResultStatus;
  title: ReactNode;
  description?: ReactNode;
  /** Buttons: the next step. */
  actions?: ReactNode;
  /** Extra content between the description and the actions. */
  children?: ReactNode;
  size?: "md" | "sm";
  className?: string;
};

// Mark strokes per status, drawn after the ring in order (100×100 viewBox).
const MARKS: Record<ResultStatus, string[]> = {
  success: ["M30 52 L45 67 L72 40"],
  error: ["M34 34 L66 66", "M66 34 L34 66"],
  info: ["M50 32 L50 33", "M50 46 L50 68"],
  warning: ["M50 30 L50 54", "M50 67 L50 68"],
  loading: [],
};

/** The outcome of a flow. The mark draws once when it appears; give it a new key to draw it again.
    `loading` turns an open ring until the outcome is known. */
/** Each mark's length in viewBox units: it is dashed by exactly that much, then drawn. */
const LENGTHS: Record<string, number> = {"M30 52 L45 67 L72 40": 60, "M34 34 L66 66": 46, "M66 34 L34 66": 46, "M50 32 L50 33": 1, "M50 46 L50 68": 22, "M50 30 L50 54": 24, "M50 67 L50 68": 1};

export function Result({ status, title, description, actions, children, size = "md", className }: ResultProps) {
  return (
    <div
      className={className ? `x-result ${className}` : "x-result"}
      data-status={status}
      data-size={size === "sm" ? "sm" : undefined}
      role={status === "error" ? "alert" : "status"}
      aria-busy={status === "loading" || undefined}
    >
      <svg className="x-result-icon" viewBox="0 0 100 100" aria-hidden="true">
        <circle className="x-result-ring" cx="50" cy="50" r="44" />
        {MARKS[status].map((d, i) => (
          <path key={d} className="x-result-mark" data-step={i === 0 ? undefined : "2"} d={d} style={{ "--x-result-length": LENGTHS[d] ?? 100 } as CSSProperties} />
        ))}
      </svg>
      <p className="x-result-title">{title}</p>
      {description != null && <p className="x-result-description">{description}</p>}
      {children}
      {actions && <div className="x-result-actions">{actions}</div>}
    </div>
  );
}
