import type { ElementType, ReactNode } from "react";
import "./stagger.css";

export type StaggerProps = {
  children: ReactNode;
  /** start: items slide in from the start side instead of rising. */
  from?: "below" | "start";
  /** The container element: "div" (default), "ul", "ol". */
  as?: ElementType;
  className?: string;
};

/** Its children enter one after another when it appears. Give it a new `key` to play the cascade again. */
export function Stagger({ children, from = "below", as: Tag = "div", className, ...rest }: StaggerProps & Record<string, unknown>) {
  return <Tag className={className ? `x-stagger ${className}` : "x-stagger"} data-from={from === "start" ? "start" : undefined} {...rest}>{children}</Tag>;
}
