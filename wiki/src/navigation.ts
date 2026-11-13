import type { Sidebar } from "@rspress/core"

// Sidebar icons: 24px outline glyphs in the kit's icon style.
const svg = (body: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`
const path = (d: string) => svg(`<path d="${d}"/>`)

export const icons = {
  install: path("M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"),
  rules: path("M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"),
  // Button: a capsule with a pointer
  button: svg('<rect x="2.25" y="6.75" width="15" height="7.5" rx="3.75"/><path d="m14.25 12.75 6.5 2.6-2.85 1.1-1.1 2.85-2.55-6.55Z"/>'),
  // Segmented: a track with the selected segment filled
  segmented: svg('<rect x="2.25" y="7.5" width="19.5" height="9" rx="4.5"/><rect x="4.5" y="9.75" width="7.5" height="4.5" rx="2.25" fill="currentColor" stroke="none"/>'),
  // Switch: a track with the thumb on
  switch: svg('<rect x="2.25" y="6.75" width="19.5" height="10.5" rx="5.25"/><circle cx="16.5" cy="12" r="2.625" fill="currentColor" stroke="none"/>'),
  // Field: a label line over a pill input with a caret
  field: svg('<path d="M3.75 4.5h6"/><rect x="2.25" y="9" width="19.5" height="9" rx="4.5"/><path d="M7.5 11.625v3.75"/>'),
  // Dialog: a window with a title bar
  dialog: path("M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z"),
  // Menu: a panel of rows
  menu: svg('<rect x="3.75" y="3.75" width="16.5" height="16.5" rx="3"/><path d="M7.5 8.25h9M7.5 12h9M7.5 15.75h5.25"/>'),
  // Toast: a bell
  toast: path("M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"),
}

/** One entry per kit component: src/components/<id> and src/pages/components/<id>.mdx. */
export const components = [
  { id: "button", text: "Button" },
  { id: "segmented", text: "Segmented control" },
  { id: "switch", text: "Switch" },
  { id: "field", text: "Field and Input" },
  { id: "dialog", text: "Dialog" },
  { id: "menu", text: "Menu" },
  { id: "toast", text: "Toast" },
] as const

export function sidebar(version: string): Sidebar {
  return {
    "/": [
      { sectionHeaderText: `Kit v${version}` },
      { text: "Install", link: "/", icon: icons.install },
      { text: "Design rules", link: "/rules", icon: icons.rules },
      { sectionHeaderText: "Components" },
      ...components.map(({ id, text }) => ({ text, link: `/components/${id}`, icon: icons[id] })),
    ],
  }
}
