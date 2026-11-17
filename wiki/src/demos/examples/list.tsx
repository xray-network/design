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

export default function ListExample() {
  return (
    <>
      <List aria-label="Recent activity">
        <ListHeading>Today</ListHeading>
        <ListRow title="Received" sub="14:02 · from addr1q9…7xk2" end="+250.00 ADA" endSub="$175.00" tone="positive" lead={<ListIcon tone="positive"><Icon d={ICONS.down} /></ListIcon>} onClick={() => toast("Transaction details")} />
        <ListRow title="Sent" sub="09:17 · to addr1qx…m4d1" end="−42.17 ADA" endSub="$29.52" lead={<ListIcon><Icon d={ICONS.up} /></ListIcon>} onClick={() => toast("Transaction details")} />
        <ListHeading>Yesterday</ListHeading>
        <ListRow title="Staking reward" sub="21:44 · Epoch 666" end="+12.40 ADA" endSub="$8.68" tone="positive" lead={<ListIcon tone="positive"><Icon d={ICONS.bolt} /></ListIcon>} onClick={() => toast("Transaction details")} />
      </List>
      <List aria-label="Assets">
        <ListHeading>Assets</ListHeading>
        <ListRow title="Cardano" sub="12,480.25 ADA" end="$8,736.18" endSub={<Delta value={2.4} />} lead={token("A", "var(--x-accent)")} />
        <ListRow title="Snek" sub="137,400 SNEK" end="$461.82" endSub={<Delta value={7.8} />} lead={token("S", "var(--x-warning)")} />
        <ListRow title="World Mobile" sub="1,446.00 WMT" end="$127.28" endSub={<Delta value={-2.6} />} lead={token("W", "var(--x-danger)")} />
      </List>
    </>
  )
}
