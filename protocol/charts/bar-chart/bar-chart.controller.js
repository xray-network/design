import { chartAxes, chartFrame, compact, glide, niceScale, readChartTable, seriesColor, svg } from "../../core/chart.js";

/** A bar is a slim stroke of color, never thicker than this however wide its slot: the rest of the slot is air. */
const THICK = 10;
/** The gap, in the surface color, between the bars of one category. */
const GAP = 3;

/** A bar from the baseline `y0` to `y1`: fully rounded at the data end, square on the baseline. */
function barPath(x, width, y0, y1) {
  const r = Math.min(width / 2, Math.abs(y1 - y0));
  const s = y1 < y0 ? 1 : -1; // up from the baseline, or down from it for a negative value
  return `M${x} ${y0}V${y1 + r * s}Q${x} ${y1} ${x + r} ${y1}H${x + width - r}Q${x + width} ${y1} ${x + width} ${y1 + r * s}V${y0}Z`;
}

/**
 * Bar chart: draws the figure's data table as slim columns, grouped by category, one per series.
 *
 *   <figure class="x-chart x-bar-chart"> <table class="x-chart-data">…</table> </figure>
 *
 * The axis always includes zero. Pointing at a category, or moving to it with the arrow keys when the plot has
 * the focus, lays a soft band behind it and shows every series' value there. A press on a legend entry takes
 * that series off the chart: the others close up and keep their colors.
 *
 * @param {HTMLElement} figure
 * @param {{ format?: (value: number) => string }} [options]
 * @returns {() => void} cleanup
 */
export function bindBarChart(figure, { format = compact } = {}) {
  const data = readChartTable(figure);
  if (!data.series.length || !data.labels.length) return () => {};
  const last = data.labels.length - 1;

  return chartFrame(figure, ({ svg: root, width, height, tip, off }) => {
    const shown = data.series.map((_, s) => s).filter((s) => !off.has(s));
    const values = (shown.length ? shown : data.series.map((_, s) => s)).flatMap((s) => data.series[s].values);
    const scale = niceScale(Math.min(0, ...values), Math.max(0, ...values));
    const plot = chartAxes(root, { width, height, scale, labels: data.labels, format, band: true });
    const count = Math.max(1, shown.length);
    const thick = Math.max(2, Math.min(THICK, (plot.slot * 0.6 - GAP * (count - 1)) / count));
    const group = thick * count + GAP * (count - 1);
    // The band behind the category being read: as wide as its slot, less a little air.
    const band = svg("rect", { class: "x-bar-chart-band", y: plot.top, height: plot.bottom - plot.top, width: Math.max(group + 16, plot.slot - 8), rx: 8, visibility: "hidden" }, root);
    const columns = data.labels.map((_, i) => {
      const column = svg("g", { class: "x-bar-chart-group" }, root);
      shown.forEach((s, k) => {
        const bar = svg("path", { class: "x-bar-chart-bar", d: barPath(plot.x(i) - group / 2 + k * (thick + GAP), thick, plot.y(0), plot.y(data.series[s].values[i])) }, column);
        bar.style.setProperty("--x-chart-color", seriesColor(s));
      });
      return column;
    });

    let index = -1;
    const show = (next) => {
      if (!shown.length) return;
      const fresh = index < 0; // the band appears in place, then glides from category to category
      index = Math.max(0, Math.min(last, next));
      root.setAttribute("data-active", "");
      columns.forEach((column, i) => column.toggleAttribute("data-active", i === index));
      glide(band, plot.x(index) - Number(band.getAttribute("width")) / 2, 0, fresh);
      band.setAttribute("visibility", "visible");
      const top = Math.min(...shown.map((s) => plot.y(Math.max(0, data.series[s].values[index]))));
      tip.show(plot.x(index) + group / 2 + 4, top, data.labels[index], shown.map((s) => ({ name: data.series.length > 1 ? data.series[s].name : "", value: format(data.series[s].values[index]), color: seriesColor(s) })));
    };
    const hide = () => { index = -1; root.removeAttribute("data-active"); columns.forEach((column) => column.removeAttribute("data-active")); band.setAttribute("visibility", "hidden"); tip.hide(); };
    const holder = root.parentElement;
    holder.tabIndex = 0;
    // The whole slot of a category is its target, not only the painted bars.
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

/**
 * Draws every .x-bar-chart under root.
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initBarCharts(root = document) {
  const cleanups = [...root.querySelectorAll(".x-bar-chart")].map((figure) => bindBarChart(/** @type {HTMLElement} */ (figure)));
  return () => cleanups.forEach((fn) => fn());
}
