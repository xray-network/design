import { useState } from "react"
import { Segmented } from "@protocol/components/segmented/segmented"
import { Heatmap, type ChartData } from "@protocol/charts/heatmap/heatmap"

const DATA: ChartData = {"labels": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], "series": [{"name": "06", "values": [12, 10, 14, 11, 16, 6, 4]}, {"name": "08", "values": [48, 52, 55, 61, 66, 22, 15]}, {"name": "10", "values": [96, 101, 108, 117, 124, 51, 38]}, {"name": "12", "values": [121, 134, 140, 152, 168, 74, 59]}, {"name": "14", "values": [104, 118, 122, 131, 149, 81, 66]}, {"name": "16", "values": [88, 93, 97, 104, 118, 77, 61]}, {"name": "18", "values": [64, 70, 66, 78, 92, 69, 48]}, {"name": "20", "values": [31, 36, 33, 40, 58, 52, 29]}, {"name": "22", "values": [14, 12, 15, 18, 27, 30, 16]}]}

export default function HeatmapExample() {
  const [view, setView] = useState<"chart" | "table">("chart")
  return (
    <div className="wiki-demo-charts">
      <div className="wiki-demo-toolbar">
        <div className="wiki-demo-toolbar-group"><span>Hover or use the arrow keys to read a value</span></div>
        <Segmented aria-label="View" size="sm" value={view} onValueChange={setView} options={[{ value: "chart", label: "Chart" }, { value: "table", label: "Table" }]} />
      </div>
      <Heatmap title="Payments by weekday and hour" category="Day" data={DATA} view={view} />
    </div>
  )
}
