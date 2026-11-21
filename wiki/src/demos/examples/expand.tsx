import { useState } from "react"
import { Button } from "@protocol/components/button/button"
import { Icon } from "@protocol/components/icon/icon"
import { chevronDown } from "@protocol/components/icon/icons.js"
import { Expand } from "@protocol/motion/expand/expand"

const Label = ({ children }: { children: string }) => <span className="wiki-demo-label">{children}</span>
const FEES = [["Network fee", "$0.42"], ["Service fee", "$1.00"], ["Exchange rate", "1 USDC = $1.00"]]

export default function ExpandExample() {
  const [fees, setFees] = useState(false)
  const [terms, setTerms] = useState(false)
  return (
    <div className="wiki-demo-motion">
      <Label>Details under a total</Label>
      <div className="wiki-demo-expand">
        <div className="wiki-demo-expand-row"><span>You pay</span><strong>$501.42</strong></div>
        <button type="button" className="wiki-demo-expand-toggle" aria-expanded={fees} aria-controls="expand-fees" onClick={() => setFees(!fees)}>
          Fee details<Icon icon={chevronDown} size="sm" />
        </button>
        <Expand id="expand-fees" open={fees}>
          <dl>{FEES.map(([name, value]) => <div key={name} className="wiki-demo-expand-row"><dt>{name}</dt><dd>{value}</dd></div>)}</dl>
        </Expand>
        <Button fullWidth>Confirm</Button>
      </div>
      <Label>The rest of a long text</Label>
      <div className="wiki-demo-expand">
        <Expand id="expand-terms" open={terms} peek>
          <p>
            Payouts are sent every business day. A payout started before 4 pm arrives the next business day; later ones arrive the day after.
            Weekends and bank holidays are not business days. Limits depend on your plan and on the country of the receiving bank, and a payout
            above your limit is split into several, each with its own reference.
          </p>
        </Expand>
        <Button variant="ghost" size="sm" aria-expanded={terms} aria-controls="expand-terms" onClick={() => setTerms(!terms)}>{terms ? "Show less" : "Show more"}</Button>
      </div>
    </div>
  )
}
