import { useState } from "react"
import { Button } from "@protocol/components/button/button"
import { Segmented } from "@protocol/components/segmented/segmented"
import { Tag } from "@protocol/components/tag/tag"
import { Replace } from "@protocol/motion/replace/replace"

const Label = ({ children }: { children: string }) => <span className="wiki-demo-label">{children}</span>
type Tab = "overview" | "activity" | "limits"
const PANELS: Record<Tab, { title: string; text: string; figure: string; note: string }> = {
  overview: { title: "Main account", text: "Your everyday account for payouts and card payments.", figure: "$12,480.25", note: "available" },
  activity: { title: "This week", text: "14 payments in, 3 payouts out. The busiest day was Thursday.", figure: "17", note: "transactions" },
  limits: { title: "Limits", text: "Daily payouts are capped by your plan. Raise it at any time.", figure: "$5,000", note: "per day" },
}
const STEPS = [
  { text: "Checking the address…", tone: undefined },
  { text: "The address is valid.", tone: "success" },
  { text: "This address has not been used before.", tone: "warning" },
] as const

export default function ReplaceExample() {
  const [tab, setTab] = useState<Tab>("overview")
  const [step, setStep] = useState(0)
  const panel = PANELS[tab]
  return (
    <div className="wiki-demo-motion">
      <Label>The panel under a switch</Label>
      <div className="wiki-demo-replace">
        <Segmented aria-label="Section" size="sm" fullWidth value={tab} onValueChange={setTab} options={[{ value: "overview", label: "Overview" }, { value: "activity", label: "Activity" }, { value: "limits", label: "Limits" }]} />
        <Replace id={tab} role="tabpanel">
          <strong>{panel.title}</strong>
          <p>{panel.text}</p>
          <div><b>{panel.figure}</b><span>{panel.note}</span></div>
        </Replace>
      </div>
      <Label>A message that changes</Label>
      <div className="wiki-demo-replace" data-row="">
        <Replace id={step} role="status">
          {STEPS[step].tone ? <Tag status={STEPS[step].tone}>{STEPS[step].text}</Tag> : <span>{STEPS[step].text}</span>}
        </Replace>
        <Button variant="ghost" size="sm" onClick={() => setStep((step + 1) % STEPS.length)}>Next state</Button>
      </div>
    </div>
  )
}
