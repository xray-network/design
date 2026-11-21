import type { ReactNode } from "react";
import "./stories.css";

export type Story = {
  id: string;
  name: string;
  /** The Avatar. */
  avatar: ReactNode;
  /** Nothing new since it was last opened: the ring becomes a hairline. */
  seen?: boolean;
  href?: string;
};

export type StoriesProps = {
  items: Story[];
  onOpen?: (id: string) => void;
  /** Names the row ("Stories"). */
  "aria-label": string;
  className?: string;
};

/** A row of people or channels with something new. New ones come first; the app marks them seen. */
export function Stories({ items, onOpen, className, "aria-label": label }: StoriesProps) {
  return (
    <ul className={className ? `x-stories ${className}` : "x-stories"} aria-label={label}>
      {items.map((item) => {
        const content = <><span className="x-stories-ring">{item.avatar}</span><span className="x-stories-name">{item.name}</span></>;
        const seen = item.seen ? "" : undefined;
        return (
          <li key={item.id}>
            {item.href
              ? <a className="x-stories-item" href={item.href} data-seen={seen} onClick={() => onOpen?.(item.id)}>{content}</a>
              : <button className="x-stories-item" type="button" data-seen={seen} onClick={() => onOpen?.(item.id)}>{content}</button>}
          </li>
        );
      })}
    </ul>
  );
}
