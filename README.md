# XRAY Design

The portable interface protocol and visual component reference for XRAY products.

The current design standard is [`protocol/v1.0.0/DESIGN.md`](./protocol/v1.0.0/DESIGN.md).
Immutable releases under `protocol/` define the tokens, layout, components, responsive
behavior, accessibility, themes, voice, and interaction states used across XRAY interfaces.

## Published resources

- `https://wiki.xraynetwork.io/design/` — documentation
- `https://wiki.xraynetwork.io/design/DESIGN.md` — current release
- `https://wiki.xraynetwork.io/design/protocol/v1.0.0/DESIGN.md` — immutable 1.0.0 release

## Repository layout

```text
.
├── protocol/
│   └── v1.0.0/
│       └── DESIGN.md
└── docs/                 # Rspress protocol and component showcase
    ├── reference/
    │   ├── components.json
    │   └── components.schema.json
    ├── package.json
    └── package-lock.json
```

## Development

Install dependencies inside the documentation project:

```sh
cd docs
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

The documentation build validates the versioned releases and publishes the rendered protocol,
component specimens, released source files, and machine-readable manifests. It generates the
current-release `/design/DESIGN.md` download from the latest release under `protocol/`.
Generated release files live only under `docs/src/pages/public/`;
the landing page at `docs/src/pages/index.mdx` is maintained source.

The production React components live in a separate `xray-ui` repository. The specimens here are
documentation-only references until `@xray-network/xray-ui` is published; after that, the docs
should pin and render the real package.

## License

XRAY Design is available under the [MIT License](./LICENSE).
