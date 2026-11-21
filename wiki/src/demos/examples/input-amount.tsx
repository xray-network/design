import { useState } from "react"
import { InputAmount } from "@protocol/components/input-amount/input-amount"
import { toast } from "@protocol/components/toast/toast"

const PRICE = 3208.4
const BALANCE = "2.41"
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" })

export default function AmountExample({ loading = false }: { loading?: boolean }) {
  const [pay, setPay] = useState("1.5")
  const value = Number(pay) || 0
  const over = value > Number(BALANCE)
  return (
    <>
      <InputAmount
        label="You pay"
        value={pay}
        onValueChange={setPay}
        decimals={8}
        currency="ETH"
        currencyMark={<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="currentColor" /></svg>}
        onCurrencyClick={() => toast("Open your currency picker here")}
        currencyLabel="Change currency, ETH"
        balance={`Balance ${BALANCE}`}
        max={BALANCE}
        fiat={`≈ ${usd(value * PRICE)}`}
        error={over ? `More than your balance of ${BALANCE} ETH` : undefined}
        loading={loading}
      />
      <InputAmount label="You receive" size="sm" value={(value * PRICE * 0.997).toFixed(2)} readOnly currency="USDC" fiat={`≈ ${usd(value * PRICE * 0.997)}`} loading={loading} />
    </>
  )
}
