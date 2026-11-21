import { MarketList } from "@protocol/blocks/market-list/market-list"
import { Sparkline } from "@protocol/charts/sparkline/sparkline"

const MARKETS = [
  { id: "btc", symbol: "BTC", name: "Bitcoin", price: "$96,412.10", change: 1.8, values: [92, 93, 91, 94, 95, 94, 96] },
  { id: "eth", symbol: "ETH", name: "Ethereum", price: "$3,208.40", change: 2.4, values: [30, 31, 30, 31, 32, 31, 32] },
  { id: "sol", symbol: "SOL", name: "Solana", price: "$187.52", change: -3.1, values: [201, 198, 199, 194, 190, 188, 187] },
  { id: "link", symbol: "LINK", name: "Chainlink", price: "$14.86", change: 0.6, values: [14.2, 14.6, 14.4, 14.9, 14.7, 14.8, 14.9] },
  { id: "usdc", symbol: "USDC", name: "USD Coin", price: "$1.00", change: 0, values: [1, 1, 1, 1, 1, 1, 1] },
]

export default function MarketListExample() {
  return (
    <div style={{ width: 400, maxWidth: "100%" }}>
      <MarketList
        aria-label="Markets"
        items={MARKETS.map(({ values, ...market }) => ({
          ...market,
          lead: <span className="x-list-token" style={{ "--x-list-token-bg": "var(--x-bg-active)", color: "var(--x-fg-1)" } as never} aria-hidden="true">{market.symbol.slice(0, 1)}</span>,
          trend: <Sparkline values={values} width={72} trend={market.change > 0 ? "up" : market.change < 0 ? "down" : undefined} aria-label={`${market.change >= 0 ? "Up" : "Down"} over 7 days`} />,
        }))}
      />
    </div>
  )
}
