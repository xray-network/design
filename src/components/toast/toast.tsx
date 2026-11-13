"use client";

import { useEffect, useRef } from "react";
import { createToaster, type Toaster as ToasterApi, type ToastOptions } from "./toast.controller.js";
import "../button/button.css";
import "./toast.css";

export type { ToastOptions };

let instance: ToasterApi | null = null;
const pending: [string, ToastOptions | undefined][] = [];

/**
 * Mount once near the root of the app. The same controller as the HTML version manages the
 * toasts inside this region; React renders only the empty region.
 */
export function Toaster({ max = 3 }: { max?: number }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const toaster = createToaster({ region: ref.current, max });
    instance = toaster;
    pending.splice(0).forEach(([message, options]) => toaster.toast(message, options));
    return () => {
      toaster.destroy();
      if (instance === toaster) instance = null;
    };
  }, [max]);

  return <section ref={ref} className="x-toaster" popover="manual" aria-live="polite" aria-label="Notifications" />;
}

/** Show a toast from anywhere (event handlers, effects, outside React). Text only. */
export function toast(message: string, options?: ToastOptions) {
  if (instance) return instance.toast(message, options);
  pending.push([message, options]); // shown when <Toaster /> mounts
  return { dismiss: () => {} };
}
