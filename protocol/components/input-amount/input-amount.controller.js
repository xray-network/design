/**
 * InputAmount for plain HTML: keeps the value a clean decimal while typing, and Max fills the balance.
 *
 *   <div class="x-amount" data-max="2.41" data-decimals="6">
 *     … <button class="x-button" data-variant="chip" data-x-max>Max</button> …
 *     <input class="x-amount-input" inputmode="decimal"> …
 *   </div>
 *
 * data-max: the amount Max fills in (the app's spendable balance). data-decimals: digits after the point.
 * Both fire a normal "input" event on the input, so the app reacts the same way to typing and to Max.
 *
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initAmounts(root = document) {
  const onInput = (event) => {
    const input = /** @type {Element} */ (event.target);
    if (!(input instanceof HTMLInputElement) || !input.matches(".x-amount-input")) return;
    const decimals = Number(input.closest(".x-amount")?.getAttribute("data-decimals") ?? 18);
    const clean = sanitizeAmount(input.value, decimals);
    if (clean !== input.value) {
      const end = input.selectionEnd ?? clean.length;
      const shift = input.value.length - clean.length;
      input.value = clean;
      input.setSelectionRange(Math.max(0, end - shift), Math.max(0, end - shift));
    }
  };
  const onClick = (event) => {
    const max = /** @type {Element} */ (event.target).closest("[data-x-max]");
    const frame = max?.closest(".x-amount");
    const input = frame?.querySelector(".x-amount-input");
    if (!frame || !(input instanceof HTMLInputElement)) return;
    input.value = sanitizeAmount(frame.getAttribute("data-max") ?? "", Number(frame.getAttribute("data-decimals") ?? 18));
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.focus();
  };
  root.addEventListener("input", onInput);
  root.addEventListener("click", onClick);
  return () => {
    root.removeEventListener("input", onInput);
    root.removeEventListener("click", onClick);
  };
}

/**
 * Digits and one decimal point, at most `decimals` after it. A comma counts as the point; leading zeros collapse
 * ("007" → "7", "00.5" → "0.5"). Text in, text out: never a float, so nothing is rounded.
 * @param {string} text
 * @param {number} [decimals]
 * @returns {string}
 */
export function sanitizeAmount(text, decimals = 18) {
  let out = "";
  let point = false;
  let after = 0;
  for (const ch of text.replace(/,/g, ".")) {
    if (ch === "." && !point && decimals > 0) {
      point = true;
      out = (out || "0") + ".";
    } else if (ch >= "0" && ch <= "9") {
      if (point) {
        if (after >= decimals) continue;
        after++;
      }
      out += ch;
    }
  }
  return out.replace(/^0+(?=\d)/, "");
}
