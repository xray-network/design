import { useState } from "react"
import { Segmented } from "@protocol/components/segmented/segmented"

export default function SegmentedExample() {
  const [period, setPeriod] = useState("7d")
  return (
    <>
      <Segmented
        aria-label="Period"
        value={period}
        onValueChange={setPeriod}
        options={[{ value: "24h", label: "24h" }, { value: "7d", label: "7 days" }, { value: "30d", label: "30 days" }, { value: "all", label: "All time" }]}
      />
      <Segmented aria-label="Assets" size="sm" options={[{ value: "tokens", label: "Tokens", count: 6 }, { value: "nfts", label: "NFTs", count: 12 }]} />
      <Segmented aria-label="Wallet action" fullWidth options={[{ value: "send", label: "Send" }, { value: "receive", label: "Receive" }, { value: "stake", label: "Stake" }, { value: "swap", label: "Swap", disabled: true }]} />
    </>
  )
}
