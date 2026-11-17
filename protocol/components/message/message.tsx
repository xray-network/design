"use client";

import { useEffect, useRef } from "react";
import { createMessenger, type MessageOptions, type Messenger } from "./message.controller.js";
import "../button/button.css";
import "./message.css";

export type { MessageOptions };

let instance: Messenger | null = null;
const pending: MessageOptions[] = [];

/**
 * Mount once near the root of the app. The same controller as the HTML version manages the
 * messages inside this region; React renders only the empty region.
 */
export function Messages({ max = 4 }: { max?: number }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const messenger = createMessenger({ region: ref.current, max });
    instance = messenger;
    pending.splice(0).forEach((options) => messenger.message(options));
    return () => {
      messenger.destroy();
      if (instance === messenger) instance = null;
    };
  }, [max]);

  return <section ref={ref} className="x-messages" popover="manual" aria-live="polite" aria-label="Messages" />;
}

/** Show a message from anywhere (event handlers, effects, outside React). Text only. */
export function message(options: MessageOptions) {
  if (instance) return instance.message(options);
  pending.push(options); // shown when <Messages /> mounts
  return { dismiss: () => {} };
}
