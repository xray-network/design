// Showcase screens: whole app screens composed only from kit components and blocks, with no styles of their own
// beyond layout (showcase.css). Each one is listed in navigation.ts `showcase`, with the parts it uses.

import { useState, type ReactNode } from "react"
import { AccountSwitcher } from "@protocol/blocks/account-switcher/account-switcher"
import { Balance } from "@protocol/blocks/balance/balance"
import { Card, CardGrid, Tile } from "@protocol/blocks/card/card"
import { SendForm } from "@protocol/blocks/send-form/send-form"
import { Stats } from "@protocol/blocks/stats/stats"
import { Transactions, type Transaction } from "@protocol/blocks/transactions/transactions"
import { Alert } from "@protocol/components/alert/alert"
import { Button } from "@protocol/components/button/button"
import { Checkbox, CheckboxGroup } from "@protocol/components/checkbox/checkbox"
import { Chips } from "@protocol/components/chips/chips"
import { Dialog } from "@protocol/components/dialog/dialog"
import { Field, Input, TextField } from "@protocol/components/field/field"
import { Pagination } from "@protocol/components/pagination/pagination"
import { RadioGroup } from "@protocol/components/radio/radio"
import { Segmented } from "@protocol/components/segmented/segmented"
import { Select } from "@protocol/components/select/select"
import { Switch } from "@protocol/components/switch/switch"
import { Table } from "@protocol/components/table/table"
import { Tabs } from "@protocol/components/tabs/tabs"
import { Tag } from "@protocol/components/tag/tag"
import { toast } from "@protocol/components/toast/toast"
import { Section } from "./Showcase"

const Icon = ({ d }: { d: string }) => <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
const ICONS = {
  home: "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
  apps: "M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z",
  search: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z",
}

// ---- Wallet: account, balance, period stats and history; Send opens the send form in a modal.

const TX: Transaction[] = [
  { id: "1", kind: "received", day: "Today", title: "Received", sub: "14:02 · from addr1q9…7xk2", amount: "+250.00 ADA", fiat: "$175.00" },
  { id: "2", kind: "sent", day: "Today", title: "Sent", sub: "09:17 · to addr1qx…m4d1", amount: "−42.17 ADA", fiat: "$29.52" },
  { id: "3", kind: "staking", day: "Yesterday", title: "Staking reward", sub: "21:44 · Epoch 666", amount: "+12.40 ADA", fiat: "$8.68" },
  { id: "4", kind: "sent", day: "Yesterday", title: "Sent", sub: "08:03 · to $alice", amount: "−1,000.00 ADA", fiat: "$700.00" },
  { id: "5", kind: "received", day: "Nov 9", title: "Received", sub: "11:50 · from addr1q8…c3f0", amount: "+75.50 ADA", fiat: "$52.85" },
  { id: "6", kind: "staking", day: "Nov 9", title: "Staking reward", sub: "21:41 · Epoch 665", amount: "+12.31 ADA", fiat: "$8.62" },
  { id: "7", kind: "sent", day: "Nov 8", title: "Sent", sub: "16:31 · to addr1qy…9e12", amount: "−3.21 ADA", fiat: "$2.25" },
]

const PERIOD_STATS = {
  "7d": [
    { label: "Received", value: "+337.90", tone: "positive" as const, sub: "ADA" },
    { label: "Sent", value: "−1,045.38", sub: "ADA" },
    { label: "Transactions", value: "7", sub: "0.51 ADA in fees" },
  ],
  "30d": [
    { label: "Received", value: "+1,284.12", tone: "positive" as const, sub: "ADA" },
    { label: "Sent", value: "−2,310.64", sub: "ADA" },
    { label: "Transactions", value: "38", sub: "2.94 ADA in fees" },
  ],
}

export function WalletScreen() {
  const [account, setAccount] = useState("ada-1")
  const [period, setPeriod] = useState<"7d" | "30d">("7d")
  const [sending, setSending] = useState(false)
  return (
    <>
      <div className="wiki-showcase-bar">
        <AccountSwitcher
          value={account}
          onValueChange={setAccount}
          onAdd={() => toast("Add account")}
          accounts={[
            { id: "ada-1", label: "…lkgc86", address: "addr1q…lkgc86", palette: "btc", balance: "12,480.25 ADA" },
            { id: "ada-2", label: "…t7n2yd", address: "addr1q…t7n2yd", palette: "cool", balance: "820.00 ADA" },
          ]}
        />
        <Tag status="success">Cardano Mainnet</Tag>
      </div>
      <Balance
        value="12,480.254221"
        ticker="ADA"
        fiat="$8,736.18 USD"
        change={2.4}
        actions={
          <>
            <Button onClick={() => setSending(true)}>Send</Button>
            <Button variant="ghost" onClick={() => toast("Receive")}>Receive</Button>
            <Button variant="ghost" onClick={() => toast("Stake")}>Stake</Button>
          </>
        }
      />
      <Section
        title="Activity"
        action={
          <Segmented
            aria-label="Period"
            size="sm"
            value={period}
            onValueChange={(v) => setPeriod(v as "7d" | "30d")}
            options={[{ value: "7d", label: "7 days" }, { value: "30d", label: "30 days" }]}
          />
        }
      >
        <Stats columns={3} items={PERIOD_STATS[period]} />
      </Section>
      <Transactions items={TX} pageSize={5} onSelect={(t) => toast(`Transaction ${t.id}`)} />
      <Dialog open={sending} onOpenChange={setSending} title="Send ADA">
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
          onReview={({ amount }) => { setSending(false); toast(`Review: send ${amount} ADA`, { tone: "info" }) }}
        />
      </Dialog>
    </>
  )
}

