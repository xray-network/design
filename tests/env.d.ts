// Side-effect CSS imports and raw HTML imports (Vite) for type checking the source repo.
declare module "*.css";
declare module "*.html?raw" {
  const html: string;
  export default html;
}
