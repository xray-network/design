import type { ReactNode } from "react";
import { Delta } from "../../components/tag/tag";
import "../../components/list/list.css";
import "./market-list.css";

export type Market = {
  id: string;
  /** The ticker: "BTC", "ETH / USDC". */
  symbol: ReactNode;
  /** The asset's name, or its volume: the quiet second line. */
  name?: ReactNode;
  /** The asset's mark: a token disc with its icon (span.x-list-token[data-tone=neutral] › Icon), an Avatar, a logo. */
  lead?: ReactNode;
  /** The price, formatted. */
  price: ReactNode;
  /** The move over the period, in percent: its sign gives the color. */
  change: number;
  /** A Sparkline of the period, 72px wide, with its `trend` set to the direction of the move. */
  trend?: ReactNode;
  href?: string;
};

export type MarketListProps = {
  items: Market[];
  onOpen?: (id: string) => void;
  "aria-label": string;
  className?: string;
};

/** Prices at a glance. The app supplies the markets, in its order, and opens one. */
export function MarketList({ items, onOpen, className, "aria-label": label }: MarketListProps) {
  return (
    <div className={className ? `x-list x-market-list ${className}` : "x-list x-market-list"} role="list" aria-label={label}>
      {items.map((item) => {
        const content = (
          <>
            {item.lead}
            <span className="x-list-text"><span className="x-list-title">{item.symbol}</span>{item.name != null && <span className="x-list-sub">{item.name}</span>}</span>
            {item.trend != null && <span className="x-market-list-trend">{item.trend}</span>}
            <span className="x-list-end"><span className="x-list-title">{item.price}</span><span className="x-list-sub"><Delta value={item.change} /></span></span>
          </>
        );
        return item.href
          ? <a key={item.id} className="x-list-row" role="listitem" href={item.href} onClick={() => onOpen?.(item.id)}>{content}</a>
          : <button key={item.id} className="x-list-row" role="listitem" type="button" onClick={() => onOpen?.(item.id)}>{content}</button>;
      })}
    </div>
  );
}
