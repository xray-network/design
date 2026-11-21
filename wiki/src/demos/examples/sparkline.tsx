import { Delta } from "@protocol/components/tag/tag"
import { Sparkline } from "@protocol/charts/sparkline/sparkline"

const Label = ({ children }: { children: string }) => <span className="wiki-demo-label">{children}</span>
const TILES = [
  { name: "Revenue", value: "$84,120", delta: 12, values: [42, 48, 46, 54, 62, 64, 61, 67, 72, 70, 79, 84] },
  { name: "Refunds", value: "0.8%", delta: -0.3, values: [1.4, 1.3, 1.5, 1.2, 1.1, 1.2, 1.0, 0.9, 1.0, 0.9, 0.8, 0.8] },
  { name: "Customers", value: "1,284", delta: 8.4, values: [980, 1010, 1004, 1060, 1100, 1140, 1130, 1180, 1220, 1215, 1260, 1284] },
]
const ASSETS = [
  { name: "Ether", price: "$3,208.40", change: 2.4, values: [3090, 3120, 3105, 3160, 3142, 3190, 3208] },
  { name: "Wrapped Bitcoin", price: "$96,402.10", change: -1.1, values: [97800, 97400, 97650, 96900, 97100, 96600, 96402] },
  { name: "Chainlink", price: "$18.74", change: 5.6, values: [17.4, 17.6, 17.5, 18.0, 18.2, 18.5, 18.74] },
]

export default function SparklineExample() {
  return (
    <div className="wiki-demo-charts">
      <Label>Beside a number: the line is quiet, the last value is marked</Label>
      <div className="wiki-demo-spark-tiles">
        {TILES.map((tile) => (
          <div key={tile.name}>
            <span>{tile.name}</span>
            <strong>{tile.value}</strong>
            <span><Delta value={tile.delta} /> vs last year</span>
            <Sparkline aria-label={`${tile.name} over 12 months`} values={tile.values} width={120} height={28} />
          </div>
        ))}
      </div>
      <Label>In rows: colored by direction, with the change in words beside it</Label>
      <ul className="wiki-demo-spark-rows">
        {ASSETS.map((asset) => (
          <li key={asset.name}>
            <strong>{asset.name}</strong>
            <Sparkline aria-label={`${asset.name} over 7 days`} trend={asset.change >= 0 ? "up" : "down"} values={asset.values} width={88} />
            <span>{asset.price}</span>
            <Delta value={asset.change} />
          </li>
        ))}
      </ul>
    </div>
  )
}
