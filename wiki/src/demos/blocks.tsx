// Interactive reference previews with framework-specific usage prompts.

import { Demo } from "./Demo"

import OptionExample from "./examples/option"
import BalanceExample from "./examples/balance"
import StatsExample from "./examples/stats"
import StatsGridExample from "./examples/stats-grid"
import SendFormExample from "./examples/send-form"
import TransactionsExample from "./examples/transactions"
import AccountSwitcherExample from "./examples/account-switcher"

export const OptionDemo = () => <Demo id="option" name="Option cards" kind="block" loading>{({ loading }) => <OptionExample loading={loading} />}</Demo>
export const BalanceDemo = () => <Demo id="balance" name="Balance" kind="block" loading>{({ loading }) => <BalanceExample loading={loading} />}</Demo>
export const StatsDemo = () => <Demo id="stats" name="Stats" kind="block" loading>{({ loading }) => <StatsExample loading={loading} />}</Demo>
export const SendFormDemo = () => <Demo id="send-form" name="Send form" kind="block" loading>{({ loading }) => <SendFormExample loading={loading} />}</Demo>
export const TransactionsDemo = () => <Demo id="transactions" name="Transactions" kind="block" loading>{({ loading }) => <TransactionsExample loading={loading} />}</Demo>
export const AccountSwitcherDemo = () => <Demo id="account-switcher" name="Account switcher" kind="block" loading>{({ loading }) => <AccountSwitcherExample loading={loading} />}</Demo>
export const StatsGridDemo = () => <Demo id="stats-grid" name="Stats grid" kind="block" loading>{({ loading }) => <StatsGridExample loading={loading} />}</Demo>
