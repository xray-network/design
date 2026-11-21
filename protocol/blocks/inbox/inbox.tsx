import type { ReactNode } from "react";
import "./inbox.css";

export type InboxMessage = {
  id: string;
  /** Who sent it. */
  from: ReactNode;
  subject: ReactNode;
  /** The first words of the message: two lines at most. */
  snippet?: ReactNode;
  /** A time today, a weekday this week, a date before that. */
  time: ReactNode;
  /** The sender's Avatar. */
  avatar?: ReactNode;
  unread?: boolean;
  /** Small svg.x-icon marks before the time: an attachment, a star. */
  marks?: ReactNode;
  href?: string;
};

export type InboxProps = {
  items: InboxMessage[];
  /** The message that is open beside the list. */
  current?: string;
  onOpen?: (id: string) => void;
  "aria-label": string;
  className?: string;
};

/** Messages, newest first. The app supplies them, opens one and marks it read. */
export function Inbox({ items, current, onOpen, className, "aria-label": label }: InboxProps) {
  return (
    <ul className={className ? `x-inbox ${className}` : "x-inbox"} aria-label={label}>
      {items.map((item) => {
        const shared = { className: "x-inbox-row", "data-unread": item.unread ? "" : undefined, "aria-current": item.id === current ? ("true" as const) : undefined, onClick: () => onOpen?.(item.id) };
        const content = (
          <>
            {item.avatar}
            <span className="x-inbox-body">
              <span className="x-inbox-head">
                <span className="x-inbox-from">{item.from}</span>
                {item.marks != null && <span className="x-inbox-marks">{item.marks}</span>}
                <span className="x-inbox-time">{item.time}</span>
              </span>
              <span className="x-inbox-subject">{item.subject}</span>
              {item.snippet != null && <span className="x-inbox-snippet">{item.snippet}</span>}
            </span>
          </>
        );
        return <li key={item.id}>{item.href ? <a href={item.href} {...shared}>{content}</a> : <button type="button" {...shared}>{content}</button>}</li>;
      })}
    </ul>
  );
}
