import type { ComponentProps, ReactNode } from "react";
import "./button.css";

export type ButtonProps = ComponentProps<"button"> & {
  /** primary: accent fill. ghost: hairline. chip: small filled button (fixed 28px). danger: destructive. */
  variant?: "primary" | "ghost" | "chip" | "danger";
  /** Ignored for chips. */
  size?: "sm" | "md" | "lg";
  /** Stretch to the container width. */
  fullWidth?: boolean;
  /** Shows a spinner, keeps the width, blocks clicks. */
  loading?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  loading,
  className,
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={className ? `x-button ${className}` : "x-button"}
      data-variant={variant === "primary" ? undefined : variant}
      data-size={size === "md" || variant === "chip" ? undefined : size}
      data-width={fullWidth ? "full" : undefined}
      aria-busy={loading || undefined}
      {...rest}
    >
      {children}
    </button>
  );
}

export type IconButtonProps = Omit<ComponentProps<"button">, "aria-label"> & {
  /** Required: the button has no visible text. */
  "aria-label": string;
  /** Square sizes for chrome and toolbars. Ignored when shape is "round". */
  size?: "xs" | "sm" | "md";
  /** "round": 32px circle for use inside content (rows, cards, headers). */
  shape?: "square" | "round";
  children: ReactNode;
};

export function IconButton({ size = "md", shape = "square", className, type = "button", ...rest }: IconButtonProps) {
  return (
    <button
      type={type}
      className={className ? `x-icon-button ${className}` : "x-icon-button"}
      data-size={size === "md" || shape === "round" ? undefined : size}
      data-shape={shape === "round" ? "round" : undefined}
      {...rest}
    />
  );
}
