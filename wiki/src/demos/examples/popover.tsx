import { Button } from "@protocol/components/button/button"
import { Field, Input } from "@protocol/components/input/input"
import { Popover } from "@protocol/components/popover/popover"
import { toast } from "@protocol/components/toast/toast"
import { Row } from "../Demo"

const Label = ({ children }: { children: string }) => <span className="wiki-demo-label">{children}</span>

export default function PopoverExample() {
  return (
    <>
      <Label>Details and short forms</Label>
      <Row>
        <Popover trigger={<Button variant="ghost">Fee details</Button>} title="Processing fee">
          <p>$0.59 on this payment: 2.9% plus $0.30, paid to the card network.</p>
        </Popover>
        <Popover trigger={<Button variant="ghost">Rename</Button>} title="Account name" placement="bottom">
          <form style={{ display: "grid", gap: "var(--x-space-3)" }} onSubmit={(e) => { e.preventDefault(); toast("Renamed", { tone: "success" }) }}>
            <Field label="Name">{(p) => <Input {...p} size="sm" defaultValue="Main account" data-autofocus />}</Field>
            <Button size="sm">Save</Button>
          </form>
        </Popover>
      </Row>
      <Label>Sides</Label>
      <Row>
        <Popover trigger={<Button variant="ghost" size="sm">Top</Button>} aria-label="Plan">
          <p>20 seats, billed monthly at $49 per seat.</p>
        </Popover>
        <Popover trigger={<Button variant="ghost" size="sm">Bottom</Button>} aria-label="Plan" placement="bottom">
          <p>20 seats, billed monthly at $49 per seat.</p>
        </Popover>
        <Popover trigger={<Button variant="ghost" size="sm">Left</Button>} aria-label="Seats" placement="left">
          <p>18 of 20 seats used.</p>
        </Popover>
        <Popover trigger={<Button variant="ghost" size="sm">Right</Button>} aria-label="Renewal" placement="right">
          <p>Renews on the 1st.</p>
        </Popover>
      </Row>
    </>
  )
}
