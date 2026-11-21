"use client";

import { useRef } from "react";
import { copyValue } from "./copy.controller.js";
import "../button/button.css";
import "./copy.css";

export type CopyProps = {
  /** What is shown and copied. */
  value: string;
  /** What the value is, for the button's name: "address" → "Copy address". Default: "Copy". */
  label?: string;
  /** Characters kept at the end when the value shortens in the middle. 0 shortens at the end. Default 6. */
  tail?: number;
  /** block: the full value wrapped in a framed panel. */
  variant?: "inline" | "block";
  /** sans: body type, for codes and links. Default mono. */
  font?: "mono" | "sans";
  onCopy?: (value: string) => void;
  className?: string;
};

/** A value with a copy button. Long values shorten in the middle; the full value stays in the DOM. */
export function Copy({ value, label, tail = 6, variant = "inline", font = "mono", onCopy, className }: CopyProps) {
  const ref = useRef<HTMLDivElement>(null);
  const cut = Math.max(0, value.length - Math.max(0, tail));
  return (
    <div
      ref={ref}
      className={className ? `x-copy ${className}` : "x-copy"}
      data-variant={variant === "block" ? "block" : undefined}
      data-font={font === "sans" ? "sans" : undefined}
    >
      <span className="x-copy-value">
        <span className="x-copy-head">{value.slice(0, cut)}</span>
        <span className="x-copy-tail">{value.slice(cut)}</span>
      </span>
      <button
        className="x-icon-button x-copy-button"
        type="button"
        data-size="xs"
        aria-label={label ? `Copy ${label}` : "Copy"}
        onClick={async () => {
          if (ref.current && (await copyValue(ref.current, value))) onCopy?.(value);
        }}
      >
        <svg className="x-icon x-copy-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.75 17.25v3.38c0 .62-.5 1.12-1.13 1.12h-9.75c-.62 0-1.12-.5-1.12-1.13V7.88c0-.63.5-1.13 1.13-1.13H8.25m7.5 10.5h3.38c.62 0 1.12-.5 1.12-1.13V11.25c0-4.46-3.24-8.16-7.5-8.87a9.06 9.06 0 0 0-1.5-.13H9.38c-.63 0-1.13.5-1.13 1.13v3.37m7.5 10.5h-6.38c-.62 0-1.12-.5-1.12-1.13V6.75" /></svg>
        <svg className="x-icon x-copy-done" viewBox="0 0 24 24" aria-hidden="true"><path d="m4.5 12.75 6 6 9-13.5" /></svg>
      </button>
      <span className="x-copy-status" role="status" />
    </div>
  );
}
