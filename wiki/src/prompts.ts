/** The protocol version this wiki documents (DESIGN-PROTOCOL.md's Protocol-Version, injected by rspress.config.ts). */
export const KIT_VERSION = process.env.KIT_VERSION as string

/** Agent prompts, the same form as SPECTRE's. The latest protocol tells the agent how to install or upgrade, so their text never changes. */
export const installationPrompt =
  "Read https://wiki.xraynetwork.io/design/DESIGN-PROTOCOL.md completely and install XRAY/DESIGN in this repository."

export const upgradePrompt = "Read https://wiki.xraynetwork.io/design/DESIGN-PROTOCOL.md completely and upgrade XRAY/DESIGN in this repository."
