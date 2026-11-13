import { useState } from "react"

import { Avatar } from "@kit/components/avatar/avatar"
import { Button, IconButton } from "@kit/components/button/button"
import { Card, CardGrid, Tile } from "@kit/components/card/card"
import { Chips } from "@kit/components/chips/chips"
import { List, ListHeading, ListIcon, ListRow } from "@kit/components/list/list"
import { Numeral } from "@kit/components/numeral/numeral"
import { OptionCards } from "@kit/components/option/option"
import { Tabs } from "@kit/components/tabs/tabs"
import { Delta, Status, Tag } from "@kit/components/tag/tag"
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
import tabsHtml from "@kit/components/tabs/tabs.html?raw"
import cardHtml from "@kit/components/card/card.html?raw"
import numeralHtml from "@kit/components/numeral/numeral.html?raw"
import avatarHtml from "@kit/components/avatar/avatar.html?raw"
import chipsHtml from "@kit/components/chips/chips.html?raw"
import optionHtml from "@kit/components/option/option.html?raw"
import listHtml from "@kit/components/list/list.html?raw"
import tagHtml from "@kit/components/tag/tag.html?raw"

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
  plus: "M12 4.5v15m7.5-7.5h-15",
  home: "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
  apps: "M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z",
  wallet: "M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3",
  squares: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z",
  signal: "M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z",
  up: "M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25",
  down: "M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25",
  bolt: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
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
        suffix={<><Button variant="chip">Max</Button><span className="x-input-affix">ADA</span></>}
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

// ---------------------------------------------------------------------------
// Components taken from the XRAY app shell and its mini apps
// ---------------------------------------------------------------------------

const APPS = [
  { id: "cardano-wallet", name: "Cardano Wallet", icon: ICONS.wallet, desc: "Official wallet for managing your assets." },
  { id: "cardano-assets", name: "Cardano Assets", icon: ICONS.squares, desc: "Track and manage your digital assets seamlessly." },
  { id: "wiki", name: "Wiki", glyph: "W", strip: "var(--x-warning)", desc: "Access comprehensive documentation and resources." },
  { id: "graph", name: "Graph", icon: ICONS.signal, desc: "Robust and scalable APIs for Cardano blockchain developers." },
]
const appTile = (app: (typeof APPS)[number], size?: "xs" | "md") => (
  <Tile size={size} strip={app.strip}>{app.glyph ?? <Icon d={app.icon!} />}</Tile>
)

function TabsReact() {
  const [open, setOpen] = useState(["graph", "cardano-wallet"])
  const [view, setView] = useState("dashboard")
  const close = (id: string) => {
    setOpen((ids) => ids.filter((x) => x !== id))
    if (view === id) setView("dashboard")
  }
  const next = APPS.find((app) => !open.includes(app.id))
  return (
    <>
      <Tabs
        aria-label="Views"
        value={view}
        onValueChange={setView}
        items={[
          { value: "dashboard", label: "Dashboard", icon: <Icon d={ICONS.home} /> },
          { value: "catalog", label: "Mini Apps", icon: <Icon d={ICONS.apps} /> },
          ...open.map((id, i) => {
            const app = APPS.find((a) => a.id === id)!
            return {
              value: id,
              label: app.name,
              icon: <span className="x-tab-placeholder" aria-hidden="true" />,
              separated: i === 0,
              actions: [{ label: `Close ${app.name}`, icon: <Icon d={ICONS.x} />, onClick: () => close(id) }],
            }
          }),
        ]}
        trailing={
          <IconButton aria-label="Open a mini app" disabled={!next} onClick={() => next && (setOpen((ids) => [...ids, next.id]), setView(next.id))}>
            <Icon d={ICONS.plus} />
          </IconButton>
        }
      />
      <p className="wiki-demo-note">Current view: {view}</p>
    </>
  )
}
export const TabsDemo = () => <Demo html={tabsHtml} react={<TabsReact />} />

