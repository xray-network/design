export function bindDonutChart(figure: HTMLElement, options?: { format?: (value: number) => string }): () => void;
export function initDonutCharts(root?: ParentNode): () => void;
export function donutParts(data: { labels: string[]; series: { values: number[] }[] }): { name: string; value: number; share: number; other?: boolean }[];
