import { useState, type ReactNode } from "react"

import { Switch } from "@protocol/components/switch/switch"
import { componentPrompt, type DemoEntry } from "../prompts"
import { PromptCard } from "./PromptCard"

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
  /** Adds a Loading switch next to Reduce motion (true: off at first, "on": on at first); the example gets its state. */
  loading?: boolean | "on"
  children: ReactNode | ((state: { loading: boolean }) => ReactNode)
}) {
  const [reduce, setReduce] = useState(false)
  const [loading, setLoading] = useState(loadingSwitch === "on")

  return (
    <div className="wiki-demo rp-not-doc" data-motion={reduce ? "reduce" : undefined}>
        <div className="wiki-demo-bar">
          <h2 className="wiki-demo-prompt-title">Preview</h2>
          <div className="wiki-demo-switches">
            {loadingSwitch && <Switch size="sm" checked={loading} onChange={(event) => setLoading(event.target.checked)}>Loading</Switch>}
            <Switch size="sm" checked={reduce} onChange={(event) => setReduce(event.target.checked)}>Reduce motion</Switch>
          </div>
        </div>
        <div className="wiki-demo-stage">{typeof children === "function" ? children({ loading }) : children}</div>
        <PromptCard
          label={`Prompt for ${name}`}
          build={(preference) => componentPrompt({ id, name, kind }, preference)}
          source={{ href: `https://github.com/xray-network/design/tree/main/protocol/${kind}s/${id}`, label: `Reference source for ${name}` }}
        />
      </div>
  )
}

/** A row of controls inside a demo. */
export const Row = ({ children }: { children: ReactNode }) => <div className="wiki-demo-row">{children}</div>
