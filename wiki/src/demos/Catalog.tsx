import { Link } from "@rspress/core/theme"
import { blocks, components } from "../navigation"
import "./catalog.css"

type Item = { id: string; text: string }
const byName = (items: readonly Item[]) => [...items].sort((a, b) => a.text.localeCompare(b.text))

/** Every component or block by name, alphabetically, in three columns, linking to its page. */
export function Catalog({ kind }: { kind: "components" | "blocks" }) {
  return (
    <ul className="wiki-catalog rp-not-doc">
      {byName(kind === "components" ? components : blocks).map(({ id, text }) => (
        <li key={id}>
          <Link className="wiki-catalog-item" href={`/${kind}/${id}`}>{text}</Link>
        </li>
      ))}
    </ul>
  )
}
