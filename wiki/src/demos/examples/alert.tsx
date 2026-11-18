import { useState } from "react"
import { Alert } from "@protocol/components/alert/alert"
import { Button } from "@protocol/components/button/button"
import { toast } from "@protocol/components/toast/toast"
import { Row } from "../Demo"

export default function AlertExample() {
  const [round, setRound] = useState(0)
  return (
    <div key={round} style={{ display: "grid", gap: "var(--x-space-3)", alignSelf: "stretch" }}>
      <Alert tone="info" title="Billing period ends in 4 days" dismissible>Invoices for this period go out on the 1st.</Alert>
      <Alert tone="success" dismissible>Card saved. Your first invoice arrives on the 1st.</Alert>
      <Alert
        tone="warning"
        title="Seat limit reached"
        actions={<Button variant="chip" onClick={() => toast("Choose a plan in Billing")}>Change plan</Button>}
        onDismiss={() => toast("Warning dismissed")}
      >
        Your team uses 21 of 20 seats on the Pro plan, so new invites are paused.
      </Alert>
      <Alert tone="danger" title="Node unreachable">Balances may be out of date. We retry every 30 seconds.</Alert>
      <Row><Button variant="ghost" size="sm" onClick={() => setRound(round + 1)}>Show all again</Button></Row>
    </div>
  )
}
