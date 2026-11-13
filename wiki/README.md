# XRAY/DESIGN wiki

Public URL: https://wiki.xraynetwork.io/design/

The kit's documentation and live playground, and the home of the kit's tooling. It is an Rspress app
that imports everything from `../kit`: components (live React and HTML demos), `RULES.md` and each
`COMPONENT.md`. Edits in `kit/` hot-reload in the dev server. It is deployed with every kit release.

Run commands from this directory, independently of the product workspace:

```sh
npm install --workspaces=false
npm run dev --workspaces=false        # http://localhost:10009/design/
npm run check:kit --workspaces=false  # validate ../kit and HTML <-> React parity
npm run typecheck --workspaces=false  # the wiki and every kit component
npm run build --workspaces=false      # runs check:kit first
npm run deploy --workspaces=false
```

- `@kit/*` resolves to `../kit/*`; React is aliased to this app's copy, so kit components share it.
- The version shown in the sidebar and in the install prompts comes from `../kit/VERSION`.
- Component HTML references load as text with `?raw`.
- The kit's `core/tokens.css` is loaded globally; `core/base.css` is not, to leave the docs styles alone.
  Kit colors follow the docs appearance switch through `color-scheme`.
- `scripts/check-kit.mjs` is the only kit check. `scripts/parity.tsx` holds the React examples it
  compares with each component's HTML reference.

Development and preview use port 10009. The `wiki-xray-design-docs` Worker serves `build/design`
through its exact path and wildcard route. Rspress builds with base `/design/`; Wrangler uploads
`build/` so requests keep that prefix. The build does not deploy.
