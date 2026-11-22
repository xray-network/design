import type { ReactNode } from "react"
import { Icon } from "@protocol/components/icon/icon"
import { arrowDownTray, bell, chevronRight, clock, cog6Tooth, creditCard, lockClosed, magnifyingGlass, paperAirplane, plus, shieldCheck, wallet } from "@protocol/components/icon/icons.js"
import { github, telegram, x } from "@protocol/components/icon/socials.js"
import { bitcoin } from "@protocol/components/icon/crypto.js"
import { Button, IconButton } from "@protocol/components/button/button"
import { Input } from "@protocol/components/input/input"
import { List, ListIcon, ListRow } from "@protocol/components/list/list"
import { Tag } from "@protocol/components/tag/tag"

/** One place icons are used, with a short label above it. */
const Use = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="wiki-demo-icon-use">
    <h3>{title}</h3>
    <div>{children}</div>
  </section>
)

export default function IconExample() {
  return (
    <div className="wiki-demo-icon-uses">
      <Use title="In buttons">
        <Button><Icon icon={paperAirplane} size="md" />Send</Button>
        <Button variant="ghost"><Icon icon={arrowDownTray} size="md" />Export</Button>
        <Button variant="ghost" size="sm"><Icon icon={plus} size="md" />New key</Button>
        <IconButton aria-label="Notifications"><Icon icon={bell} /></IconButton>
        <IconButton aria-label="Settings"><Icon icon={cog6Tooth} /></IconButton>
      </Use>
      <Use title="In a field">
        <Input size="sm" aria-label="Search payments" placeholder="Search payments" prefix={<Icon icon={magnifyingGlass} size="md" />} />
      </Use>
      <Use title="In text">
        <p className="wiki-demo-icon-text">
          <Icon icon={clock} size="sm" /> Payouts arrive in two business days. Your card is protected <Icon icon={lockClosed} size="sm" /> and every
          change asks for your second factor <Icon icon={shieldCheck} size="sm" />.
        </p>
      </Use>
      <Use title="In tags">
        <Tag size="sm"><Icon icon={shieldCheck} size="sm" />Verified</Tag>
        <Tag size="sm" variant="soft" color="accent"><Icon icon={bitcoin} size="sm" />Bitcoin</Tag>
      </Use>
      <Use title="In a list">
        <List aria-label="Account">
          <ListRow title="Payment methods" sub="Visa ···· 4821" lead={<ListIcon><Icon icon={creditCard} /></ListIcon>} end={<Icon icon={chevronRight} size="md" />} onClick={() => {}} />
          <ListRow title="Wallet" sub="3 assets" lead={<ListIcon><Icon icon={wallet} /></ListIcon>} end={<Icon icon={chevronRight} size="md" />} onClick={() => {}} />
        </List>
      </Use>
      <Use title="As links">
        <IconButton aria-label="XRAY on GitHub"><Icon icon={github} /></IconButton>
        <IconButton aria-label="XRAY on X"><Icon icon={x} /></IconButton>
        <IconButton aria-label="XRAY on Telegram"><Icon icon={telegram} /></IconButton>
      </Use>
    </div>
  )
}
