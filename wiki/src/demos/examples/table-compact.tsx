import { useState } from "react"
import { Pagination } from "@protocol/components/pagination/pagination"
import { TableCompact } from "@protocol/components/table-compact/table-compact"

type Service = { name: string; requests: number; errors: number; latency: number; revenue: number }
const SERVICES: Service[] = [
  { name: "payments-api", requests: 182340, errors: 0.2, latency: 41, revenue: 4812.4 },
  { name: "billing-worker", requests: 96115, errors: 0.4, latency: 58, revenue: 2190.05 },
  { name: "checkout", requests: 54220, errors: 0.1, latency: 37, revenue: 1640.12 },
  { name: "webhooks", requests: 12804, errors: 1.9, latency: 212, revenue: 318.77 },
  { name: "reports", requests: 9871, errors: 0, latency: 22, revenue: 96.4 },
  { name: "auth", requests: 6403, errors: 0.7, latency: 133, revenue: 0 },
]
const PAGE_SIZE = 4
const usd = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export default function TableCompactExample({ loading = false }: { loading?: boolean }) {
  const [page, setPage] = useState(1)
  return (
    <>
      <TableCompact
        caption="Top services"
        loading={loading}
        loadingRows={4}
        title="Top services"
        description="By revenue in the last 30 days, in USD"
        rows={SERVICES.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)}
        rowKey={(r) => r.name}
        rowHref={(r) => "#" + r.name}
        defaultSort={{ key: "revenue", direction: "descending" }}
        columns={[
          { key: "name", header: "Service" },
          { key: "requests", header: "Requests", align: "end", sortValue: (r) => r.requests, render: (r) => r.requests.toLocaleString("en-US") },
          { key: "errors", header: "Errors", align: "end", sortValue: (r) => r.errors, render: (r) => r.errors + "%" },
          { key: "latency", header: "Latency", align: "end", sortValue: (r) => r.latency, render: (r) => r.latency + " ms" },
          { key: "revenue", header: "Revenue", align: "end", sortValue: (r) => r.revenue, render: (r) => usd(r.revenue) },
        ]}
        footer={<Pagination page={page} pageCount={Math.ceil(SERVICES.length / PAGE_SIZE)} total={SERVICES.length} onPageChange={setPage} aria-label="Services pages" />}
      />
      <TableCompact caption="Payouts" loading={loading} loadingRows={2} rows={[] as Service[]} rowKey={(r) => r.name} columns={[{ key: "name", header: "Bank" }, { key: "revenue", header: "Amount", align: "end" }]} />
    </>
  )
}
