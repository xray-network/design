import { useState } from "react"
import { Checkbox, CheckboxGroup } from "@protocol/components/checkbox/checkbox"

export default function CheckboxExample() {
  const [items, setItems] = useState({ received: true, sent: true, rewards: false })
  const all = Object.values(items)
  return (
    <CheckboxGroup legend="Notifications">
      <Checkbox
        checked={all.every(Boolean)}
        indeterminate={all.some(Boolean) && !all.every(Boolean)}
        onChange={(e) => setItems({ received: e.target.checked, sent: e.target.checked, rewards: e.target.checked })}
      >
        All notifications
      </Checkbox>
      <Checkbox checked={items.received} onChange={(e) => setItems({ ...items, received: e.target.checked })} description="When an address of yours receives funds">Incoming funds</Checkbox>
      <Checkbox checked={items.sent} onChange={(e) => setItems({ ...items, sent: e.target.checked })}>Outgoing transactions</Checkbox>
      <Checkbox checked={items.rewards} onChange={(e) => setItems({ ...items, rewards: e.target.checked })}>Refunds</Checkbox>
      <Checkbox disabled>Product updates</Checkbox>
    </CheckboxGroup>
  )
}
