import type { CSSProperties } from "react";
import "./skeleton.css";

export type SkeletonProps = {
  /** text: one line. circle: an avatar or icon. rect: a block (default). */
  shape?: "text" | "circle" | "rect";
  /** A length: px when a number, any CSS length otherwise. Fills the line by default. */
  width?: number | string;
  height?: number | string;
  /** Corner radius, to match the shape it stands for (a 14px tile). */
  radius?: number | string;
  className?: string;
};

const len = (v?: number | string) => (typeof v === "number" ? `${v}px` : v);

/** A placeholder in the shape of loading content. Hidden from screen readers: mark the region aria-busy. */
export function Skeleton({ shape = "rect", width, height, radius, className }: SkeletonProps) {
  const style: Record<string, string> = {};
  if (width !== undefined) style["--x-skeleton-width"] = len(width)!;
  if (height !== undefined) style["--x-skeleton-height"] = len(height)!;
  if (radius !== undefined) style["--x-skeleton-radius"] = len(radius)!;
  return (
    <span
      className={className ? `x-skeleton ${className}` : "x-skeleton"}
      data-shape={shape === "rect" ? undefined : shape}
      aria-hidden="true"
      style={Object.keys(style).length ? (style as CSSProperties) : undefined}
    />
  );
}

/**
 * A varied but stable width for a placeholder, so loading text looks like text of different lengths without
 * knowing it: the same seed always gives the same width (no flicker, the same on server and client).
 * Seed it with a row and column index. Use "%" in full-width columns and "em" where the column fits its content.
 */
export function skeletonWidth(seed: number, min = 40, max = 85, unit: "%" | "em" | "px" = "%"): string {
  const span = Math.max(1, Math.round((max - min) * (unit === "em" ? 10 : 1)) + 1);
  const n = Math.abs(Math.imul(seed + 1, 2654435761)) % span;
  return `${min + (unit === "em" ? n / 10 : n)}${unit}`;
}

/** A seed from a string (a stable component id): for one-off placeholders without an index. */
export function skeletonSeed(text: string): number {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (Math.imul(h, 31) + text.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** Several lines of text; the last one is shorter. */
export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={className ? `x-skeleton-text ${className}` : "x-skeleton-text"}>
      {Array.from({ length: lines }, (_, i) => <Skeleton key={i} shape="text" />)}
    </div>
  );
}
