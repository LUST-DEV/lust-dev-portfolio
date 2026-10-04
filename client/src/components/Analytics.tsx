import { useEffect } from "react";
import { hasNonEssentialConsent } from "./CookieConsent";

const SCRIPT_ID = "lust-google-analytics";
const CONSENT_EVENT = "lust:consent-changed";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function loadAnalytics() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
  if (!measurementId || !hasNonEssentialConsent() || document.getElementById(SCRIPT_ID)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { anonymize_ip: true, send_page_view: true });

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
}

export default function Analytics() {
  useEffect(() => {
    loadAnalytics();
    const onConsentChanged = () => loadAnalytics();
    window.addEventListener(CONSENT_EVENT, onConsentChanged);
    return () => window.removeEventListener(CONSENT_EVENT, onConsentChanged);
  }, []);

  return null;
}
