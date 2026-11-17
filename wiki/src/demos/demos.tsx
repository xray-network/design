// One live demo per component: the React example (examples/<id>.tsx, also shown as React source) and the
// component's HTML reference from the protocol (shown as HTML source).

import { Demo } from "./Demo"

import { toast } from "@protocol/components/toast/toast"
import { showDelegated, showSaturated, showSynced } from "./examples/message"

// The HTML versions share the wiki's single toaster and message region (mounted by the theme layout).
const wireToastHtml = (root: HTMLElement) => {
  root.querySelector("#copy")?.addEventListener("click", () => toast("Address copied", { tone: "success" }))
  root.querySelector("#fail")?.addEventListener("click", () =>
    toast("Transaction failed: fee too low", { tone: "danger", action: { label: "Retry", onClick: () => toast("Retrying", { tone: "info" }) } }),
  )
}
const wireMessageHtml = (root: HTMLElement) => {
  root.querySelector("#delegated")?.addEventListener("click", showDelegated)
  root.querySelector("#saturated")?.addEventListener("click", showSaturated)
  root.querySelector("#update")?.addEventListener("click", showSynced)
}

import ButtonExample from "./examples/button"
import ButtonSource from "./examples/button.tsx?raw"
import ButtonHtml from "@protocol/components/button/button.html?raw"

import SegmentedExample from "./examples/segmented"
import SegmentedSource from "./examples/segmented.tsx?raw"
import SegmentedHtml from "@protocol/components/segmented/segmented.html?raw"

import SwitchExample from "./examples/switch"
import SwitchSource from "./examples/switch.tsx?raw"
import SwitchHtml from "@protocol/components/switch/switch.html?raw"

import FieldExample from "./examples/field"
import FieldSource from "./examples/field.tsx?raw"
import FieldHtml from "@protocol/components/field/field.html?raw"

import DialogExample from "./examples/dialog"
import DialogSource from "./examples/dialog.tsx?raw"
import DialogHtml from "@protocol/components/dialog/dialog.html?raw"

import MenuExample from "./examples/menu"
import MenuSource from "./examples/menu.tsx?raw"
import MenuHtml from "@protocol/components/menu/menu.html?raw"

import ToastExample from "./examples/toast"
import ToastSource from "./examples/toast.tsx?raw"
import ToastHtml from "@protocol/components/toast/toast.html?raw"

import AlertExample from "./examples/alert"
import AlertSource from "./examples/alert.tsx?raw"
import AlertHtml from "@protocol/components/alert/alert.html?raw"

import MessageExample from "./examples/message"
import MessageSource from "./examples/message.tsx?raw"
import MessageHtml from "@protocol/components/message/message.html?raw"

import TabsExample from "./examples/tabs"
import TabsSource from "./examples/tabs.tsx?raw"
import TabsHtml from "@protocol/components/tabs/tabs.html?raw"

import CardExample from "./examples/card"
import CardSource from "./examples/card.tsx?raw"
import CardHtml from "@protocol/blocks/card/card.html?raw"

import NumeralExample from "./examples/numeral"
import NumeralSource from "./examples/numeral.tsx?raw"
import NumeralHtml from "@protocol/components/numeral/numeral.html?raw"

import AvatarExample from "./examples/avatar"
import AvatarSource from "./examples/avatar.tsx?raw"
import AvatarHtml from "@protocol/components/avatar/avatar.html?raw"

import ChipsExample from "./examples/chips"
import ChipsSource from "./examples/chips.tsx?raw"
import ChipsHtml from "@protocol/components/chips/chips.html?raw"

import ListExample from "./examples/list"
import ListSource from "./examples/list.tsx?raw"
import ListHtml from "@protocol/blocks/list/list.html?raw"

import TagExample from "./examples/tag"
import TagSource from "./examples/tag.tsx?raw"
import TagHtml from "@protocol/components/tag/tag.html?raw"

