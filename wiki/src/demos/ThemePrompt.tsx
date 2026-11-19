import { useEffect, useState, type CSSProperties } from "react"

import { Button } from "@protocol/components/button/button"
import { Checkbox } from "@protocol/components/checkbox/checkbox"
import { Alert } from "@protocol/components/alert/alert"
import { Chips } from "@protocol/components/chips/chips"
import { Radio } from "@protocol/components/radio/radio"
import { Switch } from "@protocol/components/switch/switch"
import { Field, TextField } from "@protocol/components/field/field"
import { Segmented } from "@protocol/components/segmented/segmented"
import { Select } from "@protocol/components/select/select"
import { themePrompt, type ThemeInputs } from "../prompts"
import { PromptCard } from "./PromptCard"

import "./demo.css"

const RADIUS = { xs: 6, sm: 8, md: 10, lg: 12, xl: 14, "2xl": 16, "3xl": 20 }
const RADIUS_SCALE = { kit: 1, sharper: 0.5, rounder: 1.5 }

/** Whether the browser reads the text as a color (the preview and prompt need one). */
const isColor = (value: string) => {
  const v = value.trim()
  return v !== "" && typeof CSS !== "undefined" && CSS.supports("color", v)
}

/** The preview's token overrides: an approximation of what the agent derives (§11), done with color-mix(). */
function themeVars(inputs: ThemeInputs, brandOk: boolean): CSSProperties {
  const vars: Record<string, string> = {}
  if (brandOk) {
    const b = inputs.brand.trim()
    vars["--x-accent"] = b
    vars["--x-accent-hover"] = `color-mix(in oklab, ${b}, white 14%)`
    vars["--x-accent-press"] = `color-mix(in oklab, ${b}, black 16%)`
    vars["--x-accent-wash"] = `light-dark(color-mix(in srgb, ${b} 7%, transparent), color-mix(in srgb, ${b} 14%, transparent))`
    vars["--x-accent-ink"] = `light-dark(${b}, color-mix(in oklab, ${b}, white 35%))`
    vars["--x-accent-ink-hover"] = `light-dark(color-mix(in oklab, ${b}, white 14%), color-mix(in oklab, ${b}, white 50%))`
    // Declared on :root as var(--x-accent-ink), so they resolve there; restate them here to follow the new ink.
    vars["--x-link"] = "var(--x-accent-ink)"
    vars["--x-focus"] = "var(--x-accent-ink)"
  }
  for (const [name, px] of Object.entries(RADIUS)) vars[`--x-radius-${name}`] = `${px * RADIUS_SCALE[inputs.radius]}px`
  if (inputs.font.trim()) vars["--x-font-sans"] = `"${inputs.font.trim().replace(/"/g, "")}", ui-sans-serif, system-ui, sans-serif`
  return vars as CSSProperties
}

/** The preview: a compact set of accent-bearing components with the entered theme, in the page's current theme.
    They work, so hover, press and keyboard focus show the derived shades too. */
function ThemePreview({ style }: { style: CSSProperties }) {
  return (
    <div className="wiki-theme-preview" style={style}>
      <div className="wiki-theme-preview-row">
        <Button size="sm">Send</Button>
        <Button size="sm" variant="ghost">Cancel</Button>
        <Segmented aria-label="Period" size="sm" defaultValue="7d" options={[{ value: "24h", label: "24h" }, { value: "7d", label: "7 days" }]} />
        <Chips aria-label="Type" defaultValue={["sent"]} options={[{ value: "all", label: "All" }, { value: "sent", label: "Sent", count: 3 }]} />
      </div>
      <div className="wiki-theme-preview-row">
        <Switch size="sm" defaultChecked>Alerts</Switch>
        <Checkbox defaultChecked>Rewards</Checkbox>
        <div className="wiki-theme-preview-radios" role="radiogroup" aria-label="Currency">
          <Radio name="wiki-theme-preview-currency" value="ada" defaultChecked>ADA</Radio>
          <Radio name="wiki-theme-preview-currency" value="usd">USD</Radio>
        </div>
        <a className="wiki-theme-preview-link" href="#preview" onClick={(event) => event.preventDefault()}>View details</a>
      </div>
      <Alert tone="info">Rewards for this epoch are paid two epochs later.</Alert>
    </div>
  )
}

/** The Theming page's prompt: brand inputs, an optional live preview, the GUI framework (shared with the demos' choice),
    then a prompt to copy. */
export function ThemePrompt() {
  const [inputs, setInputs] = useState<ThemeInputs>({ brand: "", font: "", radius: "kit", grays: "kit" })
  // isColor needs the browser's CSS.supports: read it after mount, so SSR and the first render agree.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const brandOk = mounted && isColor(inputs.brand)
  const [showPreview, setShowPreview] = useState(false)
  const brandError = mounted && inputs.brand.trim() !== "" && !brandOk ? "Not a color. Try a hex value such as #7C3AED." : undefined

  return (
      <div className="wiki-demo rp-not-doc">
        <div className="wiki-demo-bar">
          <h2 className="wiki-demo-prompt-title">Your brand</h2>
          <Switch size="sm" checked={showPreview} onChange={(event) => setShowPreview(event.target.checked)}>Show preview</Switch>
        </div>
        <div className="wiki-demo-stage wiki-theme-stage">
          <div className="wiki-theme-inputs">
            <TextField
              label="Brand color"
              placeholder="#1940ED"
              hint="Any CSS color; the agent derives the rest"
              spellCheck={false}
              autoComplete="off"
              value={inputs.brand}
              error={brandError}
              onChange={(event) => setInputs({ ...inputs, brand: event.target.value })}
            />
            <TextField
              label="Font"
              placeholder="Inter"
              hint="One your project already loads"
              spellCheck={false}
              autoComplete="off"
              value={inputs.font}
              onChange={(event) => setInputs({ ...inputs, font: event.target.value })}
            />
            <Field label="Corners" hint="The whole radius scale changes together">
              {(p) => (
                <Select
                  {...p}
                  value={inputs.radius}
                  onValueChange={(radius) => setInputs({ ...inputs, radius: radius as ThemeInputs["radius"] })}
                  options={[{ value: "kit", label: "As the kit" }, { value: "sharper", label: "Sharper" }, { value: "rounder", label: "Rounder" }]}
                />
              )}
            </Field>
            <Field label="Grays" hint="Backgrounds, borders and text, in both themes">
              {(p) => (
                <Select
                  {...p}
                  value={inputs.grays}
                  onValueChange={(grays) => setInputs({ ...inputs, grays: grays as ThemeInputs["grays"] })}
                  options={[{ value: "kit", label: "As the kit" }, { value: "cooler", label: "Cooler" }, { value: "warmer", label: "Warmer" }, { value: "neutral", label: "Pure neutral" }]}
                />
              )}
            </Field>
          </div>
        </div>
        {showPreview && (
          <section className="wiki-demo-section" aria-label="Preview of your theme">
            <h2 className="wiki-demo-prompt-title">Preview</h2>
            <ThemePreview style={themeVars(inputs, brandOk)} />
          </section>
        )}
        <PromptCard
          label="Theme prompt"
          build={(preference) => (brandOk ? themePrompt(inputs, preference) : "")}
          empty={brandOk ? "Enter a framework to generate your prompt." : "Enter a brand color to generate your prompt."}
        />
      </div>
  )
}
