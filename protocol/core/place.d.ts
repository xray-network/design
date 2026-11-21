export type Side = "top" | "bottom" | "left" | "right";
export type PlaceOptions = {
  side?: Side;
  align?: "start" | "center" | "end";
  gap?: number;
  edge?: number;
  arrowInset?: number;
  flip?: boolean;
};
export type Placement = { top: number; left: number; side: Side; arrow: number; room: number };

export function viewportBox(): { left: number; top: number; right: number; bottom: number };
export function placeFloating(
  anchor: { left: number; top: number; right: number; bottom: number; width: number; height: number },
  box: { width: number; height: number },
  options?: PlaceOptions,
): Placement;
export function placeElement(el: HTMLElement, anchor: Element, options?: PlaceOptions & { matchWidth?: boolean; fitHeight?: boolean }): Placement;
export function onViewportChange(fn: () => void): () => void;
