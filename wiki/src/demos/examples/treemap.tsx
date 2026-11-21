import { useState } from "react"
import { Segmented } from "@protocol/components/segmented/segmented"
import { Treemap, type ChartData } from "@protocol/charts/treemap/treemap"

// The largest companies of the S&P 500: market cap in billions of dollars, and the day's move in percent.
// Sample figures on a day when the whole market is up, not live quotes.
const COMPANIES: [string, number, number][] = [
  ["NVDA", 4300, 3.4], ["MSFT", 3800, 1.2], ["AAPL", 3500, 0.8], ["AMZN", 2400, 2.1], ["GOOGL", 2300, 1.7], ["META", 1900, 2.6],
  ["AVGO", 1600, 3.1], ["TSLA", 1100, 2.9], ["BRK.B", 1050, 0.4], ["JPM", 820, 1.1], ["WMT", 800, 0.3], ["LLY", 720, 1.9],
  ["V", 680, 0.7], ["ORCL", 650, 2.3], ["MA", 520, 0.9], ["NFLX", 510, 1.5], ["XOM", 480, 0.2], ["COST", 430, 0.6],
  ["JNJ", 420, 0.3], ["HD", 400, 1.0], ["PG", 370, 0.2], ["ABBV", 360, 1.3], ["BAC", 350, 1.4], ["KO", 300, 0.5],
]
const DATA: ChartData = {
  labels: COMPANIES.map(([ticker]) => ticker),
  series: [
    { name: "Market cap", values: COMPANIES.map(([, cap]) => cap) },
    { name: "Today", values: COMPANIES.map(([, , move]) => move), texts: COMPANIES.map(([, , move]) => `${move > 0 ? "+" : move < 0 ? "−" : ""}${Math.abs(move).toFixed(1)}%`) },
  ],
}
const cap = (billions: number) => (billions >= 1000 ? `$${(billions / 1000).toFixed(1)}T` : `$${billions}B`)

export default function TreemapExample() {
  const [view, setView] = useState<"chart" | "table">("chart")
  return (
    <div className="wiki-demo-charts">
      <div className="wiki-demo-toolbar">
        <div className="wiki-demo-toolbar-group"><span>Size is market cap, color is today's move · sample figures</span></div>
        <Segmented aria-label="View" size="sm" value={view} onValueChange={setView} options={[{ value: "chart", label: "Chart" }, { value: "table", label: "Table" }]} />
      </div>
      <Treemap title="S&P 500 · largest companies" category="Company" height={360} data={DATA} format={cap} view={view} />
    </div>
  )
}
