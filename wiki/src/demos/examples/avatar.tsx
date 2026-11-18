import { Avatar } from "@protocol/components/avatar/avatar"
import { List, ListRow } from "@protocol/blocks/list/list"
import { toast } from "@protocol/components/toast/toast"
import { Row } from "../Demo"

// Badges are filled marks: a verified check and an admin star.
const BADGES = {
  verified: <svg viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2.25a9.75 9.75 0 1 0 0 19.5 9.75 9.75 0 0 0 0-19.5Zm4.28 7.28a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.72-1.72a.75.75 0 1 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l5-5Z" /></svg>,
  admin: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" /></svg>,
}
const ACCOUNTS = [
  { label: "Jane Cooper", address: "jane@acme.com", palette: "blue", balance: "$12,480.25" },
  { label: "Acme Inc.", address: "billing@acme.com", palette: "ember", balance: "$5,000.00", badge: "verified", badgeName: "Verified" },
  { label: "Robert Fox", address: "robert@acme.com", palette: "amber", balance: "$842.15" },
  { label: "Ops team", address: "ops@acme.com", palette: "cool", balance: "$1,248.30", badge: "admin", badgeName: "Admin" },
  { label: "Payouts bot", address: "payouts@acme.com", palette: "xray", balance: "$42.50" },
] as const

export default function AvatarExample({ loading = false }: { loading?: boolean }) {
  return (
    <>
      <Row>
        {ACCOUNTS.map((a) => (
          <Avatar loading={loading} key={a.address} seed={a.address} palette={a.palette} badge={"badge" in a ? BADGES[a.badge] : undefined} badgeLabel={"badge" in a ? a.badgeName : undefined} />
        ))}
      </Row>
      <Row>
        <Avatar loading={loading} seed="jane@acme.com" palette="blue" size="sm" />
        <Avatar loading={loading} seed="jane@acme.com" palette="blue" />
        <Avatar loading={loading} seed="jane@acme.com" palette="blue" size="lg" />
      </Row>
      <List aria-label="Accounts">
        {ACCOUNTS.slice(0, 3).map((a) => (
          <ListRow key={a.address} title={a.label} sub={a.balance} lead={<Avatar loading={loading} seed={a.address} palette={a.palette} />} onClick={() => toast(`Switched to ${a.label}`)} />
        ))}
      </List>
    </>
  )
}
