import { Skeleton, SkeletonText } from "@protocol/components/skeleton/skeleton"

// Each text bar sits in the line it stands for, so the bars stack and a row keeps the height of the row it replaces.
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

// The placeholders themselves, pulsing: a list of payments, a paragraph and a card are loading.
export default function SkeletonExample() {
  return (
    <div style={{ display: "grid", gap: "var(--x-space-4)", alignSelf: "stretch" }} aria-busy="true" aria-label="Loading payments">
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonText lines={3} />
      <Skeleton height={96} />
    </div>
  )
}
