import { hasNonEssentialConsent } from "@/components/CookieConsent";

const RECAPTCHA_SCRIPT_ID = "google-recaptcha-api";
const RECAPTCHA_SCRIPT_URL = "https://www.google.com/recaptcha/api.js?render=";

type RecaptchaApi = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: RecaptchaApi;
  }
}

function getSiteKey() {
  return import.meta.env.VITE_RECAPTCHA_SITE_KEY?.trim() || "";
}

/**
 * Loads reCAPTCHA only when a real protected form requests it and the user
 * has allowed non-essential services. The secret key is never imported here.
 */
export async function getRecaptchaToken(action: string) {
  const siteKey = getSiteKey();
  if (!siteKey || !hasNonEssentialConsent()) return null;

  await loadRecaptcha(siteKey);
  if (!window.grecaptcha) return null;

  return new Promise<string | null>((resolve) => {
    window.grecaptcha?.ready(() => {
      window.grecaptcha
        ?.execute(siteKey, { action })
        .then(resolve)
        .catch(() => resolve(null));
    });
  });
}

function loadRecaptcha(siteKey: string) {
  if (window.grecaptcha) return Promise.resolve();

  const existing = document.getElementById(RECAPTCHA_SCRIPT_ID);
  if (existing) return waitForRecaptcha();

  const script = document.createElement("script");
  script.id = RECAPTCHA_SCRIPT_ID;
  script.src = `${RECAPTCHA_SCRIPT_URL}${encodeURIComponent(siteKey)}`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
  return waitForRecaptcha();
}

function waitForRecaptcha() {
  return new Promise<void>((resolve, reject) => {
    const startedAt = Date.now();
    const poll = () => {
      if (window.grecaptcha) return resolve();
      if (Date.now() - startedAt > 8000) return reject(new Error("reCAPTCHA unavailable"));
      window.setTimeout(poll, 50);
    };
    poll();
  });
}
