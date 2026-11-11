# XRAY/DESIGN

**Direct · Editable · Source · Integrated · Generative · Native**

DESIGN is being built as an HTML/React component library for XRAY products, using liquid
components: source copied directly into a project and adjusted by AI.

Components become native project code. Their markup, styles, and behavior are editable in place,
with no imports from a DESIGN package. AI adapts each component to the project's structure,
visual language, and interaction needs.

The current design standard is [`protocol/v1.0.0/DESIGN.md`](./protocol/v1.0.0/DESIGN.md).
Immutable releases under `protocol/` define the tokens, layout, components, responsive
behavior, accessibility, themes, voice, and interaction states used across XRAY interfaces.

## Documentation

The public docs app at `https://wiki.xraynetwork.io/design/` currently publishes only a
hero placeholder, using the SPECTRE documentation theme. Protocol releases and component
references remain in this repository and are not published by the default docs build.

## Repository layout

```text
.
├── protocol/
│   └── v1.0.0/
│       └── DESIGN.md
└── wiki/                 # independent Rspress placeholder wiki
    ├── reference/
    │   ├── components.json
    │   └── components.schema.json
    ├── package.json
    └── package-lock.json
```

## Development

Install dependencies inside the documentation project:

```sh
cd wiki
npm install
```

Start the documentation site:

```sh
npm run dev
```

Build the documentation site:

```sh
npm run build
```

Deploy the documentation site to `https://wiki.xraynetwork.io/design/`:

```sh
npm run deploy
```

The docs build renders `wiki/src/pages/index.mdx` only. Run
`npm run protocol:publish` explicitly to regenerate local release downloads; the placeholder
build does not call this publisher. Existing reference pages are retained in source and excluded
from the public routes. See [`wiki/README.md`](wiki/README.md) for the independent docs workflow.

The specimens currently in this repository are documentation references. The intended delivery
model is HTML/React source copied into the consuming project and adapted there by AI.

## License

DESIGN is available under the [MIT License](./LICENSE).
