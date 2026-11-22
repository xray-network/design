import { useEffect, useRef, useState } from "react"
import { Link } from "@rspress/core/theme"
import { Button } from "@protocol/components/button/button"

import { apps, blocks, charts, components, linkText, motion } from "../navigation"
import { appScreenPrompt } from "../prompts"
import "./showcase.css"

type AppId = (typeof apps)[number]["id"]
const NAMES: Record<string, { text: string; href: string }> = Object.fromEntries([
  ...components.map(({ id, text }) => [id, { text, href: `/components/${id}` }]),
  ...blocks.map(({ id, text }) => [id, { text, href: `/blocks/${id}` }]),
  ...motion.map(({ id, text }) => [id, { text, href: `/motion/${id}` }]),
  ...charts.map(({ id, text }) => [id, { text, href: `/charts/${id}` }]),
])

/** Where a screen is published: a static HTML page of the wiki, built on the kit's own CSS and controllers. */
/** An app is one page; the hash names the screen in view. */
export const appScreenPath = (app: string, file: string) => `/design/apps/${app}/index.html#${file}`
export const appScreenUrl = (app: string, file: string) => `https://wiki.xraynetwork.io${appScreenPath(app, file)}`

function CopyPrompt({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={async () => {
        try { await navigator.clipboard.writeText(prompt) } catch { return }
        setCopied(true)
        clearTimeout(timer.current)
        timer.current = setTimeout(() => setCopied(false), 1600)
      }}
    >
      {copied ? "Copied" : "Copy prompt"}
    </Button>
  )
}

/** What keeps its own gesture inside a screen: text entry, sliders, the kit's drag patterns. */
const OWN_GESTURE = "input, textarea, select, [contenteditable], .x-slider, .x-drag, .x-reorder, [draggable='true']"

/** True when the press is inside something that scrolls sideways on its own (a pager, a board, a row of chips). */
function inSidewaysScroller(target: Element, stop: Element) {
  for (let node: Element | null = target; node && node !== stop; node = node.parentElement) {
    if (node.scrollWidth > node.clientWidth + 1 && /auto|scroll/.test(getComputedStyle(node).overflowX)) return true
  }
  return false
}

/**
 * The screens row moves like a phone's: a finger swipes it natively; a mouse drags it sideways, from the gaps and
 * labels and from inside the screens too (the frames are on this origin, so their documents are listened to). A
 * press that moves up or down first stays with the app, and the click that ends a drag does nothing. On release the
 * row settles on the nearest screen. data-scroll names the sides with hidden screens, for the shades.
 */
