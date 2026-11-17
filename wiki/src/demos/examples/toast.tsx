import { Button } from "@protocol/components/button/button"
import { toast } from "@protocol/components/toast/toast"
import { Row } from "../Demo"

// <Toaster /> is mounted once near the root of the app; toast() works from anywhere.
export default function ToastExample() {
  return (
    <Row>
      <Button variant="ghost" onClick={() => toast("Address copied", { tone: "success" })}>Copy address</Button>
      <Button
        variant="ghost"
        onClick={() => toast("Transaction failed: fee too low", { tone: "danger", action: { label: "Retry", onClick: () => toast("Retrying with a standard fee", { tone: "info" }) } })}
      >
        Send (fails)
      </Button>
      <Button variant="ghost" onClick={() => toast("Epoch 667 started")}>Neutral</Button>
    </Row>
  )
}
