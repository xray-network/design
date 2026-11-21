import { avatarSvg, type AvatarPalette } from "@protocol/components/avatar/avatar.controller.js"

/** Abstract art in place of a photograph, from the Avatar's generator: it fills the box it is put in. */
export function Art({ seed, palette = "cool", label = "Abstract picture" }: { seed: string; palette?: AvatarPalette; label?: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      style={{ display: "block", width: "100%", height: "100%" }}
      dangerouslySetInnerHTML={{ __html: avatarSvg(seed, palette).replace("<svg ", '<svg preserveAspectRatio="xMidYMid slice" style="display:block;width:100%;height:100%" ') }}
    />
  )
}
