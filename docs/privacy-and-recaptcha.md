# Confidentialité, cookies et reCAPTCHA

## État actuel

Le portfolio ne contient pas encore de formulaire de contact. Aucun script reCAPTCHA, Analytics, publicité ou autre service non essentiel n’est donc chargé.

Le bandeau cookies enregistre uniquement le choix de consentement dans `lust_cookie_consent` avec `SameSite=Lax` et `Secure` sous HTTPS. Le bouton **Cookies** permet de rouvrir les préférences à tout moment.

## Quand un formulaire sera ajouté

1. Créer les clés reCAPTCHA dans la console Google.
2. Définir `VITE_RECAPTCHA_SITE_KEY` dans l’environnement de build frontend.
3. Définir `RECAPTCHA_SECRET_KEY` uniquement dans l’environnement serveur.
4. Ne jamais préfixer le secret par `VITE_`.
5. Appeler `getRecaptchaToken("contact")` uniquement au moment de l’envoi du formulaire.
6. Ne pas appeler cette fonction avant que l’utilisateur ait autorisé les services non essentiels.
7. Envoyer le token au backend et utiliser `verifyRecaptchaToken` avant d’accepter ou transmettre le message.
8. Refuser le formulaire si la vérification échoue, si le score est insuffisant ou si l’action ne correspond pas à `contact`.

Le site key reCAPTCHA est techniquement une clé publique nécessaire au navigateur. Le secret reste exclusivement côté serveur et ne doit jamais apparaître dans le bundle frontend, les logs, le dépôt ou les messages d’erreur.
