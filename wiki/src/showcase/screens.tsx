// Showcase screens: whole app screens composed only from kit components and blocks, with no styles of their own
// beyond layout (showcase.css). Each one is listed in navigation.ts `showcase`, with the parts it uses.

import { useState, type ReactNode } from "react"
import { Button } from "@protocol/components/button/button"
import { Checkbox, CheckboxGroup } from "@protocol/components/checkbox/checkbox"
import { Field, TextField } from "@protocol/components/input/input"
import { RadioGroup } from "@protocol/components/radio/radio"
import { Select } from "@protocol/components/select/select"
import { Switch } from "@protocol/components/switch/switch"
import { toast } from "@protocol/components/toast/toast"

// One row per group, the label on the left and its controls on the right.

const Setting = ({ title, text, children }: { title: string; text: string; children: ReactNode }) => (
  <div className="wiki-showcase-setting">
    <div><h3>{title}</h3><p>{text}</p></div>
    <div className="wiki-showcase-setting-controls">{children}</div>
  </div>
)

export function SettingsFormScreen() {
  const [network, setNetwork] = useState("us-east")
  const [notify, setNotify] = useState({ received: true, sent: true, rewards: false })
  return (
    <div className="wiki-showcase-settings">
      <Setting title="Account" text="How this account appears in the switcher.">
        <TextField label="Account name" defaultValue="Main account" />
      </Setting>
      <Setting title="Region" text="Where your data is stored and processed.">
        <Field label="Network">
          {(p) => (
            <Select
              {...p}
              value={network}
              onValueChange={setNetwork}
              options={[
                { value: "us-east", label: "US East", note: "Virginia" },
                { value: "eu-west", label: "EU West", note: "Ireland" },
              ]}
            />
          )}
        </Field>
      </Setting>
      <Setting title="Display" text="Currency for fiat values, and the theme.">
        <RadioGroup legend="Currency" defaultValue="usd" options={[{ value: "usd", label: "US dollar" }, { value: "eur", label: "Euro" }, { value: "gbp", label: "British pound" }]} />
        <RadioGroup legend="Theme" direction="row" defaultValue="system" options={[{ value: "system", label: "System" }, { value: "light", label: "Light" }, { value: "dark", label: "Dark" }]} />
      </Setting>
      <Setting title="Notifications" text="What this device tells you about.">
        <CheckboxGroup legend="Notify me about">
          <Checkbox checked={notify.received} onChange={(e) => setNotify({ ...notify, received: e.target.checked })}>Incoming funds</Checkbox>
          <Checkbox checked={notify.sent} onChange={(e) => setNotify({ ...notify, sent: e.target.checked })}>Outgoing transactions</Checkbox>
          <Checkbox checked={notify.rewards} onChange={(e) => setNotify({ ...notify, rewards: e.target.checked })}>Refunds</Checkbox>
        </CheckboxGroup>
      </Setting>
      <Setting title="Security" text="Applies to this device only.">
        <Switch defaultChecked>Lock after 5 minutes</Switch>
        <Switch>Hide balances on open</Switch>
      </Setting>
      {/* The form's buttons line up with the controls column, under the fields they save. */}
      <div className="wiki-showcase-row wiki-showcase-actions">
        <Button onClick={() => toast("Settings saved", { tone: "success" })}>Save changes</Button>
        <Button variant="ghost">Cancel</Button>
      </div>
      {/* Danger zone: after the form and its buttons, apart from them, so it is never taken for part of saving. */}
      <section className="wiki-showcase-danger" aria-labelledby="settings-danger">
        <h2 id="settings-danger">Danger zone</h2>
        <Setting title="Remove account" text="Invoices and payment history stay available to admins.">
          <Button variant="danger" onClick={() => toast("Account removed", { tone: "success" })}>Remove account</Button>
        </Setting>
      </section>
    </div>
  )
}
