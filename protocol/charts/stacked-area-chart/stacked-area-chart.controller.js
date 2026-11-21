import { chartAxes, chartFrame, compact, glide, niceScale, readChartTable, seriesColor, svg } from "../../core/chart.js";

/**
 * Stacked area chart: draws the figure's data table as bands laid on each other along an ordered scale, so the
 * top edge is the total and each band's thickness is its series. Values are amounts: none below zero.
 *
 * The pointer, or the arrow keys when the plot has the focus, moves a crosshair to the nearest category and shows
 * every series there and the total. A press on a legend entry takes that series out of the stack.
 *
 * @param {HTMLElement} figure
 * @param {{ format?: (value: number) => string }} [options]
 * @returns {() => void} cleanup
 */
export function bindStackedAreaChart(figure, { format = compact } = {}) {
  const data = readChartTable(figure);
  if (!data.series.length || !data.labels.length) return () => {};
  const last = data.labels.length - 1;

  return chartFrame(figure, ({ svg: root, width, height, tip, off }) => {
    const shown = data.series.map((_, s) => s).filter((s) => !off.has(s));
    // Each series' upper edge is the sum of itself and those under it.
    const edges = [];
    shown.forEach((s, k) => edges.push(data.labels.map((_, i) => (k ? edges[k - 1][i] : 0) + Math.max(0, data.series[s].values[i]))));
    const totals = edges.at(-1) ?? data.labels.map(() => 0);
    const scale = niceScale(0, Math.max(1, ...totals));
    const plot = chartAxes(root, { width, height, scale, labels: data.labels, format });
    const along = (values) => values.map((value, i) => `${plot.x(i).toFixed(1)} ${plot.y(value).toFixed(1)}`);
    shown.forEach((s, k) => {
      const band = svg("g", { class: "x-stacked-area-chart-series" }, root);
      band.style.setProperty("--x-chart-color", seriesColor(s));
      const upper = along(edges[k]);
      const lower = along(k ? edges[k - 1] : data.labels.map(() => 0)).reverse();
      svg("path", { class: "x-stacked-area-chart-band", d: `M${upper.join("L")}L${lower.join("L")}Z` }, band);
      svg("path", { class: "x-stacked-area-chart-line", d: `M${upper.join("L")}` }, band);
    });

    const cursor = svg("line", { class: "x-chart-cursor", y1: plot.top, y2: plot.bottom, visibility: "hidden" }, root);
    let index = -1;
    const show = (next) => {
      if (!shown.length) return;
      const fresh = index < 0;
      index = Math.max(0, Math.min(last, next));
      glide(cursor, plot.x(index), 0, fresh);
      cursor.setAttribute("visibility", "visible");
      const rows = [...shown].reverse().map((s) => ({ name: data.series[s].name, value: format(data.series[s].values[index]), color: seriesColor(s) }));
      tip.show(plot.x(index), plot.top + (plot.bottom - plot.top) / 2, data.labels[index], shown.length > 1 ? [...rows, { name: "Total", value: format(totals[index]) }] : rows);
    };
    const hide = () => { index = -1; cursor.setAttribute("visibility", "hidden"); tip.hide(); };
    const holder = root.parentElement;
    holder.tabIndex = 0;
    holder.onpointermove = (event) => show(Math.round((event.clientX - root.getBoundingClientRect().left - plot.left) / plot.slot));
    holder.onpointerleave = hide;
    holder.onblur = hide;
    holder.onkeydown = (event) => {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
      if (step) { event.preventDefault(); show(index < 0 ? (step > 0 ? 0 : last) : index + step); }
      if (event.key === "Home") { event.preventDefault(); show(0); }
      if (event.key === "End") { event.preventDefault(); show(last); }
      if (event.key === "Escape") hide();
    };
  }, { legend: data.series.map((series) => series.name), height: Number(figure.dataset.height) || 220 });
}

/** Draws every .x-stacked-area-chart under root. @param {ParentNode} [root] @returns {() => void} cleanup */
export function initStackedAreaCharts(root = document) {
  const cleanups = [...root.querySelectorAll(".x-stacked-area-chart")].map((figure) => bindStackedAreaChart(/** @type {HTMLElement} */ (figure)));
  return () => cleanups.forEach((fn) => fn());
}
