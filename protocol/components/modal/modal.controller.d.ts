export function initDialogs(root?: Document | HTMLElement): () => void;
export function isBackdropClick(dialog: HTMLDialogElement, event: MouseEvent): boolean;
export function trackScrollbar(): () => void;
export function lockScroll(): void;
export function unlockScroll(): void;
