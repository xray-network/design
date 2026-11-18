import { useState } from "react"
import { Button } from "@protocol/components/button/button"
import { Dialog } from "@protocol/components/dialog/dialog"
import { Input } from "@protocol/components/field/field"
import { toast } from "@protocol/components/toast/toast"
import { Row } from "../Demo"

export default function DialogExample() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(false)
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
    </Row>
  )
}
