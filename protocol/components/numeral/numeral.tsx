import type { ReactNode } from "react";
import "./numeral.css";

export type NumeralProps = {
  /** A formatted amount: "12,480.254221". The part after the last "." becomes the fraction. */
  value: string;
  /** Ticker or unit: "ADA". */
  ticker?: ReactNode;
  size?: "sm" | "md" | "hero";
  /** Hide the amount (the "hide balances" setting). The ticker stays visible. */
  masked?: boolean;
  className?: string;
};

export function Numeral({ value, ticker, size = "md", masked, className }: NumeralProps) {
  const dot = value.lastIndexOf(".");
  const integer = dot < 0 ? value : value.slice(0, dot);
  const fraction = dot < 0 ? "" : value.slice(dot);
  return (
    <span
      className={className ? `x-numeral ${className}` : "x-numeral"}
      data-size={size === "md" ? undefined : size}
      data-masked={masked ? "true" : undefined}
    >
      <span className="x-numeral-value">
        {integer}
        {fraction && <span className="x-numeral-frac">{fraction}</span>}
      </span>
      <span className="x-numeral-mask" aria-label="Hidden">•••••</span>
      {ticker != null && <span className="x-numeral-ticker">{ticker}</span>}
    </span>
  );
}
