"use client";

import { useRef, useState, type ReactNode } from "react";
import { IconButton } from "../button/button";
import { dismissAlert } from "./alert.controller.js";
import "./alert.css";

export type AlertTone = "info" | "success" | "warning" | "danger";

const ICONS: Record<AlertTone, string> = {
  info: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z",
  success: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  warning: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z",
  danger: "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
};

export type AlertProps = {
  tone?: AlertTone;
  title?: ReactNode;
  /** The message. */
  children?: ReactNode;
  /** Buttons under the message (chip or ghost Buttons). */
  actions?: ReactNode;
  /** Shows a dismiss button. Called after the alert has folded away. */
  onDismiss?: () => void;
  /** Dismissible without a callback: the alert just hides itself. */
  dismissible?: boolean;
  className?: string;
};

/** A message in the content flow. Danger and warning alerts are announced (role="alert"); others are status. */
export function Alert({ tone = "info", title, children, actions, onDismiss, dismissible, className }: AlertProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  if (gone) return null;

  const dismiss = async () => {
    if (ref.current) await dismissAlert(ref.current, { remove: false });
    setGone(true);
    onDismiss?.();
  };

  return (
    <div ref={ref} className={className ? `x-alert ${className}` : "x-alert"} data-tone={tone} role={tone === "danger" || tone === "warning" ? "alert" : "status"}>
      <svg className="x-alert-icon x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={ICONS[tone]} /></svg>
      <div className="x-alert-content">
        {title != null && <p className="x-alert-title">{title}</p>}
        {children != null && <p className="x-alert-text">{children}</p>}
        {actions != null && <div className="x-alert-actions">{actions}</div>}
      </div>
      {(onDismiss || dismissible) && (
        <IconButton size="sm" aria-label="Dismiss" onClick={dismiss}>
          <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6l12 12" /></svg>
        </IconButton>
      )}
    </div>
  );
}
