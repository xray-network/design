import type { ElementType, ReactNode } from "react";
import "./stagger.css";

export type StaggerProps = {
  children: ReactNode;
  /** The container element: "div" (default), "ul", "ol". */
  as?: ElementType;
  className?: string;
};

/** Its children enter one after another when it appears. Give it a new `key` to play the cascade again. */
export function Stagger({ children, as: Tag = "div", className, ...rest }: StaggerProps & Record<string, unknown>) {
  return <Tag className={className ? `x-stagger ${className}` : "x-stagger"} {...rest}>{children}</Tag>;
}
