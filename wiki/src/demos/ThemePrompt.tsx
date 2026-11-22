import { useEffect, useState } from "react"

import { Alert } from "@protocol/components/alert/alert"
import { Button } from "@protocol/components/button/button"
import { Checkbox } from "@protocol/components/checkbox/checkbox"
import { Icon } from "@protocol/components/icon/icon"
import { eyeDropper } from "@protocol/components/icon/icons.js"
import { Field, Input, TextField } from "@protocol/components/input/input"
import { Progress } from "@protocol/components/progress/progress"
import { Radio } from "@protocol/components/radio/radio"
import { Segmented } from "@protocol/components/segmented/segmented"
import { Select } from "@protocol/components/select/select"
import { Switch } from "@protocol/components/switch/switch"
import { Tag } from "@protocol/components/tag/tag"
import { TabsLine } from "@protocol/components/tabs-line/tabs-line"
import { LineChart } from "@protocol/charts/line-chart/line-chart"
import { themePrompt } from "../prompts"
import { useUserTheme } from "../theme/useUserTheme"
import { DEFAULT_THEME, GOOGLE_FONTS, deriveTokens, fontPage, fontUrl, isDefault, parseHex, type Tone } from "../theme/userTheme"
import { PromptCard } from "./PromptCard"

import "./demo.css"

const OTHER = "__other"
const FONT_OPTIONS = [{ value: "", label: "System font (the kit's)" }, ...GOOGLE_FONTS.map((font) => ({ value: font, label: font })), { value: OTHER, label: "Another Google font…" }]

/** The tokens drawn as swatches in the example, by group. */
const SWATCHES: { title: string; names: string[] }[] = [
  { title: "Accent", names: ["--x-accent", "--x-accent-hover", "--x-accent-press", "--x-accent-ink", "--x-accent-wash"] },
  { title: "Surfaces and lines", names: ["--x-bg", "--x-bg-panel", "--x-bg-chip", "--x-bg-active", "--x-border"] },
  { title: "Text", names: ["--x-fg-1", "--x-fg-2", "--x-fg-3", "--x-fg-4"] },
]