// ---- API dashboard: period, headline numbers, an incident note and the endpoints table.

type Endpoint = { path: string; method: string; requests: number; errors: number; latency: number }
const ENDPOINTS: Endpoint[] = [
  { path: "/accounts/{address}", method: "GET", requests: 182340, errors: 0.2, latency: 41 },
  { path: "/transactions/{hash}", method: "GET", requests: 96115, errors: 0.4, latency: 58 },
  { path: "/assets/{policy}", method: "GET", requests: 54220, errors: 0.1, latency: 37 },
  { path: "/tx/submit", method: "POST", requests: 12804, errors: 1.9, latency: 212 },
  { path: "/epochs/latest", method: "GET", requests: 9871, errors: 0, latency: 22 },
  { path: "/pools/{id}/delegators", method: "GET", requests: 6403, errors: 0.7, latency: 133 },
  { path: "/scripts/{hash}", method: "GET", requests: 3310, errors: 0.3, latency: 64 },
  { path: "/metadata/{label}", method: "GET", requests: 1288, errors: 0, latency: 49 },
]
const PAGE_SIZE = 4

export function DashboardScreen() {
  const [period, setPeriod] = useState("24h")
  const [page, setPage] = useState(1)
  return (
    <>
      <div className="wiki-showcase-bar">
        <Segmented
          aria-label="Period"
          value={period}
          onValueChange={setPeriod}
          options={[{ value: "24h", label: "24h" }, { value: "7d", label: "7 days" }, { value: "30d", label: "30 days" }]}
        />
        <Button variant="ghost" size="sm" onClick={() => toast("Report exported", { tone: "success" })}>Export</Button>
      </div>
      <Stats
        items={[
          { label: "Requests", value: "1.28M", delta: { value: "6.2%", direction: "up", tone: "positive" } },
          { label: "Latency, p95", value: "84 ms", delta: { value: "3.1%", direction: "down", tone: "positive" } },
          { label: "Error rate", value: "0.02%", delta: { value: "0.01 pts", direction: "down", tone: "positive" } },
          { label: "Uptime, 30d", value: "99.98%", sub: "No incidents" },
        ]}
      />
      <Alert tone="warning" title="/tx/submit is slower than usual">Mempool load is high, so submissions take about 200 ms. No action is needed.</Alert>
      <Table
        caption="Endpoints"
        title="Endpoints"
        description="Busiest first"
        rows={ENDPOINTS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)}
        rowKey={(r) => r.path}
        defaultSort={{ key: "requests", direction: "descending" }}
        columns={[
          { key: "path", header: "Endpoint" },
          { key: "method", header: "Method", align: "center" },
          { key: "requests", header: "Requests", align: "end", sortValue: (r) => r.requests, render: (r) => r.requests.toLocaleString("en-US") },
          { key: "errors", header: "Errors", align: "end", sortValue: (r) => r.errors, render: (r) => `${r.errors}%` },
          { key: "latency", header: "Latency", align: "end", sortValue: (r) => r.latency, render: (r) => `${r.latency} ms` },
        ]}
        footer={<Pagination page={page} pageCount={Math.ceil(ENDPOINTS.length / PAGE_SIZE)} total={ENDPOINTS.length} onPageChange={setPage} aria-label="Endpoints pages" />}
      />
    </>
  )
}

// ---- Settings: one row per group, the label on the left and its controls on the right.

const Setting = ({ title, text, children }: { title: string; text: string; children: ReactNode }) => (
  <div className="wiki-showcase-setting">
    <div><h3>{title}</h3><p>{text}</p></div>
    <div className="wiki-showcase-setting-controls">{children}</div>
  </div>
)

