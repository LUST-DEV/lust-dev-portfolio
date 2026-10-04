# LUST DEV — Portfolio public

> **Du code qui prend position.**

![Emblème LUST DEV](docs/lust-logo.jpg)

Portfolio personnel de **Joseph Lusty Gregoire**, connu sous le nom de **LUST DEV** : développeur indépendant haïtien, créateur de bots, d’outils et d’expériences numériques pensées pour être utiles, lisibles et accessibles.

[![Déployer avec Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/LUST-DEV/lust-dev-portfolio)
[![Licence MIT](https://img.shields.io/badge/license-MIT-20304a.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)

[![GitHub — LUST DEV](https://img.shields.io/badge/GitHub-LUST--DEV-181717?logo=github&logoColor=white)](https://github.com/LUST-DEV)
[![YouTube — LUST DEV](https://img.shields.io/badge/YouTube-LUST--DEV-FF0000?logo=youtube&logoColor=white)](https://www.youtube.com/@LUSTDEV)
[![WhatsApp — Canal LUST DEV](https://img.shields.io/badge/WhatsApp-Canal_LUST_DEV-25D366?logo=whatsapp&logoColor=white)](https://whatsapp.com/channel/0029VbCiqwyBVJl3Jv5T4I15)
[![Telegram — @yokubo666](https://img.shields.io/badge/Telegram-%40yokubo666-229ED9?logo=telegram&logoColor=white)](https://t.me/yokubo666)

## Présentation

LUST DEV est né en Haïti, le 28 janvier. À 16 ans, Joseph crée son premier projet HTML à **Eagle Stream Academy**. Passionné par la programmation, la technologie et le hacking éthique, il cherche à comprendre le fonctionnement des choses et apprend chaque jour par la pratique.

Le site est un espace public pour explorer ses projets open source, ses outils d’automatisation et son identité numérique. Il privilégie une direction artistique sombre et expressive : typographie nette, labels courts, pluie de particules, effets glow, animations de touches et lecture confortable sur mobile comme sur grand écran.

### Repères

| Repère | Détail |
|---|---|
| Identité | LUST DEV / Joseph Lusty Gregoire |
| Alias | LUST DEV · signature : joseph |
| Profil | Développeur indépendant haïtien, basé à Delmas |
| Parcours | Premier projet HTML à 16 ans · Eagle Stream Academy |
| Terrains | Bots, outils, scripts, automatisation et interfaces web |
| Socle maîtrisé | HTML5, CSS3 et JavaScript |
| En progression | Python, TypeScript, React et Node.js |
| Interface | React + Vite + TypeScript, thème sombre privilégié |
| Déploiement recommandé | Vercel depuis GitHub |
| Langue principale | Français |
| Licence du portfolio | MIT |

## Projets mis en avant

- **[LUST-XMD](https://github.com/LUST-DEV/LUST-XMD)** — toolkit JavaScript orienté bots et expériences automatisées.
- **[SavageHackCheck](https://github.com/LUST-DEV/SavageHackCheck)** — utilitaire Python centré sur les scripts et la vérification.
- **[GOKU-MD](https://github.com/LUST-DEV/GOKU-MD)** — projet open source à explorer dans l’écosystème public LUST DEV.

La liste complète est disponible sur le [profil GitHub de LUST DEV](https://github.com/LUST-DEV).

## Vérification GitHub Actions

L’ancienne workflow GitHub Pages échouait car GitHub Pages n’était pas activé sur le dépôt. Comme le déploiement cible est Vercel, cette workflow a été remplacée par une CI qui vérifie le typecheck, le build et l’audit des dépendances.

!
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

## Labels et liens officiels

| Canal | Lien |
|---|---|
| **GitHub** | [LUST-DEV · repositories](https://github.com/LUST-DEV) |
| **YouTube** | [LUST DEV · tutoriels et vidéos](https://www.youtube.com/@LUSTDEV) |
| **WhatsApp** | [Support direct · +1 829 478 6326](https://wa.me/18294786326) · [Canal LUST DEV](https://whatsapp.com/channel/0029VbCiqwyBVJl3Jv5T4I15) |
| **Telegram** | [@yokubo666 · messages directs](https://t.me/yokubo666) |
| **Telegram Joseph** | [@JOSEPHLUSTY · contact](https://t.me/JOSEPHLUSTY) |

## Team Telegram

Les labels **Team Telegram** du site ouvrent les profils publics suivants :

[@NONO_HES](https://t.me/NONO_HES) · [@tresor20001](https://t.me/tresor20001) · [@MCKINGER](https://t.me/MCKINGER) · [@Savage_HackzzzzzzZ](https://t.me/Savage_HackzzzzzzZ) · [@devsubzero_09](https://t.me/devsubzero_09) · [@baek_siyun](https://t.me/baek_siyun) · [@Druzzdev2](https://t.me/Druzzdev2) · [@devxkairo](https://t.me/devxkairo) · [@Dev_Roan](https://t.me/Dev_Roan) · [@Cid_404lost](https://t.me/Cid_404lost) · [@Devmichael00](https://t.me/Devmichael00)

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
| `VITE_GA_MEASUREMENT_ID` | Publique | Google Analytics 4, chargé uniquement après consentement |

Le secret `RECAPTCHA_SECRET_KEY` ne doit jamais commencer par `VITE_` et ne doit jamais apparaître dans le bundle frontend.

### Où trouver et ajouter les variables dans Vercel

Dans ton projet Vercel : **Settings → Environment Variables → Add New**. Sélectionne au minimum **Production** et **Preview**, puis redeploie depuis **Deployments → Redeploy**.

- `VITE_GA_MEASUREMENT_ID` : Google Analytics → **Admin → Data collection and modification → Data streams → Web → ton flux → Measurement ID**. Identifiant configuré : `G-HD46DQXB9H`. Le script est chargé uniquement après l’autorisation des cookies non essentiels.
- `VITE_RECAPTCHA_SITE_KEY` : [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin) → créer un site → clé **Site key**. À ajouter seulement lorsqu’un formulaire protégé sera activé.
- `RECAPTCHA_SECRET_KEY` : dans la même fiche reCAPTCHA → clé **Secret key**. Vercel doit la recevoir comme variable serveur privée ; ne la préfixe jamais par `VITE_` et ne la mets jamais dans le README.
- `VITE_FRONTEND_FORGE_API_KEY` et `VITE_FRONTEND_FORGE_API_URL` : uniquement si la carte est activée ; utilise les valeurs fournies par ton intégration Forge et restreins la clé par domaine.
- `VITE_APP_ID` et `VITE_OAUTH_PORTAL_URL` : uniquement si la connexion OAuth est activée ; récupère-les depuis le fournisseur OAuth concerné.

La connexion Vercel/GitHub ne nécessite **aucune variable API** : Vercel utilise son intégration GitHub. Le domaine Vercel fonctionne sans VPS.

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