/** The kit in the reader's theme: the derived palette, then components that carry it. */
function ThemeExample({ dark }: { dark: boolean }) {
  const [theme] = useUserTheme()
  const tokens = Object.fromEntries(deriveTokens(theme).map((token) => [token.name, token]))
  const [tab, setTab] = useState("overview")
  return (
    <div className="wiki-theme-example">
      <div className="wiki-theme-palette">
        {SWATCHES.map((group) => (
          <section key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.names.map((name) => (
                <li key={name}>
                  <span className="wiki-theme-swatch-chip" style={{ background: `var(${name})` }} aria-hidden="true" />
                  <span><code>{name.replace("--x-", "")}</code><small>{dark ? tokens[name].dark : tokens[name].light}</small></span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="wiki-theme-sample">
        <header>
          <div><h3>Payouts</h3><p>The money on its way to your bank, and when it lands.</p></div>
          <Tag size="sm" status="success">Active</Tag>
        </header>
        <TabsLine aria-label="Sections" value={tab} onValueChange={setTab} items={[{ value: "overview", label: "Overview" }, { value: "activity", label: "Activity", count: 12 }, { value: "settings", label: "Settings" }]} />
        <LineChart aria-label="Payouts by month" area height={130} format={(v) => `$${Math.round(v / 1000)}K`} data={{ labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"], series: [{ name: "Payouts", values: [42000, 48500, 46200, 53900, 61900, 64200] }] }} />
        <Progress size="sm" value={84} label="Monthly goal" valueText="$84k of $100k" />
        <div className="wiki-theme-sample-row">
          <Input size="sm" aria-label="Amount" placeholder="Amount" defaultValue="1,200.00" />
          <Segmented aria-label="Speed" size="sm" defaultValue="fast" options={[{ value: "standard", label: "Standard" }, { value: "fast", label: "Fast" }]} />
        </div>
        <div className="wiki-theme-sample-row">
          <Switch size="sm" defaultChecked>Email me</Switch>
          <Checkbox defaultChecked>Weekly report</Checkbox>
          <span className="wiki-theme-sample-radios" role="radiogroup" aria-label="Currency">
            <Radio name="wiki-theme-example-currency" value="usd" defaultChecked>USD</Radio>
            <Radio name="wiki-theme-example-currency" value="eur">EUR</Radio>
          </span>
          <a className="wiki-theme-sample-link" href="#theme" onClick={(event) => event.preventDefault()}>Payout details</a>
        </div>
        <Alert tone="info">The next payout leaves tomorrow at 09:00.</Alert>
        <div className="wiki-theme-sample-row">
          <Button size="sm">Send payout</Button>
          <Button size="sm" variant="ghost">Cancel</Button>
        </div>
      </div>
    </div>
  )
}

/** The Theming page: a primary color, the tone of the grays and a font; the example in that theme; the prompt with
    every derived value. The theme is kept and applied to every preview in the wiki. */
export function ThemePrompt() {
  const [theme, setTheme] = useUserTheme()
  const [hex, setHex] = useState(theme.primary)
  const [otherFont, setOtherFont] = useState(false)
  const [dark, setDark] = useState(false)
  useEffect(() => setHex(theme.primary), [theme.primary])
  useEffect(() => { if (theme.font && !GOOGLE_FONTS.includes(theme.font)) setOtherFont(true) }, [theme.font])
  // The swatches name the value for the wiki's current theme.
  useEffect(() => {
    const read = () => setDark(document.documentElement.classList.contains("dark"))
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  const setPrimary = (value: string) => {
    setHex(value)
    const parsed = parseHex(value)
    if (parsed) setTheme({ ...theme, primary: parsed })
  }
  const hexError = hex.trim() && !parseHex(hex) ? "A hex color, such as #7C3AED" : undefined
  // A typed font name is checked against Google Fonts.
  const [fontMissing, setFontMissing] = useState(false)
  useEffect(() => {
    setFontMissing(false)
    const name = theme.font.trim()
    if (!otherFont || !name) return
    const timer = setTimeout(() => {
      // Google answers a family it does not have without the cross-origin header, so the request is refused rather
      // than returning 400; online, a refusal means the same.
      fetch(fontUrl(name, false)).then((response) => setFontMissing(!response.ok), () => setFontMissing(navigator.onLine))
    }, 400)
    return () => clearTimeout(timer)
  }, [theme.font, otherFont])
  const fontValue = otherFont ? OTHER : theme.font

  return (
    <div className="wiki-demo rp-not-doc">
      <div className="wiki-demo-bar">
        <h2 className="wiki-demo-prompt-title">Your theme</h2>
        <Button variant="ghost" size="sm" disabled={isDefault(theme)} onClick={() => { setOtherFont(false); setTheme(DEFAULT_THEME) }}>Reset to the kit</Button>
      </div>
      <div className="wiki-theme-settings">
        <Field label="Primary color" hint="Type a hex or pick one. Buttons, selections, links and focus rings come from it" error={hexError}>
          {(control) => (
            <Input
              {...control}
              spellCheck={false}
              autoComplete="off"
              value={hex}
              onChange={(event) => setPrimary(event.target.value)}
              prefix={
                // The color itself, as large as the Pick chip; it opens the same picker.
                <label className="wiki-theme-swatch-pick" style={{ background: parseHex(hex) ?? theme.primary }} title="Open the color picker">
                  <input type="color" aria-label="Pick a color" tabIndex={-1} value={parseHex(hex) ?? theme.primary} onChange={(event) => setPrimary(event.target.value.toUpperCase())} />
                </label>
              }
              suffix={
                // The browser's color picker, under a chip that says what it does.
                <label className="x-button wiki-theme-picker" data-variant="chip" title="Open the color picker">
                  <Icon icon={eyeDropper} size="sm" />
                  Pick
                  <input type="color" aria-label="Pick a color" value={parseHex(hex) ?? theme.primary} onChange={(event) => setPrimary(event.target.value.toUpperCase())} />
                </label>
              }
            />
          )}
        </Field>
        <Field label="Tone" hint="The grays: backgrounds, borders and text">
          {() => (
            <Segmented
              aria-label="Tone"
              fullWidth
              value={theme.tone}
              onValueChange={(tone: Tone) => setTheme({ ...theme, tone })}
              options={[{ value: "warm", label: "Warm" }, { value: "default", label: "Default" }, { value: "cold", label: "Cold" }]}
            />
          )}
        </Field>
        <Field label="Font" hint={otherFont ? undefined : "From Google Fonts"}>
          {(control) => (
            <Select
              {...control}
              value={fontValue}
              onValueChange={(value) => {
                if (value === OTHER) { setOtherFont(true); return }
                setOtherFont(false)
                setTheme({ ...theme, font: value })
              }}
              options={FONT_OPTIONS}
            />
          )}
        </Field>
        {otherFont && (
          <TextField
            label="Google font name"
            placeholder="Instrument Sans"
            hint={theme.font ? <a href={fontPage(theme.font)} target="_blank" rel="noreferrer">See {theme.font} on Google Fonts</a> : "As it is written on fonts.google.com"}
            error={fontMissing ? `Google Fonts has no font called "${theme.font.trim()}". The system font shows meanwhile.` : undefined}
            spellCheck={false}
            autoComplete="off"
            value={theme.font}
            onChange={(event) => setTheme({ ...theme, font: event.target.value.slice(0, 60) })}
          />
        )}
      </div>
      <section className="wiki-demo-section" aria-label="Your theme on the kit">
        <h2 className="wiki-demo-prompt-title">Example</h2>
        <ThemeExample dark={dark} />
      </section>
      <PromptCard label="Theme prompt" build={(preference) => themePrompt(theme, deriveTokens(theme), preference)} />
    </div>
  )
}
