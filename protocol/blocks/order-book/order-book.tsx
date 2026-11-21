import type { CSSProperties, ReactNode } from "react";
import "./order-book.css";

export type OrderLevel = { price: number; amount: number };

export type OrderBookProps = {
  /** Sell orders, the lowest price first (nearest the middle). */
  asks: OrderLevel[];
  /** Buy orders, the highest price first (nearest the middle). */
  bids: OrderLevel[];
  /** The last traded price, formatted. */
  last: ReactNode;
  /** "Spread 0.70 (0.02%)". */
  spread?: ReactNode;
  /** The three column heads: price, amount, running total. */
  columns: [string, string, string];
  /** How many levels to show on each side. 8 by default. */
  depth?: number;
  formatPrice?: (price: number) => string;
  formatAmount?: (amount: number) => string;
  /** A row was pressed: put its price into the order form. */
  onPick?: (price: number, side: "ask" | "bid") => void;
  "aria-label": string;
  className?: string;
};

const fixed = (digits: number) => (value: number) => value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });

/** The open orders of one market. The app supplies the levels and keeps them current. */
export function OrderBook({ asks, bids, last, spread, columns, depth = 8, formatPrice = fixed(2), formatAmount = fixed(3), onPick, className, "aria-label": label }: OrderBookProps) {
  // Each level's running total, counted from the middle out.
  const run = (levels: OrderLevel[]) => { let sum = 0; return levels.slice(0, depth).map((level) => ({ ...level, total: (sum += level.amount) })); };
  const sells = run(asks), buys = run(bids);
  const deepest = Math.max(sells.at(-1)?.total ?? 0, buys.at(-1)?.total ?? 0) || 1;
  const row = (level: OrderLevel & { total: number }, side: "ask" | "bid") => (
    <li key={level.price}>
      <button className="x-order-book-row" type="button" style={{ "--x-order-book-depth": level.total / deepest } as CSSProperties} aria-label={`${side === "ask" ? "Sell" : "Buy"} ${formatAmount(level.amount)} at ${formatPrice(level.price)}, ${formatAmount(level.total)} in total`} onClick={() => onPick?.(level.price, side)}>
        <span className="x-order-book-price">{formatPrice(level.price)}</span><span>{formatAmount(level.amount)}</span><span>{formatAmount(level.total)}</span>
      </button>
    </li>
  );
  return (
    <section className={className ? `x-order-book ${className}` : "x-order-book"} aria-label={label}>
      <div className="x-order-book-head" aria-hidden="true">{columns.map((column) => <span key={column}>{column}</span>)}</div>
      {/* Asks are listed with the best (lowest) price next to the middle, so the far prices come first. */}
      <ol className="x-order-book-side" data-side="ask" aria-label="Asks">{[...sells].reverse().map((level) => row(level, "ask"))}</ol>
      <div className="x-order-book-spread"><span className="x-order-book-last">{last}</span>{spread != null && <span>{spread}</span>}</div>
      <ol className="x-order-book-side" data-side="bid" aria-label="Bids">{buys.map((level) => row(level, "bid"))}</ol>
    </section>
  );
}
