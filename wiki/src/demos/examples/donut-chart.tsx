import { DonutChart } from "@protocol/charts/donut-chart/donut-chart"

const HOLDINGS = { labels: ["Wrapped Bitcoin", "Ether", "USD Coin", "Chainlink"], series: [{ name: "Value", values: [9640, 4812, 1200, 318] }] }
// Eight parts: the donut keeps the first five and folds the rest into Other.
const METHODS = {
  labels: ["Card", "Bank transfer", "Wallet", "Apple Pay", "Google Pay", "SEPA", "ACH", "Wire"],
  series: [{ name: "Payments", values: [612, 284, 173, 96, 71, 38, 22, 9] }],
}
const usd = (value: number) => "$" + value.toLocaleString("en-US")

export default function DonutChartExample() {
  return (
    <div className="wiki-demo-donuts">
      <DonutChart title="Holdings" category="Asset" total="Portfolio" data={HOLDINGS} format={usd} />
      {/* On a panel: the gaps between the parts take the panel's color. */}
      <div className="wiki-demo-chart-panel">
        <DonutChart title="Payment methods" category="Method" total="Payments" data={METHODS} />
      </div>
    </div>
  )
}
