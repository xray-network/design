import { Button } from "@protocol/components/button/button"
import { Popconfirm } from "@protocol/components/popconfirm/popconfirm"
import { toast } from "@protocol/components/toast/toast"
import { Row } from "../Demo"

export default function PopconfirmExample() {
  return (
    <>
      <Row>
        <Popconfirm
          trigger={<Button variant="ghost">Remove app</Button>}
          title="Remove Reports from the dashboard?"
          description="You can add it again from Apps."
          confirmLabel="Remove"
          tone="danger"
          onConfirm={() => toast("Reports removed", { tone: "success" })}
        />
        <Popconfirm
          trigger={<Button variant="ghost">Clear watchlist</Button>}
          title="Clear the watchlist?"
          confirmLabel="Clear"
          onConfirm={() => toast("Watchlist cleared")}
        />
      </Row>
      <Row>
        {(["top", "bottom", "left", "right"] as const).map((side) => (
          <Popconfirm
            key={side}
            trigger={<Button variant="ghost" size="sm">{side[0].toUpperCase() + side.slice(1)}</Button>}
            title="Archive this invoice?"
            confirmLabel="Archive"
            placement={side}
            onConfirm={() => toast("Invoice archived")}
          />
        ))}
      </Row>
    </>
  )
}
