import { chartFrame, readChartTable, svg } from "../../core/chart.js";

/** The words a cell may hold, and the state each one draws. Anything else is "none": no data for that period. */
const STATES = { ok: "ok", up: "ok", operational: "ok", degraded: "degraded", slow: "degraded", down: "down", outage: "down" };
const HEIGHT = 28;
const GAP = 2;

/**
 * Status strip: draws the first series of the figure's data table as a row of thin bars, one per period, colored
 * by the state its cell names (ok, degraded, down; anything else is no data). Pointing at a bar says its period
 * and its state in words.
 *
 * @param {HTMLElement} figure
 * @returns {() => void} cleanup
 */
export function bindStatusStrip(figure) {
  const data = readChartTable(figure);
  const cells = data.series[0]?.texts ?? [];
  if (!cells.length) return () => {};
  const states = cells.map((text) => STATES[text.toLowerCase()] ?? "none");

  return chartFrame(figure, ({ svg: root, width, tip }) => {
    const w = Math.max(1, (width - GAP * (states.length - 1)) / states.length);
    const bars = states.map((state, i) => {
      const bar = svg("rect", { class: "x-status-strip-bar", x: (i * (w + GAP)).toFixed(2), y: 0, width: w.toFixed(2), height: HEIGHT, rx: Math.min(2, w / 2), "data-state": state }, root);
      bar.onpointerenter = () => {
        bars.forEach((other) => other.toggleAttribute("data-active", other === bar));
        tip.show(i * (w + GAP) + w / 2, HEIGHT + 30, data.labels[i], [{ value: cells[i] || "No data" }]);
      };
      return bar;
    });
    root.parentElement.onpointerleave = () => { bars.forEach((bar) => bar.removeAttribute("data-active")); tip.hide(); };
  }, { height: HEIGHT });
}

/** Draws every .x-status-strip under root. @param {ParentNode} [root] @returns {() => void} cleanup */
export function initStatusStrips(root = document) {
  const cleanups = [...root.querySelectorAll(".x-status-strip")].map((figure) => bindStatusStrip(/** @type {HTMLElement} */ (figure)));
  return () => cleanups.forEach((fn) => fn());
}
