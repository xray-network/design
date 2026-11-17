# XRAY/DESIGN wiki

Public URL: https://wiki.xraynetwork.io/design/

The kit's documentation and live playground, and the home of the kit's tooling. It is an Rspress app
that imports everything from `../protocol`: components (live React and HTML demos), `DESIGN-PROTOCOL.md` and each
`COMPONENT.md`. Edits in `protocol/` hot-reload in the dev server. It is deployed with every release.

Run commands from this directory, independently of the product workspace:

```sh
npm install --workspaces=false
npm run dev --workspaces=false        # http://localhost:10009/design/
npm run check:protocol --workspaces=false  # validate ../protocol and HTML <-> React parity
npm run typecheck --workspaces=false  # the wiki and every kit component
npm run build --workspaces=false      # runs check:protocol first
npm run deploy --workspaces=false
```

- `@protocol/*` resolves to `../protocol/*`; React is aliased to this app's copy, so kit components share it.
- The version on the Installation and Releases pages comes from the `Protocol-Version` line of
  `../protocol/DESIGN-PROTOCOL.md`, and the Tokens page data from its YAML header (restart `npm run dev` after
  editing either). The wiki header shows `package.json`'s version; `check:protocol` keeps the two equal.
- `scripts/publish-protocol.mjs` (run before `dev` and `build`) publishes the latest protocol as raw Markdown at
  `/design/DESIGN-PROTOCOL.md`. Earlier versions are not kept, as for SPECTRE.
- Component HTML references load as text with `?raw`.
- The kit's `core/tokens.css` is loaded globally; `core/base.css` is not, to leave the docs styles alone.
  Kit colors follow the docs appearance switch through `color-scheme`.
- `scripts/check-protocol.mjs` is the only kit check. `scripts/parity.tsx` holds the React examples it
  compares with each component's HTML reference.

Development and preview use port 10009. The `wiki-xray-design-docs` Worker serves `build/design`
through its exact path and wildcard route. Rspress builds with base `/design/`; Wrangler uploads
`build/` so requests keep that prefix. The build does not deploy.
