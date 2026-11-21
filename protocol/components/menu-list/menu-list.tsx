import type { MouseEvent, ReactNode } from "react";
import "./menu-list.css";

export type MenuListItem = {
  label: ReactNode;
  /** A link to a page. Without it the row is a button (onClick). */
  href?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  /** An svg.x-icon, shown in a neutral tile. */
  icon?: ReactNode;
  /** The current setting, on the right ("On", "Automatic"). */
  value?: ReactNode;
  /** Shows a chevron: the row opens a page. */
  chevron?: boolean;
  /** The current page. Set it from the route. */
  current?: boolean;
  disabled?: boolean;
};

export type MenuListGroup = {
  heading?: ReactNode;
  items: MenuListItem[];
  /** A short explanation under the panel. */
  note?: ReactNode;
};

export type MenuListProps = {
  groups: MenuListGroup[];
  /** Names the navigation ("Settings"). */
  "aria-label": string;
  className?: string;
};

const Chevron = () => (
  <svg className="x-menu-list-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);

/** Grouped rows of destinations, settings style. Set `current` on the row for the route. */
export function MenuList({ groups, className, "aria-label": label }: MenuListProps) {
  return (
    <nav className={className ? `x-menu-list ${className}` : "x-menu-list"} aria-label={label}>
      {groups.map((group, g) => (
        <div key={g} className="x-menu-list-section">
          {group.heading != null && <h2 className="x-menu-list-heading">{group.heading}</h2>}
          <ul className="x-menu-list-group">
            {group.items.map((item, i) => {
              const content = (
                <>
                  {item.icon != null && <span className="x-menu-list-icon" aria-hidden="true">{item.icon}</span>}
                  <span className="x-menu-list-label">{item.label}</span>
                  {item.value != null && <span className="x-menu-list-value">{item.value}</span>}
                  {item.chevron && <Chevron />}
                </>
              );
              const shared = {
                className: "x-menu-list-item",
                "aria-current": item.current ? ("page" as const) : undefined,
                "aria-disabled": item.disabled || undefined,
                onClick: item.disabled ? undefined : item.onClick,
              };
              return (
                <li key={i}>
                  {item.href ? <a {...shared} href={item.href}>{content}</a> : <button {...shared} type="button">{content}</button>}
                </li>
              );
            })}
          </ul>
          {group.note != null && <p className="x-menu-list-note">{group.note}</p>}
        </div>
      ))}
    </nav>
  );
}
