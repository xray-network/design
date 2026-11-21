import { useState } from "react"
import { Segmented } from "@protocol/components/segmented/segmented"
import { CandlestickChart, type ChartData } from "@protocol/charts/candlestick-chart/candlestick-chart"

const DATA: ChartData = {"labels": ["Nov 2", "Nov 3", "Nov 4", "Nov 5", "Nov 6", "Nov 7", "Nov 8", "Nov 9", "Nov 10", "Nov 11", "Nov 12", "Nov 13", "Nov 14", "Nov 15", "Nov 16", "Nov 17", "Nov 18", "Nov 19", "Nov 20", "Nov 21"], "series": [{"name": "Open", "values": [3050, 3078, 3037, 3092, 3104, 3041, 3078, 3127, 3109, 3180, 3151, 3166, 3210, 3158, 3191, 3252, 3240, 3264, 3228, 3286]}, {"name": "High", "values": [3092, 3101, 3124, 3118, 3127, 3110, 3141, 3150, 3212, 3194, 3189, 3242, 3224, 3214, 3284, 3266, 3287, 3296, 3300, 3328]}, {"name": "Low", "values": [3039, 3019, 3012, 3060, 3030, 3023, 3053, 3077, 3098, 3133, 3126, 3134, 3147, 3140, 3166, 3208, 3229, 3210, 3203, 3254]}, {"name": "Close", "values": [3078, 3037, 3092, 3104, 3041, 3078, 3127, 3109, 3180, 3151, 3166, 3210, 3158, 3191, 3252, 3240, 3264, 3228, 3286, 3305]}]}
const usd = (value: number) => "$" + new Intl.NumberFormat("en-US", { notation: Math.abs(value) >= 10000 ? "compact" : "standard", maximumFractionDigits: 1 }).format(value)

export default function CandlestickChartExample() {
  const [view, setView] = useState<"chart" | "table">("chart")
  return (
    <div className="wiki-demo-charts">
      <div className="wiki-demo-toolbar">
        <div className="wiki-demo-toolbar-group"><span>Hover or use the arrow keys to read a value</span></div>
        <Segmented aria-label="View" size="sm" value={view} onValueChange={setView} options={[{ value: "chart", label: "Chart" }, { value: "table", label: "Table" }]} />
      </div>
      <CandlestickChart title="ETH / USDC, daily" category="Day" data={DATA} format={usd} view={view} />
    </div>
  )
}
