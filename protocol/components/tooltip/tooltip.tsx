"use client";

import { cloneElement, useEffect, useId, useRef, type ReactElement, type ReactNode, type Ref } from "react";
import { bindTooltip } from "./tooltip.controller.js";
import "./tooltip.css";

export type TooltipProps = {
  /** The tooltip text. Keep it to a few words. */
  content: ReactNode;
  /** The control it describes, usually an IconButton. It receives a ref. */
  children: ReactElement<{ ref?: Ref<HTMLElement>; "aria-describedby"?: string }>;
  /**
   * "label" (default): the text repeats the control's accessible name (an icon button's aria-label),
   * so it is hidden from screen readers. "description": it adds information, linked with aria-describedby.
   */
  kind?: "label" | "description";
  /** The side it shows on (default top); it flips to the opposite side when there is no room. */
  placement?: "top" | "bottom" | "left" | "right";
};

export function Tooltip({ content, children, kind = "label", placement = "top" }: TooltipProps) {
  const id = useId();
  const triggerRef = useRef<HTMLElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!triggerRef.current || !tipRef.current) return;
    return bindTooltip(triggerRef.current, tipRef.current);
  }, []);

  return (
    <>
      {cloneElement(children, { ref: triggerRef, ...(kind === "description" ? { "aria-describedby": id } : {}) })}
      <div
        ref={tipRef}
        id={id}
        popover="manual"
        className="x-tooltip"
        data-placement={placement === "top" ? undefined : placement}
        role={kind === "description" ? "tooltip" : undefined}
        aria-hidden={kind === "label" ? true : undefined}
      >
        {content}
      </div>
    </>
  );
}
