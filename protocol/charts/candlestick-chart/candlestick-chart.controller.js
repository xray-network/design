import { chartAxes, chartFrame, compact, glide, niceScale, readChartTable, svg } from "../../core/chart.js";

/** A candle's body is never wider than this. */
const THICK = 8;

/**
 * Candlestick chart: draws a price over periods. The figure's data table has four columns after the period, in
 * this order: open, high, low, close. Each period is a candle: a thin wick from low to high and a body from open
 * to close, in the up color when it closed higher than it opened and the down color when it closed lower.
 *
 * Pointing at a period, or moving to it with the arrow keys, shows its four prices in words. Direction is never
 * told by color alone: the readout names it.
 *
 * @param {HTMLElement} figure
 * @param {{ format?: (value: number) => string }} [options]
 * @returns {() => void} cleanup
 */
export function bindCandlestickChart(figure, { format = compact } = {}) {
  const data = readChartTable(figure);
  if (data.series.length < 4 || !data.labels.length) return () => {};
  const [open, high, low, close] = data.series.map((series) => series.values);
  const last = data.labels.length - 1;
  const scale = niceScale(Math.min(...low), Math.max(...high));

  return chartFrame(figure, ({ svg: root, width, height, tip }) => {
    const plot = chartAxes(root, { width, height, scale, labels: data.labels, format, band: true });
    const thick = Math.max(1, Math.min(THICK, plot.slot * 0.6));
    const band = svg("rect", { class: "x-candlestick-chart-band", y: plot.top, height: plot.bottom - plot.top, width: Math.max(thick + 10, plot.slot - 4), rx: 6, visibility: "hidden" }, root);
    data.labels.forEach((_, i) => {
      const candle = svg("g", { class: "x-candlestick-chart-candle", "data-trend": close[i] >= open[i] ? "up" : "down" }, root);
      svg("line", { class: "x-candlestick-chart-wick", x1: plot.x(i), x2: plot.x(i), y1: plot.y(high[i]), y2: plot.y(low[i]) }, candle);
      const top = plot.y(Math.max(open[i], close[i]));
      // A period that closed where it opened still shows: a hairline body.
      svg("rect", { class: "x-candlestick-chart-body", x: plot.x(i) - thick / 2, y: top, width: thick, height: Math.max(1, plot.y(Math.min(open[i], close[i])) - top), rx: Math.min(1.5, thick / 2) }, candle);
    });

    let index = -1;
    const show = (next) => {
      const fresh = index < 0;
      index = Math.max(0, Math.min(last, next));
      glide(band, plot.x(index) - Number(band.getAttribute("width")) / 2, 0, fresh);
      band.setAttribute("visibility", "visible");
      const change = ((close[index] - open[index]) / (open[index] || 1)) * 100;
      tip.show(plot.x(index) + thick / 2 + 6, plot.y(high[index]), data.labels[index], [
        { name: "Open", value: format(open[index]) }, { name: "High", value: format(high[index]) }, { name: "Low", value: format(low[index]) }, { name: "Close", value: format(close[index]) },
        { name: change >= 0 ? "Up" : "Down", value: `${change >= 0 ? "+" : "−"}${Math.abs(change).toFixed(2)}%` },
      ]);
    };
    const hide = () => { index = -1; band.setAttribute("visibility", "hidden"); tip.hide(); };
    const holder = root.parentElement;
    holder.tabIndex = 0;
    holder.onpointermove = (event) => {
      const x = event.clientX - root.getBoundingClientRect().left;
      if (x < plot.left || x > plot.right) hide();
      else show(Math.floor((x - plot.left) / plot.slot));
    };
    holder.onpointerleave = hide;
    holder.onblur = hide;
    holder.onkeydown = (event) => {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
      if (step) { event.preventDefault(); show(index < 0 ? (step > 0 ? 0 : last) : index + step); }
      if (event.key === "Home") { event.preventDefault(); show(0); }
      if (event.key === "End") { event.preventDefault(); show(last); }
      if (event.key === "Escape") hide();
    };
  }, { height: Number(figure.dataset.height) || 220 });
}

/** Draws every .x-candlestick-chart under root. @param {ParentNode} [root] @returns {() => void} cleanup */
export function initCandlestickCharts(root = document) {
  const cleanups = [...root.querySelectorAll(".x-candlestick-chart")].map((figure) => bindCandlestickChart(/** @type {HTMLElement} */ (figure)));
  return () => cleanups.forEach((fn) => fn());
}
