import { useState } from "react"
import { AccountSwitcher } from "@protocol/blocks/account-switcher/account-switcher"
import { toast } from "@protocol/components/toast/toast"

export default function AccountSwitcherExample() {
  const [account, setAccount] = useState("ada-1")
  return (
    <AccountSwitcher
      value={account}
      onValueChange={(id) => { setAccount(id); toast(`Switched to ${id}`) }}
      onAdd={() => toast("Add account")}
      accounts={[
        { id: "ada-1", label: "…lkgc86", address: "addr1q…lkgc86", palette: "btc", balance: "12,480.25 ADA" },
        { id: "ngt-1", label: "…t7n2yd", address: "mn_addr1…t7n2yd", palette: "night", balance: "5,000.00 NIGHT" },
        { id: "btc-1", label: "…q8fz4h", address: "bc1q…q8fz4h", palette: "btc", balance: "0.04215 BTC" },
        { id: "eth-1", label: "…e93f9c", address: "0x7a3f…e93f9c", palette: "cool", balance: "1.2483 ETH" },
      ]}
    />
  )
}
