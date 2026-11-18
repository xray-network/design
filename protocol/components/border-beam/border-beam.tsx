import type { CSSProperties } from "react";
import "./border-beam.css";

export type BorderBeamProps = {
  /** Length of the light, in px. */
  size?: number;
  /** One lap, in seconds. */
  duration?: number;
  /** A color token, e.g. "var(--x-success)". Defaults to the accent ink. */
  color?: string;
  reverse?: boolean;
  className?: string;
};

/** A light around the parent's border. Place it last in a container with position: relative and a radius. */
export function BorderBeam({ size, duration, color, reverse, className }: BorderBeamProps) {
  const style: Record<string, string> = {};
  if (size !== undefined) style["--x-border-beam-size"] = `${size}px`;
  if (duration !== undefined) style["--x-border-beam-duration"] = `${duration}s`;
  if (color !== undefined) style["--x-border-beam-color"] = color;
  return (
    <span
      className={className ? `x-border-beam ${className}` : "x-border-beam"}
      data-direction={reverse ? "reverse" : undefined}
      aria-hidden="true"
      style={style as CSSProperties}
    />
  );
}
