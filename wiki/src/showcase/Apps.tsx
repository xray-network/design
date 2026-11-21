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

/**
 * An app's screens side by side, each in its own scrolling frame: at phone size, or 640px wide for a desktop app. The row starts at the content's
 * left edge and runs to the right edge of the window, scrolling sideways. Every screen is a live static page:
 * "Open" shows it alone, and the prompt asks an agent to build the same screen in a project.
 */
export function AppShowcase({ id }: { id: AppId }) {
  const app = apps.find((a) => a.id === id)!
  const ref = useRef<HTMLDivElement>(null)

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
      <ul className="wiki-apps-strip" aria-label={`${app.text} screens`}>
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
