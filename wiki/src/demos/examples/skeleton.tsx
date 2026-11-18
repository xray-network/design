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

const SkeletonRow = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "var(--x-space-3)" }}>
    <Skeleton shape="circle" width={40} />
    <div style={{ flex: 1 }}>
      <Skeleton shape="text" width="40%" />
      <Skeleton shape="text" width="25%" />
    </div>
    <Skeleton shape="text" width={72} />
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
            <p style={{ margin: 0 }}>Payments clear in two business days. You can follow each one from the moment it is authorized to the moment it reaches your bank.</p>
            <div style={{ height: 96, borderRadius: "var(--x-radius-md)", background: "var(--x-accent-wash)" }} />
          </>
        )}
      </div>
    </>
  )
}
