import { useMemo, useState } from "react"
import { TableView } from "@protocol/blocks/table-view/table-view"
import { Button } from "@protocol/components/button/button"
import { Pagination } from "@protocol/components/pagination/pagination"
import { Segmented } from "@protocol/components/segmented/segmented"
import { Table } from "@protocol/components/table/table"
import { Status } from "@protocol/components/tag/tag"

type Row = { id: string; customer: string; date: string; amount: number; status: "Succeeded" | "Pending" | "Failed" }
const NAMES = ["Acme Studio", "Mira Lindqvist", "Northwind", "Kai Nakamura", "Delta Works", "Jane Cooper", "Lena Fischer", "Tomas Ruiz", "Noor Haddad", "Ivo Marek", "Studio Kilo"]
const ROWS: Row[] = NAMES.map((customer, i) => ({ id: String(i), customer, date: i < 2 ? "Today" : i < 4 ? "Yesterday" : `Nov ${20 - i}`, amount: [1200, 86, 640.5, 318.77, 1875.3, 42.17, 250, 96, 512.4, 73.9, 2400][i], status: i % 5 === 3 ? "Failed" : i % 4 === 1 ? "Pending" : "Succeeded" }))
const SIZE = 5

export default function TableViewExample() {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<"all" | Row["status"]>("all")
  const [page, setPage] = useState(1)
  const rows = useMemo(() => ROWS.filter((row) => (status === "all" || row.status === status) && row.customer.toLowerCase().includes(query.trim().toLowerCase())), [query, status])
  const shown = rows.slice((page - 1) * SIZE, page * SIZE)
  return (
    <div style={{ alignSelf: "stretch" }}>
      <TableView
        aria-label="Payments"
        search={{ value: query, onChange: (value) => { setQuery(value); setPage(1) }, label: "Search payments", placeholder: "Search by customer" }}
        filters={<Segmented aria-label="Status" size="sm" value={status} onValueChange={(value) => { setStatus(value); setPage(1) }} options={[{ value: "all", label: "All" }, { value: "Succeeded", label: "Succeeded" }, { value: "Pending", label: "Pending" }, { value: "Failed", label: "Failed" }]} />}
        actions={<Button variant="ghost" size="sm">Export</Button>}
        count={rows.length ? `${(page - 1) * SIZE + 1}–${(page - 1) * SIZE + shown.length} of ${rows.length}` : "0 results"}
        pagination={rows.length > SIZE ? <Pagination page={page} onPageChange={setPage} pageCount={Math.ceil(rows.length / SIZE)} aria-label="Payments pages" /> : undefined}
      >
        <Table
          caption="Payments"
          rows={shown}
          rowKey={(row) => row.id}
          empty="No payments match. Clear the search or pick another status."
          columns={[
            { key: "customer", header: "Customer", render: (row) => row.customer },
            { key: "date", header: "Date", render: (row) => row.date },
            { key: "amount", header: "Amount", align: "end", render: (row) => `$${row.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}` },
            { key: "status", header: "Status", render: (row) => <Status tone={row.status === "Succeeded" ? "success" : row.status === "Pending" ? "warning" : "danger"}>{row.status}</Status> },
          ]}
        />
      </TableView>
    </div>
  )
}
