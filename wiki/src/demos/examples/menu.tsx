import { Button, IconButton } from "@protocol/components/button/button"
import { Menu } from "@protocol/components/menu/menu"
import { toast } from "@protocol/components/toast/toast"
import { Row } from "../Demo"

const Icon = ({ d }: { d: string }) => <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
const ICONS = {
  dots: "M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z",
  columns: "M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z",
  refresh: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99",
  x: "M6 18 18 6M6 6l12 12",
}

export default function MenuExample() {
  return (
    <Row>
      <Menu
        aria-label="Mini app actions"
        trigger={<IconButton aria-label="Mini app actions"><Icon d={ICONS.dots} /></IconButton>}
        items={[
          { heading: "Wallet" },
          { label: "Open in split view", icon: <Icon d={ICONS.columns} />, note: "⌘ Enter", onSelect: () => toast("Opened in split view") },
          { label: "Reload", icon: <Icon d={ICONS.refresh} />, onSelect: () => toast("Reloaded") },
          { label: "Open in browser", note: "Soon", disabled: true },
          "separator",
          { label: "Close mini app", icon: <Icon d={ICONS.x} />, tone: "danger", onSelect: () => toast("Mini app closed") },
        ]}
      />
      <Menu
        aria-label="Sort assets"
        trigger={<Button variant="ghost" size="sm">Sort by</Button>}
        items={[{ label: "Value", onSelect: () => toast("Sorted by value") }, { label: "Name", onSelect: () => toast("Sorted by name") }, { label: "Change 24h", onSelect: () => toast("Sorted by change") }]}
      />
    </Row>
  )
}
