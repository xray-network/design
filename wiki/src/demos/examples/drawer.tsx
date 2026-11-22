import { useState } from "react"
import { Button } from "@protocol/components/button/button"
import { Checkbox, CheckboxGroup } from "@protocol/components/checkbox/checkbox"
import { Chips } from "@protocol/components/chips/chips"
import { Drawer } from "@protocol/components/drawer/drawer"
import { TextField } from "@protocol/components/input/input"
import { Segmented } from "@protocol/components/segmented/segmented"
import { toast } from "@protocol/components/toast/toast"
import { Row } from "../Demo"

const NO_FILTERS = { type: ["all"], period: "30d", who: "", large: false, failed: false }

export default function DrawerExample() {
  const [filters, setFilters] = useState(false)
  const [details, setDetails] = useState(false)
  const [menu, setMenu] = useState(false)
  // The filters are a draft while the drawer is open: Apply keeps them, Reset clears them.
  const [draft, setDraft] = useState(NO_FILTERS)
  const count = (draft.type.includes("all") ? 0 : 1) + (draft.period === "30d" ? 0 : 1) + (draft.who.trim() ? 1 : 0) + Number(draft.large) + Number(draft.failed)
  return (
    <Row>
      <Button onClick={() => setFilters(true)}>Filters</Button>
      <Drawer
        open={filters}
        onOpenChange={setFilters}
        title="Filters"
        description="Narrow the history by type, period and counterparty."
        footer={
          <>
            <Button variant="ghost" onClick={() => setDraft(NO_FILTERS)}>Reset</Button>
            <Button onClick={() => { setFilters(false); toast(count ? `${count} ${count === 1 ? "filter" : "filters"} applied` : "Showing everything") }}>Apply</Button>
          </>
        }
      >
        <div className="wiki-demo-drawer-group">
          <span className="wiki-demo-label" aria-hidden="true">Type</span>
          <Chips
            aria-label="Type"
            value={draft.type}
            onValueChange={(type) => setDraft({ ...draft, type })}
            options={[{ value: "all", label: "All" }, { value: "sent", label: "Sent" }, { value: "received", label: "Received" }, { value: "refunds", label: "Refunds" }]}
          />
        </div>
        <div className="wiki-demo-drawer-group">
          <span className="wiki-demo-label" aria-hidden="true">Period</span>
          <Segmented
            aria-label="Period"
            fullWidth
            value={draft.period}
            onValueChange={(period) => setDraft({ ...draft, period })}
            options={[{ value: "7d", label: "7 days" }, { value: "30d", label: "30 days" }, { value: "all", label: "All time" }]}
          />
        </div>
        <TextField label="Counterparty" placeholder="Name or address" value={draft.who} onChange={(event) => setDraft({ ...draft, who: event.target.value })} />
        <CheckboxGroup legend="Only show">
          <Checkbox checked={draft.large} onChange={(event) => setDraft({ ...draft, large: event.target.checked })}>Payments over 1,000 USD</Checkbox>
          <Checkbox checked={draft.failed} onChange={(event) => setDraft({ ...draft, failed: event.target.checked })}>Failed payments</Checkbox>
        </CheckboxGroup>
      </Drawer>
      <Button variant="ghost" onClick={() => setDetails(true)}>Payment details (wide)</Button>
      <Drawer open={details} onOpenChange={setDetails} size="lg" title="Payment 4821" description="Paid on 14 March to Acme Billing.">
        <p>240.00 USD from the main account. The receipt was sent to billing@acme.example.</p>
      </Drawer>
      <Button variant="ghost" onClick={() => setMenu(true)}>Menu (from the start edge)</Button>
      <Drawer open={menu} onOpenChange={setMenu} placement="start" title="Menu">
        <p>Navigation goes here.</p>
      </Drawer>
    </Row>
  )
}
