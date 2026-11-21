import { useState } from "react"
import { Post } from "@protocol/blocks/post/post"
import { Avatar } from "@protocol/components/avatar/avatar"
import { IconButton } from "@protocol/components/button/button"
import { toast } from "@protocol/components/toast/toast"

const icon = (d: string) => <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
const HEART = "M21 8.25c0-2.49-2.1-4.5-4.69-4.5-1.93 0-3.6 1.13-4.31 2.73-.72-1.6-2.38-2.73-4.31-2.73C5.1 3.75 3 5.76 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
const REPLY = "M12 20.25c4.97 0 9-3.69 9-8.25s-4.03-8.25-9-8.25S3 7.44 3 12c0 2.1.86 4.02 2.27 5.48.43.45.75 1.03.63 1.64a4.48 4.48 0 0 1-.92 1.98 5.97 5.97 0 0 0 4.28-.97c.4-.27.89-.37 1.36-.3.45.06.91.09 1.38.09Z"
const REPOST = "M19.5 12c0-1.23-.47-2.36-1.25-3.2m1.25 3.2c0 2.9-2.35 5.25-5.25 5.25H6.75m12.75-5.25 2.25-2.25M19.5 12l-2.25-2.25M4.5 12c0 1.23.47 2.36 1.25 3.2M4.5 12c0-2.9 2.35-5.25 5.25-5.25h7.5M4.5 12 2.25 14.25M4.5 12l2.25 2.25"
const SHARE = "M6 12 3.27 3.13a59.77 59.77 0 0 1 18.22 8.87A59.77 59.77 0 0 1 3.27 20.88L6 12Zm0 0h7.5"
const MORE = "M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"

export default function PostExample({ loading = false }: { loading?: boolean }) {
  const [liked, setLiked] = useState(true)
  const [reposted, setReposted] = useState(false)
  return (
    <div style={{ width: 440, maxWidth: "100%" }}>
      <Post
        loading={loading}
        author="Jane Cooper"
        meta="@jane.cooper · 2h"
        avatar={<Avatar seed="jane.cooper" />}
        menu={<IconButton size="sm" aria-label="More">{icon(MORE)}</IconButton>}
        actions={[
          { id: "like", label: "Like", icon: icon(HEART), count: liked ? "248" : "247", pressed: liked, onPress: () => setLiked(!liked) },
          { id: "reply", label: "Reply", icon: icon(REPLY), count: "12", onPress: () => toast("Open the reply composer here") },
          { id: "repost", label: "Repost", icon: icon(REPOST), count: reposted ? "5" : "4", pressed: reposted, onPress: () => setReposted(!reposted) },
          { id: "share", label: "Share", icon: icon(SHARE), end: true, onPress: () => toast("Link copied", { tone: "success" }) },
        ]}
      >
        Shipped the new settings screen today. Every row is one sentence and one control, and it reads twice as fast.
      </Post>
      <Post
        loading={loading}
        author="Acme Studio"
        meta="@acme · Yesterday"
        avatar={<Avatar seed="acme" palette="ember" />}
        actions={[{ id: "like", label: "Like", icon: icon(HEART), count: "1,024", pressed: false }, { id: "reply", label: "Reply", icon: icon(REPLY), count: "86" }]}
      >
        We are hiring two engineers for the payments team. Remote, four-day weeks in summer.
      </Post>
    </div>
  )
}
