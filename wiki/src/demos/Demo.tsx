import { useEffect, useRef, useState, type ReactNode } from "react"

import { Segmented } from "@kit/components/segmented/segmented"
import { Switch } from "@kit/components/switch/switch"
import { initSegmented } from "@kit/components/segmented/segmented.controller.js"
import { initDialogs } from "@kit/components/dialog/dialog.controller.js"
import { initMenus } from "@kit/components/menu/menu.controller.js"

import "./demo.css"

type After = (root: HTMLElement) => (() => void) | void

/** Injects a component's HTML reference (scripts removed) and runs the vanilla controllers on it. */
function HtmlPane({ html, after }: { html: string; after?: After }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    root.innerHTML = html.replace(/<script[\s\S]*?<\/script>/g, "")
    const cleanups = [initSegmented(root), initDialogs(root), initMenus(root), after?.(root)]
    return () => cleanups.forEach((fn) => fn?.())
  }, [html, after])
  return <div ref={ref} className="wiki-demo-stage" data-layout="html" />
}

const sourceOf = (html: string) =>
  html.replace(/<script[\s\S]*?<\/script>\s*/g, "").replace(/<!--[\s\S]*?-->\s*/g, "").trim()

/**
 * A live demo of one component: the React version and the HTML version (the catalog's <id>.html with
 * its vanilla controller), a per-demo reduced-motion switch, and the HTML source.
 */
export function Demo({ react, html, after }: { react: ReactNode; html: string; after?: After }) {
  const [version, setVersion] = useState<"react" | "html">("react")
  const [reduce, setReduce] = useState(false)

  return (
    <div className="wiki-demo rp-not-doc" data-motion={reduce ? "reduce" : undefined}>
      <div className="wiki-demo-bar">
        <Segmented
          aria-label="Version"
          size="sm"
          value={version}
          onValueChange={setVersion}
          options={[{ value: "react", label: "React" }, { value: "html", label: "HTML" }]}
        />
        <Switch size="sm" checked={reduce} onChange={(e) => setReduce(e.target.checked)}>Reduce motion</Switch>
      </div>
      {version === "react" ? <div className="wiki-demo-stage">{react}</div> : <HtmlPane html={html} after={after} />}
      <details className="wiki-demo-source">
        <summary>HTML source</summary>
        <pre><code>{sourceOf(html)}</code></pre>
      </details>
    </div>
  )
}

/** A row of controls inside a demo. */
export const Row = ({ children }: { children: ReactNode }) => <div className="wiki-demo-row">{children}</div>
