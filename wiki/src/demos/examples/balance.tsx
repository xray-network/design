import { useState } from "react"
import { Balance } from "@protocol/blocks/balance/balance"
import { Button } from "@protocol/components/button/button"
import { Switch } from "@protocol/components/switch/switch"
import { toast } from "@protocol/components/toast/toast"

export default function BalanceExample() {
  const [masked, setMasked] = useState(false)
  return (
    <>
      <Balance
        value="12,480.254221"
        ticker="ADA"
        fiat="$8,736.18 USD"
        change={2.4}
        masked={masked}
        actions={
          <>
            <Button onClick={() => toast("Send")}>Send</Button>
            <Button variant="ghost" onClick={() => toast("Receive")}>Receive</Button>
            <Button variant="ghost" onClick={() => toast("Stake")}>Stake</Button>
          </>
        }
      />
      <Switch size="sm" checked={masked} onChange={(e) => setMasked(e.target.checked)}>Hide balances</Switch>
    </>
  )
}
