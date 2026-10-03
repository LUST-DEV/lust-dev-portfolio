// Style system: Atelier éditorial — portfolio professionnel, espaces aérés, palette ivoire/encre/corail et interactions discrètes.
import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Code2,
  ExternalLink,
  Github,
  Globe2,
  Gauge,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Radio,
  Send,
  Moon,
  Sun,
  Terminal,
  X,
  Youtube,
} from "lucide-react";

const links = {
  github: "https://github.com/LUST-DEV",
  youtube: "https://youtube.com/channel/UC7R0pFFLu6vSYblJGLQrVCQ?si=nfIhDsGTLOTQX2Af",
  whatsapp: "https://whatsapp.com/channel/0029VbCiqwyBVJl3Jv5T4I15",
  telegram: "https://t.me/yokubo666",
  email: "mailto:lustdev927@gmail.com",
  phone: "tel:+18294786326",
};

const projects = [
  {
    index: "01",
    name: "LUST-XMD",
    type: "JavaScript · bot toolkit",
    description:
      "Une présence publique autour des bots et des outils qui transforment une idée technique en expérience utilisable.",
    proof: "PUBLIC REPO / JS",
    href: "https://github.com/LUST-DEV/LUST-XMD",
    tone: "ember",
  },
  {
    index: "02",
    name: "SavageHackCheck",
    type: "Python · utility",
    description:
      "Un dépôt public qui témoigne d’une approche orientée scripts, vérification et automatisation concrète.",
    proof: "PUBLIC REPO / PY",
    href: "https://github.com/LUST-DEV/SavageHackCheck",
    tone: "steel",
  },
  {
    index: "03",
    name: "GOKU-MD",
    type: "JavaScript · open source",
    description:
      "Un terrain de jeu supplémentaire dans l’écosystème public LUST DEV, à explorer directement sur GitHub.",
    proof: "PUBLIC REPO / ACTIVITY",
    href: "https://github.com/LUST-DEV/GOKU-MD",
    tone: "signal",
  },
];

const skills = [
  { name: "HTML5", level: 92, category: "Structure · accessibilité", tone: "coral" },
  { name: "CSS3", level: 90, category: "Design · animations", tone: "butter" },
  { name: "JavaScript", level: 88, category: "Langage · scripting", tone: "coral" },
  { name: "Python", level: 58, category: "En progression · outils", tone: "sky" },
  { name: "TypeScript", level: 52, category: "En progression · applications", tone: "butter" },
  { name: "React / Node.js", level: 48, category: "En progression · web", tone: "sky" },
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
    <a className="social-link" href={href} target="_blank" rel="noopener noreferrer">
      <span className="social-icon">{icon}</span>
      <span>
        <strong>{label}</strong>
        <small>{handle}</small>
      </span>
      <ArrowUpRight className="social-arrow" size={17} aria-hidden="true" />
    </a>
  );
}

