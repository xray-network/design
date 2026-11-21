import { useState } from "react"
import { IconButton } from "@protocol/components/button/button"
import { Icon } from "@protocol/components/icon/icon"
import { minus, plus } from "@protocol/components/icon/icons.js"
import { Segmented } from "@protocol/components/segmented/segmented"
import { Reflow } from "@protocol/motion/reflow/reflow"

type Asset = { id: string; name: string; value: number }
type Sort = "added" | "name" | "value"
// Every asset the demo knows. It starts with the first five; Add brings in the next one that is not in the list,
// including any that were removed, so the list can always be filled again.
const ALL: Asset[] = [
  { id: "eth", name: "Ether", value: 4812.6 },
  { id: "usdc", name: "USD Coin", value: 1200 },
  { id: "btc", name: "Wrapped Bitcoin", value: 9640.12 },
  { id: "link", name: "Chainlink", value: 318.77 },
  { id: "uni", name: "Uniswap", value: 96.4 },
  { id: "dai", name: "Dai", value: 540 },
  { id: "aave", name: "Aave", value: 212.5 },
  { id: "sol", name: "Solana", value: 1875.3 },
]
const ORDER: Record<Sort, (a: Asset, b: Asset) => number> = {
  added: () => 0,
  name: (a, b) => a.name.localeCompare(b.name),
  value: (a, b) => b.value - a.value,
}
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" })

export default function ReflowExample() {
  // Kept in the order they were added; the sort only decides how they are shown, so a new row lands in its place.
  const [items, setItems] = useState(() => ALL.slice(0, 5))
  const [sort, setSort] = useState<Sort>("added")
  const shown = [...items].sort(ORDER[sort])
  const next = ALL.find((asset) => !items.some((i) => i.id === asset.id))
  return (
    <div className="wiki-demo-motion">
      <div className="wiki-demo-toolbar">
        <div className="wiki-demo-toolbar-group">
          <span>Sort by</span>
          <Segmented
            aria-label="Sort by"
            size="sm"
            value={sort}
            onValueChange={setSort}
            options={[{ value: "added", label: "Added" }, { value: "name", label: "Name" }, { value: "value", label: "Value" }]}
          />
        </div>
        <div className="wiki-demo-toolbar-group">
          <span aria-live="polite">{items.length} {items.length === 1 ? "asset" : "assets"}</span>
          <IconButton aria-label="Remove the first asset" size="sm" disabled={!items.length} onClick={() => setItems(items.filter((i) => i.id !== shown[0].id))}><Icon icon={minus} /></IconButton>
          <IconButton aria-label="Add an asset" size="sm" disabled={!next} onClick={() => next && setItems([...items, next])}><Icon icon={plus} /></IconButton>
        </div>
      </div>
      <Reflow className="wiki-demo-reflow">
        {shown.map((item) => (
          <li key={item.id}><strong>{item.name}</strong><span>{usd(item.value)}</span></li>
        ))}
      </Reflow>
    </div>
  )
}
