import { useState } from "react"
import { Alert } from "@protocol/components/alert/alert"
import { Button } from "@protocol/components/button/button"
import { toast } from "@protocol/components/toast/toast"
import { Row } from "../Demo"

export default function AlertExample() {
  const [round, setRound] = useState(0)
  return (
    <div key={round} style={{ display: "grid", gap: "var(--x-space-3)" }}>
      <Alert tone="info" title="Epoch 667 ends in 4 days" dismissible>Rewards for this epoch are paid two epochs later.</Alert>
      <Alert tone="success" dismissible>Delegated to XRAY Stake Pool. The first reward arrives in about 15 days.</Alert>
      <Alert
        tone="warning"
        title="Pool saturated"
        actions={<Button variant="chip" onClick={() => toast("Choose a pool in Staking")}>Change pool</Button>}
        onDismiss={() => toast("Warning dismissed")}
      >
        XRAY Stake Pool is at 101% saturation, so rewards are reduced.
      </Alert>
      <Alert tone="danger" title="Node unreachable">Balances may be out of date. We retry every 30 seconds.</Alert>
      <Row><Button variant="ghost" size="sm" onClick={() => setRound(round + 1)}>Show all again</Button></Row>
    </div>
  )
}
