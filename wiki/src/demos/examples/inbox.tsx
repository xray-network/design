import { useState } from "react"
import { Inbox } from "@protocol/blocks/inbox/inbox"
import { Avatar } from "@protocol/components/avatar/avatar"
import { Icon } from "@protocol/components/icon/icon"
import { paperClip } from "@protocol/components/icon/icons.js"

const MAIL = [
  { id: "1", from: "Acme Billing", subject: "Invoice INV-2041 is paid", snippet: "Thanks for your payment. The receipt is attached, and the next invoice is due on December 20.", time: "09:41", palette: "ember", clip: true },
  { id: "2", from: "Mira Lindqvist", subject: "Photos from Lisbon", snippet: "Here are the ones we talked about. Tell me which you want printed.", time: "08:12", palette: "cool", clip: true },
  { id: "3", from: "Tomas Ruiz", subject: "Re: the new tab bar", snippet: "It is in. The pill now stops at the edge instead of bouncing past it.", time: "Yesterday", palette: "amber" },
  { id: "4", from: "Support", subject: "Your ticket is resolved", snippet: "We have closed ticket 4821. Reply to this message to open it again.", time: "Mon", palette: "xray" },
] as const

export default function InboxExample() {
  const [read, setRead] = useState<string[]>(["3", "4"])
  const [current, setCurrent] = useState<string>()
  return (
    <div style={{ width: 400, maxWidth: "100%", border: "1px solid var(--x-border)", borderRadius: "var(--x-radius-2xl)", overflow: "hidden" }}>
      <Inbox
        aria-label="Inbox"
        current={current}
        onOpen={(id) => { setCurrent(id); setRead((list) => (list.includes(id) ? list : [...list, id])) }}
        items={MAIL.map((mail) => ({ id: mail.id, from: mail.from, subject: mail.subject, snippet: mail.snippet, time: mail.time, unread: !read.includes(mail.id), avatar: <Avatar seed={mail.from} palette={mail.palette} />, marks: "clip" in mail ? <Icon icon={paperClip} /> : undefined }))}
      />
    </div>
  )
}
