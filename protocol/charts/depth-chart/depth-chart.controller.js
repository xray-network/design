import { chartAxes, chartFrame, compact, glide, niceScale, readChartTable, svg } from "../../core/chart.js";

/**
 * Depth chart: draws an order book. The figure's data table lists prices from low to high, with two columns
 * after the price: the total size of the bids at or above it, and of the asks at or below it (a cell is 0 on the
 * side that has no orders at that price). Each side is a stepped area, bids falling toward the middle and asks
 * rising away from it; the gap between them is the spread.
 *
 * The crosshair reads the nearest price and the depth on its side. The two sides are named in the legend and the
 * readout, never told by color alone.
 *
 * @param {HTMLElement} figure
 * @param {{ format?: (value: number) => string }} [options]
 * @returns {() => void} cleanup
 */
export function bindDepthChart(figure, { format = compact } = {}) {
  const data = readChartTable(figure);
  if (data.series.length < 2 || !data.labels.length) return () => {};
  const last = data.labels.length - 1;
  const scale = niceScale(0, Math.max(1, ...data.series.flatMap((series) => series.values)));

  return chartFrame(figure, ({ svg: root, width, height, tip, off }) => {
    const plot = chartAxes(root, { width, height, scale, labels: data.labels, format });
    data.series.slice(0, 2).forEach((series, s) => {
      if (off.has(s)) return;
      // Only the prices this side has orders at; steps, because depth changes at a price and not between prices.
      const points = series.values.map((value, i) => ({ i, value })).filter((point) => point.value > 0);
      if (!points.length) return;
      let line = `M${plot.x(points[0].i).toFixed(1)} ${plot.y(points[0].value).toFixed(1)}`;
      for (let k = 1; k < points.length; k++) line += s === 0 ? `H${plot.x(points[k].i).toFixed(1)}V${plot.y(points[k].value).toFixed(1)}` : `V${plot.y(points[k].value).toFixed(1)}H${plot.x(points[k].i).toFixed(1)}`;
      const side = svg("g", { class: "x-depth-chart-side", "data-side": s === 0 ? "bids" : "asks" }, root);
      svg("path", { class: "x-depth-chart-area", d: `${line}V${plot.y(0)}H${plot.x(points[0].i).toFixed(1)}Z` }, side);
      svg("path", { class: "x-depth-chart-line", d: line }, side);
    });

    const cursor = svg("line", { class: "x-chart-cursor", y1: plot.top, y2: plot.bottom, visibility: "hidden" }, root);
    let index = -1;
    const show = (next) => {
      const fresh = index < 0;
      index = Math.max(0, Math.min(last, next));
      glide(cursor, plot.x(index), 0, fresh);
      cursor.setAttribute("visibility", "visible");
      const rows = data.series.slice(0, 2).map((series, s) => ({ series, s })).filter(({ series, s }) => !off.has(s) && series.values[index] > 0).map(({ series }) => ({ name: series.name, value: format(series.values[index]) }));
      tip.show(plot.x(index), plot.top + (plot.bottom - plot.top) / 2, data.labels[index], rows.length ? rows : [{ value: "No orders" }]);
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
      if (event.key === "Escape") hide();
    };
  }, { legend: data.series.slice(0, 2).map((series) => series.name), colors: ["var(--x-success)", "var(--x-danger)"], height: Number(figure.dataset.height) || 200 });
}

/** Draws every .x-depth-chart under root. @param {ParentNode} [root] @returns {() => void} cleanup */
export function initDepthCharts(root = document) {
  const cleanups = [...root.querySelectorAll(".x-depth-chart")].map((figure) => bindDepthChart(/** @type {HTMLElement} */ (figure)));
  return () => cleanups.forEach((fn) => fn());
}
