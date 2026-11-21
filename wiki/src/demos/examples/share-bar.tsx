import { useState } from "react"
import { Segmented } from "@protocol/components/segmented/segmented"
import { ShareBar, type ChartData } from "@protocol/charts/share-bar/share-bar"

const DATA: ChartData = {"labels": ["Wrapped Bitcoin", "Ether", "USD Coin", "Chainlink"], "series": [{"name": "Value", "values": [9640, 4812, 1200, 318]}]}
const usd = (value: number) => "$" + new Intl.NumberFormat("en-US", { notation: Math.abs(value) >= 10000 ? "compact" : "standard", maximumFractionDigits: 1 }).format(value)

export default function ShareBarExample() {
  const [view, setView] = useState<"chart" | "table">("chart")
  return (
    <div className="wiki-demo-charts">
      <div className="wiki-demo-toolbar">
        <div className="wiki-demo-toolbar-group"><span>Hover a part to read it</span></div>
        <Segmented aria-label="View" size="sm" value={view} onValueChange={setView} options={[{ value: "chart", label: "Chart" }, { value: "table", label: "Table" }]} />
      </div>
      <ShareBar title="Portfolio" category="Asset" data={DATA} format={usd} view={view} />
    </div>
  )
}
