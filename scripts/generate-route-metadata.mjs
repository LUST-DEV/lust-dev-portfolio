import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { createServer } from "vite";

const outputDir = join(process.cwd(), "dist", "public");
const origin = "https://lust-dev-portfolio.zone.id";
const locales = [
  { code: "fr", htmlLang: "fr", ogLocale: "fr_FR", prefix: "" },
  { code: "en", htmlLang: "en", ogLocale: "en_US", prefix: "/en" },
  { code: "es", htmlLang: "es", ogLocale: "es_ES", prefix: "/es" },
  { code: "ht", htmlLang: "ht", ogLocale: "ht_HT", prefix: "/ht" },
];
const pages = [
  {
    suffix: "",
    titles: {
      fr: "Joseph Lusty Gregoire — LUST DEV",
      en: "Joseph Lusty Gregoire — LUST DEV | Developer Portfolio",
      es: "Joseph Lusty Gregoire — LUST DEV | Portafolio",
      ht: "Joseph Lusty Gregoire — LUST DEV | Pòtfèy",
    },
    descriptions: {
      fr: "Portfolio de Joseph Lusty Gregoire, LUST DEV : projets, développement, outils et canaux publics.",
      en: "The portfolio of Joseph Lusty Gregoire, LUST DEV: development projects, tools, and public channels.",
      es: "Portafolio de Joseph Lusty Gregoire, LUST DEV: proyectos de desarrollo, herramientas y canales públicos.",
      ht: "Pòtfèy Joseph Lusty Gregoire, LUST DEV: pwojè devlopman, zouti ak chanèl piblik.",
    },
  },
  {
    suffix: "/cgu",
    titles: {
      fr: "Conditions générales d’utilisation — LUST DEV",
      en: "Terms of Use — LUST DEV",
      es: "Términos de uso — LUST DEV",
      ht: "Kondisyon itilizasyon — LUST DEV",
    },
    descriptions: {
      fr: "Consultez les conditions générales d’utilisation du portfolio public de LUST DEV.",
      en: "Read the terms governing use of the public LUST DEV portfolio.",
      es: "Consulta las condiciones de uso del portafolio público de LUST DEV.",
      ht: "Li kondisyon pou itilize pòtfèy piblik LUST DEV la.",
    },
  },
  {
    suffix: "/confidentialite",
    titles: {
      fr: "Politique de confidentialité — LUST DEV",
      en: "Privacy Policy — LUST DEV",
      es: "Política de privacidad — LUST DEV",
      ht: "Règleman sou konfidansyalite — LUST DEV",
    },
    descriptions: {
      fr: "Découvrez les données traitées, les cookies et les choix de confidentialité du portfolio LUST DEV.",
      en: "Learn about data processing, cookies, and privacy choices on the LUST DEV portfolio.",
      es: "Conoce el tratamiento de datos, las cookies y las opciones de privacidad del portafolio LUST DEV.",
      ht: "Aprann sou tretman done, cookies ak chwa konfidansyalite nan pòtfèy LUST DEV la.",
    },
  },
];

function escaped(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}
function setTag(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`Missing ${label} in generated HTML`);
  return html.replace(pattern, replacement);
}
function routeFor(locale, suffix) {
  return `${locale.prefix}${suffix}` || "/";
}

const htmlTemplate = await readFile(join(outputDir, "index.html"), "utf8");
const sitemapItems = [];
const vite = await createServer({
  configFile: join(process.cwd(), "vite.config.ts"),
  mode: "production",
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
  logLevel: "error",
});

try {
  const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
  for (const page of pages) {
    const alternates = locales.map((locale) => ({
      locale,
      url: `${origin}${routeFor(locale, page.suffix)}`,
    }));
    const xDefaultUrl = `${origin}${routeFor(locales[0], page.suffix)}`;
    const alternateTags = [
      ...alternates.map(({ locale, url }) => `    <link rel="alternate" hreflang="${locale.code}" href="${url}" />`),
      `    <link rel="alternate" hreflang="x-default" href="${xDefaultUrl}" />`,
    ].join("\n");

    for (const { locale } of alternates) {
      const route = routeFor(locale, page.suffix);
      const canonical = `${origin}${route}`;
      let html = htmlTemplate;
      html = setTag(html, /<html lang="[^"]+">/, `<html lang="${locale.htmlLang}">`, "html lang");
      html = setTag(html, /<title>[^<]*<\/title>/, `<title>${escaped(page.titles[locale.code])}</title>`, "title");
      html = setTag(html, /<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escaped(page.descriptions[locale.code])}" />`, "description");
      html = setTag(html, /<meta property="og:locale" content="[^"]*"\s*\/>/, `<meta property="og:locale" content="${locale.ogLocale}" />`, "Open Graph locale");
      html = setTag(html, /<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escaped(page.titles[locale.code])}" />`, "Open Graph title");
      html = setTag(html, /<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escaped(page.descriptions[locale.code])}" />`, "Open Graph description");
      html = setTag(html, /<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`, "Open Graph URL");
      html = setTag(html, /<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escaped(page.titles[locale.code])}" />`, "Twitter title");
      html = setTag(html, /<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escaped(page.descriptions[locale.code])}" />`, "Twitter description");
      html = setTag(html, /<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`, "canonical");
      html = setTag(html, /<\/head>/, `${alternateTags}\n  </head>`, "head end");
      html = html.replaceAll('src="./', "src=\"/").replaceAll('href="./', "href=\"/");
      html = html.replace('"inLanguage": "fr-FR"', `"inLanguage": "${locale.code === "ht" ? "ht-HT" : locale.code === "en" ? "en" : locale.code === "es" ? "es" : "fr-FR"}"`);
      const renderedBody = render(route);
      if (!renderedBody.includes("<main")) throw new Error(`Prerendered body missing main landmark for ${route}`);
      html = setTag(html, /<div id="root"><\/div>/, `<div id="root">${renderedBody}</div>`, "React root");

      const filePath = route === "/" ? join(outputDir, "index.html") : join(outputDir, `${route.slice(1)}.html`);
      await mkdir(dirname(filePath), { recursive: true });
      await writeFile(filePath, html);
      sitemapItems.push({ route, alternatives: alternates });
    }
  }
} finally {
  await vite.close();
}

const urlEntries = sitemapItems.map(({ route, alternatives }) => {
  const languages = alternatives.map(({ locale, url }) => `    <xhtml:link rel="alternate" hreflang="${locale.code}" href="${url}" />`).join("\n");
  const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${origin}${routeFor(locales[0], route.slice(locales.find((locale) => locale.prefix && route.startsWith(`${locale.prefix}/`))?.prefix.length ?? 0))}" />`;
  return `  <url>\n    <loc>${origin}${route}</loc>\n${languages}\n${xDefault}\n  </url>`;
}).join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urlEntries}\n</urlset>\n`;
await writeFile(join(outputDir, "sitemap.xml"), sitemap);
console.log(`Generated ${sitemapItems.length} localized HTML routes and sitemap alternates.`);
