/** The kit version this wiki documents (kit/VERSION, injected by rspress.config.ts). */
export const KIT_VERSION = process.env.KIT_VERSION as string

export const KIT_REPO = "https://github.com/xray-network/design.git"

/** Agent prompts, always for the version this wiki documents. */
export const installationPrompt =
  `Install XRAY/DESIGN v${KIT_VERSION}. Clone ${KIT_REPO} with --depth 1 --branch v${KIT_VERSION} into a temporary directory. ` +
  `Check that its kit/VERSION is ${KIT_VERSION}. Copy its kit/ folder to .agents/skills/design/, then delete the temporary directory. ` +
  `Then follow the Setup section of .agents/skills/design/SKILL.md.`

export const upgradePrompt = `Upgrade XRAY/DESIGN to v${KIT_VERSION}, following the Upgrade section of .agents/skills/design/SKILL.md.`
