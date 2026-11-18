"use client";

import { useId, type ReactNode } from "react";
import { Skeleton, skeletonSeed, skeletonWidth } from "../../components/skeleton/skeleton";
import "./card.css";

export type TileProps = {
  /** One letter: the object's initial. */
  children: string;
  size?: "xs" | "md" | "base" | "lg";
  className?: string;
};

/** Gray identity tile with the object's initial. Decorative: name the object in text next to it. */
export function Tile({ children, size = "base", className }: TileProps) {
  return (
    <span className={className ? `x-tile ${className}` : "x-tile"} data-size={size === "base" ? undefined : size} aria-hidden="true">
      {children.slice(0, 1)}
    </span>
  );
}

export type CardProps = {
  title: ReactNode;
  description?: ReactNode;
  /** Small mono line under the description: an id or a path. */
  meta?: ReactNode;
  /** Leading visual, usually a Tile or an Avatar. */
  lead?: ReactNode;
  /** Activating the card. Use `href` instead for navigation. */
  onClick?: () => void;
  href?: string;
  /** Accessible name of the card's action ("Open Payments"). */
  "aria-label"?: string;
  /** Floating control in the top-right corner, usually a Menu with an IconButton size="sm". */
  menu?: ReactNode;
  /** While the item loads: a tile placeholder and bars of varied widths in place of the title, description and meta. */
  loading?: boolean;
  className?: string;
};

export function Card({ title, description, meta, lead, onClick, href, menu, loading, className, "aria-label": label }: CardProps) {
  const seed = skeletonSeed(useId());
  const bar = (i: number, min: number, max: number) => <Skeleton shape="text" width={skeletonWidth(seed + i, min, max)} />;
  const body = (
    <>
      {loading && lead != null ? <Skeleton width={48} height={48} radius={14} /> : lead}
      <span className="x-card-text">
        <span className="x-card-title">{loading ? bar(0, 35, 60) : title}</span>
        {description != null && <span className="x-card-description">{loading ? <>{bar(1, 80, 95)}<br />{bar(4, 35, 65)}</> : description}</span>}
        {meta != null && <span className="x-card-meta">{loading ? bar(2, 25, 45) : meta}</span>}
      </span>
    </>
  );
  return (
    <article className={className ? `x-card ${className}` : "x-card"} aria-busy={loading || undefined}>
      {href ? (
        <a className="x-card-main" href={href} aria-label={label}>{body}</a>
      ) : (
        <button className="x-card-main" type="button" onClick={onClick} aria-label={label}>{body}</button>
      )}
      {menu != null && <span className="x-card-menu">{menu}</span>}
    </article>
  );
}

/** Responsive grid of cards: as many 288px+ columns as fit. */
export function CardGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className ? `x-card-grid ${className}` : "x-card-grid"}>{children}</div>;
}
