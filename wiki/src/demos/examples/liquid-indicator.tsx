import { useLayoutEffect, useRef, useState } from "react"
import { duration, easing } from "@protocol/core/motion.js"
import { LiquidIndicator } from "@protocol/motion/liquid-indicator/liquid-indicator"

const Label = ({ children }: { children: string }) => <span className="wiki-demo-label">{children}</span>
const icon = (d: string) => <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
const TABS = [
  { value: "home", label: "Home", icon: icon("m2.25 12 8.95-8.96a1.13 1.13 0 0 1 1.6 0L21.75 12M4.5 9.75v10.13c0 .62.5 1.12 1.13 1.12H9.75v-4.88c0-.62.5-1.12 1.13-1.12h2.25c.62 0 1.12.5 1.12 1.13V21h4.13c.62 0 1.12-.5 1.12-1.13V9.76") },
  { value: "search", label: "Search", icon: icon("m21 21-5.2-5.2m0 0A7.5 7.5 0 1 0 5.2 5.2a7.5 7.5 0 0 0 10.6 10.6Z") },
  { value: "new", label: "New", icon: icon("M12 4.5v15m7.5-7.5h-15") },
  { value: "activity", label: "Activity", icon: icon("M21 8.25c0-2.49-2.1-4.5-4.69-4.5-1.93 0-3.6 1.13-4.31 2.73-.72-1.6-2.38-2.73-4.31-2.73C5.1 3.75 3 5.76 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z") },
  { value: "profile", label: "Profile", icon: icon("M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.12a7.5 7.5 0 0 1 15 0A17.93 17.93 0 0 1 12 21.75c-2.68 0-5.22-.58-7.5-1.63Z") },
]

// November 2026: thirty days, the first a Sunday, so with weeks from Monday it sits in the seventh column.
const DAYS = Array.from({ length: 30 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }))
const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"]
const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" })

/** A month of days with one pill. The pattern moves the pill along the row; this example adds the move between
    rows: it places the pill on the day's row, then plays the difference in height away (FLIP) on the soft spring. */
function MonthExample() {
  const [day, setDay] = useState("21")
  const month = useRef<HTMLDivElement>(null)
  const lastTop = useRef<number | null>(null)
  useLayoutEffect(() => {
    const root = month.current?.querySelector<HTMLElement>(".x-liquid-indicator")
    const current = root?.querySelector<HTMLElement>("[aria-current]")
    const pill = root?.querySelector<HTMLElement>(".x-liquid-indicator-pill")
    if (!root || !current || !pill) return
    const top = current.offsetTop
    root.style.setProperty("--wiki-day-top", `${top}px`)
    const ms = duration(root, "--x-spring-soft-duration")
    if (ms && lastTop.current !== null && lastTop.current !== top) {
      pill.animate([{ translate: `0 ${lastTop.current - top}px` }, { translate: "0 0" }], { duration: ms, easing: easing(root, "--x-spring-soft"), composite: "add" })
    }
    lastTop.current = top
  }, [day])

  return (
    <div ref={month} className="wiki-demo-month">
      <div className="wiki-demo-month-head"><strong>November 2026</strong><span aria-live="polite">{dayName.format(new Date(Date.UTC(2026, 10, Number(day))))}</span></div>
      <div className="wiki-demo-month-weekdays" aria-hidden="true">{WEEKDAYS.map((name, i) => <span key={i}>{name}</span>)}</div>
      <LiquidIndicator aria-label="Day in November 2026" value={day} onValueChange={setDay} items={DAYS} />
    </div>
  )
}

export default function LiquidIndicatorExample() {
  const [tab, setTab] = useState("home")
  return (
    <>
      <Label>A choice</Label>
      <LiquidIndicator aria-label="Period" defaultValue="week" items={[{ value: "day", label: "Day" }, { value: "week", label: "Week" }, { value: "month", label: "Month" }, { value: "year", label: "Year" }, { value: "all", label: "All time" }]} />
      <Label>A tab bar</Label>
      <div style={{ width: 360, maxWidth: "100%" }}>
        <LiquidIndicator aria-label="Sections" fullWidth layout="stack" value={tab} onValueChange={setTab} items={TABS} />
      </div>
      <Label>A day in a month</Label>
      <MonthExample />
    </>
  )
}
