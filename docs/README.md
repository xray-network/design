# XRAY Design documentation

The documentation site presents the XRAY Design landing page and component references, publishes
immutable releases from `../protocol`, and generates a machine-readable release manifest. The
publisher writes release assets only under `src/pages/public/` and does not overwrite the landing
page.

```sh
npm install
npm run dev
```

Build with `npm run build` and deploy the `wiki-xray-design-docs` Cloudflare Worker with
`npm run deploy`.
