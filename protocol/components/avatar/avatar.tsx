import type { CSSProperties, ReactNode } from "react";
import { avatarShapes, type AvatarPalette } from "./avatar.controller.js";
import "./avatar.css";

export type AvatarProps = {
  /** Any stable string: an address or an account id. The same seed always draws the same avatar. */
  seed: string;
  palette?: AvatarPalette;
  size?: "sm" | "md" | "lg";
  /** A filled mark on the corner, such as a verified check (an <svg>). */
  badge?: ReactNode;
  /** Name of the badge for screen readers ("Verified"). */
  badgeLabel?: string;
  /** The surface behind the avatar, so the badge ring matches it: "var(--x-bg-panel)". */
  ring?: string;
  /** While the account loads: a spinner on top of the avatar, which stays visible. */
  loading?: boolean;
  className?: string;
};

/** Decorative: always show the account's label or address in text next to it. */
export function Avatar({ seed, palette = "amber", size = "md", badge, badgeLabel, ring, loading, className }: AvatarProps) {
  const { background, shapes } = avatarShapes(seed, palette);
  return (
    <span
      className={className ? `x-avatar ${className}` : "x-avatar"}
      data-size={size === "md" ? undefined : size}
      aria-busy={loading || undefined}
      style={ring ? ({ "--x-avatar-ring": ring } as CSSProperties) : undefined}
    >
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <rect width="40" height="40" fill={background} />
        {shapes.map((shape, i) => (
          <rect key={i} width="40" height="40" fill={shape.fill} transform={`translate(${shape.x} ${shape.y}) rotate(${shape.rotate} 20 20)`} />
        ))}
      </svg>
      {badge != null && <span className="x-avatar-badge" title={badgeLabel}>{badge}</span>}
    </span>
  );
}
