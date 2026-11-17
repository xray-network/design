import { useState } from "react"
import { Button } from "@protocol/components/button/button"
import { Dialog } from "@protocol/components/dialog/dialog"
import { toast } from "@protocol/components/toast/toast"

export default function DialogExample() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>Remove account</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        size="sm"
        title="Remove account?"
        description="Account 2 will be removed from this device. Your funds stay on chain; you can restore the account from its recovery phrase."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)} data-autofocus>Cancel</Button>
            <Button variant="danger" onClick={() => { setOpen(false); toast("Account 2 removed", { tone: "success" }) }}>Remove</Button>
          </>
        }
      />
    </>
  )
}
