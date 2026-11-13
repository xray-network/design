import { useState } from "react"

import { Button, IconButton } from "@kit/components/button/button"
import { Dialog } from "@kit/components/dialog/dialog"
import { Input, TextField } from "@kit/components/field/field"
import { Menu } from "@kit/components/menu/menu"
import { Segmented } from "@kit/components/segmented/segmented"
import { Switch } from "@kit/components/switch/switch"
import { toast } from "@kit/components/toast/toast"

import buttonHtml from "@kit/components/button/button.html?raw"
import segmentedHtml from "@kit/components/segmented/segmented.html?raw"
import switchHtml from "@kit/components/switch/switch.html?raw"
import fieldHtml from "@kit/components/field/field.html?raw"
import dialogHtml from "@kit/components/dialog/dialog.html?raw"
import menuHtml from "@kit/components/menu/menu.html?raw"
import toastHtml from "@kit/components/toast/toast.html?raw"

import { Demo, Row } from "./Demo"

const Icon = ({ d }: { d: string }) => (
  <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
)
const ICONS = {
  dots: "M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z",
  x: "M6 18 18 6M6 6l12 12",
  copy: "M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6",
  sliders: "M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75",
  search: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z",
  refresh: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99",
  columns: "M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z",
}

export function ButtonDemo() {
  return (
    <Demo
      html={buttonHtml}
      react={
        <>
          <Row>
            <Button>Send</Button>
            <Button variant="ghost">Cancel</Button>
            <Button size="sm">Stake</Button>
            <Button variant="ghost" size="sm">Details</Button>
            <Button variant="chip">Max</Button>
          </Row>
          <Row>
            <Button variant="danger">Remove account</Button>
            <Button loading>Sending</Button>
            <Button disabled>Send</Button>
          </Row>
          <Row>
            <IconButton aria-label="Dashboard settings"><Icon d={ICONS.sliders} /></IconButton>
            <IconButton aria-label="Close tab" size="sm"><Icon d={ICONS.x} /></IconButton>
            <IconButton aria-label="Copy address" size="xs"><Icon d={ICONS.copy} /></IconButton>
            <IconButton aria-label="More actions" shape="round"><Icon d={ICONS.dots} /></IconButton>
          </Row>
          <Button size="lg" fullWidth>Confirm and send</Button>
        </>
      }
    />
  )
}

function SegmentedReact() {
  const [period, setPeriod] = useState("7d")
  return (
    <>
      <Segmented
        aria-label="Period"
        value={period}
        onValueChange={setPeriod}
        options={[{ value: "24h", label: "24h" }, { value: "7d", label: "7 days" }, { value: "30d", label: "30 days" }, { value: "all", label: "All time" }]}
      />
      <p className="wiki-demo-note">Selected: {period}</p>
      <Segmented aria-label="Assets" size="sm" options={[{ value: "tokens", label: "Tokens", count: 6 }, { value: "nfts", label: "NFTs", count: 12 }]} />
      <Segmented aria-label="Wallet action" fullWidth options={[{ value: "send", label: "Send" }, { value: "receive", label: "Receive" }, { value: "stake", label: "Stake" }, { value: "swap", label: "Swap", disabled: true }]} />
    </>
  )
}
export const SegmentedDemo = () => <Demo html={segmentedHtml} react={<SegmentedReact />} />

function SwitchReact() {
  const [hidden, setHidden] = useState(true)
  return (
    <>
      <Switch checked={hidden} onChange={(e) => setHidden(e.target.checked)}>Hide balances</Switch>
      <Switch labelPosition="start">Lock after 5 minutes</Switch>
      <Switch size="sm" disabled>Testnet (unavailable)</Switch>
    </>
  )
}
export const SwitchDemo = () => <Demo html={switchHtml} react={<SwitchReact />} />

function FieldReact() {
  const [note, setNote] = useState("")
  const [touched, setTouched] = useState(false)
  const error = touched && note.length > 64 ? `Notes are limited to 64 characters (${note.length})` : undefined
  return (
    <>
      <TextField label="To" placeholder="addr1… or $handle" hint="Cardano address or ADA handle" spellCheck={false} autoComplete="off" />
      <TextField
        label="Amount"
        size="lg"
        inputMode="decimal"
        placeholder="0.00"
        hint="Available 12,480.25 ADA"
        suffix={<><span className="x-input-affix">ADA</span><Button variant="chip">Max</Button></>}
      />
      <TextField
        label="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder="Type more than 64 characters, then leave the field"
        error={error}
      />
      <Input size="sm" aria-label="Search mini apps" placeholder="Search mini apps" prefix={<Icon d={ICONS.search} />} />
    </>
  )
}
export const FieldDemo = () => <Demo html={fieldHtml} react={<FieldReact />} />

function DialogReact() {
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
export const DialogDemo = () => <Demo html={dialogHtml} react={<DialogReact />} />

function MenuReact() {
  return (
    <Row>
      <Menu
        aria-label="Mini app actions"
        trigger={<IconButton aria-label="Mini app actions"><Icon d={ICONS.dots} /></IconButton>}
        items={[
          { heading: "Wallet" },
          { label: "Open in split view", icon: <Icon d={ICONS.columns} />, note: "⌘ Enter", onSelect: () => toast("Opened in split view") },
          { label: "Reload", icon: <Icon d={ICONS.refresh} />, onSelect: () => toast("Reloaded") },
          { label: "Open in browser", note: "Soon", disabled: true },
          "separator",
          { label: "Close mini app", icon: <Icon d={ICONS.x} />, tone: "danger", onSelect: () => toast("Mini app closed") },
        ]}
      />
      <Menu
        aria-label="Sort assets"
        trigger={<Button variant="ghost" size="sm">Sort by</Button>}
        items={[{ label: "Value", onSelect: () => toast("Sorted by value") }, { label: "Name", onSelect: () => toast("Sorted by name") }, { label: "Change 24h", onSelect: () => toast("Sorted by change") }]}
      />
    </Row>
  )
}
export const MenuDemo = () => <Demo html={menuHtml} react={<MenuReact />} />

function ToastReact() {
  return (
    <Row>
      <Button variant="ghost" onClick={() => toast("Address copied", { tone: "success" })}>Copy address</Button>
      <Button
        variant="ghost"
        onClick={() => toast("Transaction failed: fee too low", { tone: "danger", action: { label: "Retry", onClick: () => toast("Retrying with a standard fee", { tone: "info" }) } })}
      >
        Send (fails)
      </Button>
      <Button variant="ghost" onClick={() => toast("Epoch 667 started")}>Neutral</Button>
    </Row>
  )
}
// The HTML version shares the wiki's single toaster (mounted by the theme layout).
const wireToastHtml = (root: HTMLElement) => {
  root.querySelector("#copy")?.addEventListener("click", () => toast("Address copied", { tone: "success" }))
  root.querySelector("#fail")?.addEventListener("click", () =>
    toast("Transaction failed: fee too low", { tone: "danger", action: { label: "Retry", onClick: () => toast("Retrying", { tone: "info" }) } }),
  )
}
export const ToastDemo = () => <Demo html={toastHtml} react={<ToastReact />} after={wireToastHtml} />
