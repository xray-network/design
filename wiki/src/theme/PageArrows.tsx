import { useEffect, useRef } from "react"
import { removeBase, useFrontmatter, useLocation, useSidebar } from "@rspress/core/runtime"
import { Link } from "@rspress/core/theme-original"
import { Icon } from "@protocol/components/icon/icon"
import { arrowLeft, arrowRight } from "@protocol/components/icon/icons.js"
import "@protocol/components/button/button.css"

type Direction = "previous" | "next"
type Page = { text: string; link: string }

// One form for every way a page can be addressed: /components/, /components/index and /components/index.html are
// the same page. (Rspress's own previous/next lookup misses index pages in the browser; this one does not.)
const pageKey = (link: string) =>
  removeBase(link.split("#")[0]).replace(/\.html$/, "").replace(/\/index$/, "/").replace(/(.)\/$/, "$1") || "/"

/** The previous and next page in sidebar order, the same order the doc footer uses. */
function usePageNeighbours(): { prevPage: Page | null; nextPage: Page | null } {
  const sidebar = useSidebar()
  const { pathname } = useLocation()
  const pages: Page[] = []
  const walk = (item: unknown) => {
    const node = item as { text?: string; link?: string; items?: unknown[] }
    if (node.link && node.text) pages.push({ text: node.text, link: node.link })
    node.items?.forEach(walk)
  }
  sidebar.forEach(walk)
  const here = pageKey(decodeURIComponent(pathname))
  const index = pages.findIndex((page) => pageKey(page.link) === here)
  if (index < 0) return { prevPage: null, nextPage: null }
  return { prevPage: pages[index - 1] ?? null, nextPage: pages[index + 1] ?? null }
}
const isEditable = (target: EventTarget | null) =>
  target instanceof Element && Boolean(target.closest("input, textarea, select, [contenteditable]:not([contenteditable='false'])"))

/**
 * Previous and next page, as two arrow buttons on the right of the page title, also on the keyboard: ⌘← / ⌘→ on
 * Apple devices, Ctrl+← / Ctrl+→ elsewhere (announced to screen readers through aria-keyshortcuts). The same pages as the footer links: the sidebar order.
 * Hidden on the home page and on pages outside the sidebar.
 */
export function PageArrows() {
  const { frontmatter } = useFrontmatter()
  const { prevPage, nextPage } = usePageNeighbours()
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const apple = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent)
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return
      if (!(apple ? event.metaKey : event.ctrlKey) || event.altKey || event.shiftKey) return
      if (isEditable(event.target)) return
      const link = root.current?.querySelector<HTMLAnchorElement>(`a[data-direction="${event.key === "ArrowLeft" ? "previous" : "next"}"]`)
      if (!link) return
      event.preventDefault()
      link.click()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  if (frontmatter.pageType === "home" || (!prevPage && !nextPage)) return null

  const arrow = (page: typeof prevPage, direction: Direction) => {
    const label = direction === "previous" ? "Previous" : "Next"
    const icon = <Icon icon={direction === "previous" ? arrowLeft : arrowRight} size="md" />
    return (
      <div className="wiki-page-arrow" data-disabled={page ? undefined : ""}>
        {page ? (
          <Link
            className="x-button"
            data-variant="ghost"
            data-size="sm"
            data-direction={direction}
            href={page.link}
            aria-label={`${label} page: ${page.text}`}
            aria-keyshortcuts={direction === "previous" ? "Meta+ArrowLeft Control+ArrowLeft" : "Meta+ArrowRight Control+ArrowRight"}
          >
            {icon}
          </Link>
        ) : (
          <span className="x-button" data-variant="ghost" data-size="sm" aria-disabled="true">{icon}</span>
        )}
      </div>
    )
  }

  return (
    <nav ref={root} className="wiki-page-arrows" aria-label="Previous and next page">
      {arrow(prevPage, "previous")}
      {arrow(nextPage, "next")}
    </nav>
  )
}
