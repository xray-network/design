import { chartFrame, compact, niceScale, readChartTable, svg } from "../../core/chart.js";

/**
 * Scatter chart: draws each row of the figure's data table as a point. The first column names the point; the
 * second and third columns are where it sits along the bottom and up the side. It answers how two measures go
 * together: whether one rises with the other, and which points stand apart.
 *
 * The readout goes to the point nearest the pointer, so a dot never has to be hit exactly; the arrow keys walk
 * through the points from left to right.
 *
 * @param {HTMLElement} figure
 * @param {{ format?: (value: number) => string }} [options]
 * @returns {() => void} cleanup
 */
export function bindScatterChart(figure, { format = compact } = {}) {
  const data = readChartTable(figure);
  if (data.series.length < 2 || !data.labels.length) return () => {};
  const [across, up] = data.series;
  const xs = niceScale(Math.min(...across.values), Math.max(...across.values));
  const ys = niceScale(Math.min(...up.values), Math.max(...up.values));
  // Walked in order along the bottom axis.
  const order = data.labels.map((_, i) => i).sort((a, b) => across.values[a] - across.values[b]);

  return chartFrame(figure, ({ svg: root, width, height, tip }) => {
    const left = Math.max(...ys.ticks.map((tick) => format(tick).length)) * 6.5 + 10;
    const area = { left, right: width - 8, top: 8, bottom: height - 40 };
    const x = (value) => area.left + ((value - xs.min) / (xs.max - xs.min)) * (area.right - area.left);
    const y = (value) => area.bottom - ((value - ys.min) / (ys.max - ys.min)) * (area.bottom - area.top);
    const grid = svg("g", { class: "x-chart-grid" }, root);
    for (const tick of ys.ticks) {
      svg("line", { x1: area.left, x2: area.right, y1: y(tick), y2: y(tick) }, grid);
      svg("text", { class: "x-chart-tick", x: area.left - 8, y: y(tick), "text-anchor": "end", "dominant-baseline": "middle" }, root).textContent = format(tick);
    }
    xs.ticks.forEach((tick, i) => svg("text", { class: "x-chart-tick", x: x(tick), y: area.bottom + 16, "text-anchor": i === 0 ? "start" : i === xs.ticks.length - 1 ? "end" : "middle" }, root).textContent = format(tick));
    // Both axes are named: without the names the picture says nothing.
    svg("text", { class: "x-chart-tick x-scatter-chart-axis", x: area.right, y: height - 4, "text-anchor": "end" }, root).textContent = `${across.name} →`;
    svg("text", { class: "x-chart-tick x-scatter-chart-axis", x: area.left, y: area.top, "dominant-baseline": "hanging" }, root).textContent = `↑ ${up.name}`;
    const dots = data.labels.map((_, i) => svg("circle", { class: "x-scatter-chart-dot", cx: x(across.values[i]).toFixed(1), cy: y(up.values[i]).toFixed(1), r: 4 }, root));

    let index = -1;
    const show = (i) => {
      index = i;
      dots.forEach((dot, k) => dot.toggleAttribute("data-active", k === i));
      root.setAttribute("data-active", "");
      tip.show(x(across.values[i]), y(up.values[i]), data.labels[i], [{ name: across.name, value: format(across.values[i]) }, { name: up.name, value: format(up.values[i]) }]);
    };
    const hide = () => { index = -1; root.removeAttribute("data-active"); dots.forEach((dot) => dot.removeAttribute("data-active")); tip.hide(); };
    const holder = root.parentElement;
    holder.tabIndex = 0;
    holder.onpointermove = (event) => {
      const box = root.getBoundingClientRect();
      const px = event.clientX - box.left, py = event.clientY - box.top;
      let best = -1, distance = Infinity;
      data.labels.forEach((_, i) => { const d = Math.hypot(x(across.values[i]) - px, y(up.values[i]) - py); if (d < distance) { distance = d; best = i; } });
      if (best !== index) show(best);
    };
    holder.onpointerleave = hide;
    holder.onblur = hide;
    holder.onkeydown = (event) => {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
      if (step) { event.preventDefault(); const at = order.indexOf(index); show(order[Math.max(0, Math.min(order.length - 1, at < 0 ? (step > 0 ? 0 : order.length - 1) : at + step))]); }
      if (event.key === "Escape") hide();
    };
  }, { height: Number(figure.dataset.height) || 240 });
}

/** Draws every .x-scatter-chart under root. @param {ParentNode} [root] @returns {() => void} cleanup */
export function initScatterCharts(root = document) {
  const cleanups = [...root.querySelectorAll(".x-scatter-chart")].map((figure) => bindScatterChart(/** @type {HTMLElement} */ (figure)));
  return () => cleanups.forEach((fn) => fn());
}
