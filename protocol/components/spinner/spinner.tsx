import "./spinner.css";

export type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  tone?: "accent" | "muted";
  /** Announced to screen readers. Omit only when visible text next to it says the same; it is then hidden. */
  label?: string;
  className?: string;
};

/** Indeterminate progress: the kit's one looping motion. */
export function Spinner({ size = "md", tone = "accent", label, className }: SpinnerProps) {
  return (
    <span
      className={className ? `x-spinner ${className}` : "x-spinner"}
      data-size={size === "md" ? undefined : size}
      data-tone={tone === "accent" ? undefined : tone}
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
