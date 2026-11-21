"use client";

import { useId, useState, type ReactNode } from "react";
import { Skeleton } from "../skeleton/skeleton";
import { sanitizeAmount } from "./input-amount.controller.js";
import "../button/button.css";
import "./input-amount.css";

export type InputAmountProps = {
  label: ReactNode;
  /** The amount as text ("12.5"). Controlled with onValueChange, or uncontrolled with defaultValue. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Digits after the point. Default 18. */
  decimals?: number;
  /** The ticker, with an optional mark (token icon) before it. */
  currency: ReactNode;
  currencyMark?: ReactNode;
  /** Makes the currency a button that opens the app's picker. Give it a name through currencyLabel. */
  onCurrencyClick?: () => void;
  /** Accessible name of the currency button ("Change currency, USDC"). */
  currencyLabel?: string;
  /** Text on the right of the head ("Balance 2.41"). */
  balance?: ReactNode;
  /** Shows a Max chip that fills this amount. */
  max?: string;
  /** The fiat value under the amount ("≈ $4,812.60"). */
  fiat?: ReactNode;
  /** Replaces the fiat value and marks the input invalid. */
  error?: ReactNode;
  /** The result of a quote: read-only, faint fill. */
  readOnly?: boolean;
  disabled?: boolean;
  /** Skeleton bars for the balance and fiat value. */
  loading?: boolean;
  size?: "sm" | "md";
  placeholder?: string;
  name?: string;
  id?: string;
  className?: string;
};

const Chevron = () => (
  <svg className="x-amount-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

/** A large amount with its currency, balance and fiat value. The app supplies balances, rates and fiat values. */
export function InputAmount({
  label,
  value,
  defaultValue = "",
  onValueChange,
  decimals = 18,
  currency,
  currencyMark,
  onCurrencyClick,
  currencyLabel,
  balance,
  max,
  fiat,
  error,
  readOnly,
  disabled,
  loading,
  size = "md",
  placeholder = "0",
  name,
  id,
  className,
}: InputAmountProps) {
  const auto = useId();
  const inputId = id ?? auto;
  const footId = `${inputId}-foot`;
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const set = (text: string) => {
    const clean = sanitizeAmount(text, decimals);
    if (value === undefined) setInner(clean);
    onValueChange?.(clean);
  };
  const pill = (
    <>
      {currencyMark != null && <span className="x-amount-currency-mark" aria-hidden="true">{currencyMark}</span>}
      <span>{currency}</span>
    </>
  );
  return (
    <div className={className ? `x-amount ${className}` : "x-amount"} data-size={size === "md" ? undefined : size} aria-busy={loading || undefined}>
      <div className="x-amount-head">
        <label className="x-amount-label" htmlFor={inputId}>{label}</label>
        {(balance != null || max !== undefined) && (
          <span className="x-amount-balance">
            {loading ? <Skeleton shape="text" width="6em" /> : balance}
            {max !== undefined && !readOnly && (
              <button className="x-button" type="button" data-variant="chip" disabled={disabled || loading} onClick={() => set(max)}>Max</button>
            )}
          </span>
        )}
      </div>
      <div className="x-amount-main">
        <input
          className="x-amount-input"
          id={inputId}
          name={name}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder={placeholder}
          value={current}
          readOnly={readOnly}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={fiat != null || error ? footId : undefined}
          onChange={(event) => set(event.target.value)}
        />
        {onCurrencyClick ? (
          <button className="x-amount-currency" type="button" aria-label={currencyLabel} disabled={disabled} onClick={onCurrencyClick}>
            {pill}
            <Chevron />
          </button>
        ) : (
          <span className="x-amount-currency">{pill}</span>
        )}
      </div>
      {(fiat != null || error) && (
        <div className="x-amount-foot" id={footId}>
          {error ? (
            <p className="x-amount-error" role="alert">{error}</p>
          ) : (
            <span className="x-amount-fiat">{loading ? <Skeleton shape="text" width="5em" /> : fiat}</span>
          )}
        </div>
      )}
    </div>
  );
}
