import { List, ListHeading, ListIcon, ListRow } from "@protocol/blocks/list/list"
import { Delta } from "@protocol/components/tag/tag"
import { toast } from "@protocol/components/toast/toast"

const Icon = ({ d }: { d: string }) => <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
const ICONS = {
  down: "M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25",
  up: "M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25",
  bolt: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
}
const token = (letter: string, bg: string) => <span className="x-list-token" style={{ ["--x-list-token-bg" as string]: bg }} aria-hidden="true">{letter}</span>

export default function ListExample({ loading = false }: { loading?: boolean }) {
  return (
    <>
      <List aria-label="Recent activity">
        <ListHeading>Today</ListHeading>
        <ListRow loading={loading} title="Received" sub="14:02 · from Jane Cooper" end="+$250.00" endSub="Visa ··4242" tone="positive" lead={<ListIcon tone="positive"><Icon d={ICONS.down} /></ListIcon>} onClick={() => toast("Transaction details")} />
        <ListRow loading={loading} title="Sent" sub="09:17 · to Acme Inc." end="−$42.17" endSub="Bank transfer" lead={<ListIcon><Icon d={ICONS.up} /></ListIcon>} onClick={() => toast("Transaction details")} />
        <ListHeading>Yesterday</ListHeading>
        <ListRow loading={loading} title="Refund" sub="21:44 · Order #1042" end="+$12.40" endSub="Visa ··4242" tone="positive" lead={<ListIcon tone="positive"><Icon d={ICONS.bolt} /></ListIcon>} onClick={() => toast("Transaction details")} />
      </List>
      <List aria-label="Assets">
        <ListHeading>Assets</ListHeading>
        <ListRow loading={loading} title="US dollar" sub="12,480.25 USD" end="$12,480.25" endSub={<Delta value={2.4} />} lead={token("$", "var(--x-accent)")} />
        <ListRow loading={loading} title="Euro" sub="5,000.00 EUR" end="$5,430.00" endSub={<Delta value={0.8} />} lead={token("€", "var(--x-warning)")} />
        <ListRow loading={loading} title="British pound" sub="1,250.00 GBP" end="$1,587.50" endSub={<Delta value={-0.6} />} lead={token("£", "var(--x-danger)")} />
      </List>
    </>
  )
}
