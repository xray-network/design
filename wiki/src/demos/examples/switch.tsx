import { useState } from "react"
import { Switch } from "@protocol/components/switch/switch"

export default function SwitchExample() {
  const [hidden, setHidden] = useState(true)
  return (
    <>
      <Switch checked={hidden} onChange={(e) => setHidden(e.target.checked)}>Hide balances</Switch>
      <Switch labelPosition="start">Lock after 5 minutes</Switch>
      <Switch size="sm" disabled>Testnet (unavailable)</Switch>
    </>
  )
}
