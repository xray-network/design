import { useState } from "react"
import { AccountSwitcher } from "@protocol/blocks/account-switcher/account-switcher"
import { toast } from "@protocol/components/toast/toast"

export default function AccountSwitcherExample({ loading = false }: { loading?: boolean }) {
  const [account, setAccount] = useState("main")
  return (
    <AccountSwitcher loading={loading}
      value={account}
      onValueChange={(id) => { setAccount(id); toast(`Switched to ${id}`) }}
      onAdd={() => toast("Add account")}
      accounts={[
        { id: "main", label: "Main account", address: "jane@acme.com", palette: "blue", balance: "$12,480.25" },
        { id: "team", label: "Acme Inc.", address: "billing@acme.com", palette: "ember", balance: "€5,000.00" },
        { id: "savings", label: "Savings", address: "savings@acme.com", palette: "amber", balance: "£1,250.00" },
        { id: "ops", label: "Ops team", address: "ops@acme.com", palette: "cool", balance: "$842.15" },
      ]}
    />
  )
}
