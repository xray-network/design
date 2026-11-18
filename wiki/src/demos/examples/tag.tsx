import { Delta, Status, Tag } from "@protocol/components/tag/tag"
import { Row } from "../Demo"

export default function TagExample() {
  return (
    <>
      <Row>
        <Tag>Pro plan</Tag>
        <Tag status="success">Live mode</Tag>
        <Tag status="warning">Syncing</Tag>
        <Tag size="sm">Read-only</Tag>
      </Row>
      <Row>
        <Tag variant="soft">Draft</Tag>
        <Tag variant="soft" color="accent">Pro plan</Tag>
        <Tag variant="soft" color="success">Paid</Tag>
        <Tag variant="soft" color="warning">Due soon</Tag>
        <Tag variant="soft" color="danger">Overdue</Tag>
        <Tag variant="soft" color="success" size="sm">Paid</Tag>
      </Row>
      <Row>
        <Tag variant="solid">New</Tag>
        <Tag variant="solid" color="accent">Pro plan</Tag>
        <Tag variant="solid" color="success" status="success">Live</Tag>
        <Tag variant="solid" color="warning">Beta</Tag>
        <Tag variant="solid" color="danger">Failed</Tag>
        <Tag variant="solid" color="accent" size="sm">Pro</Tag>
      </Row>
      <Row>
        <Status>Paid</Status>
        <Status tone="warning">Seat limit reached</Status>
        <Status tone="danger">Offline</Status>
        <Status tone="neutral">Unpaid</Status>
      </Row>
      <Row>
        <Delta value={2.4} />
        <Delta value={-4.1} />
        <Delta value={0} />
      </Row>
    </>
  )
}
