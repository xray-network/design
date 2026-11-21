"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { bindDrag } from "./drag.controller.js";
import "./drag.css";

export type DragProps = {
  children: ReactNode;
  /** The axis it moves along. Default "x". */
  axis?: "x" | "y";
  /** The resting places, as offsets in px from where the layout puts it. Default [0]. */
  snap?: number[];
  /** The side(s) it can be thrown away to: "start" is left or up, "end" is right or down. */
  dismiss?: "start" | "end" | "both";
  /** The resting place it is at, as an index into `snap`. Change it and the element springs there: how a button
      opens, collapses or closes a sheet. Keep it current from `onSettle`. */
  place?: number;
  /** Shows the grabber bar, and only it starts a drag (for a sheet whose content scrolls). */
  handle?: boolean;
  /** It came to rest on a resting place. */
  onSettle?: (place: { offset: number; index: number }) => void;
  /** It was just thrown away and is on its way out. Removing it here, from a Reflow list, lets the others close
      the gap while it flies. */
  onLeave?: (direction: "start" | "end") => void;
  /** It was thrown away and has gone. Remove it, or close what it stands for. */
  onDismiss?: (direction: "start" | "end") => void;
  /** The element: "div" (default), "li", "section"… */
  as?: ElementType;
  className?: string;
};

/** Something that follows the finger and settles when let go. Give every outcome a button or a key as well. */
export function Drag({ children, axis = "x", snap, dismiss, place, handle, onSettle, onLeave, onDismiss, as: Tag = "div", className, ...rest }: DragProps & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  const drag = useRef<ReturnType<typeof bindDrag> | null>(null);
  const at = useRef(place);
  at.current = place;
  const handlers = useRef({ onSettle, onLeave, onDismiss });
  handlers.current = { onSettle, onLeave, onDismiss };
  const places = snap?.join(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const offsets = places ? places.split(" ").map(Number) : undefined;
    const bound = (drag.current = bindDrag(el, { axis, snap: offsets, dismiss, handle: handle ? el.querySelector(":scope > .x-drag-handle") : null, start: at.current === undefined ? undefined : offsets?.[at.current] }));
    const settle = (event: Event) => { if (event.target === el) handlers.current.onSettle?.((event as CustomEvent).detail); };
    const gone = (event: Event) => { if (event.target === el) handlers.current.onDismiss?.((event as CustomEvent).detail.direction); };
    const leaving = (event: Event) => { if (event.target === el) handlers.current.onLeave?.((event as CustomEvent).detail.direction); };
    el.addEventListener("settle", settle);
    el.addEventListener("leave", leaving);
    el.addEventListener("dismiss", gone);
    return () => { bound.destroy(); drag.current = null; el.removeEventListener("settle", settle); el.removeEventListener("leave", leaving); el.removeEventListener("dismiss", gone); };
  }, [axis, places, dismiss, handle]);

  // A new place from outside: spring to it.
  useEffect(() => {
    const offset = place === undefined ? undefined : places?.split(" ").map(Number)[place];
    if (offset !== undefined) drag.current?.moveTo(offset);
  }, [place, places]);

  return (
    <Tag ref={ref} className={className ? `x-drag ${className}` : "x-drag"} data-axis={axis} {...rest}>
      {handle && <span className="x-drag-handle" aria-hidden="true" />}
      {children}
    </Tag>
  );
}
