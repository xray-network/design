import { chartAxes, chartFrame, compact, glide, niceScale, readChartTable, seriesColor, svg } from "../../core/chart.js";

/**
 * Line chart: draws the figure's data table as one line per series, with a crosshair readout.
 *
 *   <figure class="x-chart x-line-chart" data-area> <table class="x-chart-data">…</table> </figure>
 *
 * data-area fills under the lines with a wash (and starts the axis at zero); data-height sets the plot's height
 * in px (220 by default). The pointer, or the arrow keys when the plot has the focus, moves a crosshair to the
 * nearest category and shows every series' value there. A press on a legend entry takes that series off the
 * chart, and the axis fits what is left.
 *
 * @param {HTMLElement} figure
 * @param {{ format?: (value: number) => string }} [options]  format: how a value is written on the axis and in the readout
 * @returns {() => void} cleanup
 */
export function bindLineChart(figure, { format = compact } = {}) {
  const data = readChartTable(figure);
  if (!data.series.length || !data.labels.length) return () => {};
  const area = figure.hasAttribute("data-area");
  const last = data.labels.length - 1;

  return chartFrame(figure, ({ svg: root, width, height, tip, off }) => {
    // The series that are on. With every one off, the axis keeps the range of them all and nothing is drawn.
    const shown = data.series.map((_, s) => s).filter((s) => !off.has(s));
    const values = (shown.length ? shown : data.series.map((_, s) => s)).flatMap((s) => data.series[s].values);
    const low = Math.min(...values);
    const scale = niceScale(area ? Math.min(0, low) : low, Math.max(...values));
    const plot = chartAxes(root, { width, height, scale, labels: data.labels, format });
    const point = (series, i) => `${plot.x(i).toFixed(1)} ${plot.y(series.values[i]).toFixed(1)}`;
    for (const s of shown) {
      const series = data.series[s];
      const group = svg("g", { class: "x-line-chart-series" }, root);
      group.style.setProperty("--x-chart-color", seriesColor(s));
      const line = `M${series.values.map((_, i) => point(series, i)).join("L")}`;
      if (area) svg("path", { class: "x-line-chart-area", d: `${line}L${plot.x(last)} ${plot.y(scale.min)}L${plot.x(0)} ${plot.y(scale.min)}Z` }, group);
      svg("path", { class: "x-line-chart-line", d: line }, group);
      // The end of each line is marked: where the series is now.
      svg("circle", { class: "x-line-chart-dot", cx: plot.x(last), cy: plot.y(series.values[last]), r: 4 }, group);
    }

    // The readout: a crosshair on the nearest category, a dot on every line there, and every series' value.
    const cursor = svg("line", { class: "x-chart-cursor", y1: plot.top, y2: plot.bottom, visibility: "hidden" }, root);
    const dots = shown.map((s) => {
      const dot = svg("circle", { class: "x-line-chart-dot", r: 4, visibility: "hidden", "data-readout": "" }, root);
      dot.style.setProperty("--x-chart-color", seriesColor(s));
      return dot;
    });
    let index = -1;
    const show = (next) => {
      if (!shown.length) return;
      const fresh = index < 0; // it appears in place, then glides from category to category
      index = Math.max(0, Math.min(last, next));
      glide(cursor, plot.x(index), 0, fresh);
      cursor.setAttribute("visibility", "visible");
      dots.forEach((dot, k) => { glide(dot, plot.x(index), plot.y(data.series[shown[k]].values[index]), fresh); dot.setAttribute("visibility", "visible"); });
      tip.show(plot.x(index), plot.top + (plot.bottom - plot.top) / 2, data.labels[index], shown.map((s) => ({ name: data.series.length > 1 ? data.series[s].name : "", value: format(data.series[s].values[index]), color: seriesColor(s) })));
    };
    const hide = () => { index = -1; cursor.setAttribute("visibility", "hidden"); dots.forEach((dot) => dot.setAttribute("visibility", "hidden")); tip.hide(); };
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

/**
 * Draws every .x-line-chart under root.
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initLineCharts(root = document) {
  const cleanups = [...root.querySelectorAll(".x-line-chart")].map((figure) => bindLineChart(/** @type {HTMLElement} */ (figure)));
  return () => cleanups.forEach((fn) => fn());
}
