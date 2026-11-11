import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const repositoryRoot = resolve(scriptDirectory, "../..")
const sourceRoot = join(repositoryRoot, "protocol")
const publicRoot = join(repositoryRoot, "docs/src/pages/public")
const destinationRoot = join(publicRoot, "protocol")
const componentCatalogPath = resolve(scriptDirectory, "../reference/components.json")
const componentSchemaPath = resolve(scriptDirectory, "../reference/components.schema.json")
const releasePattern = /^v(\d+)\.(\d+)\.(\d+)$/
const canonicalOrigin = "https://wiki.xraynetwork.io/design/protocol"

const entries = await readdir(sourceRoot, { withFileTypes: true })
const releases = entries
  .filter((entry) => entry.isDirectory() && releasePattern.test(entry.name))
  .map((entry) => entry.name)
  .sort((left, right) =>
    left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" })
  )

if (releases.length === 0) {
  throw new Error("No versioned XRAY Design protocol releases were found.")
}

await rm(destinationRoot, { recursive: true, force: true })
await mkdir(destinationRoot, { recursive: true })

const manifest = []

for (const release of releases) {
  const version = release.slice(1)
  const sourceDirectory = join(sourceRoot, release)
  const standardPath = join(sourceDirectory, "DESIGN.md")
  const standard = await readFile(standardPath, "utf8")
  const expectedUrl = `${canonicalOrigin}/${release}/DESIGN.md`

  if (!standard.includes(`Standard-Version: ${version}`)) {
    throw new Error(`${release} does not declare Standard-Version: ${version}.`)
  }

  if (!standard.includes(`Canonical-URL: ${expectedUrl}`)) {
    throw new Error(`${release} does not declare its immutable canonical URL.`)
  }

  await cp(sourceDirectory, join(destinationRoot, release), { recursive: true })
  manifest.push({ version, protocol: expectedUrl })
}

const latest = manifest.at(-1)
const latestRelease = releases.at(-1)
const latestStandardPath = join(sourceRoot, latestRelease, "DESIGN.md")
const componentCatalogSource = await readFile(componentCatalogPath, "utf8")
const componentCatalog = JSON.parse(componentCatalogSource)

if (componentCatalog.protocol.version !== latest.version) {
  throw new Error("The component catalog must target the latest design protocol release.")
}

const referenceManifest = {
  protocol: {
    version: latest.version,
    url: latest.protocol
  },
  xrayUi: componentCatalog.implementation,
  components: "https://wiki.xraynetwork.io/design/components.json",
  showcase: "https://wiki.xraynetwork.io/design/components/"
}

await Promise.all([
  writeFile(
    join(destinationRoot, "index.json"),
    `${JSON.stringify({ latest: latest.version, releases: manifest }, null, 2)}\n`
  ),
  cp(componentCatalogPath, join(publicRoot, "components.json")),
  cp(componentSchemaPath, join(publicRoot, "components.schema.json")),
  writeFile(
    join(publicRoot, "manifest.json"),
    `${JSON.stringify(referenceManifest, null, 2)}\n`
  ),
  cp(latestStandardPath, join(publicRoot, "DESIGN.md"))
])

console.log(`Published ${releases.length} design release${releases.length === 1 ? "" : "s"}.`)
