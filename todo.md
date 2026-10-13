# Révision — LUST DEV

## À faire

## Langues, README et sitemap

- [x] Ajouter un sélecteur de langue dans le site pour français, anglais, espagnol et créole haïtien, avec mémorisation du choix, détection initiale de la langue du navigateur et mise à jour de `lang` sur le document.
- [x] Traduire les textes visibles de l’accueil, des pages légales et de la bannière de cookies dans les langues du sélecteur, sans changer les liens ou les données de contact.
- [x] Simplifier le README en retirant les variables d’environnement, les consignes Search Console et les détails techniques non nécessaires; conserver une courte présentation, l’équipe Telegram, le favicon/logo, les liens publics, le démarrage local, le sitemap et la licence.
- [x] Vérifier que le sitemap public reste cohérent avec les routes canoniques, le lien sitemap fonctionne, et les contrôles et le build passent.

## Harmonisation des thèmes et de l’animation

- [x] Utiliser une seule couche de particules sur l’accueil, les pages légales et les autres routes existantes; conserver les clics, la sélection de texte et le défilement.
- [x] Harmoniser les couleurs en mode clair Sky Blue et en mode sombre Blue Night; synchroniser les couleurs des particules avec le thème partagé et persister le thème lors de la navigation.
- [x] Réduire les particules sur mobile et respecter `prefers-reduced-motion` en conservant un fond adapté au thème.
- [x] Vérifier les types, le build, les routes et le comportement de la couche; ne pas ajouter reCAPTCHA à un site sans connexion ni formulaire protégé.

## Nouvelle refonte — direction professionnelle

- [x] Remplacer le vocabulaire hacker/terminal par une esthétique web professionnelle, éditoriale et accueillante.
- [x] Recomposer les sections avec davantage d’espace, des surfaces claires et une hiérarchie plus calme.
- [x] Introduire une palette ivoire, sable, bleu profond et corail, sans perdre le lien avec LUST DEV.
- [x] Remplacer les animations fortes par des transitions CSS3 sobres : reveal, glissement, underline et flottement léger.
- [x] Ajouter des symboles visuels aux liens : GitHub, YouTube, WhatsApp, Telegram et flèches d’exploration.
- [x] Vérifier la responsivité, le contraste, les états focus et `prefers-reduced-motion`.
- [x] Créer un checkpoint et synchroniser la refonte sur le dépôt GitHub public.

## Mode clair / sombre

- [x] Ajouter un bouton accessible de basculement dans la navigation.
- [x] Persister le choix du thème dans le navigateur et respecter la préférence système au premier chargement.
- [x] Définir un mode sombre élégant avec contrastes lisibles et animations cohérentes.
- [x] Tester le bouton, les deux thèmes, le mobile et `prefers-reduced-motion`.
- [x] Sauvegarder la version et synchroniser le dépôt GitHub public.

## Compétences techniques

- [x] Ajouter une section dédiée entre le profil et les projets.
- [x] Présenter JavaScript, Python, TypeScript, React, Node.js et CSS3 avec des niveaux de maîtrise clairement libellés.
- [x] Animer les barres de progression avec CSS3, sans animation intrusive et avec `prefers-reduced-motion`.
- [x] Adapter les couleurs et les contrastes aux modes clair et sombre.
- [x] Tester la section sur desktop et mobile, puis sauvegarder et synchroniser la version publique.
