// React renderings checked against each component's .html reference by check-protocol.mjs.
// Each entry should exercise every variant and state the React API can produce.
import type { ReactElement } from "react";
import { Balance } from "../../protocol/blocks/balance/balance";
import { SendForm } from "../../protocol/blocks/send-form/send-form";
import { Transactions } from "../../protocol/blocks/transactions/transactions";
import { Avatar } from "../../protocol/components/avatar/avatar";
import { Button, IconButton } from "../../protocol/components/button/button";
import { Card, CardGrid, Tile } from "../../protocol/components/card/card";
import { Checkbox, CheckboxGroup } from "../../protocol/components/checkbox/checkbox";
import { RadioGroup } from "../../protocol/components/radio/radio";
import { Chips } from "../../protocol/components/chips/chips";
import { Dialog } from "../../protocol/components/modal/modal";
import { Field, Input, TextArea, TextField } from "../../protocol/components/input/input";
import { List, ListHeading, ListIcon, ListRow } from "../../protocol/components/list/list";
import { Menu } from "../../protocol/components/menu/menu";
import { Numeral } from "../../protocol/components/numeral/numeral";
import { CardOption } from "../../protocol/components/card-option/card-option";
import { Pagination } from "../../protocol/components/pagination/pagination";
import { Select } from "../../protocol/components/select/select";
import { Segmented } from "../../protocol/components/segmented/segmented";
import { Switch } from "../../protocol/components/switch/switch";
import { Table } from "../../protocol/components/table/table";
import { TableCompact } from "../../protocol/components/table-compact/table-compact";
import { Code, Kbd, Paragraph, Text, Title } from "../../protocol/components/typography/typography";
import { Popover } from "../../protocol/components/popover/popover";
import { Popconfirm } from "../../protocol/components/popconfirm/popconfirm";
import { MenuNavigation } from "../../protocol/components/menu-navigation/menu-navigation";
import { SelectNative } from "../../protocol/components/select-native/select-native";
import { Spinner } from "../../protocol/components/spinner/spinner";
import { Skeleton, SkeletonText } from "../../protocol/components/skeleton/skeleton";
import { InputGroup } from "../../protocol/components/input-group/input-group";
import { Collapse } from "../../protocol/components/collapse/collapse";
import { Empty } from "../../protocol/components/empty/empty";
import { Result } from "../../protocol/components/result/result";
import { BorderBeam } from "../../protocol/components/border-beam/border-beam";
import { Tabs } from "../../protocol/components/tabs/tabs";
import { Delta, Status, Tag } from "../../protocol/components/tag/tag";
import { Toaster } from "../../protocol/components/toast/toast";
import { Tooltip } from "../../protocol/components/tooltip/tooltip";
import { Alert } from "../../protocol/components/alert/alert";
import { Messages } from "../../protocol/components/message/message";
import { Stats } from "../../protocol/components/stats/stats";
import { StatsGrid } from "../../protocol/blocks/stats-grid/stats-grid";
import { Icon } from "../../protocol/components/icon/icon";
import { Progress, Meter } from "../../protocol/components/progress/progress";
import { Slider } from "../../protocol/components/slider/slider";
import { Steps } from "../../protocol/components/steps/steps";
import { Timeline } from "../../protocol/components/timeline/timeline";
import { InputAmount } from "../../protocol/components/input-amount/input-amount";
import { Combobox } from "../../protocol/components/combobox/combobox";
import { Command } from "../../protocol/components/command/command";
import { Copy } from "../../protocol/components/copy/copy";
import { MenuList } from "../../protocol/components/menu-list/menu-list";
import { Swap } from "../../protocol/blocks/swap/swap";
import { bell, envelope } from "../../protocol/components/icon/icons.js";
import { github } from "../../protocol/components/icon/socials.js";

const icon = <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4.5v15" /></svg>;
const noop = () => {};

