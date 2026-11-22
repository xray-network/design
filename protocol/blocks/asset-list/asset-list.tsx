import type { CSSProperties, ReactNode } from "react";
import { Delta } from "../../components/tag/tag";
import "../../components/list/list.css";
import "./asset-list.css";

export type Asset = {
  id: string;
  name: ReactNode;
  /** How much is held, with its ticker: "0.1 BTC". */
  amount: ReactNode;
  /** What that is worth, formatted. */
  value: ReactNode;
  /** The move over the period, in percent. */
  change?: number;
  /** The asset's share of the whole, 0 to 1: a slim line under the row. */
  share?: number;
  /** The asset's mark: a token disc with its icon (span.x-list-token[data-tone=neutral] › Icon), an Avatar, a logo. */
  lead?: ReactNode;
  href?: string;
};

export type AssetListProps = {
  items: Asset[];
  /** Hides amounts and values (a "hide balances" switch): they read as dots. */
  masked?: boolean;
  onOpen?: (id: string) => void;
  "aria-label": string;
  className?: string;
};

const DOTS = "••••";

/** What an account holds, largest first. The app supplies the holdings and opens one. */
export function AssetList({ items, masked, onOpen, className, "aria-label": label }: AssetListProps) {
  return (
    <div className={className ? `x-list x-asset-list ${className}` : "x-list x-asset-list"} role="list" aria-label={label}>
      {items.map((item) => {
        const content = (
          <>
            {item.lead}
            <span className="x-list-text"><span className="x-list-title">{item.name}</span><span className="x-list-sub">{masked ? DOTS : item.amount}</span></span>
            <span className="x-list-end"><span className="x-list-title">{masked ? DOTS : item.value}</span>{item.change !== undefined && <span className="x-list-sub"><Delta value={item.change} /></span>}</span>
            {item.share !== undefined && <span className="x-asset-list-share" style={{ "--x-asset-list-share": Math.min(1, Math.max(0, item.share)) } as CSSProperties} aria-hidden="true" />}
          </>
        );
        return item.href
          ? <a key={item.id} className="x-list-row" role="listitem" href={item.href} onClick={() => onOpen?.(item.id)}>{content}</a>
          : <button key={item.id} className="x-list-row" role="listitem" type="button" onClick={() => onOpen?.(item.id)}>{content}</button>;
      })}
    </div>
  );
}