export function SettingsScreen() {
  const [network, setNetwork] = useState("mainnet")
  const [notify, setNotify] = useState({ received: true, sent: true, rewards: false })
  return (
    <div className="wiki-showcase-settings">
      <Setting title="Account" text="How this account appears in the switcher.">
        <TextField label="Account name" defaultValue="Main wallet" />
      </Setting>
      <Setting title="Network" text="Testnets use test ADA with no value.">
        <Field label="Network">
          {(p) => (
            <Select
              {...p}
              value={network}
              onValueChange={setNetwork}
              options={[
                { value: "mainnet", label: "Cardano Mainnet", note: "Block 14,187,156" },
                { value: "preprod", label: "Cardano Preprod", note: "Testnet" },
              ]}
            />
          )}
        </Field>
      </Setting>
      <Setting title="Display" text="Currency for fiat values, and the theme.">
        <RadioGroup legend="Currency" defaultValue="usd" options={[{ value: "usd", label: "US dollar" }, { value: "eur", label: "Euro" }, { value: "ada", label: "ADA" }]} />
        <RadioGroup legend="Theme" direction="row" defaultValue="system" options={[{ value: "system", label: "System" }, { value: "light", label: "Light" }, { value: "dark", label: "Dark" }]} />
      </Setting>
      <Setting title="Notifications" text="What this device tells you about.">
        <CheckboxGroup legend="Notify me about">
          <Checkbox checked={notify.received} onChange={(e) => setNotify({ ...notify, received: e.target.checked })}>Incoming funds</Checkbox>
          <Checkbox checked={notify.sent} onChange={(e) => setNotify({ ...notify, sent: e.target.checked })}>Outgoing transactions</Checkbox>
          <Checkbox checked={notify.rewards} onChange={(e) => setNotify({ ...notify, rewards: e.target.checked })}>Staking rewards</Checkbox>
        </CheckboxGroup>
      </Setting>
      <Setting title="Security" text="Applies to this device only.">
        <Switch defaultChecked>Lock after 5 minutes</Switch>
        <Switch>Hide balances on open</Switch>
      </Setting>
      <Setting title="Remove account" text="Funds stay on chain; restore with the recovery phrase.">
        <Button variant="danger" onClick={() => toast("Account removed", { tone: "success" })}>Remove account</Button>
      </Setting>
      <div className="wiki-showcase-row">
        <Button onClick={() => toast("Settings saved", { tone: "success" })}>Save changes</Button>
        <Button variant="ghost">Cancel</Button>
      </div>
    </div>
  )
}

// ---- Mini apps: open apps as tabs, then search and filter the catalog.

const APPS = [
  { id: "cardano-wallet", name: "Cardano Wallet", desc: "Official wallet for managing your assets.", kind: "finance" },
  { id: "cardano-assets", name: "Cardano Assets", desc: "Track and manage your digital assets seamlessly.", kind: "finance" },
  { id: "stake", name: "Stake", desc: "Delegate to a pool and follow your rewards.", kind: "finance" },
  { id: "explorer", name: "Explorer", desc: "Blocks, transactions and addresses on Cardano.", kind: "tools" },
  { id: "graph", name: "Graph", desc: "Robust and scalable APIs for Cardano blockchain developers.", kind: "tools" },
  { id: "wiki", name: "Wiki", desc: "Access comprehensive documentation and resources.", kind: "tools" },
]

export function MiniAppsScreen() {
  const [view, setView] = useState("catalog")
  const [query, setQuery] = useState("")
  const [kind, setKind] = useState(["all"])
  const shown = APPS.filter((app) =>
    (kind[0] === "all" || app.kind === kind[0]) && `${app.name} ${app.desc}`.toLowerCase().includes(query.trim().toLowerCase()),
  )
  return (
    <>
      <Tabs
        aria-label="Views"
        value={view}
        onValueChange={setView}
        items={[
          { value: "dashboard", label: "Dashboard", icon: <Icon d={ICONS.home} /> },
          { value: "catalog", label: "Mini Apps", icon: <Icon d={ICONS.apps} /> },
        ]}
      />
      <div className="wiki-showcase-bar">
        <Chips
          aria-label="Category"
          value={kind}
          onValueChange={(v) => setKind(v.length ? v : ["all"])}
          options={[{ value: "all", label: "All" }, { value: "finance", label: "Finance", count: 3 }, { value: "tools", label: "Tools", count: 3 }]}
        />
        <Input size="sm" aria-label="Search mini apps" placeholder="Search mini apps" value={query} onChange={(e) => setQuery(e.target.value)} prefix={<Icon d={ICONS.search} />} />
      </div>
      {shown.length ? (
        <CardGrid>
          {shown.map((app) => (
            <Card key={app.id} title={app.name} description={app.desc} meta={`xray/${app.id}`} aria-label={`Open ${app.name}`} lead={<Tile>{app.name}</Tile>} onClick={() => toast(`Opened ${app.name}`)} />
          ))}
        </CardGrid>
      ) : (
        <Alert tone="info">No mini apps match “{query}”.</Alert>
      )}
    </>
  )
}
