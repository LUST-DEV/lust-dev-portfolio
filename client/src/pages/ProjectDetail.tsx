import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight, Code2, ExternalLink, Github, Sparkles } from "lucide-react";
import { Link } from "wouter";
import NotFound from "@/pages/NotFound";
import { localizedPath, useLanguage } from "@/contexts/LanguageContext";
import { findProject } from "@/data/projects";

type ProjectDetailProps = { params: { slug: string } };

const copy = {
  fr: {
    back: "Retour aux projets",
    project: "Projet / étude de cas",
    overview: "Un projet en mouvement.",
    context: "Contexte",
    role: "Rôle",
    stack: "Stack technique",
    challenge: "Le défi",
    outcome: "Ce que le projet explore",
    open: "Ouvrir le dépôt GitHub",
    all: "Voir tous les dépôts",
    status: "Projet public · open source",
    next: "Continuer l’exploration",
  },
  en: {
    back: "Back to projects",
    project: "Project / case study",
    overview: "A project in motion.",
    context: "Context",
    role: "Role",
    stack: "Technical stack",
    challenge: "The challenge",
    outcome: "What the project explores",
    open: "Open GitHub repository",
    all: "View all repositories",
    status: "Public project · open source",
    next: "Keep exploring",
  },
  es: {
    back: "Volver a proyectos",
    project: "Proyecto / estudio de caso",
    overview: "Un proyecto en movimiento.",
    context: "Contexto",
    role: "Rol",
    stack: "Stack técnico",
    challenge: "El reto",
    outcome: "Lo que explora el proyecto",
    open: "Abrir repositorio de GitHub",
    all: "Ver todos los repositorios",
    status: "Proyecto público · código abierto",
    next: "Seguir explorando",
  },
  ht: {
    back: "Retounen nan pwojè yo",
    project: "Pwojè / etid ka",
    overview: "Yon pwojè k ap avanse.",
    context: "Kontèks",
    role: "Wòl",
    stack: "Stack teknik",
    challenge: "Defi a",
    outcome: "Sa pwojè a ap eksplore",
    open: "Louvri depo GitHub la",
    all: "Gade tout depo yo",
    status: "Pwojè piblik · open source",
    next: "Kontinye eksplore",
  },
} as const;

export default function ProjectDetail({ params }: ProjectDetailProps) {
  const { language, t } = useLanguage();
  const project = findProject(params.slug);
  if (!project) return <NotFound />;

  const labels = copy[language];
  useEffect(() => {
    document.title = `${project.name} — LUST DEV`;
  }, [project.name]);

  return (
    <div className="project-detail-page">
      <header className="project-detail-header">
        <Link className="brand-lockup" href={localizedPath("/", language)} aria-label={t("LUST DEV, revenir en haut")}>
          <span className="brand-badge"><img src={`${import.meta.env.BASE_URL}lust-mark.svg`} alt="" className="brand-mark" /></span>
          <span className="brand-wordmark">LUST<span>DEV</span></span>
        </Link>
        <Link className="project-back-link" href={localizedPath("/", language) + "#work"}>
          <ArrowLeft size={16} aria-hidden="true" /> {labels.back}
        </Link>
      </header>

      <main>
        <section className={`project-detail-hero project-detail-${project.tone}`} aria-labelledby="project-detail-title">
          <div className="project-detail-hero-copy">
            <p className="eyebrow"><span className="project-detail-dot" /> {labels.project}</p>
            <span className="project-detail-index">{project.index} / 03</span>
            <h1 id="project-detail-title">{project.name}<br /><span>{labels.overview}</span></h1>
            <p className="project-detail-lead">{t(project.description)}</p>
            <div className="project-detail-actions">
              <a className="button button-primary" href={project.repo} target="_blank" rel="noopener noreferrer">
                {labels.open} <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <span className="project-detail-status"><Github size={15} aria-hidden="true" /> {labels.status}</span>
            </div>
          </div>
          <div className="project-detail-code" aria-label={`${project.name} code preview`}>
            <div className="project-detail-code-top"><span>{project.codeLabel}</span><span>● live</span></div>
            <pre><code>{project.codeLines.join("\n")}</code></pre>
            <div className="project-detail-code-footer"><Code2 size={15} aria-hidden="true" /> {project.proof}</div>
          </div>
        </section>

        <section className="project-detail-content" aria-labelledby="project-detail-context-title">
          <div className="project-detail-section-heading">
            <p className="eyebrow"><Sparkles size={15} aria-hidden="true" /> {labels.context}</p>
            <h2 id="project-detail-context-title">{project.name}<br /><span>{t(project.type)}</span></h2>
          </div>
          <div className="project-detail-grid">
            <article className="project-detail-card">
              <span className="project-detail-card-index">01</span>
              <h3>{labels.role}</h3>
              <p>{project.role}</p>
            </article>
            <article className="project-detail-card">
              <span className="project-detail-card-index">02</span>
              <h3>{labels.challenge}</h3>
              <p>{project.challenge}</p>
            </article>
            <article className="project-detail-card">
              <span className="project-detail-card-index">03</span>
              <h3>{labels.outcome}</h3>
              <p>{project.outcome}</p>
            </article>
          </div>
        </section>

        <section className="project-detail-stack" aria-labelledby="project-detail-stack-title">
          <div>
            <p className="eyebrow">{labels.stack}</p>
            <h2 id="project-detail-stack-title">Built in<br /><span>public.</span></h2>
          </div>
          <div className="project-detail-tags">
            {project.tags.map((tag) => <span className="project-detail-tag" key={tag}>{tag}</span>)}
          </div>
        </section>

        <section className="project-detail-next" aria-label={labels.next}>
          <Link className="button button-outline" href={localizedPath("/", language) + "#work"}>
            {labels.all} <ExternalLink size={17} aria-hidden="true" />
          </Link>
        </section>
      </main>
    </div>
  );
}
