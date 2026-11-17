import { useState } from "react"
import { OptionCards } from "@protocol/blocks/option/option"

export default function OptionCardsExample() {
  const [fee, setFee] = useState<"slow" | "standard" | "fast">("standard")
  return (
    <>
      <div style={{ alignSelf: "stretch" }}>
        <OptionCards
          aria-label="Network fee"
          value={fee}
          onValueChange={setFee}
          options={[
            { value: "slow", title: "Slow", description: "About 5 min", detail: "0.12 ADA" },
            { value: "standard", title: "Standard", description: "About 20 s", detail: "0.17 ADA" },
            { value: "fast", title: "Fast", description: "About 5 s", detail: "0.42 ADA" },
          ]}
        />
      </div>
    </>
  )
}
