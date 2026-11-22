import { useState } from "react"
import { Button } from "@protocol/components/button/button"
import { Checkbox } from "@protocol/components/checkbox/checkbox"
import { Dialog } from "@protocol/components/modal/modal"
import { Field, Input, TextField } from "@protocol/components/input/input"
import { SelectNative } from "@protocol/components/select-native/select-native"
import { toast } from "@protocol/components/toast/toast"
import { Row } from "../Demo"

export default function DialogExample() {
  const [add, setAdd] = useState(false)
  const [rename, setRename] = useState(false)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(false)
  return (
    <Row>
      <Button onClick={() => setAdd(true)}>Add account</Button>
      {/* A form in a dialog: the fields are the body, and the footer's primary button submits the form by its id, so
          Enter in any field does the same and the browser checks the required fields first. */}
      <Dialog
        open={add}
        onOpenChange={setAdd}
        title="Add account"
        description="Accounts keep their own balance, invoices and members."
        footer={
          <>
            <Button variant="ghost" onClick={() => setAdd(false)}>Cancel</Button>
            <Button type="submit" form="wiki-demo-add-account">Add account</Button>
          </>
        }
      >
        <form
          id="wiki-demo-add-account"
          className="wiki-demo-form"
          onSubmit={(event) => {
            event.preventDefault()
            const name = String(new FormData(event.currentTarget).get("name") ?? "").trim()
            event.currentTarget.reset()
            setAdd(false)
            toast(`${name} added`, { tone: "success" })
          }}
        >
          <TextField label="Name" name="name" placeholder="Marketing" required data-autofocus />
          <TextField label="Billing email" name="email" type="email" placeholder="billing@company.com" required hint="Invoices and receipts go here." />
          <Field label="Currency">
            {(control) => <SelectNative {...control} name="currency" defaultValue="usd" options={[{ value: "usd", label: "US dollar" }, { value: "eur", label: "Euro" }, { value: "gbp", label: "Pound sterling" }]} />}
          </Field>
          <Checkbox name="default">Make it the default account</Checkbox>
        </form>
      </Dialog>
      <Button variant="ghost" onClick={() => setRename(true)}>Rename account</Button>
      <Dialog
        open={rename}
        onOpenChange={setRename}
        size="sm"
        title="Rename account"
        description="The name shows in the account switcher and on statements."
        footer={
          <>
            <Button variant="ghost" onClick={() => setRename(false)}>Cancel</Button>
            <Button onClick={() => { setRename(false); toast("Account renamed", { tone: "success" }) }}>Save</Button>
          </>
        }
      >
        <Input aria-label="Account name" defaultValue="Main account" data-autofocus />
      </Dialog>
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
