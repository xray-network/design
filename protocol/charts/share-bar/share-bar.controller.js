import { SERIES, chartFrame, compact, readChartTable, seriesColor, svg } from "../../core/chart.js";

/** The bar's thickness and the gap, in the surface color, between its parts. */
const THICK = 10;
const GAP = 2;

/**
 * Share bar: draws the first series of the figure's data table as one thin bar split into its parts, each as wide
 * as its share, with the parts named in the legend. Past five parts the rest are folded into "Other".
 *
 * @param {HTMLElement} figure
 * @param {{ format?: (value: number) => string }} [options]
 * @returns {() => void} cleanup
 */
export function bindShareBar(figure, { format = compact } = {}) {
  const data = readChartTable(figure);
  const rows = data.labels.map((name, i) => ({ name, value: Math.max(0, data.series[0]?.values[i] ?? 0) })).filter((row) => row.value > 0);
  if (!rows.length) return () => {};
  const parts = rows.length > SERIES ? [...rows.slice(0, SERIES - 1), { name: "Other", value: rows.slice(SERIES - 1).reduce((sum, row) => sum + row.value, 0), other: true }] : rows;
  const color = (i) => (parts[i].other ? seriesColor(SERIES) : seriesColor(i));
  const percent = (share) => `${(share * 100).toFixed(share < 0.1 ? 1 : 0)}%`;

  return chartFrame(figure, ({ svg: root, width, tip, off, relabel }) => {
    const shown = parts.map((_, i) => i).filter((i) => !off.has(i));
    const whole = shown.reduce((sum, i) => sum + parts[i].value, 0);
    parts.forEach((part, i) => relabel(i, off.has(i) || !whole ? part.name : `${part.name} ${percent(part.value / whole)}`));
    const room = width - GAP * Math.max(0, shown.length - 1);
    let x = 0;
    const marks = shown.map((i) => {
      const w = whole ? (parts[i].value / whole) * room : 0;
      const mark = svg("rect", { class: "x-share-bar-part", x: x.toFixed(2), y: 0, width: Math.max(0, w).toFixed(2), height: THICK, rx: 3 }, root);
      mark.style.setProperty("--x-chart-color", color(i));
      mark.onpointerenter = () => {
        root.setAttribute("data-active", "");
        marks.forEach((other) => other.mark.toggleAttribute("data-active", other.mark === mark));
        tip.show(Number(mark.getAttribute("x")) + w / 2, THICK + 36, parts[i].name, [{ value: format(parts[i].value), name: percent(parts[i].value / whole), color: color(i) }]);
      };
      x += w + GAP;
      return { mark };
    });
    root.parentElement.onpointerleave = () => { root.removeAttribute("data-active"); marks.forEach(({ mark }) => mark.removeAttribute("data-active")); tip.hide(); };
  }, { legend: parts.map((part) => part.name), colors: parts.map((_, i) => color(i)), height: THICK });
}

/** Draws every .x-share-bar under root. @param {ParentNode} [root] @returns {() => void} cleanup */
export function initShareBars(root = document) {
  const cleanups = [...root.querySelectorAll(".x-share-bar")].map((figure) => bindShareBar(/** @type {HTMLElement} */ (figure)));
  return () => cleanups.forEach((fn) => fn());
}
