import { useEffect, useState } from "react"
import { Swap } from "@protocol/blocks/swap/swap"
import { toast } from "@protocol/components/toast/toast"

// A stand-in quote: the app would ask its exchange for these.
const PRICES: Record<string, number> = { ETH: 3201.41, USDC: 1 }
const BALANCES: Record<string, string> = { ETH: "2.41", USDC: "120" }
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" })

export default function SwapExample({ loading = false }: { loading?: boolean }) {
  const [pair, setPair] = useState<[string, string]>(["ETH", "USDC"])
  const [pay, setPay] = useState("1.5")
  const [quoting, setQuoting] = useState(false)
  const [from, to] = pair

  // Every change re-quotes after a short wait, as a real quote would.
  useEffect(() => {
    setQuoting(true)
    const timer = setTimeout(() => setQuoting(false), 600)
    return () => clearTimeout(timer)
  }, [pay, from])

  const amount = Number(pay) || 0
  const rate = PRICES[from] / PRICES[to]
  const received = amount * rate * 0.997
  const decimals = to === "ETH" ? 6 : 2
  return (
    <Swap
      pay={{
        value: pay,
        onValueChange: setPay,
        currency: from,
        balance: `Balance ${BALANCES[from]}`,
        max: BALANCES[from],
        decimals: from === "ETH" ? 8 : 2,
        fiat: `≈ ${usd(amount * PRICES[from])}`,
        error: amount > Number(BALANCES[from]) ? `More than your balance of ${BALANCES[from]} ${from}` : undefined,
        onCurrencyClick: () => toast("Open your currency picker here"),
        currencyLabel: `Change currency, ${from}`,
      }}
      receive={{ value: received ? received.toFixed(decimals) : "", currency: to, balance: `Balance ${BALANCES[to]}`, fiat: `≈ ${usd(received * PRICES[to])}` }}
      onFlip={() => {
        setPair([to, from])
        setPay(received ? received.toFixed(decimals) : "")
      }}
      details={[
        { term: "Rate", value: `1 ${from} = ${rate.toLocaleString("en-US", { maximumFractionDigits: 6 })} ${to}` },
        { term: "Network fee", value: "$1.84" },
        { term: "Minimum received", value: `${(received * 0.995).toFixed(decimals)} ${to}` },
      ]}
      quoting={quoting || loading}
      onReview={() => toast(`Review: ${pay} ${from} → ${received.toFixed(decimals)} ${to}`)}
    />
  )
}
