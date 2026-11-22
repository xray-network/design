// Shared by every showcase app. An app is one HTML file: its screens are sections, shown by the hash
// (index.html#trade). This script moves between them with the kit's Screen pattern, starts the kit controllers the
// screens use, draws icons and art by name, and keeps the page in the wiki's theme while it is framed there
// (opened on its own, it follows the device).
import { avatarSvg, initAvatars } from "../kit/components/avatar/avatar.controller.js";
import { initCalendars } from "../kit/components/calendar/calendar.controller.js";
import { initCopies } from "../kit/components/copy/copy.controller.js";
import * as crypto from "../kit/components/icon/crypto.js";
import * as icons from "../kit/components/icon/icons.js";
import { initAmounts } from "../kit/components/input-amount/input-amount.controller.js";
import { initSegmented } from "../kit/components/segmented/segmented.controller.js";
import { initSliders } from "../kit/components/slider/slider.controller.js";
import { initComposers } from "../kit/blocks/composer/composer.controller.js";
import { initStories } from "../kit/blocks/stories/stories.controller.js";
import { scrollStrip } from "../kit/core/motion.js";
import { initPosts } from "../kit/blocks/post/post.controller.js";
import { initSendForms } from "../kit/blocks/send-form/send-form.controller.js";
import { initSwaps } from "../kit/blocks/swap/swap.controller.js";
import { bindBarChart } from "../kit/charts/bar-chart/bar-chart.controller.js";
import { initBarLists } from "../kit/charts/bar-list/bar-list.controller.js";
import { initCandlestickCharts } from "../kit/charts/candlestick-chart/candlestick-chart.controller.js";
import { initDepthCharts } from "../kit/charts/depth-chart/depth-chart.controller.js";
import { initDonutCharts } from "../kit/charts/donut-chart/donut-chart.controller.js";
import { initFunnelCharts } from "../kit/charts/funnel-chart/funnel-chart.controller.js";
import { initHeatmaps } from "../kit/charts/heatmap/heatmap.controller.js";
import { bindLineChart } from "../kit/charts/line-chart/line-chart.controller.js";
import { initShareBars } from "../kit/charts/share-bar/share-bar.controller.js";
import { initSparklines } from "../kit/charts/sparkline/sparkline.controller.js";
import { initStackedAreaCharts } from "../kit/charts/stacked-area-chart/stacked-area-chart.controller.js";
import { bindStackedBarChart } from "../kit/charts/stacked-bar-chart/stacked-bar-chart.controller.js";
import { initStatusStrips } from "../kit/charts/status-strip/status-strip.controller.js";
import { bindTreemap } from "../kit/charts/treemap/treemap.controller.js";
import { initExpands } from "../kit/motion/expand/expand.controller.js";
import { bindLiquidIndicator } from "../kit/motion/liquid-indicator/liquid-indicator.controller.js";
import { initPagers } from "../kit/motion/pager/pager.controller.js";
import { screenTransition } from "../kit/motion/screen/screen.controller.js";

// Theme: the wiki's, while inside its frame.
const framed = (() => { try { return parent !== window && !!parent.document; } catch { return false; } })();
if (framed) {
  const sync = () => { document.documentElement.dataset.theme = parent.document.documentElement.classList.contains("dark") ? "dark" : "light"; };
  sync();
  new MutationObserver(sync).observe(parent.document.documentElement, { attributes: true, attributeFilter: ["class"] });
}

// <svg class="x-icon" data-icon="heart"></svg> draws the kit icon of that name: an interface icon, or a crypto one.
const byName = new Map([...Object.values(crypto), ...Object.values(icons)].filter((i) => i && typeof i === "object" && "body" in i).map((i) => [i.name, i]));
const draw = (svg) => {
  const icon = byName.get(svg.dataset.icon);
  if (!icon) return;
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  // .x-icon gets its stroke from icon.css; anything else (the Menu List chevron) is drawn the same way here.
  if (!svg.classList.contains("x-icon")) {
    for (const [name, value] of [["fill", "none"], ["stroke", "currentColor"], ["stroke-width", "2"], ["stroke-linecap", "round"], ["stroke-linejoin", "round"]]) svg.setAttribute(name, value);
  }
  svg.innerHTML = icon.body;
};
for (const svg of document.querySelectorAll("svg[data-icon]")) draw(svg);

// <span class="app-art" data-art="seed" data-palette="cool"></span> is abstract art from the Avatar's generator.
for (const el of document.querySelectorAll("[data-art]")) {
  el.innerHTML = avatarSvg(el.dataset.art, el.dataset.palette).replace("<svg ", '<svg preserveAspectRatio="xMidYMid slice" ');
}

