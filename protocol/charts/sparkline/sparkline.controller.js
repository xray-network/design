/**
 * The geometry of a sparkline: the line through the values, scaled to fill a box with room for the end dot, and
 * where the last value sits.
 * @param {number[]} values
 * @param {number} [width]
 * @param {number} [height]
 * @returns {{ line: string, end: { x: number, y: number } }}
 */
export function sparklineShape(values, width = 96, height = 24) {
  const pad = 4; // the end dot's radius and its ring
  const low = Math.min(...values);
  const span = Math.max(...values) - low || 1;
  const points = values.map((value, i) => ({
    x: Number((pad + (values.length > 1 ? i / (values.length - 1) : 0) * (width - pad * 2)).toFixed(1)),
    y: Number((height - pad - ((value - low) / span) * (height - pad * 2)).toFixed(1)),
  }));
  return { line: points.length ? `M${points.map((point) => `${point.x} ${point.y}`).join("L")}` : "", end: points.at(-1) ?? { x: 0, y: 0 } };
}

/**
 * Sparkline for plain HTML: draws every .x-sparkline from its data-values (numbers apart by spaces or commas).
 *
 *   <span class="x-sparkline" data-values="3 5 4 8 7 11" role="img" aria-label="Up 12% over 7 days"></span>
 *
 * @param {ParentNode} [root]
 */
export function initSparklines(root = document) {
  for (const el of root.querySelectorAll(".x-sparkline")) {
    const values = (el.dataset.values ?? "").split(/[\s,]+/).filter(Boolean).map(Number);
    if (values.length < 2) continue;
    const width = el.clientWidth || 96;
    const height = el.clientHeight || 24;
    const shape = sparklineShape(values, width, height);
    el.innerHTML = `<svg viewBox="0 0 ${width} ${height}" aria-hidden="true"><path class="x-sparkline-line" d="${shape.line}"/><circle class="x-sparkline-dot" cx="${shape.end.x}" cy="${shape.end.y}" r="2.5"/></svg>`;
  }
}
