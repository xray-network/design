export function bindPopover(trigger: HTMLElement, panel: HTMLElement): () => void;
export function initPopovers(root?: ParentNode): () => void;
export function placeBeside(
  trigger: DOMRect,
  box: DOMRect,
  side: string,
  align?: "start" | "center",
  gap?: number,
): { top: number; left: number; side: string; arrow: number };
