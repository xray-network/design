"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { bindReorder, type ReorderDetail } from "./reorder.controller.js";
import "./reorder.css";

export type ReorderProps<T extends { id: string }> = {
  /** The items, in order. Each needs a stable `id`. */
  items: T[];
  /** The new order, after a drag or a key press. Set your state from it. */
  onReorder: (items: T[], move: { id: string; from: number; to: number }) => void;
  /** Draws one item. Put `grip` where the item is picked up from; `label` names the grip's item for assistive technology. */
  children: (item: T, grip: ReactNode) => ReactNode;
  /** The grip's accessible name for an item: "Move Savings". */
  label: (item: T) => string;
  /** Names the list. */
  "aria-label"?: string;
  className?: string;
};

const Grip = ({ label }: { label: string }) => (
  <button type="button" className="x-reorder-handle" aria-label={label}>
    <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.75 9h16.5m-16.5 6.75h16.5" /></svg>
  </button>
);

/** A list whose items are dragged, or moved with the arrow keys, into a new order. */
export function Reorder<T extends { id: string }>({ items, onReorder, children, label, className, "aria-label": name }: ReorderProps<T>) {
  const ref = useRef<HTMLUListElement>(null);
  const latest = useRef({ items, onReorder });
  latest.current = { items, onReorder };

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    // React renders the order from state: the controller puts the DOM back, and the new state draws it again.
    const unbind = bindReorder(list, { restore: true });
    const moved = (event: Event) => {
      const { id, from, to, order } = (event as CustomEvent<ReorderDetail>).detail;
      const byId = new Map(latest.current.items.map((item) => [item.id, item]));
      latest.current.onReorder(order.map((key) => byId.get(key)!).filter(Boolean), { id, from, to });
    };
    list.addEventListener("reorder", moved);
    return () => { unbind(); list.removeEventListener("reorder", moved); };
  }, []);

  return (
    <ul ref={ref} className={className ? `x-reorder ${className}` : "x-reorder"} aria-label={name}>
      {items.map((item) => <li key={item.id} data-id={item.id}>{children(item, <Grip label={label(item)} />)}</li>)}
    </ul>
  );
}
