// React renderings checked against each component's .html reference by check-protocol.mjs.
// Each entry should exercise every variant and state the React API can produce.
import type { ReactElement } from "react";
import { AccountSwitcher } from "../../protocol/blocks/account-switcher/account-switcher";
import { Balance } from "../../protocol/blocks/balance/balance";
import { SendForm } from "../../protocol/blocks/send-form/send-form";
import { Transactions } from "../../protocol/blocks/transactions/transactions";
import { Avatar } from "../../protocol/components/avatar/avatar";
import { Button, IconButton } from "../../protocol/components/button/button";
import { Card, CardGrid, Tile } from "../../protocol/blocks/card/card";
import { Checkbox, CheckboxGroup } from "../../protocol/components/checkbox/checkbox";
import { RadioGroup } from "../../protocol/components/radio/radio";
import { Chips } from "../../protocol/components/chips/chips";
import { Dialog } from "../../protocol/components/dialog/dialog";
import { Field, Input, TextArea, TextField } from "../../protocol/components/field/field";
import { List, ListHeading, ListIcon, ListRow } from "../../protocol/blocks/list/list";
import { Menu } from "../../protocol/components/menu/menu";
import { Numeral } from "../../protocol/components/numeral/numeral";
import { OptionCards } from "../../protocol/blocks/option/option";
import { Pagination } from "../../protocol/components/pagination/pagination";
import { Select } from "../../protocol/components/select/select";
import { Segmented } from "../../protocol/components/segmented/segmented";
import { Switch } from "../../protocol/components/switch/switch";
import { Table } from "../../protocol/components/table/table";
import { Tabs } from "../../protocol/components/tabs/tabs";
import { Delta, Status, Tag } from "../../protocol/components/tag/tag";
import { Toaster } from "../../protocol/components/toast/toast";
import { Tooltip } from "../../protocol/components/tooltip/tooltip";
import { Alert } from "../../protocol/components/alert/alert";
import { Messages } from "../../protocol/components/message/message";
import { Stats } from "../../protocol/blocks/stats/stats";

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
  field: (
    <>
      <TextField label="To" hint="Cardano address" />
      <TextField label="Amount" size="lg" suffix="ADA" />
      <TextField label="Note" error="Too long" />
      <Input size="sm" aria-label="Search" prefix={icon} />
      <Field label="Custom">{(p) => <Input {...p} />}</Field>
      <Field label="Message">{(p) => <TextArea {...p} />}</Field>
    </>
  ),
  dialog: (
    <Dialog open={false} onOpenChange={noop} title="Remove account?" description="Account 2 will be removed." size="sm" footer={<Button variant="ghost">Cancel</Button>} />
  ),
  menu: (
    <Menu
      aria-label="Actions"
      trigger={<IconButton aria-label="Actions">{icon}</IconButton>}
      items={[{ heading: "Wallet" }, { label: "Reload", icon, note: "R" }, { label: "Soon", disabled: true }, "separator", { label: "Close", tone: "danger" }]}
    />
  ),
  toast: <Toaster />,
  tabs: (
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
  ),
  card: (
    <CardGrid>
      <Card title="Cardano Wallet" description="Official wallet." meta="xray/cardano-wallet" aria-label="Open Cardano Wallet" lead={<Tile>Cardano</Tile>} menu={<IconButton size="sm" aria-label="Actions">{icon}</IconButton>} />
      <Card title="Wiki" href="#wiki" lead={<Tile>Wiki</Tile>} />
      <Tile size="lg">G</Tile><Tile size="md">G</Tile><Tile size="xs">G</Tile>
    </CardGrid>
  ),
  numeral: (
    <>
      <Numeral value="12,480.254221" ticker="ADA" />
      <Numeral value="12,480.254221" ticker="ADA" size="hero" />
      <Numeral value="0.04215000" ticker="BTC" size="sm" />
      <Numeral value="5,000.000000" ticker="NIGHT" masked />
    </>
  ),
  avatar: (
    <>
      <Avatar seed="addr1q…lkgc86" palette="btc" />
      <Avatar seed="mn_addr1…t7n2yd" palette="night" badge={<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /></svg>} badgeLabel="Midnight" />
      <Avatar seed="a" size="sm" /><Avatar seed="b" size="lg" />
    </>
  ),
  chips: (
    <>
      <Chips aria-label="Type" defaultValue={["all"]} options={[{ value: "all", label: "All" }, { value: "sent", label: "Sent", count: 3 }, { value: "x", label: "Tokens", disabled: true }]} />
      <Chips aria-label="Chains" multiple options={[{ value: "cardano", label: "Cardano" }]} />
    </>
  ),
  option: (
    <OptionCards aria-label="Network fee" defaultValue="standard" options={[{ value: "slow", title: "Slow", description: "About 5 min", detail: "0.12 ADA" }, { value: "standard", title: "Standard", description: "About 20 s", detail: "0.17 ADA" }]} />
  ),
  list: (
    <List aria-label="Recent activity">
      <ListHeading>Today</ListHeading>
      <ListRow title="Received" sub="14:02" end="+250.00 ADA" endSub="$175.00" tone="positive" lead={<ListIcon tone="positive">{icon}</ListIcon>} />
      <ListRow title="Sent" href="#tx" end="−42.17 ADA" lead={<ListIcon>{icon}</ListIcon>} />
      <ListRow title="Snek" onClick={noop} lead={<span className="x-list-token" aria-hidden="true">S</span>} />
    </List>
  ),
  tag: (
    <>
      <Tag>Epoch 667</Tag><Tag status="success">Mainnet</Tag><Tag status="warning">Syncing</Tag><Tag size="sm">Read-only</Tag>
      <Status>Delegated</Status><Status tone="danger">Offline</Status><Status tone="neutral">Not delegated</Status>
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
  table: (
    <>
      <Table
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
      <Table caption="Delegations" rowKey={() => "x"} columns={[{ key: "pool", header: "Pool" }]} rows={[]} />
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
      <Tooltip content="Ends in 4d" kind="description"><span tabIndex={0}>Epoch 667</span></Tooltip>
    </>
  ),
  // Blocks
  balance: (
    <Balance value="12,480.254221" ticker="ADA" fiat="$8,736.18 USD" change={2.4} actions={<><Button>Send</Button><Button variant="ghost">Receive</Button></>} />
  ),
  "send-form": (
    <SendForm available={12480.25} ticker="ADA" fees={[{ value: "slow", title: "Slow", description: "About 5 min", amount: 0.12 }]} onReview={noop} />
  ),
  transactions: (
    <Transactions
      pageSize={1}
      items={[
        { id: "1", kind: "received", day: "Today", title: "Received", sub: "14:02", amount: "+250.00 ADA", fiat: "$175.00" },
        { id: "2", kind: "sent", day: "Today", title: "Sent", amount: "−42.17 ADA" },
      ]}
    />
  ),
  "account-switcher": (
    <AccountSwitcher value="a" onValueChange={noop} onAdd={noop} accounts={[{ id: "a", label: "…lkgc86", address: "addr1q…lkgc86", palette: "btc", balance: "12,480.25 ADA" }]} />
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
  message: <Messages />,
  stats: (
    <>
      <Stats columns={3} items={[{ label: "Received", value: "+337.90", tone: "positive", sub: "ADA, last 14 days" }]} />
      <Stats items={[{ label: "Requests", value: "1.28M", delta: { value: "6.2%", direction: "up", tone: "positive" } }]} />
    </>
  ),
};
