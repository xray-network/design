import type { ReactNode } from "react";
import "./expand.css";

export type ExpandProps = {
  /** Whether the region is open. */
  open: boolean;
  children: ReactNode;
  /** Closed, the first lines stay on show and fade out ("Show more"). --x-expand-peek sets how much. */
  peek?: boolean;
  /** For the trigger's aria-controls. */
  id?: string;
  className?: string;
};

/** A region that opens and closes by height. Put `aria-expanded` and `aria-controls` on whatever toggles it. */
export function Expand({ open, children, peek, id, className }: ExpandProps) {
  return (
    <div id={id} className={className ? `x-expand ${className}` : "x-expand"} data-open={open ? "" : undefined} data-peek={peek ? "" : undefined}>
      <div className="x-expand-content">{children}</div>
    </div>
  );
}
