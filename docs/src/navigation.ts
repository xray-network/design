import type { Sidebar } from "@rspress/core"

export const documentationSections = [
  {
    text: "Docs",
    href: "/",
    paths: ["/", "/components", "/versioning", "/protocol"],
    icon: "M3 10 12 3l9 7M5 9v12h5v-7h4v7h5V9",
    sidebar: [
      { sectionHeaderText: "Design standard" },
      { text: "Overview", link: "/" },
      { sectionHeaderText: "Components" },
      { text: "All components", link: "/components/" },
      { text: "Button", link: "/components/button" },
      { text: "Tag / Badge", link: "/components/tag" },
      { text: "Account Avatar", link: "/components/account-avatar" },
      { text: "Asset Row", link: "/components/asset-row" },
      { text: "Balance Card", link: "/components/balance-card" },
      { text: "Payment Form", link: "/components/payment-form" },
      { sectionHeaderText: "Reference" },
      { text: "Versioning", link: "/versioning" },
      { text: "Protocol releases", link: "/protocol/" },
      { text: "v1.0.0", link: "/protocol/", context: "spectre-version" }
    ]
  }
] satisfies { text: string; href: string; paths: string[]; icon: string; sidebar: Sidebar[string] }[]
