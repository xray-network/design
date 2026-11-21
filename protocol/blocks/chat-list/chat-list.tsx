import type { ReactNode } from "react";
import "../../components/list/list.css";
import "./chat-list.css";

export type ChatListItem = {
  id: string;
  name: ReactNode;
  /** The last message, on one line: "Tomas: the new tab bar is in", "Photo", "Voice message, 0:42". */
  last: ReactNode;
  /** When it came: a time today, a weekday this week, a date before that. */
  time: ReactNode;
  /** The Avatar. */
  avatar: ReactNode;
  /** How many messages are unread. */
  unread?: number;
  /** A muted conversation: its count is grey. */
  muted?: boolean;
  href?: string;
};

export type ChatListProps = {
  items: ChatListItem[];
  onOpen?: (id: string) => void;
  "aria-label": string;
  className?: string;
};

/** The conversations, newest first. The app supplies them and opens one. */
export function ChatList({ items, onOpen, className, "aria-label": label }: ChatListProps) {
  return (
    <div className={className ? `x-list x-chat-list ${className}` : "x-list x-chat-list"} role="list" aria-label={label}>
      {items.map((item) => {
        const unread = item.unread ? "" : undefined;
        const content = (
          <>
            {item.avatar}
            <span className="x-list-text"><span className="x-list-title">{item.name}</span><span className="x-list-sub">{item.last}</span></span>
            <span className="x-list-end">
              <span className="x-list-sub">{item.time}</span>
              {item.unread ? <span className="x-chat-list-count" data-muted={item.muted ? "" : undefined} aria-label={`${item.unread} unread${item.muted ? ", muted" : ""}`}>{item.unread > 99 ? "99+" : item.unread}</span> : null}
            </span>
          </>
        );
        return item.href
          ? <a key={item.id} className="x-list-row" role="listitem" href={item.href} data-unread={unread} onClick={() => onOpen?.(item.id)}>{content}</a>
          : <button key={item.id} className="x-list-row" role="listitem" type="button" data-unread={unread} onClick={() => onOpen?.(item.id)}>{content}</button>;
      })}
    </div>
  );
}
