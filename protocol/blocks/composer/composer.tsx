"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import "../../components/button/button.css";
import "./composer.css";

export type ComposerProps = {
  /** Called with the text when it is sent; the box then clears. */
  onPost: (text: string) => void;
  /** The box's accessible name ("New post", "Reply"). */
  label: string;
  placeholder?: string;
  /** The button's text. "Post" by default. */
  submit?: ReactNode;
  /** The most characters a post may have: the count of what is left shows, and sending stops when it is passed. */
  max?: number;
  /** The author's Avatar, before the box. */
  avatar?: ReactNode;
  /** Small icon buttons under the text: a picture, a poll, an emoji. Not shown inline. */
  tools?: ReactNode;
  /** "inline": one line with the button beside it, for a reply box. */
  variant?: "block" | "inline";
  disabled?: boolean;
  className?: string;
};

/** The box a post or a reply is written in. The app supplies what sending does. */
export function Composer({ onPost, label, placeholder, submit = "Post", max, avatar, tools, variant = "block", disabled, className }: ComposerProps) {
  const [text, setText] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);
  const inline = variant === "inline";
  const left = max ? max - text.length : 0;
  const over = !!max && left < 0;

  // The box is as tall as its text, in browsers without field-sizing too.
  useEffect(() => {
    const input = ref.current;
    if (!input || CSS.supports("field-sizing", "content")) return;
    input.style.height = "auto";
    input.style.height = `${input.scrollHeight}px`;
  }, [text]);

  const send = () => {
    const value = text.trim();
    if (!value || over || disabled) return;
    onPost(value);
    setText("");
  };

  return (
    <form className={className ? `x-composer ${className}` : "x-composer"} data-variant={inline ? "inline" : undefined} data-over={over ? "" : undefined} onSubmit={(event) => { event.preventDefault(); send(); }}>
      {avatar != null && <span className="x-composer-lead">{avatar}</span>}
      <div className="x-composer-body">
        <textarea
          ref={ref}
          className="x-composer-input"
          rows={inline ? 1 : 2}
          aria-label={label}
          placeholder={placeholder}
          value={text}
          disabled={disabled}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "Enter" || event.nativeEvent.isComposing) return;
            if (inline ? !event.shiftKey : event.metaKey || event.ctrlKey) { event.preventDefault(); send(); }
          }}
        />
        <div className="x-composer-foot">
          {!inline && <div className="x-composer-tools">{tools}</div>}
          {!inline && !!max && <span className="x-composer-count" aria-live="polite">{left}</span>}
          <button className="x-button" type="submit" data-size="sm" disabled={disabled || over || !text.trim()}>{submit}</button>
        </div>
      </div>
    </form>
  );
}
