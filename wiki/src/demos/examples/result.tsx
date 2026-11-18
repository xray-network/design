import { useState } from "react"
import { Button } from "@protocol/components/button/button"
import { Result } from "@protocol/components/result/result"
import { Segmented } from "@protocol/components/segmented/segmented"
import type { ResultStatus } from "@protocol/components/result/result"

const COPY: Record<Exclude<ResultStatus, "loading">, { title: string; description: string }> = {
  success: { title: "Account added", description: "Your account is ready to use." },
  error: { title: "Payment failed", description: "The card was declined. You were not charged." },
  info: { title: "Nothing to claim", description: "Credits appear here after a referral signs up." },
  warning: { title: "Seat limit reached", description: "Invites are paused until you add seats." },
}

export default function ResultExample({ loading = false }: { loading?: boolean }) {
  const [status, setStatus] = useState<Exclude<ResultStatus, "loading">>("success")
  const [round, setRound] = useState(0)
  return (
    <>
      <Segmented aria-label="Status" size="sm" value={status} onValueChange={(s) => { setStatus(s as Exclude<ResultStatus, "loading">); setRound(round + 1) }}
        options={[{ value: "success", label: "Success" }, { value: "error", label: "Error" }, { value: "info", label: "Info" }, { value: "warning", label: "Warning" }]} />
      <Result
        key={loading ? "loading" : round}
        status={loading ? "loading" : status}
        title={loading ? "Processing payment" : COPY[status].title}
        description={loading ? "This takes a few seconds." : COPY[status].description}
        actions={loading ? undefined : <Button shape="round" onClick={() => setRound(round + 1)}>Play again</Button>}
      />
    </>
  )
}
