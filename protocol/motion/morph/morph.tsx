"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { morph } from "./morph.controller.js";
import "./morph.css";

export type MorphProps = {
  /** Which form shows. Changing it morphs one into the other. */
  open: boolean;
  /** The small form: a card, a row, a button. It keeps its place while the large one is open. */
  from: ReactNode;
  /** The large form. It opens over the small one and grows from its box. */
  to: ReactNode;
  /** The large form covers this whole group (over its other content) instead of opening in the small one's place. */
  cover?: boolean;
  className?: string;
};

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** One element becomes another. Flip `open`: the large form grows out of the small one, or shrinks back into it. */
export function Morph({ open, from, to, cover, className }: MorphProps) {
  const groupRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  // The large form stays in view while it closes: `present` follows `open` at once on the way in, late on the way out.
  const [present, setPresent] = useState(open);
  if (open && !present) setPresent(true);

  // After the DOM shows the new state and before paint.
  useIsomorphicLayoutEffect(() => {
    if (first.current) { first.current = false; return; }
    const group = groupRef.current, a = fromRef.current, b = toRef.current;
    if (!group || !a || !b) return;
    const space = cover ? undefined : group;
    if (open) { void morph(a, b, { space }); return; }
    let current = true;
    void morph(a, b, { open: false, space }).then((finished) => {
      if (!finished || !current) return;
      // Swap in the DOM now, before the next paint; the state follows and renders the same thing.
      b.hidden = true;
      group.removeAttribute("data-open");
      setPresent(false);
    });
    return () => { current = false; };
  }, [open]);

  return (
    <div ref={groupRef} className={className ? `x-morph ${className}` : "x-morph"} data-open={present ? "" : undefined} data-cover={cover ? "" : undefined}>
      <div ref={fromRef} className="x-morph-from">{from}</div>
      <div ref={toRef} className="x-morph-to" hidden={!present}>{to}</div>
    </div>
  );
}
