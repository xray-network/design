import { useState, type ReactNode } from "react"

import { Link } from "@rspress/core/theme"
import { Switch } from "@protocol/components/switch/switch"
import { componentPrompt, kitPath, type DemoEntry } from "../prompts"
import { PromptCard } from "./PromptCard"
import { useUserTheme } from "../theme/useUserTheme"
import { isDefault } from "../theme/userTheme"

import "./demo.css"

/** One interactive visual reference on the kit's own canvas, then a prompt for the project's chosen GUI framework. */
export function Demo({
  id,
  name,
  kind = "component",
  loading: loadingSwitch,
  children,
}: Omit<DemoEntry, "kind"> & {
  kind?: DemoEntry["kind"]
  /** Adds a Loading switch next to Motion (true: off at first, "on": on at first); the example gets its state. */
  loading?: boolean | "on"
  children: ReactNode | ((state: { loading: boolean }) => ReactNode)
}) {
  // Motion is on: the switch turns it off, the way reduced motion would.
  const [motion, setMotion] = useState(true)
  const [loading, setLoading] = useState(loadingSwitch === "on")
  // Previews take the reader's theme from the Theming page; the bar says so, with the way back to it.
  const [theme] = useUserTheme()
  const themed = !isDefault(theme)

  return (
    <div className="wiki-demo rp-not-doc" data-motion={motion ? undefined : "reduce"}>
        <div className="wiki-demo-bar">
          <h2 className="wiki-demo-prompt-title">Preview</h2>
          <div className="wiki-demo-switches">
            {themed && <Link className="wiki-demo-theme" href="/theming">Your theme</Link>}
            {loadingSwitch && <Switch size="sm" checked={loading} onChange={(event) => setLoading(event.target.checked)}>Loading</Switch>}
            <Switch size="sm" checked={motion} onChange={(event) => setMotion(event.target.checked)}>Motion</Switch>
          </div>
        </div>
        <div className="wiki-demo-stage">{typeof children === "function" ? children({ loading }) : children}</div>
        <PromptCard
          label={`Prompt for ${name}`}
          build={(preference) => componentPrompt({ id, name, kind }, preference)}
          source={{ href: `https://github.com/xray-network/design/tree/main/protocol/${kitPath({ id, kind })}`, label: `Reference source for ${name}` }}
        />
      </div>
  )
}

/** A row of controls inside a demo. */
export const Row = ({ children }: { children: ReactNode }) => <div className="wiki-demo-row">{children}</div>
