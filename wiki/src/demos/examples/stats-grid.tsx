import { StatsGrid } from "@protocol/blocks/stats-grid/stats-grid"

export default function StatsGridExample({ loading = false }: { loading?: boolean }) {
  return (
    <StatsGrid loading={loading}
      items={[
        { label: "Revenue", value: "$48,210.40", sub: "Last 30 days · Cards and bank" },
        { label: "Payouts", value: "$41,880.12", sub: "Last 30 days · To 2 bank accounts" },
        { label: "Fees", value: "$1,398.10", sub: "Last 30 days · 2.9% + $0.30" },
        {
          label: "API requests",
          value: "4,088,746",
          sub: "Last 30 days · Total",
          split: [
            { label: "Live", value: "4,010,362", share: 98.1 },
            { label: "Test", value: "78,384", share: 1.9 },
          ],
        },
        {
          label: "Traffic",
          value: "26.32 GiB",
          sub: "In 838 MiB · Out 25.5 GiB",
          split: [
            { label: "Cached", value: "12.73 GiB", share: 48.4 },
            { label: "Origin", value: "13.59 GiB", share: 51.6 },
          ],
        },
        {
          label: "Webhooks",
          value: "0",
          sub: "Last 30 days · None sent",
          split: [
            { label: "Delivered", value: "0", share: 0 },
            { label: "Failed", value: "0", share: 0, tone: "danger" },
          ],
        },
      ]}
    />
  )
}
