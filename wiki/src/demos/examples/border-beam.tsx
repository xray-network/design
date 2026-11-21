import { BorderBeam } from "@protocol/components/border-beam/border-beam"
import { Skeleton } from "@protocol/components/skeleton/skeleton"

const card = { position: "relative", padding: "var(--x-space-5)", border: "1px solid var(--x-border)", borderRadius: "var(--x-radius-2xl)", background: "var(--x-bg-panel)" } as const
const title = { margin: 0, color: "var(--x-fg-1)", fontWeight: 600 } as const
const text = { margin: "4px 0 0", color: "var(--x-fg-3)", fontSize: "var(--x-text-sm)" } as const

const CARDS = [
  { title: "Revenue report", text: "May · Ready to download", color: undefined },
  { title: "Payout statement", text: "May · Ready to download", color: "var(--x-success)" },
]

// Both cards are being prepared: while they load, their texts are placeholders and the beam runs as a progress cue.
// The second one shows the beam in another color.
export default function BorderBeamExample({ loading = false }: { loading?: boolean }) {
  return (
    <div className="wiki-demo-beam" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--x-space-4)" }}>
      {CARDS.map((item) => (
        <div key={item.title} style={card} aria-busy={loading || undefined}>
          <p style={title}>{loading ? <Skeleton shape="text" width="45%" /> : item.title}</p>
          <p style={text}>{loading ? <Skeleton shape="text" width="70%" /> : item.text}</p>
          {loading && <BorderBeam color={item.color} />}
        </div>
      ))}
    </div>
  )
}
