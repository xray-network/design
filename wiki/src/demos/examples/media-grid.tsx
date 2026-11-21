import { MediaGrid } from "@protocol/blocks/media-grid/media-grid"
import { Icon } from "@protocol/components/icon/icon"
import { play, square2Stack } from "@protocol/components/icon/icons.js"
import { Art } from "../Art"

const PALETTES = ["cool", "amber", "ember", "xray", "blue"] as const

export default function MediaGridExample() {
  return (
    <div style={{ width: 380, maxWidth: "100%", borderRadius: "var(--x-radius-2xl)", overflow: "hidden" }}>
      <MediaGrid
        aria-label="Explore"
        items={Array.from({ length: 11 }, (_, i) => ({
          id: String(i),
          label: `Picture ${i + 1}${i === 1 ? ", video" : i === 6 ? ", 4 pictures" : ""}`,
          media: <Art seed={`explore-${i}`} palette={PALETTES[i % PALETTES.length]} />,
          tall: i === 2,
          mark: i === 1 ? <Icon icon={play} /> : i === 6 ? <Icon icon={square2Stack} /> : undefined,
        }))}
      />
    </div>
  )
}
