// Motion patterns: interactive previews with framework-specific usage prompts, like components and blocks.

import { useEffect, useRef, useState } from "react"
import { Button } from "@protocol/components/button/button"
import { Switch } from "@protocol/components/switch/switch"
import { Slider } from "@protocol/components/slider/slider"
import { SPRINGS, spring } from "@protocol/core/motion.js"
import { Demo } from "./Demo"

import DragExample from "./examples/drag"
import ExpandExample from "./examples/expand"
import LiquidIndicatorExample from "./examples/liquid-indicator"
import MorphExample from "./examples/morph"
import PagerExample from "./examples/pager"
import PresenceExample from "./examples/presence"
import ReflowExample from "./examples/reflow"
import ReorderExample from "./examples/reorder"
import ReplaceExample from "./examples/replace"
import ScreenExample from "./examples/screen"
import StaggerExample from "./examples/stagger"

export const LiquidIndicatorDemo = () => <Demo id="liquid-indicator" name="LiquidIndicator" kind="motion"><LiquidIndicatorExample /></Demo>
export const MorphDemo = () => <Demo id="morph" name="Morph" kind="motion"><MorphExample /></Demo>
export const ReflowDemo = () => <Demo id="reflow" name="Reflow" kind="motion"><ReflowExample /></Demo>
export const PresenceDemo = () => <Demo id="presence" name="Presence" kind="motion"><PresenceExample /></Demo>
export const ExpandDemo = () => <Demo id="expand" name="Expand" kind="motion"><ExpandExample /></Demo>
export const DragDemo = () => <Demo id="drag" name="Drag" kind="motion"><DragExample /></Demo>
export const ScreenDemo = () => <Demo id="screen" name="Screen" kind="motion"><ScreenExample /></Demo>
export const ReplaceDemo = () => <Demo id="replace" name="Replace" kind="motion"><ReplaceExample /></Demo>
export const ReorderDemo = () => <Demo id="reorder" name="Reorder" kind="motion"><ReorderExample /></Demo>
export const PagerDemo = () => <Demo id="pager" name="Pager" kind="motion"><PagerExample /></Demo>
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
  // Motion is on: the switch turns it off, the way reduced motion would.
  const [motion, setMotion] = useState(true)
  const [read, setRead] = useState<Record<string, string>>({})
  const root = useRef<HTMLDivElement>(null)

  // The curves and durations shown are the tokens' own values, read where the demo sits (so with Motion off it shows 0ms).
  useEffect(() => {
    const style = getComputedStyle(root.current!)
    setRead(Object.fromEntries(CURVES.flatMap((c) => [c.token, c.duration]).map((token) => [token, style.getPropertyValue(token).trim()])))
  }, [motion])

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
    <div ref={root} className="wiki-demo rp-not-doc" data-motion={motion ? undefined : "reduce"}>
      <div className="wiki-demo-bar">
        <h2 className="wiki-demo-prompt-title">The three curves</h2>
        <div className="wiki-demo-switches">
          <Switch size="sm" checked={motion} onChange={(event) => setMotion(event.target.checked)}>Motion</Switch>
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

/** Springs, made here: two numbers in, a linear() curve and a duration out, drawn and played on the spot. */
export function SpringLab() {
  const [stiffness, setStiffness] = useState(SPRINGS.liquid.stiffness)
  const [damping, setDamping] = useState(Math.round(SPRINGS.liquid.dampingRatio * 100))
  const [end, setEnd] = useState(false)
  const made = spring({ stiffness, dampingRatio: damping / 100 })
  const css = `--x-spring: ${made.easing};\n--x-spring-duration: ${Math.round(made.duration)}ms;`
  const copy = async () => { try { await navigator.clipboard.writeText(css) } catch { /* the text is on the page */ } }
  return (
    <div className="wiki-demo rp-not-doc">
      <div className="wiki-demo-bar">
        <h2 className="wiki-demo-prompt-title">Make a spring</h2>
        <div className="wiki-demo-switches">
          <Button size="sm" variant="ghost" onClick={() => setEnd(!end)}>Play</Button>
          <Button size="sm" variant="ghost" onClick={copy}>Copy CSS</Button>
        </div>
      </div>
      <div className="wiki-demo-stage wiki-motion-lab">
        <div className="wiki-motion-lab-controls">
          <Slider label="Stiffness" size="sm" min={80} max={600} step={10} value={stiffness} onValueChange={setStiffness} />
          <Slider label="Damping" size="sm" min={40} max={120} step={1} value={damping} onValueChange={setDamping} format={(value) => (value / 100).toFixed(2) + (value >= 100 ? " · no overshoot" : "")} />
        </div>
        <div className="wiki-motion-curve">
          <svg className="wiki-motion-curve-plot" viewBox="0 0 72 48" aria-hidden="true">
            <path className="wiki-motion-curve-grid" d={`M${PLOT.x0} ${PLOT.y0}H${PLOT.x1}M${PLOT.x0} ${PLOT.y1}H${PLOT.x1}`} />
            <path d={curvePath(made.easing)} />
          </svg>
          <div className="wiki-motion-curve-text">
            <div className="wiki-motion-curve-name"><strong>Your spring</strong><span>{Math.round(made.duration)}ms</span></div>
            <code>{made.easing.slice(0, 34)}…</code>
            <p>{damping < 100 ? "It passes its target and comes back." : "It arrives without passing its target."}{made.duration > 600 ? " Over 600ms: too slow for the motion budget." : ""}</p>
          </div>
          <div className="wiki-motion-curve-track" data-end={end ? "" : undefined}>
            <span style={{ transition: `left ${Math.round(made.duration)}ms ${made.easing}` }} />
          </div>
        </div>
      </div>
    </div>
  )
}
