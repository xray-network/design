import { Button } from "@kit/components/button/button"
import { toast } from "@kit/components/toast/toast"
import "./demo.css"

/** The kit version this wiki was built from (root package.json, injected by rspress.config.ts). */
export const KIT_VERSION = process.env.KIT_VERSION as string

const REPO = "https://github.com/xray-network/design.git"

const prompts = {
  install: (v: string) =>
    `Install XRAY/DESIGN kit v${v}. Clone ${REPO} with --depth 1 --branch kit/v${v} into a temporary directory. ` +
    `Check that design/VERSION starts with ${v}. Copy design/ to .agents/design/ and skills/design/ to .agents/skills/design/, ` +
    `then delete the temporary directory. Then follow the Setup section of .agents/skills/design/SKILL.md.`,
  upgrade: (v: string) => `Upgrade XRAY/DESIGN to v${v}, following the Upgrade section of .agents/skills/design/SKILL.md.`,
}

/** A copyable agent prompt, always for the version this wiki documents. */
export function Prompt({ kind = "install", label }: { kind?: keyof typeof prompts; label?: string }) {
  const text = prompts[kind](KIT_VERSION)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      toast("Prompt copied", { tone: "success" })
    } catch {
      toast("Copy failed: select the text and copy it", { tone: "danger" })
    }
  }
  return (
    <figure className="wiki-prompt rp-not-doc">
      <figcaption className="wiki-prompt-head">
        <span>{label ?? (kind === "install" ? "Give your agent this prompt from the project root" : "Ask your agent")}</span>
        <Button variant="chip" onClick={copy}>Copy</Button>
      </figcaption>
      <p className="wiki-prompt-text">{text}</p>
    </figure>
  )
}
