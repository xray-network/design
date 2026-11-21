export function bindTreemap(figure: HTMLElement, options?: { format?: (value: number) => string }): () => void;
export function initTreemaps(root?: ParentNode): () => void;
export function treemapLayout(values: number[], width: number, height: number): { index: number; x: number; y: number; w: number; h: number }[];