export const CardDemo = () => (
  <Demo
    html={cardHtml}
    react={
      <CardGrid>
        {APPS.map((app) => (
          <Card
            key={app.id}
            title={app.name}
            description={app.desc}
            meta={`xray/${app.id}`}
            aria-label={`Open ${app.name}`}
            lead={appTile(app)}
            onClick={() => toast(`Opened ${app.name}`)}
            menu={
              <Menu
                aria-label={`${app.name} actions`}
                trigger={<IconButton size="sm" aria-label={`${app.name} actions`}><Icon d={ICONS.dots} /></IconButton>}
                items={[
                  { heading: <>{appTile(app, "xs")}{app.name}</> },
                  { label: "Open in split view", icon: <Icon d={ICONS.columns} />, onSelect: () => toast("Opened in split view") },
                  "separator",
                  { label: "Remove from dashboard", icon: <Icon d={ICONS.x} />, tone: "danger", onSelect: () => toast(`${app.name} removed`) },
                ]}
              />
            }
          />
        ))}
      </CardGrid>
    }
  />
)

function NumeralReact() {
  const [masked, setMasked] = useState(false)
  return (
    <>
      <Numeral value="12,480.254221" ticker="ADA" size="hero" masked={masked} />
      <Row>
        <Numeral value="5,000.000000" ticker="NIGHT" masked={masked} />
        <Numeral value="0.04215000" ticker="BTC" size="sm" masked={masked} />
        <Numeral value="1.248300" ticker="ETH" size="sm" masked={masked} />
      </Row>
      <Switch checked={masked} onChange={(e) => setMasked(e.target.checked)}>Hide balances</Switch>
    </>
  )
}
export const NumeralDemo = () => <Demo html={numeralHtml} react={<NumeralReact />} />

const CHAIN_MARKS = {
  ethereum: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.944 17.97 4.58 13.62l7.364 10.38 7.369-10.38-7.369 4.35Zm.112-17.97L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0Z" /></svg>,
  base: <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>,
  midnight: <svg viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 16.4a7.4 7.4 0 1 1 0-14.8 7.4 7.4 0 0 1 0 14.8Zm-.85-8.25h1.7v1.7h-1.7v-1.7Zm0-2.67h1.7v1.7h-1.7v-1.7Zm0-2.67h1.7v1.7h-1.7v-1.7Z" /></svg>,
}
const ACCOUNTS = [
  { label: "…lkgc86", address: "addr1q…lkgc86", palette: "btc", balance: "12,480.25 ADA" },
  { label: "…t7n2yd", address: "mn_addr1…t7n2yd", palette: "night", balance: "5,000.00 NIGHT", chain: "midnight", chainName: "Midnight" },
  { label: "…q8fz4h", address: "bc1q…q8fz4h", palette: "btc", balance: "0.04215 BTC" },
  { label: "…e93f9c", address: "0x7a3f…e93f9c", palette: "cool", balance: "1.2483 ETH", chain: "ethereum", chainName: "Ethereum" },
  { label: "…Hq4pNx", address: "7xKp…Hq4pNx", palette: "xray", balance: "42.50 SOL" },
] as const

export const AvatarDemo = () => (
  <Demo
    html={avatarHtml}
    react={
      <>
        <Row>
          {ACCOUNTS.map((a) => (
            <Avatar key={a.address} seed={a.address} palette={a.palette} badge={"chain" in a ? CHAIN_MARKS[a.chain] : undefined} badgeLabel={"chain" in a ? a.chainName : undefined} />
          ))}
        </Row>
        <Row>
          <Avatar seed="addr1q…lkgc86" palette="btc" size="sm" />
          <Avatar seed="addr1q…lkgc86" palette="btc" />
          <Avatar seed="addr1q…lkgc86" palette="btc" size="lg" />
        </Row>
        <List aria-label="Accounts">
          {ACCOUNTS.slice(0, 3).map((a) => (
            <ListRow key={a.address} title={<span style={{ fontFamily: "var(--x-font-mono)", fontSize: "var(--x-text-sm)", fontWeight: 500 }}>{a.label}</span>} sub={a.balance} lead={<Avatar seed={a.address} palette={a.palette} />} onClick={() => toast(`Switched to ${a.label}`)} />
          ))}
        </List>
      </>
    }
  />
)

