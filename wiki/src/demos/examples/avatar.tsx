import { Avatar } from "@protocol/components/avatar/avatar"
import { List, ListRow } from "@protocol/blocks/list/list"
import { toast } from "@protocol/components/toast/toast"
import { Row } from "../Demo"

const CHAIN_MARKS = {
  ethereum: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.944 17.97 4.58 13.62l7.364 10.38 7.369-10.38-7.369 4.35Zm.112-17.97L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0Z" /></svg>,
  midnight: <svg viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 16.4a7.4 7.4 0 1 1 0-14.8 7.4 7.4 0 0 1 0 14.8Zm-.85-8.25h1.7v1.7h-1.7v-1.7Zm0-2.67h1.7v1.7h-1.7v-1.7Zm0-2.67h1.7v1.7h-1.7v-1.7Z" /></svg>,
}
const ACCOUNTS = [
  { label: "…lkgc86", address: "addr1q…lkgc86", palette: "btc", balance: "12,480.25 ADA" },
  { label: "…t7n2yd", address: "mn_addr1…t7n2yd", palette: "night", balance: "5,000.00 NIGHT", chain: "midnight", chainName: "Midnight" },
  { label: "…q8fz4h", address: "bc1q…q8fz4h", palette: "btc", balance: "0.04215 BTC" },
  { label: "…e93f9c", address: "0x7a3f…e93f9c", palette: "cool", balance: "1.2483 ETH", chain: "ethereum", chainName: "Ethereum" },
  { label: "…Hq4pNx", address: "7xKp…Hq4pNx", palette: "xray", balance: "42.50 SOL" },
] as const

export default function AvatarExample() {
  return (
    <>
      <Row>
        {ACCOUNTS.map((a) => (
          <Avatar key={a.address} seed={a.address} palette={a.palette} badge={"chain" in a ? CHAIN_MARKS[a.chain] : undefined} badgeLabel={"chain" in a ? a.chainName : undefined} />
        ))}
      </Row>
      <Row>
        <Avatar seed="addr1q…lkgc86" palette="btc" size="sm" />
        <Avatar seed="addr1q…lkgc86" palette="btc" />
        <Avatar seed="addr1q…lkgc86" palette="btc" size="lg" />
      </Row>
      <List aria-label="Accounts">
        {ACCOUNTS.slice(0, 3).map((a) => (
          <ListRow key={a.address} title={<span style={{ fontFamily: "var(--x-font-mono)", fontSize: "var(--x-text-sm)", fontWeight: 500 }}>{a.label}</span>} sub={a.balance} lead={<Avatar seed={a.address} palette={a.palette} />} onClick={() => toast(`Switched to ${a.label}`)} />
        ))}
      </List>
    </>
  )
}
