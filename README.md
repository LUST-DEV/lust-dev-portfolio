# LUST DEV — Portfolio

Portfolio personnel de **LUST DEV** : une vitrine web pour présenter ses projets, son univers visuel et ses activités de développement.

**Site :** [lust-dev-portfolio.zone.id](https://lust-dev-portfolio.zone.id/)

## Dans l’interface

- Accueil éditorial responsive avec navigation vers les projets et les profils publics.
- Identité visuelle bleu nuit et bleu clair, avec thèmes sombre et clair.
- Pages dédiées aux conditions d’utilisation et à la confidentialité.
- Préférences de cookies et prise en charge de `prefers-reduced-motion`.

## Technologies

React · TypeScript · Vite · Tailwind CSS

## Développement local

Prérequis : Node.js et pnpm.

```bash
git clone https://github.com/LUST-DEV/lust-dev-portfolio.git
cd lust-dev-portfolio
pnpm install --frozen-lockfile
pnpm run dev
```

Vérifier le code et produire le build :

```bash
pnpm run check
pnpm run build
```

## Déploiement

Le projet est déployé sur Vercel depuis la branche `main`. Les mises à jour poussées sur cette branche déclenchent le déploiement de production.

## Licence

[MIT](LICENSE)
