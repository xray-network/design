import { compact, readChartTable } from "../../core/chart.js";

/**
 * Bar list: draws the first series of the figure's data table as rows, one per category. A row is a line of text,
 * the name and its value, over a slim bar as long as the value: it reads as a list first, and the bars rank it at
 * a glance. The rows keep the table's order: sort the data, not the chart.
 *
 * @param {HTMLElement} figure
 * @param {{ format?: (value: number) => string }} [options]
 * @returns {() => void} cleanup
 */
export function bindBarList(figure, { format = compact } = {}) {
  const data = readChartTable(figure);
  const values = data.series[0]?.values ?? [];
  if (!values.length) return () => {};
  const max = Math.max(...values, 0) || 1;
  figure.querySelector(":scope > .x-chart-plot")?.remove();
  const list = figure.appendChild(document.createElement("ol"));
  list.className = "x-chart-plot x-bar-list-rows";
  list.setAttribute("aria-hidden", "true"); // the table says the same to assistive technology
  data.labels.forEach((label, i) => {
    const row = list.appendChild(document.createElement("li"));
    row.className = "x-bar-list-row";
    const name = row.appendChild(document.createElement("span"));
    name.className = "x-bar-list-name";
    name.textContent = label;
    const value = row.appendChild(document.createElement("span"));
    value.className = "x-bar-list-value";
    value.textContent = format(values[i]);
    // The track is the whole scale, so a short bar still reads as a share of something. A zero has no bar.
    const track = row.appendChild(document.createElement("span"));
    track.className = "x-bar-list-track";
    if (values[i] > 0) {
      const bar = track.appendChild(document.createElement("span"));
      bar.className = "x-bar-list-bar";
      bar.style.width = `${(values[i] / max) * 100}%`;
    }
  });
  figure.setAttribute("data-drawn", "");
  return () => { list.remove(); figure.removeAttribute("data-drawn"); };
}

/** Draws every .x-bar-list under root. @param {ParentNode} [root] @returns {() => void} cleanup */
export function initBarLists(root = document) {
  const cleanups = [...root.querySelectorAll(".x-bar-list")].map((figure) => bindBarList(/** @type {HTMLElement} */ (figure)));
  return () => cleanups.forEach((fn) => fn());
}
