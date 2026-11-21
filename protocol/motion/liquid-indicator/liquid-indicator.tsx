"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { trackIndicator } from "../../core/motion.js";
import "./liquid-indicator.css";

export type LiquidIndicatorItem<T extends string> = {
  value: T;
  label: ReactNode;
  /** An svg.x-icon. */
  icon?: ReactNode;
  /** A link: the item becomes an anchor (navigation), and `value` comes from the route. */
  href?: string;
};

export type LiquidIndicatorProps<T extends string> = {
  items: LiquidIndicatorItem<T>[];
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  /** Items share the width equally (a tab bar). */
  fullWidth?: boolean;
  /** stack: the icon above the label. */
  layout?: "inline" | "stack";
  /** Names the group ("View"). */
  "aria-label": string;
  className?: string;
};

// Layout effects do not run on the server; the indicator only matters in the browser.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** One current item, and one pill that slides to it. Buttons for a choice; links (`href`) for navigation. */
export function LiquidIndicator<T extends string>({ items, value, defaultValue, onValueChange, fullWidth, layout = "inline", className, "aria-label": label }: LiquidIndicatorProps<T>) {
  const [inner, setInner] = useState(defaultValue ?? items[0]?.value);
  const current = value ?? inner;
  const ref = useRef<HTMLDivElement>(null);
  const tracker = useRef<ReturnType<typeof trackIndicator> | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    tracker.current = trackIndicator(root, () => root.querySelector<HTMLElement>(":scope > .x-liquid-indicator-item[aria-current]"));
    return () => tracker.current?.destroy();
  }, []);
  useIsomorphicLayoutEffect(() => { tracker.current?.update(); }, [current, items.length]);

  const pick = (next: T) => {
    if (value === undefined) setInner(next);
    onValueChange?.(next);
  };
  const navigation = items.some((item) => item.href);
  const Root = navigation ? "nav" : "div";
  return (
    <Root
      ref={ref as never}
      className={className ? `x-liquid-indicator ${className}` : "x-liquid-indicator"}
      role={navigation ? undefined : "group"}
      aria-label={label}
      data-width={fullWidth ? "full" : undefined}
      data-layout={layout === "stack" ? "stack" : undefined}
    >
      {items.map((item) => {
        const content = <>{item.icon}<span>{item.label}</span></>;
        const on = item.value === current;
        return item.href ? (
          <a key={item.value} className="x-liquid-indicator-item" href={item.href} aria-current={on ? "page" : undefined} onClick={() => pick(item.value)}>{content}</a>
        ) : (
          <button key={item.value} className="x-liquid-indicator-item" type="button" aria-current={on ? "true" : undefined} onClick={() => pick(item.value)}>{content}</button>
        );
      })}
      <span className="x-liquid-indicator-pill" aria-hidden="true" />
    </Root>
  );
}
