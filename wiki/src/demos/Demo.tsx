import { useEffect, useRef, useState, type ReactNode } from "react"

import { Button } from "@protocol/components/button/button"
import { Input } from "@protocol/components/field/field"
import { Segmented } from "@protocol/components/segmented/segmented"
import { Select } from "@protocol/components/select/select"
import { Switch } from "@protocol/components/switch/switch"
import { componentPrompt, moreGuiTargets, primaryGuiTargets, type DemoEntry } from "../prompts"
import { useGuiPreference } from "./useGuiPreference"

import "./demo.css"

/** One interactive visual reference and a prompt for the project's chosen GUI framework. */
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
  const [preference, setPreference] = useGuiPreference()
  const [copyState, setCopyState] = useState<"idle" | "copying" | "copied" | "error">("idle")
  const targetRef = useRef<HTMLDivElement>(null)
  const copyRequest = useRef(0)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const primary = primaryGuiTargets.some((target) => target.value === preference.target)
  const prompt = componentPrompt({ id, name, kind }, preference)
  const source = `https://github.com/xray-network/design/tree/main/protocol/${kind}s/${id}`

  useEffect(() => {
    const group = targetRef.current?.querySelector<HTMLElement>(".x-segmented")
    if (!group) return
    const revealSelection = () => {
      const selected = group.querySelector<HTMLElement>(".x-segmented-item:has(input:checked)")
      if (!selected) return
      if (selected.offsetLeft < group.scrollLeft) group.scrollLeft = selected.offsetLeft
      else if (selected.offsetLeft + selected.offsetWidth > group.scrollLeft + group.clientWidth) {
        group.scrollLeft = selected.offsetLeft + selected.offsetWidth - group.clientWidth
      }
    }
    revealSelection()
    const resize = new ResizeObserver(revealSelection)
    resize.observe(group)
    return () => resize.disconnect()
  }, [preference.target])

  useEffect(() => {
    setCopyState("idle")
    return () => {
      copyRequest.current++
      clearTimeout(timer.current)
    }
  }, [prompt])

  const copy = async () => {
    const request = ++copyRequest.current
    clearTimeout(timer.current)
    setCopyState("copying")
    try {
      await navigator.clipboard.writeText(prompt)
      if (request !== copyRequest.current) return
      setCopyState("copied")
      timer.current = setTimeout(() => setCopyState("idle"), 3000)
    } catch {
      if (request === copyRequest.current) setCopyState("error")
    }
  }

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
      <section className="wiki-demo-prompt" aria-label={`Use ${name} ${kind}`}>
        <div className="wiki-demo-prompt-heading">
          <h2 className="wiki-demo-prompt-title">Generate for</h2>
          <a className="wiki-demo-reference" href={source} target="_blank" rel="noreferrer" aria-label={`Reference source for ${name}`}>
            Reference source <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="wiki-demo-target" ref={targetRef}>
          <Segmented
            aria-label="Generate for"
            size="sm"
            value={primary ? preference.target : "more"}
            onValueChange={(target) => setPreference({ ...preference, target: target === "more" ? "flutter" : target as typeof preference.target })}
            options={[...primaryGuiTargets, { value: "more", label: "More" }]}
          />
        </div>
        {!primary && (
          <div className="wiki-demo-more">
            <Select
              aria-label="More GUI frameworks"
              size="sm"
              value={preference.target}
              options={[...moreGuiTargets]}
              onValueChange={(target) => setPreference({ ...preference, target })}
            />
            {preference.target === "custom" && (
              <Input
                size="sm"
                aria-label="GUI framework"
                placeholder="Enter your framework"
                value={preference.custom}
                onChange={(event) => setPreference({ ...preference, custom: event.target.value })}
              />
            )}
          </div>
        )}
        <p className="wiki-demo-note">Your framework selection applies to the prompt.</p>
        {prompt ? (
          <pre className="wiki-demo-prompt-text" tabIndex={0} aria-label={`Prompt for ${name}`}><code>{prompt}</code></pre>
        ) : (
          <p className="wiki-demo-note">Enter a framework to generate your prompt.</p>
        )}
        <div className="wiki-demo-prompt-actions">
          <Button variant="ghost" size="sm" onClick={copy} disabled={!prompt || copyState === "copying"}>
            <span role="status" aria-live="polite">{copyState === "copied" ? "Prompt copied" : copyState === "copying" ? "Copying…" : "Copy prompt"}</span>
          </Button>
          {copyState === "error" && <p className="wiki-demo-copy-error" role="status">Copy failed. Select the prompt and copy it manually.</p>}
        </div>
      </section>
    </div>
  )
}

/** A row of controls inside a demo. */
export const Row = ({ children }: { children: ReactNode }) => <div className="wiki-demo-row">{children}</div>
