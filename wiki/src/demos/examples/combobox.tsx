import { useState } from "react"
import { Combobox } from "@protocol/components/combobox/combobox"
import { Field } from "@protocol/components/input/input"

const TOKENS = [
  { value: "eth", label: "Ether", note: "ETH", keywords: "eth ethereum" },
  { value: "usdc", label: "USD Coin", note: "USDC", keywords: "usdc stablecoin" },
  { value: "usdt", label: "Tether", note: "USDT", keywords: "usdt stablecoin" },
  { value: "btc", label: "Wrapped Bitcoin", note: "WBTC", keywords: "wbtc btc" },
  { value: "dai", label: "Dai", note: "Paused", keywords: "dai stablecoin", disabled: true },
  { value: "link", label: "Chainlink", note: "LINK", keywords: "link" },
  { value: "uni", label: "Uniswap", note: "UNI", keywords: "uni" },
]

const NETWORKS = [
  { value: "eth", label: "Ethereum" },
  { value: "base", label: "Base" },
  { value: "arb", label: "Arbitrum" },
  { value: "op", label: "Optimism" },
  { value: "poly", label: "Polygon" },
  { value: "sol", label: "Solana", note: "Soon", disabled: true },
]

export default function ComboboxExample() {
  const [token, setToken] = useState("eth")
  const [networks, setNetworks] = useState(["eth", "base"])
  return (
    <>
      <Field label="Token" hint="Type a name or a ticker.">
        {(p) => <Combobox {...p} name="token" value={token} onValueChange={setToken} placeholder="Search tokens" options={TOKENS} />}
      </Field>
      <Field label="Networks" hint="Pick several. Backspace removes the last one.">
        {(p) => <Combobox {...p} multiple name="networks" value={networks} onValueChange={setNetworks} placeholder="Search networks" options={NETWORKS} />}
      </Field>
      <Combobox aria-label="Country" size="sm" placeholder="Country" options={[{ value: "pt", label: "Portugal" }, { value: "es", label: "Spain" }, { value: "fr", label: "France" }, { value: "de", label: "Germany" }]} />
    </>
  )
}
