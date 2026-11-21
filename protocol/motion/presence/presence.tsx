"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import "./presence.css";

export type PresenceProps = {
  /** Whether it is there. Flip it and the element arrives or leaves. */
  show: boolean;
  children: ReactNode;
  /** Where it comes from. Default: it grows in place. A side: it keeps its size and travels a short way in. */
  from?: "above" | "below" | "start" | "end";
  /** Where it grows from, as a transform origin: "top left" for a panel under the start of its trigger. */
  origin?: string;
  /** Takes the children out of the tree once it has left, and puts them back when it returns: their state is
      not kept. Default: they stay mounted while hidden. */
  unmount?: boolean;
  /** The element: "div" (default), "section", "li"… */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

/** A surface that arrives and leaves. By default the children stay mounted while it is hidden, so their state is kept. */
export function Presence({ show, children, from, origin, unmount, as: Tag = "div", className, style, ...rest }: PresenceProps & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  // With `unmount`, the children outlive `show` by the length of the exit, so they are there to fade out.
  const [kept, setKept] = useState(show);
  if (show && !kept) setKept(true);

  useEffect(() => {
    if (show || !unmount || !kept || !ref.current) return;
    const exit = Math.max(0, ...getComputedStyle(ref.current).transitionDuration.split(",").map((part) => parseFloat(part) * (part.trim().endsWith("ms") ? 1 : 1000)));
    if (!exit) { setKept(false); return; }
    const timer = setTimeout(() => setKept(false), exit);
    return () => clearTimeout(timer);
  }, [show, unmount, kept]);

  return (
    <Tag
      ref={ref}
      className={className ? `x-presence ${className}` : "x-presence"}
      data-from={from}
      hidden={!show}
      style={origin ? { ...style, ["--x-presence-origin" as string]: origin } : style}
      {...rest}
    >
      {unmount && !kept ? null : children}
    </Tag>
  );
}
