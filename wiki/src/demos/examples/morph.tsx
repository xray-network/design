import { useLayoutEffect, useRef, useState } from "react"
import { Avatar } from "@protocol/components/avatar/avatar"
import { Button, IconButton } from "@protocol/components/button/button"
import { Icon } from "@protocol/components/icon/icon"
import { arrowUpRight, banknotes, documentText, plus, userPlus, xMark } from "@protocol/components/icon/icons.js"
import { Input } from "@protocol/components/input/input"
import { Progress } from "@protocol/components/progress/progress"
import { Spinner } from "@protocol/components/spinner/spinner"
import { Delta, Tag } from "@protocol/components/tag/tag"
import { Morph } from "@protocol/motion/morph/morph"
import { morph } from "@protocol/motion/morph/morph.controller.js"

const Label = ({ children }: { children: string }) => <span className="wiki-demo-label">{children}</span>

// A card shows one headline figure; its detail shows four, each with its change or a note, and progress to a goal.
type Stat = { name: string; value: string; delta?: number; note?: string }
type Card = { id: string; palette: "blue" | "amber" | "cool"; title: string; text: string; headline: string; caption: string; stats: Stat[]; goal: { name: string; value: number; text: string } }
const CARDS: Card[] = [
  {
    id: "payments", palette: "blue", title: "Payments", text: "Cards and bank transfers.", headline: "$84,120", caption: "this month",
    stats: [{ name: "Volume", value: "$84,120", delta: 12 }, { name: "Payments", value: "1,284", delta: 8.4 }, { name: "Average", value: "$65.51", delta: -1.2 }, { name: "Busiest day", value: "Fri 14", note: "412 payments" }],
    goal: { name: "Monthly goal", value: 84, text: "$84k of $100k" },
  },
  {
    id: "invoices", palette: "amber", title: "Invoices", text: "What is billed and what is due.", headline: "36 open", caption: "4 overdue",
    stats: [{ name: "Open", value: "36", note: "$21,480 due" }, { name: "Overdue", value: "4", note: "oldest 12 days" }, { name: "Collected", value: "$48,300", delta: 6.2 }, { name: "Paid on time", value: "71%", delta: 3.5 }],
    goal: { name: "Collected this month", value: 69, text: "$48.3k of $69.8k" },
  },
  {
    id: "reports", palette: "cool", title: "Reports", text: "Revenue, refunds and payouts.", headline: "$61,902", caption: "revenue",
    stats: [{ name: "Revenue", value: "$61,902", delta: 21 }, { name: "Net", value: "$58,410", delta: 19.4 }, { name: "Refunds", value: "0.8%", delta: -0.3 }, { name: "Payouts", value: "9", note: "2 on the way" }],
    goal: { name: "Quarter target", value: 62, text: "$61.9k of $100k" },
  },
]
const CREATE = [
  { icon: banknotes, text: "Payment" },
  { icon: documentText, text: "Invoice" },
  { icon: userPlus, text: "Customer" },
]

