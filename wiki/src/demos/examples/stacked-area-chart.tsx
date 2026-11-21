import { useState } from "react"
import { Segmented } from "@protocol/components/segmented/segmented"
import { StackedAreaChart, type ChartData } from "@protocol/charts/stacked-area-chart/stacked-area-chart"

const DATA: ChartData = {"labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], "series": [{"name": "Main", "values": [8200, 9100, 8700, 10400, 11800, 12480]}, {"name": "Savings", "values": [31000, 33500, 36200, 40100, 44800, 48300]}, {"name": "Trading", "values": [5200, 6900, 6100, 7800, 9100, 9640]}]}
const usd = (value: number) => "$" + new Intl.NumberFormat("en-US", { notation: Math.abs(value) >= 10000 ? "compact" : "standard", maximumFractionDigits: 1 }).format(value)

export default function StackedAreaChartExample() {
  const [view, setView] = useState<"chart" | "table">("chart")
  return (
    <div className="wiki-demo-charts">
      <div className="wiki-demo-toolbar">
        <div className="wiki-demo-toolbar-group"><span>Hover or use the arrow keys to read a value</span></div>
        <Segmented aria-label="View" size="sm" value={view} onValueChange={setView} options={[{ value: "chart", label: "Chart" }, { value: "table", label: "Table" }]} />
      </div>
      <StackedAreaChart title="Balance by account" category="Month" data={DATA} format={usd} view={view} />
    </div>
  )
}
