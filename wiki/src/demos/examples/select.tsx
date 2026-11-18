import { useState } from "react"
import { Field } from "@protocol/components/field/field"
import { Select } from "@protocol/components/select/select"

export default function SelectExample() {
  const [network, setNetwork] = useState("us-east")
  return (
    <>
      <Field label="Region">
        {(p) => (
          <Select
            {...p}
            name="region"
            value={network}
            onValueChange={setNetwork}
            options={[
              { value: "us-east", label: "US East", note: "Virginia" },
              { value: "eu-west", label: "EU West", note: "Ireland" },
              { value: "ap-south", label: "Asia Pacific", note: "Unavailable", disabled: true },
            ]}
          />
        )}
      </Field>
      <Select aria-label="Sort by" size="sm" defaultValue="value" options={[{ value: "value", label: "Value" }, { value: "name", label: "Name" }, { value: "change", label: "Change 24h" }]} />
    </>
  )
}
