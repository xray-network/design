import type { ReactNode } from "react";
import { Composer } from "../composer/composer";
import "./comments.css";

export type Comment =
  | { kind: "comment"; id: string; author: ReactNode; /** The author's Avatar. */ avatar: ReactNode; time: ReactNode; dateTime?: string; /** Paragraphs. */ text: ReactNode }
  /** Something that changed: "<strong>Tomas</strong> moved this to In progress". */
  | { kind: "event"; id: string; text: ReactNode; time: ReactNode; dateTime?: string };

export type CommentsProps = {
  items: Comment[];
  /** With a handler, a box to add a comment sits under the thread. */
  onComment?: (text: string) => void;
  /** Your Avatar (size "sm"), before the box. */
  avatar?: ReactNode;
  placeholder?: string;
  "aria-label"?: string;
  className?: string;
};

/** The conversation under a record, oldest first. The app supplies it and stores new comments. */
export function Comments({ items, onComment, avatar, placeholder = "Add a comment", className, "aria-label": label = "Activity" }: CommentsProps) {
  return (
    <section className={className ? `x-comments ${className}` : "x-comments"} aria-label={label}>
      <ol className="x-comments-list">
        {items.map((item) => item.kind === "event" ? (
          <li key={item.id} className="x-comments-event"><p>{item.text}</p><time className="x-comments-time" dateTime={item.dateTime}>{item.time}</time></li>
        ) : (
          <li key={item.id} className="x-comments-item">
            {item.avatar}
            <div className="x-comments-body">
              <div className="x-comments-head"><span className="x-comments-author">{item.author}</span><time className="x-comments-time" dateTime={item.dateTime}>{item.time}</time></div>
              <div className="x-comments-text">{typeof item.text === "string" ? <p>{item.text}</p> : item.text}</div>
            </div>
          </li>
        ))}
      </ol>
      {onComment && <Composer variant="inline" label={placeholder} placeholder={placeholder} submit="Comment" avatar={avatar} onPost={onComment} />}
    </section>
  );
}
