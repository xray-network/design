// Shared by every showcase app: starts the kit controllers a page uses, draws icons and art by name, and keeps the
// page in the wiki's theme while it is framed there (opened on its own, it follows the device).
import { avatarSvg, initAvatars } from "../kit/components/avatar/avatar.controller.js";
import * as icons from "../kit/components/icon/icons.js";
import { initAmounts } from "../kit/components/input-amount/input-amount.controller.js";
import { initSegmented } from "../kit/components/segmented/segmented.controller.js";
import { initPosts } from "../kit/blocks/post/post.controller.js";
import { initSwaps } from "../kit/blocks/swap/swap.controller.js";
import { initLiquidIndicators } from "../kit/motion/liquid-indicator/liquid-indicator.controller.js";

// Theme: the wiki's, while inside its frame.
const framed = (() => { try { return parent !== window && !!parent.document; } catch { return false; } })();
if (framed) {
  const sync = () => { document.documentElement.dataset.theme = parent.document.documentElement.classList.contains("dark") ? "dark" : "light"; };
  sync();
  new MutationObserver(sync).observe(parent.document.documentElement, { attributes: true, attributeFilter: ["class"] });
}

// <svg class="x-icon" data-icon="heart"></svg> draws the kit icon of that name.
const byName = new Map(Object.values(icons).filter((i) => i && typeof i === "object" && "body" in i).map((i) => [i.name, i]));
for (const svg of document.querySelectorAll("svg[data-icon]")) {
  const icon = byName.get(svg.dataset.icon);
  if (!icon) continue;
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.innerHTML = icon.body;
}

// <span class="app-art" data-art="seed" data-palette="cool"></span> is abstract art from the Avatar's generator.
for (const el of document.querySelectorAll("[data-art]")) {
  el.innerHTML = avatarSvg(el.dataset.art, el.dataset.palette).replace("<svg ", '<svg preserveAspectRatio="xMidYMid slice" ');
}

initAvatars();
initSegmented();
initLiquidIndicators();
initPosts();
initAmounts();
initSwaps();

// Posts: a like changes its count with it.
document.addEventListener("toggle", (event) => {
  const action = event.target.querySelector?.(`.x-post-action[data-action="${event.detail?.action}"]`);
  const count = action?.querySelector("span");
  if (!count || !/^\d+$/.test(count.textContent)) return;
  count.textContent = String(Number(count.textContent) + (event.detail.pressed ? 1 : -1));
});

// Chat: sending adds the message to the thread.
for (const chat of document.querySelectorAll(".x-chat")) {
  const form = chat.querySelector(".x-chat-composer"), input = form?.querySelector("input"), send = form?.querySelector("button"), thread = chat.querySelector(".x-chat-thread");
  if (!form || !input || !thread) continue;
  thread.scrollTop = thread.scrollHeight;
  input.addEventListener("input", () => { if (send) send.disabled = !input.value.trim(); });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    const time = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    const item = document.createElement("li");
    item.className = "x-chat-message";
    item.dataset.from = "me";
    item.innerHTML = '<div class="x-chat-bubble"><p><span class="x-chat-you">You: </span></p></div><span class="x-chat-meta"></span>';
    item.querySelector("p").append(text);
    item.querySelector(".x-chat-meta").textContent = `${time} · Sent`;
    thread.append(item);
    input.value = "";
    if (send) send.disabled = true;
    thread.scrollTop = thread.scrollHeight;
  });
}