function ChipsReact() {
  const [type, setType] = useState(["all"])
  return (
    <>
      <Chips
        aria-label="Transaction type"
        value={type}
        onValueChange={setType}
        options={[{ value: "all", label: "All" }, { value: "sent", label: "Sent", count: 3 }, { value: "received", label: "Received", count: 2 }, { value: "staking", label: "Staking", count: 1 }, { value: "tokens", label: "Tokens", disabled: true }]}
      />
      <p className="wiki-demo-note">Showing: {type[0]}</p>
      <Chips aria-label="Chains" multiple defaultValue={["cardano", "bitcoin"]} options={[{ value: "cardano", label: "Cardano" }, { value: "bitcoin", label: "Bitcoin" }, { value: "midnight", label: "Midnight" }, { value: "ethereum", label: "Ethereum" }]} />
    </>
  )
}
export const ChipsDemo = () => <Demo html={chipsHtml} react={<ChipsReact />} />

const FEES = { slow: "0.12", standard: "0.17", fast: "0.42" } as const
function OptionReact() {
  const [fee, setFee] = useState<keyof typeof FEES>("standard")
  return (
    <>
      <div style={{ alignSelf: "stretch" }}>
        <OptionCards
          aria-label="Network fee"
          value={fee}
          onValueChange={setFee}
          options={[
            { value: "slow", title: "Slow", description: "About 5 min", detail: "0.12 ADA" },
            { value: "standard", title: "Standard", description: "About 20 s", detail: "0.17 ADA" },
            { value: "fast", title: "Fast", description: "About 5 s", detail: "0.42 ADA" },
          ]}
        />
      </div>
      <p className="wiki-demo-note">Total: {(250 + Number(FEES[fee])).toFixed(2)} ADA (250.00 + {FEES[fee]} fee)</p>
    </>
  )
}
export const OptionDemo = () => <Demo html={optionHtml} react={<OptionReact />} />

const token = (letter: string, bg: string) => <span className="x-list-token" style={{ ["--x-list-token-bg" as string]: bg }} aria-hidden="true">{letter}</span>
export const ListDemo = () => (
  <Demo
    html={listHtml}
    react={
      <>
        <List aria-label="Recent activity">
          <ListHeading>Today</ListHeading>
          <ListRow title="Received" sub="14:02 · from addr1q9…7xk2" end="+250.00 ADA" endSub="$175.00" tone="positive" lead={<ListIcon tone="positive"><Icon d={ICONS.down} /></ListIcon>} onClick={() => toast("Transaction details")} />
          <ListRow title="Sent" sub="09:17 · to addr1qx…m4d1" end="−42.17 ADA" endSub="$29.52" lead={<ListIcon><Icon d={ICONS.up} /></ListIcon>} onClick={() => toast("Transaction details")} />
          <ListHeading>Yesterday</ListHeading>
          <ListRow title="Staking reward" sub="21:44 · Epoch 666" end="+12.40 ADA" endSub="$8.68" tone="positive" lead={<ListIcon tone="positive"><Icon d={ICONS.bolt} /></ListIcon>} onClick={() => toast("Transaction details")} />
        </List>
        <List aria-label="Assets">
          <ListHeading>Assets</ListHeading>
          <ListRow title="Cardano" sub="12,480.25 ADA" end="$8,736.18" endSub={<Delta value={2.4} />} lead={token("A", "var(--x-accent)")} />
          <ListRow title="Snek" sub="137,400 SNEK" end="$461.82" endSub={<Delta value={7.8} />} lead={token("S", "var(--x-warning)")} />
          <ListRow title="World Mobile" sub="1,446.00 WMT" end="$127.28" endSub={<Delta value={-2.6} />} lead={token("W", "var(--x-danger)")} />
        </List>
      </>
    }
  />
)

export const TagDemo = () => (
  <Demo
    html={tagHtml}
    react={
      <>
        <Row>
          <Tag>Epoch 667</Tag>
          <Tag status="success">Cardano Mainnet</Tag>
          <Tag status="warning">Syncing</Tag>
          <Tag size="sm">Read-only</Tag>
        </Row>
        <Row>
          <Status>Delegated</Status>
          <Status tone="warning">Pool saturated</Status>
          <Status tone="danger">Offline</Status>
          <Status tone="neutral">Not delegated</Status>
        </Row>
        <Row>
          <Delta value={2.4} />
          <Delta value={-4.1} />
          <Delta value={0} />
        </Row>
      </>
    }
  />
)
