/**
 * Post for plain HTML: a press on a toggle action (one with aria-pressed) flips it at once and fires "toggle" on the
 * post with detail.action (its data-action) and detail.pressed. The app updates the count and saves the change.
 *
 *   <article class="x-post"> … <button class="x-post-action" data-action="like" aria-pressed="false" aria-label="Like, 248">…</button> … </article>
 *
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initPosts(root = document) {
  const onClick = (event) => {
    const action = /** @type {Element} */ (event.target).closest(".x-post-action[aria-pressed]");
    const post = action?.closest(".x-post");
    if (!action || !post) return;
    const pressed = action.getAttribute("aria-pressed") !== "true";
    action.setAttribute("aria-pressed", String(pressed));
    post.dispatchEvent(new CustomEvent("toggle", { detail: { action: action.getAttribute("data-action"), pressed }, bubbles: true }));
  };
  root.addEventListener("click", onClick);
  return () => root.removeEventListener("click", onClick);
}
