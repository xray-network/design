import type { CSSProperties, ElementType, ReactNode } from "react";
import "./presence.css";

export type PresenceProps = {
  /** Whether it is there. Flip it and the element arrives or leaves. */
  show: boolean;
  children: ReactNode;
  /** Where it comes from. Default: it grows in place. A side: it keeps its size and travels a short way in. */
  from?: "above" | "below" | "start" | "end";
  /** Where it grows from, as a transform origin: "top left" for a panel under the start of its trigger. */
  origin?: string;
  /** The element: "div" (default), "section", "li"… */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

/** A surface that arrives and leaves. The children stay mounted while it is hidden, so their state is kept. */
export function Presence({ show, children, from, origin, as: Tag = "div", className, style, ...rest }: PresenceProps & Record<string, unknown>) {
  return (
    <Tag
      className={className ? `x-presence ${className}` : "x-presence"}
      data-from={from}
      hidden={!show}
      style={origin ? { ...style, ["--x-presence-origin" as string]: origin } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
