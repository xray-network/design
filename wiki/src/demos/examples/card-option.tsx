import { useState } from "react"
import { CardOption } from "@protocol/components/card-option/card-option"

export default function OptionCardsExample({ loading = false }: { loading?: boolean }) {
  const [fee, setFee] = useState<"slow" | "standard" | "fast">("standard")
  return (
    <>
      <div style={{ alignSelf: "stretch" }}>
        <CardOption loading={loading}
          aria-label="Payout speed"
          value={fee}
          onValueChange={setFee}
          options={[
            { value: "slow", title: "Standard", description: "2–3 business days", detail: "Free" },
            { value: "standard", title: "Same day", description: "Before 6 pm", detail: "$1.00" },
            { value: "fast", title: "Instant", description: "In seconds", detail: "$2.50" },
          ]}
        />
      </div>
    </>
  )
}
