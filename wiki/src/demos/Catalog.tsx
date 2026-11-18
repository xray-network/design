import { Link } from "@rspress/core/theme"
import { blocks, components, showcase } from "../navigation"
import "./catalog.css"

type Item = { id: string; text: string }
const byName = (items: readonly Item[]) => [...items].sort((a, b) => a.text.localeCompare(b.text))

const LISTS = { components, blocks, showcase }

/** Every component, block or showcase screen by name, alphabetically, in three columns, linking to its page. */
export function Catalog({ kind }: { kind: keyof typeof LISTS }) {
  return (
    <ul className="wiki-catalog rp-not-doc">
      {byName(LISTS[kind]).map(({ id, text }) => (
        <li key={id}>
          <Link className="wiki-catalog-item" href={`/${kind}/${id}`}>{text}</Link>
        </li>
      ))}
    </ul>
  )
}
