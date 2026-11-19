import { readdirSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { defineConfig } from "@rspress/core"
import { parseDocument, isMap, isPair, isScalar } from "yaml"

import { remarkOutlineHeadings } from "./plugins/remark-outline-headings"
import { sidebar } from "./src/navigation"

// The wiki is the protocol's playground: pages import components, the protocol and docs straight from
// ../protocol, so `npm run dev` hot-reloads any change there (restart it after editing the protocol's header).
const wiki = process.cwd()
const protocolDir = resolve(wiki, "../protocol")

// The protocol: Protocol-Version under its title, and every token (with its note) from its YAML header.
const protocolText = readFileSync(resolve(protocolDir, "DESIGN-PROTOCOL.md"), "utf8")
const version = /^Protocol-Version: (\S+)$/m.exec(protocolText)?.[1] ?? ""
const protocol = parseDocument(protocolText.match(/^---\n([\s\S]*?)\n---\n/)![1])
const tokenGroups = (() => {
  const groups = protocol.get("tokens", true)
  if (!isMap(groups)) return []
  return groups.items.filter(isPair).map((group) => ({
    group: String(isScalar(group.key) ? group.key.value : group.key),
    tokens: (isMap(group.value) ? group.value.items : []).filter(isPair).map((pair) => {
      const value = (pair.value as { toJSON(): unknown }).toJSON()
      const both = value !== null && typeof value === "object" ? (value as { light: unknown; dark: unknown }) : { light: value, dark: value }
      return {
        name: String(isScalar(pair.key) ? pair.key.value : pair.key),
        light: String(both.light),
        dark: String(both.dark),
        note: ((pair.value as { comment?: string }).comment ?? "").trim(),
      }
    }),
  }))
})()

// How many components and blocks the kit holds, for the home hero's grid: one directory each.
const countDirs = (dir: string) => readdirSync(resolve(protocolDir, dir), { withFileTypes: true }).filter((entry) => entry.isDirectory()).length
const kitCounts = { components: countDirs("components"), blocks: countDirs("blocks") }

export default defineConfig({
  root: "src/pages",
  outDir: "build/design",
  base: "/design/",
  siteOrigin: "https://wiki.xraynetwork.io",
  icon: "/xray-blue.svg",
  themeDir: "src/theme",
  title: "XRAY/DESIGN",
  logo: "/xray-blue.svg",
  logoText: "XRAY/DESIGN",
  description: "A copy-in UI kit for agents: rules, tokens, liquid motion and components in HTML and React.",
  route: { cleanUrls: true },
  markdown: { remarkPlugins: [remarkOutlineHeadings] },
  builderConfig: {
    source: {
      define: {
        "process.env.KIT_VERSION": JSON.stringify(version),
        "process.env.DESIGN_TOKENS": JSON.stringify(JSON.stringify(tokenGroups)),
        "process.env.KIT_COUNTS": JSON.stringify(JSON.stringify(kitCounts)),
      },
    },
    resolve: {
      // Kit source lives outside the wiki; make it use the wiki's single React copy.
      alias: {
        react: resolve(wiki, "node_modules/react"),
        "react-dom": resolve(wiki, "node_modules/react-dom"),
        "@protocol": protocolDir,
      },
    },
  },
  themeConfig: {
    fallbackHeadingTitle: false,
    darkMode: "dark",
    enableAppearanceAnimation: false,
    socialLinks: [{ icon: "github", mode: "link", content: "https://github.com/xray-network/design" }],
    nav: [{
        text: "Back to Wiki",
        link: "https://wiki.xraynetwork.io/",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 5-7 7 7 7M5 12h14"/></svg>',
        position: "left"
      },
      { text: "Components", link: "/components/" },
      { text: "Blocks", link: "/blocks/" },
      { text: "Showcase", link: "/showcase/" },
      { text: "Icons", link: "/icons" },
    ],
    sidebar: sidebar(),
  }
})
