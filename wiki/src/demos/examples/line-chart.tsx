import { useState } from "react"
import { Segmented } from "@protocol/components/segmented/segmented"
import { LineChart } from "@protocol/charts/line-chart/line-chart"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const REVENUE = {
  labels: MONTHS,
  series: [
    { name: "2026", values: [42000, 48500, 46200, 53900, 61900, 64200, 60800, 67400, 72100, 70300, 78900, 84120] },
    { name: "2025", values: [31000, 33800, 36100, 35200, 41700, 45900, 44200, 47800, 52600, 51900, 55300, 60400] },
  ],
}
const PAYMENTS = { labels: MONTHS, series: [{ name: "Payments", values: [1020, 1180, 1090, 1284, 1410, 1502, 1466, 1590, 1712, 1688, 1840, 1936] }] }
const usd = (value: number) => "$" + new Intl.NumberFormat("en-US", { notation: value >= 10000 ? "compact" : "standard", maximumFractionDigits: 1 }).format(value)

export default function LineChartExample() {
  const [view, setView] = useState<"chart" | "table">("chart")
  return (
    <div className="wiki-demo-charts">
      <div className="wiki-demo-toolbar">
        <div className="wiki-demo-toolbar-group"><span>Hover to read a month · press a label to hide its line</span></div>
        <Segmented aria-label="View" size="sm" value={view} onValueChange={setView} options={[{ value: "chart", label: "Chart" }, { value: "table", label: "Table" }]} />
      </div>
      <LineChart title="Revenue" category="Month" data={REVENUE} format={usd} view={view} />
      <LineChart title="Payments per month" category="Month" area height={160} data={PAYMENTS} view={view} />
    </div>
  )
}
