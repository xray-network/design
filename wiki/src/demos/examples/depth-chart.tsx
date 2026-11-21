import { useState } from "react"
import { Segmented } from "@protocol/components/segmented/segmented"
import { DepthChart, type ChartData } from "@protocol/charts/depth-chart/depth-chart"

const DATA: ChartData = {"labels": ["3,190", "3,192", "3,194", "3,196", "3,198", "3,200", "3,202", "3,204", "3,208", "3,210", "3,212", "3,214", "3,216", "3,218", "3,220", "3,222"], "series": [{"name": "Bids", "values": [140, 126, 104, 95, 64, 46, 20, 8, 0, 0, 0, 0, 0, 0, 0, 0]}, {"name": "Asks", "values": [0, 0, 0, 0, 0, 0, 0, 0, 7, 22, 50, 61, 95, 114, 138, 154]}]}

export default function DepthChartExample() {
  const [view, setView] = useState<"chart" | "table">("chart")
  return (
    <div className="wiki-demo-charts">
      <div className="wiki-demo-toolbar">
        <div className="wiki-demo-toolbar-group"><span>Hover or use the arrow keys to read a value</span></div>
        <Segmented aria-label="View" size="sm" value={view} onValueChange={setView} options={[{ value: "chart", label: "Chart" }, { value: "table", label: "Table" }]} />
      </div>
      <DepthChart title="ETH / USDC order book" category="Price" data={DATA} view={view} />
    </div>
  )
}