function RainParticles() {
  return (
    <div className="rain-layer" aria-hidden="true">
      {Array.from({ length: 42 }, (_, index) => (
        <span
          className="rain-drop"
          key={index}
          style={{
            "--rain-x": `${(index * 37) % 100}%`,
            "--rain-delay": `${(index % 13) * -0.42}s`,
            "--rain-duration": `${3.6 + (index % 7) * 0.38}s`,
            "--rain-length": `${12 + (index % 5) * 7}px`,
            "--rain-opacity": `${0.16 + (index % 4) * 0.08}`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function NetworkTelemetry() {
  const [latency, setLatency] = useState<number | null>(null);
  const [online, setOnline] = useState(() => typeof navigator === "undefined" ? true : navigator.onLine);
  const [glow, setGlow] = useState<"coral" | "cyan" | "gold">("coral");

  useEffect(() => {
    const updateOnline = () => setOnline(navigator.onLine);
    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);

    const measure = async () => {
      if (!navigator.onLine) {
        setLatency(null);
        return;
      }
      const started = performance.now();
      try {
        await fetch(`${window.location.origin}/?network_probe=${Date.now()}`, { method: "HEAD", cache: "no-store" });
        setLatency(Math.max(1, Math.round(performance.now() - started)));
      } catch {
        setLatency(null);
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
    <div className="network-telemetry" aria-label="État du réseau et de la session">
      <div className="telemetry-row"><span><i className={`telemetry-dot ${online ? "is-online" : "is-offline"}`} /> Statut</span><strong>{online ? "EN LIGNE" : "HORS LIGNE"}</strong></div>
      <div className="telemetry-row"><span><Gauge size={13} aria-hidden="true" /> Latence</span><strong>{latency === null ? "—" : `${latency} ms`}</strong></div>
      <div className="telemetry-row"><span><Globe2 size={13} aria-hidden="true" /> Session</span><strong>VISITEUR</strong></div>
      <button className={`glow-control glow-${glow}`} type="button" onClick={cycleGlow} aria-label="Changer la couleur du halo du globe">
        <span className="planet" aria-hidden="true"><span className="planet-grid" /></span>
        <span>TOUCH / CHANGE GLOW</span>
      </button>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const previewTheme = new URLSearchParams(window.location.search).get("theme");
    if (previewTheme === "light" || previewTheme === "dark") return previewTheme;
    const savedTheme = window.localStorage.getItem("lust-dev-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return "dark";
  });

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    window.localStorage.setItem("lust-dev-theme", theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return (
    <div className={`site-shell theme-${theme}`}>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <RainParticles />

      <header className="site-header">
        <a className="brand-lockup" href="#top" onClick={closeMenu} aria-label="LUST DEV, revenir en haut">
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
          <span className="sr-only">Ouvrir le menu</span>
        </button>

        <nav id="main-navigation" className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Navigation principale">
          <a href="#profile" onClick={closeMenu}><span className="nav-symbol" aria-hidden="true">◌</span>Profil</a>
          <a href="#skills" onClick={closeMenu}><span className="nav-symbol" aria-hidden="true">◎</span>Compétences</a>
          <a href="#work" onClick={closeMenu}><span className="nav-symbol" aria-hidden="true">✦</span>Projets</a>
          <a href="#network" onClick={closeMenu}><span className="nav-symbol" aria-hidden="true">↗</span>Liens</a>
          <a className="nav-contact" href={links.github} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
            GitHub <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme((currentTheme) => currentTheme === "light" ? "dark" : "light")}
            aria-label={theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"}
            title={theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"}
          >
            <span className="theme-toggle-icon" aria-hidden="true">{theme === "light" ? <Moon size={15} /> : <Sun size={15} />}</span>
            <span>{theme === "light" ? "Sombre" : "Clair"}</span>
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-backdrop" aria-hidden="true" />
          <div className="hero-gridline" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow"><span className="pulse-dot" /> Portfolio personnel · LUST DEV</p>
            <h1 id="hero-title">Des idées qui<br /><em>prennent forme.</em></h1>
            <p className="hero-intro">
              Lusty Joseph Gregoire, connu sous le nom de LUST DEV et parfois de Valery, crée des outils, des bots et des expériences numériques avec une curiosité constante.
            </p>
            <div className="hero-tags" aria-label="Domaines d’activité">
              <span className="label-chip">Bots</span>
              <span className="label-chip">Automation</span>
              <span className="label-chip">Open source</span>
              <span className="label-chip">Ethical hacking</span>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Explorer le terrain <ArrowDownRight size={17} aria-hidden="true" />
              </a>
              <a className="text-link" href={links.github} target="_blank" rel="noopener noreferrer">
                Voir le profil GitHub <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="hero-signal-bars" aria-label="Signal LUST DEV animé">
              <span style={{ "--bar-height": "42%", "--bar-delay": "0ms" } as React.CSSProperties} />
              <span style={{ "--bar-height": "78%", "--bar-delay": "120ms" } as React.CSSProperties} />
              <span style={{ "--bar-height": "56%", "--bar-delay": "240ms" } as React.CSSProperties} />
              <span style={{ "--bar-height": "92%", "--bar-delay": "360ms" } as React.CSSProperties} />
              <span style={{ "--bar-height": "66%", "--bar-delay": "480ms" } as React.CSSProperties} />
              <small>CREATIVE SIGNAL / LUST DEV</small>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-meta visual-meta-top"><span>VISUAL_001</span><span>640×426</span></div>
            <div className="image-frame">
              <img src={`${import.meta.env.BASE_URL}lust-hero.svg`} alt="Composition graphique LUST DEV sur fond bleu nuit" />
              <div className="image-scanline" aria-hidden="true" />
              <span className="image-stamp">LUST / SIGNAL</span>
            </div>
            <div className="visual-meta visual-meta-bottom"><span>MADE WITH INTENTION</span><span>© LUST DEV</span></div>
          </div>

          <div className="hero-index" aria-hidden="true">LD / 2026</div>
        </section>

        <section className="ticker" aria-label="Résumé de l’activité publique">
          <div className="ticker-track">
            <span>OPEN SOURCE</span><i />
            <span>BOT MAKER</span><i />
            <span>TOOLS & AUTOMATION</span><i />
            <span>PUBLIC BY DESIGN</span><i />
            <span>OPEN SOURCE</span><i />
          </div>
        </section>

        <section className="profile-section content-section" id="profile" aria-labelledby="profile-title">
          <div className="section-rail">
            <span className="section-number">01</span>
            <span className="section-rail-label">PROFILE / À PROPOS</span>
          </div>
          <div className="profile-layout">
            <div className="section-heading-block">
              <p className="eyebrow">À PROPOS DE LUST DEV</p>
              <h2 id="profile-title">Lusty Joseph<br /><span>en clair.</span></h2>
            </div>
            <div className="profile-copy">
              <p className="lead-copy">Né en Haïti le 28 janvier, Lusty Joseph Gregoire est passionné par la programmation, la technologie et le hacking éthique.</p>
              <p>À 16 ans, il crée son premier projet HTML à Eagle Stream Academy. Depuis, sa curiosité l’amène à comprendre comment les choses fonctionnent, à apprendre chaque jour et à transformer ses découvertes en projets publics.</p>
              <p>Connu aussi sous le nom de jeu <strong>Valery</strong>, il construit une identité ouverte entre code, créativité et culture numérique.</p>
              <a className="inline-arrow-link" href={links.github} target="_blank" rel="noopener noreferrer">
                Parcourir l’écosystème public <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="profile-data" aria-label="Repères publics">
            <div><strong>20</strong><span>dépôts publics visibles</span></div>
            <div><strong>03</strong><span>langages fondamentaux</span></div>
            <div><strong>04</strong><span>canaux officiels</span></div>
          </div>
          <div className="identity-panel" aria-labelledby="identity-title">
            <div className="identity-heading">
              <p className="eyebrow" id="identity-title">// fiche personnelle</p>
              <span className="identity-status"><i /> PROFILE ONLINE</span>
            </div>
            <div className="identity-grid">
              <div><span>Nom</span><strong>Gregoire</strong></div>
              <div><span>Prénom</span><strong>Lusty Joseph</strong></div>
              <div><span>Signature</span><strong>joseph</strong></div>
              <div><span>Né le</span><strong>28 janvier</strong></div>
              <div><span>Nationalité</span><strong>Haïtien</strong></div>
              <div><span>Ville</span><strong>Delmas, Haïti</strong></div>
              <div><span>Alias</span><strong>Valery</strong></div>
            </div>
            <div className="identity-footer"><span>IDENTITY / 001</span><span>EAGLE STREAM ACADEMY · 16 ANS</span><span>BUILDING IN PUBLIC</span></div>
          </div>
        </section>

        <section className="skills-section content-section" id="skills" aria-labelledby="skills-title">
          <div className="section-rail">
            <span className="section-number">02</span>
            <span className="section-rail-label">STACK / COMPÉTENCES</span>
          </div>
          <div className="skills-heading-row">
            <div>
              <p className="eyebrow">COMPÉTENCES TECHNIQUES</p>
              <h2 id="skills-title">Une stack<br /><span>en construction.</span></h2>
            </div>
            <div className="skills-intro">
              <p>HTML, CSS et JavaScript forment le socle maîtrisé. Python, TypeScript, React et Node.js avancent au rythme d’un apprentissage quotidien.</p>
              <span className="skills-note"><span className="skills-note-dot" /> Socle maîtrisé · reste en progression</span>
            </div>
          </div>
          <div className="skills-grid" aria-label="Compétences techniques et niveaux de progression">
            {skills.map((skill, index) => (
              <article className={`skill-card ${skill.tone}`} key={skill.name} style={{ "--skill-level": `${skill.level}%`, "--skill-delay": `${index * 90}ms` } as React.CSSProperties}>
                <div className="skill-card-top">
                  <div className="skill-title-wrap">
                    <span className="skill-symbol" aria-hidden="true"><Code2 size={16} /></span>
                    <div>
                      <h3>{skill.name}</h3>
                      <p>{skill.category}</p>
                    </div>
                  </div>
                  <strong>{skill.level}<small>%</small></strong>
                </div>
                <div className="skill-track" role="progressbar" aria-label={`${skill.name} : repère de progression`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={skill.level}>
                  <span className="skill-fill" />
                </div>
                <div className="skill-card-foot"><span>{skill.level >= 80 ? "Base solide" : "En progression"}</span><span>0{index + 1}</span></div>
              </article>
            ))}
          </div>
        </section>

        <section className="work-section content-section" id="work" aria-labelledby="work-title">
          <div className="section-rail">
            <span className="section-number">03</span>
            <span className="section-rail-label">WORK / PROJETS</span>
          </div>
          <div className="work-heading-row">
            <div>
              <p className="eyebrow">PROJETS SÉLECTIONNÉS</p>
              <h2 id="work-title">Des projets<br /><span>qui avancent.</span></h2>
            </div>
            <p className="section-aside">Une sélection de projets visibles sur le profil GitHub public de LUST DEV. Ouvrir chaque fiche pour lire le code, l’historique et le contexte.</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <a className={`project-row ${project.tone}`} href={project.href} target="_blank" rel="noopener noreferrer" key={project.name}>
                <span className="project-index">{project.index}</span>
                <span className="project-main">
                  <span className="project-name"><span className="project-symbol"><Code2 size={15} aria-hidden="true" /></span>{project.name}<ArrowUpRight size={20} aria-hidden="true" /></span>
                  <span className="project-type">{project.type}</span>
                </span>
                <span className="project-description">{project.description}</span>
                <span className="project-proof">// {project.proof}</span>
                <span className="project-open"><ExternalLink size={17} aria-hidden="true" /> Open repo</span>
              </a>
            ))}
          </div>
          <div className="work-footer">
            <div className="texture-panel" aria-hidden="true" />
            <a className="button button-outline" href={links.github} target="_blank" rel="noopener noreferrer">
              Voir les 20 dépôts <Github size={17} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="network-section content-section" id="network" aria-labelledby="network-title">
          <div className="section-rail">
            <span className="section-number">04</span>
            <span className="section-rail-label">CONNECT / LIENS</span>
          </div>
          <div className="network-layout">
            <div className="network-copy">
              <p className="eyebrow">RESTER CONNECTÉ</p>
              <h2 id="network-title">Choisir<br /><span>son canal.</span></h2>
              <p>Retrouver LUST DEV selon son rythme : tutoriels vidéo, mises à jour communautaires ou conversations directes.</p>
              <div className="network-signature"><Radio size={16} /> <span>04 CANAUX PUBLICS</span></div>
            </div>
            <div className="social-list">
              <SocialLink href={links.youtube} icon={<Youtube size={19} />} label="YouTube" handle="@欲LUSTDEV望 · tutoriels" />
              <SocialLink href={links.whatsapp} icon={<MessageCircle size={19} />} label="WhatsApp" handle="Canal LUST DEV" />
              <SocialLink href={links.telegram} icon={<Send size={19} />} label="Telegram" handle="@yokubo666" />
              <SocialLink href={links.github} icon={<Github size={19} />} label="GitHub" handle="@LUST-DEV · repositories" />
              <div className="contact-card" aria-label="Coordonnées professionnelles">
                <p className="contact-card-label">CONTACT DIRECT / COLLABORATION</p>
                <a href={links.email}><Mail size={16} aria-hidden="true" /><span>lustdev927@gmail.com</span></a>
                <a href={links.phone}><Phone size={16} aria-hidden="true" /><span>+1 829 478 6326</span></a>
              </div>
            </div>
            <div className="network-visual">
              <img src={`${import.meta.env.BASE_URL}lust-network.svg`} alt="" />
              <span className="network-coordinates">48° / 02° / 26°</span>
              <Bot className="network-bot" size={30} strokeWidth={1.2} />
              <NetworkTelemetry />
            </div>
          </div>
        </section>

        <section className="closing-section" aria-labelledby="closing-title">
          <div className="closing-line" aria-hidden="true" />
          <p className="eyebrow">UNE DERNIÈRE CHOSE</p>
          <h2 id="closing-title">On se retrouve<br /><em>en ligne.</em></h2>
          <a className="button button-primary" href={links.github} target="_blank" rel="noopener noreferrer">
            Ouvrir le terrain de jeu <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <span className="footer-mark">LUST<span>DEV</span></span>
        <span>Independent developer · public by design</span>
        <a href="#top">Retour en haut <ArrowUpRight size={14} aria-hidden="true" /></a>
      </footer>
    </div>
  );
}
