import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { defineConfig } from "@rspress/core"

import { remarkOutlineHeadings } from "./plugins/remark-outline-headings"
import { sidebar } from "./src/navigation"

// The wiki is the kit's playground: pages import components, rules and docs straight from
// ../kit, so `npm run dev` hot-reloads any change there.
const wiki = process.cwd()
const kit = resolve(wiki, "../kit")
const version = readFileSync(resolve(kit, "VERSION"), "utf8").trim()

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
      define: { "process.env.KIT_VERSION": JSON.stringify(version) },
    },
    resolve: {
      // Kit source lives outside the wiki; make it use the wiki's single React copy.
      alias: {
        react: resolve(wiki, "node_modules/react"),
        "react-dom": resolve(wiki, "node_modules/react-dom"),
        "@kit": kit,
      },
    },
    tools: {
      rspack: {
        // Component HTML references, imported as text: import html from "@kit/components/x/x.html?raw"
        module: { rules: [{ test: /\.html$/, resourceQuery: /raw/, type: "asset/source" }] },
      },
    },
  },
  themeConfig: {
    fallbackHeadingTitle: false,
    darkMode: "dark",
    enableAppearanceAnimation: false,
    nav: [{
        text: "Back to Wiki",
        link: "https://wiki.xraynetwork.io/",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 5-7 7 7 7M5 12h14"/></svg>',
        position: "left"
      }],
    sidebar: sidebar(version),
  }
})
