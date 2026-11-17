import type { SVGProps } from "react";
import type { IconData } from "./icons.js";
import "./icon.css";

export type { IconData };

export type IconProps = Omit<SVGProps<SVGSVGElement>, "children" | "dangerouslySetInnerHTML"> & {
  /** An icon from ./icons.js, ./socials.js or ./crypto.js: import { bell } from "./icons.js". */
  icon: IconData;
  /** sm 14, md 16, lg 18 (default). For another size set --x-icon-size. */
  size?: "sm" | "md" | "lg";
  /** An accessible name. Without it the icon is decorative and hidden from screen readers. */
  label?: string;
};

/** An outline or brand icon that takes the text color. */
export function Icon({ icon, size, label, className, ...rest }: IconProps) {
  return (
    <svg
      {...rest}
      className={className ? `x-icon ${className}` : "x-icon"}
      viewBox="0 0 24 24"
      data-size={size}
      data-set={icon.brand ? "brand" : undefined}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  );
}
