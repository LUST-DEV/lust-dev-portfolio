import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outputDir = join(process.cwd(), "dist", "public");
const origin = "https://lust-dev-portfolio.zone.id";
const routes = [
  {
    path: "/cgu",
    title: "Conditions générales d’utilisation — LUST DEV",
    description:
      "Consultez les conditions générales d’utilisation du portfolio public de LUST DEV.",
  },
  {
    path: "/confidentialite",
    title: "Politique de confidentialité — LUST DEV",
    description:
      "Découvrez les données traitées, les cookies et les choix de confidentialité du portfolio LUST DEV.",
  },
];

for (const route of routes) {
  const htmlPath = join(outputDir, route.path.slice(1), "index.html");
  let html = await readFile(htmlPath, "utf8");
  const canonical = `${origin}${route.path}`;
  const replacements = [
    [/<link rel="canonical" href="[^"]+" \/>/, `<link rel="canonical" href="${canonical}" />`],
    [/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${route.description}" />`],
    [/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${route.title}" />`],
    [/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${route.description}" />`],
    [/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`],
    [/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${route.title}" />`],
    [/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${route.description}" />`],
    [/<title>[^<]*<\/title>/, `<title>${route.title}</title>`],
  ];

  for (const [pattern, replacement] of replacements) {
    if (!pattern.test(html)) {
      throw new Error(`Missing metadata pattern ${pattern} in ${htmlPath}`);
    }
    html = html.replace(pattern, replacement);
  }
  await writeFile(htmlPath, html);
}
