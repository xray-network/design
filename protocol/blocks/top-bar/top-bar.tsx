import type { ReactNode } from "react";
import { LiquidIndicator, type LiquidIndicatorItem } from "../../motion/liquid-indicator/liquid-indicator";
import "./top-bar.css";

export type TopBarProps<T extends string> = {
  /** The product's name or logo. With `brandHref` it is a link home. */
  brand: ReactNode;
  brandHref?: string;
  /** The main sections, each with an icon: in a narrow bar only the icons stay. */
  items: LiquidIndicatorItem<T>[];
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  /** The end of the bar: the account's Avatar, an icon button or two. */
  end?: ReactNode;
  /** Names the navigation (the product's name). */
  "aria-label": string;
  className?: string;
};

/** The header of a desktop app: brand, section tabs, account. */
export function TopBar<T extends string>({ brand, brandHref, end, className, ...nav }: TopBarProps<T>) {
  return (
    <header className={className ? `x-top-bar ${className}` : "x-top-bar"}>
      {brandHref ? <a className="x-top-bar-brand" href={brandHref}>{brand}</a> : <span className="x-top-bar-brand">{brand}</span>}
      <LiquidIndicator className="x-top-bar-nav" {...nav} />
      {end != null && <div className="x-top-bar-end">{end}</div>}
    </header>
  );
}
