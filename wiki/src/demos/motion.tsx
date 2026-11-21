// Motion patterns: interactive previews with framework-specific usage prompts, like components and blocks.

import { useEffect, useRef, useState } from "react"
import { Button } from "@protocol/components/button/button"
import { Switch } from "@protocol/components/switch/switch"
import { Demo } from "./Demo"

import DragExample from "./examples/drag"
import ExpandExample from "./examples/expand"
import LiquidIndicatorExample from "./examples/liquid-indicator"
import MorphExample from "./examples/morph"
import PresenceExample from "./examples/presence"
import ReflowExample from "./examples/reflow"
import ScreenExample from "./examples/screen"
import StaggerExample from "./examples/stagger"

export const LiquidIndicatorDemo = () => <Demo id="liquid-indicator" name="LiquidIndicator" kind="motion"><LiquidIndicatorExample /></Demo>
export const MorphDemo = () => <Demo id="morph" name="Morph" kind="motion"><MorphExample /></Demo>
export const ReflowDemo = () => <Demo id="reflow" name="Reflow" kind="motion"><ReflowExample /></Demo>
export const PresenceDemo = () => <Demo id="presence" name="Presence" kind="motion"><PresenceExample /></Demo>
export const ExpandDemo = () => <Demo id="expand" name="Expand" kind="motion"><ExpandExample /></Demo>
export const DragDemo = () => <Demo id="drag" name="Drag" kind="motion"><DragExample /></Demo>
export const ScreenDemo = () => <Demo id="screen" name="Screen" kind="motion"><ScreenExample /></Demo>
export const StaggerDemo = () => <Demo id="stagger" name="Stagger" kind="motion"><StaggerExample /></Demo>

const CURVES = [
  { name: "Ease", token: "--x-ease", duration: "--x-duration-slow", use: "Color, opacity, exits, and layout that must not wobble." },
  { name: "Spring", token: "--x-spring", duration: "--x-spring-duration", use: "Things that travel: indicators, thumbs, overlays arriving." },
  { name: "Soft spring", token: "--x-spring-soft", duration: "--x-spring-soft-duration", use: "Larger moves with no overshoot: reflow, morph, sheets." },
]

// The plot: 72 by 48, progress 0 on the lower line and 1 on the upper one, with headroom above for an overshoot.
const PLOT = { x0: 4, x1: 68, y0: 40, y1: 14 }
const px = (t: number) => +(PLOT.x0 + t * (PLOT.x1 - PLOT.x0)).toFixed(2)
const py = (v: number) => +(PLOT.y0 + v * (PLOT.y1 - PLOT.y0)).toFixed(2)

/** An easing token's value as an SVG path: cubic-bezier() is one curve, linear() a line through its stops. */
function curvePath(value: string) {
  const numbers = (value.match(/-?\d*\.?\d+/g) ?? []).map(Number)
  if (value.startsWith("cubic-bezier") && numbers.length === 4) {
    const [a, b, c, d] = numbers
    return `M${px(0)} ${py(0)}C${px(a)} ${py(b)} ${px(c)} ${py(d)} ${px(1)} ${py(1)}`
  }
  if (value.startsWith("linear") && numbers.length > 1) {
    return numbers.map((v, i) => `${i ? "L" : "M"}${px(i / (numbers.length - 1))} ${py(v)}`).join("")
  }
  return ""
}

/** A duration token's value in milliseconds, however the stylesheet wrote it ("280ms", ".28s"). */
function ms(value = "") {
  const n = parseFloat(value)
  return Number.isNaN(n) ? "" : `${Math.round(value.endsWith("ms") ? n : n * 1000)}ms`
}

/** The kit's three curves side by side: each one drawn from its token, and a dot that travels the same distance on it. */
export function MotionCurves() {
  const [end, setEnd] = useState(false)
  const [reduce, setReduce] = useState(false)
  const [read, setRead] = useState<Record<string, string>>({})
  const root = useRef<HTMLDivElement>(null)

  // The curves and durations shown are the tokens' own values, read where the demo sits (so "Reduce motion" shows 0ms).
  useEffect(() => {
    const style = getComputedStyle(root.current!)
    setRead(Object.fromEntries(CURVES.flatMap((c) => [c.token, c.duration]).map((token) => [token, style.getPropertyValue(token).trim()])))
  }, [reduce])

  // Plays once when the demo first comes into view.
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      setEnd(true)
    }, { threshold: 0.6 })
    observer.observe(root.current!)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={root} className="wiki-demo rp-not-doc" data-motion={reduce ? "reduce" : undefined}>
      <div className="wiki-demo-bar">
        <h2 className="wiki-demo-prompt-title">The three curves</h2>
        <div className="wiki-demo-switches">
          <Switch size="sm" checked={reduce} onChange={(event) => setReduce(event.target.checked)}>Reduce motion</Switch>
          <Button size="sm" variant="ghost" onClick={() => setEnd(!end)}>Play</Button>
        </div>
      </div>
      <div className="wiki-demo-stage wiki-motion-curves">
        {CURVES.map((curve) => (
          <div key={curve.token} className="wiki-motion-curve">
            <svg className="wiki-motion-curve-plot" viewBox="0 0 72 48" aria-hidden="true">
              <path className="wiki-motion-curve-grid" d={`M${PLOT.x0} ${PLOT.y0}H${PLOT.x1}M${PLOT.x0} ${PLOT.y1}H${PLOT.x1}`} />
              <path d={curvePath(read[curve.token] ?? "")} />
            </svg>
            <div className="wiki-motion-curve-text">
              <div className="wiki-motion-curve-name"><strong>{curve.name}</strong><span>{ms(read[curve.duration])}</span></div>
              <code>{curve.token}</code>
              <p>{curve.use}</p>
            </div>
            <div className="wiki-motion-curve-track" data-end={end ? "" : undefined}>
              <span style={{ transition: `left var(${curve.duration}) var(${curve.token})` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
