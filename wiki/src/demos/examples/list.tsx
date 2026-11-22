import { List, ListHeading, ListIcon, ListRow } from "@protocol/components/list/list"
import { Delta } from "@protocol/components/tag/tag"
import { toast } from "@protocol/components/toast/toast"
import { Icon as KitIcon } from "@protocol/components/icon/icon"
import { currencyDollar, currencyEuro, currencyPound } from "@protocol/components/icon/icons.js"

const Icon = ({ d }: { d: string }) => <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
const ICONS = {
  down: "M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25",
  up: "M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25",
  bolt: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
}
// A currency's token: its icon on its color.
const token = (icon: typeof currencyDollar, bg: string) => <span className="x-list-token" style={{ ["--x-list-token-bg" as string]: bg }} aria-hidden="true"><KitIcon icon={icon} /></span>

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
        <ListRow loading={loading} title="US dollar" sub="12,480.25 USD" end="$12,480.25" endSub={<Delta value={2.4} />} lead={token(currencyDollar, "var(--x-accent)")} />
        <ListRow loading={loading} title="Euro" sub="5,000.00 EUR" end="$5,430.00" endSub={<Delta value={0.8} />} lead={token(currencyEuro, "var(--x-warning)")} />
        <ListRow loading={loading} title="British pound" sub="1,250.00 GBP" end="$1,587.50" endSub={<Delta value={-0.6} />} lead={token(currencyPound, "var(--x-danger)")} />
      </List>
      <List aria-label="Documents">
        <ListHeading>Text only</ListHeading>
        <ListRow loading={loading} title="Release notes" sub="What changed in 1.0.0" onClick={() => toast("Release notes")} />
        <ListRow loading={loading} title="Privacy policy" sub="Updated on Nov 12" onClick={() => toast("Privacy policy")} />
        <ListRow loading={loading} title="Terms of service" onClick={() => toast("Terms of service")} />
      </List>
    </>
  )
}
