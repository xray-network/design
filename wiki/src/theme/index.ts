// Kit tokens first: they declare the cascade layers every component stylesheet joins.
import "@protocol/core/tokens.css"
import "./theme.css"
import { Fragment, createElement, forwardRef } from "react"
import { Layout as BasicLayout, Link as DefaultLink, type LinkProps } from "@rspress/core/theme-original"
import { Toaster } from "@protocol/components/toast/toast"
import { Messages } from "@protocol/components/message/message"
import pkg from "../../package.json"

// Each wiki is an independent app. Cross-wiki links must load its own router.
export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) =>
  createElement(DefaultLink, {
    ...props,
    ref,
    ...(props.href?.startsWith("https://wiki.xraynetwork.io") ? { target: "_self" } : {})
  })
)
Link.displayName = "Link"

// One toaster and one message region for every demo on every page. The wiki's version from its package.json
// (kept equal to DESIGN-PROTOCOL.md's Protocol-Version by check-protocol) goes just before the search box.
export const Layout = () =>
  createElement(BasicLayout, {
    beforeNavMenu: pkg.version ? createElement("span", { className: "wiki-version" }, `v${pkg.version}`) : null,
    bottom: createElement(Fragment, null, createElement(Toaster), createElement(Messages)),
  })

export * from "@rspress/core/theme-original"
export { HeroArtwork } from "./hero/HeroArtwork"
export { HeroDiagram } from "./hero/HeroDiagram"
export { CopyPromptButton, installationPrompt } from "./CopyPromptButton"
