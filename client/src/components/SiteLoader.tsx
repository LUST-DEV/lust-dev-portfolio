import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SiteLoader() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const finish = () => {
      window.setTimeout(() => setVisible(false), 420);
    };
    if (document.readyState === "complete") {
      finish();
      return;
    }
    window.addEventListener("load", finish, { once: true });
    return () => window.removeEventListener("load", finish);
  }, []);

  if (!visible) return null;

  return (
    <div className="site-loader" role="status" aria-live="polite" aria-label={t("Chargement de LUST DEV")}>
      <div className="loader-mark">L<span>DEV</span></div>
      <div className="loader-line"><span /></div>
      <p>{t("INITIALISATION / LUST DEV")}</p>
    </div>
  );
}
