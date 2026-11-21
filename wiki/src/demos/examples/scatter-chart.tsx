import { useState } from "react"
import { Segmented } from "@protocol/components/segmented/segmented"
import { ScatterChart, type ChartData } from "@protocol/charts/scatter-chart/scatter-chart"

const DATA: ChartData = {"labels": ["Acme Studio", "Northwind", "Delta Works", "Mira Lindqvist", "Kai Nakamura", "Harbour Co", "Orchard Ltd", "Glacier Inc", "Meadow & Sons", "Ember Labs", "Tidewater", "Fjord Systems"], "series": [{"name": "Orders", "values": [42, 31, 58, 6, 12, 24, 37, 49, 18, 9, 28, 66]}, {"name": "Revenue", "values": [18400, 12100, 26300, 1900, 3600, 14800, 13900, 19700, 6200, 9800, 9100, 24100]}]}

export default function ScatterChartExample() {
  const [view, setView] = useState<"chart" | "table">("chart")
  return (
    <div className="wiki-demo-charts">
      <div className="wiki-demo-toolbar">
        <div className="wiki-demo-toolbar-group"><span>Hover or use the arrow keys to read a value</span></div>
        <Segmented aria-label="View" size="sm" value={view} onValueChange={setView} options={[{ value: "chart", label: "Chart" }, { value: "table", label: "Table" }]} />
      </div>
      <ScatterChart title="Orders and revenue per customer" category="Customer" data={DATA} view={view} />
    </div>
  )
}
