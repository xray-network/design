import type { ReactNode } from "react";
import "./tabs.css";

export type TabItem<T extends string> = {
  value: T;
  label: ReactNode;
  icon?: ReactNode;
  /** Small buttons inside the tab (more, close). Each needs a label. */
  actions?: { label: string; icon: ReactNode; onClick: () => void }[];
  /** Draw a separator before this tab (between groups). */
  separated?: boolean;
};

export type TabsProps<T extends string> = {
  items: TabItem<T>[];
  value: T;
  onValueChange: (value: T) => void;
  "aria-label": string;
  /** Content after the tabs, usually an "add" IconButton. */
  trailing?: ReactNode;
  className?: string;
};

/** View tabs. They are navigation: the current tab carries aria-current="page". */
export function Tabs<T extends string>({ items, value, onValueChange, trailing, className, "aria-label": label }: TabsProps<T>) {
  return (
    <nav className={className ? `x-tabs ${className}` : "x-tabs"} aria-label={label}>
      {items.map((item) => {
        const current = item.value === value ? "page" : undefined;
        const body = <>{item.icon}{item.label}</>;
        return [
          item.separated && <span key={`${item.value}-sep`} className="x-tabs-separator" aria-hidden="true" />,
          item.actions?.length ? (
            <span key={item.value} className="x-tab">
              <button type="button" className="x-tab-main" aria-current={current} onClick={() => onValueChange(item.value)}>{body}</button>
              {item.actions.map((action) => (
                <button key={action.label} type="button" className="x-tab-action" aria-label={action.label} onClick={action.onClick}>{action.icon}</button>
              ))}
            </span>
          ) : (
            <button key={item.value} type="button" className="x-tab" aria-current={current} onClick={() => onValueChange(item.value)}>{body}</button>
          ),
        ];
      })}
      {trailing}
    </nav>
  );
}
