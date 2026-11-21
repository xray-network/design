import { RecordDetail, RecordSection } from "@protocol/blocks/record-detail/record-detail"
import { Button } from "@protocol/components/button/button"
import { Copy } from "@protocol/components/copy/copy"
import { Tag } from "@protocol/components/tag/tag"
import { Timeline } from "@protocol/components/timeline/timeline"

export default function RecordDetailExample({ loading = false }: { loading?: boolean }) {
  return (
    <div style={{ alignSelf: "stretch" }}>
      <RecordDetail
        loading={loading}
        title="$1,200.00"
        status={<Tag size="sm" status="success">Succeeded</Tag>}
        sub="Payment from Acme Studio · Today, 09:41"
        actions={<><Button variant="ghost" size="sm">Send receipt</Button><Button variant="ghost" size="sm">Refund</Button></>}
        facts={[
          { label: "Payment ID", value: <Copy value="pi_3Q4821KxT9mB20aLw" label="payment ID" /> },
          { label: "Customer", value: "Acme Studio" },
          { label: "Method", value: "Visa ···· 4821" },
          { label: "Fee", value: "$35.10 (2.9% + 30¢)" },
          { label: "Net", value: "$1,164.90, paid out tomorrow" },
        ]}
      >
        <RecordSection title="Timeline">
          <Timeline events={[{ title: "Payment succeeded", time: "09:41", tone: "success" }, { title: "3D Secure passed", time: "09:41", text: "Confirmed by the bank" }, { title: "Payment started", time: "09:40", text: "Checkout on acme.studio" }]} />
        </RecordSection>
      </RecordDetail>
    </div>
  )
}
