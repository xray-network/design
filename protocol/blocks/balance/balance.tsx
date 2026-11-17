import type { ReactNode } from "react";
import { Numeral } from "../../components/numeral/numeral";
import { Delta } from "../../components/tag/tag";
import "./balance.css";

export type BalanceProps = {
  /** "Total balance", "Available", "Staked". */
  label?: ReactNode;
  /** Formatted amount: "12,480.254221". */
  value: string;
  ticker: string;
  /** Formatted fiat value: "$8,736.18 USD". */
  fiat?: ReactNode;
  /** Change in percent over the period. */
  change?: number;
  period?: ReactNode;
  /** Hide amounts (the "hide balances" setting). */
  masked?: boolean;
  /** Buttons under the amount: Send, Receive, Stake. */
  actions?: ReactNode;
  className?: string;
};

export function Balance({ label = "Total balance", value, ticker, fiat, change, period = "today", masked, actions, className }: BalanceProps) {
  return (
    <section className={className ? `x-balance ${className}` : "x-balance"} aria-label={typeof label === "string" ? label : undefined}>
      <div className="x-balance-label">{label}</div>
      <Numeral value={value} ticker={ticker} size="hero" masked={masked} />
      {(fiat != null || change != null) && (
        <div className="x-balance-meta">
          {fiat != null && <span>{masked ? "•••••" : fiat}</span>}
          {change != null && <Delta value={change} />}
          {change != null && period != null && <span className="x-balance-period">{period}</span>}
        </div>
      )}
      {actions != null && <div className="x-balance-actions">{actions}</div>}
    </section>
  );
}
