import { Link } from "@rspress/core/theme"
import { apps, appTitle, blocks, charts, components, linkText, motion } from "../navigation"
import "./catalog.css"

type Item = { id: string; text: string }
const byName = (items: readonly Item[]) => [...items].sort((a, b) => a.text.localeCompare(b.text))

const LISTS = { components, blocks, charts, motion, showcase: apps }

/** Every component, block, chart or showcase app by name, alphabetically, in three columns, linking to its page.
    `group` narrows motion patterns to one of their groups, and showcase apps to "mobile" or "desktop", in the
    menu's order. */
export function Catalog({ kind, group }: { kind: keyof typeof LISTS; group?: string }) {
  const items: readonly Item[] = !group ? byName(LISTS[kind]) : kind === "showcase" ? apps.filter((app) => app.form === group) : motion.filter((pattern) => pattern.group === group)
  return (
    <ul className="wiki-catalog rp-not-doc">
      {items.map(({ id, text }) => (
        <li key={id}>
          <Link className="wiki-catalog-item" href={`/${kind}/${id}`}>{kind === "showcase" ? appTitle(text) : linkText(text)}</Link>
        </li>
      ))}
    </ul>
  )
}
