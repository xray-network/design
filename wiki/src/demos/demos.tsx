// Interactive reference previews with framework-specific usage prompts.

import { Demo } from "./Demo"

import ButtonExample from "./examples/button"
import SegmentedExample from "./examples/segmented"
import SwitchExample from "./examples/switch"
import FieldExample from "./examples/input"
import DialogExample from "./examples/modal"
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
import SkeletonExample from "./examples/skeleton"
import TypographyExample from "./examples/typography"
import PopoverExample from "./examples/popover"
import PopconfirmExample from "./examples/popconfirm"
import MenuNavigationExample from "./examples/menu-navigation"
import SelectNativeExample from "./examples/select-native"
import SpinnerExample from "./examples/spinner"
import GroupExample from "./examples/input-group"
import CollapseExample from "./examples/collapse"
import EmptyExample from "./examples/empty"
import ResultExample from "./examples/result"
import BorderBeamExample from "./examples/border-beam"
import TableCompactExample from "./examples/table-compact"
import OptionExample from "./examples/card-option"
import StatsExample from "./examples/stats"
import ProgressExample from "./examples/progress"
import SliderExample from "./examples/slider"
import StepsExample from "./examples/steps"
import TimelineExample from "./examples/timeline"
import AmountExample from "./examples/input-amount"
import ComboboxExample from "./examples/combobox"
import CommandExample from "./examples/command"
import CopyExample from "./examples/copy"
import MenuListExample from "./examples/menu-list"

export const ButtonDemo = () => <Demo id="button" name="Button" loading>{({ loading }) => <ButtonExample loading={loading} />}</Demo>
export const SegmentedDemo = () => <Demo id="segmented" name="Segmented"><SegmentedExample /></Demo>
export const SwitchDemo = () => <Demo id="switch" name="Switch"><SwitchExample /></Demo>
export const FieldDemo = () => <Demo id="input" name="Input"><FieldExample /></Demo>
export const DialogDemo = () => <Demo id="modal" name="Modal"><DialogExample /></Demo>
export const MenuDemo = () => <Demo id="menu" name="Menu"><MenuExample /></Demo>
export const ToastDemo = () => <Demo id="toast" name="Toast"><ToastExample /></Demo>
export const AlertDemo = () => <Demo id="alert" name="Alert"><AlertExample /></Demo>
export const MessageDemo = () => <Demo id="message" name="Message"><MessageExample /></Demo>
export const TabsDemo = () => <Demo id="tabs" name="Tabs"><TabsExample /></Demo>
export const CardDemo = () => <Demo id="card" name="Card" loading>{({ loading }) => <CardExample loading={loading} />}</Demo>
export const NumeralDemo = () => <Demo id="numeral" name="Numeral"><NumeralExample /></Demo>
export const AvatarDemo = () => <Demo id="avatar" name="Avatar" loading>{({ loading }) => <AvatarExample loading={loading} />}</Demo>
export const ChipsDemo = () => <Demo id="chips" name="Chips"><ChipsExample /></Demo>
export const ListDemo = () => <Demo id="list" name="List" loading>{({ loading }) => <ListExample loading={loading} />}</Demo>
export const TagDemo = () => <Demo id="tag" name="Tag"><TagExample /></Demo>
export const SelectDemo = () => <Demo id="select" name="Select"><SelectExample /></Demo>
export const CheckboxDemo = () => <Demo id="checkbox" name="Checkbox"><CheckboxExample /></Demo>
export const RadioDemo = () => <Demo id="radio" name="Radio"><RadioExample /></Demo>
export const TableDemo = () => <Demo id="table" name="Table" loading>{({ loading }) => <TableExample loading={loading} />}</Demo>
export const PaginationDemo = () => <Demo id="pagination" name="Pagination" loading>{({ loading }) => <PaginationExample loading={loading} />}</Demo>
export const TooltipDemo = () => <Demo id="tooltip" name="Tooltip"><TooltipExample /></Demo>
export const IconDemo = () => <Demo id="icon" name="Icon"><IconExample /></Demo>
export const TypographyDemo = () => <Demo id="typography" name="Typography"><TypographyExample /></Demo>
export const PopoverDemo = () => <Demo id="popover" name="Popover"><PopoverExample /></Demo>
export const PopconfirmDemo = () => <Demo id="popconfirm" name="Popconfirm"><PopconfirmExample /></Demo>
export const MenuNavigationDemo = () => <Demo id="menu-navigation" name="MenuNavigation"><MenuNavigationExample /></Demo>
export const SelectNativeDemo = () => <Demo id="select-native" name="SelectNative"><SelectNativeExample /></Demo>
export const SpinnerDemo = () => <Demo id="spinner" name="Spinner"><SpinnerExample /></Demo>
export const GroupDemo = () => <Demo id="input-group" name="InputGroup"><GroupExample /></Demo>
export const CollapseDemo = () => <Demo id="collapse" name="Collapse"><CollapseExample /></Demo>
export const EmptyDemo = () => <Demo id="empty" name="Empty"><EmptyExample /></Demo>
export const ResultDemo = () => <Demo id="result" name="Result"><ResultExample /></Demo>
export const BorderBeamDemo = () => <Demo id="border-beam" name="BorderBeam" loading="on">{({ loading }) => <BorderBeamExample loading={loading} />}</Demo>
export const TableCompactDemo = () => <Demo id="table-compact" name="TableCompact" loading>{({ loading }) => <TableCompactExample loading={loading} />}</Demo>
export const SkeletonDemo = () => <Demo id="skeleton" name="Skeleton" loading="on">{({ loading }) => <SkeletonExample loading={loading} />}</Demo>
export const OptionDemo = () => <Demo id="card-option" name="CardOption" loading>{({ loading }) => <OptionExample loading={loading} />}</Demo>
export const StatsDemo = () => <Demo id="stats" name="Stats" loading>{({ loading }) => <StatsExample loading={loading} />}</Demo>
export const ProgressDemo = () => <Demo id="progress" name="Progress" loading>{({ loading }) => <ProgressExample loading={loading} />}</Demo>
export const SliderDemo = () => <Demo id="slider" name="Slider"><SliderExample /></Demo>
export const StepsDemo = () => <Demo id="steps" name="Steps"><StepsExample /></Demo>
export const TimelineDemo = () => <Demo id="timeline" name="Timeline"><TimelineExample /></Demo>
export const AmountDemo = () => <Demo id="input-amount" name="InputAmount" loading>{({ loading }) => <AmountExample loading={loading} />}</Demo>
export const ComboboxDemo = () => <Demo id="combobox" name="Combobox"><ComboboxExample /></Demo>
export const CommandDemo = () => <Demo id="command" name="Command"><CommandExample /></Demo>
export const CopyDemo = () => <Demo id="copy" name="Copy"><CopyExample /></Demo>
export const MenuListDemo = () => <Demo id="menu-list" name="MenuList"><MenuListExample /></Demo>
