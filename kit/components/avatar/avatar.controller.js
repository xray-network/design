/**
 * Account avatar in the Jazzicon style: a background color and three full-size squares, each pushed
 * out from the center and rotated, so their straight edges cross at random angles. Deterministic per
 * seed (an address): the same seed and palette always give the same avatar, on the server and in the browser.
 *
 *   import { initAvatars } from "./avatar.controller.js";
 *   initAvatars(); // fills every <span class="x-avatar" data-seed="addr1…" data-palette="ada">
 */

/** Identity palettes: four colors each, from the XRAY palette. */
export const PALETTES = {
  ada: ["#f0b000", "#3f5ff0", "#ff6900", "#fa2c37"],
  btc: ["#1940ed", "#ff6900", "#fa2c37", "#ffb869"],
  night: ["#ffb869", "#ca3500", "#ff6900", "#fa2c37"],
  xray: ["#0cab6b", "#15e4a3", "#1940ed", "#0e0e18"],
  cool: ["#1940ed", "#15e4a3", "#657ff3", "#0b228b"],
};

/** Small seeded random generator (mulberry32): the same seed gives the same sequence everywhere. */
function random(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Jazzicon's shape layout on a 40×40 canvas: shape i of n moves out from the center by a random
 * distance within its own band (later shapes travel further), at a random angle, then turns around
 * the center by that angle plus up to 180° more. Colors are drawn from the palette without repeats.
 *
 * @param {string} seed  Any stable string: an address, an account id.
 * @param {keyof typeof PALETTES} [palette]
 * @returns {{ background: string, shapes: { fill: string, x: number, y: number, rotate: number }[] }}
 */
export function avatarShapes(seed, palette = "ada") {
  const colors = [...(PALETTES[palette] ?? PALETTES.ada)];
  let h = 2166136261; // FNV-1a
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const next = random(h >>> 0);
  const pick = () => colors.splice(Math.floor(next() * colors.length), 1)[0];
  const round = (n) => Math.round(n * 100) / 100;

  const size = 40;
  const background = pick();
  const total = colors.length; // 3 shapes: one per remaining color
  const shapes = [];
  for (let i = 0; i < total; i++) {
    const firstRot = next();
    const angle = Math.PI * 2 * firstRot;
    const velocity = (size / total) * next() + (i * size) / total;
    const secondRot = next();
    shapes.push({
      x: round(Math.cos(angle) * velocity),
      y: round(Math.sin(angle) * velocity),
      rotate: round(firstRot * 360 + secondRot * 180),
      fill: pick(),
    });
  }
  return { background, shapes };
}

/** The avatar's SVG markup, for server templates and the HTML version. */
export function avatarSvg(seed, palette) {
  const { background, shapes } = avatarShapes(seed, palette);
  const rect = (s) => `<rect width="40" height="40" fill="${s.fill}" transform="translate(${s.x} ${s.y}) rotate(${s.rotate} 20 20)"/>`;
  return `<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" fill="${background}"/>${shapes.map(rect).join("")}</svg>`;
}

/**
 * Draws every .x-avatar[data-seed] under root that has no drawing yet.
 * @param {ParentNode} [root]
 */
export function initAvatars(root = document) {
  for (const el of root.querySelectorAll(".x-avatar[data-seed]")) {
    if (el.querySelector(":scope > svg:first-child")) continue;
    el.insertAdjacentHTML("afterbegin", avatarSvg(el.getAttribute("data-seed") ?? "", el.getAttribute("data-palette") ?? undefined));
  }
}
