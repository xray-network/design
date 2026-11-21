"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";
import { bindPager } from "./pager.controller.js";
import "./pager.css";

export type PagerProps = {
  /** The pages, one child each. */
  children: ReactNode;
  /** The page in view. Change it and the track scrolls there. Keep it current from `onIndexChange`. */
  index?: number;
  /** The track stopped on another page: by a swipe, a dot, a key or `index`. */
  onIndexChange?: (index: number) => void;
  /** The next page shows at the edge. */
  peek?: boolean;
  /** Hides the dots: for a pager driven by its own controls. */
  dots?: boolean;
  /** Names the group ("What is new"). */
  "aria-label": string;
  className?: string;
};

/** Pages side by side, swiped through with the platform's own scrolling, snapping to each page. */
export function Pager({ children, index, onIndexChange, peek, dots = true, className, "aria-label": label }: PagerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pager = useRef<ReturnType<typeof bindPager> | null>(null);
  const report = useRef(onIndexChange);
  report.current = onIndexChange;
  const at = useRef(index ?? 0); // where the track last said it is, so its own report is not sent back to it
  const pages = Children.toArray(children);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const bound = (pager.current = bindPager(root));
    const change = (event: Event) => {
      if (event.target !== root) return;
      at.current = (event as CustomEvent).detail.index;
      report.current?.(at.current);
    };
    root.addEventListener("change", change);
    return () => { bound.destroy(); pager.current = null; root.removeEventListener("change", change); };
  }, [pages.length]);
  useEffect(() => {
    if (index === undefined || index === at.current) return;
    at.current = index;
    pager.current?.goTo(index);
  }, [index]);

  return (
    <div ref={ref} className={className ? `x-pager ${className}` : "x-pager"} data-peek={peek ? "" : undefined} role="group" aria-roledescription="carousel" aria-label={label}>
      <ul className="x-pager-track" tabIndex={0}>
        {pages.map((page, i) => (
          <li key={i} className="x-pager-page" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${pages.length}`}>{page}</li>
        ))}
      </ul>
      {dots && (
        <div className="x-pager-dots">
          {pages.map((_, i) => <button key={i} type="button" className="x-pager-dot" aria-label={`Page ${i + 1}`} aria-current={i === (index ?? 0) ? "true" : undefined} />)}
        </div>
      )}
    </div>
  );
}
