import { Link } from "@rspress/core/theme-original"
import * as icons from "@protocol/components/icon/icons.js"

// Counted when the wiki builds (rspress.config.ts), so the grid follows the kit as it grows.
const counts: { components: number; blocks: number } = JSON.parse(process.env.KIT_COUNTS ?? "{}")
const iconCount = Object.values(icons).filter((icon) => typeof icon === "object" && icon !== null && "body" in icon).length

const ITEMS = [
  { value: String(counts.components), label: "Components", href: "/components/" },
  { value: String(counts.blocks), label: "Blocks", href: "/blocks/" },
  { value: "Screens", label: "Showcase", href: "/showcase/" },
  { value: String(iconCount), label: "Icons", href: "/icons" },
]

/** The home hero's grid under the buttons: what the kit holds, each cell a link to its section. */
export function HeroLinks() {
  return (
    <nav className="spectre-hero-links" aria-label="Browse the kit">
      {ITEMS.map(({ value, label, href }) => (
        <Link key={href} className="spectre-hero-link" href={href}>
          <span className="spectre-hero-link__value">{value}</span>
          <span className="spectre-hero-link__label">{label} <span aria-hidden="true">→</span></span>
        </Link>
      ))}
    </nav>
  )
}
