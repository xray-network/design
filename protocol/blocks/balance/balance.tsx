import type { ReactNode } from "react";
import { Numeral } from "../../components/numeral/numeral";
import { Delta } from "../../components/tag/tag";
import { Skeleton } from "../../components/skeleton/skeleton";
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
  /** Buttons under the amount: Send, Request, Add funds. */
  actions?: ReactNode;
  /** While the amount loads: bars of the same height in place of the amount and the line under it. */
  loading?: boolean;
  className?: string;
};

export function Balance({ label = "Total balance", value, ticker, fiat, change, period = "today", masked, actions, loading, className }: BalanceProps) {
  return (
    <section className={className ? `x-balance ${className}` : "x-balance"} aria-label={typeof label === "string" ? label : undefined} aria-busy={loading || undefined}>
      <div className="x-balance-label">{label}</div>
      <Numeral value={value} ticker={ticker} size="hero" masked={masked} loading={loading} />
      {(fiat != null || change != null) && (
        <div className="x-balance-meta">
          {loading ? <Skeleton shape="text" width="11em" /> : fiat != null && <span>{masked ? "•••••" : fiat}</span>}
          {!loading && change != null && <Delta value={change} />}
          {!loading && change != null && period != null && <span className="x-balance-period">{period}</span>}
        </div>
      )}
      {actions != null && <div className="x-balance-actions">{actions}</div>}
    </section>
  );
}
