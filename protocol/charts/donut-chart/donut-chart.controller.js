import { SERIES, chartFrame, compact, readChartTable, seriesColor, svg } from "../../core/chart.js";

/** The ring's thickness, as a share of its radius. */
const RING = 0.26;

/** A slice of a ring between two angles (radians, clockwise from the top). */
function slicePath(cx, cy, outer, inner, from, to) {
  const at = (radius, angle) => `${(cx + radius * Math.sin(angle)).toFixed(2)} ${(cy - radius * Math.cos(angle)).toFixed(2)}`;
  const large = to - from > Math.PI ? 1 : 0;
  return `M${at(outer, from)}A${outer} ${outer} 0 ${large} 1 ${at(outer, to)}L${at(inner, to)}A${inner} ${inner} 0 ${large} 0 ${at(inner, from)}Z`;
}

/**
 * The parts a donut draws: the table's rows, largest shares first as given, with everything past the fifth
 * folded into "Other" (there are six colors and no seventh), and parts at zero dropped.
 * @param {{ labels: string[], series: { values: number[] }[] }} data
 * @returns {{ name: string, value: number, share: number, other?: boolean }[]}
 */
export function donutParts(data) {
  const rows = data.labels.map((name, i) => ({ name, value: Math.max(0, data.series[0]?.values[i] ?? 0) })).filter((row) => row.value > 0);
  const kept = rows.length > SERIES ? [...rows.slice(0, SERIES - 1), { name: "Other", value: rows.slice(SERIES - 1).reduce((sum, row) => sum + row.value, 0), other: true }] : rows;
  const total = kept.reduce((sum, row) => sum + row.value, 0) || 1;
  return kept.map((row) => ({ ...row, share: row.value / total }));
}

/**
 * Donut chart: draws the first series of the figure's data table as the parts of one whole.
 *
 *   <figure class="x-chart x-donut-chart" data-total="Portfolio"> <table class="x-chart-data">…</table> </figure>
 *
 * The total is written in the middle, with data-total as its caption. Pointing at a part, or moving to it with
 * the arrow keys when the plot has the focus, shows its value and its share.
 *
 * @param {HTMLElement} figure
 * @param {{ format?: (value: number) => string }} [options]
 * @returns {() => void} cleanup
 */
export function bindDonutChart(figure, { format = compact } = {}) {
  const parts = donutParts(readChartTable(figure));
  if (!parts.length) return () => {};
  const percent = (share) => `${(share * 100).toFixed(share < 0.1 ? 1 : 0)}%`;
  // The folded rest is no series of its own: it takes the muted color, whatever its place.
  const color = (i) => (parts[i].other ? seriesColor(SERIES) : seriesColor(i));

  return chartFrame(figure, ({ svg: root, width, height, tip, off, relabel }) => {
    // The parts that are on make the whole: the total and every share are of what is showing.
    const shown = parts.map((_, i) => i).filter((i) => !off.has(i));
    const whole = shown.reduce((sum, i) => sum + parts[i].value, 0);
    const share = (i) => (whole ? parts[i].value / whole : 0);
    parts.forEach((part, i) => relabel(i, off.has(i) ? part.name : `${part.name} ${percent(share(i))}`));
    const radius = Math.min(width, height) / 2 - 2;
    const cx = width / 2, cy = height / 2;
    let angle = 0;
    const slices = shown.map((i) => {
      const from = angle;
      angle += share(i) * Math.PI * 2;
      // One whole part is a full ring: an arc cannot start and end on the same point.
      const slice = svg("path", { class: "x-donut-chart-slice", d: slicePath(cx, cy, radius, radius * (1 - RING), from, Math.min(angle, from + Math.PI * 2 - 0.0001)) }, root);
      slice.style.setProperty("--x-chart-color", color(i));
      return { slice, middle: (from + angle) / 2, part: i };
    });
    svg("text", { class: "x-donut-chart-total", x: cx, y: cy, "text-anchor": "middle" }, root).textContent = format(whole);
    if (figure.dataset.total) svg("text", { class: "x-donut-chart-caption", x: cx, y: cy + 18, "text-anchor": "middle" }, root).textContent = figure.dataset.total;

    let index = -1;
    const show = (next) => {
      if (!slices.length) return;
      index = (next + slices.length) % slices.length;
      const { middle, part } = slices[index];
      root.setAttribute("data-active", "");
      slices.forEach(({ slice }, k) => slice.toggleAttribute("data-active", k === index));
      const mid = radius * (1 - RING / 2);
      tip.show(cx + mid * Math.sin(middle), cy - mid * Math.cos(middle), parts[part].name, [{ value: format(parts[part].value), name: percent(share(part)), color: color(part) }]);
    };
    const hide = () => { index = -1; root.removeAttribute("data-active"); slices.forEach(({ slice }) => slice.removeAttribute("data-active")); tip.hide(); };
    slices.forEach(({ slice }, k) => { slice.onpointerenter = () => show(k); });
    const holder = root.parentElement;
    holder.tabIndex = 0;
    holder.onpointerleave = hide;
    holder.onblur = hide;
    holder.onkeydown = (event) => {
      const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
      if (step) { event.preventDefault(); show(index < 0 ? (step > 0 ? 0 : -1) : index + step); }
      if (event.key === "Escape") hide();
    };
  }, { legend: parts.map((part) => `${part.name} ${percent(part.share)}`), colors: parts.map((_, i) => color(i)), height: Number(figure.dataset.height) || 200 });
}

/**
 * Draws every .x-donut-chart under root.
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initDonutCharts(root = document) {
  const cleanups = [...root.querySelectorAll(".x-donut-chart")].map((figure) => bindDonutChart(/** @type {HTMLElement} */ (figure)));
  return () => cleanups.forEach((fn) => fn());
}
