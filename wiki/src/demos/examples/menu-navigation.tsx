import { MenuNavigation, type MenuNavigationItem } from "@protocol/components/menu-navigation/menu-navigation"

const ITEMS: MenuNavigationItem[] = [
  {
    label: "Products",
    columns: 2,
    links: [
      { title: "Payments", description: "Accept cards and bank transfers.", href: "#payments" },
      { title: "Billing", description: "Subscriptions, invoices and plans.", href: "#billing" },
      { title: "Reports", description: "Revenue, refunds and payouts.", href: "#reports" },
      { title: "Payouts", description: "Get paid to your bank in two days.", href: "#payouts" },
    ],
  },
  {
    label: "Developers",
    links: [
      { title: "Documentation", description: "Guides and API reference.", href: "#docs" },
      { title: "SDK", description: "JavaScript runtime and bridge.", href: "#sdk" },
    ],
  },
  {
    label: "Community",
    links: [
      { title: "Roadmap", description: "Ideas and feature votes.", href: "#roadmap" },
      { title: "Blog", description: "Releases and stories.", href: "#blog" },
      { title: "Events", description: "Meetups and calls.", href: "#events" },
    ],
  },
  { label: "Pricing", href: "#pricing" },
]

const Label = ({ children }: { children: string }) => <span className="wiki-demo-label">{children}</span>

export default function MenuNavigationExample() {
  return (
    <div style={{ display: "grid", gap: "var(--x-space-3)", minHeight: 520, alignContent: "start" }} onClick={(e) => { if ((e.target as Element).closest("a")) e.preventDefault() }}>
      <Label>Opens on click, then follows the pointer</Label>
      <div style={{ minHeight: 220 }}><MenuNavigation aria-label="Main" items={ITEMS} /></div>
      <Label>Opens on hover</Label>
      <MenuNavigation aria-label="Main, hover" trigger="hover" items={ITEMS} />
    </div>
  )
}
