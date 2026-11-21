import { useState } from "react"
import { Segmented } from "@protocol/components/segmented/segmented"
import { FunnelChart, type ChartData } from "@protocol/charts/funnel-chart/funnel-chart"

const DATA: ChartData = {"labels": ["Opened checkout", "Entered details", "Chose a method", "Paid"], "series": [{"name": "People", "values": [4820, 3610, 2940, 2512]}]}

export default function FunnelChartExample() {
  const [view, setView] = useState<"chart" | "table">("chart")
  return (
    <div className="wiki-demo-charts">
      <div className="wiki-demo-toolbar">
        <div className="wiki-demo-toolbar-group"><span>Every value is written beside its bar</span></div>
        <Segmented aria-label="View" size="sm" value={view} onValueChange={setView} options={[{ value: "chart", label: "Chart" }, { value: "table", label: "Table" }]} />
      </div>
      <FunnelChart title="Checkout, last 30 days" category="Step" data={DATA} view={view} />
    </div>
  )
}
