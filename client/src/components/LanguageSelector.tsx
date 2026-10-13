import { languageCodes, languageNames, useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <label className="language-picker">
      <span className="sr-only">{t("Choisir la langue")}</span>
      <select
        aria-label={t("Choisir la langue")}
        value={language}
        onChange={(event) => setLanguage(event.target.value as typeof language)}
      >
        {languageCodes.map((code) => (
          <option value={code} key={code}>{code.toUpperCase()} · {languageNames[code]}</option>
        ))}
      </select>
    </label>
  );
}
