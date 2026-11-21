import { useState } from "react"
import { Button } from "@protocol/components/button/button"
import { Segmented } from "@protocol/components/segmented/segmented"
import { Tag } from "@protocol/components/tag/tag"
import { Presence } from "@protocol/motion/presence/presence"

type From = "grow" | "above" | "below" | "start" | "end"
// Where the panel sits in the scene for each way in, and for growing, the corner it grows from.
const PLACE: Record<From, string> = { grow: "center", above: "top", below: "bottom", start: "start", end: "end" }

export default function PresenceExample() {
  const [from, setFrom] = useState<From>("grow")
  const [show, setShow] = useState(true)
  return (
    <div className="wiki-demo-motion">
      <div className="wiki-demo-toolbar">
        <div className="wiki-demo-toolbar-group">
          <span>Arrives</span>
          <Segmented
            aria-label="Arrives"
            size="sm"
            value={from}
            onValueChange={(value) => { setFrom(value); setShow(true) }}
            options={[{ value: "grow", label: "In place" }, { value: "above", label: "Above" }, { value: "below", label: "Below" }, { value: "start", label: "Start" }, { value: "end", label: "End" }]}
          />
        </div>
        <Button variant="ghost" size="sm" aria-expanded={show} aria-controls="presence-panel" onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</Button>
      </div>
      <div className="wiki-demo-scene" data-place={PLACE[from]}>
        {/* A new key per direction, so changing it plays the arrival again. */}
        <Presence key={from} id="presence-panel" show={show} from={from === "grow" ? undefined : from} className="wiki-demo-presence" role="status">
          <div><strong>Payout sent</strong><Tag size="sm" status="success">Done</Tag></div>
          <p>$1,200.00 is on its way to Chase ···· 4821.</p>
        </Presence>
      </div>
    </div>
  )
}
