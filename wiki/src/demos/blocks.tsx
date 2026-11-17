// Interactive reference previews with framework-specific usage prompts.

import { Demo } from "./Demo"

import OptionExample from "./examples/option"
import BalanceExample from "./examples/balance"
import StatsExample from "./examples/stats"
import SendFormExample from "./examples/send-form"
import TransactionsExample from "./examples/transactions"
import AccountSwitcherExample from "./examples/account-switcher"

export const OptionDemo = () => <Demo id="option" name="Option cards" kind="block"><OptionExample /></Demo>
export const BalanceDemo = () => <Demo id="balance" name="Balance" kind="block"><BalanceExample /></Demo>
export const StatsDemo = () => <Demo id="stats" name="Stats" kind="block"><StatsExample /></Demo>
export const SendFormDemo = () => <Demo id="send-form" name="Send form" kind="block"><SendFormExample /></Demo>
export const TransactionsDemo = () => <Demo id="transactions" name="Transactions" kind="block"><TransactionsExample /></Demo>
export const AccountSwitcherDemo = () => <Demo id="account-switcher" name="Account switcher" kind="block"><AccountSwitcherExample /></Demo>
