"use client";

import { useId, useState, type ReactNode } from "react";
import { toggleCollapseItem } from "./collapse.controller.js";
import "./collapse.css";

export type CollapseItem<T extends string> = {
  value: T;
  title: ReactNode;
  /** Right-aligned detail in the header: a count, a Tag. */
  extra?: ReactNode;
  content: ReactNode;
};

export type CollapseProps<T extends string> = {
  items: CollapseItem<T>[];
  /** One open item at a time. */
  accordion?: boolean;
  /** Open items (controlled). */
  value?: T[];
  defaultValue?: T[];
  onValueChange?: (open: T[]) => void;
  /** Render every item's content up front. By default content renders on first open and then stays. */
  forceMount?: boolean;
  variant?: "default" | "ghost";
  className?: string;
};

/** Sections that open in place, on native details/summary. */
export function Collapse<T extends string>({
  items, accordion, value, defaultValue = [], onValueChange, forceMount, variant = "default", className,
}: CollapseProps<T>) {
  const name = useId();
  const [inner, setInner] = useState<T[]>(defaultValue);
  const open = value ?? inner;
  const [seen, setSeen] = useState<Set<T>>(() => new Set(open));

  const toggle = (item: T, isOpen: boolean) => {
    if (isOpen === open.includes(item)) return;
    const next = isOpen ? [...(accordion ? [] : open.filter((v) => v !== item)), item] : open.filter((v) => v !== item);
    if (isOpen) setSeen((s) => (s.has(item) ? s : new Set(s).add(item)));
    if (value === undefined) setInner(next);
    onValueChange?.(next);
  };

  return (
    <div className={className ? `x-collapse ${className}` : "x-collapse"} data-variant={variant === "ghost" ? "ghost" : undefined}>
      {items.map((item) => (
        <details
          key={item.value}
          className="x-collapse-item"
          name={accordion ? name : undefined}
          data-value={item.value}
          open={open.includes(item.value)}
          onToggle={(event) => toggle(item.value, event.currentTarget.open)}
        >
          <summary
            className="x-collapse-header"
            onClick={(event) => {
              // Where details content cannot animate in CSS (Safari, Firefox), the height is animated here.
              if (CSS.supports("interpolate-size", "allow-keywords")) return;
              event.preventDefault();
              void toggleCollapseItem(event.currentTarget.parentElement as HTMLDetailsElement);
            }}
          >
            <span className="x-collapse-title">{item.title}</span>
            {item.extra != null && <span className="x-collapse-extra">{item.extra}</span>}
            <svg className="x-collapse-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </summary>
          <div className="x-collapse-content">{forceMount || seen.has(item.value) || open.includes(item.value) ? item.content : null}</div>
        </details>
      ))}
    </div>
  );
}
