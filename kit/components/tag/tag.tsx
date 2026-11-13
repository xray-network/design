import type { ReactNode } from "react";
import "./tag.css";

type Tone = "success" | "danger" | "warning" | "neutral";

/** Outlined label for a short fact. Pass `status` to lead with a status dot. */
export function Tag({ children, size = "md", status, className }: { children: ReactNode; size?: "sm" | "md"; status?: Tone; className?: string }) {
  return (
    <span className={className ? `x-tag ${className}` : "x-tag"} data-size={size === "md" ? undefined : size} data-tone={status && status !== "success" ? status : undefined}>
      {status && <span className="x-status-dot" aria-hidden="true" />}
      {children}
    </span>
  );
}

/** A status dot with its label: "Delegated", "Syncing", "Offline". */
export function Status({ children, tone = "success", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={className ? `x-status ${className}` : "x-status"} data-tone={tone === "success" ? undefined : tone}>
      <span className="x-status-dot" aria-hidden="true" />
      {children}
    </span>
  );
}

/** A signed percentage change. The sign is in the text, so it reads without color. */
export function Delta({ value, digits = 1, className }: { value: number; digits?: number; className?: string }) {
  const trend = value > 0 ? "up" : value < 0 ? "down" : undefined;
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return (
    <span className={className ? `x-delta ${className}` : "x-delta"} data-trend={trend}>
      {sign}{Math.abs(value).toFixed(digits)}%
    </span>
  );
}
