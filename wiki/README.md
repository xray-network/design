# XRAY Design documentation

Public URL: https://wiki.xraynetwork.io/design/

This independent Rspress app uses the SPECTRE docs structure, theme, and animated hero.
Only the hero placeholder is published. Existing reference source, where present, is retained outside the published routes.

Run commands from this directory, independently of the product workspace:

```sh
npm install --workspaces=false
npm run dev --workspaces=false
npm run typecheck --workspaces=false
npm run build --workspaces=false
npm run deploy --workspaces=false
```

Development and preview use port 10009. The `wiki-xray-design-docs` Worker serves `build/design`
through its exact path and wildcard route. Rspress builds with base `/design/`; Wrangler uploads
`build/` so requests keep that prefix. The build does not deploy.
