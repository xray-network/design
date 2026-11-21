import { useState } from "react"
import { Comments, type Comment } from "@protocol/blocks/comments/comments"
import { Avatar } from "@protocol/components/avatar/avatar"

const START: Comment[] = [
  { kind: "comment", id: "1", author: "Jane Cooper", avatar: <Avatar seed="jane.cooper" />, time: "2 hours ago", text: "It happens on every screen with a text field. The bar should go away while the keyboard is up." },
  { kind: "event", id: "2", text: <><strong>Tomas Ruiz</strong> moved this to In progress</>, time: "1 hour ago" },
  { kind: "comment", id: "3", author: "Tomas Ruiz", avatar: <Avatar seed="tomas" palette="ember" />, time: "20 minutes ago", text: "Fixed on the branch. It hides with the keyboard and comes back with it." },
]

export default function CommentsExample() {
  const [items, setItems] = useState(START)
  return (
    <div style={{ width: 480, maxWidth: "100%" }}>
      <Comments
        items={items}
        avatar={<Avatar seed="you" size="sm" />}
        onComment={(text) => setItems((list) => [...list, { kind: "comment", id: String(list.length + 1), author: "You", avatar: <Avatar seed="you" />, time: "Just now", text }])}
      />
    </div>
  )
}
