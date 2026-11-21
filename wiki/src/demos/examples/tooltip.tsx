import { Button, IconButton } from "@protocol/components/button/button"
import { toast } from "@protocol/components/toast/toast"
import { Tooltip } from "@protocol/components/tooltip/tooltip"
import { Row } from "../Demo"

const Label = ({ children }: { children: string }) => <span className="wiki-demo-label">{children}</span>

const Icon = ({ d }: { d: string }) => <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
const ICONS = {
  copy: "M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6",
  refresh: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99",
  columns: "M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z",
}

export default function TooltipExample() {
  return (
    <>
      <Label>Labels for icon buttons</Label>
      <Row>
        <Tooltip content="Copy link"><IconButton aria-label="Copy link" onClick={() => toast("Link copied", { tone: "success" })}><Icon d={ICONS.copy} /></IconButton></Tooltip>
        <Tooltip content="Reload"><IconButton aria-label="Reload"><Icon d={ICONS.refresh} /></IconButton></Tooltip>
        <Tooltip content="Open in split view"><IconButton aria-label="Open in split view"><Icon d={ICONS.columns} /></IconButton></Tooltip>
        <Tooltip content="Ends in 4d 07h 06m" kind="description"><span className="x-tag" tabIndex={0}>Trial</span></Tooltip>
      </Row>
      <Label>Sides</Label>
      <Row>
        <Tooltip content="On top" kind="description"><Button variant="ghost" size="sm">Top</Button></Tooltip>
        <Tooltip content="Below" kind="description" placement="bottom"><Button variant="ghost" size="sm">Bottom</Button></Tooltip>
        <Tooltip content="On the left" kind="description" placement="left"><Button variant="ghost" size="sm">Left</Button></Tooltip>
        <Tooltip content="On the right" kind="description" placement="right"><Button variant="ghost" size="sm">Right</Button></Tooltip>
      </Row>
    </>
  )
}
