// Interactive reference previews with framework-specific usage prompts.

import { Demo } from "./Demo"

import ButtonExample from "./examples/button"
import SegmentedExample from "./examples/segmented"
import SwitchExample from "./examples/switch"
import FieldExample from "./examples/field"
import DialogExample from "./examples/dialog"
import MenuExample from "./examples/menu"
import ToastExample from "./examples/toast"
import AlertExample from "./examples/alert"
import MessageExample from "./examples/message"
import TabsExample from "./examples/tabs"
import CardExample from "./examples/card"
import NumeralExample from "./examples/numeral"
import AvatarExample from "./examples/avatar"
import ChipsExample from "./examples/chips"
import ListExample from "./examples/list"
import TagExample from "./examples/tag"
import SelectExample from "./examples/select"
import CheckboxExample from "./examples/checkbox"
import RadioExample from "./examples/radio"
import TableExample from "./examples/table"
import PaginationExample from "./examples/pagination"
import TooltipExample from "./examples/tooltip"
import IconExample from "./examples/icon"

export const ButtonDemo = () => <Demo id="button" name="Button"><ButtonExample /></Demo>
export const SegmentedDemo = () => <Demo id="segmented" name="Segmented"><SegmentedExample /></Demo>
export const SwitchDemo = () => <Demo id="switch" name="Switch"><SwitchExample /></Demo>
export const FieldDemo = () => <Demo id="field" name="Input"><FieldExample /></Demo>
export const DialogDemo = () => <Demo id="dialog" name="Modal"><DialogExample /></Demo>
export const MenuDemo = () => <Demo id="menu" name="Menu"><MenuExample /></Demo>
export const ToastDemo = () => <Demo id="toast" name="Toast"><ToastExample /></Demo>
export const AlertDemo = () => <Demo id="alert" name="Alert"><AlertExample /></Demo>
export const MessageDemo = () => <Demo id="message" name="Message"><MessageExample /></Demo>
export const TabsDemo = () => <Demo id="tabs" name="Tabs"><TabsExample /></Demo>
export const CardDemo = () => <Demo id="card" name="Card" kind="block"><CardExample /></Demo>
export const NumeralDemo = () => <Demo id="numeral" name="Numeral"><NumeralExample /></Demo>
export const AvatarDemo = () => <Demo id="avatar" name="Avatar"><AvatarExample /></Demo>
export const ChipsDemo = () => <Demo id="chips" name="Chips"><ChipsExample /></Demo>
export const ListDemo = () => <Demo id="list" name="List" kind="block"><ListExample /></Demo>
export const TagDemo = () => <Demo id="tag" name="Tag"><TagExample /></Demo>
export const SelectDemo = () => <Demo id="select" name="Select"><SelectExample /></Demo>
export const CheckboxDemo = () => <Demo id="checkbox" name="Checkbox"><CheckboxExample /></Demo>
export const RadioDemo = () => <Demo id="radio" name="Radio"><RadioExample /></Demo>
export const TableDemo = () => <Demo id="table" name="Table"><TableExample /></Demo>
export const PaginationDemo = () => <Demo id="pagination" name="Pagination"><PaginationExample /></Demo>
export const TooltipDemo = () => <Demo id="tooltip" name="Tooltip"><TooltipExample /></Demo>
export const IconDemo = () => <Demo id="icon" name="Icon"><IconExample /></Demo>
