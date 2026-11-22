"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { IconButton } from "../button/button";
import { isBackdropClick, lockScroll, trackScrollbar, unlockScroll } from "../modal/modal.controller.js";
import "./drawer.css";

export type DrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** Actions at the bottom of the panel, right-aligned on desktop, stacked full-width on phones. Primary action last. */
  footer?: ReactNode;
  size?: "md" | "lg";
  /** The edge it opens at: the end (default) for filters, details and settings; the start for navigation. */
  placement?: "end" | "start";
  /** Allow closing by clicking the backdrop or pressing Esc. Default true; turn off for unsaved flows. */
  dismissible?: boolean;
  /** Render the children while the drawer has never been open. By default they render on first open, then stay. */
  forceMount?: boolean;
  className?: string;
};

/** A panel at the window's edge on native <dialog>: focus trap, Esc, top layer and inert page come from the platform. */
export function Drawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
  placement = "end",
  dismissible = true,
  forceMount = false,
  className,
}: DrawerProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [seen, setSeen] = useState(open);
  if (open && !seen) setSeen(true);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => trackScrollbar(), []);

  useEffect(() => {
    const drawer = ref.current;
    if (!drawer) return;
    if (open && !drawer.open) {
      lockScroll();
      drawer.showModal();
      // React strips the autofocus attribute; mark the initial focus target with data-autofocus instead.
      drawer.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    } else if (!open && drawer.open) drawer.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={className ? `x-drawer ${className}` : "x-drawer"}
      data-size={size === "md" ? undefined : size}
      data-placement={placement === "end" ? undefined : placement}
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
      <header className="x-drawer-header">
        <h2 className="x-drawer-title" id={titleId}>{title}</h2>
        <IconButton size="sm" aria-label="Close" onClick={() => onOpenChange(false)}>
          <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6l12 12" /></svg>
        </IconButton>
      </header>
      <div className="x-drawer-body">
        {description && <p className="x-drawer-description" id={descriptionId}>{description}</p>}
        {forceMount || seen ? children : null}
      </div>
      {footer && <footer className="x-drawer-footer">{footer}</footer>}
    </dialog>
  );
}
