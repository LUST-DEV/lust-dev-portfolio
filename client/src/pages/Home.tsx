// Style system: Forge rouge / terminal éditorial — la page se lit comme un manifeste public, avec une structure asymétrique et des preuves cliquables.
import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Code2,
  ExternalLink,
  Github,
  Menu,
  MessageCircle,
  Radio,
  Send,
  Terminal,
  X,
  Youtube,
} from "lucide-react";

const links = {
  github: "https://github.com/LUST-DEV",
  youtube: "https://youtube.com/channel/UC7R0pFFLu6vSYblJGLQrVCQ?si=nfIhDsGTLOTQX2Af",
  whatsapp: "https://whatsapp.com/channel/0029VbCiqwyBVJl3Jv5T4I15",
  telegram: "https://t.me/yokubo666",
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
    <a className="social-link" href={href} target="_blank" rel="noreferrer">
      <span className="social-icon">{icon}</span>
      <span>
        <strong>{label}</strong>
        <small>{handle}</small>
      </span>
      <ArrowUpRight className="social-arrow" size={17} aria-hidden="true" />
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="site-header">
        <a className="brand-lockup" href="#top" onClick={closeMenu} aria-label="LUST DEV, revenir en haut">
          <span className="brand-badge"><img src="/manus-storage/lust-dev-mark_b565848b.png" alt="" className="brand-mark" /></span>
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
          <a href="#profile" onClick={closeMenu}><span>01</span>Profil</a>
          <a href="#work" onClick={closeMenu}><span>02</span>Terrain</a>
          <a href="#network" onClick={closeMenu}><span>03</span>Réseau</a>
          <a className="nav-contact" href={links.github} target="_blank" rel="noreferrer" onClick={closeMenu}>
            GitHub <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-backdrop" aria-hidden="true" />
          <div className="hero-gridline" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow"><span className="pulse-dot" /> Independent developer · public build log</p>
            <h1 id="hero-title">Du code qui<br /><em>prend position.</em></h1>
            <p className="hero-intro">
              LUST DEV construit des bots, des outils et des expériences numériques avec une signature directe, technique et reconnaissable.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Explorer le terrain <ArrowDownRight size={17} aria-hidden="true" />
              </a>
              <a className="text-link" href={links.github} target="_blank" rel="noreferrer">
                Voir le profil GitHub <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="hero-signal-bars" aria-label="Signal LUST DEV animé">
              <span style={{ "--bar-height": "42%", "--bar-delay": "0ms" } as React.CSSProperties} />
              <span style={{ "--bar-height": "78%", "--bar-delay": "120ms" } as React.CSSProperties} />
              <span style={{ "--bar-height": "56%", "--bar-delay": "240ms" } as React.CSSProperties} />
              <span style={{ "--bar-height": "92%", "--bar-delay": "360ms" } as React.CSSProperties} />
              <span style={{ "--bar-height": "66%", "--bar-delay": "480ms" } as React.CSSProperties} />
              <small>LIVE SIGNAL / LUST DEV</small>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-meta visual-meta-top"><span>VISUAL_001</span><span>640×426</span></div>
            <div className="image-frame">
              <img src="/manus-storage/lust-dev-wordmark_3f303b42.jpg" alt="Lettres LUST en lumière rouge sur fond noir" />
              <div className="image-scanline" aria-hidden="true" />
              <span className="image-stamp">LUST / SIGNAL</span>
            </div>
            <div className="visual-meta visual-meta-bottom"><span>FORGED IN PUBLIC</span><span>© LUST DEV</span></div>
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
            <span className="section-rail-label">PROFILE / MANIFESTE</span>
          </div>
          <div className="profile-layout">
            <div className="section-heading-block">
              <p className="eyebrow">// qui construit ici</p>
              <h2 id="profile-title">Une identité<br /><span>en mouvement.</span></h2>
            </div>
            <div className="profile-copy">
              <p className="lead-copy">LUST DEV est un profil indépendant centré sur le développement, les bots et les outils qui rendent le numérique plus expressif.</p>
              <p>Le travail est visible sur GitHub, dans des dépôts publics et dans une communauté qui se prolonge sur YouTube, WhatsApp et Telegram. Pas de vitrine silencieuse : chaque lien est une porte vers le terrain réel.</p>
              <a className="inline-arrow-link" href={links.github} target="_blank" rel="noreferrer">
                Parcourir l’écosystème public <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="profile-data" aria-label="Repères publics">
            <div><strong>20</strong><span>dépôts publics visibles</span></div>
            <div><strong>03</strong><span>langages repérés</span></div>
            <div><strong>04</strong><span>canaux officiels</span></div>
          </div>
          <div className="identity-panel" aria-labelledby="identity-title">
            <div className="identity-heading">
              <p className="eyebrow" id="identity-title">// fiche personnelle</p>
              <span className="identity-status"><i /> PROFILE ONLINE</span>
            </div>
            <div className="identity-grid">
              <div><span>Nom</span><strong>Lusty</strong></div>
              <div><span>Prénom</span><strong>Joseph</strong></div>
              <div><span>Âge</span><strong>20 ans</strong></div>
              <div><span>Né le</span><strong>28 janvier</strong></div>
              <div><span>Nationalité</span><strong>Haïtien</strong></div>
            </div>
            <div className="identity-footer"><span>IDENTITY / 001</span><span>HAÏTI · CARAÏBES</span><span>BUILDING IN PUBLIC</span></div>
          </div>
        </section>

        <section className="work-section content-section" id="work" aria-labelledby="work-title">
          <div className="section-rail">
            <span className="section-number">02</span>
            <span className="section-rail-label">SELECTED / TERRAIN</span>
          </div>
          <div className="work-heading-row">
            <div>
              <p className="eyebrow">// dépôts à explorer</p>
              <h2 id="work-title">Ce qui prend<br /><span>forme.</span></h2>
            </div>
            <p className="section-aside">Une sélection de projets visibles sur le profil GitHub public de LUST DEV. Ouvrir chaque fiche pour lire le code, l’historique et le contexte.</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <a className={`project-row ${project.tone}`} href={project.href} target="_blank" rel="noreferrer" key={project.name}>
                <span className="project-index">{project.index}</span>
                <span className="project-main">
                  <span className="project-name">{project.name}<ArrowUpRight size={20} aria-hidden="true" /></span>
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
            <a className="button button-outline" href={links.github} target="_blank" rel="noreferrer">
              Voir les 20 dépôts <Github size={17} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="network-section content-section" id="network" aria-labelledby="network-title">
          <div className="section-rail">
            <span className="section-number">03</span>
            <span className="section-rail-label">SIGNAL / NETWORK</span>
          </div>
          <div className="network-layout">
            <div className="network-copy">
              <p className="eyebrow">// rester dans le signal</p>
              <h2 id="network-title">Le code est<br /><span>public. Le lien aussi.</span></h2>
              <p>Suivre LUST DEV, c’est choisir son point d’entrée : tutoriels vidéo, mises à jour communautaires ou conversations directes.</p>
              <div className="network-signature"><Radio size={16} /> <span>CHANNELS ONLINE / 04</span></div>
            </div>
            <div className="social-list">
              <SocialLink href={links.youtube} icon={<Youtube size={19} />} label="YouTube" handle="@欲LUSTDEV望 · tutoriels" />
              <SocialLink href={links.whatsapp} icon={<MessageCircle size={19} />} label="WhatsApp" handle="Canal LUST DEV" />
              <SocialLink href={links.telegram} icon={<Send size={19} />} label="Telegram" handle="@yokubo666" />
              <SocialLink href={links.github} icon={<Github size={19} />} label="GitHub" handle="@LUST-DEV · repositories" />
            </div>
            <div className="network-visual" aria-hidden="true">
              <img src="/manus-storage/lust-dev-network_8d193b9a.jpg" alt="" />
              <span className="network-coordinates">48° / 02° / 26°</span>
              <Bot className="network-bot" size={30} strokeWidth={1.2} />
            </div>
          </div>
        </section>

        <section className="closing-section" aria-labelledby="closing-title">
          <div className="closing-line" aria-hidden="true" />
          <p className="eyebrow">// next signal</p>
          <h2 id="closing-title">On se retrouve<br /><em>sur le terrain.</em></h2>
          <a className="button button-primary" href={links.github} target="_blank" rel="noreferrer">
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
