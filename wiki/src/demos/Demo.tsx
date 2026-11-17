import { useEffect, useRef, useState, type ReactNode } from "react"

import { Segmented } from "@protocol/components/segmented/segmented"
import { Switch } from "@protocol/components/switch/switch"
import { initSegmented } from "@protocol/components/segmented/segmented.controller.js"
import { initDialogs } from "@protocol/components/dialog/dialog.controller.js"
import { initMenus } from "@protocol/components/menu/menu.controller.js"
import { initTabs } from "@protocol/components/tabs/tabs.controller.js"
import { initAvatars } from "@protocol/components/avatar/avatar.controller.js"
import { initSelects } from "@protocol/components/select/select.controller.js"
import { initTables } from "@protocol/components/table/table.controller.js"
import { initTooltips } from "@protocol/components/tooltip/tooltip.controller.js"
import { initAlerts } from "@protocol/components/alert/alert.controller.js"
import { initSendForms } from "@protocol/blocks/send-form/send-form.controller.js"
import { initAccountSwitchers } from "@protocol/blocks/account-switcher/account-switcher.controller.js"

import "./demo.css"

type After = (root: HTMLElement) => (() => void) | void

/** Injects a component's HTML reference (scripts removed) and runs the vanilla controllers on it. */
function HtmlPane({ html, after }: { html: string; after?: After }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    root.innerHTML = html.replace(/<script[\s\S]*?<\/script>/g, "")
    initAvatars(root)
    // Blocks first: the account switcher binds its own menu before the generic menu init sees it.
    const cleanups = [
      initAccountSwitchers(root), initSendForms(root),
      initSegmented(root), initDialogs(root), initMenus(root), initTabs(root),
      initSelects(root), initTables(root), initTooltips(root), initAlerts(root), after?.(root),
    ]
    return () => cleanups.forEach((fn) => fn?.())
  }, [html, after])
  return <div ref={ref} className="wiki-demo-stage" data-layout="html" />
}

const htmlSourceOf = (html: string) =>
  html.replace(/<script[\s\S]*?<\/script>\s*/g, "").replace(/<!--[\s\S]*?-->\s*/g, "").trim()
// The example as it runs, with the wiki's alias for the protocol folder shown as a project path.
const reactSourceOf = (source: string) => source.replace(/@protocol\//g, "@/ui/").trim()

/**
 * A live demo of one component: the React version (an example file) and the HTML version (the catalog's
 * <id>.html with its vanilla controller), a per-demo reduced-motion switch, and the source of whichever
 * version is shown: the example file for React, the HTML reference for HTML.
 */
export function Demo({ react, html, source, after }: { react: ReactNode; html: string; source?: string; after?: After }) {
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
      {/* The code of the version shown: the example file for React, the HTML reference for HTML. */}
      <details className="wiki-demo-source" key={version}>
        <summary>
          View code
          <svg className="wiki-demo-chevron x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
        </summary>
        <pre><code>{version === "react" && source ? reactSourceOf(source) : htmlSourceOf(html)}</code></pre>
      </details>
    </div>
  )
}

/** A row of controls inside a demo. */
export const Row = ({ children }: { children: ReactNode }) => <div className="wiki-demo-row">{children}</div>
