import { useState } from "react"
import { IconButton } from "@protocol/components/button/button"
import { Tabs } from "@protocol/components/tabs/tabs"

const Icon = ({ d }: { d: string }) => <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
const ICONS = {
  home: "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
  apps: "M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z",
  x: "M6 18 18 6M6 6l12 12",
  plus: "M12 4.5v15m7.5-7.5h-15",
}

const APPS = [
  { id: "cardano-wallet", name: "Cardano Wallet", desc: "Official wallet for managing your assets." },
  { id: "cardano-assets", name: "Cardano Assets", desc: "Track and manage your digital assets seamlessly." },
  { id: "wiki", name: "Wiki", desc: "Access comprehensive documentation and resources." },
  { id: "graph", name: "Graph", desc: "Robust and scalable APIs for Cardano blockchain developers." },
]

export default function TabsExample() {
  const [open, setOpen] = useState(["graph", "cardano-wallet"])
  const [view, setView] = useState("dashboard")
  const close = (id: string) => {
    setOpen((ids) => ids.filter((x) => x !== id))
    if (view === id) setView("dashboard")
  }
  const next = APPS.find((app) => !open.includes(app.id))
  return (
    <>
      <Tabs
        aria-label="Views"
        value={view}
        onValueChange={setView}
        items={[
          { value: "dashboard", label: "Dashboard", icon: <Icon d={ICONS.home} /> },
          { value: "catalog", label: "Mini Apps", icon: <Icon d={ICONS.apps} /> },
          ...open.map((id, i) => {
            const app = APPS.find((a) => a.id === id)!
            return {
              value: id,
              label: app.name,
              icon: <span className="x-tab-placeholder" aria-hidden="true" />,
              separated: i === 0,
              actions: [{ label: `Close ${app.name}`, icon: <Icon d={ICONS.x} />, onClick: () => close(id) }],
            }
          }),
        ]}
        trailing={
          <IconButton aria-label="Open a mini app" disabled={!next} onClick={() => next && (setOpen((ids) => [...ids, next.id]), setView(next.id))}>
            <Icon d={ICONS.plus} />
          </IconButton>
        }
      />
    </>
  )
}
