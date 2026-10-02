# LUST DEV — Portfolio public

> **Du code qui prend position.**

Portfolio personnel de **Lusty Joseph**, connu sous le nom de **LUST DEV** : développeur indépendant haïtien, créateur de bots, d’outils et d’expériences numériques pensées pour être utiles, lisibles et accessibles.

[![Déployer avec Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/LUST-DEV/lust-dev-portfolio)
[![Licence MIT](https://img.shields.io/badge/license-MIT-20304a.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)

## Présentation

LUST DEV est un espace public pour explorer des projets open source, des outils d’automatisation et une identité numérique en construction. Le site privilégie une direction artistique éditoriale : typographie nette, labels courts, contrastes doux, animations discrètes et lecture confortable sur mobile comme sur grand écran.

### Repères

| Repère | Détail |
|---|---|
| Identité | LUST DEV / Lusty Joseph |
| Profil | Développeur indépendant haïtien |
| Terrains | Bots, outils, scripts, automatisation et interfaces web |
| Technologies | JavaScript, Python, TypeScript, React, Node.js et CSS3 |
| Interface | React + Vite + TypeScript |
| Déploiement recommandé | Vercel depuis GitHub |
| Langue principale | Français |
| Licence du portfolio | MIT |

## Projets mis en avant

- **[LUST-XMD](https://github.com/LUST-DEV/LUST-XMD)** — toolkit JavaScript orienté bots et expériences automatisées.
- **[SavageHackCheck](https://github.com/LUST-DEV/SavageHackCheck)** — utilitaire Python centré sur les scripts et la vérification.
- **[GOKU-MD](https://github.com/LUST-DEV/GOKU-MD)** — projet open source à explorer dans l’écosystème public LUST DEV.

La liste complète est disponible sur le [profil GitHub de LUST DEV](https://github.com/LUST-DEV).

## Fonctionnalités du site

- design éditorial responsive avec mode clair et mode sombre ;
- labels de navigation et cartes de projets raffinés ;
- pluie de particules et micro-animations accessibles ;
- prise en charge de `prefers-reduced-motion` ;
- image Open Graph `1200 × 630` pour les aperçus de liens ;
- sitemap, robots.txt, canonical URL et données structurées JSON-LD ;
- bannière de consentement et bouton de gestion des cookies ;
- aucun service non essentiel chargé avant le consentement ;
- préparation reCAPTCHA différée pour un futur formulaire de contact ;
- dépendances de production auditées et sans vulnérabilité connue au dernier contrôle.

## Contact professionnel

- **E-mail :** [lustdev927@gmail.com](mailto:lustdev927@gmail.com)
- **Téléphone :** [+1 829 478 6326](tel:+18294786326)

## Canaux officiels

| Canal | Lien |
|---|---|
| GitHub | [github.com/LUST-DEV](https://github.com/LUST-DEV) |
| YouTube | [Chaîne LUST DEV](https://youtube.com/channel/UC7R0pFFLu6vSYblJGLQrVCQ?si=nfIhDsGTLOTQX2Af) |
| WhatsApp | [Canal LUST DEV](https://whatsapp.com/channel/0029VbCiqwyBVJl3Jv5T4I15) |
| Telegram | [@yokubo666](https://t.me/yokubo666) |

## Installation locale

Pré-requis : Node.js 22 ou version compatible et pnpm 10.

```bash
git clone https://github.com/LUST-DEV/lust-dev-portfolio.git
cd lust-dev-portfolio
pnpm install --frozen-lockfile
pnpm run dev
```

Contrôles disponibles :

```bash
pnpm run check       # vérification TypeScript
pnpm run build       # build client et serveur
pnpm audit --prod    # audit des dépendances de production
```

## Variables d’environnement

Les noms sont documentés dans [`.env.example`](.env.example). Ne publie jamais les valeurs réelles dans GitHub.

| Variable | Exposition | Utilisation |
|---|---|---|
| `VITE_RECAPTCHA_SITE_KEY` | Publique | Clé navigateur reCAPTCHA, uniquement lorsqu’un formulaire sera ajouté |
| `RECAPTCHA_SECRET_KEY` | Serveur uniquement | Vérification backend reCAPTCHA |
| `VITE_FRONTEND_FORGE_API_KEY` | Publique, à restreindre | Composant Maps éventuel |
| `VITE_FRONTEND_FORGE_API_URL` | Publique | URL du proxy Maps |
| `VITE_APP_ID` | Publique | Identifiant d’application éventuel |
| `VITE_OAUTH_PORTAL_URL` | Publique | Portail OAuth éventuel |

Le secret `RECAPTCHA_SECRET_KEY` ne doit jamais commencer par `VITE_` et ne doit jamais apparaître dans le bundle frontend.

## Déploiement avec Vercel

1. Ouvre [Importer le projet dans Vercel](https://vercel.com/new/clone?repository-url=https://github.com/LUST-DEV/lust-dev-portfolio).
2. Sélectionne le dépôt `LUST-DEV/lust-dev-portfolio`.
3. Utilise les paramètres suivants :

```text
Framework Preset: Vite
Install Command: pnpm install --frozen-lockfile
Build Command: pnpm run build
Output Directory: dist/public
Production Branch: main
```

Vercel déploiera automatiquement chaque nouveau push sur `main` et générera des URLs Preview pour les autres branches. Un domaine gratuit `vercel.app` est fourni sans VPS ni achat de domaine.

## Confidentialité et reCAPTCHA

Le site utilise uniquement un cookie nécessaire pour mémoriser le choix de consentement et les préférences d’interface. Aucun Analytics, publicité ou reCAPTCHA n’est chargé avant consentement. La préparation complète est documentée dans [`docs/privacy-and-recaptcha.md`](docs/privacy-and-recaptcha.md).

## Indexation

Le dépôt inclut les signaux techniques nécessaires : `robots.txt`, sitemap, canonical URL, Open Graph, image sociale et JSON-LD. Après le déploiement Vercel, ajoute l’URL publique dans [Google Search Console](https://search.google.com/search-console/about), puis demande l’indexation de la page d’accueil.

## Licence

Le portfolio est distribué sous licence [MIT](LICENSE). Les projets présentés conservent leurs propres licences et conditions d’utilisation.
