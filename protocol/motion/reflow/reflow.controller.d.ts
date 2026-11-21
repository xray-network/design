export function createReflow(container: HTMLElement): { measure: () => void; play: () => void };
export function reflow(container: HTMLElement, change: () => void): void;
