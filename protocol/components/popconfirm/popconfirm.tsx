"use client";

import { cloneElement, useEffect, useId, useRef, type ReactElement, type ReactNode, type Ref } from "react";
import { Button } from "../button/button";
import { bindPopover } from "../popover/popover.controller.js";
import "../popover/popover.css";
import "./popconfirm.css";

export type PopconfirmProps = {
  /** The action's button. It receives the popover wiring and a ref. */
  trigger: ReactElement<{ ref?: Ref<HTMLElement>; popoverTarget?: string }>;
  /** The question: "Remove Graph from the dashboard?" */
  title: ReactNode;
  description?: ReactNode;
  /** Names the action: "Remove", never "OK". */
  confirmLabel: ReactNode;
  cancelLabel?: ReactNode;
  /** danger: a danger Confirm button, and focus starts on Cancel. */
  tone?: "default" | "danger";
  onConfirm: () => void;
  onCancel?: () => void;
  /** The side it opens on (default top); it flips to the opposite side when there is no room. */
  placement?: "top" | "bottom" | "left" | "right";
  className?: string;
};

const Icon = ({ danger }: { danger: boolean }) => (
  <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d={danger
      ? "M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
      : "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"} />
  </svg>
);

/** A quick confirmation next to the action. For irreversible actions use Dialog. */
export function Popconfirm({
  trigger, title, description, confirmLabel, cancelLabel = "Cancel", tone = "default", onConfirm, onCancel, placement = "top", className,
}: PopconfirmProps) {
  const id = useId();
  const triggerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const danger = tone === "danger";

  useEffect(() => {
    if (!triggerRef.current || !panelRef.current) return;
    return bindPopover(triggerRef.current, panelRef.current);
  }, []);

  const close = () => panelRef.current?.hidePopover();

  return (
    <>
      {cloneElement(trigger, { ref: triggerRef, popoverTarget: id })}
      <div
        ref={panelRef}
        id={id}
        popover="auto"
        role="alertdialog"
        aria-labelledby={`${id}-title`}
        aria-describedby={description != null ? `${id}-text` : undefined}
        className={className ? `x-popover x-popconfirm ${className}` : "x-popover x-popconfirm"}
        data-placement={placement === "top" ? undefined : placement}
        data-tone={danger ? "danger" : undefined}
      >
        <div className="x-popconfirm-content">
          <Icon danger={danger} />
          <div>
            <p className="x-popover-title" id={`${id}-title`}>{title}</p>
            {description != null && <p className="x-popconfirm-description" id={`${id}-text`}>{description}</p>}
          </div>
        </div>
        <div className="x-popconfirm-actions">
          <Button variant="ghost" size="sm" data-autofocus={danger ? "" : undefined} onClick={() => { close(); onCancel?.(); }}>
            {cancelLabel}
          </Button>
          <Button variant={danger ? "danger" : undefined} size="sm" data-autofocus={danger ? undefined : ""} onClick={() => { close(); onConfirm(); }}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </>
  );
}
