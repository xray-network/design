import { Button } from "@protocol/components/button/button"
import { Toaster, toast } from "@protocol/components/toast/toast"
import { Row } from "../Demo"

const Label = ({ children }: { children: string }) => <span className="wiki-demo-label">{children}</span>

// The bottom <Toaster /> is mounted once near the root of the app. This demo also mounts one at the top;
// toast(text, { position: "top" }) picks it.
export default function ToastExample() {
  return (
    <>
      <Toaster position="top" />
      <Label>Bottom</Label>
      <Row>
        <Button variant="ghost" onClick={() => toast("Link copied", { tone: "success" })}>Copy link</Button>
        <Button
          variant="ghost"
          onClick={() => toast("Payment failed: card declined", { tone: "danger", action: { label: "Retry", onClick: () => toast("Retrying the payment", { tone: "info" }) } })}
        >
          Pay (fails)
        </Button>
        <Button variant="ghost" onClick={() => toast("Billing period started")}>Neutral</Button>
      </Row>
      <Label>Top</Label>
      <Row>
        <Button variant="ghost" onClick={() => toast("Invoice sent", { tone: "success", position: "top" })}>Send invoice</Button>
        <Button variant="ghost" onClick={() => toast("Export started", { tone: "info", position: "top" })}>Export</Button>
      </Row>
    </>
  )
}
