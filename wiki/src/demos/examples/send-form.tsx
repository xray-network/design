import { SendForm } from "@protocol/blocks/send-form/send-form"
import { toast } from "@protocol/components/toast/toast"

export default function SendFormExample({ loading = false }: { loading?: boolean }) {
  return (
    <SendForm loading={loading}
      available={12480.25}
      ticker="USD"
      defaultFee="standard"
      toFiat={(n) => `≈ €${(n * 0.92).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
      fees={[
        { value: "slow", title: "Standard", description: "2–3 business days", amount: 0 },
        { value: "standard", title: "Same day", description: "Before 6 pm", amount: 1 },
        { value: "fast", title: "Instant", description: "In seconds", amount: 2.5 },
      ]}
      onReview={({ amount, total, fee }) => toast(`Review: send ${amount} USD, ${fee.title.toLowerCase()}, ${total.toFixed(2)} USD in total`, { tone: "info" })}
    />
  )
}