import SelectExample from "./examples/select"
import SelectSource from "./examples/select.tsx?raw"
import SelectHtml from "@protocol/components/select/select.html?raw"

import CheckboxExample from "./examples/checkbox"
import CheckboxSource from "./examples/checkbox.tsx?raw"
import CheckboxHtml from "@protocol/components/checkbox/checkbox.html?raw"

import RadioExample from "./examples/radio"
import RadioSource from "./examples/radio.tsx?raw"
import RadioHtml from "@protocol/components/radio/radio.html?raw"

import TableExample from "./examples/table"
import TableSource from "./examples/table.tsx?raw"
import TableHtml from "@protocol/components/table/table.html?raw"

import PaginationExample from "./examples/pagination"
import PaginationSource from "./examples/pagination.tsx?raw"
import PaginationHtml from "@protocol/components/pagination/pagination.html?raw"

import IconExample from "./examples/icon"
import IconSource from "./examples/icon.tsx?raw"
import IconHtml from "@protocol/components/icon/icon.html?raw"
import TooltipExample from "./examples/tooltip"
import TooltipSource from "./examples/tooltip.tsx?raw"
import TooltipHtml from "@protocol/components/tooltip/tooltip.html?raw"


export const ButtonDemo = () => <Demo html={ButtonHtml} react={<ButtonExample />} source={ButtonSource} />
export const SegmentedDemo = () => <Demo html={SegmentedHtml} react={<SegmentedExample />} source={SegmentedSource} />
export const SwitchDemo = () => <Demo html={SwitchHtml} react={<SwitchExample />} source={SwitchSource} />
export const FieldDemo = () => <Demo html={FieldHtml} react={<FieldExample />} source={FieldSource} />
export const DialogDemo = () => <Demo html={DialogHtml} react={<DialogExample />} source={DialogSource} />
export const MenuDemo = () => <Demo html={MenuHtml} react={<MenuExample />} source={MenuSource} />
export const ToastDemo = () => <Demo html={ToastHtml} react={<ToastExample />} source={ToastSource} after={wireToastHtml} />
export const AlertDemo = () => <Demo html={AlertHtml} react={<AlertExample />} source={AlertSource} />
export const MessageDemo = () => <Demo html={MessageHtml} react={<MessageExample />} source={MessageSource} after={wireMessageHtml} />
export const TabsDemo = () => <Demo html={TabsHtml} react={<TabsExample />} source={TabsSource} />
export const CardDemo = () => <Demo html={CardHtml} react={<CardExample />} source={CardSource} />
export const NumeralDemo = () => <Demo html={NumeralHtml} react={<NumeralExample />} source={NumeralSource} />
export const AvatarDemo = () => <Demo html={AvatarHtml} react={<AvatarExample />} source={AvatarSource} />
export const ChipsDemo = () => <Demo html={ChipsHtml} react={<ChipsExample />} source={ChipsSource} />
export const ListDemo = () => <Demo html={ListHtml} react={<ListExample />} source={ListSource} />
export const TagDemo = () => <Demo html={TagHtml} react={<TagExample />} source={TagSource} />
export const SelectDemo = () => <Demo html={SelectHtml} react={<SelectExample />} source={SelectSource} />
export const CheckboxDemo = () => <Demo html={CheckboxHtml} react={<CheckboxExample />} source={CheckboxSource} />
export const RadioDemo = () => <Demo html={RadioHtml} react={<RadioExample />} source={RadioSource} />
export const TableDemo = () => <Demo html={TableHtml} react={<TableExample />} source={TableSource} />
export const PaginationDemo = () => <Demo html={PaginationHtml} react={<PaginationExample />} source={PaginationSource} />
export const TooltipDemo = () => <Demo html={TooltipHtml} react={<TooltipExample />} source={TooltipSource} />
export const IconDemo = () => <Demo html={IconHtml} react={<IconExample />} source={IconSource} />
