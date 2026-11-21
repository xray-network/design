// Interactive reference previews with framework-specific usage prompts.

import { Demo } from "./Demo"

import BalanceExample from "./examples/balance"
import StatsGridExample from "./examples/stats-grid"
import SendFormExample from "./examples/send-form"
import TransactionsExample from "./examples/transactions"
import SwapExample from "./examples/swap"

export const BalanceDemo = () => <Demo id="balance" name="Balance" kind="block" loading>{({ loading }) => <BalanceExample loading={loading} />}</Demo>
export const SendFormDemo = () => <Demo id="send-form" name="SendForm" kind="block" loading>{({ loading }) => <SendFormExample loading={loading} />}</Demo>
export const TransactionsDemo = () => <Demo id="transactions" name="Transactions" kind="block" loading>{({ loading }) => <TransactionsExample loading={loading} />}</Demo>
export const StatsGridDemo = () => <Demo id="stats-grid" name="StatsGrid" kind="block" loading>{({ loading }) => <StatsGridExample loading={loading} />}</Demo>
export const SwapDemo = () => <Demo id="swap" name="Swap" kind="block" loading>{({ loading }) => <SwapExample loading={loading} />}</Demo>
