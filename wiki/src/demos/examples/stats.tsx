import { Stats } from "@protocol/blocks/stats/stats"

export default function StatsExample() {
  return (
    <>
      <Stats
        columns={3}
        items={[
          { label: "Received", value: "+337.90", tone: "positive", sub: "ADA, last 14 days" },
          { label: "Sent", value: "−1,045.38", sub: "ADA, last 14 days" },
          { label: "Transactions", value: "38", sub: "0.51 ADA in fees" },
        ]}
      />
      <Stats
        items={[
          { label: "Requests, 24h", value: "1.28M", delta: { value: "6.2%", direction: "up", tone: "positive" } },
          { label: "Latency, p95", value: "84 ms", delta: { value: "3.1%", direction: "down", tone: "positive" } },
          { label: "Error rate", value: "0.02%", delta: { value: "0.01 pts", direction: "down", tone: "positive" } },
          { label: "Uptime, 30d", value: "99.98%", sub: "No incidents" },
        ]}
      />
    </>
  )
}
