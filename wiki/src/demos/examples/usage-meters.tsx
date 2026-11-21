import { UsageMeters } from "@protocol/blocks/usage-meters/usage-meters"
import { Button } from "@protocol/components/button/button"

export default function UsageMetersExample() {
  return (
    <div style={{ width: 440, maxWidth: "100%" }}>
      <UsageMeters
        title="Usage"
        period="This billing period ends on Nov 30."
        action={<Button variant="ghost" size="sm">Upgrade</Button>}
        items={[
          { label: "Bandwidth", used: 913, limit: 1000, unit: "GB", note: "87 GB left. Beyond the limit it is $0.15 per GB." },
          { label: "Build minutes", used: 3240, limit: 6000 },
          { label: "Function runs", used: 380000, limit: 1000000 },
          { label: "Team seats", used: 10, limit: 10, note: "No seats left. Upgrade to invite more people." },
        ]}
      />
    </div>
  )
}