export default function MorphExample() {
  const [openId, setOpenId] = useState<string | null>(null)
  const [transfer, setTransfer] = useState(false)
  const [create, setCreate] = useState(false)
  const [note, setNote] = useState(false)
  const cards = useRef(new Map<string, HTMLButtonElement>())
  const detail = useRef<HTMLDivElement>(null)
  const open = CARDS.find((c) => c.id === openId)

  // The helper itself: one detail panel covers the group and grows out of whichever card was pressed.
  // Opening: once the DOM shows the panel, and before paint.
  useLayoutEffect(() => {
    const from = openId ? cards.current.get(openId) : null
    if (from && detail.current) void morph(from, detail.current)
  }, [openId])
  // Closing: the panel stays until it has shrunk into its card; then the two swap in the DOM, before the next paint.
  const hide = async () => {
    const from = openId ? cards.current.get(openId) : null
    if (!from || !detail.current || !(await morph(from, detail.current, { open: false }))) return
    detail.current.hidden = true
    from.style.visibility = ""
    setOpenId(null)
  }

  return (
    <>
      <Label>A card becomes its detail</Label>
      <div className="wiki-demo-morph">
        {CARDS.map((card) => (
          <button key={card.id} ref={(el) => { if (el) cards.current.set(card.id, el) }} type="button" className="wiki-demo-morph-card" aria-expanded={openId === card.id} style={{ visibility: openId === card.id ? "hidden" : undefined }} onClick={() => setOpenId(card.id)}>
            <span className="wiki-demo-morph-top"><Avatar seed={card.id} palette={card.palette} /><Icon icon={arrowUpRight} size="sm" /></span>
            <strong>{card.title}</strong>
            <span>{card.text}</span>
            <span className="wiki-demo-morph-figure"><b>{card.headline}</b><span>{card.caption}</span></span>
          </button>
        ))}
        <div ref={detail} className="wiki-demo-morph-detail" hidden={!open}>
          {open && (
            <>
              <div className="wiki-demo-morph-top">
                <span className="wiki-demo-morph-id"><Avatar seed={open.id} palette={open.palette} size="lg" /><span><strong>{open.title}</strong><span>{open.text}</span></span></span>
                <span className="wiki-demo-morph-actions">
                  <Button size="sm">Open {open.title.toLowerCase()}<Icon icon={arrowUpRight} /></Button>
                  <IconButton aria-label="Close" size="sm" onClick={hide}><Icon icon={xMark} /></IconButton>
                </span>
              </div>
              <dl className="wiki-demo-morph-stats">
                {open.stats.map((stat) => (
                  <div key={stat.name}>
                    <dt>{stat.name}</dt>
                    <dd>{stat.value}</dd>
                    <dd>{stat.delta === undefined ? stat.note : <Delta value={stat.delta} />}</dd>
                  </div>
                ))}
              </dl>
              <Progress size="sm" value={open.goal.value} label={open.goal.name} valueText={open.goal.text} />
            </>
          )}
        </div>
      </div>

      <div className="wiki-demo-morph-pair">
        <div>
          <Label>A status pill becomes its panel</Label>
          <div className="wiki-demo-morph-scene">
            <Morph
              className="wiki-demo-morph-island"
              open={transfer}
              from={<Button variant="ghost" size="sm" shape="round" aria-expanded={transfer} onClick={() => setTransfer(true)}><Spinner size="sm" />Sending 0.5 ETH</Button>}
              to={
                <div className="wiki-demo-morph-panel">
                  <div className="wiki-demo-morph-top"><strong>Sending 0.5 ETH</strong><Tag size="sm" status="warning">Pending</Tag></div>
                  <code>To 0x71C4…9A3F</code>
                  <Progress size="sm" value={4} max={12} label="Confirmations" valueText="4 of 12" />
                  <div className="wiki-demo-morph-actions">
                    <Button size="sm">View</Button>
                    <Button size="sm" variant="ghost" onClick={() => setTransfer(false)}>Hide</Button>
                  </div>
                </div>
              }
            />
            <span /><span /><span />
          </div>
        </div>
        <div>
          <Label>A round button becomes a menu</Label>
          <div className="wiki-demo-morph-scene">
            <span /><span /><span /><span />
            <Morph
              className="wiki-demo-morph-fab"
              open={create}
              from={<Button shape="round" aria-expanded={create} onClick={() => setCreate(true)}><Icon icon={plus} />New</Button>}
              to={
                <div className="wiki-demo-morph-menu">
                  <div className="wiki-demo-morph-top"><strong>Create</strong><IconButton aria-label="Close" size="xs" onClick={() => setCreate(false)}><Icon icon={xMark} /></IconButton></div>
                  {CREATE.map((item) => (
                    <button key={item.text} type="button" onClick={() => setCreate(false)}><Icon icon={item.icon} />{item.text}</button>
                  ))}
                </div>
              }
            />
          </div>
        </div>
      </div>

      <Label>A button becomes its form, in place</Label>
      <Morph
        open={note}
        from={<Button variant="ghost" aria-expanded={note} onClick={() => setNote(true)}><Icon icon={plus} />Add a note</Button>}
        to={
          <form className="wiki-demo-morph-form" onSubmit={(e) => { e.preventDefault(); setNote(false) }}>
            <Input aria-label="Note" placeholder="A note for this payment" />
            <Button size="sm" type="submit">Save</Button>
            <Button size="sm" variant="ghost" onClick={() => setNote(false)}>Cancel</Button>
          </form>
        }
      />
    </>
  )
}