// Every screen is in the document from the start, so the controllers start once, for all of them. A chart draws
// itself when its screen first has a size.
const money = (value) => "$" + new Intl.NumberFormat("en-US", { notation: Math.abs(value) >= 10000 ? "compact" : "standard", maximumFractionDigits: 1 }).format(value);
const cap = (billions) => (billions >= 1000 ? `$${(billions / 1000).toFixed(1)}T` : `$${billions}B`);
const each = (selector, bind, format = money, flag = "data-money") => { for (const figure of document.querySelectorAll(selector)) bind(figure, figure.hasAttribute(flag) ? { format } : undefined); };
for (const start of [initAvatars, initSegmented, initPosts, initAmounts, initSwaps, initSendForms, initExpands, initSliders, initCopies, initCalendars, initPagers, initComposers, initStories,
  initSparklines, initDonutCharts, initBarLists, initCandlestickCharts, initDepthCharts, initFunnelCharts, initHeatmaps, initShareBars, initStackedAreaCharts, initStatusStrips]) start();
each(".x-line-chart", bindLineChart);
each(".x-bar-chart", bindBarChart);
each(".x-stacked-bar-chart", bindStackedBarChart);
each(".x-treemap", bindTreemap, cap, "data-cap");
const indicators = [...document.querySelectorAll(".x-liquid-indicator")].map((nav) => bindLiquidIndicator(nav));
// The app's own sideways rows (chips, cards) drag and shade like the kit's.
for (const row of document.querySelectorAll(".app-chips, .app-cards")) scrollStrip(row);

// ---- Screens. The hash names the one in view. Tabs are links to hashes, so the browser's back button, a link
// from outside and a frame's src all land on the right screen, and moving between them never loads a page.
const screens = [...document.querySelectorAll(".app-views > .x-screen")];
const tabs = [...document.querySelectorAll(".x-tab-bar .x-liquid-indicator-item, .x-top-bar-nav .x-liquid-indicator-item")];
const tabIds = tabs.map((tab) => tab.hash.slice(1));
const find = (id) => screens.find((screen) => screen.dataset.screen === id);
let current = screens.find((screen) => !screen.hidden) ?? screens[0];

function show(id, animate) {
  const to = find(id) ?? screens[0];
  if (!to || to === current) return;
  const from = current;
  current = to;
  // Between tabs it is a fade; into a screen that is not a tab it is forward, and out of one, back.
  const direction = tabIds.includes(to.dataset.screen) ? (tabIds.includes(from.dataset.screen) ? "fade" : "back") : "forward";
  to.hidden = false;
  for (const screen of screens) if (screen !== to && screen !== from) screen.hidden = true;
  // The tab of the screen in view, or of the tab it belongs to (a conversation belongs to Chats).
  const tabId = to.dataset.tab ?? to.dataset.screen;
  for (const tab of tabs) { if (tab.hash.slice(1) === tabId) tab.setAttribute("aria-current", "page"); else tab.removeAttribute("aria-current"); }
  document.body.toggleAttribute("data-deep", !tabIds.includes(to.dataset.screen));
  for (const indicator of indicators) indicator.update();
  if (!animate) { from.hidden = true; return; }
  to.focus({ preventScroll: true });
  screenTransition(from, to, { direction }).then(() => { if (current !== from) from.hidden = true; });
}
addEventListener("hashchange", () => show(location.hash.slice(1), true));
if (location.hash) show(location.hash.slice(1), false);
// Links that only stand for a place the demo does not have go nowhere.
document.addEventListener("click", (event) => { if (event.target.closest?.('a[href="#"]')) event.preventDefault(); });

// ---- What the blocks ask the app to do. A real app would talk to its server here.

// Posts: a like changes its count with it.
document.addEventListener("toggle", (event) => {
  const action = event.target.querySelector?.(`.x-post-action[data-action="${event.detail?.action}"]`);
  const count = action?.querySelector("span");
  if (!count || !/^\d+$/.test(count.textContent)) return;
  count.textContent = String(Number(count.textContent) + (event.detail.pressed ? 1 : -1));
});

// Composer: under Comments a new comment joins the thread; anywhere else the box just clears.
document.addEventListener("post", (event) => {
  const list = event.target.closest(".x-comments")?.querySelector(".x-comments-list");
  if (!list) return;
  const item = document.createElement("li");
  item.className = "x-comments-item";
  item.innerHTML = '<span class="x-avatar" data-seed="you" data-palette="amber" aria-hidden="true"></span><div class="x-comments-body"><div class="x-comments-head"><span class="x-comments-author">You</span><time class="x-comments-time">Just now</time></div><div class="x-comments-text"><p></p></div></div>';
  item.querySelector("p").textContent = event.detail.text;
  list.append(item);
  initAvatars(item);
});

// Player: play and pause swap, and a like stays pressed.
document.addEventListener("click", (event) => {
  const play = event.target.closest?.(".x-player-play");
  if (play) {
    const playing = play.getAttribute("aria-label") === "Pause";
    for (const button of document.querySelectorAll(".x-player-play")) {
      button.setAttribute("aria-label", playing ? "Play" : "Pause");
      const svg = button.querySelector("svg");
      svg.dataset.icon = playing ? "play" : "pause";
      draw(svg);
    }
  }
  const pressed = event.target.closest?.(".x-player .x-icon-button[aria-pressed]");
  if (pressed) pressed.setAttribute("aria-pressed", String(pressed.getAttribute("aria-pressed") !== "true"));
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
