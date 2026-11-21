import { useState } from "react"
import { Button } from "@protocol/components/button/button"
import { Steps } from "@protocol/components/steps/steps"
import { Row } from "../Demo"

const CHECKOUT = [
  { title: "Basket", description: "3 items" },
  { title: "Delivery", description: "Address and date" },
  { title: "Payment", description: "Card or balance" },
  { title: "Review" },
]

export default function StepsExample() {
  const [current, setCurrent] = useState(1)
  return (
    <>
      <Steps aria-label="Checkout progress" current={current} steps={CHECKOUT} onStepClick={setCurrent} />
      <Row>
        <Button variant="ghost" size="sm" disabled={current === 0} onClick={() => setCurrent(current - 1)}>Back</Button>
        <Button size="sm" disabled={current === CHECKOUT.length - 1} onClick={() => setCurrent(current + 1)}>Next</Button>
      </Row>
      <Steps
        aria-label="Import progress"
        current={1}
        fullWidth
        steps={[{ title: "Choose files" }, { title: "Upload", state: "loading", description: "Uploading 12 of 38" }, { title: "Process" }, { title: "Done" }]}
      />
      <Steps
        aria-label="Verification"
        orientation="vertical"
        current={1}
        steps={[
          { title: "Email", description: "Confirmed on Nov 12" },
          { title: "Identity document", state: "error", description: "The photo is blurred. Upload it again." },
          { title: "Address" },
        ]}
      />
    </>
  )
}
