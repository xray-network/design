export function duration(el: Element, token?: string): number;
export function easing(el: Element, token?: string): string;
export function reduced(el: Element): boolean;
export function trackIndicator(
  root: HTMLElement,
  getActive: () => HTMLElement | null,
): { update: () => void; destroy: () => void };
export function createFlip(
  getElements: () => Iterable<Element>,
  options?: { token?: string; easingToken?: string },
): { measure: () => void; play: () => void };
export function afterTransition(el: Element, fn: () => void, token?: string): void;
export function spring(options?: {
  stiffness?: number;
  dampingRatio?: number;
  mass?: number;
  points?: number;
  precision?: number;
}): { easing: string; duration: number };
export const SPRINGS: Record<"liquid" | "soft", { stiffness: number; dampingRatio: number }>;
