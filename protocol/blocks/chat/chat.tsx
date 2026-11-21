"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { IconButton } from "../../components/button/button";
import { Input } from "../../components/input/input";
import "./chat.css";

export type ChatItem =
  | { id: string; from: "me" | "them"; text: ReactNode; /** "14:03", "14:03 · Read". */ meta?: ReactNode }
  | { id: string; day: ReactNode };

export type ChatProps = {
  items: ChatItem[];
  /** Called with the text when the person sends. The app appends the message to `items`. */
  onSend: (text: string) => void;
  placeholder?: string;
  /** Names the thread ("Conversation with Jane Cooper"). */
  "aria-label": string;
  className?: string;
};

const SendIcon = () => <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12 3.27 3.13a59.77 59.77 0 0 1 18.22 8.87A59.77 59.77 0 0 1 3.27 20.88L6 12Zm0 0h7.5" /></svg>;

/** A conversation and its composer. Give it a height: the thread scrolls and follows new messages. */
export function Chat({ items, onSend, placeholder = "Message", className, "aria-label": label }: ChatProps) {
  const [text, setText] = useState("");
  const thread = useRef<HTMLOListElement>(null);
  // Follow the newest message.
  useEffect(() => {
    const el = thread.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [items.length]);

  return (
    <div className={className ? `x-chat ${className}` : "x-chat"}>
      <ol ref={thread} className="x-chat-thread" role="log" aria-label={label}>
        {items.map((item) =>
          "day" in item ? (
            <li key={item.id} className="x-chat-day">{item.day}</li>
          ) : (
            <li key={item.id} className="x-chat-message" data-from={item.from}>
              <div className="x-chat-bubble"><p>{item.from === "me" && <span className="x-chat-you">You: </span>}{item.text}</p></div>
              {item.meta != null && <span className="x-chat-meta">{item.meta}</span>}
            </li>
          ),
        )}
      </ol>
      <form
        className="x-chat-composer"
        onSubmit={(event) => {
          event.preventDefault();
          const value = text.trim();
          if (!value) return;
          onSend(value);
          setText("");
        }}
      >
        <Input aria-label={placeholder} placeholder={placeholder} autoComplete="off" value={text} onChange={(event) => setText(event.target.value)} />
        <IconButton type="submit" shape="round" aria-label="Send" disabled={!text.trim()}><SendIcon /></IconButton>
      </form>
    </div>
  );
}
