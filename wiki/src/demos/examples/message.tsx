import { Button } from "@protocol/components/button/button"
import { Messages, message } from "@protocol/components/message/message"
import { Row } from "../Demo"

// The top-right <Messages /> is mounted once near the root of the app; this demo also mounts a bottom one.
export const showPaid = () => message({ tone: "success", title: "Payment confirmed", text: "A receipt is on its way to your inbox." })
export const showSaturated = () =>
  message({
    tone: "warning",
    title: "Seat limit reached",
    text: "Your team uses 21 of 20 seats on the Pro plan, so new invites are paused.",
    action: { label: "Change plan", onClick: () => message({ tone: "info", text: "Choose a plan in Billing." }) },
    duration: Infinity,
  })
export const showSynced = () => message({ title: "Data synced", text: "Balances are up to date." })

export default function MessageExample() {
  return (
    <>
      <Messages position="bottom" />
      <Row>
        <span className="wiki-demo-label">Top right</span>
        <Button variant="ghost" onClick={showPaid}>Pay</Button>
        <Button variant="ghost" onClick={showSaturated}>Seat warning</Button>
        <Button variant="ghost" onClick={showSynced}>Plain message</Button>
      </Row>
      <Row>
        <span className="wiki-demo-label">Bottom right</span>
        <Button variant="ghost" onClick={() => message({ tone: "success", title: "Export ready", text: "payments-may.csv is in your downloads.", position: "bottom" })}>Export</Button>
      </Row>
    </>
  )
}
