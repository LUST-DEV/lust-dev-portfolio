import { ArrowLeft, ArrowUp, List, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

type LegalKind = "terms" | "privacy";

const content = {
  terms: {
    title: "Conditions générales d’utilisation",
    eyebrow: "LUST DEV / CGU",
    intro: "Ces conditions encadrent l’utilisation du portfolio public de LUST DEV.",
  },
  privacy: {
    title: "Politique de confidentialité",
    eyebrow: "LUST DEV / CONFIDENTIALITÉ",
    intro: "Cette page explique quelles données peuvent être traitées et pourquoi.",
  },
} as const;

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const page = content[kind];
  const sectionLinks = kind === "terms"
    ? ["Objet", "Utilisation acceptable", "Propriété intellectuelle", "Liens externes", "Disponibilité", "Contact"]
    : ["Données traitées", "Cookies nécessaires", "Analytics optionnel", "Services externes", "Sécurité et conservation", "Contact et droits"];

  return (
    <main className="legal-page" id="top">
      <div className="legal-shell">
        <nav className="legal-topbar" aria-label="Navigation légale">
          <Link href="/" className="legal-back"><ArrowLeft size={16} /> Retour au portfolio</Link>
          <span className="legal-status"><i /> DOCUMENT PUBLIC</span>
        </nav>
        <header className="legal-header">
          <p className="eyebrow"><ShieldCheck size={15} /> {page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className="legal-intro">{page.intro}</p>
          <p className="legal-updated">Dernière mise à jour : 3 octobre 2026 · Lecture claire, sans jargon inutile</p>
        </header>

        <nav className="legal-index" aria-label="Sections de la page">
          <span className="legal-index-title"><List size={15} /> INDEX</span>
          {sectionLinks.map((label, index) => (
            <a href={`#legal-${index + 1}`} key={label}>{String(index + 1).padStart(2, "0")} {label}</a>
          ))}
        </nav>

        {kind === "terms" ? (
          <>
            <section id="legal-1"><h2>1. Objet</h2><p>Le site présente le travail, les projets et les canaux publics de Joseph Lusty Gregoire, connu sous le nom de LUST DEV. La consultation du site est libre et gratuite.</p></section>
            <section id="legal-2"><h2>2. Utilisation acceptable</h2><p>L’utilisateur s’engage à ne pas perturber le fonctionnement du site, contourner ses mesures de sécurité, envoyer des contenus automatisés abusifs ou tenter d’exploiter une vulnérabilité.</p></section>
            <section id="legal-3"><h2>3. Propriété intellectuelle</h2><p>Les textes, éléments graphiques et créations identifiés comme LUST DEV restent protégés par les droits applicables. Les dépôts GitHub liés conservent leurs propres licences.</p></section>
            <section id="legal-4"><h2>4. Liens externes</h2><p>Les liens vers GitHub, YouTube, Telegram, WhatsApp et d’autres services mènent vers des plateformes tierces soumises à leurs propres conditions et politiques.</p></section>
            <section id="legal-5"><h2>5. Disponibilité</h2><p>Le site est fourni avec une obligation de moyens. Une interruption temporaire peut survenir pour maintenance, déploiement ou incident d’hébergement.</p></section>
            <section id="legal-6"><h2>6. Contact</h2><p>Pour toute question : <a href="mailto:lustdev927@gmail.com">lustdev927@gmail.com</a>.</p></section>
          </>
        ) : (
          <>
            <section id="legal-1"><h2>1. Données traitées</h2><p>Le portfolio ne demande pas de compte et ne contient actuellement aucun formulaire de contact ni base de données. Les informations publiées sont limitées aux coordonnées professionnelles et liens choisis par LUST DEV.</p></section>
            <section id="legal-2"><h2>2. Cookies nécessaires</h2><p>Un cookie local nommé <code>lust_cookie_consent</code> mémorise ton choix de consentement pendant 180 jours. Il sert uniquement aux préférences du site.</p></section>
            <section id="legal-3"><h2>3. Analytics optionnel</h2><p>Google Analytics 4 n’est chargé que si l’identifiant de mesure est configuré et après l’autorisation des cookies non essentiels. L’adresse IP est configurée pour être anonymisée. Sans identifiant ou sans consentement, aucun script Analytics n’est chargé.</p></section>
            <section id="legal-4"><h2>4. Services externes</h2><p>Lorsque tu ouvres un lien social, le traitement relève de la politique de la plateforme concernée. Le site ne revend pas de données et n’utilise pas de publicité personnalisée.</p></section>
            <section id="legal-5"><h2>5. Sécurité et conservation</h2><p>Aucune donnée de formulaire n’est stockée par ce site actuellement. Les protections HTTP et les limites anti-abus sont activées côté serveur pour réduire les requêtes malveillantes. reCAPTCHA est préparé pour un futur formulaire, mais n’est pas chargé tant qu’aucune action protégée n’existe.</p></section>
            <section id="legal-6"><h2>6. Contact et droits</h2><p>Pour une demande liée à la confidentialité : <a href="mailto:lustdev927@gmail.com">lustdev927@gmail.com</a>.</p></section>
          </>
        )}
        <a className="legal-top-link" href="#top"><ArrowUp size={15} /> Retour en haut</a>
      </div>
    </main>
  );
}
