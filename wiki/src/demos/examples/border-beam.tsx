import { BorderBeam } from "@protocol/components/border-beam/border-beam"
import { Skeleton } from "@protocol/components/skeleton/skeleton"

const card = { position: "relative", padding: "var(--x-space-5)", border: "1px solid var(--x-border)", borderRadius: "var(--x-radius-2xl)", background: "var(--x-bg-panel)" } as const
const title = { margin: 0, color: "var(--x-fg-1)", fontWeight: 600 } as const
const text = { margin: "4px 0 0", color: "var(--x-fg-3)", fontSize: "var(--x-text-sm)" } as const

// The first card is being prepared: while it loads its texts are placeholders and the beam runs as a progress cue.
// The second is a featured card: its beam is decoration and always runs.
export default function BorderBeamExample({ loading = false }: { loading?: boolean }) {
  return (
    <div className="wiki-demo-beam" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--x-space-4)" }}>
      <div style={card} aria-busy={loading || undefined}>
        <p style={title}>{loading ? <Skeleton shape="text" width="45%" /> : "Revenue report"}</p>
        <p style={text}>{loading ? <Skeleton shape="text" width="70%" /> : "May · Ready to download"}</p>
        {loading && <BorderBeam />}
      </div>
      <div style={card}>
        <p style={title}>Recommended</p>
        <p style={text}>The plan most teams pick.</p>
        <BorderBeam reverse color="var(--x-success)" />
      </div>
    </div>
  )
}
