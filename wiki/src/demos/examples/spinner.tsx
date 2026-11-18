import { Spinner } from "@protocol/components/spinner/spinner"
import { Row } from "../Demo"

export default function SpinnerExample() {
  return (
    <>
      <Row>
        <Spinner size="sm" label="Loading" />
        <Spinner label="Loading payments" />
        <Spinner size="lg" label="Loading" />
        <Spinner size="lg" tone="muted" label="Loading" />
      </Row>
      <Row><Spinner size="sm" /> <span>Loading payments…</span></Row>
    </>
  )
}
