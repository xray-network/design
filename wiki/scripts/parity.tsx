// React renderings checked against each component's .html reference by check-kit.mjs.
// Each entry should exercise every variant and state the React API can produce.
import type { ReactElement } from "react";
import { Avatar } from "../../kit/components/avatar/avatar";
import { Button, IconButton } from "../../kit/components/button/button";
import { Card, CardGrid, Tile } from "../../kit/components/card/card";
import { Chips } from "../../kit/components/chips/chips";
import { Dialog } from "../../kit/components/dialog/dialog";
import { Field, Input, TextField } from "../../kit/components/field/field";
import { List, ListHeading, ListIcon, ListRow } from "../../kit/components/list/list";
import { Menu } from "../../kit/components/menu/menu";
import { Numeral } from "../../kit/components/numeral/numeral";
import { OptionCards } from "../../kit/components/option/option";
import { Segmented } from "../../kit/components/segmented/segmented";
import { Switch } from "../../kit/components/switch/switch";
import { Tabs } from "../../kit/components/tabs/tabs";
import { Delta, Status, Tag } from "../../kit/components/tag/tag";
import { Toaster } from "../../kit/components/toast/toast";

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
      <Card title="Cardano Wallet" description="Official wallet." meta="xray/cardano-wallet" aria-label="Open Cardano Wallet" lead={<Tile>{icon}</Tile>} menu={<IconButton size="sm" aria-label="Actions">{icon}</IconButton>} />
      <Card title="Wiki" href="#wiki" lead={<Tile strip="var(--x-warning)">W</Tile>} />
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
};
