# XRAY/Design

The portable interface protocol and visual component reference for XRAY products.

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

The production React components live in a separate `xray-ui` repository. The specimens here are
documentation-only references until `@xray-network/xray-ui` is published; after that, the docs
should pin and render the real package.

## License

XRAY Design is available under the [MIT License](./LICENSE).
