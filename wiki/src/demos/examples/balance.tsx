import { useState } from "react"
import { Balance } from "@protocol/blocks/balance/balance"
import { Button } from "@protocol/components/button/button"
import { Switch } from "@protocol/components/switch/switch"
import { toast } from "@protocol/components/toast/toast"

export default function BalanceExample({ loading = false }: { loading?: boolean }) {
  const [masked, setMasked] = useState(false)
  return (
    <>
      <Balance loading={loading}
        value="12,480.25"
        ticker="USD"
        fiat="≈ €11,442.10"
        change={2.4}
        masked={masked}
        actions={
          <>
            <Button onClick={() => toast("Send")}>Send</Button>
            <Button variant="ghost" onClick={() => toast("Request")}>Request</Button>
            <Button variant="ghost" onClick={() => toast("Add funds")}>Add funds</Button>
          </>
        }
      />
      <Switch size="sm" checked={masked} onChange={(e) => setMasked(e.target.checked)}>Hide balances</Switch>
    </>
  )
}
