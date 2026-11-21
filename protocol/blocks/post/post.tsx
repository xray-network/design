"use client";

import { useId, type ReactNode } from "react";
import { Skeleton } from "../../components/skeleton/skeleton";
import "../../components/button/button.css";
import "./post.css";

export type PostAction = {
  /** "like", "reply", "repost", "share". */
  id: string;
  /** The action's name; its count is added for screen readers ("Like, 248"). */
  label: string;
  /** An svg.x-icon. */
  icon: ReactNode;
  count?: ReactNode;
  /** A toggle: true or false. Leave out for a plain action. */
  pressed?: boolean;
  onPress?: () => void;
  /** Sits at the far end (share, save). */
  end?: boolean;
};

export type PostProps = {
  author: ReactNode;
  /** "@handle · 2h". */
  meta?: ReactNode;
  /** The author's Avatar. */
  avatar?: ReactNode;
  /** The post's menu: an IconButton, or a Menu with one as its trigger. */
  menu?: ReactNode;
  children?: ReactNode;
  /** A picture or video. */
  media?: ReactNode;
  mediaRatio?: "wide" | "square" | "portrait";
  actions?: PostAction[];
  loading?: boolean;
  className?: string;
};

/** One feed item. The app supplies the content, the counts and what the actions do. */
export function Post({ author, meta, avatar, menu, children, media, mediaRatio = "wide", actions = [], loading, className }: PostProps) {
  const authorId = useId();
  return (
    <article className={className ? `x-post ${className}` : "x-post"} aria-labelledby={authorId} aria-busy={loading || undefined}>
      <header className="x-post-head">
        {avatar != null && <span className="x-post-lead">{loading ? <Skeleton shape="circle" width={36} /> : avatar}</span>}
        <div className="x-post-author" id={authorId}>
          <span className="x-post-name">{loading ? <Skeleton shape="text" width="8em" /> : author}</span>
          {meta != null && <span className="x-post-meta">{loading ? <Skeleton shape="text" width="6em" /> : meta}</span>}
        </div>
        {!loading && menu}
      </header>
      {loading ? (
        <p className="x-post-text"><Skeleton shape="text" width="92%" /><Skeleton shape="text" width="64%" /></p>
      ) : (
        children != null && <p className="x-post-text">{children}</p>
      )}
      {media != null && !loading && <div className="x-post-media" data-ratio={mediaRatio === "wide" ? undefined : mediaRatio}>{media}</div>}
      {actions.length > 0 && (
        <footer className="x-post-actions">
          {actions.map((action) => (
            <button
              key={action.id}
              className="x-post-action"
              type="button"
              data-action={action.id}
              data-end={action.end ? "" : undefined}
              aria-pressed={action.pressed}
              aria-label={action.count != null && !loading ? `${action.label}, ${action.count}` : action.label}
              disabled={loading}
              onClick={action.onPress}
            >
              {action.icon}
              {action.count != null && (loading ? <Skeleton shape="text" width="1.5em" /> : <span>{action.count}</span>)}
            </button>
          ))}
        </footer>
      )}
    </article>
  );
}
