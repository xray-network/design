export type ScreenDirection = "forward" | "back" | "fade";
export function screenTransition(from: HTMLElement, to: HTMLElement, options?: { direction?: ScreenDirection }): Promise<boolean>;
export function showScreen(container: HTMLElement, id: string, options?: { direction?: ScreenDirection }): Promise<void>;
export function initScreens(root?: ParentNode): () => void;
