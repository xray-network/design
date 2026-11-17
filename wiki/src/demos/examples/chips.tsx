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
        options={[{ value: "all", label: "All" }, { value: "sent", label: "Sent", count: 3 }, { value: "received", label: "Received", count: 2 }, { value: "staking", label: "Staking", count: 1 }, { value: "tokens", label: "Tokens", disabled: true }]}
      />
      <p className="wiki-demo-note">Showing: {type[0]}</p>
      <Chips aria-label="Chains" multiple defaultValue={["cardano", "bitcoin"]} options={[{ value: "cardano", label: "Cardano" }, { value: "bitcoin", label: "Bitcoin" }, { value: "midnight", label: "Midnight" }, { value: "ethereum", label: "Ethereum" }]} />
    </>
  )
}
