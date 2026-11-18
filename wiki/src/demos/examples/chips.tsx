import { useState } from "react"
import { Chips } from "@protocol/components/chips/chips"

export default function ChipsExample() {
  const [type, setType] = useState(["all"])
  return (
    <>
      <Chips
        aria-label="Transaction type"
        value={type}
        onValueChange={setType}
        options={[{ value: "all", label: "All" }, { value: "sent", label: "Sent", count: 3 }, { value: "received", label: "Received", count: 2 }, { value: "refunds", label: "Refunds", count: 1 }, { value: "tokens", label: "Tokens", disabled: true }]}
      />
      <Chips aria-label="Currencies" multiple defaultValue={["usd", "eur"]} options={[{ value: "usd", label: "USD" }, { value: "eur", label: "EUR" }, { value: "gbp", label: "GBP" }, { value: "jpy", label: "JPY" }]} />
    </>
  )
}
