export type ProjectTone = "ember" | "steel" | "signal";

export type Project = {
  index: string;
  slug: string;
  name: string;
  type: string;
  description: string;
  proof: string;
  repo: string;
  tone: ProjectTone;
  tags: string[];
  role: string;
  challenge: string;
  outcome: string;
  codeLabel: string;
  codeLines: string[];
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "lust-xmd",
    name: "LUST-XMD",
    type: "JavaScript · bot toolkit",
    description: "Une présence publique autour des bots et des outils qui transforment une idée technique en expérience utilisable.",
    proof: "PUBLIC REPO / JS",
    repo: "https://github.com/LUST-DEV/LUST-XMD",
    tone: "ember",
    tags: ["JavaScript", "Node.js", "Bots", "Open source"],
    role: "Architecture de bot, automatisation et expérience utilisateur.",
    challenge: "Transformer des idées d’automatisation en outils simples à utiliser et faciles à explorer publiquement.",
    outcome: "Un terrain public pour expérimenter des commandes, des flux automatisés et une interface conversationnelle.",
    codeLabel: "commands.js",
    codeLines: ["const bot = createBot({", "  publicByDesign: true,", "  commands: usefulTools", "});"],
  },
  {
    index: "02",
    slug: "savage-hack-check",
    name: "SavageHackCheck",
    type: "Python · utility",
    description: "Un dépôt public qui témoigne d’une approche orientée scripts, vérification et automatisation concrète.",
    proof: "PUBLIC REPO / PY",
    repo: "https://github.com/LUST-DEV/SavageHackCheck",
    tone: "steel",
    tags: ["Python", "Security", "Automation", "CLI"],
    role: "Conception de scripts, logique de vérification et documentation pratique.",
    challenge: "Rendre les contrôles techniques plus lisibles, reproductibles et accessibles depuis un terminal.",
    outcome: "Une base d’outils orientée vérification pour apprendre, tester et automatiser des contrôles concrets.",
    codeLabel: "check.py",
    codeLines: ["def inspect(target):", "    checks = collect_checks(target)", "    return summarize(checks)", "", "inspect(\"workspace\")"],
  },
  {
    index: "03",
    slug: "goku-md",
    name: "GOKU-MD",
    type: "JavaScript · open source",
    description: "Un terrain de jeu supplémentaire dans l’écosystème public LUST DEV, à explorer directement sur GitHub.",
    proof: "PUBLIC REPO / ACTIVITY",
    repo: "https://github.com/LUST-DEV/GOKU-MD",
    tone: "signal",
    tags: ["JavaScript", "Open source", "Messaging", "Community"],
    role: "Exploration produit, intégration JavaScript et partage open source.",
    challenge: "Construire un projet public qui reste lisible, évolutif et connecté à une communauté technique.",
    outcome: "Un laboratoire ouvert pour tester des idées, documenter les évolutions et continuer à apprendre en public.",
    codeLabel: "experience.tsx",
    codeLines: ["const experience = {", "  clarity: true,", "  motion: \"intentional\",", "  status: \"open\"", "};"],
  },
];

export function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
