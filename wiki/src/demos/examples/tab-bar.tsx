import { useState } from "react"
import { TabBar } from "@protocol/blocks/tab-bar/tab-bar"
import { Icon } from "@protocol/components/icon/icon"
import { chatBubbleOvalLeft, home, magnifyingGlass, user } from "@protocol/components/icon/icons.js"

const TABS = [
  { value: "home", label: "Home", icon: <Icon icon={home} /> },
  { value: "search", label: "Search", icon: <Icon icon={magnifyingGlass} /> },
  { value: "chats", label: "Chats", icon: <Icon icon={chatBubbleOvalLeft} /> },
  { value: "profile", label: "Profile", icon: <Icon icon={user} /> },
]

export default function TabBarExample() {
  const [tab, setTab] = useState("home")
  return (
    <div className="wiki-demo-phone">
      <div className="wiki-demo-phone-screen">
        {Array.from({ length: 9 }, (_, i) => <p key={i}>{TABS.find((t) => t.value === tab)!.label} · row {i + 1}</p>)}
      </div>
      <TabBar aria-label="Main" items={TABS} value={tab} onValueChange={setTab} />
    </div>
  )
}
