// Style system: Atelier éditorial — portfolio professionnel, espaces aérés, palette ivoire/encre/corail et interactions discrètes.
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { localizedPath, useLanguage } from "@/contexts/LanguageContext";
import { projects } from "@/data/projects";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Code2,
  ExternalLink,
  GitBranch,
  Github,
  Globe2,
  Gauge,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Radio,
  Rocket,
  Send,
  Sparkles,
  FileCode2,
  Palette,
  Braces,
  Atom,
  Server,
  ShieldCheck,
  Moon,
  Sun,
  Terminal,
  UsersRound,
  X,
  Youtube,
} from "lucide-react";

const links = {
  github: "https://github.com/LUST-DEV",
  youtube: "https://www.youtube.com/@LUSTDEV",
  whatsapp: "https://whatsapp.com/channel/0029VbCiqwyBVJl3Jv5T4I15",
  whatsappContact: "https://wa.me/18294786326",
  telegram: "https://t.me/yokubo666",
  telegramJoseph: "https://t.me/JOSEPHLUSTY",
  email: "mailto:lustdev927@gmail.com",
  phone: "tel:+18294786326",
};

const skillGroups = [
  {
    name: "Langages",
    status: "01 / SOCLE",
    description: "HTML / CSS, JavaScript et TypeScript sont maîtrisés. Python et Shell / Bash sont en apprentissage.",
    tone: "coral",
    icon: <Terminal size={20} aria-hidden="true" />,
    skills: [
      { name: "HTML / CSS", level: "mastered", icon: <Palette size={15} aria-hidden="true" /> },
      { name: "JavaScript", level: "mastered", icon: <Braces size={15} aria-hidden="true" /> },
      { name: "TypeScript", level: "mastered", icon: <FileCode2 size={15} aria-hidden="true" /> },
      { name: "Python", level: "progress", icon: <Code2 size={15} aria-hidden="true" /> },
      { name: "Shell / Bash", level: "progress", icon: <Terminal size={15} aria-hidden="true" /> },
    ],
  },
  {
    name: "Web & Frontend",
    status: "02 / FRONTEND",
    description: "React est maîtrisé pour construire des interfaces modernes. Next.js, Angular et Vue.js restent en progression.",
    tone: "sky",
    icon: <Globe2 size={20} aria-hidden="true" />,
    skills: [
      { name: "React", level: "mastered", icon: <Atom size={15} aria-hidden="true" /> },
      { name: "Next.js", level: "progress", icon: <Code2 size={15} aria-hidden="true" /> },
      { name: "Angular", level: "progress", icon: <Code2 size={15} aria-hidden="true" /> },
      { name: "Vue.js", level: "progress", icon: <Code2 size={15} aria-hidden="true" /> },
    ],
  },
  {
    name: "Mobile",
    status: "03 / EN COURS",
    description: "Les technologies mobiles sont en cours d’exploration pour élargir la création d’expériences.",
    tone: "butter",
    icon: <Phone size={20} aria-hidden="true" />,
    skills: [
      { name: "React Native", level: "progress", icon: <Atom size={15} aria-hidden="true" /> },
      { name: "Flutter", level: "progress", icon: <Code2 size={15} aria-hidden="true" /> },
    ],
  },
  {
    name: "Backend & Frameworks",
    status: "04 / EN COURS",
    description: "Node.js, SQL, Django, FastAPI et Flask sont les prochains axes de progression côté serveur.",
    tone: "steel",
    icon: <Server size={20} aria-hidden="true" />,
    skills: [
      { name: "Node.js", level: "progress", icon: <Server size={15} aria-hidden="true" /> },
      { name: "SQL", level: "progress", icon: <Code2 size={15} aria-hidden="true" /> },
      { name: "Django", level: "progress", icon: <Server size={15} aria-hidden="true" /> },
      { name: "FastAPI", level: "progress", icon: <Server size={15} aria-hidden="true" /> },
      { name: "Flask", level: "progress", icon: <Server size={15} aria-hidden="true" /> },
    ],
  },
  {
    name: "Cybersécurité",
    status: "05 / EN COURS",
    description: "Un axe de progression dédié aux fondamentaux de la sécurité web, Linux et des réseaux.",
    tone: "butter",
    icon: <ShieldCheck size={20} aria-hidden="true" />,
    skills: [
      { name: "Sécurité web", level: "progress", icon: <ShieldCheck size={15} aria-hidden="true" /> },
      { name: "Linux", level: "progress", icon: <Terminal size={15} aria-hidden="true" /> },
      { name: "Réseaux", level: "progress", icon: <Globe2 size={15} aria-hidden="true" /> },
    ],
  },
];

