"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { IconButton } from "../button/button";
import "./dialog.css";

/** Same rule as dialog.controller.js: a pointer click outside the dialog's box hit the backdrop. */
function isBackdropClick(dialog: HTMLDialogElement, event: MouseEvent) {
  if (event.target !== dialog || event.detail === 0) return false;
  const r = dialog.getBoundingClientRect();
  return event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom;
}

export type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** Actions, right-aligned on desktop, stacked full-width on phones. Primary action last. */
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
  /** Allow closing by clicking the backdrop. Default true; turn off for destructive or unsaved flows. */
  dismissible?: boolean;
  className?: string;
};

/** Modal dialog on native <dialog>: focus trap, Esc, top layer and inert page come from the platform. */
export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
  dismissible = true,
  className,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // React strips the autofocus attribute; mark the initial focus target with data-autofocus instead.
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    } else if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={className ? `x-dialog ${className}` : "x-dialog"}
      data-size={size === "md" ? undefined : size}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={() => onOpenChange(false)}
      onCancel={(event) => {
        if (!dismissible) event.preventDefault();
      }}
      onClick={(event) => {
        if (dismissible && isBackdropClick(event.currentTarget, event.nativeEvent)) onOpenChange(false);
      }}
    >
      <header className="x-dialog-header">
        <h2 className="x-dialog-title" id={titleId}>{title}</h2>
        <IconButton size="sm" aria-label="Close" onClick={() => onOpenChange(false)}>
          <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6l12 12" /></svg>
        </IconButton>
      </header>
      <div className="x-dialog-body">
        {description && <p className="x-dialog-description" id={descriptionId}>{description}</p>}
        {children}
      </div>
      {footer && <footer className="x-dialog-footer">{footer}</footer>}
    </dialog>
  );
}
