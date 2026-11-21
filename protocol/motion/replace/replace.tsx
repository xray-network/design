"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { replace } from "./replace.controller.js";
import "./replace.css";

export type ReplaceProps = {
  /** Names what is showing. When it changes, the old content fades out and the new fades in. */
  id: string | number;
  /** The content for `id`. */
  children: ReactNode;
  /** The element: "div" (default), "span", "section"… */
  as?: ElementType;
  className?: string;
};

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** A region whose content changes in place: a tab's panel, a step of a flow, a result that replaces a prompt. */
export function Replace({ id, children, as: Tag = "div", className, ...rest }: ReplaceProps & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  // What is on show: it follows `id` late, once the old content has faded out.
  const [shown, setShown] = useState({ id, children });
  const latest = useRef({ id, children });
  latest.current = { id, children };
  // The same id with new content (a counter, a label) simply renders; only a new id is a replacement.
  if (shown.id === id && shown.children !== children) setShown({ id, children });

  useIsomorphicLayoutEffect(() => {
    if (!ref.current || shown.id === id) return;
    void replace(ref.current, () => setShown(latest.current));
  }, [id]);

  return <Tag ref={ref} className={className ? `x-replace ${className}` : "x-replace"} {...rest}>{shown.children}</Tag>;
}
