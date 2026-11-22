import { useState } from "react"
import { TabsLine } from "@protocol/components/tabs-line/tabs-line"

const SECTIONS = {
  overview: "The payment, its amounts and where the money went.",
  activity: "Twelve events, from checkout to payout.",
  disputes: "No disputes on this payment.",
  refunds: "One partial refund of $40.00.",
  logs: "Every request the payment made, with its response.",
}

export default function TabsLineExample() {
  const [section, setSection] = useState<keyof typeof SECTIONS>("overview")
  const [plan, setPlan] = useState("monthly")
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: "var(--x-space-8)", alignSelf: "stretch", minWidth: 0 }}>
      <div style={{ display: "grid", gap: "var(--x-space-4)", minWidth: 0 }}>
        <TabsLine
          aria-label="Payment sections"
          value={section}
          onValueChange={setSection}
          items={[
            { value: "overview", label: "Overview" },
            { value: "activity", label: "Activity", count: 12 },
            { value: "disputes", label: "Disputes" },
            { value: "refunds", label: "Refunds", count: 1 },
            { value: "logs", label: "Logs" },
          ]}
        />
        <p style={{ margin: 0, color: "var(--x-fg-2)", fontSize: "var(--x-text-md)" }}>{SECTIONS[section]}</p>
      </div>
      <div style={{ width: 360, maxWidth: "100%" }}>
        <TabsLine aria-label="Billing" fullWidth value={plan} onValueChange={setPlan} items={[{ value: "monthly", label: "Monthly" }, { value: "yearly", label: "Yearly" }, { value: "lifetime", label: "Lifetime" }]} />
      </div>
    </div>
  )
}
