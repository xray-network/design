import { Table } from "@protocol/components/table/table"
import { Status } from "@protocol/components/tag/tag"

type Tx = { id: string; type: string; date: string; amount: number; status: "Confirmed" | "Pending" }
const TX: Tx[] = [
  { id: "1", type: "Payment received", date: "Today, 14:02", amount: 250, status: "Confirmed" },
  { id: "2", type: "Sent", date: "Today, 09:17", amount: -42.17, status: "Pending" },
  { id: "3", type: "Interest", date: "Yesterday", amount: 12.4, status: "Confirmed" },
  { id: "4", type: "Sent", date: "Yesterday", amount: -1000, status: "Confirmed" },
  { id: "5", type: "Payment received", date: "Nov 9", amount: 75.5, status: "Confirmed" },
  { id: "6", type: "Interest", date: "Nov 9", amount: 12.31, status: "Confirmed" },
  { id: "7", type: "Sent", date: "Nov 8", amount: -3.21, status: "Confirmed" },
]
const usd = (n: number) => `${n > 0 ? "+" : "−"}$${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2 })}`

export default function TableExample({ loading = false }: { loading?: boolean }) {
  return (
    <>
      <Table
        caption="Transactions"
        rows={TX}
        rowKey={(r) => r.id}
        pageSize={4}
        loading={loading}
        columns={[
          { key: "type", header: "Type" },
          { key: "date", header: "Date" },
          { key: "amount", header: "Amount", align: "end", sortValue: (r) => r.amount, render: (r) => usd(r.amount) },
          { key: "status", header: "Status", align: "end", render: (r) => <Status dot="end" tone={r.status === "Pending" ? "warning" : undefined}>{r.status}</Status> },
        ]}
      />
      <Table caption="Payouts" loading={loading} loadingRows={2} rows={[] as Tx[]} rowKey={(r) => r.id} empty="No payouts yet" columns={[{ key: "type", header: "Bank" }, { key: "amount", header: "Amount", align: "end" }]} />
    </>
  )
}