const teamMembers = [
  "NONO_HES",
  "tresor20001",
  "MCKINGER",
  "Savage_HackzzzzzzZ",
  "devsubzero_09",
  "baek_siyun",
  "Druzzdev2",
  "devxkairo",
  "Dev_Roan",
  "Cid_404lost",
  "Devmichael00",
];

function ExternalLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="external-label">
      {children}
      <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
    </span>
  );
}

function SocialLink({
  href,
  icon,
  label,
  handle,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  handle: string;
}) {
  return (
    <a className="social-link" data-scroll-fade href={href} target="_blank" rel="noopener noreferrer">
      <span className="social-icon">{icon}</span>
      <span>
        <strong>{label}</strong>
        <small>{handle}</small>
      </span>
      <ArrowUpRight className="social-arrow" size={17} aria-hidden="true" />
    </a>
  );
}

function NetworkTelemetry({ showPlanet, onTogglePlanet }: { showPlanet: boolean; onTogglePlanet: () => void }) {
  const { t } = useLanguage();
  const [latency, setLatency] = useState<number | null>(null);
  const [online, setOnline] = useState(true);
  const [networkQuality, setNetworkQuality] = useState<"good" | "fair" | "poor">("good");
  const [glow, setGlow] = useState<"coral" | "cyan" | "gold">("coral");

  useEffect(() => {
    const updateOnline = () => setOnline(navigator.onLine);
    updateOnline();
    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);

    const measure = async () => {
      if (!navigator.onLine) {
        setLatency(null);
        setNetworkQuality("poor");
        return;
      }
      const started = performance.now();
      try {
        await fetch(`${window.location.origin}/?network_probe=${Date.now()}`, { method: "HEAD", cache: "no-store" });
        const measured = Math.max(1, Math.round(performance.now() - started));
        setLatency(measured);
        setNetworkQuality(measured <= 80 ? "good" : measured <= 180 ? "fair" : "poor");
      } catch {
        setLatency(null);
        setNetworkQuality("poor");
      }
    };

    void measure();
    const interval = window.setInterval(measure, 30000);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("online", updateOnline);
      window.removeEventListener("offline", updateOnline);
    };
  }, []);

  const cycleGlow = () => setGlow((current) => current === "coral" ? "cyan" : current === "cyan" ? "gold" : "coral");

  return (
    <div className="network-telemetry" aria-label={t("État du réseau et de la session")}>
      <div className={`telemetry-row quality-${networkQuality}`}><span><i className={`telemetry-dot ${online ? `is-${networkQuality}` : "is-offline"}`} /> {t("Statut")}</span><strong>{online ? (networkQuality === "poor" ? t("RÉSEAU FAIBLE") : networkQuality === "fair" ? t("EN LIGNE / MOYEN") : t("EN LIGNE")) : t("HORS LIGNE")}</strong></div>
      <div className={`telemetry-row quality-${networkQuality}`}><span><Gauge size={13} aria-hidden="true" /> {t("Latence")}</span><strong>{latency === null ? "—" : `${latency} ms`}</strong></div>
      <div className="telemetry-row"><span><Globe2 size={13} aria-hidden="true" /> {t("Session")}</span><strong>{t("VISITEUR")}</strong></div>
      <button className={`glow-control glow-${glow}`} type="button" onClick={() => { onTogglePlanet(); cycleGlow(); }} aria-label={t("Basculer entre le réseau et la planète Terre")}>
        <span className="planet" aria-hidden="true"><span className="planet-grid" /></span>
        <span>{showPlanet ? t("RETOUR RÉSEAU") : t("OUVRIR PLANÈTE")}</span>
      </button>
      <div className="view-switch" role="group" aria-label={t("Choisir la vue Connect")}>
        <button className={!showPlanet ? "is-selected" : ""} type="button" onClick={() => showPlanet && onTogglePlanet()}>{t("RÉSEAU")}</button>
        <button className={showPlanet ? "is-selected" : ""} type="button" onClick={() => !showPlanet && onTogglePlanet()}>{t("PLANÈTE")}</button>
      </div>
    </div>
  );
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const { language, t } = useLanguage();
  const [statsReady, setStatsReady] = useState(false);
  const statsSectionRef = useRef<HTMLElement | null>(null);
  const pageTitle = {
    fr: "Joseph Lusty Gregoire — LUST DEV",
    en: "Joseph Lusty Gregoire — LUST DEV | Developer Portfolio",
    es: "Joseph Lusty Gregoire — LUST DEV | Portafolio",
    ht: "Joseph Lusty Gregoire — LUST DEV | Pòtfèy",
  }[language];
  useEffect(() => { document.title = pageTitle; }, [pageTitle]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPlanet, setShowPlanet] = useState(false);
  const [earthRotation, setEarthRotation] = useState(0);
  const dragStart = useRef<{ x: number; rotation: number } | null>(null);

  useEffect(() => {
    const projectRows = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-project]"));
    const fadeTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-fade]"));
    const observedTargets = Array.from(new Set([...projectRows, ...fadeTargets]));
    if (!observedTargets.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      projectRows.forEach((row) => row.classList.add("is-project-visible"));
      fadeTargets.forEach((row) => row.classList.add("is-fade-visible"));
      return;
    }

    let lastScrollY = window.scrollY;
    let scrollDirection: "up" | "down" = "down";
    let scrollFrame = 0;
    const updateScrollDirection = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollDirection = window.scrollY < lastScrollY ? "up" : "down";
        lastScrollY = window.scrollY;
        scrollFrame = 0;
      });
    };
    window.addEventListener("scroll", updateScrollDirection, { passive: true });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const row = entry.target as HTMLElement;
        const isProject = row.hasAttribute("data-scroll-project");
        const visibleClass = isProject ? "is-project-visible" : "is-fade-visible";
        const leavingClass = isProject ? "is-project-leaving" : "is-fade-leaving";
        if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
          const enteringFromAbove = scrollDirection === "up";
          row.classList.remove("is-project-leaving", "is-project-visible", "is-fade-leaving", "is-fade-visible", "is-entering-up", "is-fade-entering-up", "is-from-left", "is-from-right");
          if (enteringFromAbove && row.dataset.fadeSide) {
            row.classList.add(isProject ? "is-entering-up" : "is-fade-entering-up", row.dataset.fadeSide === "left" ? "is-from-left" : "is-from-right");
          }
          window.requestAnimationFrame(() => row.classList.add(visibleClass));
        } else if (!entry.isIntersecting && row.classList.contains(visibleClass)) {
          row.classList.remove(visibleClass, "is-entering-up", "is-fade-entering-up", "is-from-left", "is-from-right");
          row.classList.add(leavingClass);
        }
      });
    }, { threshold: [0, 0.2, 0.55], rootMargin: "-8% 0px -12% 0px" });

    observedTargets.forEach((row) => observer.observe(row));
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScrollDirection);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
    };
  }, []);

  useEffect(() => {
    const section = statsSectionRef.current;
    if (!section) return;
    const revealStats = () => setStatsReady(true);
    if (!("IntersectionObserver" in window)) {
      revealStats();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        revealStats();
        observer.disconnect();
      }
    }, { rootMargin: "500px 0px" });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const startEarthDrag = (event: React.PointerEvent<HTMLImageElement>) => {
    dragStart.current = { x: event.clientX, rotation: earthRotation };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveEarth = (event: React.PointerEvent<HTMLImageElement>) => {
    if (!dragStart.current) return;
    setEarthRotation(dragStart.current.rotation + (event.clientX - dragStart.current.x) * .55);
  };
  const endEarthDrag = () => { dragStart.current = null; };

  return (
    <div className={`site-shell theme-${theme}`}>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="site-header">
        <a className="brand-lockup" href="#top" onClick={closeMenu} aria-label={t("LUST DEV, revenir en haut")}>
          <span className="brand-badge"><img src={`${import.meta.env.BASE_URL}lust-mark.svg`} alt="" className="brand-mark" /></span>
          <span className="brand-wordmark">LUST<span>DEV</span></span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
          <span className="sr-only">{t("Ouvrir le menu")}</span>
        </button>

        <nav id="main-navigation" className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label={t("Navigation principale")}>
          <a href="#profile" onClick={closeMenu}><span className="nav-symbol" aria-hidden="true">◌</span>{t("Profil")}</a>
          <a href="#skills" onClick={closeMenu}><span className="nav-symbol" aria-hidden="true">◎</span>{t("Compétences")}</a>
          <a href="#stats" onClick={closeMenu}><span className="nav-symbol" aria-hidden="true">◈</span>{t("Stats")}</a>
          <a href="#why-me" onClick={closeMenu}><span className="nav-symbol" aria-hidden="true">✦</span>{t("Why Me")}</a>
          <a href="#work" onClick={closeMenu}><span className="nav-symbol" aria-hidden="true">✦</span>{t("Projets")}</a>
          <a href="#network" onClick={closeMenu}><span className="nav-symbol" aria-hidden="true">↗</span>{t("Liens")}</a>
          <a className="nav-contact" href={links.github} target="_blank" rel="noopener noreferrer" onClick={closeMenu} aria-label="GitHub LUST DEV">
            <Github size={15} aria-hidden="true" /> GitHub LUST DEV <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <div className="language-switcher" aria-label={t("Choisir la langue")}>
            {(["fr", "en", "es"] as const).map((code) => (
              <a className={language === code ? "is-active" : ""} href={localizedPath("/", code)} onClick={closeMenu} key={code}>{code.toUpperCase()}</a>
            ))}
          </div>
          <button
            className="theme-toggle"
            type="button"
            onClick={() => toggleTheme?.()}
            aria-label={theme === "light" ? t("Activer le mode sombre") : t("Activer le mode clair")}
            title={theme === "light" ? t("Activer le mode sombre") : t("Activer le mode clair")}
          >
            <span className="theme-toggle-icon" aria-hidden="true">{theme === "light" ? <Moon size={15} /> : <Sun size={15} />}</span>
            <span>{theme === "light" ? t("Sombre") : t("Clair")}</span>
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-backdrop" aria-hidden="true" />
          <div className="hero-gridline" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow"><span className="pulse-dot" /> {t("Portfolio personnel · LUST DEV")}</p>
            <h1 id="hero-title">{t("Des idées qui")}<br /><em>{t("prennent forme.")}</em></h1>
            <p className="hero-intro">
              {t("Joseph Gregoire, connu sous le nom de LUST DEV — alias DEV, crée des outils, des bots et des expériences numériques avec une curiosité constante.")}
            </p>
            <div className="hero-tags" aria-label={t("Domaines d’activité")}>
              <span className="label-chip">Bots</span>
              <span className="label-chip">{t("Automation")}</span>
              <span className="label-chip">{t("Open source")}</span>
              <span className="label-chip">{t("Ethical hacking")}</span>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                {t("Explorer le terrain")} <ArrowDownRight size={17} aria-hidden="true" />
              </a>
              <a className="text-link" href={links.github} target="_blank" rel="noopener noreferrer">
                {t("Voir le profil GitHub")} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="hero-signal-bars" aria-label={t("Signal LUST DEV animé")}>
              <span style={{ "--bar-height": "42%", "--bar-delay": "0ms" } as React.CSSProperties} />
              <span style={{ "--bar-height": "78%", "--bar-delay": "120ms" } as React.CSSProperties} />
              <span style={{ "--bar-height": "56%", "--bar-delay": "240ms" } as React.CSSProperties} />
              <span style={{ "--bar-height": "92%", "--bar-delay": "360ms" } as React.CSSProperties} />
              <span style={{ "--bar-height": "66%", "--bar-delay": "480ms" } as React.CSSProperties} />
              <small>{t("CREATIVE SIGNAL / LUST DEV")}</small>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-meta visual-meta-top"><span>VISUAL_001</span><span>640×426</span></div>
            <div className="image-frame">
              <img src={`${import.meta.env.BASE_URL}lust-hero.svg`} alt={t("Composition graphique LUST DEV sur fond bleu nuit")} />
              <div className="image-scanline" aria-hidden="true" />
              <span className="image-stamp">{t("LUST / SIGNAL")}</span>
            </div>
            <div className="hero-code-panel" aria-label={t("Aperçu du code")}>
              <div className="hero-code-top"><span><i /><i /><i /></span><small>experience.tsx</small><b>● live</b></div>
              <pre><code><span>const</span> experience = {'{'}{`\n  clarity: true,\n  motion: "intentional"\n`}{'}'};</code></pre>
              <div className="hero-code-foot"><span>✳ crafted with intent</span><span>01 / 03</span></div>
            </div>
            <div className="visual-meta visual-meta-bottom"><span>{t("MADE WITH INTENTION")}</span><span>© LUST DEV</span></div>
          </div>

          <div className="hero-index" aria-hidden="true">LD / 2026</div>
        </section>

        <section className="ticker" aria-label={t("Résumé de l’activité publique")}>
          <div className="ticker-track">
            <span>{t("OPEN SOURCE")}</span><i />
            <span>{t("BOT MAKER")}</span><i />
            <span>{t("TOOLS & AUTOMATION")}</span><i />
            <span>{t("PUBLIC BY DESIGN")}</span><i />
            <span>{t("OPEN SOURCE")}</span><i />
          </div>
        </section>

        <section className="profile-section content-section" id="profile" aria-labelledby="profile-title">
          <div className="section-rail">
            <span className="section-number">01</span>
            <span className="section-rail-label">{t("PROFILE / À PROPOS")}</span>
          </div>
          <div className="profile-layout">
            <div className="section-heading-block">
              <p className="eyebrow">{t("À PROPOS DE LUST DEV")}</p>
              <h2 id="profile-title">Joseph<br /><span>{t("en clair.")}</span></h2>
            </div>
            <div className="profile-copy">
              <p className="lead-copy">{t("Né en Haïti le 28 janvier, Joseph Gregoire est passionné par la programmation, la technologie et le hacking éthique.")}</p>
              <p>{t("À 16 ans, il crée son premier projet HTML à Eagle Stream Academy. Depuis, sa curiosité l’amène à comprendre comment les choses fonctionnent, à apprendre chaque jour et à transformer ses découvertes en projets publics.")}</p>
              <p>{t("Connu publiquement sous le nom de")} <strong>LUST DEV</strong>, {t("alias")} <strong>DEV</strong>, {t("il construit une identité ouverte entre code, créativité et culture numérique.")}</p>
              <a className="inline-arrow-link" href={links.github} target="_blank" rel="noopener noreferrer">
                {t("Parcourir l’écosystème public")} <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="profile-data" aria-label={t("Repères publics")}>
            <div><strong>20</strong><span>{t("dépôts publics visibles")}</span></div>
            <div><strong>03</strong><span>{t("langages fondamentaux")}</span></div>
            <div><strong>04</strong><span>{t("canaux officiels")}</span></div>
          </div>
          <div className="identity-panel" data-scroll-fade data-fade-side="right" aria-labelledby="identity-title">
            <div className="identity-heading">
              <p className="eyebrow" id="identity-title">// {t("fiche personnelle")}</p>
              <span className="identity-status"><i /> {t("PROFILE ONLINE")}</span>
            </div>
            <div className="identity-grid">
              <div><span>{t("Nom")}</span><strong>Joseph</strong></div>
              <div><span>{t("Prénom")}</span><strong>Lusty Gregoire</strong></div>
              <div><span>{t("Signature")}</span><strong>joseph</strong></div>
              <div><span>{t("Né le")}</span><strong>{t("28 janvier")}</strong></div>
              <div><span>{t("Nationalité")}</span><strong>{t("Haïtien")}</strong></div>
              <div><span>{t("Ville")}</span><strong>{t("Delmas, Haïti")}</strong></div>
              <div><span>{t("Alias")}</span><strong>LUST DEV</strong></div>
            </div>
            <div className="identity-footer"><span>{t("IDENTITY / 001")}</span><span>{t("PREMIER SITE HTML · CRÉÉ À 16 ANS")}</span><span>{t("BUILDING IN PUBLIC")}</span></div>
          </div>
        </section>

        <section className="skills-section content-section" id="skills" aria-labelledby="skills-title">
          <div className="section-rail">
            <span className="section-number">02</span>
            <span className="section-rail-label">{t("STACK / COMPÉTENCES")}</span>
          </div>
          <div className="skills-heading-row">
            <div>
              <p className="eyebrow">{t("COMPÉTENCES TECHNIQUES")}</p>
              <h2 id="skills-title">{t("Une stack")}<br /><span>{t("en construction.")}</span></h2>
            </div>
            <div className="skills-intro">
              <p>{t("HTML, CSS, JavaScript, TypeScript et React forment le socle frontend maîtrisé. Les autres technologies et domaines sont actuellement en cours d’apprentissage.")}</p>
              <div className="skills-legend" aria-label={t("Légende des niveaux de compétence")}>
                <span><i className="skills-legend-dot is-mastered" /> {t("Maîtrisé")}</span>
                <span><i className="skills-legend-dot is-progress" /> {t("En progression")}</span>
              </div>
            </div>
          </div>
          <div className="skills-category-grid" aria-label={t("Compétences techniques et niveaux de progression")}>
            {skillGroups.map((category, index) => (
              <article className={`skill-category-card ${category.tone}`} data-scroll-fade data-fade-side={index % 2 === 0 ? "left" : "right"} key={category.name}>
                <div className="skill-category-top">
                  <span className="skill-category-icon">{category.icon}</span>
                  <div>
                    <p>{t(category.status)}</p>
                    <h3>{t(category.name)}</h3>
                  </div>
                  <span className="skill-category-index">0{index + 1}</span>
                </div>
                <p className="skill-category-description">{t(category.description)}</p>
                <div className="skill-chip-list" aria-label={`${t(category.name)} : ${t("niveaux de compétence")}`}>
                  {category.skills.map((skill) => (
                    <span className={`skill-chip ${skill.level === "mastered" ? "is-mastered" : "is-progress"}`} key={skill.name}>
                      {skill.icon}{t(skill.name)}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="stats-section content-section" id="stats" aria-labelledby="stats-title" ref={statsSectionRef}>
          <div className="section-rail">
            <span className="section-number">03</span>
            <span className="section-rail-label">{t("STATS / ACTIVITÉ")}</span>
          </div>
          <div className="stats-heading-row">
            <div>
              <p className="eyebrow"><Github size={15} /> {t("ACTIVITÉ PUBLIQUE")}</p>
              <h2 id="stats-title">GitHub<br /><span>{t("en mouvement.")}</span></h2>
            </div>
            <p className="section-aside">{t("Des statistiques lisibles pour suivre les dépôts, les langages et la régularité du travail public de LUST DEV.")}</p>
          </div>
          <div className="stats-layout">
            <article className="stats-panel github-stats-panel" data-scroll-fade data-fade-side="left">
              <div className="stats-panel-heading">
                <div><span className="stats-kicker">01</span><h3>GitHub Stats</h3></div>
                <Github size={18} aria-hidden="true" />
              </div>
              <div className="stats-images stats-images-duo">
                {statsReady ? (
                  <>
                    <img width="495" height="195" src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username=LUST-DEV&theme=tokyonight" alt={t("Statistiques GitHub de LUST DEV")} loading="lazy" decoding="async" />
                    <img width="495" height="195" src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=LUST-DEV&theme=tokyonight" alt={t("Langages utilisés dans les dépôts LUST DEV")} loading="lazy" decoding="async" />
                  </>
                ) : (
                  <>
                    <div className="stats-image-placeholder" aria-hidden="true" />
                    <div className="stats-image-placeholder" aria-hidden="true" />
                  </>
                )}
              </div>
            </article>
            <article className="stats-panel dev-stats-panel" data-scroll-fade data-fade-side="right">
              <div className="stats-panel-heading">
                <div><span className="stats-kicker">02</span><h3>Dev Stats</h3></div>
                <Code2 size={18} aria-hidden="true" />
              </div>
              <div className="stats-images">
                {statsReady ? <img width="495" height="195" src="https://streak-stats.demolab.com/?user=LUST-DEV&theme=tokyonight&hide_border=true" alt={t("Régularité des contributions GitHub")} loading="lazy" decoding="async" /> : <div className="stats-image-placeholder" aria-hidden="true" />}
              </div>
              <div className="dev-metrics">
                <div><strong>06</strong><span>{t("technologies suivies")}</span></div>
                <div><strong>03</strong><span>{t("projets mis en avant")}</span></div>
                <div><strong>04</strong><span>{t("langues du site")}</span></div>
              </div>
            </article>
          </div>
        </section>

        <section className="why-section content-section" id="why-me" aria-labelledby="why-title">
          <div className="section-rail">
            <span className="section-number">04</span>
            <span className="section-rail-label">WHY ME / VALEUR</span>
          </div>
          <div className="why-heading-row">
            <div>
              <p className="eyebrow"><Sparkles size={15} /> {t("POURQUOI LUST DEV")}</p>
              <h2 id="why-title">Why<br /><span>{t("me.")}</span></h2>
            </div>
            <p className="section-aside">{t("Une manière de travailler basée sur la curiosité, la clarté et la création de projets réellement utilisables.")}</p>
          </div>
          <div className="why-grid">
            <article className="why-card why-card-coral" data-scroll-fade data-fade-side="left">
              <span className="why-icon"><Code2 size={22} aria-hidden="true" /></span>
              <span className="why-index">01</span>
              <h3>{t("Code utile")}</h3>
              <p>{t("Des solutions simples, propres et pensées pour résoudre de vrais problèmes.")}</p>
            </article>
            <article className="why-card why-card-sky" data-scroll-fade data-fade-side="right">
              <span className="why-icon"><GitBranch size={22} aria-hidden="true" /></span>
              <span className="why-index">02</span>
              <h3>{t("Esprit open source")}</h3>
              <p>{t("Je construis, documente et partage des projets réutilisables.")}</p>
            </article>
            <article className="why-card why-card-butter" data-scroll-fade data-fade-side="left">
              <span className="why-icon"><Rocket size={22} aria-hidden="true" /></span>
              <span className="why-index">03</span>
              <h3>{t("Construire vite")}</h3>
              <p>{t("De l’idée au prototype fonctionnel avec une approche pragmatique.")}</p>
            </article>
          </div>
        </section>

        <section className="work-section content-section" id="work" aria-labelledby="work-title">
          <div className="section-rail">
            <span className="section-number">05</span>
            <span className="section-rail-label">{t("WORK / PROJETS")}</span>
          </div>
          <div className="work-heading-row">
            <div>
              <p className="eyebrow">{t("PROJETS SÉLECTIONNÉS")}</p>
              <h2 id="work-title">{t("Des projets")}<br /><span>{t("qui avancent.")}</span></h2>
            </div>
            <p className="section-aside">{t("Une sélection de projets visibles sur le profil GitHub public de LUST DEV. Ouvrir chaque fiche pour lire le code, l’historique et le contexte.")}</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <a className={`project-row ${project.tone}`} data-scroll-project data-project-side={Number(project.index) % 2 === 0 ? "right" : "left"} href={localizedPath(`/projects/${project.slug}`, language)} key={project.name}>
                <span className="project-index">{project.index}</span>
                <span className="project-main">
                  <span className="project-name"><span className="project-symbol"><Code2 size={15} aria-hidden="true" /></span>{project.name}<ArrowUpRight size={20} aria-hidden="true" /></span>
                  <span className="project-type">{t(project.type)}</span>
                </span>
                <span className="project-description">{t(project.description)}</span>
                <span className="project-proof">// {t(project.proof)}</span>
                <span className="project-open"><ExternalLink size={17} aria-hidden="true" /> {t("Voir le projet")}</span>
              </a>
            ))}
          </div>
          <div className="work-footer">
            <div className="texture-panel" aria-hidden="true" />
            <a className="button button-outline" href={links.github} target="_blank" rel="noopener noreferrer">
              {t("Voir les 20 dépôts")} <Github size={17} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="network-section content-section" id="network" aria-labelledby="network-title">
          <div className="section-rail">
            <span className="section-number">06</span>
            <span className="section-rail-label">{t("CONNECT / LIENS")}</span>
          </div>
          <div className="network-layout">
            <div className="network-copy">
              <p className="eyebrow">{t("RESTER CONNECTÉ")}</p>
              <h2 id="network-title">{t("Choisir")}<br /><span>{t("son canal.")}</span></h2>
              <p>{t("Retrouver LUST DEV selon son rythme : tutoriels vidéo, mises à jour communautaires ou conversations directes.")}</p>
              <div className="network-signature"><Radio size={16} /> <span>{t("04 CANAUX PUBLICS")}</span></div>
            </div>
            <div className="social-list">
              <SocialLink href={links.youtube} icon={<Youtube size={19} />} label="YouTube" handle={t("@欲LUSTDEV望 · tutoriels")} />
              <SocialLink href={links.whatsappContact} icon={<MessageCircle size={19} />} label="WhatsApp" handle={t("Support direct · +1 829 478 6326")} />
              <SocialLink href={links.whatsapp} icon={<MessageCircle size={19} />} label={t("WhatsApp Channel")} handle={t("Canal LUST DEV")} />
              <SocialLink href={links.telegram} icon={<Send size={19} />} label="Telegram" handle="@yokubo666" />
              <SocialLink href={links.telegramJoseph} icon={<Send size={19} />} label="Telegram Joseph" handle="@JOSEPHLUSTY" />
              <SocialLink href={links.github} icon={<Github size={19} />} label="GitHub" handle={t("@LUST-DEV · repositories")} />
              <div className="contact-card" data-scroll-fade aria-label={t("Coordonnées professionnelles")}>
                <p className="contact-card-label">{t("CONTACT DIRECT / COLLABORATION")}</p>
                <a href={links.email}><Mail size={16} aria-hidden="true" /><span>lustdev927@gmail.com</span></a>
                <a href={links.phone}><Phone size={16} aria-hidden="true" /><span>+1 829 478 6326</span></a>
              </div>
            </div>
            <div className="network-visual">
              {!showPlanet && <img src={`${import.meta.env.BASE_URL}lust-network.svg`} alt={t("Réseau LUST DEV")} />}
              {showPlanet && <img className="earth-visual" src={`${import.meta.env.BASE_URL}lust-earth.svg`} alt={t("Planète Terre stylisée, vue depuis l’espace")} style={{ transform: `rotate(${earthRotation}deg)` }} onPointerDown={startEarthDrag} onPointerMove={moveEarth} onPointerUp={endEarthDrag} onPointerCancel={endEarthDrag} draggable={false} />}
              <span className="network-coordinates">48° / 02° / 26°</span>
              <Bot className="network-bot" size={30} strokeWidth={1.2} />
              <NetworkTelemetry showPlanet={showPlanet} onTogglePlanet={() => setShowPlanet((current) => !current)} />
            </div>
          </div>
        </section>

        <section className="team-section content-section" id="team" aria-labelledby="team-title">
          <div className="section-rail">
            <span className="section-number">07</span>
            <span className="section-rail-label">{t("TEAM / TELEGRAM")}</span>
          </div>
          <div className="team-heading-row">
            <div>
              <p className="eyebrow"><UsersRound size={15} /> {t("ÉQUIPE PUBLIQUE")}</p>
              <h2 id="team-title">LUST DEV<br /><span>{t("team signal.")}</span></h2>
            </div>
            <p className="section-aside">{t("Une équipe de profils créatifs et techniques à retrouver sur Telegram. Chaque label ouvre directement le profil indiqué.")}</p>
          </div>
          <div className="team-grid" aria-label={t("Membres de la Team Telegram")}>
            {teamMembers.map((member, index) => (
              <a className="team-label" data-scroll-fade data-fade-side={index % 2 === 0 ? "left" : "right"} href={`https://t.me/${member}`} target="_blank" rel="noopener noreferrer" key={member}>
                <span className="team-label-index">{String(index + 1).padStart(2, "0")}</span>
                <Send size={15} aria-hidden="true" />
                <span>@{member}</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <section className="closing-section" aria-labelledby="closing-title">
          <div className="closing-line" aria-hidden="true" />
          <p className="eyebrow">{t("UNE DERNIÈRE CHOSE")}</p>
          <h2 id="closing-title">{t("On se retrouve")}<br /><em>{t("en ligne.")}</em></h2>
          <a className="button button-primary" href={links.github} target="_blank" rel="noopener noreferrer">
            {t("Ouvrir le terrain de jeu")} <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <span className="footer-mark">LUST<span>DEV</span></span>
        <span>{t("Independent developer · public by design")}</span>
        <span className="footer-legal"><a href={localizedPath("/cgu", language)}>{t("CGU")}</a><a href={localizedPath("/confidentialite", language)}>{t("Confidentialité")}</a><a href="/sitemap.xml">{t("Sitemap")}</a></span>
        <a href="#top">{t("Retour en haut")} <ArrowUpRight size={14} aria-hidden="true" /></a>
      </footer>
    </div>
  );
}
