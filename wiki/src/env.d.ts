declare module "*.css"
declare module "*.html?raw" {
  const html: string
  export default html
}
declare module "*.tsx?raw" {
  const source: string
  export default source
}

// Vanilla controllers the demos call directly (the kit ships types only for controllers React imports).
declare module "@protocol/components/segmented/segmented.controller.js" {
  export function initSegmented(root?: ParentNode): () => void
}
declare module "@protocol/components/dialog/dialog.controller.js" {
  export function initDialogs(root?: Document | HTMLElement): () => void
}
declare module "@protocol/components/tabs/tabs.controller.js" {
  export function initTabs(root?: ParentNode): () => void
}
declare module "@protocol/components/table/table.controller.js" {
  export function initTables(root?: ParentNode): () => void
}
declare module "@protocol/blocks/send-form/send-form.controller.js" {
  export function initSendForms(root?: ParentNode): () => void
}
declare module "@protocol/blocks/account-switcher/account-switcher.controller.js" {
  export function initAccountSwitchers(root?: ParentNode): () => void
}
