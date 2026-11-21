/**
 * Composer: grows the text box with what is written, counts the characters left when the form has data-max, enables
 * the submit button only when there is something to send, and on submit sends a "post" event ({ text }) and clears
 * the box. The app listens for "post".
 *
 * @param {HTMLFormElement} form
 * @returns {() => void} cleanup
 */
export function bindComposer(form) {
  const input = /** @type {HTMLTextAreaElement | null} */ (form.querySelector(".x-composer-input"));
  const submit = /** @type {HTMLButtonElement | null} */ (form.querySelector('[type="submit"]'));
  const count = form.querySelector(".x-composer-count");
  if (!input) return () => {};
  const max = Number(form.dataset.max) || 0;
  const sync = () => {
    // field-sizing does this in CSS where it exists; elsewhere the height follows the text.
    if (!CSS.supports("field-sizing", "content")) { input.style.height = "auto"; input.style.height = `${input.scrollHeight}px`; }
    const left = max - input.value.length;
    if (count && max) count.textContent = String(left);
    form.toggleAttribute("data-over", max > 0 && left < 0);
    if (submit) submit.disabled = !input.value.trim() || (max > 0 && left < 0);
  };
  const send = (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text || (max > 0 && text.length > max)) return;
    form.dispatchEvent(new CustomEvent("post", { bubbles: true, detail: { text } }));
    input.value = "";
    sync();
  };
  // Enter sends from a one-line box; in a tall one it is a new line, and Ctrl or Cmd + Enter sends.
  const key = (event) => {
    if (event.key !== "Enter" || event.isComposing) return;
    if (form.dataset.variant === "inline" ? !event.shiftKey : event.metaKey || event.ctrlKey) { event.preventDefault(); form.requestSubmit(); }
  };
  input.addEventListener("input", sync);
  input.addEventListener("keydown", key);
  form.addEventListener("submit", send);
  sync();
  return () => { input.removeEventListener("input", sync); input.removeEventListener("keydown", key); form.removeEventListener("submit", send); };
}

/** Binds every .x-composer under root. @param {ParentNode} [root] @returns {() => void} cleanup */
export function initComposers(root = document) {
  const cleanups = [...root.querySelectorAll(".x-composer")].map((form) => bindComposer(/** @type {HTMLFormElement} */ (form)));
  return () => cleanups.forEach((fn) => fn());
}
