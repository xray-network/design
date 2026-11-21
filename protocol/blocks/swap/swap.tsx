"use client";

import { useState, type ReactNode } from "react";
import { InputAmount } from "../../components/input-amount/input-amount";
import { Button } from "../../components/button/button";
import { Skeleton } from "../../components/skeleton/skeleton";
import "./swap.css";

export type SwapSide = {
  currency: ReactNode;
  currencyMark?: ReactNode;
  /** Opens the app's currency picker. */
  onCurrencyClick?: () => void;
  currencyLabel?: string;
  /** "Balance 2.41". */
  balance?: ReactNode;
  /** "≈ $4,812.60". */
  fiat?: ReactNode;
};

export type SwapProps = {
  pay: SwapSide & {
    value: string;
    onValueChange: (value: string) => void;
    /** Max fills this amount. */
    max?: string;
    decimals?: number;
    /** Over the balance, below the minimum. Blocks review. */
    error?: ReactNode;
  };
  /** The quote: read-only. */
  receive: SwapSide & { value: string };
  /** Swap the pair and re-quote. */
  onFlip: () => void;
  /** Rate, fees, minimum received: from the quote. */
  details?: { term: ReactNode; value: ReactNode }[];
  /** Opens the review step (a screen or a Modal). */
  onReview: () => void;
  /** A quote is on its way: skeletons, review disabled. */
  quoting?: boolean;
  reviewLabel?: ReactNode;
  className?: string;
};

const FlipIcon = () => (
  <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" /></svg>
);

/** Exchange one currency for another at the app's quoted rate. */
export function Swap({ pay, receive, onFlip, details = [], onReview, quoting, reviewLabel = "Review swap", className }: SwapProps) {
  const [turned, setTurned] = useState(false);
  const blocked = quoting || !!pay.error || !pay.value || Number(pay.value) === 0;
  return (
    <form
      className={className ? `x-swap ${className}` : "x-swap"}
      aria-busy={quoting || undefined}
      onSubmit={(event) => {
        event.preventDefault();
        if (!blocked) onReview();
      }}
    >
      <div className="x-swap-pair">
        <InputAmount
          label="You pay"
          value={pay.value}
          onValueChange={pay.onValueChange}
          decimals={pay.decimals}
          currency={pay.currency}
          currencyMark={pay.currencyMark}
          onCurrencyClick={pay.onCurrencyClick}
          currencyLabel={pay.currencyLabel}
          balance={pay.balance}
          max={pay.max}
          fiat={pay.fiat}
          error={pay.error}
        />
        <button
          className="x-icon-button x-swap-flip"
          type="button"
          aria-label="Switch currencies"
          data-turned={turned ? "" : undefined}
          onClick={() => {
            setTurned(!turned);
            onFlip();
          }}
        >
          <FlipIcon />
        </button>
        <InputAmount
          label="You receive"
          value={receive.value}
          readOnly
          currency={receive.currency}
          currencyMark={receive.currencyMark}
          onCurrencyClick={receive.onCurrencyClick}
          currencyLabel={receive.currencyLabel}
          balance={receive.balance}
          fiat={receive.fiat}
          loading={quoting}
        />
      </div>
      {details.length > 0 && (
        <dl className="x-swap-details">
          {details.map((row, i) => (
            <div key={i}>
              <dt>{row.term}</dt>
              <dd>{quoting ? <Skeleton shape="text" width="6em" /> : row.value}</dd>
            </div>
          ))}
        </dl>
      )}
      <Button type="submit" size="lg" fullWidth disabled={blocked}>{reviewLabel}</Button>
    </form>
  );
}
