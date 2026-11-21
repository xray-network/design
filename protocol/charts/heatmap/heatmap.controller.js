import { chartFrame, compact, readChartTable, svg } from "../../core/chart.js";

const GAP = 2;
const LABELS = 18; // the row of column names under the grid

/**
 * Heatmap: draws the figure's data table as a grid of cells, one per value: the table's rows down the side, its
 * columns along the bottom. A cell is filled with one color, lighter for less and stronger for more, so where
 * the amounts gather shows at a glance. Exact values are in the readout and the table.
 *
 * Pointing at a cell, or moving to it with the arrow keys when the plot has the focus, shows its row, its column
 * and its value.
 *
 * @param {HTMLElement} figure
 * @param {{ format?: (value: number) => string }} [options]
 * @returns {() => void} cleanup
 */
export function bindHeatmap(figure, { format = compact } = {}) {
  const data = readChartTable(figure);
  const rows = data.labels.length, columns = data.series.length;
  if (!rows || !columns) return () => {};
  const values = data.series.flatMap((series) => series.values);
  const low = Math.min(...values), span = Math.max(...values) - low || 1;
  const side = Math.max(...data.labels.map((label) => label.length)) * 6.5 + 10;
  const cell = Number(figure.dataset.cell) || 24;

  return chartFrame(figure, ({ svg: root, width, tip }) => {
    const w = (width - side - GAP * (columns - 1)) / columns;
    const at = (row, column) => ({ x: side + column * (w + GAP), y: row * (cell + GAP) });
    data.labels.forEach((label, row) => svg("text", { class: "x-chart-tick", x: side - 8, y: at(row, 0).y + cell / 2, "text-anchor": "end", "dominant-baseline": "middle" }, root).textContent = label);
    // Column names are thinned to what fits side by side.
    const every = Math.max(1, Math.ceil((Math.max(...data.series.map((series) => series.name.length)) * 6.5 + 8) / (w + GAP)));
    data.series.forEach((series, column) => { if (column % every === 0) svg("text", { class: "x-chart-tick", x: at(0, column).x + w / 2, y: rows * (cell + GAP) + 12, "text-anchor": "middle" }, root).textContent = series.name; });
    const cells = data.labels.map((_, row) => data.series.map((series, column) => {
      const mark = svg("rect", { class: "x-heatmap-cell", x: at(row, column).x.toFixed(2), y: at(row, column).y, width: Math.max(1, w).toFixed(2), height: cell, rx: 3 }, root);
      // From a faint tint to the full color: one hue, so strength alone carries the amount.
      mark.style.setProperty("--x-heatmap-level", `${Math.round(8 + ((series.values[row] - low) / span) * 92)}%`);
      mark.onpointerenter = () => show(row, column);
      return mark;
    }));

    let focus = null;
    const show = (row, column) => {
      focus = { row: Math.max(0, Math.min(rows - 1, row)), column: Math.max(0, Math.min(columns - 1, column)) };
      cells.flat().forEach((mark) => mark.removeAttribute("data-active"));
      cells[focus.row][focus.column].setAttribute("data-active", "");
      const point = at(focus.row, focus.column);
      tip.show(point.x + w, point.y + cell / 2, `${data.labels[focus.row]}, ${data.series[focus.column].name}`, [{ value: format(data.series[focus.column].values[focus.row]) }]);
    };
    const hide = () => { focus = null; cells.flat().forEach((mark) => mark.removeAttribute("data-active")); tip.hide(); };
    const holder = root.parentElement;
    holder.tabIndex = 0;
    holder.onpointerleave = hide;
    holder.onblur = hide;
    holder.onkeydown = (event) => {
      const step = { ArrowRight: [0, 1], ArrowLeft: [0, -1], ArrowDown: [1, 0], ArrowUp: [-1, 0] }[event.key];
      if (step) { event.preventDefault(); show((focus?.row ?? 0) + (focus ? step[0] : 0), (focus?.column ?? 0) + (focus ? step[1] : 0)); }
      if (event.key === "Escape") hide();
    };
  }, { height: rows * (cell + GAP) + LABELS });
}

/** Draws every .x-heatmap under root. @param {ParentNode} [root] @returns {() => void} cleanup */
export function initHeatmaps(root = document) {
  const cleanups = [...root.querySelectorAll(".x-heatmap")].map((figure) => bindHeatmap(/** @type {HTMLElement} */ (figure)));
  return () => cleanups.forEach((fn) => fn());
}
