import { useState } from "react"
import { Settings } from "@protocol/blocks/settings/settings"
import { Button } from "@protocol/components/button/button"
import { Checkbox, CheckboxGroup } from "@protocol/components/checkbox/checkbox"
import { TextField } from "@protocol/components/input/input"
import { RadioGroup } from "@protocol/components/radio/radio"
import { Switch } from "@protocol/components/switch/switch"

export default function SettingsExample() {
  const [saved, setSaved] = useState(false)
  return (
    <div style={{ alignSelf: "stretch" }}>
      <Settings
        onSubmit={() => setSaved(true)}
        onReset={() => setSaved(false)}
        actions={<><Button type="submit" size="sm">{saved ? "Saved" : "Save changes"}</Button><Button type="reset" variant="ghost" size="sm">Cancel</Button></>}
        sections={[
          { title: "Profile", description: "Shown on receipts and invoices.", fields: <><TextField label="Business name" defaultValue="Acme Studio" autoComplete="off" /><TextField label="Email" type="email" defaultValue="billing@acme.studio" hint="We send receipts and alerts here." autoComplete="off" /></> },
          { title: "Preferences", description: "How the dashboard looks.", fields: <RadioGroup legend="Theme" direction="row" defaultValue="system" options={[{ value: "system", label: "System" }, { value: "light", label: "Light" }, { value: "dark", label: "Dark" }]} /> },
          { title: "Notifications", description: "What we write to you about.", fields: <CheckboxGroup legend="Email me about"><Checkbox defaultChecked description="Each successful payment over $500">Payments</Checkbox><Checkbox defaultChecked>Refunds and disputes</Checkbox><Checkbox>Product updates</Checkbox></CheckboxGroup> },
          { title: "Security", description: "Who can get in, and how.", fields: <><Switch labelPosition="start" defaultChecked>Two-step sign-in</Switch><Switch labelPosition="start">Sign out after 30 minutes</Switch></> },
          { title: "Danger zone", description: "These cannot be undone.", tone: "danger", fields: <Button variant="danger" size="sm">Close account</Button> },
        ]}
      />
    </div>
  )
}
