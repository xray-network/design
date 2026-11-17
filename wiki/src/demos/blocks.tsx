// One live demo per block: the React example (examples/<id>.tsx, also shown as React source) and the
// block's HTML reference from the protocol (shown as HTML source).

import { Demo } from "./Demo"


import OptionExample from "./examples/option"
import OptionSource from "./examples/option.tsx?raw"
import OptionHtml from "@protocol/blocks/option/option.html?raw"

import BalanceExample from "./examples/balance"
import BalanceSource from "./examples/balance.tsx?raw"
import BalanceHtml from "@protocol/blocks/balance/balance.html?raw"

import StatsExample from "./examples/stats"
import StatsSource from "./examples/stats.tsx?raw"
import StatsHtml from "@protocol/blocks/stats/stats.html?raw"

import SendFormExample from "./examples/send-form"
import SendFormSource from "./examples/send-form.tsx?raw"
import SendFormHtml from "@protocol/blocks/send-form/send-form.html?raw"

import TransactionsExample from "./examples/transactions"
import TransactionsSource from "./examples/transactions.tsx?raw"
import TransactionsHtml from "@protocol/blocks/transactions/transactions.html?raw"

import AccountSwitcherExample from "./examples/account-switcher"
import AccountSwitcherSource from "./examples/account-switcher.tsx?raw"
import AccountSwitcherHtml from "@protocol/blocks/account-switcher/account-switcher.html?raw"


export const OptionDemo = () => <Demo html={OptionHtml} react={<OptionExample />} source={OptionSource} />
export const BalanceDemo = () => <Demo html={BalanceHtml} react={<BalanceExample />} source={BalanceSource} />
export const StatsDemo = () => <Demo html={StatsHtml} react={<StatsExample />} source={StatsSource} />
export const SendFormDemo = () => <Demo html={SendFormHtml} react={<SendFormExample />} source={SendFormSource} />
export const TransactionsDemo = () => <Demo html={TransactionsHtml} react={<TransactionsExample />} source={TransactionsSource} />
export const AccountSwitcherDemo = () => <Demo html={AccountSwitcherHtml} react={<AccountSwitcherExample />} source={AccountSwitcherSource} />
