/**
 * Spring easing as a CSS `linear()` function: a damped harmonic oscillator sampled from 0 to 1,
 * so CSS transitions and animations get physical motion without a runtime library.
 *
 * spring({ stiffness: 300, dampingRatio: 0.72 })
 *   -> { easing: "linear(0, 0.031, …, 1)", duration: 520 }
 *
 * The precomputed presets in tokens/motion.css (--x-spring, --x-spring-soft) come from this
 * function; regenerate them with `node scripts/springs.mjs` if you change a preset.
 */

/**
 * @param {{ stiffness?: number, dampingRatio?: number, mass?: number, points?: number, precision?: number }} [options]
 * @returns {{ easing: string, duration: number }}
 */
export function spring({ stiffness = 300, dampingRatio = 0.72, mass = 1, points = 40, precision = 0.004 } = {}) {
  const omega = Math.sqrt(stiffness / mass); // undamped angular frequency
  const zeta = dampingRatio;
  const at = (t) => {
    if (zeta < 1) {
      const wd = omega * Math.sqrt(1 - zeta * zeta);
      return 1 - Math.exp(-zeta * omega * t) * (Math.cos(wd * t) + ((zeta * omega) / wd) * Math.sin(wd * t));
    }
    // critically damped (zeta >= 1 is treated as critical: no overshoot)
    return 1 - Math.exp(-omega * t) * (1 + omega * t);
  };

  // Settle time: the last moment the curve is farther than `precision` from 1.
  const step = 1 / 1000;
  let settle = 0;
  for (let t = 0; t < 4; t += step) if (Math.abs(1 - at(t)) > precision) settle = t;
  settle = Math.max(settle, step);

  const values = [];
  for (let i = 0; i <= points; i++) values.push(i === points ? 1 : at((settle * i) / points));
  const round = (v) => Number(v.toFixed(3));
  return { easing: `linear(${values.map(round).join(", ")})`, duration: Math.round(settle * 1000) };
}

/** Presets used by tokens/motion.css. */
export const SPRINGS = {
  /** Liquid: a small overshoot that settles. Selection indicators, thumbs, overlays. */
  liquid: { stiffness: 320, dampingRatio: 0.68 },
  /** Soft: no overshoot, long fluid tail. Layout reflow, stacking. */
  soft: { stiffness: 220, dampingRatio: 1 },
};
