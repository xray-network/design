export type ToastOptions = {
  tone?: "success" | "danger" | "info";
  /** ms before the toast leaves on its own; Infinity keeps it. Default 4000, 6000 with an action. */
  duration?: number;
  action?: { label: string; onClick: () => void };
  dismissible?: boolean;
};
export type Toaster = {
  toast: (message: string, options?: ToastOptions) => { dismiss: () => void };
  dismissAll: () => void;
  destroy: () => void;
};
export function createToaster(options?: { region?: HTMLElement; max?: number }): Toaster;
