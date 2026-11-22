import { useState } from "react"
import { AssetList } from "@protocol/blocks/asset-list/asset-list"
import { Switch } from "@protocol/components/switch/switch"
import { Icon } from "@protocol/components/icon/icon"
import { bitcoin, chainlink, ethereum, usdc } from "@protocol/components/icon/crypto.js"

const ICON = { btc: bitcoin, eth: ethereum, usdc, link: chainlink }

const ASSETS = [
  { id: "btc", name: "Bitcoin", amount: "0.1 BTC", value: "$9,641.21", change: 1.8, share: 0.6 },
  { id: "eth", name: "Ether", amount: "1.5 ETH", value: "$4,812.60", change: -0.9, share: 0.3 },
  { id: "usdc", name: "USD Coin", amount: "1,200 USDC", value: "$1,200.00", change: 0, share: 0.075 },
  { id: "link", name: "Chainlink", amount: "21.4 LINK", value: "$318.00", change: 0.6, share: 0.02 },
]

export default function AssetListExample() {
  const [masked, setMasked] = useState(false)
  return (
    <div style={{ display: "grid", gap: "var(--x-space-3)", width: 400, maxWidth: "100%" }}>
      <Switch size="sm" checked={masked} onChange={(event) => setMasked(event.target.checked)}>Hide balances</Switch>
      <AssetList
        aria-label="Assets"
        masked={masked}
        items={ASSETS.map((asset) => ({ ...asset, lead: <span className="x-list-token" data-tone="neutral" aria-hidden="true"><Icon icon={ICON[asset.id as keyof typeof ICON]} /></span> }))}
      />
    </div>
  )
}
