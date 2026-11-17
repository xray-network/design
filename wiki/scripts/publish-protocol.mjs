#!/usr/bin/env node
// Publishes the latest design protocol as raw Markdown at /design/DESIGN-PROTOCOL.md, before every dev and build
// run (the same model as SPECTRE: only the latest version is published; earlier versions are not kept).
// The output file is generated (git-ignored).
import { copyFileSync, mkdirSync, readFileSync, rmSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { protocolMeta } from "./tokens.mjs"

const WIKI = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const SOURCE = resolve(WIKI, "../protocol/DESIGN-PROTOCOL.md")
const PUBLIC = join(WIKI, "src/pages/public")

const { id, version } = protocolMeta(readFileSync(SOURCE, "utf8"))
if (id !== "xray/design" || !/^\d+\.\d+\.\d+$/.test(version))
  throw new Error("protocol/DESIGN-PROTOCOL.md must declare Protocol-ID: xray/design and Protocol-Version.")

// Remove versioned folders left by earlier publications.
rmSync(join(PUBLIC, "protocol"), { recursive: true, force: true })
mkdirSync(PUBLIC, { recursive: true })
copyFileSync(SOURCE, join(PUBLIC, "DESIGN-PROTOCOL.md"))
console.log(`Published XRAY/DESIGN protocol ${version}.`)
