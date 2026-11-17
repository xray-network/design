import { SendForm } from "@protocol/blocks/send-form/send-form"
import { toast } from "@protocol/components/toast/toast"

export default function SendFormExample() {
  return (
    <SendForm
      available={12480.254221}
      ticker="ADA"
      defaultFee="standard"
      toFiat={(n) => `$${(n * 0.7).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`}
      fees={[
        { value: "slow", title: "Slow", description: "About 5 min", amount: 0.12 },
        { value: "standard", title: "Standard", description: "About 20 s", amount: 0.17 },
        { value: "fast", title: "Fast", description: "About 5 s", amount: 0.42 },
      ]}
      onReview={({ amount, total, fee }) => toast(`Review: send ${amount} ADA with the ${fee.title.toLowerCase()} fee, ${total.toFixed(2)} ADA in total`, { tone: "info" })}
    />
  )
}
