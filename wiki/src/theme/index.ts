// Kit tokens first: they declare the cascade layers every component stylesheet joins.
import "@kit/tokens/tokens.css"
import "./theme.css"
import { createElement, forwardRef } from "react"
import { Layout as BasicLayout, Link as DefaultLink, type LinkProps } from "@rspress/core/theme-original"
import { Toaster } from "@kit/components/toast/toast"

// Each wiki is an independent app. Cross-wiki links must load its own router.
export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) =>
  createElement(DefaultLink, {
    ...props,
    ref,
    ...(props.href?.startsWith("https://wiki.xraynetwork.io") ? { target: "_self" } : {})
  })
)
Link.displayName = "Link"

// One toaster for every demo on every page.
export const Layout = () => createElement(BasicLayout, { bottom: createElement(Toaster) })

export * from "@rspress/core/theme-original"
export { HeroArtwork } from "./hero/HeroArtwork"
