"use client";

import { useId, type ReactNode } from "react";
import { Skeleton, skeletonSeed, skeletonWidth } from "../../components/skeleton/skeleton";
import "./list.css";

/** A list of rows. Group rows by day or category with ListHeading between them. */
export function List({ children, className, "aria-label": label }: { children: ReactNode; className?: string; "aria-label"?: string }) {
  return <div className={className ? `x-list ${className}` : "x-list"} role="list" aria-label={label}>{children}</div>;
}

export const ListHeading = ({ children }: { children: ReactNode }) => <div className="x-list-heading">{children}</div>;

export type ListRowProps = {
  title: ReactNode;
  sub?: ReactNode;
  /** Leading mark: <ListIcon>, a token disc, an Avatar or a Tile. */
  lead?: ReactNode;
  /** Right side, first line: an amount or a status. */
  end?: ReactNode;
  /** Right side, second line: a fiat value or a detail. */
  endSub?: ReactNode;
  /** "positive" colors the amount (incoming funds, rewards). */
  tone?: "positive";
  /** Makes the row a button. Use `href` for navigation. */
  onClick?: () => void;
  href?: string;
  /** While the row loads: a round placeholder for the lead and one-line bars of varied widths for each text. */
  loading?: boolean;
  className?: string;
};

export function ListRow({ title, sub, lead, end, endSub, tone, onClick, href, loading, className }: ListRowProps) {
  const seed = skeletonSeed(useId());
  const bar = (i: number, min: number, max: number, unit: "%" | "em" = "%") => <Skeleton shape="text" width={skeletonWidth(seed + i, min, max, unit)} />;
  const cls = className ? `x-list-row ${className}` : "x-list-row";
  const body = (
    <>
      {loading && lead != null ? <Skeleton shape="circle" width={36} /> : lead}
      <span className="x-list-text">
        <span className="x-list-title">{loading ? bar(0, 30, 55) : title}</span>
        {sub != null && <span className="x-list-sub">{loading ? bar(1, 45, 75) : sub}</span>}
      </span>
      {(end != null || endSub != null) && (
        <span className="x-list-end" data-tone={tone}>
          {end != null && <span className="x-list-title">{loading ? bar(2, 4, 6.5, "em") : end}</span>}
          {endSub != null && <span className="x-list-sub">{loading ? bar(3, 3, 5.5, "em") : endSub}</span>}
        </span>
      )}
    </>
  );
  if (href) return <a className={cls} href={href} role="listitem">{body}</a>;
  if (onClick) return <button className={cls} type="button" onClick={onClick} role="listitem">{body}</button>;
  return <div className={cls} role="listitem">{body}</div>;
}

/** 36px outlined circle around an icon. */
export const ListIcon = ({ children, tone }: { children: ReactNode; tone?: "positive" }) => (
  <span className="x-list-icon" data-tone={tone} aria-hidden="true">{children}</span>
);
