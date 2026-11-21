/**
 * Chart helpers for the web, shared by the kit's charts. No dependencies.
 *
 * A chart is a <figure class="x-chart"> that holds its data as a <table class="x-chart-data">. The table is the
 * source of truth and the accessible view; a chart's controller reads it and draws an SVG beside it. Without
 * JavaScript the table simply shows.
 *
 *   niceScale, compact           numbers: a clean axis range with its ticks, and short number text
 *   readChartTable               the table as { labels, series: [{ name, values }] }
 *   chartFrame                   the plot: an svg kept at the figure's width, a legend and a tooltip
 *   chartAxes                    gridlines, value ticks and category labels; returns the plot area
 *   seriesColor, svg             the series colors in their fixed order, and an svg element maker
 *   glide                        moves a mark of the readout (crosshair, dot, band) to a point, travelling there
 */

const NS = "http://www.w3.org/2000/svg";
/** Six series colors, in a fixed order that keeps neighbours apart for color-blind readers. Never cycled. */
export const SERIES = 6;
/** The color of series `i` (0-based). A seventh series has no color of its own: fold it into "Other". */
export const seriesColor = (i) => (i < SERIES ? `var(--x-chart-${i + 1})` : "var(--x-fg-4)");

/** Makes an svg element with attributes, appended to `parent` when given. */
export function svg(tag, attrs = {}, parent) {
  const node = document.createElementNS(NS, tag);
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, String(value));
  parent?.append(node);
  return node;
}

/**
 * Puts a mark of the readout at a point of the plot. It travels there from where it was (the transition is in
 * the stylesheet); `fresh` places it at once, for the moment the readout appears. The data's own marks never move.
 * @param {SVGElement | HTMLElement} el  @param {number} x  @param {number} y  @param {boolean} [fresh]
 */
export function glide(el, x, y, fresh = false) {
  el.style.transition = fresh ? "none" : "";
  el.style.translate = `${x}px ${y}px`;
}

/**
 * A clean axis for [min, max]: rounded ends and about `count` round steps between them.
 * @returns {{ min: number, max: number, ticks: number[] }}
 */
export function niceScale(min, max, count = 4) {
  if (min === max) max = min + 1;
  const raw = (max - min) / count;
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  const unit = raw / magnitude;
  const step = (unit <= 1 ? 1 : unit <= 2 ? 2 : unit <= 2.5 ? 2.5 : unit <= 5 ? 5 : 10) * magnitude;
  const low = Math.floor(min / step) * step;
  const high = Math.ceil(max / step) * step;
  const ticks = [];
  for (let value = low; value <= high + step / 2; value += step) ticks.push(Number(value.toFixed(10)));
  return { min: low, max: high, ticks };
}

/** A number as short text: in full under 10,000, compact from there (12.9K, 4.2M). */
export function compact(value, locale = "en-US") {
  return new Intl.NumberFormat(locale, Math.abs(value) >= 10000 ? { notation: "compact", maximumFractionDigits: 1 } : { maximumFractionDigits: 2 }).format(value);
}

/**
 * Reads a chart's data table. The first column holds the categories; every other column is a series, named by
 * its header. A cell's number is its data-value when it has one, else its text with everything but the number
 * dropped ("$1,200" reads 1200).
 * @param {Element} figure
 * @returns {{ labels: string[], series: { name: string, values: number[], texts: string[] }[] }}  texts: the cells as
 *   written, for charts whose cells are words (a status)
 */
export function readChartTable(figure) {
  const table = figure.querySelector(".x-chart-data");
  const rows = table ? [...table.tBodies[0].rows] : [];
  const names = table?.tHead ? [...table.tHead.rows[0].cells].slice(1).map((cell) => cell.textContent.trim()) : [];
  // A written number may carry a currency, a percent sign and a real minus sign (−): only the number is kept.
  const number = (cell) => Number(cell.dataset.value ?? cell.textContent.replace(/\u2212/g, "-").replace(/[^\d.eE+-]/g, "")) || 0;
  return {
    labels: rows.map((row) => row.cells[0].textContent.trim()),
    series: names.map((name, i) => ({ name, values: rows.map((row) => number(row.cells[i + 1])), texts: rows.map((row) => row.cells[i + 1].textContent.trim()) })),
  };
}

