import { Transactions, type Transaction } from "@protocol/blocks/transactions/transactions"
import { Button } from "@protocol/components/button/button"
import { toast } from "@protocol/components/toast/toast"

const TX: Transaction[] = [
  { id: "1", kind: "received", day: "Today", title: "Received", sub: "14:02 · from addr1q9…7xk2", amount: "+250.00 ADA", fiat: "$175.00" },
  { id: "2", kind: "sent", day: "Today", title: "Sent", sub: "09:17 · to addr1qx…m4d1", amount: "−42.17 ADA", fiat: "$29.52" },
  { id: "3", kind: "staking", day: "Yesterday", title: "Staking reward", sub: "21:44 · Epoch 666", amount: "+12.40 ADA", fiat: "$8.68" },
  { id: "4", kind: "sent", day: "Yesterday", title: "Sent", sub: "08:03 · to $alice", amount: "−1,000.00 ADA", fiat: "$700.00" },
  { id: "5", kind: "received", day: "Nov 9", title: "Received", sub: "11:50 · from addr1q8…c3f0", amount: "+75.50 ADA", fiat: "$52.85" },
  { id: "6", kind: "staking", day: "Nov 9", title: "Staking reward", sub: "21:41 · Epoch 665", amount: "+12.31 ADA", fiat: "$8.62" },
  { id: "7", kind: "sent", day: "Nov 8", title: "Sent", sub: "16:31 · to addr1qy…9e12", amount: "−3.21 ADA", fiat: "$2.25" },
  { id: "8", kind: "received", day: "Nov 7", title: "Received", sub: "10:12 · from $bob", amount: "+500.00 ADA", fiat: "$350.00" },
  { id: "9", kind: "staking", day: "Nov 4", title: "Staking reward", sub: "21:40 · Epoch 664", amount: "+12.28 ADA", fiat: "$8.60" },
]

export default function TransactionsExample() {
  return (
    <Transactions
      items={TX}
      pageSize={5}
      action={<Button variant="ghost" size="sm" onClick={() => toast("View all")}>View all</Button>}
      onSelect={(t) => toast(`Transaction ${t.id}`)}
    />
  )
}
