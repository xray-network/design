export type ReorderDetail = { id: string; from: number; to: number; order: string[] };
export function bindReorder(list: HTMLElement, options?: { restore?: boolean }): () => void;
export function initReorders(root?: ParentNode): () => void;
