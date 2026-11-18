import { Button } from "@protocol/components/button/button"
import { Input } from "@protocol/components/field/field"
import { Group } from "@protocol/components/group/group"
import { NativeSelect } from "@protocol/components/select-native/select-native"
import { toast } from "@protocol/components/toast/toast"

export default function GroupExample() {
  return (
    <>
      <Group aria-label="Website" prefix="https://" suffix=".io">
        <Input aria-label="Domain" placeholder="xraynetwork" />
      </Group>
      <Group aria-label="Amount" size="lg" suffix="USD">
        <Input aria-label="Amount" inputMode="decimal" placeholder="0.00" />
      </Group>
      <Group aria-label="Send" >
        <Input aria-label="Amount" inputMode="decimal" placeholder="0.00" />
        <NativeSelect aria-label="Currency" options={[{ value: "usd", label: "USD" }, { value: "eur", label: "EUR" }]} />
        <Button onClick={() => toast("Max")}>Max</Button>
      </Group>
      <Group aria-label="Account ID" size="sm">
        <Input aria-label="Account ID" defaultValue="acct_1Nv0FGQ9" readOnly />
        <Button variant="ghost" onClick={() => toast("Copied")}>Copy</Button>
      </Group>
      <div style={{ display: "flex", gap: "var(--x-space-3)", flexWrap: "wrap" }}>
        <Group aria-label="Zoom">
          <Button variant="ghost">−</Button>
          <Button variant="ghost">100%</Button>
          <Button variant="ghost">+</Button>
        </Group>
        <Group aria-label="Export" orientation="vertical">
          <Button variant="ghost">Export CSV</Button>
          <Button variant="ghost">Export JSON</Button>
        </Group>
      </div>
    </>
  )
}
