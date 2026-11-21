import { useState } from "react"
import { Stories } from "@protocol/blocks/stories/stories"
import { Avatar } from "@protocol/components/avatar/avatar"

const PEOPLE = [["you", "You", "amber"], ["mira", "mira", "cool"], ["tomas", "tomas", "ember"], ["studio", "studio", "xray"], ["lena", "lena", "blue"], ["kai", "kai", "amber"], ["noor", "noor", "cool"], ["ivo", "ivo", "ember"]] as const

export default function StoriesExample() {
  const [seen, setSeen] = useState<string[]>(["kai", "ivo"])
  return (
    <div style={{ width: 380, maxWidth: "100%", border: "1px solid var(--x-border)", borderRadius: "var(--x-radius-2xl)" }}>
      <Stories
        aria-label="Stories"
        onOpen={(id) => setSeen((list) => (list.includes(id) ? list : [...list, id]))}
        items={[...PEOPLE].sort((a, b) => Number(seen.includes(a[0])) - Number(seen.includes(b[0]))).map(([id, name, palette]) => ({ id, name, seen: seen.includes(id), avatar: <Avatar seed={id} palette={palette} /> }))}
      />
    </div>
  )
}
