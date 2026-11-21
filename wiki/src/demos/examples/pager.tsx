import { useState } from "react"
import { IconButton } from "@protocol/components/button/button"
import { Icon } from "@protocol/components/icon/icon"
import { chevronLeft, chevronRight } from "@protocol/components/icon/icons.js"
import { Avatar } from "@protocol/components/avatar/avatar"
import { Pager } from "@protocol/motion/pager/pager"

const Label = ({ children }: { children: string }) => <span className="wiki-demo-label">{children}</span>
const NEWS = [
  { palette: "blue", title: "Payouts in 30 countries", text: "Send to a local bank account and it arrives the next business day." },
  { palette: "amber", title: "Invoices in your own name", text: "Your logo, your numbering, and a link your customer can pay from." },
  { palette: "cool", title: "Reports every Monday", text: "Revenue, refunds and payouts for the week, in your inbox at nine." },
  { palette: "ember", title: "Team cards", text: "A card per person, each with its own limit and its own history." },
] as const
const CARDS = [
  { id: "4821", name: "Main card", balance: "$12,480.25", palette: "blue" },
  { id: "0077", name: "Travel", balance: "$640.00", palette: "xray" },
  { id: "3310", name: "Team expenses", balance: "$3,120.40", palette: "amber" },
] as const

export default function PagerExample() {
  const [page, setPage] = useState(0)
  return (
    <div className="wiki-demo-motion">
      <div className="wiki-demo-toolbar">
        <div className="wiki-demo-toolbar-group"><span aria-live="polite">Swipe, or use the arrows · {page + 1} of {NEWS.length}</span></div>
        <div className="wiki-demo-toolbar-group">
          <IconButton aria-label="Previous page" size="sm" disabled={page === 0} onClick={() => setPage(page - 1)}><Icon icon={chevronLeft} /></IconButton>
          <IconButton aria-label="Next page" size="sm" disabled={page === NEWS.length - 1} onClick={() => setPage(page + 1)}><Icon icon={chevronRight} /></IconButton>
        </div>
      </div>
      <Pager aria-label="What is new" index={page} onIndexChange={setPage}>
        {NEWS.map((item) => (
          <article key={item.title} className="wiki-demo-pager-page">
            <Avatar seed={item.title} palette={item.palette} size="lg" />
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </article>
        ))}
      </Pager>
      <Label>Peeking: the next page shows at the edge</Label>
      <Pager aria-label="Cards" peek>
        {CARDS.map((card) => (
          <article key={card.id} className="wiki-demo-pager-card">
            <span><Avatar seed={card.id} palette={card.palette} size="sm" />{card.name}</span>
            <b>{card.balance}</b>
            <code>···· {card.id}</code>
          </article>
        ))}
      </Pager>
    </div>
  )
}
