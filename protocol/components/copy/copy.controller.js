/**
 * Copy, shared by React (copyValue) and plain HTML (initCopies).
 *
 *   <div class="x-copy" data-value="0x5290…9EE7"> … <button class="x-icon-button x-copy-button" aria-label="Copy address">…</button>
 *     <span class="x-copy-status" role="status"></span></div>
 *
 * Copies data-value (or the text of .x-copy-value), sets data-copied for 1.6s and announces "Copied".
 * Fires "copied" on the root with detail.value (not "copy": that name belongs to the native clipboard event).
 */

const timers = new WeakMap();

/**
 * @param {HTMLElement} root  the .x-copy element
 * @param {string} value
 * @returns {Promise<boolean>} whether the clipboard took it
 */
export async function copyValue(root, value) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    return false;
  }
  const status = root.querySelector(".x-copy-status");
  root.setAttribute("data-copied", "");
  if (status) status.textContent = "Copied";
  clearTimeout(timers.get(root));
  timers.set(root, setTimeout(() => {
    root.removeAttribute("data-copied");
    if (status) status.textContent = "";
  }, 1600));
  root.dispatchEvent(new CustomEvent("copied", { detail: { value }, bubbles: true }));
  return true;
}

/**
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initCopies(root = document) {
  const onClick = (event) => {
    const button = /** @type {Element} */ (event.target).closest(".x-copy-button");
    const copy = button?.closest(".x-copy");
    if (!(copy instanceof HTMLElement)) return;
    copyValue(copy, copy.getAttribute("data-value") ?? copy.querySelector(".x-copy-value")?.textContent?.trim() ?? "");
  };
  root.addEventListener("click", onClick);
  return () => root.removeEventListener("click", onClick);
}
