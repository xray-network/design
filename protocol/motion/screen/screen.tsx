"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { screenTransition, type ScreenDirection } from "./screen.controller.js";
import "./screen.css";

export type { ScreenDirection };

export type ScreensProps = {
  /** The id of the screen in view. Changing it plays the transition. */
  current: string;
  /** How the next change travels: "forward" (deeper), "back" (out again) or "fade" (sideways: tabs). Default "forward". */
  direction?: ScreenDirection;
  /** The Screen elements. All stay mounted, so each keeps its state and scroll position. */
  children: ReactNode;
  className?: string;
};

export type ScreenProps = {
  id: string;
  children: ReactNode;
  /** Names the screen for assistive technology. */
  "aria-label"?: string;
  className?: string;
};

const Shown = createContext<{ current: string; leaving: string | null }>({ current: "", leaving: null });
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** One screen in view at a time; changing `current` slides or fades to the next. */
export function Screens({ current, direction = "forward", children, className }: ScreensProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(current);
  // The screen that is leaving stays in the layout until the transition ends.
  const [leaving, setLeaving] = useState<string | null>(null);
  if (current !== shown) { setLeaving(shown); setShown(current); }

  // After the DOM shows both screens and before paint.
  useIsomorphicLayoutEffect(() => {
    if (!leaving || !ref.current) return;
    const find = (id: string) => [...ref.current!.children].find((el) => (el as HTMLElement).dataset.screen === id) as HTMLElement | undefined;
    const from = find(leaving), to = find(current);
    if (!from || !to) { setLeaving(null); return; }
    to.focus({ preventScroll: true });
    let live = true;
    void screenTransition(from, to, { direction }).then(() => {
      if (!live) return;
      // Out of the layout now, before the next paint; the state follows and renders the same thing.
      from.hidden = true;
      setLeaving(null);
    });
    return () => { live = false; };
  }, [current]);

  return (
    <div ref={ref} className={className ? `x-screens ${className}` : "x-screens"}>
      <Shown.Provider value={{ current: shown, leaving }}>{children}</Shown.Provider>
    </div>
  );
}

/** One screen of a Screens container. */
export function Screen({ id, children, className, "aria-label": label }: ScreenProps) {
  const { current, leaving } = useContext(Shown);
  return (
    <section className={className ? `x-screen ${className}` : "x-screen"} data-screen={id} aria-label={label} tabIndex={-1} hidden={id !== current && id !== leaving}>
      {children}
    </section>
  );
}
