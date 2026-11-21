import { useState } from "react"
import { Profile } from "@protocol/blocks/profile/profile"
import { Avatar } from "@protocol/components/avatar/avatar"
import { Button } from "@protocol/components/button/button"

export default function ProfileExample({ loading = false }: { loading?: boolean }) {
  const [following, setFollowing] = useState(false)
  return (
    <div style={{ width: 380, maxWidth: "100%" }}>
      <Profile
        loading={loading}
        name="Jane Cooper"
        handle="@jane.cooper"
        bio="Product designer. Notes on interfaces, type and the small details that make software feel calm."
        avatar={<Avatar seed="jane.cooper" size="lg" />}
        stats={[{ label: "Posts", value: "128" }, { label: "Followers", value: following ? "12.5K" : "12.4K" }, { label: "Following", value: "312" }]}
        actions={
          <>
            <Button variant={following ? "ghost" : "primary"} onClick={() => setFollowing(!following)}>{following ? "Following" : "Follow"}</Button>
            <Button variant="ghost">Message</Button>
          </>
        }
      />
    </div>
  )
}
