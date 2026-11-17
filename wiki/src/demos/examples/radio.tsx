import { useState } from "react"
import { RadioGroup } from "@protocol/components/radio/radio"

export default function RadioExample() {
  const [currency, setCurrency] = useState("usd")
  return (
    <>
      <RadioGroup
        legend="Currency"
        value={currency}
        onValueChange={setCurrency}
        options={[
          { value: "usd", label: "US dollar" },
          { value: "eur", label: "Euro" },
          { value: "ada", label: "ADA", description: "Show balances in the native asset" },
          { value: "btc", label: "Bitcoin", disabled: true },
        ]}
      />
      <RadioGroup legend="Theme" direction="row" defaultValue="system" options={[{ value: "system", label: "System" }, { value: "light", label: "Light" }, { value: "dark", label: "Dark" }]} />
    </>
  )
}
