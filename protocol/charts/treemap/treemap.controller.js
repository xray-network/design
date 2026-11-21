import { chartFrame, compact, readChartTable, svg } from "../../core/chart.js";

const GAP = 2;

/**
 * Lays values out as rectangles that fill a box, each as large as its value, kept as close to square as the
 * values allow (the "squarified" layout). Values are taken largest first.
 * @param {number[]} values
 * @param {number} width  @param {number} height
 * @returns {{ index: number, x: number, y: number, w: number, h: number }[]}
 */
export function treemapLayout(values, width, height) {
  const items = values.map((value, index) => ({ index, value })).filter((item) => item.value > 0).sort((a, b) => b.value - a.value);
  const total = items.reduce((sum, item) => sum + item.value, 0) || 1;
  const scale = (width * height) / total;
  const out = [];
  let box = { x: 0, y: 0, w: width, h: height };
  // The worst aspect ratio of a row of areas laid along a side of the given length.
  const worst = (row, side) => { const sum = row.reduce((a, b) => a + b, 0); return Math.max((side * side * Math.max(...row)) / (sum * sum), (sum * sum) / (side * side * Math.min(...row))); };
  let row = [];
  const flush = () => {
    const sum = row.reduce((a, item) => a + item.value * scale, 0);
    const wide = box.w >= box.h; // the row is laid along the shorter side
    const thick = sum / (wide ? box.h : box.w);
    let at = 0;
    for (const item of row) {
      const length = (item.value * scale) / thick;
      out.push(wide ? { index: item.index, x: box.x, y: box.y + at, w: thick, h: length } : { index: item.index, x: box.x + at, y: box.y, w: length, h: thick });
      at += length;
    }
    box = wide ? { x: box.x + thick, y: box.y, w: box.w - thick, h: box.h } : { x: box.x, y: box.y + thick, w: box.w, h: box.h - thick };
    row = [];
  };
  for (const item of items) {
    const side = Math.min(box.w, box.h);
    const areas = row.map((r) => r.value * scale);
    if (row.length && worst([...areas, item.value * scale], side) > worst(areas, side)) flush();
    row.push(item);
  }
  if (row.length) flush();
  return out;
}

/**
 * Treemap: draws the first series of the figure's data table as rectangles that fill one box, each as large as
 * its value: the parts of a whole when there are too many for a donut. One color, stronger for larger parts; a
 * part is named inside it where the name fits, and in the readout always.
 *
 * A second column, if the table has one, is how each part moved (a price change, growth). The tiles then take
 * their color from it: the up color for a rise, the down color for a fall, stronger for a larger move, and each
 * tile and the readout show the move as it is written in the table.
 *
 * @param {HTMLElement} figure
 * @param {{ format?: (value: number) => string }} [options]
 * @returns {() => void} cleanup
 */
export function bindTreemap(figure, { format = compact } = {}) {
  const data = readChartTable(figure);
  const values = data.series[0]?.values ?? [];
  if (!values.some((value) => value > 0)) return () => {};
  const total = values.reduce((sum, value) => sum + Math.max(0, value), 0);
  const max = Math.max(...values);
  const percent = (share) => `${(share * 100).toFixed(share < 0.1 ? 1 : 0)}%`;
  const move = data.series[1]; // optional: how each part moved
  const swing = move ? Math.max(...move.values.map(Math.abs)) || 1 : 1;

  return chartFrame(figure, ({ svg: root, width, height, tip }) => {
    const tiles = treemapLayout(values, width, height).map((tile) => {
      const group = svg("g", { class: "x-treemap-tile" }, root);
      const w = Math.max(0, tile.w - GAP), h = Math.max(0, tile.h - GAP);
      const mark = svg("rect", { class: "x-treemap-fill", x: tile.x.toFixed(2), y: tile.y.toFixed(2), width: w.toFixed(2), height: h.toFixed(2), rx: Math.min(4, w / 2, h / 2) }, group);
      const moved = move?.values[tile.index] ?? 0;
      const level = move ? Math.abs(moved) / swing : values[tile.index] / max;
      // By size the fill runs up to the full color. By move it stops short of it, so the text on a tile keeps
      // the text color in both themes.
      mark.style.setProperty("--x-treemap-level", `${Math.round(move ? 26 + level * 38 : 14 + level * 86)}%`);
      if (move) group.setAttribute("data-trend", moved > 0 ? "up" : moved < 0 ? "down" : "flat");
      // A name goes inside only where it fits with room to spare; the readout carries the rest.
      const name = data.labels[tile.index];
      const note = move ? move.texts[tile.index] : percent(values[tile.index] / total);
      if (w > Math.max(name.length * 7, note.length * 6) + 16 && h > 36) {
        if (!move && level > 0.55) group.setAttribute("data-strong", ""); // text on a strong fill takes the color for text on the accent
        svg("text", { class: "x-treemap-name", x: tile.x + 8, y: tile.y + 18 }, group).textContent = name;
        svg("text", { class: "x-treemap-share", x: tile.x + 8, y: tile.y + 33 }, group).textContent = note;
      }
      group.onpointerenter = () => show(tiles.indexOf(entry));
      const entry = { group, tile };
      return entry;
    });
    let index = -1;
    const show = (next) => {
      index = (next + tiles.length) % tiles.length;
      const { tile } = tiles[index];
      root.setAttribute("data-active", "");
      tiles.forEach(({ group }, k) => group.toggleAttribute("data-active", k === index));
      tip.show(tile.x + tile.w / 2, tile.y + tile.h / 2, data.labels[tile.index], move
        ? [{ value: format(values[tile.index]), name: data.series[0].name }, { value: move.texts[tile.index], name: move.name }]
        : [{ value: format(values[tile.index]), name: percent(values[tile.index] / total) }]);
    };
    const hide = () => { index = -1; root.removeAttribute("data-active"); tiles.forEach(({ group }) => group.removeAttribute("data-active")); tip.hide(); };
    const holder = root.parentElement;
    holder.tabIndex = 0;
    holder.onpointerleave = hide;
    holder.onblur = hide;
    holder.onkeydown = (event) => {
      const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
      if (step) { event.preventDefault(); show(index < 0 ? (step > 0 ? 0 : -1) : index + step); }
      if (event.key === "Escape") hide();
    };
  }, { height: Number(figure.dataset.height) || 240 });
}

/** Draws every .x-treemap under root. @param {ParentNode} [root] @returns {() => void} cleanup */
export function initTreemaps(root = document) {
  const cleanups = [...root.querySelectorAll(".x-treemap")].map((figure) => bindTreemap(/** @type {HTMLElement} */ (figure)));
  return () => cleanups.forEach((fn) => fn());
}
