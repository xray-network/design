import { useState } from "react"
import { Segmented } from "@protocol/components/segmented/segmented"
import { BarChart } from "@protocol/charts/bar-chart/bar-chart"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
const MONEY = {
  labels: MONTHS,
  series: [
    { name: "Payouts", values: [18200, 21400, 19800, 24100, 26500, 25200] },
    { name: "Refunds", values: [1200, 900, 1500, 1100, 800, 1300] },
    { name: "Fees", values: [640, 760, 700, 850, 930, 890] },
  ],
}
const NET = { labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], series: [{ name: "Net flow", values: [420, 610, -180, 760, 940, -320, 150] }] }
const usd = (value: number) => (value < 0 ? "−$" : "$") + new Intl.NumberFormat("en-US", { notation: Math.abs(value) >= 10000 ? "compact" : "standard", maximumFractionDigits: 1 }).format(Math.abs(value))

export default function BarChartExample() {
  const [view, setView] = useState<"chart" | "table">("chart")
  return (
    <div className="wiki-demo-charts">
      <div className="wiki-demo-toolbar">
        <div className="wiki-demo-toolbar-group"><span>Hover to read a category · press a label to hide its bars</span></div>
        <Segmented aria-label="View" size="sm" value={view} onValueChange={setView} options={[{ value: "chart", label: "Chart" }, { value: "table", label: "Table" }]} />
      </div>
      <BarChart title="Payouts, refunds and fees" category="Month" data={MONEY} format={usd} view={view} />
      <BarChart title="Net flow this week" category="Day" height={160} data={NET} format={usd} view={view} />
    </div>
  )
}
