import { useState } from "react"
import { Pagination } from "@protocol/components/pagination/pagination"

export default function PaginationExample() {
  const [page, setPage] = useState(4)
  const [cursor, setCursor] = useState(7)
  return (
    <>
      <Pagination page={page} pageCount={16} total={312} onPageChange={setPage} aria-label="Transactions pages" />
      <Pagination page={cursor} hasNext={cursor < 9} onPageChange={setCursor} aria-label="Events pages" />
    </>
  )
}
