import { useState } from "react"
import { Segmented } from "@protocol/components/segmented/segmented"
import { StackedBarChart, type ChartData } from "@protocol/charts/stacked-bar-chart/stacked-bar-chart"

const DATA: ChartData = {"labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], "series": [{"name": "Card", "values": [26100, 29800, 28400, 33200, 37900, 39400]}, {"name": "Bank transfer", "values": [11600, 13200, 12900, 14800, 17100, 17600]}, {"name": "Wallet", "values": [4300, 5500, 4900, 5900, 6900, 7200]}]}
const usd = (value: number) => "$" + new Intl.NumberFormat("en-US", { notation: Math.abs(value) >= 10000 ? "compact" : "standard", maximumFractionDigits: 1 }).format(value)

export default function StackedBarChartExample() {
  const [view, setView] = useState<"chart" | "table">("chart")
  return (
    <div className="wiki-demo-charts">
      <div className="wiki-demo-toolbar">
        <div className="wiki-demo-toolbar-group"><span>Hover or use the arrow keys to read a value</span></div>
        <Segmented aria-label="View" size="sm" value={view} onValueChange={setView} options={[{ value: "chart", label: "Chart" }, { value: "table", label: "Table" }]} />
      </div>
      <StackedBarChart title="Volume by payment method" category="Month" data={DATA} format={usd} view={view} />
    </div>
  )
}