export const examples: Record<string, ReactElement> = {
  button: (
    <>
      <Button>Send</Button>
      <Button variant="ghost">Cancel</Button>
      <Button variant="ghost" size="sm">Details</Button>
      <Button variant="chip">Max</Button>
      <Button variant="danger">Remove</Button>
      <Button size="lg" fullWidth>Confirm</Button>
      <Button shape="round">Get started</Button>
      <Button loading>Sending</Button>
      <Button disabled>Send</Button>
      <IconButton aria-label="Settings">{icon}</IconButton>
      <IconButton aria-label="Close" size="sm">{icon}</IconButton>
      <IconButton aria-label="More" shape="round">{icon}</IconButton>
      <IconButton aria-label="Copy" size="xs">{icon}</IconButton>
    </>
  ),
  segmented: (
    <>
      <Segmented aria-label="Chart" options={[{ value: "balance", label: "Balance", content: "Balance" }, { value: "rewards", label: "Rewards", content: "Rewards" }]} />
      <Segmented aria-label="Period" options={[{ value: "24h", label: "24h" }, { value: "7d", label: "7 days" }]} />
      <Segmented aria-label="Assets" size="sm" fullWidth options={[{ value: "t", label: "Tokens", count: 6 }, { value: "n", label: "NFTs", disabled: true }]} />
    </>
  ),
  switch: (
    <>
      <Switch defaultChecked>Hide balances</Switch>
      <Switch labelPosition="start">Lock</Switch>
      <Switch size="sm" disabled>Testnet</Switch>
    </>
  ),
  input: (
    <>
      <TextField label="To" hint="Cardano address" />
      <TextField label="Amount" size="lg" suffix="ADA" />
      <TextField label="Note" error="Too long" />
      <Input size="sm" aria-label="Search" prefix={icon} />
      <Field label="Custom">{(p) => <Input {...p} />}</Field>
      <Field label="Message">{(p) => <TextArea {...p} />}</Field>
    </>
  ),
  modal: (
    <>
      <Dialog open={false} onOpenChange={noop} title="Remove account?" description="Account 2 will be removed." size="sm" footer={<Button variant="ghost">Cancel</Button>} />
      <Dialog open={false} onOpenChange={noop} title="Search" placement="top" size="lg" forceMount>Body</Dialog>
      <Dialog open={false} onOpenChange={noop} title="Filters" placement="end" footer={<Button>Apply</Button>} />
      <Dialog open={false} onOpenChange={noop} title="Menu" placement="start" />
    </>
  ),
  menu: (
    <Menu
      aria-label="Actions"
      trigger={<IconButton aria-label="Actions">{icon}</IconButton>}
      items={[{ heading: "Wallet" }, { label: "Reload", icon, note: "R" }, { label: "Soon", disabled: true }, "separator", { label: "Close", tone: "danger" }]}
    />
  ),
  toast: <><Toaster /><Toaster position="top" /></>,
  tabs: (
    <>
    <Tabs aria-label="Account" value="assets" onValueChange={noop} items={[{ value: "assets", label: "Assets", content: "12,480 ADA" }, { value: "activity", label: "Activity", content: "38" }]} />
    <Tabs
      aria-label="Views"
      value="dashboard"
      onValueChange={noop}
      items={[
        { value: "dashboard", label: "Dashboard", icon },
        { value: "graph", label: "Graph", icon: <span className="x-tab-placeholder" aria-hidden="true" />, separated: true, actions: [{ label: "Close Graph", icon, onClick: noop }] },
      ]}
      trailing={<IconButton aria-label="Open a mini app">{icon}</IconButton>}
    />
    </>
  ),
  card: (
    <CardGrid>
      <Card title="Cardano Wallet" description="Official wallet." meta="xray/cardano-wallet" aria-label="Open Payments" lead={<Tile>Cardano</Tile>} menu={<IconButton size="sm" aria-label="Actions">{icon}</IconButton>} />
      <Card title="Wiki" href="#wiki" lead={<Tile>Wiki</Tile>} />
      <Tile size="lg">G</Tile><Tile size="md">G</Tile><Tile size="xs">G</Tile>
    </CardGrid>
  ),
  numeral: (
    <>
      <Numeral value="12,480.25" ticker="USD" />
      <Numeral value="12,480.25" ticker="USD" size="hero" />
      <Numeral value="0.04215000" ticker="BTC" size="sm" />
      <Numeral value="5,000.000000" ticker="NIGHT" masked />
    </>
  ),
  avatar: (
    <>
      <Avatar seed="addr1q…lkgc86" palette="blue" />
      <Avatar seed="mn_addr1…t7n2yd" palette="ember" badge={<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /></svg>} badgeLabel="Midnight" />
      <Avatar seed="a" size="sm" /><Avatar seed="b" size="lg" />
    </>
  ),
  chips: (
    <>
      <Chips aria-label="Type" defaultValue={["all"]} options={[{ value: "all", label: "All" }, { value: "sent", label: "Sent", count: 3 }, { value: "x", label: "Tokens", disabled: true }]} />
      <Chips aria-label="Chains" multiple options={[{ value: "cardano", label: "Cardano" }]} />
    </>
  ),
  "card-option": (
    <CardOption aria-label="Payout speed" defaultValue="standard" options={[{ value: "slow", title: "Standard", description: "2–3 business days", detail: "Free" }, { value: "standard", title: "Same day", description: "Before 6 pm", detail: "$1.00" }]} />
  ),
  list: (
    <List aria-label="Recent activity">
      <ListHeading>Today</ListHeading>
      <ListRow title="Received" sub="14:02" end="+$250.00" endSub="$175.00" tone="positive" lead={<ListIcon tone="positive">{icon}</ListIcon>} />
      <ListRow title="Sent" href="#tx" end="−$42.17" lead={<ListIcon>{icon}</ListIcon>} />
      <ListRow title="Snek" onClick={noop} lead={<span className="x-list-token" aria-hidden="true">S</span>} />
    </List>
  ),
  tag: (
    <>
      <Tag>Pro plan</Tag><Tag status="success">Live</Tag><Tag status="warning">Syncing</Tag><Tag size="sm">Read-only</Tag>
      <Tag variant="soft">Draft</Tag><Tag variant="soft" color="accent">Pro</Tag><Tag variant="soft" color="success">Paid</Tag><Tag variant="soft" color="warning">Due</Tag><Tag variant="soft" color="danger" size="sm">Overdue</Tag>
      <Tag variant="solid">New</Tag><Tag variant="solid" color="accent">Pro</Tag><Tag variant="solid" color="success" status="success">Live</Tag><Tag variant="solid" color="warning">Beta</Tag><Tag variant="solid" color="danger" size="sm">Failed</Tag>
      <Status>Paid</Status><Status dot="end">Confirmed</Status><Status tone="danger">Offline</Status><Status tone="neutral">Unpaid</Status>
      <Delta value={2.4} /><Delta value={-4.1} /><Delta value={0} />
    </>
  ),
  select: (
    <>
      <Field label="Network">{(p) => <Select {...p} name="network" defaultValue="mainnet" options={[{ value: "mainnet", label: "Mainnet", note: "Block 1" }, { value: "preview", label: "Preview", disabled: true }]} />}</Field>
      <Select aria-label="Sort by" size="sm" options={[{ value: "value", label: "Value" }]} />
    </>
  ),
  checkbox: (
    <>
      <CheckboxGroup legend="Notifications">
        <Checkbox defaultChecked description="When funds arrive">Incoming funds</Checkbox>
        <Checkbox disabled>Updates</Checkbox>
      </CheckboxGroup>
    </>
  ),
  "table-compact": (
    <>
      <TableCompact
        caption="Endpoints"
        title="Endpoints"
        description="Last 30 days"
        rowKey={(r: { path: string; requests: number }) => r.path}
        rowHref={(r) => `#${r.path}`}
        defaultSort={{ key: "requests", direction: "descending" }}
        columns={[{ key: "path", header: "Endpoint" }, { key: "requests", header: "Requests", align: "end", sortValue: (r) => r.requests }, { key: "c", header: "C", align: "center" }]}
        rows={[{ path: "/accounts", requests: 1 }]}
        footer={<Pagination page={1} pageCount={4} total={11} onPageChange={noop} />}
      />
      <TableCompact caption="Delegations" rowKey={() => "x"} columns={[{ key: "pool", header: "Pool" }]} rows={[]} />
      <TableCompact caption="Loading" loading loadingRows={2} rowKey={() => "x"} columns={[{ key: "a", header: "A" }, { key: "b", header: "B", align: "end" }, { key: "c", header: "C", align: "center" }]} rows={[]} />
    </>
  ),
  table: (
    <>
      <Table
        caption="Transactions"
        rowKey={(r: { type: string; amount: number }) => r.type + r.amount}
        defaultSort={{ key: "amount", direction: "descending" }}
        pageSize={2}
        columns={[{ key: "type", header: "Type" }, { key: "amount", header: "Amount", align: "end", sortValue: (r) => r.amount }, { key: "s", header: "Status", align: "center" }]}
        rows={[{ type: "Received", amount: 250 }, { type: "Sent", amount: -42 }, { type: "Reward", amount: 12 }]}
      />
      <Table caption="Delegations" rowKey={() => "x"} columns={[{ key: "pool", header: "Pool" }]} rows={[]} />
      <Table caption="Loading" loading loadingRows={2} rowKey={() => "x"} columns={[{ key: "a", header: "A" }, { key: "b", header: "B", align: "end" }, { key: "c", header: "C", align: "center" }]} rows={[]} />
    </>
  ),
  typography: (
    <>
      <Title level={1}>Stake</Title>
      <Title level={2}>Delegation</Title>
      <Title level={3}>Rewards</Title>
      <Title level={4} as="h3">Epoch</Title>
      <Text>Body</Text>
      <Text size="sm" tone="secondary">Updated</Text>
      <Text as="span" size="xs" tone="muted">Fees</Text>
      <Text as="span" tone="success" weight="label">Delegated</Text>
      <Text as="span" tone="danger">Retired</Text>
      <Text as="span" weight="title">$12,480.25</Text>
      <Code>acct_1</Code>
      <Paragraph>Body</Paragraph>
      <Paragraph size="lg">Large</Paragraph>
      <Paragraph size="lead">Lead</Paragraph>
      <Paragraph size="sm">Fine</Paragraph>
      <Kbd>K</Kbd>
    </>
  ),
  popover: (
    <>
      <Popover trigger={<Button variant="ghost">Fee</Button>} title="Fee">$0.59</Popover>
      <Popover trigger={<Button variant="ghost">B</Button>} aria-label="B" placement="bottom">B</Popover>
      <Popover trigger={<Button variant="ghost">L</Button>} aria-label="L" placement="left">L</Popover>
      <Popover trigger={<Button variant="ghost">R</Button>} aria-label="R" placement="right">R</Popover>
    </>
  ),
  popconfirm: (
    <>
      <Popconfirm trigger={<Button variant="ghost">Remove</Button>} title="Remove?" description="You can add it again." confirmLabel="Remove" tone="danger" onConfirm={noop} />
      <Popconfirm trigger={<Button variant="ghost">Clear</Button>} title="Clear?" confirmLabel="Clear" placement="bottom" onConfirm={noop} />
    </>
  ),
  "menu-navigation": (
    <MenuNavigation
      aria-label="Main"
      trigger="hover"
      items={[
        { label: "Products", columns: 2, links: [{ title: "Wallet", description: "Hold assets", href: "/wallet", current: true }, { title: "Graph", href: "/graph" }] },
        { label: "Developers", links: [{ title: "Docs", description: "Guides", href: "/docs" }] },
        { label: "Pricing", href: "/pricing", current: true },
      ]}
    />
  ),
  "select-native": (
    <>
      <SelectNative aria-label="Network" options={[{ value: "m", label: "Mainnet" }, { value: "p", label: "Preview", disabled: true }]} />
      <SelectNative size="sm" aria-label="Sort"><option>Value</option></SelectNative>
      <SelectNative size="lg" aria-label="Currency" aria-invalid><option>ADA</option></SelectNative>
    </>
  ),
  spinner: (
    <>
      <Spinner label="Loading" />
      <Spinner size="sm" label="Loading" />
      <Spinner size="lg" tone="muted" />
    </>
  ),
  "input-group": (
    <>
      <InputGroup aria-label="Website" prefix="https://" suffix=".io"><Input aria-label="Domain" /></InputGroup>
      <InputGroup aria-label="Amount" size="lg"><Input aria-label="Amount" /><Button>Max</Button></InputGroup>
      <InputGroup size="sm"><Input aria-label="Address" /><Button variant="ghost">Copy</Button></InputGroup>
      <InputGroup orientation="vertical"><Button variant="ghost">CSV</Button><Button variant="ghost">JSON</Button></InputGroup>
    </>
  ),
  collapse: (
    <>
      <Collapse accordion defaultValue={["fees"]} items={[{ value: "fees", title: "Fees", content: "Paid to the network." }, { value: "rewards", title: "Rewards", extra: "5 days", content: "Two epochs later." }]} />
      <Collapse variant="ghost" forceMount items={[{ value: "advanced", title: "Advanced", content: "TTL" }]} />
    </>
  ),
  empty: (
    <>
      <Empty icon={icon} title="No transactions yet" description="Receive ADA." actions={<Button>Receive</Button>} />
      <Empty size="sm" icon={icon} title="No results" />
    </>
  ),
  result: (
    <>
      <Result status="success" title="Account added" description="Ready." actions={<Button shape="round">Close</Button>} />
      <Result status="error" title="Failed" />
      <Result status="info" size="sm" title="Nothing to claim" />
      <Result status="warning" size="sm" title="Saturated" />
      <Result status="loading" title="Processing" />
    </>
  ),
  "border-beam": (
    <>
      <BorderBeam />
      <BorderBeam reverse color="var(--x-success)" />
    </>
  ),
  pagination: (
    <>
      <Pagination page={4} pageCount={16} total={312} onPageChange={noop} />
      <Pagination page={7} hasNext onPageChange={noop} aria-label="Events pages" />
    </>
  ),
  tooltip: (
    <>
      <Tooltip content="Copy address"><IconButton aria-label="Copy address">{icon}</IconButton></Tooltip>
      <Tooltip content="Ends in 4d" kind="description"><span tabIndex={0}>Trial</span></Tooltip>
      <Tooltip content="B" placement="bottom"><Button>B</Button></Tooltip>
      <Tooltip content="L" placement="left"><Button>L</Button></Tooltip>
      <Tooltip content="R" placement="right"><Button>R</Button></Tooltip>
    </>
  ),
  progress: (
    <>
      <Progress value={64} label="Uploading statement.pdf" />
      <Progress value={100} size="sm" tone="success" aria-label="Sync" valueText={false} />
      <Meter value={4.1} max={5} warning={4} danger={4.8} label="Storage" valueText="4.1 of 5 GB" aria-valuetext="4.1 of 5 GB" />
      <Meter value={1020} max={1000} danger={1000} aria-label="Daily limit" valueText={false} />
      <Meter value={3} max={10} tone="neutral" aria-label="Seats" valueText={false} />
      <Meter value={0} max={5} label="Storage" loading />
    </>
  ),
  slider: (
    <>
      <Slider label="Amount to stake" defaultValue={40} step={5} format={(v) => `${v}%`} marks={["0%", "50%", "100%"]} />
      <Slider aria-label="Volume" size="sm" max={10} defaultValue={7} />
      <Slider aria-label="Fee level (unavailable)" defaultValue={30} disabled />
    </>
  ),
  steps: (
    <>
      <Steps aria-label="Checkout progress" current={1} onStepClick={noop} steps={[{ title: "Basket" }, { title: "Delivery", description: "Address and date" }, { title: "Payment" }]} />
      <Steps aria-label="Import progress" current={1} steps={[{ title: "Choose files" }, { title: "Upload", state: "loading", description: "Uploading 12 of 38" }, { title: "Done" }]} />
      <Steps aria-label="Verification" orientation="vertical" current={1} steps={[{ title: "Email" }, { title: "Identity document", state: "error", description: "The photo is blurred." }, { title: "Address" }]} />
    </>
  ),
  timeline: (
    <Timeline
      events={[
        { title: "Submitted", time: "14:02", dateTime: "2026-11-20T14:02" },
        { title: "Included in block", time: "14:03", tone: "accent", text: "Network fee 0.00042 ETH" },
        { title: "Confirmed", time: "14:05", tone: "success" },
        { title: "Sign-in blocked", tone: "danger" },
        { title: "Password reset", tone: "warning" },
        { title: "Finalized", time: "About 12 min", pending: true },
      ]}
    />
  ),
  "input-amount": (
    <>
      <InputAmount label="You pay" defaultValue="1.5" currency="ETH" currencyMark={<svg viewBox="0 0 24 24" />} onCurrencyClick={noop} currencyLabel="Change currency, ETH" balance="Balance 2.41" max="2.41" fiat="≈ $4,812.60" />
      <InputAmount label="You receive" size="sm" value="4802.11" readOnly currency="USDC" fiat="≈ $4,802.11" />
      <InputAmount label="Stake" defaultValue="3" currency="ETH" balance="Balance 2.41" error="More than your balance of 2.41 ETH" />
      <InputAmount label="You pay" currency="USD" balance="Balance" fiat="≈" loading />
    </>
  ),
  combobox: (
    <>
      <Combobox aria-label="Token" defaultValue="eth" name="token" options={[{ value: "eth", label: "Ether", note: "ETH" }, { value: "dai", label: "Dai", note: "Paused", disabled: true }]} />
      <Combobox aria-label="Country" size="sm" options={[{ value: "pt", label: "Portugal" }]} />
      <Combobox multiple aria-label="Networks" name="networks" defaultValue={["eth"]} options={[{ value: "eth", label: "Ethereum" }, { value: "base", label: "Base" }]} />
    </>
  ),
  command: (
    <Command
      onSelect={noop}
      onClose={noop}
      groups={[
        { label: "Mini Apps", items: [{ value: "open-payments", label: "Open Payments", description: "xray/payments", lead: <Tile size="md">P</Tile>, keywords: "pay" }] },
        { label: "Actions", items: [{ value: "copy", label: "Copy address", description: "addr1q", icon }, { value: "hide", label: "Hide balances", icon, shortcut: ["⌘", "H"] }, { value: "lock", label: "Lock App", icon, disabled: true }] },
      ]}
    />
  ),
  "menu-list": (
    <MenuList
      aria-label="Settings"
      groups={[
        { items: [{ href: "/general", label: "General", icon }, { href: "/display", label: "Display", icon, current: true }, { href: "/security", label: "Security", icon, value: "On", chevron: true }] },
        { heading: "Privacy", items: [{ label: "Analytics", value: "Off", onClick: noop }, { label: "Location", disabled: true }], note: "Analytics never include balances." },
      ]}
    />
  ),
  copy: (
    <>
      <Copy value="0x52908400098527886E0F7030069857D2E4169EE7" label="address" />
      <Copy value="https://xray.app/invite/7Q2K-ML4P-90ZD" label="invite link" font="sans" tail={0} />
      <Copy value="bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" label="address" variant="block" />
    </>
  ),
  swap: (
    <Swap
      pay={{ value: "1.5", onValueChange: noop, currency: "ETH", onCurrencyClick: noop, currencyLabel: "Change currency, ETH", balance: "Balance 2.41", max: "2.41", fiat: "≈ $4,812.60" }}
      receive={{ value: "4802.11", currency: "USDC", onCurrencyClick: noop, currencyLabel: "Change currency, USDC", balance: "Balance 120.00", fiat: "≈ $4,802.11" }}
      onFlip={noop}
      details={[{ term: "Rate", value: "1 ETH = 3,201.41 USDC" }]}
      onReview={noop}
      quoting
    />
  ),
  // Blocks
  balance: (
    <Balance value="12,480.25" ticker="USD" fiat="≈ €11,442.10" change={2.4} actions={<><Button>Send</Button><Button variant="ghost">Receive</Button></>} />
  ),
  "send-form": (
    <SendForm available={12480.25} ticker="USD" fees={[{ value: "slow", title: "Standard", description: "2–3 business days", amount: 0 }]} onReview={noop} />
  ),
  transactions: (
    <Transactions
      pageSize={1}
      items={[
        { id: "1", kind: "received", day: "Today", title: "Received", sub: "14:02", amount: "+$250.00", fiat: "$175.00" },
        { id: "2", kind: "sent", day: "Today", title: "Sent", amount: "−$42.17" },
      ]}
    />
  ),
  radio: (
    <>
      <RadioGroup legend="Currency" defaultValue="usd" options={[{ value: "usd", label: "US dollar" }, { value: "ada", label: "ADA", description: "Native", disabled: true }]} />
      <RadioGroup legend="Theme" direction="row" options={[{ value: "light", label: "Light" }]} />
    </>
  ),
  alert: (
    <>
      <Alert tone="info" title="Epoch ends" dismissible>Rewards are paid later.</Alert>
      <Alert tone="success">Delegated.</Alert>
      <Alert tone="warning" title="Pool saturated" actions={<Button variant="chip">Change pool</Button>} onDismiss={noop}>Rewards are reduced.</Alert>
      <Alert tone="danger" title="Node unreachable">Retrying.</Alert>
    </>
  ),
  message: <><Messages /><Messages position="bottom" /></>,
  stats: (
    <>
      <Stats columns={3} items={[{ label: "Received", value: "+337.90", tone: "positive", sub: "USD, last 14 days" }]} />
      <Stats items={[{ label: "Requests", value: "1.28M", delta: { value: "6.2%", direction: "up", tone: "positive" } }]} />
    </>
  ),
  icon: (
    <>
      <Icon icon={bell} />
      <Icon icon={envelope} size="sm" />
      <Icon icon={envelope} size="md" />
      <Icon icon={envelope} size="lg" />
      <Icon icon={github} label="GitHub" />
    </>
  ),
  "stats-grid": (
    <StatsGrid
      columns={3}
      items={[
        { label: "Revenue", value: "$1", sub: "Last 30 days" },
        { label: "Requests", value: "4", split: [{ label: "Live", value: "4", share: 98 }, { label: "Test", value: "0", share: 2 }] },
        { label: "Seats", value: "18", split: [{ label: "Used", value: "16", share: 80, tone: "warning" }, { label: "Invited", value: "2", share: 10, tone: "neutral" }, { label: "Failed", value: "0", share: 0, tone: "danger" }] },
      ]}
    />
  ),
  skeleton: (
    <>
      <Skeleton />
      <Skeleton shape="text" width="40%" />
      <Skeleton shape="circle" width={40} />
      <Skeleton height={120} />
      <SkeletonText lines={3} />
    </>
  ),
};
