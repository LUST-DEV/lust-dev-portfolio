import { useEffect, useState } from "react";

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
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setVisible(readConsent() === null);
    const openSettings = () => setVisible(true);
    window.addEventListener("lust:open-cookie-settings", openSettings);
    return () => window.removeEventListener("lust:open-cookie-settings", openSettings);
  }, []);

  if (!visible) {
    return (
      <button className="cookie-settings-button" type="button" onClick={() => setVisible(true)} aria-label="Gérer les préférences cookies">
        Cookies
      </button>
    );
  }

  const choose = (choice: CookieConsentChoice) => {
    saveConsent(choice);
    setVisible(false);
  };

  return (
    <aside className="cookie-banner" role="dialog" aria-modal="false" aria-labelledby="cookie-title" aria-describedby="cookie-description">
      <div>
        <p className="cookie-kicker">CONFIDENTIALITÉ / COOKIES</p>
        <h2 id="cookie-title">Un site simple, sans suivi caché.</h2>
        <p id="cookie-description">
          Les cookies nécessaires mémorisent tes préférences. Les services non essentiels, comme l’Analytics ou reCAPTCHA, restent désactivés tant que tu ne les autorises pas.
        </p>
        {showDetails && (
          <div className="cookie-details">
            <p><strong>Nécessaires :</strong> consentement et préférences d’interface. Ils permettent au site de fonctionner.</p>
            <p><strong>Non essentiels :</strong> aucun service de mesure, publicité ou reCAPTCHA n’est chargé actuellement.</p>
          </div>
        )}
      </div>
      <div className="cookie-actions">
        <button className="cookie-button cookie-button-muted" type="button" onClick={() => setShowDetails((current) => !current)}>
          {showDetails ? "Masquer" : "Détails"}
        </button>
        <button className="cookie-button cookie-button-muted" type="button" onClick={() => choose("necessary")}>
          Refuser
        </button>
        <button className="cookie-button cookie-button-primary" type="button" onClick={() => choose("all")}>
          Autoriser
        </button>
      </div>
    </aside>
  );
}
