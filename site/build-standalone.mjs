import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const siteDir = resolve(root, "site");

const docs = [
  ["course", "docs/agent-thinking-course.md"],
  ["abstract", "docs/agent-thinking-abstract.md"],
  ["prompts", "docs/agent-thinking-prompt-library.md"],
];

const assets = [
  "docs/assets/agent-thinking-hero.svg",
  "docs/assets/agent-loop.svg",
  "docs/assets/audience-map.svg",
];

function read(path) {
  return readFileSync(resolve(root, path), "utf8");
}

function svgDataUri(path) {
  const svg = read(path);
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

const embeddedDocs = Object.fromEntries(docs.map(([id, path]) => [id, read(path)]));
const embeddedAssets = Object.fromEntries(
  assets.flatMap((path) => {
    const uri = svgDataUri(path);
    const relative = path.replace(/^docs\//, "");
    return [
      [`/${path}`, uri],
      [path, uri],
      [relative, uri],
    ];
  }),
);

let html = readFileSync(resolve(siteDir, "index.html"), "utf8");
const css = readFileSync(resolve(siteDir, "styles.css"), "utf8");
const js = readFileSync(resolve(siteDir, "app.js"), "utf8");
const favicon = svgDataUri("site/favicon.svg");

html = html
  .replace('<link rel="icon" href="./favicon.svg" type="image/svg+xml" />', `<link rel="icon" href="${favicon}" type="image/svg+xml" />`)
  .replace('<link rel="stylesheet" href="./styles.css" />', `<style>\n${css}\n</style>`)
  .replaceAll('../docs/assets/agent-thinking-hero.svg', embeddedAssets["/docs/assets/agent-thinking-hero.svg"])
  .replaceAll('../docs/assets/agent-loop.svg', embeddedAssets["/docs/assets/agent-loop.svg"])
  .replaceAll('../docs/assets/audience-map.svg', embeddedAssets["/docs/assets/audience-map.svg"])
  .replaceAll('/docs/assets/agent-thinking-hero.svg', embeddedAssets["/docs/assets/agent-thinking-hero.svg"])
  .replaceAll('/docs/assets/agent-loop.svg', embeddedAssets["/docs/assets/agent-loop.svg"])
  .replaceAll('/docs/assets/audience-map.svg', embeddedAssets["/docs/assets/audience-map.svg"])
  .replace(
    '<script src="./app.js"></script>',
    () => `<script>\nwindow.__EMBEDDED_DOCS__ = ${JSON.stringify(embeddedDocs)};\nwindow.__EMBEDDED_ASSETS__ = ${JSON.stringify(embeddedAssets)};\n</script>\n<script>\n${js}\n</script>`,
  );

writeFileSync(resolve(siteDir, "standalone.html"), html);
console.log("Generated site/standalone.html");
