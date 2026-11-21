import { useMemo, useState } from "react"
import { Icon } from "@protocol/components/icon/icon"
import { allIcons } from "@protocol/components/icon/icon.controller.js"
import { Input } from "@protocol/components/input/input"
import { Segmented } from "@protocol/components/segmented/segmented"
import { toast } from "@protocol/components/toast/toast"
import { iconSearchWords, matchesIcon } from "./icon-tags"
import "./icon-gallery.css"

const ICONS = allIcons()
// What the search matches for each icon: its name, its label and its tags (what it means: "delete" finds trash).
const SEARCH_WORDS = new Map(ICONS.map((icon) => [icon.name, iconSearchWords(icon)]))
const SECTIONS = [
  { id: "interface", title: "Icons", test: (icon: (typeof ICONS)[number]) => !icon.brand && !icon.category },
  { id: "social", title: "Socials", test: (icon: (typeof ICONS)[number]) => icon.category === "social" },
  { id: "crypto", title: "Crypto", test: (icon: (typeof ICONS)[number]) => icon.category === "crypto" },
]
const SEARCH = <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>

/** Every icon in the kit, searchable; clicking one copies its name. */
export function IconGallery() {
  const [query, setQuery] = useState("")
  const [size, setSize] = useState("24")
  const sections = useMemo(() => {
    // Every word of the query has to be found, in any order: "file download", "arrow left".
    const match = (icon: (typeof ICONS)[number]) => matchesIcon(SEARCH_WORDS.get(icon.name)!, query)
    return SECTIONS.map((section) => ({ ...section, icons: ICONS.filter((icon) => section.test(icon) && match(icon)) })).filter((s) => s.icons.length)
  }, [query])

  const copy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name)
      toast(`Copied ${name}`, { tone: "success" })
    } catch {
      toast(name)
    }
  }

  return (
    <div className="wiki-icons rp-not-doc">
      <div className="wiki-icons-bar">
        <Input size="sm" aria-label="Search icons" placeholder={`Search ${ICONS.length} icons`} prefix={SEARCH} value={query} onChange={(e) => setQuery(e.target.value)} />
        <Segmented aria-label="Icon size" size="sm" value={size} onValueChange={setSize}
          options={[{ value: "16", label: "16" }, { value: "24", label: "24" }, { value: "32", label: "32" }]} />
      </div>
      {sections.length ? (
        sections.map((section) => (
          <section key={section.id} className="wiki-icons-section" aria-labelledby={`icons-${section.id}`}>
            <h2 id={`icons-${section.id}`} className="wiki-icons-title">{section.title} <span>{section.icons.length}</span></h2>
            <ul className="wiki-icons-grid" style={{ ["--x-icon-size" as string]: `${size}px` }}>
              {section.icons.map((icon) => (
                <li key={icon.name}>
                  <button type="button" className="wiki-icons-item" onClick={() => copy(icon.name)} title={icon.label ? `${icon.label} · copy name` : "Copy name"}>
                    <Icon icon={icon} />
                    <span>{icon.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))
      ) : (
        <p className="wiki-icons-empty">No icons match “{query}”.</p>
      )}
    </div>
  )
}
