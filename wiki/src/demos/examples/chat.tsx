import { useState } from "react"
import { Chat, type ChatItem } from "@protocol/blocks/chat/chat"

const START: ChatItem[] = [
  { id: "d1", day: "Today" },
  { id: "1", from: "them", text: "Did the payout arrive?", meta: "14:02" },
  { id: "2", from: "me", text: "Yes, this morning.", meta: "14:03" },
  { id: "3", from: "me", text: "Sending the receipt now.", meta: "14:03 · Read" },
  { id: "4", from: "them", text: "Perfect, thank you!", meta: "14:05" },
]

export default function ChatExample() {
  const [items, setItems] = useState(START)
  const send = (text: string) => {
    const time = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
    setItems((list) => [...list, { id: String(list.length + 1), from: "me", text, meta: `${time} · Sent` }])
  }
  return (
    <div style={{ width: 380, maxWidth: "100%", height: 360, display: "flex" }}>
      <Chat aria-label="Conversation with Jane Cooper" items={items} onSend={send} className="wiki-demo-chat" />
    </div>
  )
}
