import type { ReactNode } from "react";
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
  className?: string;
};

export function ListRow({ title, sub, lead, end, endSub, tone, onClick, href, className }: ListRowProps) {
  const cls = className ? `x-list-row ${className}` : "x-list-row";
  const body = (
    <>
      {lead}
      <span className="x-list-text">
        <span className="x-list-title">{title}</span>
        {sub != null && <span className="x-list-sub">{sub}</span>}
      </span>
      {(end != null || endSub != null) && (
        <span className="x-list-end" data-tone={tone}>
          {end != null && <span className="x-list-title">{end}</span>}
          {endSub != null && <span className="x-list-sub">{endSub}</span>}
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
