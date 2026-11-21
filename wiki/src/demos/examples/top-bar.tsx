import { useState } from "react"
import { TopBar } from "@protocol/blocks/top-bar/top-bar"
import { Avatar } from "@protocol/components/avatar/avatar"
import { IconButton } from "@protocol/components/button/button"
import { Icon } from "@protocol/components/icon/icon"
import { banknotes, bell, cog6Tooth, home, users } from "@protocol/components/icon/icons.js"

export default function TopBarExample() {
  const [section, setSection] = useState("home")
  return (
    <div style={{ alignSelf: "stretch", border: "1px solid var(--x-border)", borderRadius: "var(--x-radius-2xl)", overflow: "hidden" }}>
      <TopBar
        aria-label="Pestri"
        brand="Pestri"
        value={section}
        onValueChange={setSection}
        items={[
          { value: "home", label: "Home", icon: <Icon icon={home} /> },
          { value: "payments", label: "Payments", icon: <Icon icon={banknotes} /> },
          { value: "customers", label: "Customers", icon: <Icon icon={users} /> },
          { value: "settings", label: "Settings", icon: <Icon icon={cog6Tooth} /> },
        ]}
        end={<><IconButton size="sm" aria-label="Notifications"><Icon icon={bell} /></IconButton><Avatar seed="jane.cooper" size="sm" /></>}
      />
      <p style={{ margin: 0, padding: "var(--x-space-8) var(--x-space-5)", color: "var(--x-fg-3)", fontSize: "var(--x-text-sm)" }}>The {section} page</p>
    </div>
  )
}
