export type MessageTone = "info" | "success" | "warning" | "danger";
export type MessageOptions = {
  title?: string;
  text?: string;
  tone?: MessageTone;
  /** ms before the message leaves on its own; Infinity keeps it. Default 6000, 10000 with an action. */
  duration?: number;
  action?: { label: string; onClick: () => void };
  dismissible?: boolean;
};
export type Messenger = {
  message: (options: MessageOptions) => { dismiss: () => void };
  dismissAll: () => void;
  destroy: () => void;
};
export const MESSAGE_ICONS: Record<MessageTone, string>;
export function createMessenger(options?: { region?: HTMLElement; max?: number; position?: "top" | "bottom" }): Messenger;
