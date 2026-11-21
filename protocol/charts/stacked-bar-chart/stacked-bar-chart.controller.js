import { chartAxes, chartFrame, compact, glide, niceScale, readChartTable, seriesColor, svg } from "../../core/chart.js";

/** A stack is a slim column, never thicker than this; its parts are parted by a gap in the surface color. */
const THICK = 12;
const GAP = 2;

/** A part of a stack from `y0` up to `y1`; the topmost part of a stack gets the round cap. */
function partPath(x, width, y0, y1, cap) {
  const r = cap ? Math.min(width / 2, Math.max(0, y0 - y1)) : 0;
  return `M${x} ${y0}V${y1 + r}Q${x} ${y1} ${x + r} ${y1}H${x + width - r}Q${x + width} ${y1} ${x + width} ${y1 + r}V${y0}Z`;
}

/**
 * Stacked bar chart: draws the figure's data table as one column per category, its series stacked on each other,
 * so both the total and what it is made of can be read. Values are amounts: none below zero.
 *
 * Pointing at a category, or moving to it with the arrow keys, shows every part and the total. A press on a
 * legend entry takes that series out of the stacks.
 *
 * @param {HTMLElement} figure
 * @param {{ format?: (value: number) => string }} [options]
 * @returns {() => void} cleanup
 */
export function bindStackedBarChart(figure, { format = compact } = {}) {
  const data = readChartTable(figure);
  if (!data.series.length || !data.labels.length) return () => {};
  const last = data.labels.length - 1;

  return chartFrame(figure, ({ svg: root, width, height, tip, off }) => {
    const shown = data.series.map((_, s) => s).filter((s) => !off.has(s));
    const totals = data.labels.map((_, i) => shown.reduce((sum, s) => sum + Math.max(0, data.series[s].values[i]), 0));
    const scale = niceScale(0, Math.max(1, ...totals));
    const plot = chartAxes(root, { width, height, scale, labels: data.labels, format, band: true });
    const thick = Math.max(2, Math.min(THICK, plot.slot * 0.6));
    const band = svg("rect", { class: "x-stacked-bar-chart-band", y: plot.top, height: plot.bottom - plot.top, width: Math.max(thick + 16, plot.slot - 8), rx: 8, visibility: "hidden" }, root);
    const columns = data.labels.map((_, i) => {
      const column = svg("g", { class: "x-stacked-bar-chart-stack" }, root);
      let sum = 0;
      shown.forEach((s, k) => {
        const value = Math.max(0, data.series[s].values[i]);
        if (!value) return;
        const from = plot.y(sum) - (sum ? GAP / 2 : 0);
        sum += value;
        const top = shown.slice(k + 1).every((later) => !(data.series[later].values[i] > 0));
        const part = svg("path", { class: "x-stacked-bar-chart-part", d: partPath(plot.x(i) - thick / 2, thick, from, Math.min(from, plot.y(sum) + (top ? 0 : GAP / 2)), top) }, column);
        part.style.setProperty("--x-chart-color", seriesColor(s));
      });
      return column;
    });

    let index = -1;
    const show = (next) => {
      if (!shown.length) return;
      const fresh = index < 0;
      index = Math.max(0, Math.min(last, next));
      root.setAttribute("data-active", "");
      columns.forEach((column, i) => column.toggleAttribute("data-active", i === index));
      glide(band, plot.x(index) - Number(band.getAttribute("width")) / 2, 0, fresh);
      band.setAttribute("visibility", "visible");
      // Listed from the top of the stack down, as the eye meets them; then the total.
      const rows = [...shown].reverse().map((s) => ({ name: data.series[s].name, value: format(data.series[s].values[index]), color: seriesColor(s) }));
      tip.show(plot.x(index) + thick / 2 + 6, plot.y(totals[index]), data.labels[index], shown.length > 1 ? [...rows, { name: "Total", value: format(totals[index]) }] : rows);
    };
    const hide = () => { index = -1; root.removeAttribute("data-active"); columns.forEach((column) => column.removeAttribute("data-active")); band.setAttribute("visibility", "hidden"); tip.hide(); };
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
  }, { legend: data.series.map((series) => series.name), height: Number(figure.dataset.height) || 220 });
}

/** Draws every .x-stacked-bar-chart under root. @param {ParentNode} [root] @returns {() => void} cleanup */
export function initStackedBarCharts(root = document) {
  const cleanups = [...root.querySelectorAll(".x-stacked-bar-chart")].map((figure) => bindStackedBarChart(/** @type {HTMLElement} */ (figure)));
  return () => cleanups.forEach((fn) => fn());
}
