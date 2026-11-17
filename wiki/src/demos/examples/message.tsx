import { Button } from "@protocol/components/button/button"
import { message } from "@protocol/components/message/message"
import { Row } from "../Demo"

// <Messages /> is mounted once near the root of the app; message() works from anywhere.
export const showDelegated = () => message({ tone: "success", title: "Delegation confirmed", text: "The first reward arrives in about 15 days." })
export const showSaturated = () =>
  message({
    tone: "warning",
    title: "Pool saturated",
    text: "XRAY Stake Pool is at 101% saturation, so rewards are reduced.",
    action: { label: "Change pool", onClick: () => message({ tone: "info", text: "Choose a pool in Staking." }) },
    duration: Infinity,
  })
export const showSynced = () => message({ title: "Wallet synced", text: "Balances are up to date." })

export default function MessageExample() {
  return (
    <Row>
      <Button variant="ghost" onClick={showDelegated}>Delegate</Button>
      <Button variant="ghost" onClick={showSaturated}>Pool warning</Button>
      <Button variant="ghost" onClick={showSynced}>Plain message</Button>
    </Row>
  )
}
