import { useState } from "react"
import { Button } from "@protocol/components/button/button"
import { Dialog } from "@protocol/components/modal/modal"
import { Input } from "@protocol/components/input/input"
import { toast } from "@protocol/components/toast/toast"
import { Row } from "../Demo"

export default function DialogExample() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(false)
  const [filters, setFilters] = useState(false)
  return (
    <Row>
      <Button variant="danger" onClick={() => setOpen(true)}>Remove account</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        size="sm"
        title="Remove account?"
        description="Account 2 will be removed from this workspace. Its invoices and payment history stay available to admins."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)} data-autofocus>Cancel</Button>
            <Button variant="danger" onClick={() => { setOpen(false); toast("Account 2 removed", { tone: "success" }) }}>Remove</Button>
          </>
        }
      />
      <Button variant="ghost" onClick={() => setSearch(true)}>Search (opens on top)</Button>
      <Dialog open={search} onOpenChange={setSearch} placement="top" size="lg" title="Search">
        <Input aria-label="Search" placeholder="Customers, invoices, payments" data-autofocus />
      </Dialog>
      <Button variant="ghost" onClick={() => setFilters(true)}>Filters (side sheet)</Button>
      <Dialog
        open={filters}
        onOpenChange={setFilters}
        placement="end"
        title="Filters"
        description="Narrow the history by type and period."
        footer={
          <>
            <Button variant="ghost" onClick={() => setFilters(false)}>Reset</Button>
            <Button onClick={() => setFilters(false)}>Apply</Button>
          </>
        }
      >
        <Input aria-label="Counterparty" placeholder="Name or address" />
      </Dialog>
    </Row>
  )
}
