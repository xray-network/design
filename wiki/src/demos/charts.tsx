// Charts: interactive previews with framework-specific usage prompts, like components and blocks.

import { Demo } from "./Demo"
import BarChartExample from "./examples/bar-chart"
import BarListExample from "./examples/bar-list"
import FunnelChartExample from "./examples/funnel-chart"
import ShareBarExample from "./examples/share-bar"
import StatusStripExample from "./examples/status-strip"
import StackedBarChartExample from "./examples/stacked-bar-chart"
import StackedAreaChartExample from "./examples/stacked-area-chart"
import CandlestickChartExample from "./examples/candlestick-chart"
import HeatmapExample from "./examples/heatmap"
import ScatterChartExample from "./examples/scatter-chart"
import DepthChartExample from "./examples/depth-chart"
import TreemapExample from "./examples/treemap"
import DonutChartExample from "./examples/donut-chart"
import LineChartExample from "./examples/line-chart"
import SparklineExample from "./examples/sparkline"

export const BarChartDemo = () => <Demo id="bar-chart" name="BarChart" kind="chart"><BarChartExample /></Demo>
export const DonutChartDemo = () => <Demo id="donut-chart" name="DonutChart" kind="chart"><DonutChartExample /></Demo>
export const LineChartDemo = () => <Demo id="line-chart" name="LineChart" kind="chart"><LineChartExample /></Demo>
export const SparklineDemo = () => <Demo id="sparkline" name="Sparkline" kind="chart"><SparklineExample /></Demo>
export const BarListDemo = () => <Demo id="bar-list" name="BarList" kind="chart"><BarListExample /></Demo>
export const FunnelChartDemo = () => <Demo id="funnel-chart" name="FunnelChart" kind="chart"><FunnelChartExample /></Demo>
export const ShareBarDemo = () => <Demo id="share-bar" name="ShareBar" kind="chart"><ShareBarExample /></Demo>
export const StatusStripDemo = () => <Demo id="status-strip" name="StatusStrip" kind="chart"><StatusStripExample /></Demo>
export const StackedBarChartDemo = () => <Demo id="stacked-bar-chart" name="StackedBarChart" kind="chart"><StackedBarChartExample /></Demo>
export const StackedAreaChartDemo = () => <Demo id="stacked-area-chart" name="StackedAreaChart" kind="chart"><StackedAreaChartExample /></Demo>
export const CandlestickChartDemo = () => <Demo id="candlestick-chart" name="CandlestickChart" kind="chart"><CandlestickChartExample /></Demo>
export const HeatmapDemo = () => <Demo id="heatmap" name="Heatmap" kind="chart"><HeatmapExample /></Demo>
export const ScatterChartDemo = () => <Demo id="scatter-chart" name="ScatterChart" kind="chart"><ScatterChartExample /></Demo>
export const DepthChartDemo = () => <Demo id="depth-chart" name="DepthChart" kind="chart"><DepthChartExample /></Demo>
export const TreemapDemo = () => <Demo id="treemap" name="Treemap" kind="chart"><TreemapExample /></Demo>
