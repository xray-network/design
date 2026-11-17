import { useState } from "react"
import { Pagination } from "@protocol/components/pagination/pagination"
import { Table } from "@protocol/components/table/table"

type Endpoint = { path: string; method: string; requests: number; errors: number; latency: number }
const ENDPOINTS: Endpoint[] = [
  { path: "/accounts/{address}", method: "GET", requests: 182340, errors: 0.2, latency: 41 },
  { path: "/transactions/{hash}", method: "GET", requests: 96115, errors: 0.4, latency: 58 },
  { path: "/assets/{policy}", method: "GET", requests: 54220, errors: 0.1, latency: 37 },
  { path: "/tx/submit", method: "POST", requests: 12804, errors: 1.9, latency: 212 },
  { path: "/epochs/latest", method: "GET", requests: 9871, errors: 0, latency: 22 },
  { path: "/pools/{id}/delegators", method: "GET", requests: 6403, errors: 0.7, latency: 133 },
  { path: "/scripts/{hash}", method: "GET", requests: 3310, errors: 0.3, latency: 64 },
  { path: "/metadata/{label}", method: "GET", requests: 1288, errors: 0, latency: 49 },
]
const PAGE_SIZE = 3

export default function TableExample() {
  const [page, setPage] = useState(1)
  const pageCount = Math.ceil(ENDPOINTS.length / PAGE_SIZE)
  return (
    <>
      <Table
        caption="Endpoints"
        title="Endpoints"
        description="Requests in the last 30 days"
        rows={ENDPOINTS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)}
        rowKey={(r) => r.path}
        rowHref={(r) => `#${encodeURIComponent(r.path)}`}
        defaultSort={{ key: "requests", direction: "descending" }}
        columns={[
          { key: "path", header: "Endpoint" },
          { key: "method", header: "Method", align: "center" },
          { key: "requests", header: "Requests", align: "end", sortValue: (r) => r.requests, render: (r) => r.requests.toLocaleString("en-US") },
          { key: "errors", header: "Errors", align: "end", sortValue: (r) => r.errors, render: (r) => `${r.errors}%` },
          { key: "latency", header: "Latency", align: "end", sortValue: (r) => r.latency, render: (r) => `${r.latency} ms` },
        ]}
        footer={<Pagination page={page} pageCount={pageCount} total={ENDPOINTS.length} onPageChange={setPage} aria-label="Endpoints pages" />}
      />
      <Table caption="Delegations" rows={[] as Endpoint[]} rowKey={(r) => r.path} columns={[{ key: "path", header: "Pool" }, { key: "requests", header: "Stake", align: "end" }]} />
    </>
  )
}
