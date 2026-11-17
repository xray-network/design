import type { CSSProperties, ReactNode } from "react"
import "./tokens.css"

type Token = { name: string; light: string; dark: string; note: string }
type Group = { group: string; tokens: Token[] }

// Parsed from DESIGN-PROTOCOL.md's header by rspress.config.ts.
const GROUPS: Group[] = JSON.parse(process.env.DESIGN_TOKENS ?? "[]")
const byName = (group: string) => GROUPS.find((g) => g.group === group)?.tokens ?? []

const cssVar = (name: string) => `var(--x-${name})`
const Name = ({ name }: { name: string }) => <span className="wiki-token-name">--x-{name}</span>
const Value = ({ token }: { token: Token }) =>
  token.light === token.dark ? (
    <span className="wiki-token-value">{token.light}</span>
  ) : (
    <span className="wiki-token-pair">
      <span className="wiki-token-value"><span>light</span> {token.light}</span>
      <span className="wiki-token-value"><span>dark</span> {token.dark}</span>
    </span>
  )

function Table({ tokens, sample, head }: { tokens: Token[]; sample?: (t: Token) => ReactNode; head?: string }) {
  return (
    <div className="wiki-token-table" role="table">
      {tokens.map((t) => (
        <div className="wiki-token-row" role="row" key={t.name}>
          {sample && <div className="wiki-token-sample" role="cell" aria-label={head}>{sample(t)}</div>}
          <div className="wiki-token-meta" role="cell">
            <Name name={t.name} />
            {t.note && <span className="wiki-token-note">{t.note}</span>}
          </div>
          <div className="wiki-token-values" role="cell"><Value token={t} /></div>
        </div>
      ))}
    </div>
  )
}

/** Both themes side by side: the same token rendered under data-theme="light" and data-theme="dark". */
const Swatches = ({ name }: { name: string }) => (
  <span className="wiki-swatch-pair">
    {(["light", "dark"] as const).map((theme) => (
      <span key={theme} className="wiki-swatch-frame" data-theme={theme}>
        <span className="wiki-swatch" style={{ background: cssVar(name) }} title={`${theme}: --x-${name}`} />
      </span>
    ))}
  </span>
)

export const PaletteTokens = () => (
  <div className="wiki-palette">
    {byName("palette").map((t) => (
      <div className="wiki-palette-chip" key={t.name}>
        <span className="wiki-swatch" style={{ background: cssVar(t.name) }} />
        <span className="wiki-palette-name">{t.name}</span>
        <span>{t.light}</span>
      </div>
    ))}
  </div>
)

export const ColorTokens = () => <Table tokens={byName("color")} head="Light and dark" sample={(t) => <Swatches name={t.name} />} />

export const FontTokens = () => (
  <Table tokens={byName("font")} sample={(t) => <span style={{ fontFamily: cssVar(t.name), fontSize: 16 }}>addr1q…lkgc86</span>} />
)

export const TextTokens = () => (
  <Table tokens={byName("text")} sample={(t) => <span style={{ fontSize: cssVar(t.name), lineHeight: 1.1, fontWeight: 600 }}>Aa 12.40</span>} />
)

export const WeightTokens = () => (
  <Table tokens={byName("weight")} sample={(t) => <span style={{ fontWeight: cssVar(t.name), fontSize: 18 }}>12,480.25</span>} />
)

export const TypeTokens = () => <Table tokens={byName("type")} />

export const SpaceTokens = () => (
  <Table tokens={byName("space")} sample={(t) => <span className="wiki-space-bar" style={{ width: cssVar(t.name) }} />} />
)

export const RadiusTokens = () => (
  <Table tokens={byName("radius")} sample={(t) => <span className="wiki-radius-box" style={{ borderRadius: cssVar(t.name) } as CSSProperties} />} />
)

export const SizeTokens = () => (
  <Table
    tokens={byName("size")}
    sample={(t) =>
      t.name.startsWith("size-") ? <span className="wiki-size-box" style={{ height: cssVar(t.name) }} />
      : t.name.startsWith("icon-") ? <span className="wiki-size-box" style={{ width: cssVar(t.name), height: cssVar(t.name) }} />
      : null}
  />
)

export const MotionTokens = () => <Table tokens={byName("motion")} />

export const LayerTokens = () => <Table tokens={byName("layer")} />
