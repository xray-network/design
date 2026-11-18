import { Collapse } from "@protocol/components/collapse/collapse"
import { Tag } from "@protocol/components/tag/tag"

export default function CollapseExample() {
  return (
    <>
      <Collapse
        accordion
        defaultValue={["fees"]}
        items={[
          { value: "fees", title: "What does the processing fee cover?", content: <p>Card networks and the payment processor: 2.9% plus $0.30 per payment.</p> },
          { value: "rewards", title: "When are payouts sent?", extra: "Every 2 days", content: <p>Two business days after the payment clears, straight to your bank.</p> },
          { value: "plan", title: "Can I change my plan?", extra: <Tag size="sm">Free</Tag>, content: <p>Yes, at any time. The new price applies from the next billing period.</p> },
        ]}
      />
      <Collapse variant="ghost" items={[{ value: "advanced", title: "Advanced", content: <p>Custom TTL and transaction metadata. Rendered the first time you open it.</p> }]} />
    </>
  )
}
