import { Card, CardGrid, Tile } from "@protocol/blocks/card/card"
import { IconButton } from "@protocol/components/button/button"
import { Menu } from "@protocol/components/menu/menu"
import { toast } from "@protocol/components/toast/toast"

const Icon = ({ d }: { d: string }) => <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
const ICONS = {
  dots: "M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z",
  columns: "M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z",
  x: "M6 18 18 6M6 6l12 12",
}

const APPS = [
  { id: "cardano-wallet", name: "Cardano Wallet", desc: "Official wallet for managing your assets." },
  { id: "cardano-assets", name: "Cardano Assets", desc: "Track and manage your digital assets seamlessly." },
  { id: "wiki", name: "Wiki", desc: "Access comprehensive documentation and resources." },
  { id: "graph", name: "Graph", desc: "Robust and scalable APIs for Cardano blockchain developers." },
]

export default function CardExample() {
  return (
    <CardGrid>
      {APPS.map((app) => (
        <Card
          key={app.id}
          title={app.name}
          description={app.desc}
          meta={`xray/${app.id}`}
          aria-label={`Open ${app.name}`}
          lead={<Tile>{app.name}</Tile>}
          onClick={() => toast(`Opened ${app.name}`)}
          menu={
            <Menu
              aria-label={`${app.name} actions`}
              trigger={<IconButton size="sm" aria-label={`${app.name} actions`}><Icon d={ICONS.dots} /></IconButton>}
              items={[
                { heading: <><Tile size="xs">{app.name}</Tile>{app.name}</> },
                { label: "Open in split view", icon: <Icon d={ICONS.columns} />, onSelect: () => toast("Opened in split view") },
                "separator",
                { label: "Remove from dashboard", icon: <Icon d={ICONS.x} />, tone: "danger", onSelect: () => toast(`${app.name} removed`) },
              ]}
            />
          }
        />
      ))}
    </CardGrid>
  )
}
