import { Skeleton, SkeletonText } from "@protocol/components/skeleton/skeleton"

const Row = ({ name, sub, amount }: { name: string; sub: string; amount: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "var(--x-space-3)" }}>
    <span style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--x-accent-wash)", flex: "none" }} aria-hidden="true" />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ color: "var(--x-fg-1)", fontWeight: 600 }}>{name}</div>
      <div style={{ color: "var(--x-fg-3)", fontSize: "var(--x-text-xs)" }}>{sub}</div>
    </div>
    <div style={{ color: "var(--x-fg-1)", fontWeight: 600 }}>{amount}</div>
  </div>
)

// Each text bar sits in the line it stands for (the same two lines as Row), so the bars stack and the row keeps its height.
const SkeletonRow = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "var(--x-space-3)" }}>
    <Skeleton shape="circle" width={40} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div><Skeleton shape="text" width="40%" /></div>
      <div style={{ fontSize: "var(--x-text-xs)" }}><Skeleton shape="text" width="55%" /></div>
    </div>
    <div><Skeleton shape="text" width={72} /></div>
  </div>
)

export default function SkeletonExample({ loading = true }: { loading?: boolean }) {
  return (
    <>
      <div style={{ display: "grid", gap: "var(--x-space-4)", alignSelf: "stretch" }} aria-busy={loading || undefined} aria-label={loading ? "Loading payments" : undefined}>
        {loading ? (
          <>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonText lines={3} />
            <Skeleton height={96} />
          </>
        ) : (
          <>
            <Row name="Jane Cooper" sub="Card payment · Today, 14:02" amount="+$250.00" />
            <Row name="Acme Inc." sub="Bank transfer · Yesterday" amount="+$1,200.00" />
            {/* Three lines at any width, like its placeholder: long enough to fill them, clamped so it never takes a fourth. */}
            <p style={{ margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              Payments clear in two business days. You can follow each one from the moment it is authorized to the moment it reaches your bank,
              with every status change listed in the activity feed, the fee shown before you confirm, and a receipt you can download or share
              as soon as the payment settles. Refunds follow the same path back to the original payment method and appear here as well.
            </p>
            <div style={{ height: 96, borderRadius: "var(--x-radius-md)", background: "var(--x-accent-wash)" }} />
          </>
        )}
      </div>
    </>
  )
}
