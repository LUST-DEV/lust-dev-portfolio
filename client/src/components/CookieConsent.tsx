import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const CONSENT_COOKIE = "lust_cookie_consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;
const CONSENT_EVENT = "lust:consent-changed";

export type CookieConsentChoice = "necessary" | "all";

function readConsent(): CookieConsentChoice | null {
  if (typeof document === "undefined") return null;
  const value = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CONSENT_COOKIE}=`))
    ?.split("=")[1];

  if (value === "all" || value === "necessary") return value;
  if (value === "accepted") return "all";
  if (value === "rejected") return "necessary";
  return null;
}

export function hasNonEssentialConsent() {
  return readConsent() === "all";
}

function saveConsent(choice: CookieConsentChoice) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${choice}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
}

export default function CookieConsent() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [choice, setChoice] = useState<CookieConsentChoice | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const currentChoice = readConsent();
    setChoice(currentChoice);
    setVisible(currentChoice === null);
    const openSettings = () => setVisible(true);
    window.addEventListener("lust:open-cookie-settings", openSettings);
    return () => window.removeEventListener("lust:open-cookie-settings", openSettings);
  }, []);

  if (!visible) {
    return (
      <button className="cookie-settings-button" type="button" onClick={() => setVisible(true)} aria-label={t("Gérer les préférences cookies")}>
        <span className="cookie-status-dot" aria-hidden="true" />
        Cookies · {choice === "all" ? t("autorisés") : t("nécessaires uniquement")}
      </button>
    );
  }

  const choose = (choice: CookieConsentChoice) => {
    saveConsent(choice);
    setChoice(choice);
    setVisible(false);
  };

  return (
    <aside className="cookie-banner" role="dialog" aria-modal="false" aria-labelledby="cookie-title" aria-describedby="cookie-description">
      <div>
        <p className="cookie-kicker">{t("LUST DEV / CONFIDENTIALITÉ / COOKIES")}</p>
        <h2 id="cookie-title">{t("Un site simple, sans suivi caché.")}</h2>
        <p id="cookie-description">{t("Les cookies nécessaires mémorisent tes préférences. Les services non essentiels, comme l’Analytics ou reCAPTCHA, restent désactivés tant que tu ne les autorises pas.")}</p>
        {showDetails && (
          <div className="cookie-details">
            <p>{t("Nécessaires : consentement et préférences d’interface. Ils permettent au site de fonctionner.")}</p>
            <p>{t("Non essentiels : aucun service de mesure, publicité ou reCAPTCHA n’est chargé actuellement.")}</p>
          </div>
        )}
      </div>
      <div className="cookie-actions">
        <button className="cookie-button cookie-button-muted" type="button" onClick={() => setShowDetails((current) => !current)}>{t(showDetails ? "Masquer" : "Détails")}</button>
        <button className="cookie-button cookie-button-muted" type="button" onClick={() => choose("necessary")}>{t("Refuser")}</button>
        <button className="cookie-button cookie-button-primary" type="button" onClick={() => choose("all")}>{t("Autoriser")}</button>
      </div>
    </aside>
  );
}
