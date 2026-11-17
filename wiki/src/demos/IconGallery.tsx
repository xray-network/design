import { useMemo, useState } from "react"
import { Icon } from "@protocol/components/icon/icon"
import { allIcons } from "@protocol/components/icon/icon.controller.js"
import { Input } from "@protocol/components/field/field"
import { Segmented } from "@protocol/components/segmented/segmented"
import { toast } from "@protocol/components/toast/toast"
import "./icon-gallery.css"

const ICONS = allIcons()
const SEARCH = <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>

/** Every icon in the kit, searchable; clicking one copies its name. */
export function IconGallery() {
  const [query, setQuery] = useState("")
  const [set, setSet] = useState("all")
  const [size, setSize] = useState<"sm" | "md" | "lg">("lg")
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ICONS.filter((icon) =>
      (set === "all" || (set === "brands") === Boolean(icon.brand)) &&
      (!q || icon.name.includes(q) || icon.label?.toLowerCase().includes(q)))
  }, [query, set])

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
        <Segmented aria-label="Icon set" size="sm" value={set} onValueChange={setSet}
          options={[{ value: "all", label: "All" }, { value: "interface", label: "Interface" }, { value: "brands", label: "Brands" }]} />
        <Segmented aria-label="Icon size" size="sm" value={size} onValueChange={(v) => setSize(v as "sm" | "md" | "lg")}
          options={[{ value: "sm", label: "14" }, { value: "md", label: "16" }, { value: "lg", label: "18" }]} />
      </div>
      {shown.length ? (
        <ul className="wiki-icons-grid">
          {shown.map((icon) => (
            <li key={icon.name}>
              <button type="button" className="wiki-icons-item" onClick={() => copy(icon.name)} title={icon.label ? `${icon.label} · copy name` : "Copy name"}>
                <Icon icon={icon} size={size} />
                <span>{icon.name}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="wiki-icons-empty">No icons match “{query}”.</p>
      )}
    </div>
  )
}
