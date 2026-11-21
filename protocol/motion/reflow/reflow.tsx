"use client";

import { useEffect, useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import { createReflow } from "./reflow.controller.js";
import "./reflow.css";

export type ReflowProps = {
  /** The items, each with a stable `key`. Reorder, add or remove them and the rest glide to their new places. */
  children: ReactNode;
  /** The container element: "ul" (default), "ol" or "div". */
  as?: ElementType;
  className?: string;
};

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** A list whose items glide to their new places when it changes. Lay it out with your own class or style. */
export function Reflow({ children, as: Tag = "ul", className, ...rest }: ReflowProps & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  const engine = useRef<ReturnType<typeof createReflow> | null>(null);

  // After every commit and before paint: play from the places recorded after the last commit, then record again.
  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;
    engine.current ??= createReflow(ref.current);
    engine.current.play();
    engine.current.measure();
  });

  // A resize moves items without a change to the list: record the new places, so the next change starts from them.
  useEffect(() => {
    if (!ref.current || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => engine.current?.measure());
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <Tag ref={ref} className={className ? `x-reflow ${className}` : "x-reflow"} {...rest}>{children}</Tag>;
}
