import { useState } from "react"
import { ChartCard } from "@protocol/blocks/chart-card/chart-card"
import { LineChart } from "@protocol/charts/line-chart/line-chart"
import { Segmented } from "@protocol/components/segmented/segmented"

const PERIODS = {
  "7d": { value: "$19,480", delta: 4.2, note: "on the 7 days before", labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], values: [2400, 2900, 2700, 3100, 3300, 2500, 2580] },
  "30d": { value: "$84,120", delta: 12.0, note: "on the 30 days before", labels: ["Oct 27", "Nov 3", "Nov 10", "Nov 17"], values: [17200, 19800, 21400, 25720] },
  "90d": { value: "$231,400", delta: -2.1, note: "on the 90 days before", labels: ["Sep", "Oct", "Nov"], values: [78900, 70300, 82200] },
}
const usd = (value: number) => "$" + new Intl.NumberFormat("en-US", { notation: Math.abs(value) >= 10000 ? "compact" : "standard", maximumFractionDigits: 1 }).format(value)

export default function ChartCardExample({ loading = false }: { loading?: boolean }) {
  const [period, setPeriod] = useState<keyof typeof PERIODS>("30d")
  const data = PERIODS[period]
  return (
    <div style={{ alignSelf: "stretch" }}>
      <ChartCard
        loading={loading}
        title="Gross volume"
        value={data.value}
        delta={data.delta}
        note={data.note}
        controls={<Segmented aria-label="Period" size="sm" value={period} onValueChange={setPeriod} options={[{ value: "7d", label: "7D" }, { value: "30d", label: "30D" }, { value: "90d", label: "90D" }]} />}
      >
        <LineChart aria-label="Gross volume" area height={160} format={usd} data={{ labels: data.labels, series: [{ name: "Volume", values: data.values }] }} />
      </ChartCard>
    </div>
  )
}
