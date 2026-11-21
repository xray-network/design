import { Copy } from "@protocol/components/copy/copy"
import { toast } from "@protocol/components/toast/toast"

export default function CopyExample() {
  return (
    <>
      <Copy value="0x52908400098527886E0F7030069857D2E4169EE7" label="address" onCopy={() => toast("Address copied", { tone: "success" })} />
      <div style={{ width: 200, maxWidth: "100%" }}>
        <Copy value="0x52908400098527886E0F7030069857D2E4169EE7" label="address" />
      </div>
      <Copy value="https://xray.app/invite/7Q2K-ML4P-90ZD" label="invite link" font="sans" tail={0} />
      <Copy value="bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" label="address" variant="block" />
    </>
  )
}
