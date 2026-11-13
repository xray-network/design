"use client";

import { cloneElement, useEffect, useId, useRef, type ReactElement, type ReactNode, type Ref } from "react";
import { bindMenu } from "./menu.controller.js";
import "./menu.css";

export type MenuEntry =
  | {
      label: ReactNode;
      icon?: ReactNode;
      /** Right-aligned hint: a shortcut or a status. */
      note?: ReactNode;
      tone?: "danger";
      disabled?: boolean;
      onSelect?: () => void;
    }
  | { heading: ReactNode }
  | "separator";

export type MenuProps = {
  /** The trigger: a Button or IconButton element. It receives the popover wiring and a ref. */
  trigger: ReactElement<{ ref?: Ref<HTMLElement>; popoverTarget?: string }>;
  items: MenuEntry[];
  "aria-label": string;
  className?: string;
};

export function Menu({ trigger, items, className, "aria-label": label }: MenuProps) {
  const id = useId();
  const triggerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!triggerRef.current || !menuRef.current) return;
    return bindMenu(triggerRef.current, menuRef.current);
  }, []);

  return (
    <>
      {cloneElement(trigger, { ref: triggerRef, popoverTarget: id })}
      <div ref={menuRef} id={id} popover="auto" role="menu" aria-label={label} className={className ? `x-menu ${className}` : "x-menu"}>
        {items.map((entry, i) => {
          if (entry === "separator") return <div key={i} className="x-menu-separator" role="separator" />;
          if ("heading" in entry) return <div key={i} className="x-menu-heading" role="presentation">{entry.heading}</div>;
          return (
            <button
              key={i}
              type="button"
              role="menuitem"
              className="x-menu-item"
              data-tone={entry.tone}
              disabled={entry.disabled}
              onClick={entry.onSelect}
            >
              {entry.icon}
              {entry.label}
              {entry.note != null && <span className="x-menu-note">{entry.note}</span>}
            </button>
          );
        })}
      </div>
    </>
  );
}
