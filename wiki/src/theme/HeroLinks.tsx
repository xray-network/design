import { createElement } from "react"
import { Link } from "@rspress/core/theme-original"
import { computerDesktop, cube, rectangleGroup, sparkles } from "@protocol/components/icon/icons.js"

const LINKS = [
  { text: "Components", href: "/components/", icon: cube },
  { text: "Blocks", href: "/blocks/", icon: rectangleGroup },
  { text: "Showcase", href: "/showcase/", icon: computerDesktop },
  { text: "Icons", href: "/icons", icon: sparkles },
]

/** The home hero's quick links to what the kit holds: outlined pills with the kit's icons, above the main buttons. */
export function HeroLinks() {
  return (
    <nav className="spectre-hero-links" aria-label="Browse the kit">
      {LINKS.map(({ text, href, icon }) => (
        <Link key={href} className="spectre-hero-link" href={href}>
          {createElement("svg", {
            className: "spectre-hero-link__icon",
            viewBox: "0 0 24 24",
            "aria-hidden": true,
            dangerouslySetInnerHTML: { __html: icon.body },
          })}
          {text}
        </Link>
      ))}
    </nav>
  )
}
