import "./theme.css"
import { createElement, forwardRef } from "react"
import { Link as DefaultLink, type LinkProps } from "@rspress/core/theme-original"

// Each wiki is an independent app. Cross-wiki links must load its own router.
export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) =>
  createElement(DefaultLink, {
    ...props,
    ref,
    ...(props.href?.startsWith("https://wiki.xraynetwork.io") ? { target: "_self" } : {})
  })
)
Link.displayName = "Link"

export * from "@rspress/core/theme-original"
export { HeroArtwork } from "./hero/HeroArtwork"
