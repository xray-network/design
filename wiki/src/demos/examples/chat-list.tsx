import { useState } from "react"
import { ChatList } from "@protocol/blocks/chat-list/chat-list"
import { Avatar } from "@protocol/components/avatar/avatar"

const CHATS = [
  { id: "jane", name: "Jane Cooper", last: "Perfect, thank you!", time: "14:05", unread: 2, palette: "amber" },
  { id: "team", name: "Design team", last: "Tomas: the new tab bar is in", time: "13:40", unread: 12, muted: true, palette: "cool" },
  { id: "mira", name: "Mira Lindqvist", last: "Photo", time: "12:18", palette: "cool" },
  { id: "support", name: "Support", last: "Your ticket is resolved", time: "Yesterday", palette: "xray" },
  { id: "family", name: "Family", last: "Dad: dinner on Sunday?", time: "Mon", unread: 1, palette: "amber" },
]

export default function ChatListExample() {
  const [read, setRead] = useState<string[]>([])
  return (
    <div style={{ width: 380, maxWidth: "100%" }}>
      <ChatList
        aria-label="Chats"
        onOpen={(id) => setRead((list) => [...list, id])}
        items={CHATS.map(({ palette, ...chat }) => ({ ...chat, unread: read.includes(chat.id) ? 0 : chat.unread, avatar: <Avatar seed={chat.id} palette={palette as "amber"} /> }))}
      />
    </div>
  )
}
