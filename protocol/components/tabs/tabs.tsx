"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { scrollStrip } from "../../core/motion.js";
import "./tabs.css";

export type TabItem<T extends string> = {
  value: T;
  label: ReactNode;
  icon?: ReactNode;
  /** Small buttons inside the tab (more, close). Each needs a label. */
  actions?: { label: string; icon: ReactNode; onClick: () => void }[];
  /** Draw a separator before this tab (between groups). */
  separated?: boolean;
  /** The tab's view, shown in a panel under the tabs while the tab is current. */
  content?: ReactNode;
};

export type TabsProps<T extends string> = {
  items: TabItem<T>[];
  value: T;
  onValueChange: (value: T) => void;
  "aria-label": string;
  /** Content after the tabs, usually an "add" IconButton. */
  trailing?: ReactNode;
  /** Render every tab's content up front. By default a tab's content renders when it first becomes current, then stays. */
  forceMount?: boolean;
  className?: string;
};

/** View tabs. They are navigation: the current tab carries aria-current="page". */
export function Tabs<T extends string>({ items, value, onValueChange, trailing, forceMount, className, "aria-label": label }: TabsProps<T>) {
  const id = useId();
  const [seen, setSeen] = useState<Set<T>>(() => new Set([value]));
  if (!seen.has(value)) setSeen(new Set(seen).add(value));
  const panels = items.some((item) => item.content != null);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const strip = scrollStrip(ref.current);
    return () => strip.destroy();
  }, []);
  const ids = (item: TabItem<T>) => (item.content != null ? { id: `${id}-${item.value}-tab`, "aria-controls": `${id}-${item.value}` } : {});

  const nav = (
    <nav ref={ref} className={className ? `x-tabs ${className}` : "x-tabs"} aria-label={label}>
      {items.map((item) => {
        const current = item.value === value ? "page" : undefined;
        const body = <>{item.icon}{item.label}</>;
        return [
          item.separated && <span key={`${item.value}-sep`} className="x-tabs-separator" aria-hidden="true" />,
          item.actions?.length ? (
            <span key={item.value} className="x-tab">
              <button type="button" className="x-tab-main" aria-current={current} {...ids(item)} onClick={() => onValueChange(item.value)}>{body}</button>
              {item.actions.map((action) => (
                <button key={action.label} type="button" className="x-tab-action" aria-label={action.label} onClick={action.onClick}>{action.icon}</button>
              ))}
            </span>
          ) : (
            <button key={item.value} type="button" className="x-tab" aria-current={current} {...ids(item)} onClick={() => onValueChange(item.value)}>{body}</button>
          ),
        ];
      })}
      {trailing}
    </nav>
  );
  if (!panels) return nav;

  return (
    <>
      {nav}
      <div className="x-tabs-panels">
        {items.filter((item) => item.content != null).map((item) => (
          <section key={item.value} className="x-tabs-panel" id={`${id}-${item.value}`} aria-labelledby={`${id}-${item.value}-tab`} hidden={item.value !== value}>
            {forceMount || seen.has(item.value) ? item.content : null}
          </section>
        ))}
      </div>
    </>
  );
}
