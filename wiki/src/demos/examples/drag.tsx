import { useState } from "react"
import { Avatar } from "@protocol/components/avatar/avatar"
import { Button, IconButton } from "@protocol/components/button/button"
import { Chips } from "@protocol/components/chips/chips"
import { Icon } from "@protocol/components/icon/icon"
import { adjustmentsHorizontal, xMark } from "@protocol/components/icon/icons.js"
import { Slider } from "@protocol/components/slider/slider"
import { Tag } from "@protocol/components/tag/tag"
import { Drag } from "@protocol/motion/drag/drag"
import { Reflow } from "@protocol/motion/reflow/reflow"

const Label = ({ children }: { children: string }) => <span className="wiki-demo-label">{children}</span>
const NOTES = [
  { id: "payout", palette: "blue", title: "Payout sent", text: "$1,200.00 to Chase ···· 4821" },
  { id: "invoice", palette: "amber", title: "Invoice paid", text: "Acme Studio paid INV-0042" },
  { id: "login", palette: "cool", title: "New sign-in", text: "Chrome on macOS, Lisbon" },
] as const

// The sheet's scene: a short activity list, and the filters that the sheet holds.
type Status = "paid" | "pending" | "failed"
const TONE = { paid: "success", pending: "warning", failed: "danger" } as const
const ACTIVITY: { id: string; palette: "blue" | "amber" | "cool" | "ember" | "xray"; name: string; when: string; amount: number; status: Status }[] = [
  { id: "acme", palette: "blue", name: "Acme Studio", when: "Today, 09:41", amount: 1200, status: "paid" },
  { id: "mira", palette: "cool", name: "Mira Lindqvist", when: "Today, 08:12", amount: 86, status: "pending" },
  { id: "north", palette: "amber", name: "Northwind", when: "Yesterday", amount: 640, status: "paid" },
  { id: "kai", palette: "ember", name: "Kai Nakamura", when: "Nov 19", amount: 318, status: "failed" },
  { id: "delta", palette: "xray", name: "Delta Works", when: "Nov 18", amount: 1875, status: "paid" },
]
// The sheet shows 232px when open. Its resting places, as offsets down from there: open, peeking (the grabber and
// the title stay in view), and closed (below the scene).
const SHEET = [0, 168, 250]
const OPEN = 0
const PEEK = 1
const CLOSED = 2
const usd = (n: number) => "$" + n.toLocaleString("en-US")

export default function DragExample() {
  const [notes, setNotes] = useState<readonly (typeof NOTES)[number][]>(NOTES)
  const [place, setPlace] = useState(OPEN)
  const [statuses, setStatuses] = useState<Status[]>(["paid", "pending", "failed"])
  const [limit, setLimit] = useState(2000)
  const shown = ACTIVITY.filter((item) => statuses.includes(item.status) && item.amount <= limit)
  const dismiss = (id: string) => setNotes((list) => list.filter((note) => note.id !== id))
  return (
    <div className="wiki-demo-motion">
      <div className="wiki-demo-toolbar">
        <div className="wiki-demo-toolbar-group"><span aria-live="polite">{notes.length ? `Swipe a row away · ${notes.length} left` : "All cleared"}</span></div>
        <Button variant="ghost" size="sm" disabled={notes.length === NOTES.length} onClick={() => setNotes(NOTES)}>Restore</Button>
      </div>
      {/* Each row is a Drag inside a Reflow: thrown away, it is removed, the rows under it close the gap, and
          everything after the list moves up with it. */}
      <Reflow className="wiki-demo-drag-list">
        {notes.map((note) => (
          <Drag key={note.id} as="li" dismiss="both" onLeave={() => dismiss(note.id)}>
            <Avatar seed={note.id} palette={note.palette} />
            <span className="wiki-demo-row-text"><strong>{note.title}</strong><span>{note.text}</span></span>
            <IconButton aria-label={`Dismiss: ${note.title}`} size="sm" onClick={() => dismiss(note.id)}><Icon icon={xMark} /></IconButton>
          </Drag>
        ))}
      </Reflow>

      <Label>A sheet that opens, peeks and closes</Label>
      <div className="wiki-demo-drag-scene" data-place={place}>
        <header>
          <strong>Activity</strong>
          <IconButton aria-label="Filters" size="sm" aria-expanded={place !== CLOSED} onClick={() => setPlace(place === CLOSED ? OPEN : CLOSED)}><Icon icon={adjustmentsHorizontal} /></IconButton>
        </header>
        {/* The list behind the sheet is filtered live, and its rows glide as they come and go. */}
        <Reflow className="wiki-demo-drag-activity">
          {shown.map((item) => (
            <li key={item.id}>
              <Avatar seed={item.id} palette={item.palette} />
              <span className="wiki-demo-row-text"><strong>{item.name}</strong><span>{item.when}</span></span>
              <span className="wiki-demo-row-value">{usd(item.amount)}</span>
              <Tag size="sm" status={TONE[item.status]}>{item.status}</Tag>
            </li>
          ))}
        </Reflow>
        {/* Dims the list while the sheet is fully open; a press on it collapses the sheet. */}
        <div className="wiki-demo-drag-scrim" onClick={() => setPlace(PEEK)} />
        {/* The sheet stays mounted: closed is its third resting place, below the scene, so a button can spring it
            open again with the same motion as the hand. */}
        <Drag axis="y" snap={SHEET} place={place} handle className="wiki-demo-drag-sheet" role="dialog" aria-label="Filters" inert={place === CLOSED} onSettle={({ index }) => setPlace(index)}>
          <div className="wiki-demo-drag-sheet-head">
            <strong>Filters</strong>
            <span aria-live="polite">{shown.length} of {ACTIVITY.length}</span>
          </div>
          <Chips aria-label="Status" multiple value={statuses} onValueChange={setStatuses} options={[{ value: "paid", label: "Paid" }, { value: "pending", label: "Pending" }, { value: "failed", label: "Failed" }]} />
          <Slider label="Amount up to" size="sm" min={0} max={2000} step={100} value={limit} onValueChange={setLimit} format={usd} />
          <Button fullWidth onClick={() => setPlace(CLOSED)}>Show {shown.length} {shown.length === 1 ? "result" : "results"}</Button>
        </Drag>
      </div>
    </div>
  )
}