/**
 * The plot of a chart: makes (once) the legend, the svg and the tooltip inside the figure, and calls `draw`
 * with an empty svg whenever the figure's width changes, so a chart is always drawn at its real size.
 *
 * The legend's entries are buttons: pressing one takes its series off the chart, pressing it again puts it back.
 * `draw` is told which are off and leaves them out; a series keeps its color whatever else is showing.
 *
 * @param {HTMLElement} figure
 * @param {(plot: { svg: SVGSVGElement, width: number, height: number, tip: ReturnType<typeof tooltip>, off: Set<number>, relabel: (index: number, text: string) => void }) => void} draw
 *   off: the indexes of the series switched off in the legend. relabel: changes a legend entry's text (a share that
 *   depends on what is showing).
 * @param {{ height?: number, legend?: string[], colors?: string[] }} [options]  legend: series names, shown for two
 *   or more; colors: their colors, when not simply the series colors in order
 * @returns {() => void} cleanup
 */
export function chartFrame(figure, draw, { height = 220, legend = [], colors } = {}) {
  figure.querySelector(":scope > .x-chart-legend")?.remove();
  figure.querySelector(":scope > .x-chart-plot")?.remove();
  const off = new Set();
  const entries = [];
  let drawnAt = 0;
  if (legend.length > 1) {
    const list = document.createElement("ul");
    list.className = "x-chart-legend";
    legend.forEach((name, i) => {
      const entry = list.appendChild(document.createElement("li")).appendChild(document.createElement("button"));
      entry.type = "button";
      entry.style.setProperty("--x-chart-color", colors?.[i] ?? seriesColor(i));
      entry.setAttribute("aria-pressed", "true"); // pressed: the series is on the chart
      entry.textContent = name;
      entry.addEventListener("click", () => {
        if (off.has(i)) off.delete(i); else off.add(i);
        entry.setAttribute("aria-pressed", String(!off.has(i)));
        drawnAt = 0;
        render();
      });
      entries.push(entry);
    });
    figure.append(list);
  }
  const plot = figure.appendChild(document.createElement("div"));
  plot.className = "x-chart-plot";
  const root = svg("svg", { class: "x-chart-svg", role: "presentation" }, plot);
  const tip = tooltip(plot);
  const render = () => {
    const width = Math.round(plot.clientWidth);
    // Only a new width needs a new drawing; the drawing itself changes the plot's height, which must not loop.
    if (!width || width === drawnAt) return;
    drawnAt = width;
    root.replaceChildren();
    root.setAttribute("viewBox", `0 0 ${width} ${height}`);
    root.setAttribute("height", String(height));
    tip.hide();
    draw({ svg: root, width, height, tip, off, relabel: (index, text) => { if (entries[index]) entries[index].textContent = text; } });
  };
  // Drawn on the next frame, not inside the observer: drawing changes the plot's own height, and a size changed
  // while sizes are being reported makes the browser complain of a loop.
  let frame = 0;
  const observer = new ResizeObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(render); });
  observer.observe(plot);
  figure.setAttribute("data-drawn", "");
  render();
  return () => { cancelAnimationFrame(frame); observer.disconnect(); plot.remove(); figure.removeAttribute("data-drawn"); };
}

/**
 * The readout that follows the pointer or the keyboard. Built with textContent only: names come from data.
 * It fades and grows in where it is first wanted, then glides from mark to mark, and fades out when it is left.
 * @param {HTMLElement} plot
 */
