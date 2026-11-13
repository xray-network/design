declare module "*.css"
declare module "*.html?raw" {
  const html: string
  export default html
}

// Vanilla controllers the demos call directly (the kit ships types only for controllers React imports).
declare module "@kit/components/segmented/segmented.controller.js" {
  export function initSegmented(root?: ParentNode): () => void
}
declare module "@kit/components/dialog/dialog.controller.js" {
  export function initDialogs(root?: Document | HTMLElement): () => void
}
declare module "@kit/components/tabs/tabs.controller.js" {
  export function initTabs(root?: ParentNode): () => void
}
