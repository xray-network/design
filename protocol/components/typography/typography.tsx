import type { ComponentProps, ReactNode } from "react";
import "./typography.css";

export type TitleProps = Omit<ComponentProps<"h2">, "children"> & {
  /** The look: 1 article, 2 page (shell), 3 page (app), 4 section. */
  level?: 1 | 2 | 3 | 4;
  /** The element, for the document outline. Defaults to the heading matching the level. */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
};

/** A heading on the kit's scale. Choose `as` by structure and `level` by look. */
export function Title({ level = 2, as, className, ...rest }: TitleProps) {
  const Tag = as ?? (`h${level}` as const);
  return <Tag {...rest} className={className ? `x-title ${className}` : "x-title"} data-level={level} />;
}

export type TextProps = Omit<ComponentProps<"p">, "children"> & {
  /** A paragraph (`p`, the default) or inline text (`span`). */
  as?: "p" | "span" | "div";
  size?: "md" | "sm" | "xs";
  tone?: "default" | "secondary" | "muted" | "success" | "danger";
  weight?: "body" | "label" | "title";
  children: ReactNode;
};

/** Body text: size, tone and weight from the type scale. */
export function Text({ as: Tag = "p", size = "md", tone = "default", weight = "body", className, ...rest }: TextProps) {
  return (
    <Tag
      {...rest}
      className={className ? `x-text ${className}` : "x-text"}
      data-size={size === "md" ? undefined : size}
      data-tone={tone === "default" ? undefined : tone}
      data-weight={weight === "body" ? undefined : weight}
    />
  );
}

export type ParagraphProps = Omit<ComponentProps<"p">, "children"> & {
  /** md (default): body size, 14px. sm: fine print. lg: 16px, for articles. lead: 18px, an intro under a title. */
  size?: "sm" | "md" | "lg" | "lead";
  children: ReactNode;
};

/** Long-form text: relaxed leading, a readable measure, space between consecutive paragraphs. */
export function Paragraph({ size = "md", className, ...rest }: ParagraphProps) {
  return <p {...rest} className={className ? `x-paragraph ${className}` : "x-paragraph"} data-size={size === "md" ? undefined : size} />;
}

/** Inline code: addresses, ids, file names. */
export function Code({ className, ...rest }: ComponentProps<"code">) {
  return <code {...rest} className={className ? `x-code ${className}` : "x-code"} />;
}

/** A keyboard key, one per key: <Kbd>⌘</Kbd> <Kbd>K</Kbd>. */
export function Kbd({ className, ...rest }: ComponentProps<"kbd">) {
  return <kbd {...rest} className={className ? `x-kbd ${className}` : "x-kbd"} />;
}
