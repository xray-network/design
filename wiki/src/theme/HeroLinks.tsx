import { Link } from "@rspress/core/theme-original"
import * as icons from "@protocol/components/icon/icons.js"
import * as socials from "@protocol/components/icon/socials.js"
import * as crypto from "@protocol/components/icon/crypto.js"
import { apps, charts, motion } from "../navigation"

// Counted when the wiki builds (rspress.config.ts), so the grid follows the kit as it grows.
const counts: { components: number; blocks: number } = JSON.parse(process.env.KIT_COUNTS ?? "{}")
// Every icon in the kit: the interface set plus the social and crypto sets, as on the Icons page.
const iconCount = [icons, socials, crypto]
  .flatMap((set) => Object.values(set))
  .filter((icon) => typeof icon === "object" && icon !== null && "body" in icon).length

const ITEMS = [
  { value: counts.components, label: "Components", href: "/components/" },
  { value: counts.blocks, label: "Blocks", href: "/blocks/" },
  { value: charts.length, label: "Charts", href: "/charts/" },
  { value: apps.length, label: "Showcase", href: "/showcase/" },
  { value: iconCount, label: "Icons", href: "/icons" },
  { value: motion.length, label: "Motion", href: "/motion/" },
]

/** Beside the home hero's copy: what the kit holds, a ruled frame of counts in two rows of three, in the order of
    the menu, each cell a link to its section. */
export function HeroLinks() {
  return (
    <nav className="spectre-hero-links" aria-label="Browse the kit">
      {ITEMS.map(({ value, label, href }) => (
        <Link key={href} className="spectre-hero-link" href={href}>
          <span className="spectre-hero-link__label">{label}<span className="wiki-arrow" aria-hidden="true" /></span>
          <span className="spectre-hero-link__value">{value}</span>
        </Link>
      ))}
    </nav>
  )
}
