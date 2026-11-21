import { LiquidIndicator, type LiquidIndicatorItem } from "../../motion/liquid-indicator/liquid-indicator";
import "./tab-bar.css";

export type TabBarProps<T extends string> = {
  /** Three to five tabs, each with an icon. With `href` they are links and `value` comes from the route. */
  items: LiquidIndicatorItem<T>[];
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  /** Names the navigation ("Main"). */
  "aria-label": string;
  className?: string;
};

/** The floating tab bar of a phone screen. Its frame must be positioned; the bar sits at the frame's foot. */
export function TabBar<T extends string>({ className, ...nav }: TabBarProps<T>) {
  return (
    <footer className={className ? `x-tab-bar ${className}` : "x-tab-bar"}>
      <LiquidIndicator fullWidth layout="stack" {...nav} />
    </footer>
  );
}
