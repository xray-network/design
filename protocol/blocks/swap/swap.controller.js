/**
 * Swap for plain HTML: the flip button turns its icon and fires "flip" on the form; the app swaps the currencies
 * and requests a new quote. InputAmount handles typing and Max (initAmounts). Mark the form aria-busy while quoting.
 *
 *   <form class="x-swap"> … <button class="x-icon-button x-swap-flip" type="button" aria-label="Switch currencies">…</button> … </form>
 *   form.addEventListener("flip", () => { swap the pair, re-quote })
 *
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initSwaps(root = document) {
  const onClick = (event) => {
    const flip = /** @type {Element} */ (event.target).closest(".x-swap-flip");
    const form = flip?.closest(".x-swap");
    if (!flip || !form) return;
    turnSwapFlip(flip);
    form.dispatchEvent(new CustomEvent("flip", { bubbles: true }));
  };
  root.addEventListener("click", onClick);
  return () => root.removeEventListener("click", onClick);
}

/**
 * Turns the flip icon half a turn, and back on the next press.
 * @param {Element} flip
 */
export function turnSwapFlip(flip) {
  flip.toggleAttribute("data-turned");
}
