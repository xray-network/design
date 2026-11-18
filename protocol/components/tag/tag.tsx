import type { ReactNode } from "react";
import "./tag.css";

type Tone = "success" | "danger" | "warning" | "neutral";

export type TagProps = {
  children: ReactNode;
  size?: "sm" | "md";
  /** outline (default): a hairline. soft: a tint of the color. solid: the color, with contrasting text. */
  variant?: "outline" | "soft" | "solid";
  /** The fill color for soft and solid tags. */
  color?: "neutral" | "accent" | "success" | "danger" | "warning";
  /** Leads with a status dot of this tone. */
  status?: Tone;
  className?: string;
};

/** A label for a short fact: outlined, or filled (soft, solid). Pass `status` to lead with a status dot. */
export function Tag({ children, size = "md", variant = "outline", color = "neutral", status, className }: TagProps) {
  const filled = variant !== "outline";
  return (
    <span
      className={className ? `x-tag ${className}` : "x-tag"}
      data-size={size === "md" ? undefined : size}
      data-variant={filled ? variant : undefined}
      data-color={filled && color !== "neutral" ? color : undefined}
      data-tone={status && status !== "success" ? status : undefined}
    >
      {status && <span className="x-status-dot" aria-hidden="true" />}
      {children}
    </span>
  );
}

/** A status dot with its label: "Paid", "Syncing", "Offline". */
export function Status({ children, tone = "success", dot = "start", className }: { children: ReactNode; tone?: Tone; /** "end": the dot after the text, for end-aligned columns. */ dot?: "start" | "end"; className?: string }) {
  return (
    <span className={className ? `x-status ${className}` : "x-status"} data-tone={tone === "success" ? undefined : tone} data-dot={dot === "end" ? "end" : undefined}>
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
