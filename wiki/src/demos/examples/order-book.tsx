import { useState } from "react"
import { OrderBook } from "@protocol/blocks/order-book/order-book"

const ASKS = [[3208.8, 2.0], [3209.2, 2.894], [3209.8, 4.12], [3210.4, 1.35], [3211.0, 5.6], [3211.5, 2.2]].map(([price, amount]) => ({ price, amount }))
const BIDS = [[3208.1, 3.05], [3207.6, 4.9], [3207.0, 6.54], [3206.4, 1.8], [3205.9, 3.3], [3205.2, 7.1]].map(([price, amount]) => ({ price, amount }))

export default function OrderBookExample() {
  const [price, setPrice] = useState<number>()
  return (
    <div style={{ display: "grid", gap: "var(--x-space-3)", width: 340, maxWidth: "100%" }}>
      <OrderBook aria-label="Order book, ETH / USDC" columns={["Price (USDC)", "Amount (ETH)", "Total"]} asks={ASKS} bids={BIDS} depth={6} last="3,208.40" spread="Spread 0.70 (0.02%)" onPick={setPrice} />
      <p style={{ margin: 0, color: "var(--x-fg-3)", fontSize: "var(--x-text-sm)" }}>{price ? `Limit price set to ${price.toFixed(2)}` : "Press a row to take its price"}</p>
    </div>
  )
}
