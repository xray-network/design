"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "../../components/button/button";
import { Field, Input } from "../../components/input/input";
import { CardOption } from "../../components/card-option/card-option";
import { Skeleton } from "../../components/skeleton/skeleton";
import "./send-form.css";

export type Fee = { value: string; title: string; description: string; amount: number };

export type SendFormProps = {
  /** Spendable balance, in the asset's units. */
  available: number;
  ticker: string;
  fees: Fee[];
  defaultFee?: string;
  /** Converts an amount to a fiat label for the hint ("≈ $175.00 USD"). */
  toFiat?: (amount: number) => string;
  /** Called with a valid request. Show a review dialog from here. */
  onReview: (request: { recipient: string; amount: number; fee: Fee; total: number }) => void;
  submitLabel?: string;
  /** While the balance and fees load: bars in their place, and the form cannot be sent. */
  loading?: boolean;
  className?: string;
};

export function SendForm({ available, ticker, fees, defaultFee, toFiat, onReview, submitLabel = "Review payment", loading, className }: SendFormProps) {
  const id = useId();
  const [recipient, setRecipient] = useState("");
  const [amountText, setAmountText] = useState("");
  const [feeValue, setFeeValue] = useState(defaultFee ?? fees[0]?.value);
  const [submitted, setSubmitted] = useState(false);

  const fee = fees.find((f) => f.value === feeValue) ?? fees[0];
  const amount = Number(amountText.replace(/,/g, "")) || 0;
  const total = amount + (fee?.amount ?? 0);
  const format = (n: number) => `${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 6 })} ${ticker}`;
  const max = Math.max(0, available - (fee?.amount ?? 0));

  const amountError =
    total > available ? `Not enough ${ticker}: the most you can send is ${format(max)}`
    : submitted && amount <= 0 ? "Enter an amount"
    : undefined;
  const recipientError = submitted && !recipient.trim() ? "Enter an email or account ID" : undefined;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    if (!recipient.trim() || amount <= 0 || total > available || !fee) return;
    onReview({ recipient: recipient.trim(), amount, fee, total });
  };

  return (
    <form className={className ? `x-send-form ${className}` : "x-send-form"} onSubmit={submit} noValidate aria-busy={loading || undefined}>
      <Field label="Recipient" error={recipientError} id={`${id}-to`}>
        {(p) => (
          <Input {...p} className="x-send-form-address" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Email or account ID" autoComplete="off" spellCheck={false} />
        )}
      </Field>
      <Field
        label="Amount"
        hint={loading ? <Skeleton shape="text" width="11em" /> : `${toFiat && amount > 0 ? `≈ ${toFiat(amount)} · ` : ""}${format(available)} available`}
        error={amountError}
        id={`${id}-amount`}
      >
        {(p) => (
          <Input
            {...p}
            size="lg"
            inputMode="decimal"
            placeholder="0.00"
            autoComplete="off"
            value={amountText}
            onChange={(e) => setAmountText(e.target.value)}
            suffix={
              <>
                <Button variant="chip" onClick={() => setAmountText(String(Number(max.toFixed(6))))}>Max</Button>
                <span className="x-input-affix">{ticker}</span>
              </>
            }
          />
        )}
      </Field>
      <div className="x-field">
        <span className="x-field-label" id={`${id}-fee`}>Fee</span>
        <CardOption
          aria-label="Payout speed"
          value={fee?.value}
          onValueChange={setFeeValue}
          loading={loading}
          options={fees.map((f) => ({ value: f.value, title: f.title, description: f.description, detail: format(f.amount) }))}
        />
      </div>
      <dl className="x-send-form-summary">
        <div><dt>Fee</dt><dd>{loading ? <Skeleton shape="text" width="4.5em" /> : format(fee?.amount ?? 0)}</dd></div>
        <div><dt>Total</dt><dd>{loading ? <Skeleton shape="text" width="5.5em" /> : <b>{format(total)}</b>}</dd></div>
      </dl>
      <Button type="submit" size="lg" fullWidth disabled={loading}>{submitLabel}</Button>
    </form>
  );
}
