"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { IconButton } from "../button/button";
import { isBackdropClick, lockScroll, trackScrollbar, unlockScroll } from "./modal.controller.js";
import "./modal.css";

export type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** Actions, right-aligned on desktop, stacked full-width on phones. Primary action last. */
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
  /** Where it opens: centered (default); near the top of the window for dialogs that grow (search, long forms);
   *  or a full-height side sheet at the end or start edge (details, filters, a navigation drawer). */
  placement?: "center" | "top" | "end" | "start";
  /** Allow closing by clicking the backdrop. Default true; turn off for destructive or unsaved flows. */
  dismissible?: boolean;
  /** Render the children while the dialog has never been open. By default they render on first open, then stay. */
  forceMount?: boolean;
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
  placement = "center",
  dismissible = true,
  forceMount = false,
  className,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [seen, setSeen] = useState(open);
  if (open && !seen) setSeen(true);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => trackScrollbar(), []);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      lockScroll();
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
      data-placement={placement === "center" ? undefined : placement}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={() => {
        unlockScroll();
        onOpenChange(false);
      }}
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
        {forceMount || seen ? children : null}
      </div>
      {footer && <footer className="x-dialog-footer">{footer}</footer>}
    </dialog>
  );
}
