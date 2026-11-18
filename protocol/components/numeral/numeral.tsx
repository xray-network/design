import type { ReactNode } from "react";
import { Skeleton } from "../skeleton/skeleton";
import "./numeral.css";

export type NumeralProps = {
  /** A formatted amount: "12,480.254221". The part after the last "." becomes the fraction. */
  value: string;
  /** Currency or unit: "USD". */
  ticker?: ReactNode;
  size?: "sm" | "md" | "hero";
  /** Hide the amount (the "hide balances" setting). The ticker stays visible. */
  masked?: boolean;
  /** While the amount loads: a bar of the amount's height in its place (the ticker stays). */
  loading?: boolean;
  className?: string;
};

export function Numeral({ value, ticker, size = "md", masked, loading, className }: NumeralProps) {
  const dot = value.lastIndexOf(".");
  const integer = dot < 0 ? value : value.slice(0, dot);
  const fraction = dot < 0 ? "" : value.slice(dot);
  return (
    <span
      className={className ? `x-numeral ${className}` : "x-numeral"}
      data-size={size === "md" ? undefined : size}
      data-masked={masked ? "true" : undefined}
      aria-busy={loading || undefined}
    >
      {loading ? (
        <Skeleton shape="text" width="4.2em" />
      ) : (
        <span className="x-numeral-value">
          {integer}
          {fraction && <span className="x-numeral-frac">{fraction}</span>}
        </span>
      )}
      <span className="x-numeral-mask" aria-label="Hidden">•••••</span>
      {ticker != null && <span className="x-numeral-ticker">{ticker}</span>}
    </span>
  );
}
