"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { bindMenuNavigation } from "./menu-navigation.controller.js";
import "./menu-navigation.css";

export type MenuNavigationLink = { title: ReactNode; description?: ReactNode; href: string; current?: boolean };

export type MenuNavigationItem = {
  label: ReactNode;
  /** A plain top-level link. */
  href?: string;
  /** Submenu links, each with a title and a one-line description. */
  links?: MenuNavigationLink[];
  /** Two columns of links. */
  columns?: 1 | 2;
  /** Custom submenu content instead of (or after) links. */
  content?: ReactNode;
  /** Marks a top-level link as the current page. */
  current?: boolean;
};

export type MenuNavigationProps = {
  items: MenuNavigationItem[];
  /** click (default): a click opens a submenu, then hovering switches. hover: pointing opens, leaving closes. */
  trigger?: "click" | "hover";
  "aria-label": string;
  className?: string;
};

/** Top navigation; submenus open in one shared panel that slides between items. */
export function MenuNavigation({ items, trigger = "click", className, "aria-label": label }: MenuNavigationProps) {
  const id = useId();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return bindMenuNavigation(ref.current);
  }, [items]);

  const hasPanel = (item: MenuNavigationItem) => !item.href && (item.links?.length || item.content != null);

  return (
    <nav ref={ref} aria-label={label} className={className ? `x-menu-navigation ${className}` : "x-menu-navigation"} data-trigger={trigger === "hover" ? "hover" : undefined}>
      <ul className="x-menu-navigation-list">
        {items.map((item, i) => (
          <li key={i}>
            {hasPanel(item) ? (
              <button type="button" className="x-menu-navigation-trigger" aria-controls={`${id}-${i}`} aria-expanded="false">
                {item.label}
                <svg className="x-menu-navigation-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            ) : (
              <a className="x-menu-navigation-trigger" href={item.href} aria-current={item.current ? "page" : undefined}>{item.label}</a>
            )}
          </li>
        ))}
      </ul>
      <div className="x-menu-navigation-viewport">
        {items.map((item, i) =>
          hasPanel(item) ? (
            <div key={i} className="x-menu-navigation-panel" id={`${id}-${i}`} hidden>
              {item.links?.length ? (
                <ul className="x-menu-navigation-links" data-columns={item.columns === 2 ? "2" : undefined}>
                  {item.links.map((link) => (
                    <li key={link.href}>
                      <a className="x-menu-navigation-link" href={link.href} aria-current={link.current ? "page" : undefined}>
                        <span className="x-menu-navigation-link-title">{link.title}</span>
                        {link.description != null && <span className="x-menu-navigation-link-text">{link.description}</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
              {item.content}
            </div>
          ) : null,
        )}
      </div>
    </nav>
  );
}
