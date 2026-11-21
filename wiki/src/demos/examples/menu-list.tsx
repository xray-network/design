import { useState, type MouseEvent } from "react"
import { MenuList, type MenuListItem } from "@protocol/components/menu-list/menu-list"

const icon = (d: string) => <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>

const ROWS: (Omit<MenuListItem, "current" | "onClick"> & { href: string })[] = [
  { href: "#general", label: "General", icon: icon("M9.59 3.94c.09-.54.56-.94 1.11-.94h2.6c.55 0 1.02.4 1.11.94l.21 1.28c.07.42.38.76.77.97l.22.12c.4.22.87.28 1.27.13l1.22-.46a1.13 1.13 0 0 1 1.37.49l1.3 2.25c.28.48.17 1.08-.26 1.43l-1.01.83c-.33.27-.5.69-.49 1.12v.25c0 .43.16.85.49 1.12l1.01.83c.43.35.54.96.26 1.43l-1.3 2.25a1.13 1.13 0 0 1-1.37.49l-1.22-.46c-.4-.15-.86-.09-1.27.13l-.22.12c-.39.21-.7.55-.77.97l-.21 1.28c-.09.54-.56.94-1.11.94h-2.6c-.55 0-1.02-.4-1.11-.94l-.21-1.28c-.07-.42-.38-.76-.77-.97l-.22-.12c-.4-.22-.87-.28-1.27-.13l-1.22.46a1.13 1.13 0 0 1-1.37-.49l-1.3-2.25a1.13 1.13 0 0 1 .26-1.43l1.01-.83c.33-.27.5-.69.49-1.12v-.25c0-.43-.16-.85-.49-1.12l-1.01-.83a1.13 1.13 0 0 1-.26-1.43l1.3-2.25a1.13 1.13 0 0 1 1.37-.49l1.22.46c.4.15.86.09 1.27-.13l.22-.12c.39-.21.7-.55.77-.97l.21-1.28ZM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z") },
  { href: "#control", label: "Control Center", icon: icon("M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75") },
  { href: "#display", label: "Display & Brightness", icon: icon("M12 3v2.25m6.36.39-1.59 1.59M21 12h-2.25m-.39 6.36-1.59-1.59M12 18.75V21m-4.77-4.23-1.59 1.59M5.25 12H3m4.23-4.77L5.64 5.64M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z") },
  { href: "#home", label: "Home Screen & Dock", icon: icon("M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z") },
  { href: "#accessibility", label: "Accessibility", icon: icon("M12 6.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM7.5 9l4.5.75L16.5 9M12 9.75v4.5m0 0-2.25 4.5M12 14.25l2.25 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z") },
  { href: "#security", label: "Touch ID & Passcode", value: "On", icon: icon("M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z") },
  { href: "#battery", label: "Battery", value: "82%", icon: icon("M21 10.5h.38c.62 0 1.12.5 1.12 1.13v.75c0 .62-.5 1.12-1.12 1.12H21m-17.25 4.5h13.5A2.25 2.25 0 0 0 19.5 15.75v-7.5A2.25 2.25 0 0 0 17.25 6H3.75A2.25 2.25 0 0 0 1.5 8.25v7.5A2.25 2.25 0 0 0 3.75 18Z") },
]

export default function MenuListExample() {
  const [page, setPage] = useState("#accessibility")
  const go = (href: string) => (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    setPage(href)
  }
  return (
    <div style={{ width: 340, maxWidth: "100%" }}>
      <MenuList
        aria-label="Settings"
        groups={[
          { items: ROWS.map((row) => ({ ...row, current: row.href === page, onClick: go(row.href) })) },
          {
            heading: "Privacy",
            items: [
              { label: "Analytics", value: "Off", chevron: true, onClick: () => {} },
              { label: "Location", value: "Managed", disabled: true },
            ],
            note: "Analytics never include balances or addresses.",
          },
        ]}
      />
    </div>
  )
}
