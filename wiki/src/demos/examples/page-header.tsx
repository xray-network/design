import { PageHeader } from "@protocol/blocks/page-header/page-header"
import { Button } from "@protocol/components/button/button"
import { Icon } from "@protocol/components/icon/icon"
import { arrowDownTray, plus } from "@protocol/components/icon/icons.js"

export default function PageHeaderExample() {
  return (
    <div style={{ display: "grid", gap: "var(--x-space-8)", alignSelf: "stretch" }}>
      <PageHeader
        title="Payments"
        description="312 this month, $84,120 in volume."
        actions={<><Button variant="ghost" size="sm"><Icon icon={arrowDownTray} />Export</Button><Button size="sm"><Icon icon={plus} />New payment</Button></>}
      />
      <PageHeader title="Payment from Acme Studio" description="pi_3Q4821 · Today, 09:41" back={{ label: "Back to payments", onClick: () => {} }} actions={<Button variant="ghost" size="sm">Refund</Button>} />
    </div>
  )
}
