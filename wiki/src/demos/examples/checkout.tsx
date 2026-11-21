import { useState } from "react"
import { Checkout } from "@protocol/blocks/checkout/checkout"
import { Button } from "@protocol/components/button/button"
import { Icon } from "@protocol/components/icon/icon"
import { creditCard } from "@protocol/components/icon/icons.js"
import { ListIcon, ListRow } from "@protocol/components/list/list"
import { Art } from "../Art"

export default function CheckoutExample() {
  const [paid, setPaid] = useState(false)
  return (
    <div style={{ width: 380, maxWidth: "100%" }}>
      <Checkout
        title="Your stay"
        items={[{ id: "loft", name: "Loft by the river", detail: "Nov 24 to 27 · 2 guests", price: "$420.00", thumb: <Art seed="loft" palette="amber" /> }]}
        rows={[{ label: "3 nights at $140.00", value: "$420.00" }, { label: "Cleaning", value: "$30.00" }, { label: "Service fee", value: "$38.00" }]}
        total="$488.00"
        method={<ListRow title="Visa ···· 4821" sub="Expires 08/28" lead={<ListIcon><Icon icon={creditCard} /></ListIcon>} endSub="Change" onClick={() => {}} />}
        action={<Button fullWidth disabled={paid} onClick={() => setPaid(true)}>{paid ? "Paid" : "Pay $488.00"}</Button>}
        note={paid ? "A receipt is on its way to your inbox." : "Free cancellation until Nov 22."}
      />
    </div>
  )
}
