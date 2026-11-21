import { useState } from "react"
import { Button } from "@protocol/components/button/button"
import { Icon } from "@protocol/components/icon/icon"
import { arrowPath } from "@protocol/components/icon/icons.js"
import { Segmented } from "@protocol/components/segmented/segmented"
import { Stagger } from "@protocol/motion/stagger/stagger"

const ROWS = ["Payments", "Invoices", "Reports", "Payouts", "Customers", "Disputes", "Settings"]

export default function StaggerExample() {
  const [round, setRound] = useState(0)
  const [from, setFrom] = useState<"below" | "start">("below")
  return (
    <div className="wiki-demo-motion">
      <div className="wiki-demo-toolbar">
        <div className="wiki-demo-toolbar-group">
          <span>Enter from</span>
          <Segmented
            aria-label="Enter from"
            size="sm"
            value={from}
            onValueChange={(value) => { setFrom(value); setRound(round + 1) }}
            options={[{ value: "below", label: "Below" }, { value: "start", label: "The side" }]}
          />
        </div>
        <Button variant="ghost" size="sm" onClick={() => setRound(round + 1)}><Icon icon={arrowPath} />Replay</Button>
      </div>
      {/* A new key mounts the list again, which is what plays the cascade. */}
      <Stagger key={round} as="ul" from={from} className="wiki-demo-stagger">
        {ROWS.map((row) => <li key={row}>{row}</li>)}
      </Stagger>
    </div>
  )
}
