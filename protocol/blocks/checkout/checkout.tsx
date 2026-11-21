"use client";

import { useId, type ReactNode } from "react";
import "./checkout.css";

export type CheckoutItem = {
  id: string;
  name: ReactNode;
  /** The line under the name: dates, a size, a quantity. */
  detail?: ReactNode;
  /** The item's price, formatted. */
  price: ReactNode;
  /** A small square picture. */
  thumb?: ReactNode;
};

export type CheckoutProps = {
  /** "Your order", "Your stay". */
  title: ReactNode;
  items: CheckoutItem[];
  /** How the total adds up: subtotal, fees, tax, a discount. */
  rows?: { label: ReactNode; value: ReactNode }[];
  /** The amount that will be charged, formatted. */
  total: ReactNode;
  totalLabel?: ReactNode;
  /** How it is paid: a List row with the card and a way to change it. */
  method?: ReactNode;
  /** The one button: a full-width Button that names the amount ("Pay $488.00"). */
  action: ReactNode;
  /** Under the button: when the charge happens, the cancellation terms. */
  note?: ReactNode;
  className?: string;
};

/** The order before it is paid. The app supplies the amounts and takes the payment. */
export function Checkout({ title, items, rows = [], total, totalLabel = "Total", method, action, note, className }: CheckoutProps) {
  const titleId = useId();
  return (
    <section className={className ? `x-checkout ${className}` : "x-checkout"} aria-labelledby={titleId}>
      <h2 className="x-checkout-title" id={titleId}>{title}</h2>
      <ul className="x-checkout-items">
        {items.map((item) => (
          <li key={item.id} className="x-checkout-item">
            {item.thumb != null && <span className="x-checkout-thumb">{item.thumb}</span>}
            <span className="x-checkout-text"><span className="x-checkout-name">{item.name}</span>{item.detail != null && <span className="x-checkout-detail">{item.detail}</span>}</span>
            <span className="x-checkout-price">{item.price}</span>
          </li>
        ))}
      </ul>
      <dl className="x-checkout-totals">
        {rows.map((row, i) => <div key={i} className="x-checkout-row"><dt>{row.label}</dt><dd>{row.value}</dd></div>)}
        <div className="x-checkout-row" data-total=""><dt>{totalLabel}</dt><dd>{total}</dd></div>
      </dl>
      {method != null && <div className="x-checkout-method">{method}</div>}
      <div className="x-checkout-pay">
        {action}
        {note != null && <p className="x-checkout-note">{note}</p>}
      </div>
    </section>
  );
}
