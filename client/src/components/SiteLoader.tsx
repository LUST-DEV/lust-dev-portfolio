import { useEffect, useState } from "react";

export default function SiteLoader() {
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
    <div className="site-loader" role="status" aria-live="polite" aria-label="Chargement de LUST DEV">
      <div className="loader-mark">L<span>DEV</span></div>
      <div className="loader-line"><span /></div>
      <p>INITIALISATION / LUST DEV</p>
    </div>
  );
}
