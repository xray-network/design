export type ChartData = { labels: string[]; series: { name: string; values: number[]; texts?: string[] }[] };
export type ChartTip = { show: (x: number, y: number, title: string, rows: { name?: string; value: string; color?: string }[]) => void; hide: () => void };
export type ChartArea = { left: number; right: number; top: number; bottom: number; x: (index: number) => number; y: (value: number) => number; slot: number };

export const SERIES: number;
export function seriesColor(index: number): string;
export function glide(el: SVGElement | HTMLElement, x: number, y: number, fresh?: boolean): void;
export function svg(tag: string, attrs?: Record<string, string | number>, parent?: Element): SVGElement;
export function niceScale(min: number, max: number, count?: number): { min: number; max: number; ticks: number[] };
export function compact(value: number, locale?: string): string;
export function readChartTable(figure: Element): ChartData;
export function chartFrame(
  figure: HTMLElement,
  draw: (plot: { svg: SVGSVGElement; width: number; height: number; tip: ChartTip; off: Set<number>; relabel: (index: number, text: string) => void }) => void,
  options?: { height?: number; legend?: string[]; colors?: string[] },
): () => void;
export function chartAxes(
  root: SVGSVGElement,
  options: { width: number; height: number; scale: { min: number; max: number; ticks: number[] }; labels: string[]; format?: (value: number) => string; band?: boolean },
): ChartArea;
