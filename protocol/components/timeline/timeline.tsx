import type { ReactNode } from "react";
import "./timeline.css";

export type TimelineEvent = {
  title: ReactNode;
  /** Shown on the right. */
  time?: ReactNode;
  /** Machine-readable moment for the <time> element (ISO 8601). */
  dateTime?: string;
  text?: ReactNode;
  tone?: "neutral" | "accent" | "success" | "warning" | "danger";
  /** Has not happened yet: hollow dot, dashed line before it. Use for the last event only. */
  pending?: boolean;
};

export type TimelineProps = {
  events: TimelineEvent[];
  className?: string;
};

/** Events in order, each a dot on a line. */
export function Timeline({ events, className }: TimelineProps) {
  return (
    <ol className={className ? `x-timeline ${className}` : "x-timeline"}>
      {events.map((event, i) => (
        <li key={i} className="x-timeline-item" data-tone={event.tone && event.tone !== "neutral" ? event.tone : undefined} data-state={event.pending ? "pending" : undefined}>
          <span className="x-timeline-dot" aria-hidden="true" />
          <div className="x-timeline-content">
            <div className="x-timeline-head">
              <span className="x-timeline-title">{event.title}</span>
              {event.time != null && <time className="x-timeline-time" dateTime={event.dateTime}>{event.time}</time>}
            </div>
            {event.text != null && <p className="x-timeline-text">{event.text}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
