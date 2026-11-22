"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { scrollStrip, trackIndicator } from "../../core/motion.js";
import "./tabs-line.css";

export type TabsLineItem<T extends string> = {
  value: T;
  label: ReactNode;
  /** An svg.x-icon before the label. */
  icon?: ReactNode;
  /** How many items the tab holds, after the label. */
  count?: ReactNode;
  /** A link: the tab becomes an anchor (navigation), and `value` comes from the route. */
  href?: string;
  disabled?: boolean;
};

export type TabsLineProps<T extends string> = {
  items: TabsLineItem<T>[];
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  /** The tabs share the row equally (two to four tabs over a panel). */
  fullWidth?: boolean;
  /** Names the row ("Sections"). */
  "aria-label": string;
  className?: string;
};

// Layout effects do not run on the server; the line only matters in the browser.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Tabs on a hairline, with a line under the current one that slides from tab to tab. Buttons for views shown in
 *  place; links (`href`) for navigation. The app shows the view of the current tab. */
export function TabsLine<T extends string>({ items, value, defaultValue, onValueChange, fullWidth, className, "aria-label": label }: TabsLineProps<T>) {
  const [inner, setInner] = useState(defaultValue ?? items[0]?.value);
  const current = value ?? inner;
  const ref = useRef<HTMLDivElement>(null);
  const tracker = useRef<ReturnType<typeof trackIndicator> | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    tracker.current = trackIndicator(root, () => root.querySelector<HTMLElement>(":scope > .x-tabs-line-item[aria-current]"));
    const strip = scrollStrip(root);
    return () => { tracker.current?.destroy(); strip.destroy(); };
  }, []);
  useIsomorphicLayoutEffect(() => { tracker.current?.update(); }, [current, items.length]);

  const pick = (next: T, el: HTMLElement) => {
    if (value === undefined) setInner(next);
    onValueChange?.(next);
    el.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  };
  const navigation = items.some((item) => item.href);
  const Root = navigation ? "nav" : "div";
  return (
    <Root
      ref={ref as never}
      className={className ? `x-tabs-line ${className}` : "x-tabs-line"}
      role={navigation ? undefined : "group"}
      aria-label={label}
      data-width={fullWidth ? "full" : undefined}
    >
      {items.map((item) => {
        const content = <>{item.icon}<span>{item.label}</span>{item.count != null && <span className="x-tabs-line-count">{item.count}</span>}</>;
        const on = item.value === current;
        return item.href ? (
          <a key={item.value} className="x-tabs-line-item" href={item.href} aria-current={on ? "page" : undefined} onClick={(event) => pick(item.value, event.currentTarget)}>{content}</a>
        ) : (
          <button key={item.value} className="x-tabs-line-item" type="button" disabled={item.disabled} aria-current={on ? "true" : undefined} onClick={(event) => pick(item.value, event.currentTarget)}>{content}</button>
        );
      })}
      <span className="x-tabs-line-bar" aria-hidden="true" />
    </Root>
  );
}
