import { Button } from "@protocol/components/button/button"
import { Empty } from "@protocol/components/empty/empty"
import { inboxStack, magnifyingGlass } from "@protocol/components/icon/icons.js"
import { toast } from "@protocol/components/toast/toast"

const Svg = ({ body }: { body: string }) => <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: body }} />

export default function EmptyExample() {
  return (
    <>
      <Empty
        icon={<Svg body={inboxStack.body} />}
        title="No payments yet"
        description="Payments you receive will show up here."
        actions={<Button onClick={() => toast("Receive")}>Receive</Button>}
      />
      <Empty size="sm" icon={<Svg body={magnifyingGlass.body} />} title="No results" description="Try another name or address." />
    </>
  )
}
