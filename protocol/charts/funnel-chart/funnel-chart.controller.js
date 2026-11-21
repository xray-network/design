import { compact, readChartTable } from "../../core/chart.js";

/**
 * Funnel chart: draws the first series of the figure's data table as the steps of one path, each a centered bar as
 * wide as its share of the first step, with its value and how much of the step before it came through.
 *
 * @param {HTMLElement} figure
 * @param {{ format?: (value: number) => string }} [options]
 * @returns {() => void} cleanup
 */
export function bindFunnelChart(figure, { format = compact } = {}) {
  const data = readChartTable(figure);
  const values = data.series[0]?.values ?? [];
  if (!values.length) return () => {};
  const first = values[0] || 1;
  figure.querySelector(":scope > .x-chart-plot")?.remove();
  const list = figure.appendChild(document.createElement("ol"));
  list.className = "x-chart-plot x-funnel-chart-steps";
  list.setAttribute("aria-hidden", "true");
  data.labels.forEach((label, i) => {
    const step = list.appendChild(document.createElement("li"));
    step.className = "x-funnel-chart-step";
    const name = step.appendChild(document.createElement("span"));
    name.className = "x-funnel-chart-name";
    name.textContent = label;
    const track = step.appendChild(document.createElement("span"));
    track.className = "x-funnel-chart-track";
    const bar = track.appendChild(document.createElement("span"));
    bar.className = "x-funnel-chart-bar";
    bar.style.width = `${Math.max(0, Math.min(100, (values[i] / first) * 100))}%`;
    const value = step.appendChild(document.createElement("span"));
    value.className = "x-funnel-chart-value";
    value.textContent = format(values[i]);
    const rate = step.appendChild(document.createElement("span"));
    rate.className = "x-funnel-chart-rate";
    // The first step is the whole; each later one says what share of the step before it came through.
    rate.textContent = i ? `${Math.round((values[i] / (values[i - 1] || 1)) * 100)}%` : "";
  });
  figure.setAttribute("data-drawn", "");
  return () => { list.remove(); figure.removeAttribute("data-drawn"); };
}

/** Draws every .x-funnel-chart under root. @param {ParentNode} [root] @returns {() => void} cleanup */
export function initFunnelCharts(root = document) {
  const cleanups = [...root.querySelectorAll(".x-funnel-chart")].map((figure) => bindFunnelChart(/** @type {HTMLElement} */ (figure)));
  return () => cleanups.forEach((fn) => fn());
}
