import { useState } from "react"
import { Button } from "@protocol/components/button/button"
import { Result } from "@protocol/components/result/result"
import { Segmented } from "@protocol/components/segmented/segmented"
import type { ResultStatus } from "@protocol/components/result/result"

const COPY: Record<ResultStatus, { title: string; description: string }> = {
  success: { title: "Account added", description: "Your account is ready to use." },
  error: { title: "Payment failed", description: "The card was declined. You were not charged." },
  info: { title: "Nothing to claim", description: "Credits appear here after a referral signs up." },
  warning: { title: "Seat limit reached", description: "Invites are paused until you add seats." },
  loading: { title: "Processing payment", description: "This takes a few seconds." },
}

export default function ResultExample() {
  const [status, setStatus] = useState<ResultStatus>("success")
  const [round, setRound] = useState(0)
  return (
    <>
      <Segmented aria-label="Status" size="sm" value={status} onValueChange={(s) => { setStatus(s as ResultStatus); setRound(round + 1) }}
        options={[{ value: "success", label: "Success" }, { value: "error", label: "Error" }, { value: "info", label: "Info" }, { value: "warning", label: "Warning" }, { value: "loading", label: "Loading" }]} />
      <Result
        key={round}
        status={status}
        title={COPY[status].title}
        description={COPY[status].description}
        actions={status === "loading" ? undefined : <Button shape="round" onClick={() => setRound(round + 1)}>Play again</Button>}
      />
    </>
  )
}
