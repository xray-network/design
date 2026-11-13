/**
 * Motion helpers shared by the HTML controllers and the React components. No dependencies.
 *
 * Everything reads timing from the tokens on the element, so reduced motion (the OS setting or
 * data-motion="reduce" on an ancestor) is respected without extra checks.
 */

/** A token's duration in ms, read from the element's computed style. */
export function duration(el, token = "--x-spring-duration") {
  const raw = getComputedStyle(el).getPropertyValue(token).trim();
  const n = parseFloat(raw);
  if (Number.isNaN(n)) return 0;
  return raw.endsWith("ms") ? n : n * 1000;
}

/** A token's easing string, read from the element's computed style. */
export function easing(el, token = "--x-spring") {
  return getComputedStyle(el).getPropertyValue(token).trim() || "ease-out";
}

/** True when motion is reduced for this element. */
export function reduced(el) {
  return duration(el, "--x-spring-duration") === 0;
}

/**
 * Liquid indicator. Places a single indicator element under the active item and moves it with
 * leading and trailing edges: the edge in the direction of travel moves first and fast, the
 * other edge follows on a softer spring, so the indicator stretches and settles like a drop.
 *
 * The CSS reads --x-ind-left / --x-ind-right (insets from the root's padding box) and
 * data-direction ("forward" | "backward") on the root; data-indicator="ready" turns the indicator on.
 *
 * @param {HTMLElement} root   Element containing the items and the indicator.
 * @param {() => HTMLElement | null} getActive   Returns the active item.
 * @returns {{ update: () => void, destroy: () => void }}
 */
export function trackIndicator(root, getActive) {
  let last = null;

  const update = () => {
    const active = getActive();
    if (!active) {
      root.removeAttribute("data-indicator");
      return;
    }
    const left = active.offsetLeft;
    const right = root.clientWidth - (active.offsetLeft + active.offsetWidth);
    if (last !== null && left !== last) root.dataset.direction = left > last ? "forward" : "backward";
    last = left;
    root.style.setProperty("--x-ind-left", `${left}px`);
    root.style.setProperty("--x-ind-right", `${right}px`);
    if (root.dataset.indicator !== "ready") {
      // First placement without transition; motion only between items.
      root.dataset.indicator = "placing";
      requestAnimationFrame(() => requestAnimationFrame(() => { root.dataset.indicator = "ready"; }));
    }
  };

  const resize = new ResizeObserver(() => {
    // Resizes snap the indicator; only selection changes animate.
    const state = root.dataset.indicator;
    root.dataset.indicator = "placing";
    update();
    requestAnimationFrame(() => { if (state === "ready") root.dataset.indicator = "ready"; });
  });
  resize.observe(root);
  update();

  return { update, destroy: () => resize.disconnect() };
}

/**
 * FLIP: animate elements from their previous layout to the current one.
 * Call measure() before the DOM changes, then play() after it.
 *
 *   const flip = createFlip(() => list.children);
 *   flip.measure(); list.prepend(item); flip.play();
 *
 * @param {() => Iterable<Element>} getElements
 * @param {{ token?: string, easingToken?: string }} [options]
 */
export function createFlip(getElements, { token = "--x-spring-soft-duration", easingToken = "--x-spring-soft" } = {}) {
  let before = new Map();
  return {
    measure() {
      before = new Map();
      for (const el of getElements()) before.set(el, el.getBoundingClientRect());
    },
    play() {
      for (const el of getElements()) {
        const prev = before.get(el);
        if (!prev) continue;
        const next = el.getBoundingClientRect();
        const dx = prev.left - next.left;
        const dy = prev.top - next.top;
        if (!dx && !dy) continue;
        const ms = duration(el, token);
        if (!ms) continue;
        el.animate(
          [{ translate: `${dx}px ${dy}px` }, { translate: "0 0" }],
          { duration: ms, easing: easing(el, easingToken), composite: "add" },
        );
      }
      before = new Map();
    },
  };
}

/** Run fn after the element's exit transition (or immediately when motion is reduced). */
export function afterTransition(el, fn, token = "--x-duration-slow") {
  const ms = duration(el, token);
  if (!ms) return fn();
  let done = false;
  const onEnd = (e) => { if (e.target === el) finish(); };
  const finish = () => {
    if (done) return;
    done = true;
    el.removeEventListener("transitionend", onEnd);
    fn();
  };
  el.addEventListener("transitionend", onEnd);
  setTimeout(finish, ms + 80); // fallback when no transition fires
}

/* ---------------------------------------------------------------------------
   Springs. spring() turns a damped harmonic oscillator into a CSS linear() easing, so CSS
   transitions get physical motion without a runtime library. The --x-spring tokens in tokens.css
   are precomputed from SPRINGS; regenerate them after changing a preset (from the repo root):

     node -e 'import("./kit/core/motion.js").then((m) => console.log(m.spring(m.SPRINGS.liquid), m.spring(m.SPRINGS.soft)))'
   --------------------------------------------------------------------------- */

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

/** Presets behind --x-spring (liquid) and --x-spring-soft (soft) in tokens.css. */
export const SPRINGS = {
  /** Liquid: a small overshoot that settles. Selection indicators, thumbs, overlays. */
  liquid: { stiffness: 320, dampingRatio: 0.68 },
  /** Soft: no overshoot, long fluid tail. Layout reflow, stacking. */
  soft: { stiffness: 220, dampingRatio: 1 },
};
