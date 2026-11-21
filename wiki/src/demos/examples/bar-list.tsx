import { useState } from "react"
import { Segmented } from "@protocol/components/segmented/segmented"
import { BarList, type ChartData } from "@protocol/charts/bar-list/bar-list"

const DATA: ChartData = {"labels": ["/v1/accounts", "/v1/transactions", "/v1/transfers", "/v1/webhooks", "/v1/customers/search"], "series": [{"name": "Requests", "values": [18420, 12904, 3118, 1206, 842]}]}

export default function BarListExample() {
  const [view, setView] = useState<"chart" | "table">("chart")
  return (
    <div className="wiki-demo-charts">
      <div className="wiki-demo-toolbar">
        <div className="wiki-demo-toolbar-group"><span>Every value is written above its bar</span></div>
        <Segmented aria-label="View" size="sm" value={view} onValueChange={setView} options={[{ value: "chart", label: "Chart" }, { value: "table", label: "Table" }]} />
      </div>
      <BarList title="Requests by endpoint" category="Endpoint" data={DATA} view={view} />
    </div>
  )
}
