import { useId, useState, type ReactNode } from "react"
import { chevronDown } from "@protocol/components/icon/icons.js"
import { CodeBlock, Link } from "@rspress/core/theme"

import { blocks, components, showcase } from "../navigation"
import { showcasePrompt } from "../prompts"
import "./showcase.css"

const NAMES: Record<string, { text: string; href: string }> = Object.fromEntries([
  ...components.map(({ id, text }) => [id, { text, href: `/components/${id}` }]),
  ...blocks.map(({ id, text }) => [id, { text, href: `/blocks/${id}` }]),
])

/** A prompt to adapt the screen to a project, then the screen itself (composed from kit components and blocks)
    and links to each part it uses. */
export function Showcase({ id, children }: { id: (typeof showcase)[number]["id"]; children: ReactNode }) {
  const screen = showcase.find((s) => s.id === id)!
  const prompt = showcasePrompt(screen, screen.uses.map((part) => NAMES[part].text))
  // Collapsed by default: the title bar with "Show prompt" on its right; the prompt (and its copy button) opens below.
  const [open, setOpen] = useState(false)
  const promptId = useId()
  return (
    <>
    <div className="wiki-showcase-prompt" id={promptId}>
      <CodeBlock
        wrapCode
        containerElementClassName={open ? undefined : "wiki-prompt--collapsed"}
        title={
          <>
            <span>Copy into your coding agent</span>
            <button type="button" className="wiki-prompt-toggle" aria-expanded={open} aria-controls={promptId} onClick={() => setOpen(!open)}>
              {open ? "Hide prompt" : "Show prompt"}
              <svg className="wiki-prompt-toggle__icon" viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: chevronDown.body }} />
            </button>
          </>
        }
      >
        <pre tabIndex={0}><code>{prompt}</code></pre>
      </CodeBlock>
    </div>
    <div className="wiki-showcase rp-not-doc">
      <div className="wiki-showcase-screen">{children}</div>
      <section className="wiki-showcase-parts" aria-label={`Parts of the ${screen.text} screen`}>
        <h2 className="wiki-showcase-parts-title">Built from</h2>
        <ul>
          {screen.uses.map((part) => (
            <li key={part}><Link className="wiki-showcase-part" href={NAMES[part].href}>{NAMES[part].text}</Link></li>
          ))}
        </ul>
      </section>
    </div>
    </>
  )
}

