import { useEffect, useState } from "react"
import { Meter, Progress } from "@protocol/components/progress/progress"

export default function ProgressExample({ loading = false }: { loading?: boolean }) {
  const [upload, setUpload] = useState(12)
  useEffect(() => {
    const timer = setInterval(() => setUpload((v) => (v >= 100 ? 12 : Math.min(100, v + 11))), 900)
    return () => clearInterval(timer)
  }, [])
  return (
    <>
      <Progress value={upload} label="Uploading statement.pdf" />
      <Meter value={4.1} max={5} warning={4} danger={4.8} label="Storage" valueText="4.1 of 5 GB" aria-valuetext="4.1 of 5 GB" loading={loading} />
      <Meter value={1020} max={1000} danger={1000} label="Daily limit" valueText="$1,020 of $1,000" loading={loading} />
      <Meter value={3} max={10} label="Seats" valueText="3 of 10" size="sm" loading={loading} />
    </>
  )
}
