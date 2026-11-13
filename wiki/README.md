# XRAY/DESIGN wiki

Public URL: https://wiki.xraynetwork.io/design/

The kit's documentation and live playground. It is an Rspress app that imports everything from
`../src`: components (live React and HTML demos), `RULES.md`, each `COMPONENT.md` and `INSTALL.md`.
Edits in `src/` hot-reload in the dev server. It is deployed with every kit release.

Run commands from this directory, independently of the product workspace:

```sh
npm install --workspaces=false
npm run dev --workspaces=false        # http://localhost:10009/design/
npm run typecheck --workspaces=false
npm run build --workspaces=false
npm run deploy --workspaces=false
```

- `@kit/*` resolves to `../src/*`; React is aliased to this app's copy, so kit components share it.
- Component HTML references load as text with `?raw`.
- The kit's `tokens.css` is loaded globally; `base.css` is not, to leave the docs styles alone.
  Kit colors follow the docs appearance switch through `color-scheme`.

Development and preview use port 10009. The `wiki-xray-design-docs` Worker serves `build/design`
through its exact path and wildcard route. Rspress builds with base `/design/`; Wrangler uploads
`build/` so requests keep that prefix. The build does not deploy.
