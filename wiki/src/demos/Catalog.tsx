import { Link } from "@rspress/core/theme"
import { apps, blocks, components, linkText, motion, showcase } from "../navigation"
import "./catalog.css"

type Item = { id: string; text: string }
const byName = (items: readonly Item[]) => [...items].sort((a, b) => a.text.localeCompare(b.text))

const LISTS = { components, blocks, motion, showcase: [...apps, ...showcase] }

/** Every component, block or showcase screen by name, alphabetically, in three columns, linking to its page.
    `group` narrows motion patterns to one of their groups, in the menu's order. */
export function Catalog({ kind, group }: { kind: keyof typeof LISTS; group?: string }) {
  const items: readonly Item[] = group ? motion.filter((pattern) => pattern.group === group) : byName(LISTS[kind])
  return (
    <ul className="wiki-catalog rp-not-doc">
      {items.map(({ id, text }) => (
        <li key={id}>
          <Link className="wiki-catalog-item" href={`/${kind}/${id}`}>{linkText(text)}</Link>
        </li>
      ))}
    </ul>
  )
}
