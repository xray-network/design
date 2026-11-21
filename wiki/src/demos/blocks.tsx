// Interactive reference previews with framework-specific usage prompts.

import { Demo } from "./Demo"

import BalanceExample from "./examples/balance"
import StatsGridExample from "./examples/stats-grid"
import SendFormExample from "./examples/send-form"
import TransactionsExample from "./examples/transactions"
import SwapExample from "./examples/swap"
import ProfileExample from "./examples/profile"
import PostExample from "./examples/post"
import ChatExample from "./examples/chat"
import SignInExample from "./examples/sign-in"
import ChatListExample from "./examples/chat-list"
import ComposerExample from "./examples/composer"
import MediaGridExample from "./examples/media-grid"
import PageHeaderExample from "./examples/page-header"
import StoriesExample from "./examples/stories"
import TabBarExample from "./examples/tab-bar"
import TopBarExample from "./examples/top-bar"
import ApiKeysExample from "./examples/api-keys"
import ChartCardExample from "./examples/chart-card"
import MarketListExample from "./examples/market-list"
import RecordDetailExample from "./examples/record-detail"
import SettingsExample from "./examples/settings"
import TableViewExample from "./examples/table-view"
import UsageMetersExample from "./examples/usage-meters"
import AssetListExample from "./examples/asset-list"
import BoardExample from "./examples/board"
import CheckoutExample from "./examples/checkout"
import CommentsExample from "./examples/comments"
import InboxExample from "./examples/inbox"
import OrderBookExample from "./examples/order-book"
import PlayerExample from "./examples/player"

export const BalanceDemo = () => <Demo id="balance" name="Balance" kind="block" loading>{({ loading }) => <BalanceExample loading={loading} />}</Demo>
export const SendFormDemo = () => <Demo id="send-form" name="SendForm" kind="block" loading>{({ loading }) => <SendFormExample loading={loading} />}</Demo>
export const TransactionsDemo = () => <Demo id="transactions" name="Transactions" kind="block" loading>{({ loading }) => <TransactionsExample loading={loading} />}</Demo>
export const StatsGridDemo = () => <Demo id="stats-grid" name="StatsGrid" kind="block" loading>{({ loading }) => <StatsGridExample loading={loading} />}</Demo>
export const SwapDemo = () => <Demo id="swap" name="Swap" kind="block" loading>{({ loading }) => <SwapExample loading={loading} />}</Demo>
export const ProfileDemo = () => <Demo id="profile" name="Profile" kind="block" loading>{({ loading }) => <ProfileExample loading={loading} />}</Demo>
export const PostDemo = () => <Demo id="post" name="Post" kind="block" loading>{({ loading }) => <PostExample loading={loading} />}</Demo>
export const ChatDemo = () => <Demo id="chat" name="Chat" kind="block"><ChatExample /></Demo>
export const SignInDemo = () => <Demo id="sign-in" name="SignIn" kind="block"><SignInExample /></Demo>
export const ChatListDemo = () => <Demo id="chat-list" name="ChatList" kind="block"><ChatListExample /></Demo>
export const ComposerDemo = () => <Demo id="composer" name="Composer" kind="block"><ComposerExample /></Demo>
export const MediaGridDemo = () => <Demo id="media-grid" name="MediaGrid" kind="block"><MediaGridExample /></Demo>
export const PageHeaderDemo = () => <Demo id="page-header" name="PageHeader" kind="block"><PageHeaderExample /></Demo>
export const StoriesDemo = () => <Demo id="stories" name="Stories" kind="block"><StoriesExample /></Demo>
export const TabBarDemo = () => <Demo id="tab-bar" name="TabBar" kind="block"><TabBarExample /></Demo>
export const TopBarDemo = () => <Demo id="top-bar" name="TopBar" kind="block"><TopBarExample /></Demo>
export const ApiKeysDemo = () => <Demo id="api-keys" name="ApiKeys" kind="block"><ApiKeysExample /></Demo>
export const ChartCardDemo = () => <Demo id="chart-card" name="ChartCard" kind="block" loading>{({ loading }) => <ChartCardExample loading={loading} />}</Demo>
export const MarketListDemo = () => <Demo id="market-list" name="MarketList" kind="block"><MarketListExample /></Demo>
export const RecordDetailDemo = () => <Demo id="record-detail" name="RecordDetail" kind="block" loading>{({ loading }) => <RecordDetailExample loading={loading} />}</Demo>
export const SettingsDemo = () => <Demo id="settings" name="Settings" kind="block"><SettingsExample /></Demo>
export const TableViewDemo = () => <Demo id="table-view" name="TableView" kind="block"><TableViewExample /></Demo>
export const UsageMetersDemo = () => <Demo id="usage-meters" name="UsageMeters" kind="block"><UsageMetersExample /></Demo>
export const AssetListDemo = () => <Demo id="asset-list" name="AssetList" kind="block"><AssetListExample /></Demo>
export const BoardDemo = () => <Demo id="board" name="Board" kind="block"><BoardExample /></Demo>
export const CheckoutDemo = () => <Demo id="checkout" name="Checkout" kind="block"><CheckoutExample /></Demo>
export const CommentsDemo = () => <Demo id="comments" name="Comments" kind="block"><CommentsExample /></Demo>
export const InboxDemo = () => <Demo id="inbox" name="Inbox" kind="block"><InboxExample /></Demo>
export const OrderBookDemo = () => <Demo id="order-book" name="OrderBook" kind="block"><OrderBookExample /></Demo>
export const PlayerDemo = () => <Demo id="player" name="Player" kind="block"><PlayerExample /></Demo>
