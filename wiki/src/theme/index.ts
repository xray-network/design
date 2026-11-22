// Kit tokens first: they declare the cascade layers every component stylesheet joins.
import "@protocol/core/tokens.css"
import "./theme.css"
import { Fragment, createElement, forwardRef } from "react"
import { Layout as BasicLayout, Link as DefaultLink, type LinkProps } from "@rspress/core/theme-original"
import { Toaster } from "@protocol/components/toast/toast"
import { Messages } from "@protocol/components/message/message"
import pkg from "../../package.json"
import { PageArrows } from "./PageArrows"
import { NavTitle } from "./NavTitle"
import { UserThemeStyle } from "./useUserTheme"
import { moon, sun } from "@protocol/components/icon/icons.js"

// The theme switch's sun and moon, from the kit's icons (Rspress's SwitchAppearance takes IconSun and IconMoon
// from this theme). Outline, like every kit icon; the fill Rspress passes is ignored.
const kitIcon = ({ body }: { body: string }) => {
  const Icon = ({ className }: { className?: string }) =>
    createElement("svg", {
      className,
      viewBox: "0 0 24 24",
      width: 20,
      height: 20,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": true,
      dangerouslySetInnerHTML: { __html: body },
    })
  return Icon
}

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
    // The logo with the product name inside its box.
    navTitle: createElement(NavTitle),
    beforeNavMenu: pkg.version ? createElement("span", { className: "wiki-version" }, `v${pkg.version}`) : null,
    // Previous / next arrows on the right of the page title.
    beforeDocContent: createElement(PageArrows),
    // The reader's theme from the Theming page, on every preview.
    bottom: createElement(Fragment, null, createElement(Toaster), createElement(Messages), createElement(UserThemeStyle)),
  })

export * from "@rspress/core/theme-original"
export const IconSun = kitIcon(sun)
export const IconMoon = kitIcon(moon)
export { HeroArtwork } from "./hero/HeroArtwork"
export { HeroDiagram } from "./hero/HeroDiagram"
export { CopyPromptButton, installationPrompt } from "./CopyPromptButton"
export { HeroLinks } from "./HeroLinks"
export { HomeScreens } from "../showcase/Apps"
// The sidebar with a filter between a section's top links and its list.
export { Sidebar } from "./Sidebar"