function tooltip(plot) {
  const box = plot.appendChild(document.createElement("div"));
  box.className = "x-chart-tip";
  box.hidden = true;
  box.setAttribute("role", "status");
  return {
    /** @param {number} x  @param {number} y  @param {string} title  @param {{ name?: string, value: string, color?: string }[]} rows */
    show(x, y, title, rows) {
      box.replaceChildren();
      const head = box.appendChild(document.createElement("strong"));
      head.textContent = title;
      for (const row of rows) {
        const line = box.appendChild(document.createElement("span"));
        if (row.color) line.style.setProperty("--x-chart-color", row.color);
        // The value leads; the name follows, quieter.
        const value = line.appendChild(document.createElement("b"));
        value.textContent = row.value;
        if (row.name) line.append(` ${row.name}`);
      }
      const fresh = box.hidden;
      box.hidden = false;
      // Beside the point, flipped to the other side near the right edge, and kept inside the plot.
      const right = x + 12 + box.offsetWidth > plot.clientWidth;
      // Appearing, it is put in place and only fades and grows; after that, a new place is travelled to.
      if (fresh) {
        box.setAttribute("data-placing", "");
        requestAnimationFrame(() => requestAnimationFrame(() => box.removeAttribute("data-placing")));
      }
      box.style.translate = `${Math.max(0, right ? x - 12 - box.offsetWidth : x + 12)}px ${Math.max(0, Math.min(y - box.offsetHeight / 2, plot.clientHeight - box.offsetHeight))}px`;
    },
    hide() { box.hidden = true; },
  };
}

/**
 * Draws the value gridlines with their ticks and the category labels, and returns the plot area.
 * Category labels are thinned to what fits side by side: every nth, and the last where there is room for it.
 *
 * @param {SVGSVGElement} root
 * @param {{ width: number, height: number, scale: { min: number, max: number, ticks: number[] }, labels: string[], format?: (value: number) => string, band?: boolean }} options
 *   band: categories take a slot each (bars); otherwise they sit on the points, the first and last at the edges (lines).
 * @returns {{ left: number, right: number, top: number, bottom: number, x: (index: number) => number, y: (value: number) => number, slot: number }}
 */
export function chartAxes(root, { width, height, scale, labels, format = compact, band = false }) {
  const texts = scale.ticks.map((tick) => format(tick));
  const left = Math.max(...texts.map((text) => text.length)) * 6.5 + 10;
  const area = { left, right: width - (band ? 0 : 8), top: 8, bottom: height - 24 };
  const y = (value) => area.bottom - ((value - scale.min) / (scale.max - scale.min)) * (area.bottom - area.top);
  const slot = (area.right - area.left) / (band ? labels.length : Math.max(1, labels.length - 1));
  const x = (index) => area.left + (band ? slot * (index + 0.5) : slot * index);
  const grid = svg("g", { class: "x-chart-grid" }, root);
  scale.ticks.forEach((tick, i) => {
    svg("line", { x1: area.left, x2: area.right, y1: y(tick), y2: y(tick), ...(tick === 0 ? { "data-zero": "" } : {}) }, grid);
    svg("text", { class: "x-chart-tick", x: area.left - 8, y: y(tick), "text-anchor": "end", "dominant-baseline": "middle" }, root).textContent = texts[i];
  });
  const every = Math.max(1, Math.ceil((Math.max(...labels.map((label) => label.length)) * 6.5 + 16) / slot));
  // Every nth label, and the last one too when it stands far enough from the one kept before it.
  const end = labels.length - 1;
  const kept = Math.floor(end / every) * every;
  labels.forEach((label, i) => {
    if (i % every && !(i === end && end - kept >= every * 0.75)) return;
    const anchor = band ? "middle" : i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle";
    svg("text", { class: "x-chart-tick", x: x(i), y: height - 6, "text-anchor": anchor }, root).textContent = label;
  });
  return { ...area, x, y, slot };
}
