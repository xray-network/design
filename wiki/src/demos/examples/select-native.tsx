import { useState } from "react"
import { Field } from "@protocol/components/input/input"
import { SelectNative } from "@protocol/components/select-native/select-native"

// The same choices as the Select demo. Native options cannot show Select's notes (Virginia, Ireland).
export default function SelectNativeExample() {
  const [region, setRegion] = useState("us-east")
  return (
    <>
      <Field label="Region">
        {(p) => (
          <SelectNative
            {...p}
            name="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            options={[
              { value: "us-east", label: "US East" },
              { value: "eu-west", label: "EU West" },
              { value: "ap-south", label: "Asia Pacific", disabled: true },
            ]}
          />
        )}
      </Field>
      <SelectNative aria-label="Sort by" size="sm" defaultValue="value" options={[{ value: "value", label: "Value" }, { value: "name", label: "Name" }, { value: "change", label: "Change 24h" }]} />
    </>
  )
}
