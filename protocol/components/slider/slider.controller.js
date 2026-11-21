/**
 * Slider for plain HTML: keeps the filled part (--x-slider-fill) and the <output> current as the value changes.
 *
 *   <div class="x-slider">
 *     <div class="x-slider-head"><label class="x-slider-label" for="fee">Fee</label><output class="x-slider-value" for="fee">50%</output></div>
 *     <input class="x-slider-input" id="fee" type="range" min="0" max="100" value="50" data-x-format="{}%">
 *   </div>
 *
 * data-x-format on the input formats the output: "{}" is replaced with the value.
 *
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initSliders(root = document) {
  const sync = (input) => {
    input.style.setProperty("--x-slider-fill", sliderFill(Number(input.value), Number(input.min || 0), Number(input.max || 100)));
    const output = input.closest(".x-slider")?.querySelector(".x-slider-value");
    if (output) output.textContent = (input.dataset.xFormat ?? "{}").replace("{}", input.value);
  };
  const inputs = [...root.querySelectorAll(".x-slider-input")];
  inputs.forEach(sync);
  const onInput = (event) => {
    const input = /** @type {Element} */ (event.target);
    if (input instanceof HTMLInputElement && input.matches(".x-slider-input")) sync(input);
  };
  root.addEventListener("input", onInput);
  return () => root.removeEventListener("input", onInput);
}

/**
 * The filled part as a CSS percentage, for --x-slider-fill.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {string}
 */
export function sliderFill(value, min, max) {
  const fraction = max > min ? (value - min) / (max - min) : 0;
  return `${Math.min(100, Math.max(0, fraction * 100))}%`;
}
