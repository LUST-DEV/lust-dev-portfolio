import { useEffect, useState } from "react";

const CONSENT_COOKIE = "lust_cookie_consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

type ConsentChoice = "accepted" | "rejected";

function readConsent(): ConsentChoice | null {
  if (typeof document === "undefined") return null;
  const value = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CONSENT_COOKIE}=`))
    ?.split("=")[1];
  return value === "accepted" || value === "rejected" ? value : null;
}

function saveConsent(choice: ConsentChoice) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${choice}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readConsent() === null);
  }, []);

  if (!visible) return null;

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice);
    setVisible(false);
  };

  return (
    <aside className="cookie-banner" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-description">
      <div>
        <p className="cookie-kicker">CONFIDENTIALITÉ / COOKIES</p>
        <h2 id="cookie-title">Un site simple, sans suivi caché.</h2>
        <p id="cookie-description">
          Ce site utilise uniquement un cookie nécessaire pour mémoriser ton choix. Aucun cookie publicitaire ou Analytics n’est activé actuellement.
        </p>
      </div>
      <div className="cookie-actions">
        <button className="cookie-button cookie-button-muted" type="button" onClick={() => choose("rejected")}>
          Refuser
        </button>
        <button className="cookie-button cookie-button-primary" type="button" onClick={() => choose("accepted")}>
          Accepter
        </button>
      </div>
    </aside>
  );
}
