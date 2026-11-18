import { Button, IconButton } from "@protocol/components/button/button"
import { Row } from "../Demo"

const Icon = ({ d }: { d: string }) => <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
const ICONS = {
  sliders: "M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75",
  x: "M6 18 18 6M6 6l12 12",
  copy: "M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6",
  dots: "M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z",
}

export default function ButtonExample({ loading = false }: { loading?: boolean }) {
  return (
    <>
      <Row>
        <Button loading={loading}>Send</Button>
        <Button variant="ghost" loading={loading}>Cancel</Button>
        <Button size="sm" loading={loading}>Pay</Button>
        <Button variant="ghost" size="sm" loading={loading}>Details</Button>
        <Button variant="chip">Max</Button>
      </Row>
      <Row>
        <Button variant="danger" loading={loading}>Remove account</Button>
        <Button loading>Sending</Button>
        <Button disabled>Send</Button>
      </Row>
      <Row>
        <IconButton aria-label="Dashboard settings"><Icon d={ICONS.sliders} /></IconButton>
        <IconButton aria-label="Close tab" size="sm"><Icon d={ICONS.x} /></IconButton>
        <IconButton aria-label="Copy address" size="xs"><Icon d={ICONS.copy} /></IconButton>
        <IconButton aria-label="More actions" shape="round"><Icon d={ICONS.dots} /></IconButton>
      </Row>
      <Row>
        <Button shape="round" loading={loading}>Get started</Button>
        <Button variant="ghost" shape="round" loading={loading}>Learn more</Button>
        <Button variant="chip" shape="round">Max</Button>
      </Row>
      <Button size="lg" fullWidth loading={loading}>Confirm and send</Button>
    </>
  )
}
