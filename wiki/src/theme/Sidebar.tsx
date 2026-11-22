import { useEffect, useMemo, useRef, useState } from "react"
import { useSidebarDynamic } from "@rspress/core/runtime"
import { SidebarList } from "@rspress/core/theme-original"
import { Icon } from "@protocol/components/icon/icon"
import { magnifyingGlass, xMark } from "@protocol/components/icon/icons.js"

type Entry = ReturnType<typeof useSidebarDynamic>[0][number]
const isHeader = (entry: Entry) => "sectionHeaderText" in entry
const label = (entry: Entry) => ("text" in entry && typeof entry.text === "string" ? entry.text : "")

/**
 * The sidebar with a filter. A section's menu starts with its top links (Back to Home, the section's overview); the
 * filter sits under them and narrows the list below by name, dropping group headers left without items. The home
 * menu has no top links and no filter. "/" anywhere outside a text field focuses it, as the key hint in it says.
 */
export function Sidebar() {
  const [data, setData] = useSidebarDynamic()
  const [query, setQuery] = useState("")
  const split = data.findIndex(isHeader)
  const top = split > 0 ? data.slice(0, split) : []
  const list = split > 0 ? data.slice(split) : data
  // Each section's menu is a new list: the filter starts empty there.
  const section = top.map(label).join("|")
  useEffect(() => setQuery(""), [section])

  // "/" focuses the filter, unless the reader is typing somewhere, holds a modifier, or the filter is out of sight
  // (the closed sidebar drawer on a phone).
  const input = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey || event.isComposing) return
      const target = event.target as HTMLElement | null
      if (target?.closest("input, textarea, select, [contenteditable=''], [contenteditable='true']")) return
      const field = input.current
      if (!field || !field.getClientRects().length || getComputedStyle(field).visibility === "hidden") return
      event.preventDefault()
      field.focus()
      field.select()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  const shown = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
    if (!words.length) return list
    const hits = list.filter((entry) => isHeader(entry) || words.every((word) => label(entry).toLowerCase().includes(word)))
    // A header stays only when an item follows it before the next header.
    return hits.filter((entry, i) => !isHeader(entry) || (hits[i + 1] !== undefined && !isHeader(hits[i + 1])))
  }, [list, query])

  if (!top.length) return <SidebarList sidebarData={data} setSidebarData={setData} />
  const noun = section.match(/All (\w+)/)?.[1] ?? (section.includes("Foundations") ? "patterns" : "pages")
  return (
    <>
      <SidebarList sidebarData={top} setSidebarData={setData} />
      <div className="wiki-sidebar-filter" role="search">
        <div className="x-input" data-size="sm">
          <Icon icon={magnifyingGlass} size="sm" />
          <input
            ref={input}
            type="text"
            aria-label={`Filter ${noun}`}
            placeholder={`Filter ${noun}`}
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => { if (event.key === "Escape" && query) { event.stopPropagation(); setQuery("") } }}
          />
          {query ? (
            <button type="button" className="wiki-sidebar-filter-clear" aria-label="Clear the filter" onClick={() => setQuery("")}>
              <Icon icon={xMark} size="sm" />
            </button>
          ) : (
            <kbd className="wiki-sidebar-filter-key" title="Press / to filter">/</kbd>
          )}
        </div>
      </div>
      {shown.some((entry) => !isHeader(entry))
        ? <SidebarList sidebarData={shown} setSidebarData={setData} />
        : <p className="wiki-sidebar-filter-empty">Nothing matches “{query.trim()}”.</p>}
    </>
  )
}
