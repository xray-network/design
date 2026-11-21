import { useState } from "react"
import { Composer } from "@protocol/blocks/composer/composer"
import { Avatar } from "@protocol/components/avatar/avatar"
import { IconButton } from "@protocol/components/button/button"
import { Icon } from "@protocol/components/icon/icon"
import { chartBar, faceSmile, photo } from "@protocol/components/icon/icons.js"

export default function ComposerExample() {
  const [posts, setPosts] = useState<string[]>([])
  return (
    <div style={{ display: "grid", gap: "var(--x-space-4)", width: 440, maxWidth: "100%" }}>
      <Composer
        label="New post"
        placeholder="What is happening?"
        max={280}
        avatar={<Avatar seed="you" />}
        tools={<><IconButton size="sm" aria-label="Add a picture"><Icon icon={photo} /></IconButton><IconButton size="sm" aria-label="Add a poll"><Icon icon={chartBar} /></IconButton><IconButton size="sm" aria-label="Add an emoji"><Icon icon={faceSmile} /></IconButton></>}
        onPost={(text) => setPosts((list) => [text, ...list])}
      />
      <Composer variant="inline" label="Reply" placeholder="Post your reply" submit="Reply" onPost={(text) => setPosts((list) => [text, ...list])} />
      {posts.length > 0 && <p style={{ margin: 0, color: "var(--x-fg-3)", fontSize: "var(--x-text-sm)" }}>Sent: {posts[0]}</p>}
    </div>
  )
}
