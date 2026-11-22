import { useEffect, useRef, useState } from "react"

import { Button } from "@protocol/components/button/button"
import { Input } from "@protocol/components/input/input"
import { Segmented } from "@protocol/components/segmented/segmented"
import { Select } from "@protocol/components/select/select"
import { moreGuiTargets, primaryGuiTargets } from "../prompts"
import { useGuiPreference } from "./useGuiPreference"

import "./demo.css"

/**
 * The prompt under a preview, in the wiki's own style (not the kit's): the showcase prompt's container (the brand
 * band, a mono title bar, the prompt as plain mono text), with the GUI framework to generate for and a copy button. `build` turns the chosen framework into the prompt
 * (an empty string when there is nothing to send yet, with `empty` saying why).
 */
export function PromptCard({
  label,
  build,
  empty = "Enter a framework to generate your prompt.",
  source,
}: {
  label: string
  build: (preference: ReturnType<typeof useGuiPreference>[0]) => string
  empty?: string
  source?: { href: string; label: string }
}) {
  const [preference, setPreference] = useGuiPreference()
  const [copyState, setCopyState] = useState<"idle" | "copying" | "copied" | "error">("idle")
  const targetRef = useRef<HTMLDivElement>(null)
  const copyRequest = useRef(0)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const primary = primaryGuiTargets.some((target) => target.value === preference.target)
  const prompt = build(preference)

  // Keep the chosen framework in view when the switch scrolls sideways on narrow screens.
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
    <section className="wiki-prompt rp-not-doc" aria-label={label}>
      <div className="wiki-prompt-bar">
        <h2 className="wiki-prompt-title">Copy into your coding agent</h2>
        {source && (
          <a className="wiki-prompt-source" href={source.href} target="_blank" rel="noreferrer" aria-label={source.label}>
            Reference source <span className="wiki-arrow" aria-hidden="true" />
          </a>
        )}
      </div>
      <div className="wiki-prompt-body">
        <div className="wiki-prompt-target" ref={targetRef}>
          <span className="wiki-prompt-label" aria-hidden="true">Generate for</span>
          <Segmented
            aria-label="Generate for"
            size="sm"
            value={primary ? preference.target : "more"}
            onValueChange={(target) => setPreference({ ...preference, target: target === "more" ? "flutter" : target as typeof preference.target })}
            options={[...primaryGuiTargets, { value: "more", label: "More" }]}
          />
        </div>
        {!primary && (
          <div className="wiki-prompt-more">
            <Select aria-label="More GUI frameworks" size="sm" value={preference.target} options={[...moreGuiTargets]} onValueChange={(target) => setPreference({ ...preference, target })} />
            {preference.target === "custom" && (
              <Input size="sm" aria-label="GUI framework" placeholder="Enter your framework" value={preference.custom} onChange={(event) => setPreference({ ...preference, custom: event.target.value })} />
            )}
          </div>
        )}
        {prompt ? (
          <pre className="wiki-prompt-text" tabIndex={0} aria-label={label}><code>{prompt}</code></pre>
        ) : (
          <p className="wiki-prompt-text wiki-prompt-text--empty">{empty}</p>
        )}
        <div className="wiki-prompt-actions">
          <Button size="sm" onClick={copy} disabled={!prompt || copyState === "copying"}>
            <span role="status" aria-live="polite">{copyState === "copied" ? "Prompt copied" : copyState === "copying" ? "Copying…" : "Copy prompt"}</span>
          </Button>
          {copyState === "error" && <p className="wiki-prompt-error" role="status">Copy failed. Select the prompt and copy it manually.</p>}
        </div>
      </div>
    </section>
  )
}
