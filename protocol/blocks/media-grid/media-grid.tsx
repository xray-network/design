import type { CSSProperties, ReactNode } from "react";
import "./media-grid.css";

export type MediaGridItem = {
  id: string;
  /** The picture: an img, a video poster, or the app's own art. It fills its cell. */
  media: ReactNode;
  /** What the picture shows: the item's accessible name. */
  label: string;
  /** Two rows high: one feature among the squares. */
  tall?: boolean;
  /** An svg.x-icon in the corner, for a video or a set of pictures. */
  mark?: ReactNode;
  href?: string;
};

export type MediaGridProps = {
  items: MediaGridItem[];
  /** 3 by default. */
  columns?: number;
  onOpen?: (id: string) => void;
  "aria-label": string;
  className?: string;
};

/** Square pictures, edge to edge, two pixels apart: an explore page, a profile's posts, a gallery. */
export function MediaGrid({ items, columns, onOpen, className, "aria-label": label }: MediaGridProps) {
  return (
    <ul className={className ? `x-media-grid ${className}` : "x-media-grid"} aria-label={label} style={columns ? ({ "--x-media-grid-columns": columns } as CSSProperties) : undefined}>
      {items.map((item) => {
        const content = <>{item.media}{item.mark != null && <span className="x-media-grid-mark">{item.mark}</span>}</>;
        return (
          <li key={item.id} className="x-media-grid-cell" data-span={item.tall ? "tall" : undefined}>
            {item.href
              ? <a className="x-media-grid-item" href={item.href} aria-label={item.label} onClick={() => onOpen?.(item.id)}>{content}</a>
              : <button className="x-media-grid-item" type="button" aria-label={item.label} onClick={() => onOpen?.(item.id)}>{content}</button>}
          </li>
        );
      })}
    </ul>
  );
}
