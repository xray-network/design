"use client";

import { useEffect, useRef } from "react";
import { createMessenger, type MessageOptions, type Messenger } from "./message.controller.js";
import "../button/button.css";
import "./message.css";

export type { MessageOptions };

export type MessagePosition = "top" | "bottom";
const instances: Partial<Record<MessagePosition, Messenger>> = {};
const pending: (MessageOptions & { position?: MessagePosition })[] = [];

/**
 * Mount once near the root of the app. The same controller as the HTML version manages the
 * messages inside this region; React renders only the empty region.
 */
export function Messages({ max = 4, position = "top" }: { max?: number; position?: MessagePosition }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const messenger = createMessenger({ region: ref.current, max, position });
    instances[position] = messenger;
    pending.splice(0).forEach((options) => message(options));
    return () => {
      messenger.destroy();
      if (instances[position] === messenger) delete instances[position];
    };
  }, [max, position]);

  return <section ref={ref} className="x-messages" popover="manual" aria-live="polite" aria-label="Messages" data-position={position === "bottom" ? "bottom" : undefined} />;
}

/**
 * Show a message from anywhere (event handlers, effects, outside React). Text only.
 * `position` picks the Messages region at that corner (top right by default); without one there, any mounted region.
 */
export function message(options: MessageOptions & { position?: MessagePosition }) {
  const { position = "top", ...rest } = options;
  const target = instances[position] ?? instances.top ?? instances.bottom;
  if (target) return target.message(rest);
  pending.push(options); // shown when a <Messages /> mounts
  return { dismiss: () => {} };
}
