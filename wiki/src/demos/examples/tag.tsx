import { Delta, Status, Tag } from "@protocol/components/tag/tag"
import { Row } from "../Demo"

export default function TagExample() {
  return (
    <>
      <Row>
        <Tag>Epoch 667</Tag>
        <Tag status="success">Cardano Mainnet</Tag>
        <Tag status="warning">Syncing</Tag>
        <Tag size="sm">Read-only</Tag>
      </Row>
      <Row>
        <Status>Delegated</Status>
        <Status tone="warning">Pool saturated</Status>
        <Status tone="danger">Offline</Status>
        <Status tone="neutral">Not delegated</Status>
      </Row>
      <Row>
        <Delta value={2.4} />
        <Delta value={-4.1} />
        <Delta value={0} />
      </Row>
    </>
  )
}