function dragScreens(strip: HTMLElement) {
  const update = () => {
    const max = strip.scrollWidth - strip.clientWidth
    const sides = [strip.scrollLeft > 1 && "start", strip.scrollLeft < max - 1 && "end"].filter(Boolean).join(" ")
    if (sides) strip.dataset.scroll = sides
    else strip.removeAttribute("data-scroll")
  }

  let drag: { id: number; x: number; y: number; left: number; on: boolean; doc: Document; t: number; vx: number; lx: number } | null = null
  let settle: ReturnType<typeof setTimeout> | undefined
  const swallow = (event: Event) => { event.preventDefault(); event.stopPropagation() }

  const down = (doc: Document) => (event: PointerEvent) => {
    // A release that never arrived (outside the window): a new press ends the drag that is still open.
    if (drag) finish(0)
    if (event.pointerType !== "mouse" || event.button !== 0 || strip.scrollWidth <= strip.clientWidth + 1) return
    const target = event.target as Element
    if (doc === document && !strip.contains(target)) return
    const stop = doc === document ? strip : doc.documentElement
    if (target.closest?.(OWN_GESTURE) || inSidewaysScroller(target, stop)) return
    // Screen coordinates: the frame moves under the pointer while the row scrolls, so its own would drift.
    drag = { id: event.pointerId, x: event.screenX, y: event.screenY, left: strip.scrollLeft, on: false, doc, t: performance.now(), vx: 0, lx: event.screenX }
  }
  const move = (event: PointerEvent) => {
    if (!drag || event.pointerType !== "mouse") return
    // The button is up but the release never arrived: end the drag here.
    if (event.buttons === 0) { finish(0); return }
    const dx = event.screenX - drag.x
    const dy = event.screenY - drag.y
    if (!drag.on) {
      // Sideways from the first 3px: the row follows at once. Mostly up or down: the app's own scroll.
      if (Math.abs(dx) < 3 && Math.abs(dy) < 3) return
      if (Math.abs(dy) > Math.abs(dx)) { drag = null; return }
      drag.on = true
      clearTimeout(settle)
      strip.dataset.dragging = ""
      drag.doc.documentElement.style.userSelect = "none"
      // On the row itself, keep the pointer while it leaves the row. Inside a frame the browser already sends the
      // press's events to that frame.
      if (drag.doc === document) strip.setPointerCapture?.(drag.id)
    }
    // The press began a text selection before it became a drag; keep it empty while the row moves.
    drag.doc.getSelection()?.removeAllRanges()
    if (drag.doc !== document) document.getSelection()?.removeAllRanges()
    strip.scrollLeft = drag.left - dx
    // Speed over the last moves (px per ms), for a flick.
    const dt = performance.now() - drag.t
    if (dt > 0) drag.vx = drag.vx * 0.5 + ((event.screenX - drag.lx) / dt) * 0.5
    drag.t = performance.now()
    drag.lx = event.screenX
  }
  const up = (event: PointerEvent) => {
    if (!drag || event.pointerType !== "mouse") return
    // A pause before letting go is not a flick.
    finish(performance.now() - drag.t > 80 ? 0 : drag.vx)
  }
  const finish = (speed: number) => {
    if (!drag) return
    const { on, doc } = drag
    drag = null
    if (!on) return
    doc.documentElement.style.userSelect = ""
    doc.addEventListener("click", swallow, { capture: true, once: true })
    setTimeout(() => doc.removeEventListener("click", swallow, { capture: true }))
    // Settle on a screen. The stops are where each screen starts, within the row's reach: the last screens cannot
    // reach the left edge, so the row's end is a stop too (and a snap point, in the CSS).
    const max = strip.scrollWidth - strip.clientWidth
    const base = strip.getBoundingClientRect().left
    const stops = [...new Set([...strip.children].map((item) => Math.round(Math.min(max, Math.max(0, strip.scrollLeft + item.getBoundingClientRect().left - base)))).concat(max))].sort((a, b) => a - b)
    const at = strip.scrollLeft
    let to = stops.reduce((best, stop) => (Math.abs(stop - at) < Math.abs(best - at) ? stop : best), stops[0])
    // A flick goes on to the next screen in its direction, even when the row is still nearer the last one.
    if (Math.abs(speed) > 0.3) {
      const ahead = speed < 0 ? stops.find((stop) => stop > at + 1) : [...stops].reverse().find((stop) => stop < at - 1)
      if (ahead !== undefined) to = ahead
    }
    const done = () => { clearTimeout(settle); strip.removeEventListener("scrollend", done); strip.removeAttribute("data-dragging") }
    if (Math.abs(to - at) < 1) { done(); return }
    // Snapping stays off until the row has arrived, so it does not pull the row elsewhere on the way.
    strip.addEventListener("scrollend", done, { once: true })
    settle = setTimeout(done, 1000)
    strip.scrollTo({ left: to, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })
  }

  // A press on a link or an image would start the browser's own drag of it, which takes every later mouse event,
  // the release too. While a press may become a sideways drag, there is none.
  const dragstart = (event: Event) => { if (drag) event.preventDefault() }

  const docs = new Map<Document, EventListener>()
  const listen = (doc: Document) => {
    if (docs.has(doc)) return
    const press = down(doc) as EventListener
    docs.set(doc, press)
    doc.addEventListener("pointerdown", press)
    doc.addEventListener("pointermove", move as EventListener)
    doc.addEventListener("pointerup", up as EventListener)
    doc.addEventListener("pointercancel", up as EventListener)
    doc.addEventListener("dragstart", dragstart)
  }
  // The page (presses on the row: gaps, labels, buttons; moves and releases anywhere) and every frame once loaded.
  listen(document)
  const frames = [...strip.querySelectorAll("iframe")]
  const onLoad = (event: Event) => { const doc = (event.target as HTMLIFrameElement).contentDocument; if (doc) listen(doc) }
  for (const frame of frames) {
    frame.addEventListener("load", onLoad)
    if (frame.contentDocument?.readyState === "complete" && frame.contentDocument.URL !== "about:blank") listen(frame.contentDocument)
  }
  strip.addEventListener("scroll", update, { passive: true })
  const resize = new ResizeObserver(update)
  resize.observe(strip)
  update()

  return () => {
    clearTimeout(settle)
    resize.disconnect()
    strip.removeEventListener("scroll", update)
    for (const frame of frames) frame.removeEventListener("load", onLoad)
    for (const [doc, press] of docs) {
      doc.removeEventListener("pointerdown", press)
      doc.removeEventListener("pointermove", move as EventListener)
      doc.removeEventListener("pointerup", up as EventListener)
      doc.removeEventListener("pointercancel", up as EventListener)
      doc.removeEventListener("dragstart", dragstart)
    }
  }
}

