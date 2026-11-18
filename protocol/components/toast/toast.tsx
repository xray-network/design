"use client";

import { useEffect, useRef } from "react";
import { createToaster, type Toaster as ToasterApi, type ToastOptions } from "./toast.controller.js";
import "../button/button.css";
import "./toast.css";

export type { ToastOptions };

export type ToastPosition = "top" | "bottom";
const instances: Partial<Record<ToastPosition, ToasterApi>> = {};
const pending: [string, (ToastOptions & { position?: ToastPosition }) | undefined][] = [];

/**
 * Mount once near the root of the app. The same controller as the HTML version manages the
 * toasts inside this region; React renders only the empty region.
 */
export function Toaster({ max = 3, position = "bottom" }: { max?: number; position?: ToastPosition }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const toaster = createToaster({ region: ref.current, max, position });
    instances[position] = toaster;
    pending.splice(0).forEach(([message, options]) => toast(message, options));
    return () => {
      toaster.destroy();
      if (instances[position] === toaster) delete instances[position];
    };
  }, [max, position]);

  return <section ref={ref} className="x-toaster" popover="manual" aria-live="polite" aria-label="Notifications" data-position={position === "top" ? "top" : undefined} />;
}

/**
 * Show a toast from anywhere (event handlers, effects, outside React). Text only.
 * `position` picks the Toaster mounted at that edge (bottom by default); without one there, any mounted Toaster.
 */
export function toast(message: string, options?: ToastOptions & { position?: ToastPosition }) {
  const { position = "bottom", ...rest } = options ?? {};
  const target = instances[position] ?? instances.bottom ?? instances.top;
  if (target) return target.toast(message, rest);
  pending.push([message, options]); // shown when a <Toaster /> mounts
  return { dismiss: () => {} };
}
