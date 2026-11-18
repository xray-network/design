"use client";

import { cloneElement, useEffect, useId, useRef, type ReactElement, type ReactNode, type Ref } from "react";
import { bindPopover } from "./popover.controller.js";
import "./popover.css";

export type PopoverProps = {
  /** The trigger: a Button or IconButton element. It receives the popover wiring and a ref. */
  trigger: ReactElement<{ ref?: Ref<HTMLElement>; popoverTarget?: string }>;
  title?: ReactNode;
  children: ReactNode;
  /** Names the panel when there is no title. */
  "aria-label"?: string;
  /** The side it opens on; it flips to the opposite side when there is no room. */
  placement?: "top" | "bottom" | "left" | "right";
  className?: string;
};

/** A small non-modal panel anchored to its trigger. Mark an element data-autofocus to focus it on open. */
export function Popover({ trigger, title, children, placement = "top", className, "aria-label": label }: PopoverProps) {
  const id = useId();
  const titleId = `${id}-title`;
  const triggerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!triggerRef.current || !panelRef.current) return;
    return bindPopover(triggerRef.current, panelRef.current);
  }, []);

  return (
    <>
      {cloneElement(trigger, { ref: triggerRef, popoverTarget: id })}
      <div
        ref={panelRef}
        id={id}
        popover="auto"
        role="dialog"
        aria-labelledby={title != null ? titleId : undefined}
        aria-label={title != null ? undefined : label}
        className={className ? `x-popover ${className}` : "x-popover"}
        data-placement={placement === "top" ? undefined : placement}
      >
        {title != null && <p className="x-popover-title" id={titleId}>{title}</p>}
        <div className="x-popover-body">{children}</div>
      </div>
    </>
  );
}
