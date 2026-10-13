import { useEffect } from "react";
import { ArrowLeft, ArrowUp, List, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

type LegalKind = "terms" | "privacy";
type LegalSection = { title: string; body: string };

const content: Record<LegalKind, { title: string; eyebrow: string; intro: string; sections: LegalSection[] }> = {
  terms: {
    title: "Conditions générales d’utilisation",
    eyebrow: "LUST DEV / CGU",
    intro: "Ces conditions encadrent l’utilisation du portfolio public de LUST DEV.",
    sections: [
      { title: "Objet", body: "Le site présente le travail, les projets et les canaux publics de Joseph Lusty Gregoire, connu sous le nom de LUST DEV. La consultation du site est libre et gratuite." },
      { title: "Utilisation acceptable", body: "L’utilisateur s’engage à ne pas perturber le fonctionnement du site, contourner ses mesures de sécurité, envoyer des contenus automatisés abusifs ou tenter d’exploiter une vulnérabilité." },
      { title: "Propriété intellectuelle", body: "Les textes, éléments graphiques et créations identifiés comme LUST DEV restent protégés par les droits applicables. Les dépôts GitHub liés conservent leurs propres licences." },
      { title: "Liens externes", body: "Les liens vers GitHub, YouTube, Telegram, WhatsApp et d’autres services mènent vers des plateformes tierces soumises à leurs propres conditions et politiques." },
      { title: "Disponibilité", body: "Le site est fourni avec une obligation de moyens. Une interruption temporaire peut survenir pour maintenance, déploiement ou incident d’hébergement." },
      { title: "Contact", body: "Pour toute question : {email}." },
    ],
  },
  privacy: {
    title: "Politique de confidentialité",
    eyebrow: "LUST DEV / CONFIDENTIALITÉ",
    intro: "Cette page explique quelles données peuvent être traitées et pourquoi.",
    sections: [
      { title: "Données traitées", body: "Le portfolio ne demande pas de compte et ne contient actuellement aucun formulaire de contact ni base de données. Les informations publiées sont limitées aux coordonnées professionnelles et liens choisis par LUST DEV." },
      { title: "Cookies nécessaires", body: "Un cookie local nommé lust_cookie_consent mémorise ton choix de consentement pendant 180 jours. Il sert uniquement aux préférences du site." },
      { title: "Analytics optionnel", body: "Google Analytics 4 n’est chargé que si l’identifiant de mesure est configuré et après l’autorisation des cookies non essentiels. L’adresse IP est configurée pour être anonymisée. Sans identifiant ou sans consentement, aucun script Analytics n’est chargé." },
      { title: "Services externes", body: "Lorsque tu ouvres un lien social, le traitement relève de la politique de la plateforme concernée. Le site ne revend pas de données et n’utilise pas de publicité personnalisée." },
      { title: "Sécurité et conservation", body: "Aucune donnée de formulaire n’est stockée par ce site actuellement. Les protections HTTP et les limites anti-abus sont activées côté serveur pour réduire les requêtes malveillantes. reCAPTCHA est préparé pour un futur formulaire, mais n’est pas chargé tant qu’aucune action protégée n’existe." },
      { title: "Contact et droits", body: "Pour une demande liée à la confidentialité : {email}." },
    ],
  },
};

function renderBody(text: string) {
  const [before, after] = text.split("{email}");
  if (after === undefined) return text;
  return <>{before}<a href="mailto:lustdev927@gmail.com">lustdev927@gmail.com</a>{after}</>;
}

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const { t } = useLanguage();
  const page = content[kind];

  useEffect(() => {
    document.title = `${t(page.title)} — LUST DEV`;
  }, [page.title, t]);

  return (
    <main className="legal-page" id="top">
      <div className="legal-shell">
        <nav className="legal-topbar" aria-label={t("Navigation légale")}>
          <Link href="/" className="legal-back"><ArrowLeft size={16} /> {t("Retour au portfolio")}</Link>
          <LanguageSelector />
          <span className="legal-status"><i /> {t("DOCUMENT PUBLIC")}</span>
        </nav>
        <header className="legal-header">
          <p className="eyebrow"><ShieldCheck size={15} /> {t(page.eyebrow)}</p>
          <h1>{t(page.title)}</h1>
          <p className="legal-intro">{t(page.intro)}</p>
          <p className="legal-updated">{t("Dernière mise à jour : 3 octobre 2026 · Lecture claire, sans jargon inutile")}</p>
        </header>

        <nav className="legal-index" aria-label={t("Sections de la page")}>
          <span className="legal-index-title"><List size={15} /> {t("INDEX")}</span>
          {page.sections.map((section, index) => (
            <a href={`#legal-${index + 1}`} key={section.title}>{String(index + 1).padStart(2, "0")} {t(section.title)}</a>
          ))}
        </nav>

        {page.sections.map((section, index) => (
          <section id={`legal-${index + 1}`} key={section.title}>
            <h2>{index + 1}. {t(section.title)}</h2>
            <p>{renderBody(t(section.body))}</p>
          </section>
        ))}
        <a className="legal-top-link" href="#top"><ArrowUp size={15} /> {t("Retour en haut")}</a>
      </div>
    </main>
  );
}
