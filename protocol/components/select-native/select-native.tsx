import type { ComponentProps } from "react";
import "./select-native.css";

export type SelectNativeProps = Omit<ComponentProps<"select">, "size"> & {
  size?: "sm" | "md" | "lg";
  /** Options as data; or pass <option> children. */
  options?: { value: string; label: string; disabled?: boolean }[];
  /** Class on the frame. */
  className?: string;
};

/** The browser's own select in the input's frame. Use Field (or a label) to name it. */
export function SelectNative({ size = "md", options, className, children, ...select }: SelectNativeProps) {
  return (
    <div className={className ? `x-select-native ${className}` : "x-select-native"} data-size={size === "md" ? undefined : size}>
      <select {...select}>
        {options?.map((o) => <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>)}
        {children}
      </select>
      <svg className="x-select-native-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </div>
  );
}