/**
 * An app's screens side by side, each in its own scrolling frame: at phone size, or 640px wide for a desktop app. The row starts at the content's
 * left edge and runs to the right edge of the window, scrolling sideways. Every screen is a live static page:
 * "Open" shows it alone, and the prompt asks an agent to build the same screen in a project.
 */
export function AppShowcase({ id }: { id: AppId }) {
  const app = apps.find((a) => a.id === id)!
  const ref = useRef<HTMLDivElement>(null)
  const strip = useRef<HTMLUListElement>(null)
  useEffect(() => (strip.current ? dragScreens(strip.current) : undefined), [])

  // From the content's left edge to the window's right edge: the width depends on where the column starts.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => el.style.setProperty("--wiki-apps-width", `${Math.max(320, document.documentElement.clientWidth - el.getBoundingClientRect().left)}px`)
    fit()
    addEventListener("resize", fit)
    return () => removeEventListener("resize", fit)
  }, [])

  return (
    <div ref={ref} className="wiki-apps rp-not-doc" data-form={app.form}>
      <ul ref={strip} className="wiki-apps-strip" aria-label={`${app.text} screens`}>
        {app.screens.map((screen) => (
          <li key={screen.file} className="wiki-app">
            <div className="wiki-app-frame">
              <iframe src={appScreenPath(app.id, screen.file)} title={`${app.text}: ${screen.text}`} loading="lazy" />
            </div>
            <div className="wiki-app-foot">
              <strong>{screen.text}</strong>
              <a className="x-button" data-variant="ghost" data-size="sm" href={appScreenPath(app.id, screen.file)} target="_blank" rel="noreferrer">Open</a>
              <CopyPrompt prompt={appScreenPrompt(app.text, screen.text, appScreenUrl(app.id, screen.file))} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Under an app's description: the kit parts its screens are built from, each a link to its page. */
export function AppParts({ id }: { id: AppId }) {
  const app = apps.find((a) => a.id === id)!
  return (
    <section className="wiki-showcase-parts wiki-apps-parts rp-not-doc" aria-label={`Parts of ${app.text}`}>
      <h2 className="wiki-showcase-parts-title">Built from</h2>
      <ul>
        {app.uses.map((part) => (
          <li key={part}><Link className="wiki-showcase-part" href={NAMES[part].href}>{linkText(NAMES[part].text)}</Link></li>
        ))}
      </ul>
    </section>
  )
}

// The home page's wall of screens: four columns, each a stack of screens, alternate columns shifted for a
// masonry look. The wall is static, the screens are live: each scrolls and takes taps inside its own frame.
const WALL: { app: AppId; file: string; height: number }[][] = [
  [{ app: "gramainst", file: "feed", height: 560 }, { app: "maskmeta", file: "wallet", height: 440 }],
  [{ app: "gramatel", file: "chats", height: 420 }, { app: "tifyspo", file: "home", height: 580 }],
  [{ app: "nancbin", file: "trade", height: 600 }, { app: "mailg", file: "inbox", height: 400 }],
  [{ app: "bnbair", file: "explore", height: 460 }, { app: "gramatel", file: "chat", height: 540 }],
  [{ app: "tertwit", file: "home", height: 520 }, { app: "tifyspo", file: "player", height: 480 }],
]

export function HomeScreens() {
  return (
    <section className="spectre-screens" aria-labelledby="screens-title">
      <div className="spectre-section-heading">
        <div><span className="spectre-eyebrow">Showcase</span><h2 id="screens-title" data-outline>Whole apps from the same kit</h2></div>
        <Link className="spectre-text-link" href="/showcase/">All screens <span aria-hidden="true">↗</span></Link>
      </div>
      <p>Familiar apps rebuilt as plain HTML on the kit's components, blocks and motion. They are live: scroll, tap and switch tabs.</p>
      <div className="spectre-screens-wall">
        {WALL.map((column, c) => (
          <div key={c} className="spectre-screens-column">
            {column.map((screen) => {
              const app = apps.find((a) => a.id === screen.app)!
              const name = app.screens.find((s) => s.file === screen.file)?.text
              return (
                <div key={screen.file} className="spectre-screen" style={{ height: screen.height }}>
                  <iframe src={appScreenPath(app.id, screen.file)} title={`${app.text}: ${name}`} loading="lazy" />
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
