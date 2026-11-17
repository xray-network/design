import { useState } from "react"
import { Field } from "@protocol/components/field/field"
import { Select } from "@protocol/components/select/select"

export default function SelectExample() {
  const [network, setNetwork] = useState("mainnet")
  return (
    <>
      <Field label="Network">
        {(p) => (
          <Select
            {...p}
            name="network"
            value={network}
            onValueChange={setNetwork}
            options={[
              { value: "mainnet", label: "Cardano Mainnet", note: "Block 14,187,156" },
              { value: "preprod", label: "Cardano Preprod", note: "Testnet" },
              { value: "preview", label: "Cardano Preview", note: "Unavailable", disabled: true },
            ]}
          />
        )}
      </Field>
      <Select aria-label="Sort by" size="sm" defaultValue="value" options={[{ value: "value", label: "Value" }, { value: "name", label: "Name" }, { value: "change", label: "Change 24h" }]} />
    </>
  )
}
