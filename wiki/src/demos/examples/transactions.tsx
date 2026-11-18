import { Transactions, type Transaction } from "@protocol/blocks/transactions/transactions"
import { Button } from "@protocol/components/button/button"
import { toast } from "@protocol/components/toast/toast"

const TX: Transaction[] = [
  { id: "1", kind: "received", day: "Today", title: "Received", sub: "14:02 · from Jane Cooper", amount: "+$250.00", fiat: "$175.00" },
  { id: "2", kind: "sent", day: "Today", title: "Sent", sub: "09:17 · to Acme Inc.", amount: "−$42.17", fiat: "$29.52" },
  { id: "3", kind: "refund", day: "Yesterday", title: "Refund", sub: "21:44 · Order #1042", amount: "+$12.40", fiat: "$8.68" },
  { id: "4", kind: "sent", day: "Yesterday", title: "Sent", sub: "08:03 · to Robert Fox", amount: "−$1,000.00", fiat: "$700.00" },
  { id: "5", kind: "received", day: "Nov 9", title: "Received", sub: "11:50 · from Northwind", amount: "+$75.50", fiat: "$52.85" },
  { id: "6", kind: "refund", day: "Nov 9", title: "Refund", sub: "21:41 · Order #1037", amount: "+$12.31", fiat: "$8.62" },
  { id: "7", kind: "sent", day: "Nov 8", title: "Sent", sub: "16:31 · to Globex", amount: "−$3.21", fiat: "$2.25" },
  { id: "8", kind: "received", day: "Nov 7", title: "Received", sub: "10:12 · from Initech", amount: "+$500.00", fiat: "$350.00" },
  { id: "9", kind: "refund", day: "Nov 4", title: "Refund", sub: "21:40 · Order #1029", amount: "+$12.28", fiat: "$8.60" },
]

export default function TransactionsExample({ loading = false }: { loading?: boolean }) {
  return (
    <Transactions loading={loading}
      items={TX}
      pageSize={5}
      action={<Button variant="ghost" size="sm" onClick={() => toast("View all")}>View all</Button>}
      onSelect={(t) => toast(`Transaction ${t.id}`)}
    />
  )
}
