/**
 * MenuNavigation behavior, shared by the HTML version (initMenuNavigations) and React (bindMenuNavigation).
 *
 *   <nav class="x-menu-navigation" aria-label="Main">
 *     <ul class="x-menu-navigation-list"><li><button class="x-menu-navigation-trigger" aria-controls="nav-products">…</button></li></ul>
 *     <div class="x-menu-navigation-viewport"><div class="x-menu-navigation-panel" id="nav-products" hidden>…</div></div>
 *   </nav>
 *
 * Click (or Enter/Space) opens a trigger's panel; while open, hovering or focusing another trigger switches to it,
 * and the new panel slides in from that side (data-motion). The viewport follows the trigger (--x-menu-navigation-x)
 * and takes the panel's size (--x-menu-navigation-w/-h). Esc, outside click and tabbing out close it.
 * data-trigger="hover" on the nav: pointing at a trigger opens its panel, and leaving the nav closes it after a
 * short pause; click and keyboard still work.
 *
 * @param {HTMLElement} nav
 * @returns {() => void} cleanup
 */
export function bindMenuNavigation(nav) {
  const viewport = /** @type {HTMLElement | null} */ (nav.querySelector(".x-menu-navigation-viewport"));
  const triggers = () => /** @type {HTMLElement[]} */ ([...nav.querySelectorAll(".x-menu-navigation-list .x-menu-navigation-trigger")]);
  const panelOf = (trigger) => {
    const id = trigger.getAttribute("aria-controls");
    return id ? /** @type {HTMLElement | null} */ (nav.querySelector(`#${CSS.escape(id)}`)) : null;
  };
  /** @type {HTMLElement | null} */
  let current = null;

  for (const t of triggers()) if (panelOf(t)) t.setAttribute("aria-expanded", "false");

  const place = (trigger, panel) => {
    if (!viewport) return;
    const w = panel.offsetWidth, h = panel.offsetHeight;
    // Where the trigger is now, the row's scroll included.
    const left = trigger.getBoundingClientRect().left - nav.getBoundingClientRect().left;
    const max = nav.clientWidth > 0 ? Math.max(0, Math.min(left, innerWidth - nav.getBoundingClientRect().left - w - 16)) : left;
    viewport.style.setProperty("--x-menu-navigation-w", `${w}px`);
    viewport.style.setProperty("--x-menu-navigation-h", `${h}px`);
    viewport.style.setProperty("--x-menu-navigation-x", `${Math.round(max)}px`);
  };

  const open = (trigger) => {
    const panel = panelOf(trigger);
    if (!panel || !viewport || trigger === current) return;
    const list = triggers();
    const previous = current;
    if (previous) {
      previous.setAttribute("aria-expanded", "false");
      const old = panelOf(previous);
      if (old) { old.hidden = true; delete old.dataset.motion; }
    }
    panel.hidden = false;
    if (previous) panel.dataset.motion = list.indexOf(trigger) > list.indexOf(previous) ? "from-end" : "from-start";
    else delete panel.dataset.motion;
    trigger.setAttribute("aria-expanded", "true");
    current = trigger;
    if (!previous) {
      viewport.dataset.open = "placing";
      place(trigger, panel);
      requestAnimationFrame(() => requestAnimationFrame(() => { if (current) viewport.dataset.open = ""; }));
    } else place(trigger, panel);
  };

  const close = ({ focus = false } = {}) => {
    if (!current || !viewport) return;
    const trigger = current;
    trigger.setAttribute("aria-expanded", "false");
    const panel = panelOf(trigger);
    if (panel) { panel.hidden = true; delete panel.dataset.motion; }
    delete viewport.dataset.open;
    current = null;
    if (focus) trigger.focus();
  };

  const triggerFrom = (target) => {
    const t = /** @type {Element} */ (target).closest(".x-menu-navigation-trigger");
    return t && nav.contains(t) ? /** @type {HTMLElement} */ (t) : null;
  };

  const onClick = (event) => {
    const t = triggerFrom(event.target);
    if (t && panelOf(t)) {
      if (t === current && !hover()) close();
      else if (t === current) return;
      else open(t);
      return;
    }
    if (/** @type {Element} */ (event.target).closest(".x-menu-navigation-link")) close();
  };
  const hover = () => nav.dataset.trigger === "hover";
  let leaveTimer = 0;
  const onPointerOver = (event) => {
    clearTimeout(leaveTimer);
    const t = triggerFrom(event.target);
    if ((current || hover()) && t && t !== current) panelOf(t) ? open(t) : close();
  };
  const onPointerLeave = (event) => {
    if (!hover() || event.pointerType === "touch") return;
    clearTimeout(leaveTimer);
    leaveTimer = setTimeout(() => close(), 150);
  };
  const onFocusIn = (event) => {
    const t = triggerFrom(event.target);
    if (current && t && t !== current && panelOf(t)) open(t);
  };
  const onFocusOut = (event) => {
    if (current && !nav.contains(/** @type {Node | null} */ (event.relatedTarget))) close();
  };
  const onKeydown = (event) => {
    if (event.key === "Escape" && current) { event.preventDefault(); close({ focus: true }); return; }
    const t = triggerFrom(event.target);
    if (!t || (event.key !== "ArrowRight" && event.key !== "ArrowLeft")) return;
    const list = triggers();
    const next = list[(list.indexOf(t) + (event.key === "ArrowRight" ? 1 : -1) + list.length) % list.length];
    event.preventDefault();
    next?.focus();
  };
  const onDocPointer = (event) => {
    if (current && !nav.contains(/** @type {Node} */ (event.target))) close();
  };
  const onResize = () => { if (current) { const p = panelOf(current); if (p) place(current, p); } };

  nav.addEventListener("click", onClick);
  nav.addEventListener("pointerover", onPointerOver);
  nav.addEventListener("pointerleave", onPointerLeave);
  nav.addEventListener("focusin", onFocusIn);
  nav.addEventListener("focusout", onFocusOut);
  nav.addEventListener("keydown", onKeydown);
  document.addEventListener("pointerdown", onDocPointer);
  addEventListener("resize", onResize);

  return () => {
    nav.removeEventListener("click", onClick);
    nav.removeEventListener("pointerover", onPointerOver);
    nav.removeEventListener("pointerleave", onPointerLeave);
    clearTimeout(leaveTimer);
    nav.removeEventListener("focusin", onFocusIn);
    nav.removeEventListener("focusout", onFocusOut);
    nav.removeEventListener("keydown", onKeydown);
    document.removeEventListener("pointerdown", onDocPointer);
    removeEventListener("resize", onResize);
  };
}

/**
 * Binds every .x-menu-navigation under root.
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initMenuNavigations(root = document) {
  const cleanups = [...root.querySelectorAll(".x-menu-navigation:not([data-x-ready])")].map((nav) => {
    nav.setAttribute("data-x-ready", "");
    return bindMenuNavigation(/** @type {HTMLElement} */ (nav));
  });
  return () => cleanups.forEach((fn) => fn());
}
