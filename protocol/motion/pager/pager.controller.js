import { reduced } from "../../core/motion.js";

/**
 * Pager: keeps the dots, and whoever listens, in step with the page the track has stopped on, and moves the
 * track from the dots, the arrow keys or code.
 *
 *   <div class="x-pager"> <ul class="x-pager-track" tabindex="0"> <li class="x-pager-page">…</li> … </ul>
 *     <div class="x-pager-dots"> <button class="x-pager-dot" aria-label="Page 1" aria-current="true"></button> … </div> </div>
 *
 * Fires `change` on the root when the current page changes: detail is { index }. Going to a page scrolls there
 * smoothly; with reduced motion it jumps.
 *
 * A finger swipes the track as it scrolls anything else. A mouse has no such gesture, so the controller gives
 * it one: press and drag the track and it follows; let go and it settles on the nearest page, or, after a quick
 * flick, on the next one in the direction of the flick.
 *
 * @param {HTMLElement} root  the .x-pager
 * @returns {{ goTo: (index: number) => void, destroy: () => void }}
 */
export function bindPager(root) {
  const track = /** @type {HTMLElement} */ (root.querySelector(".x-pager-track"));
  const pages = () => [...track.querySelectorAll(":scope > .x-pager-page")];
  const dots = () => [...root.querySelectorAll(".x-pager-dot")];
  let current = Math.max(0, dots().findIndex((dot) => dot.getAttribute("aria-current") === "true"));

  const goTo = (index) => {
    const page = pages()[Math.max(0, Math.min(pages().length - 1, index))];
    if (page) track.scrollTo({ left: page.offsetLeft - track.offsetLeft, behavior: reduced(root) ? "instant" : "smooth" });
  };
  // The page in view is the one nearest the start of the track. The dots follow it as the track moves.
  const nearest = () => {
    const at = track.scrollLeft + track.offsetLeft;
    return pages().reduce((best, page, i, all) => (Math.abs(page.offsetLeft - at) < Math.abs(all[best].offsetLeft - at) ? i : best), 0);
  };
  const sync = () => {
    const index = nearest();
    dots().forEach((dot, i) => { if (i === index) dot.setAttribute("aria-current", "true"); else dot.removeAttribute("aria-current"); });
  };
  // `change` waits for the track to stop: pages passed on the way to another are not reported.
  const settled = () => {
    clearTimeout(timer);
    if (!drag) release(); // a mouse drag that was let go has arrived: snapping is back
    const index = nearest();
    if (index === current) return;
    current = index;
    root.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { index } }));
  };
  let frame = 0;
  let timer = 0;
  const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(sync); clearTimeout(timer); timer = setTimeout(settled, 140); };
  const onClick = (event) => {
    const index = dots().indexOf(event.target.closest?.(".x-pager-dot"));
    if (index >= 0) goTo(index);
  };
  // ---- Drag with a mouse. Touch and trackpads already scroll the track; this is for the pointer that cannot.
  let drag = null; // { x, left, page, moved, samples }
  const release = () => {
    if (!track.hasAttribute("data-dragging")) return;
    track.removeAttribute("data-dragging");
  };
  const onDragMove = (event) => {
    if (!drag) return;
    if (event.buttons === 0) { onDragEnd(event); return; } // let go outside the window
    const dx = event.clientX - drag.x;
    if (!drag.moved) {
      if (Math.abs(dx) < 6) return; // still a press: links and buttons on the page keep working
      drag.moved = true;
      drag.x = event.clientX; // it starts under the pointer, with no jump
      drag.left = track.scrollLeft;
      track.setAttribute("data-dragging", ""); // snapping off while it is held
      getSelection()?.removeAllRanges();
      return;
    }
    track.scrollLeft = drag.left - dx;
    drag.samples.push({ t: event.timeStamp, x: event.clientX });
    if (drag.samples.length > 5) drag.samples.shift();
  };
  const onDragEnd = (event) => {
    window.removeEventListener("pointermove", onDragMove);
    window.removeEventListener("pointerup", onDragEnd);
    window.removeEventListener("pointercancel", onDragEnd);
    if (!drag) return;
    const { moved, samples, page } = drag;
    drag = null;
    if (!moved) return;
    // A drag is not a press: the click that follows it goes nowhere.
    track.addEventListener("click", (click) => { click.preventDefault(); click.stopPropagation(); }, { capture: true, once: true });
    const first = samples[0], last = samples.at(-1);
    const speed = last && first && last.t > first.t && event.timeStamp - last.t < 80 ? (last.x - first.x) / (last.t - first.t) : 0;
    // A flick goes one page from where the drag began, in its direction; otherwise the nearest page wins.
    const target = Math.abs(speed) > 0.3 ? Math.max(0, Math.min(pages().length - 1, page + (speed < 0 ? 1 : -1))) : nearest();
    const left = pages()[target].offsetLeft - track.offsetLeft;
    if (Math.abs(left - track.scrollLeft) < 1) { release(); settled(); return; }
    // Snapping comes back once it has arrived (see settled), so it glides there and does not jump.
    goTo(target);
  };
  const onDragStart = (event) => {
    if (event.pointerType !== "mouse" || event.button || drag) return;
    if (event.target.closest?.("input, textarea, select, [contenteditable]")) return;
    drag = { x: event.clientX, left: track.scrollLeft, page: nearest(), moved: false, samples: [{ t: event.timeStamp, x: event.clientX }] };
    window.addEventListener("pointermove", onDragMove);
    window.addEventListener("pointerup", onDragEnd);
    window.addEventListener("pointercancel", onDragEnd);
  };
  // The browser's own drag of a picture or a link would take the pointer away mid-drag.
  const onNativeDrag = (event) => event.preventDefault();

  const onKey = (event) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (step && event.target === track) { event.preventDefault(); goTo(nearest() + step); }
  };
  track.addEventListener("scroll", onScroll, { passive: true });
  track.addEventListener("scrollend", settled);
  track.addEventListener("pointerdown", onDragStart);
  track.addEventListener("dragstart", onNativeDrag);
  root.addEventListener("click", onClick);
  track.addEventListener("keydown", onKey);
  if (current) { const page = pages()[current]; if (page) track.scrollLeft = page.offsetLeft - track.offsetLeft; }
  sync();
  return {
    goTo,
    destroy() { cancelAnimationFrame(frame); clearTimeout(timer); track.removeEventListener("scroll", onScroll); track.removeEventListener("scrollend", settled); track.removeEventListener("pointerdown", onDragStart); track.removeEventListener("dragstart", onNativeDrag); onDragEnd({ timeStamp: 0 }); root.removeEventListener("click", onClick); track.removeEventListener("keydown", onKey); },
  };
}

/**
 * Binds every .x-pager under root.
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initPagers(root = document) {
  const pagers = [...root.querySelectorAll(".x-pager")].map((el) => bindPager(/** @type {HTMLElement} */ (el)));
  return () => pagers.forEach((pager) => pager.destroy());
}
