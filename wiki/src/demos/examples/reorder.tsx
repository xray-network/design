import { useState } from "react"
import { Avatar } from "@protocol/components/avatar/avatar"
import { Button } from "@protocol/components/button/button"
import { Reorder } from "@protocol/motion/reorder/reorder"

const START = [
  { id: "main", palette: "blue", name: "Main account", balance: "$12,480.25" },
  { id: "savings", palette: "cool", name: "Savings", balance: "$48,300.00" },
  { id: "team", palette: "amber", name: "Team expenses", balance: "$3,120.40" },
  { id: "trading", palette: "ember", name: "Trading", balance: "$9,640.12" },
  { id: "travel", palette: "xray", name: "Travel", balance: "$640.00" },
] as const
type Account = (typeof START)[number]

export default function ReorderExample() {
  const [accounts, setAccounts] = useState<Account[]>([...START])
  const [said, setSaid] = useState("Drag a grip, or focus it and use the arrow keys")
  const changed = accounts.some((account, i) => account.id !== START[i].id)
  return (
    <div className="wiki-demo-motion">
      <div className="wiki-demo-toolbar">
        <div className="wiki-demo-toolbar-group"><span role="status">{said}</span></div>
        <Button variant="ghost" size="sm" disabled={!changed} onClick={() => { setAccounts([...START]); setSaid("Order reset") }}>Reset</Button>
      </div>
      <Reorder
        className="wiki-demo-reorder"
        aria-label="Accounts, in the order they are shown"
        items={accounts}
        label={(account) => `Move ${account.name}`}
        onReorder={(next, move) => { setAccounts(next); setSaid(`${next[move.to].name} moved to place ${move.to + 1}`) }}
      >
        {(account, grip) => (
          <>
            {grip}
            <Avatar seed={account.id} palette={account.palette} size="sm" />
            <strong>{account.name}</strong>
            <span>{account.balance}</span>
          </>
        )}
      </Reorder>
    </div>
  )
}
