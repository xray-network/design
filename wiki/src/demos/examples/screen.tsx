import { useState } from "react"
import { Avatar } from "@protocol/components/avatar/avatar"
import { Button, IconButton } from "@protocol/components/button/button"
import { Icon } from "@protocol/components/icon/icon"
import { chevronLeft, chevronRight, cog6Tooth, queueList } from "@protocol/components/icon/icons.js"
import { Tag } from "@protocol/components/tag/tag"
import { LiquidIndicator } from "@protocol/motion/liquid-indicator/liquid-indicator"
import { Screen, Screens, type ScreenDirection } from "@protocol/motion/screen/screen"

const PAYOUTS = [
  { id: "chase", palette: "blue", to: "Chase ···· 4821", amount: "$1,200.00", when: "Arrives tomorrow", status: "Pending" },
  { id: "wise", palette: "cool", to: "Wise ···· 0077", amount: "$640.50", when: "Arrived on Nov 18", status: "Paid" },
  { id: "revolut", palette: "amber", to: "Revolut ···· 3310", amount: "$86.20", when: "Arrived on Nov 12", status: "Paid" },
] as const
const TABS = [
  { value: "list", label: "Payouts", icon: <Icon icon={queueList} /> },
  { value: "settings", label: "Settings", icon: <Icon icon={cog6Tooth} /> },
]

export default function ScreenExample() {
  // Where the flow is, and how it got there: deeper is forward, out again is back, between tabs is a fade.
  const [view, setView] = useState<{ screen: string; direction: ScreenDirection }>({ screen: "list", direction: "forward" })
  const [payoutId, setPayoutId] = useState<string>(PAYOUTS[0].id)
  const payout = PAYOUTS.find((p) => p.id === payoutId)!
  const go = (screen: string, direction: ScreenDirection) => setView({ screen, direction })
  return (
    <div className="wiki-demo-screens">
      <Screens current={view.screen} direction={view.direction}>
        <Screen id="list" aria-label="Payouts">
          <header><strong>Payouts</strong></header>
          <ul>
            {PAYOUTS.map((item) => (
              <li key={item.id}>
                <button type="button" onClick={() => { setPayoutId(item.id); go("detail", "forward") }}>
                  <Avatar seed={item.id} palette={item.palette} />
                  <span className="wiki-demo-row-text"><strong>{item.to}</strong><span>{item.when}</span></span>
                  <span className="wiki-demo-row-value">{item.amount}</span>
                  <Icon icon={chevronRight} size="sm" />
                </button>
              </li>
            ))}
          </ul>
        </Screen>
        <Screen id="detail" aria-label={`Payout to ${payout.to}`}>
          <header>
            <IconButton aria-label="Back to payouts" size="sm" onClick={() => go("list", "back")}><Icon icon={chevronLeft} /></IconButton>
            <strong>Payout</strong>
          </header>
          <div className="wiki-demo-screens-detail">
            <Avatar seed={payout.id} palette={payout.palette} size="lg" />
            <b>{payout.amount}</b>
            <span>{payout.to}</span>
            <Tag status={payout.status === "Paid" ? "success" : "warning"}>{payout.status}</Tag>
            <span>{payout.when}</span>
            <Button variant="ghost" size="sm" onClick={() => go("list", "back")}>Back to payouts</Button>
          </div>
        </Screen>
        <Screen id="settings" aria-label="Settings">
          <header><strong>Settings</strong></header>
          <div className="wiki-demo-screens-detail">
            <span>Tabs sit side by side, so moving between them is a fade, not a slide.</span>
          </div>
        </Screen>
      </Screens>
      <LiquidIndicator aria-label="Sections" fullWidth layout="stack" value={view.screen === "settings" ? "settings" : "list"} onValueChange={(tab) => { if (tab !== view.screen) go(tab, view.screen === "detail" && tab === "list" ? "back" : "fade") }} items={TABS} />
    </div>
  )
}
