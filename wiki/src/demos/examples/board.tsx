import { useState } from "react"
import { Board, type BoardColumn } from "@protocol/blocks/board/board"
import { Avatar } from "@protocol/components/avatar/avatar"
import { Tag } from "@protocol/components/tag/tag"

const START: BoardColumn[] = [
  { id: "todo", title: "Todo", cards: [
    { id: "142", key: "ENG-142", title: "Tab bar hides under the keyboard", tags: <><Tag size="sm">Bug</Tag><Tag size="sm">Mobile</Tag></>, assignee: <Avatar seed="tomas" palette="ember" /> },
    { id: "150", key: "ENG-150", title: "Export payments as CSV", tags: <Tag size="sm">Feature</Tag> },
  ] },
  { id: "doing", title: "In progress", cards: [
    { id: "138", key: "ENG-138", title: "Readout glides between bars instead of jumping", tags: <Tag size="sm">Charts</Tag>, assignee: <Avatar seed="jane.cooper" /> },
  ] },
  { id: "review", title: "In review", cards: [
    { id: "131", key: "ENG-131", title: "Sheet settles at its middle stop", tags: <Tag size="sm">Motion</Tag>, assignee: <Avatar seed="mira" palette="cool" /> },
  ] },
  { id: "done", title: "Done", cards: [] },
]

export default function BoardExample() {
  const [columns, setColumns] = useState(START)
  // Opening a card moves it one column on, to show the counts and the empty state at work.
  const advance = (card: string) => setColumns((list) => {
    const from = list.findIndex((column) => column.cards.some((c) => c.id === card))
    if (from < 0 || from === list.length - 1) return list
    const moved = list[from].cards.find((c) => c.id === card)!
    return list.map((column, i) => (i === from ? { ...column, cards: column.cards.filter((c) => c.id !== card) } : i === from + 1 ? { ...column, cards: [moved, ...column.cards] } : column))
  })
  return (
    <div style={{ alignSelf: "stretch", minWidth: 0 }}>
      <Board aria-label="Sprint 24" columns={columns} onOpen={advance} />
    </div>
  )
}
