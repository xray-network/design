import { Avatar } from "@protocol/components/avatar/avatar"
import { Tile } from "@protocol/components/card/card"
import { Command, type CommandGroup } from "@protocol/components/command/command"
import { toast } from "@protocol/components/toast/toast"

const icon = (d: string) => <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>

const GROUPS: CommandGroup[] = [
  {
    label: "Dashboards",
    items: [
      { value: "dash-main", label: "Current: Main", description: "4 mini apps", icon: icon("m2.25 12 8.95-8.96a1.13 1.13 0 0 1 1.6 0L21.75 12M4.5 9.75v10.13c0 .62.5 1.12 1.13 1.12H9.75v-4.88c0-.62.5-1.12 1.13-1.12h2.25c.62 0 1.12.5 1.12 1.13V21h4.13c.62 0 1.12-.5 1.12-1.13V9.76") },
      { value: "dash-new", label: "New dashboard", description: "Creates an empty dashboard named New", icon: icon("M12 4.5v15m7.5-7.5h-15") },
    ],
  },
  {
    label: "Mini Apps",
    items: [
      { value: "open-payments", label: "Open Payments", description: "xray/payments", lead: <Tile size="md">P</Tile> },
      { value: "open-invoices", label: "Open Invoices", description: "xray/invoices", lead: <Tile size="md">I</Tile> },
      { value: "open-reports", label: "Open Reports", description: "xray/reports", lead: <Tile size="md">R</Tile> },
    ],
  },
  {
    label: "Accounts",
    items: [
      { value: "account-2", label: "Switch to …9x2f4a", description: "Cardano · 1,204.50 ADA", lead: <Avatar seed="addr1q9x2f4a" /> },
      { value: "account-3", label: "Switch to …k04d1c", description: "Ethereum · 0.82 ETH", lead: <Avatar seed="0xk04d1c" /> },
    ],
  },
  {
    label: "Actions",
    items: [
      { value: "copy", label: "Copy address", description: "addr1q…lkgc86", icon: icon("M15.75 17.25v3.38c0 .62-.5 1.12-1.13 1.12h-9.75c-.62 0-1.12-.5-1.12-1.13V7.88c0-.63.5-1.13 1.13-1.13H8.25m7.5 10.5h3.38c.62 0 1.12-.5 1.12-1.13V11.25c0-4.46-3.24-8.16-7.5-8.87a9.06 9.06 0 0 0-1.5-.13H9.38c-.63 0-1.13.5-1.13 1.13v3.37m7.5 10.5h-6.38c-.62 0-1.12-.5-1.12-1.13V6.75") },
      { value: "reload", label: "Reload account", icon: icon("M16.02 9.35h4.99V4.36M2.99 19.64v-4.99h4.99M4.03 9.87a8.25 8.25 0 0 1 13.8-3.7l3.18 3.18M2.99 14.65l3.18 3.18a8.25 8.25 0 0 0 13.8-3.7") },
      { value: "hide", label: "Hide balances", shortcut: ["⌘", "H"], icon: icon("M3.98 8.22A10.48 10.48 0 0 0 1.93 12C3.23 16.34 7.24 19.5 12 19.5c.99 0 1.95-.14 2.86-.4M6.23 6.23A10.45 10.45 0 0 1 12 4.5c4.76 0 8.77 3.16 10.07 7.5a10.52 10.52 0 0 1-4.3 5.77M6.23 6.23 3 3m3.23 3.23 3.65 3.65m7.89 7.89L21 21m-3.23-3.23-3.65-3.65m0 0a3 3 0 1 0-4.24-4.24m4.24 4.24L9.88 9.88") },
      { value: "theme", label: "Switch to light theme", icon: icon("M12 3v2.25m6.36.39-1.59 1.59M21 12h-2.25m-.39 6.36-1.59-1.59M12 18.75V21m-4.77-4.23-1.59 1.59M5.25 12H3m4.23-4.77L5.64 5.64M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z") },
      { value: "lock", label: "Lock App", disabled: true, icon: icon("M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z") },
    ],
  },
]

// The menu itself, in the preview: the app would open it over the page with ⌘K.
export default function CommandExample() {
  return (
    <Command
      groups={GROUPS}
      placeholder="Open an app, switch account, run an action"
      onSelect={(value) => toast(`Ran "${value}"`)}
      onClose={() => toast("Esc: the app closes the menu here")}
    />
  )
}
