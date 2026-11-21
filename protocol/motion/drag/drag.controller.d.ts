export type DragOptions = {
  axis?: "x" | "y";
  snap?: number[];
  dismiss?: "start" | "end" | "both";
  handle?: Element | null;
  /** The offset it rests at to begin with. */
  start?: number;
};
export function bindDrag(el: HTMLElement, options?: DragOptions): { moveTo: (offset: number) => void; destroy: () => void };
export function initDrags(root?: ParentNode): () => void;
