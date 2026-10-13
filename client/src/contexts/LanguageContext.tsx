import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export const languageCodes = ["fr", "en", "es", "ht"] as const;
export type Language = (typeof languageCodes)[number];

export const languageNames: Record<Language, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
  ht: "Kreyòl ayisyen",
};

const languageIndex: Record<Language, number> = { fr: 0, en: 1, es: 2, ht: 3 };

// Each row is ordered French, English, Spanish, Haitian Creole. French remains the source copy.
const copy: Record<string, readonly [string, string, string, string]> = {
  "Choisir la langue": ["Choisir la langue", "Choose language", "Elegir idioma", "Chwazi lang"],
  "Page Not Found": ["Page introuvable", "Page not found", "Página no encontrada", "Paj la pa jwenn"],
  "Sorry, the page you are looking for doesn't exist.": ["Désolé, cette page n’existe pas.", "Sorry, the page you are looking for doesn't exist.", "Lo sentimos, esta página no existe.", "Padon, paj w ap chèche a pa egziste."],
  "It may have been moved or deleted.": ["Elle a peut-être été déplacée ou supprimée.", "It may have been moved or deleted.", "Puede que se haya movido o eliminado.", "Yo ka te deplase oswa efase paj la."],
  "Go Home": ["Retour à l’accueil", "Go home", "Ir al inicio", "Retounen lakay"],
  "Chargement de LUST DEV": ["Chargement de LUST DEV", "Loading LUST DEV", "Cargando LUST DEV", "L ap chaje LUST DEV"],
  "INITIALISATION / LUST DEV": ["INITIALISATION / LUST DEV", "INITIALIZING / LUST DEV", "INICIANDO / LUST DEV", "L AP DEMARE / LUST DEV"],
  "Ouvrir le menu": ["Ouvrir le menu", "Open menu", "Abrir menú", "Louvri meni an"],
  "Navigation principale": ["Navigation principale", "Main navigation", "Navegación principal", "Navigasyon prensipal"],
  "Navigation légale": ["Navigation légale", "Legal navigation", "Navegación legal", "Navigasyon legal"],
  "Sitemap": ["Plan du site", "Sitemap", "Mapa del sitio", "Plan sit la"],
  "WhatsApp Channel": ["Canal WhatsApp", "WhatsApp Channel", "Canal de WhatsApp", "Chanèl WhatsApp"],
  "Joseph Lusty Gregoire — LUST DEV": ["Joseph Lusty Gregoire — LUST DEV", "LUST DEV — Joseph Lusty Gregoire", "Joseph Lusty Gregoire — LUST DEV", "Joseph Lusty Gregoire — LUST DEV"],
  "28 janvier": ["28 janvier", "January 28", "28 de enero", "28 janvye"],
  "Delmas, Haïti": ["Delmas, Haïti", "Delmas, Haiti", "Delmas, Haití", "Delmas, Ayiti"],
  "LUST DEV, revenir en haut": ["LUST DEV, revenir en haut", "LUST DEV, back to top", "LUST DEV, volver arriba", "LUST DEV, retounen anlè"],
  "Profil": ["Profil", "Profile", "Perfil", "Pwofil"],
  "Compétences": ["Compétences", "Skills", "Habilidades", "Konpetans"],
  "Projets": ["Projets", "Projects", "Proyectos", "Pwojè"],
  "Liens": ["Liens", "Links", "Enlaces", "Lyen"],
  "Activer le mode sombre": ["Activer le mode sombre", "Switch to dark mode", "Activar modo oscuro", "Mete mòd fènwa"],
  "Activer le mode clair": ["Activer le mode clair", "Switch to light mode", "Activar modo claro", "Mete mòd klè"],
  "Sombre": ["Sombre", "Dark", "Oscuro", "Fènwa"],
  "Clair": ["Clair", "Light", "Claro", "Klè"],
  "État du réseau et de la session": ["État du réseau et de la session", "Network and session status", "Estado de red y sesión", "Eta rezo ak sesyon"],
  "Statut": ["Statut", "Status", "Estado", "Estati"],
  "RÉSEAU FAIBLE": ["RÉSEAU FAIBLE", "WEAK NETWORK", "RED DÉBIL", "REZO FÈB"],
  "EN LIGNE / MOYEN": ["EN LIGNE / MOYEN", "ONLINE / FAIR", "EN LÍNEA / REGULAR", "ANLIY / MWAYEN"],
  "EN LIGNE": ["EN LIGNE", "ONLINE", "EN LÍNEA", "ANLIY"],
  "HORS LIGNE": ["HORS LIGNE", "OFFLINE", "SIN CONEXIÓN", "PA ANLIY"],
  "Latence": ["Latence", "Latency", "Latencia", "Tan repons"],
  "Session": ["Session", "Session", "Sesión", "Sesyon"],
  "VISITEUR": ["VISITEUR", "VISITOR", "VISITANTE", "VIZITÈ"],
  "Basculer entre le réseau et la planète Terre": ["Basculer entre le réseau et la planète Terre", "Switch between the network and planet Earth", "Cambiar entre la red y el planeta Tierra", "Chanje ant rezo a ak planèt Latè"],
  "RETOUR RÉSEAU": ["RETOUR RÉSEAU", "BACK TO NETWORK", "VOLVER A LA RED", "TOUNEN NAN REZO A"],
  "OUVRIR PLANÈTE": ["OUVRIR PLANÈTE", "OPEN PLANET", "ABRIR PLANETA", "LOUVRI PLANÈT LA"],
  "Choisir la vue Connect": ["Choisir la vue Connect", "Choose Connect view", "Elegir vista de conexión", "Chwazi vizyalizasyon koneksyon an"],
  "RÉSEAU": ["RÉSEAU", "NETWORK", "RED", "REZO"],
  "PLANÈTE": ["PLANÈTE", "PLANET", "PLANETA", "PLANÈT"],
  "Portfolio personnel · LUST DEV": ["Portfolio personnel · LUST DEV", "Personal portfolio · LUST DEV", "Portfolio personal · LUST DEV", "Pòtfèy pèsonèl · LUST DEV"],
  "Des idées qui": ["Des idées qui", "Ideas that", "Ideas que", "Lide ki"],
  "prennent forme.": ["prennent forme.", "take shape.", "toman forma.", "pran fòm."],
  "Joseph Gregoire, connu sous le nom de LUST DEV — alias DEV, crée des outils, des bots et des expériences numériques avec une curiosité constante.": ["Joseph Gregoire, connu sous le nom de LUST DEV — alias DEV, crée des outils, des bots et des expériences numériques avec une curiosité constante.", "Joseph Gregoire, known as LUST DEV — also known as DEV — builds tools, bots, and digital experiences driven by constant curiosity.", "Joseph Gregoire, conocido como LUST DEV — también DEV — crea herramientas, bots y experiencias digitales con curiosidad constante.", "Joseph Gregoire, yo konnen sou non LUST DEV — yo rele l DEV tou — ap kreye zouti, bot ak eksperyans dijital ak anpil kiryozite."],
  "Domaines d’activité": ["Domaines d’activité", "Areas of work", "Áreas de trabajo", "Domèn aktivite"],
  "Bots": ["Bots", "Bots", "Bots", "Bot"],
  "Automation": ["Automation", "Automation", "Automatización", "Otomatizasyon"],
  "Open source": ["Open source", "Open source", "Código abierto", "Open source"],
  "Ethical hacking": ["Ethical hacking", "Ethical hacking", "Hacking ético", "Hacking etik"],
  "Explorer le terrain": ["Explorer le terrain", "Explore the work", "Explorar proyectos", "Eksplore travay yo"],
  "Voir le profil GitHub": ["Voir le profil GitHub", "View GitHub profile", "Ver perfil de GitHub", "Gade pwofil GitHub"],
  "Signal LUST DEV animé": ["Signal LUST DEV animé", "Animated LUST DEV signal", "Señal animada de LUST DEV", "Siyal LUST DEV anime"],
  "CREATIVE SIGNAL / LUST DEV": ["CREATIVE SIGNAL / LUST DEV", "CREATIVE SIGNAL / LUST DEV", "SEÑAL CREATIVA / LUST DEV", "SIYAL KREYATIF / LUST DEV"],
  "Composition graphique LUST DEV sur fond bleu nuit": ["Composition graphique LUST DEV sur fond bleu nuit", "LUST DEV graphic composition on a blue-night background", "Composición gráfica de LUST DEV sobre fondo azul noche", "Konpozisyon grafik LUST DEV sou fon ble nuit"],
  "LUST / SIGNAL": ["LUST / SIGNAL", "LUST / SIGNAL", "LUST / SEÑAL", "LUST / SIYAL"],
  "MADE WITH INTENTION": ["CRÉÉ AVEC INTENTION", "MADE WITH INTENTION", "HECHO CON INTENCIÓN", "KREYE AK ENTANSYON"],
  "Résumé de l’activité publique": ["Résumé de l’activité publique", "Public activity overview", "Resumen de actividad pública", "Rezime aktivite piblik"],
  "OPEN SOURCE": ["OPEN SOURCE", "OPEN SOURCE", "CÓDIGO ABIERTO", "OPEN SOURCE"],
  "BOT MAKER": ["CRÉATEUR DE BOTS", "BOT MAKER", "CREADOR DE BOTS", "KREYATÈ BOT"],
  "TOOLS & AUTOMATION": ["OUTILS & AUTOMATISATION", "TOOLS & AUTOMATION", "HERRAMIENTAS Y AUTOMATIZACIÓN", "ZOUTI AK OTOMATIZASYON"],
  "PUBLIC BY DESIGN": ["PUBLIC PAR CONCEPTION", "PUBLIC BY DESIGN", "PÚBLICO POR DISEÑO", "PILIB PA KONSTRIKSYON"],
  "PROFILE / À PROPOS": ["PROFILE / À PROPOS", "PROFILE / ABOUT", "PERFIL / ACERCA DE", "PWOFiL / SOU NOU"],
  "À PROPOS DE LUST DEV": ["À PROPOS DE LUST DEV", "ABOUT LUST DEV", "SOBRE LUST DEV", "SOU LUST DEV"],
  "en clair.": ["en clair.", "in focus.", "con claridad.", "klèman."],
  "Né en Haïti le 28 janvier, Joseph Gregoire est passionné par la programmation, la technologie et le hacking éthique.": ["Né en Haïti le 28 janvier, Joseph Gregoire est passionné par la programmation, la technologie et le hacking éthique.", "Born in Haiti on January 28, Joseph Gregoire is passionate about programming, technology, and ethical hacking.", "Nacido en Haití el 28 de enero, Joseph Gregoire siente pasión por la programación, la tecnología y el hacking ético.", "Joseph Gregoire te fèt ann Ayiti 28 janvye. Li renmen pwogramasyon, teknoloji ak hacking etik."],
  "À 16 ans, il crée son premier projet HTML à Eagle Stream Academy. Depuis, sa curiosité l’amène à comprendre comment les choses fonctionnent, à apprendre chaque jour et à transformer ses découvertes en projets publics.": ["À 16 ans, il crée son premier projet HTML à Eagle Stream Academy. Depuis, sa curiosité l’amène à comprendre comment les choses fonctionnent, à apprendre chaque jour et à transformer ses découvertes en projets publics.", "At 16, he created his first HTML project at Eagle Stream Academy. Since then, curiosity has led him to learn how things work and turn discoveries into public projects.", "A los 16 creó su primer proyecto HTML en Eagle Stream Academy. Desde entonces, su curiosidad lo impulsa a aprender cómo funcionan las cosas y convertir sus descubrimientos en proyectos públicos.", "A 16 an, li te kreye premye pwojè HTML li nan Eagle Stream Academy. Depi lè sa a, kiryozite pouse l aprann kijan bagay yo mache epi fè dekouvèt li yo tounen pwojè piblik."],
  "Connu publiquement sous le nom de": ["Connu publiquement sous le nom de", "Publicly known as", "Conocido públicamente como", "Yo konnen l piblikman sou non"],
  "alias": ["alias", "also known as", "también conocido como", "ki rele"],
  "il construit une identité ouverte entre code, créativité et culture numérique.": ["il construit une identité ouverte entre code, créativité et culture numérique.", "he is building an open identity across code, creativity, and digital culture.", "construye una identidad abierta entre código, creatividad y cultura digital.", "li ap konstwi yon idantite ouvè ant kòd, kreyativite ak kilti dijital."],
  "Parcourir l’écosystème public": ["Parcourir l’écosystème public", "Explore the public ecosystem", "Explorar el ecosistema público", "Eksplore ekosistèm piblik la"],
  "Repères publics": ["Repères publics", "Public highlights", "Datos públicos", "Pwen kle piblik"],
  "dépôts publics visibles": ["dépôts publics visibles", "public repositories", "repositorios públicos", "repo piblik"],
  "langages fondamentaux": ["langages fondamentaux", "core languages", "lenguajes principales", "langaj fondamantal"],
  "canaux officiels": ["canaux officiels", "official channels", "canales oficiales", "chanèl ofisyèl"],
  "fiche personnelle": ["fiche personnelle", "profile card", "ficha personal", "fich pèsonèl"],
  "PROFILE ONLINE": ["PROFILE ONLINE", "PROFILE ONLINE", "PERFIL EN LÍNEA", "PWOFiL ANLIY"],
  "Nom": ["Nom", "First name", "Nombre", "Non"],
  "Prénom": ["Prénom", "Last name", "Apellidos", "Siyati"],
  "Signature": ["Signature", "Signature", "Firma", "Siyati"],
  "Né le": ["Né le", "Born", "Nacido el", "Dat li fèt"],
  "Nationalité": ["Nationalité", "Nationality", "Nacionalidad", "Nasyonalite"],
  "Haïtien": ["Haïtien", "Haitian", "Haitiano", "Ayisyen"],
  "Ville": ["Ville", "City", "Ciudad", "Vil"],
  "Alias": ["Alias", "Alias", "Alias", "Alyas"],
  "IDENTITY / 001": ["IDENTITÉ / 001", "IDENTITY / 001", "IDENTIDAD / 001", "IDANTITE / 001"],
  "PREMIER SITE HTML · CRÉÉ À 16 ANS": ["PREMIER SITE HTML · CRÉÉ À 16 ANS", "FIRST HTML SITE · BUILT AT 16", "PRIMER SITIO HTML · CREADO A LOS 16", "PREMYE SIT HTML · KREYE A 16 AN"],
  "BUILDING IN PUBLIC": ["EN CONSTRUCTION PUBLIQUE", "BUILDING IN PUBLIC", "CONSTRUYENDO EN PÚBLICO", "K AP KONSTWI AN PIBLIK"],
  "STACK / COMPÉTENCES": ["STACK / COMPÉTENCES", "STACK / SKILLS", "STACK / HABILIDADES", "STACK / KONPETANS"],
  "COMPÉTENCES TECHNIQUES": ["COMPÉTENCES TECHNIQUES", "TECHNICAL SKILLS", "HABILIDADES TÉCNICAS", "KONPETANS TEKNIK"],
  "Une stack": ["Une stack", "A stack", "Una stack", "Yon stack"],
  "en construction.": ["en construction.", "in progress.", "en construcción.", "k ap devlope."],
  "HTML, CSS et JavaScript forment le socle maîtrisé. Python, TypeScript, React et Node.js avancent au rythme d’un apprentissage quotidien.": ["HTML, CSS et JavaScript forment le socle maîtrisé. Python, TypeScript, React et Node.js avancent au rythme d’un apprentissage quotidien.", "HTML, CSS, and JavaScript form the core. Python, TypeScript, React, and Node.js grow through daily learning.", "HTML, CSS y JavaScript forman la base. Python, TypeScript, React y Node.js avanzan con aprendizaje diario.", "HTML, CSS ak JavaScript se baz la. Python, TypeScript, React ak Node.js ap vanse ak aprantisaj chak jou."],
  "Socle maîtrisé · reste en progression": ["Socle maîtrisé · reste en progression", "Core skills · still growing", "Base sólida · en progreso", "Baz la solid · ap kontinye aprann"],
  "Compétences techniques et niveaux de progression": ["Compétences techniques et niveaux de progression", "Technical skills and progress levels", "Habilidades técnicas y niveles de progreso", "Konpetans teknik ak nivo pwogrè"],
  "Structure · accessibilité": ["Structure · accessibilité", "Structure · accessibility", "Estructura · accesibilidad", "Estrikti · aksesibilite"],
  "Design · animations": ["Design · animations", "Design · animation", "Diseño · animación", "Design · animasyon"],
  "Langage · scripting": ["Langage · scripting", "Language · scripting", "Lenguaje · scripting", "Langaj · scripting"],
  "En progression · outils": ["En progression · outils", "Growing · tools", "En progreso · herramientas", "Ap pwogrese · zouti"],
  "En progression · applications": ["En progression · applications", "Growing · applications", "En progreso · aplicaciones", "Ap pwogrese · aplikasyon"],
  "En progression · web": ["En progression · web", "Growing · web", "En progreso · web", "Ap pwogrese · web"],
  " : repère de progression": [" : repère de progression", ": progress indicator", ": indicador de progreso", ": endikatè pwogrè"],
  "Base solide": ["Base solide", "Solid foundation", "Base sólida", "Bon baz"],
  "En progression": ["En progression", "In progress", "En progreso", "Ap pwogrese"],
  "WORK / PROJETS": ["WORK / PROJETS", "WORK / PROJECTS", "TRABAJO / PROYECTOS", "TRAVAY / PWOJÈ"],
  "PROJETS SÉLECTIONNÉS": ["PROJETS SÉLECTIONNÉS", "SELECTED PROJECTS", "PROYECTOS DESTACADOS", "PWOJÈ CHWAZI"],
  "Des projets": ["Des projets", "Projects", "Proyectos", "Pwojè"],
  "qui avancent.": ["qui avancent.", "in motion.", "en marcha.", "k ap vanse."],
  "Une sélection de projets visibles sur le profil GitHub public de LUST DEV. Ouvrir chaque fiche pour lire le code, l’historique et le contexte.": ["Une sélection de projets visibles sur le profil GitHub public de LUST DEV. Ouvrir chaque fiche pour lire le code, l’historique et le contexte.", "A selection of projects on LUST DEV’s public GitHub profile. Open each repository to explore its code, history, and context.", "Una selección de proyectos del perfil público de GitHub de LUST DEV. Abre cada repositorio para ver el código, el historial y el contexto.", "Men kèk pwojè sou pwofil GitHub piblik LUST DEV. Louvri chak repo pou wè kòd la, istwa li ak kontèks li."],
  "JavaScript · bot toolkit": ["JavaScript · outils de bots", "JavaScript · bot toolkit", "JavaScript · herramientas para bots", "JavaScript · zouti pou bot"],
  "Une présence publique autour des bots et des outils qui transforment une idée technique en expérience utilisable.": ["Une présence publique autour des bots et des outils qui transforment une idée technique en expérience utilisable.", "A public collection of bots and tools that turn technical ideas into useful experiences.", "Una colección pública de bots y herramientas que convierten ideas técnicas en experiencias útiles.", "Yon koleksyon piblik bot ak zouti ki transfòme lide teknik an eksperyans moun ka itilize."],
  "PUBLIC REPO / JS": ["REPO PUBLIC / JS", "PUBLIC REPO / JS", "REPO PÚBLICO / JS", "REPO PIBLIK / JS"],
  "Python · utility": ["Python · utilitaire", "Python · utility", "Python · utilidad", "Python · zouti"],
  "Un dépôt public qui témoigne d’une approche orientée scripts, vérification et automatisation concrète.": ["Un dépôt public qui témoigne d’une approche orientée scripts, vérification et automatisation concrète.", "A public repository focused on scripts, checks, and practical automation.", "Un repositorio público centrado en scripts, verificaciones y automatización práctica.", "Yon repo piblik ki konsantre sou script, verifikasyon ak otomatizasyon pratik."],
  "PUBLIC REPO / PY": ["REPO PUBLIC / PY", "PUBLIC REPO / PY", "REPO PÚBLICO / PY", "REPO PIBLIK / PY"],
  "JavaScript · open source": ["JavaScript · open source", "JavaScript · open source", "JavaScript · código abierto", "JavaScript · open source"],
  "Un terrain de jeu supplémentaire dans l’écosystème public LUST DEV, à explorer directement sur GitHub.": ["Un terrain de jeu supplémentaire dans l’écosystème public LUST DEV, à explorer directement sur GitHub.", "Another project in the public LUST DEV ecosystem, ready to explore on GitHub.", "Otro proyecto del ecosistema público de LUST DEV, disponible en GitHub.", "Yon lòt pwojè nan ekosistèm piblik LUST DEV, ou ka eksplore l sou GitHub."],
  "PUBLIC REPO / ACTIVITY": ["REPO PUBLIC / ACTIVITÉ", "PUBLIC REPO / ACTIVITY", "REPO PÚBLICO / ACTIVIDAD", "REPO PIBLIK / AKTIVITE"],
  "Open repo": ["Ouvrir le dépôt", "Open repo", "Abrir repositorio", "Louvri repo a"],
  "Voir les 20 dépôts": ["Voir les 20 dépôts", "View all 20 repositories", "Ver los 20 repositorios", "Gade 20 repo yo"],
  "CONNECT / LIENS": ["CONNECT / LIENS", "CONNECT / LINKS", "CONTACTO / ENLACES", "KONEKSYON / LYEN"],
  "RESTER CONNECTÉ": ["RESTER CONNECTÉ", "STAY CONNECTED", "MANTENTE EN CONTACTO", "RETE KONEKTE"],
  "Choisir": ["Choisir", "Choose", "Elige", "Chwazi"],
  "son canal.": ["son canal.", "your channel.", "tu canal.", "chanèl ou."],
  "Retrouver LUST DEV selon son rythme : tutoriels vidéo, mises à jour communautaires ou conversations directes.": ["Retrouver LUST DEV selon son rythme : tutoriels vidéo, mises à jour communautaires ou conversations directes.", "Connect with LUST DEV your way: video tutorials, community updates, or direct conversations.", "Conecta con LUST DEV a tu manera: tutoriales, novedades de la comunidad o conversaciones directas.", "Konekte ak LUST DEV jan ou vle: videyo leson, nouvèl kominote a oswa pale dirèk."],
  "04 CANAUX PUBLICS": ["04 CANAUX PUBLICS", "04 PUBLIC CHANNELS", "04 CANALES PÚBLICOS", "04 CHANÈL PIBLIK"],
  "@欲LUSTDEV望 · tutoriels": ["@欲LUSTDEV望 · tutoriels", "@欲LUSTDEV望 · tutorials", "@欲LUSTDEV望 · tutoriales", "@欲LUSTDEV望 · leson"],
  "Support direct · +1 829 478 6326": ["Support direct · +1 829 478 6326", "Direct support · +1 829 478 6326", "Contacto directo · +1 829 478 6326", "Sipò dirèk · +1 829 478 6326"],
  "Canal LUST DEV": ["Canal LUST DEV", "LUST DEV channel", "Canal LUST DEV", "Chanèl LUST DEV"],
  "@LUST-DEV · repositories": ["@LUST-DEV · dépôts", "@LUST-DEV · repositories", "@LUST-DEV · repositorios", "@LUST-DEV · repo"],
  "Coordonnées professionnelles": ["Coordonnées professionnelles", "Professional contact details", "Datos de contacto profesional", "Enfòmasyon pou kontakte"],
  "CONTACT DIRECT / COLLABORATION": ["CONTACT DIRECT / COLLABORATION", "DIRECT CONTACT / COLLABORATION", "CONTACTO DIRECTO / COLABORACIÓN", "KONTAK DIRÈK / KOLABORASYON"],
  "Réseau LUST DEV": ["Réseau LUST DEV", "LUST DEV network", "Red de LUST DEV", "Rezo LUST DEV"],
  "Planète Terre stylisée, vue depuis l’espace": ["Planète Terre stylisée, vue depuis l’espace", "Stylized planet Earth seen from space", "Planeta Tierra estilizado visto desde el espacio", "Planèt Latè stilize, jan yo wè l depi nan espas"],
  "TEAM / TELEGRAM": ["TEAM / TELEGRAM", "TEAM / TELEGRAM", "EQUIPO / TELEGRAM", "EKIP / TELEGRAM"],
  "ÉQUIPE PUBLIQUE": ["ÉQUIPE PUBLIQUE", "PUBLIC TEAM", "EQUIPO PÚBLICO", "EKIP PIBLIK"],
  "team signal.": ["team signal.", "team signal.", "señal del equipo.", "siyal ekip la."],
  "Une équipe de profils créatifs et techniques à retrouver sur Telegram. Chaque label ouvre directement le profil indiqué.": ["Une équipe de profils créatifs et techniques à retrouver sur Telegram. Chaque label ouvre directement le profil indiqué.", "A team of creative and technical people on Telegram. Each label opens the profile shown.", "Un equipo de perfiles creativos y técnicos en Telegram. Cada etiqueta abre el perfil indicado.", "Yon ekip moun kreyatif ak teknik sou Telegram. Chak non ouvri pwofil korespondan an."],
  "Membres de la Team Telegram": ["Membres de la Team Telegram", "Telegram team members", "Miembros del equipo de Telegram", "Manm ekip Telegram nan"],
  "UNE DERNIÈRE CHOSE": ["UNE DERNIÈRE CHOSE", "ONE LAST THING", "UNA ÚLTIMA COSA", "YON DÈNYE BAGAY"],
  "On se retrouve": ["On se retrouve", "See you", "Nos vemos", "N a wè"],
  "en ligne.": ["en ligne.", "online.", "en línea.", "sou entènèt."],
  "Ouvrir le terrain de jeu": ["Ouvrir le terrain de jeu", "Explore the playground", "Abrir el espacio de proyectos", "Eksplore espas pwojè a"],
  "Independent developer · public by design": ["Développeur indépendant · public par choix", "Independent developer · public by design", "Desarrollador independiente · público por diseño", "Devlopè endepandan · piblik pa chwa"],
  "CGU": ["CGU", "Terms", "Términos", "Kondisyon"],
  "Confidentialité": ["Confidentialité", "Privacy", "Privacidad", "Konfidansyalite"],
  "Retour en haut": ["Retour en haut", "Back to top", "Volver arriba", "Retounen anlè"],
  "Gérer les préférences cookies": ["Gérer les préférences cookies", "Manage cookie preferences", "Administrar preferencias de cookies", "Jere preferans cookies"],
  "autorisés": ["autorisés", "allowed", "permitidas", "aksepte"],
  "nécessaires uniquement": ["nécessaires uniquement", "necessary only", "solo necesarias", "nesesè sèlman"],
  "LUST DEV / CONFIDENTIALITÉ / COOKIES": ["LUST DEV / CONFIDENTIALITÉ / COOKIES", "LUST DEV / PRIVACY / COOKIES", "LUST DEV / PRIVACIDAD / COOKIES", "LUST DEV / KONFIDANSYALITE / COOKIES"],
  "Un site simple, sans suivi caché.": ["Un site simple, sans suivi caché.", "A simple site, no hidden tracking.", "Un sitio sencillo, sin seguimiento oculto.", "Yon sit senp, san swivi kache."],
  "Les cookies nécessaires mémorisent tes préférences. Les services non essentiels, comme l’Analytics ou reCAPTCHA, restent désactivés tant que tu ne les autorises pas.": ["Les cookies nécessaires mémorisent tes préférences. Les services non essentiels, comme l’Analytics ou reCAPTCHA, restent désactivés tant que tu ne les autorises pas.", "Necessary cookies remember your preferences. Non-essential services, such as analytics or reCAPTCHA, stay off until you allow them.", "Las cookies necesarias recuerdan tus preferencias. Los servicios no esenciales, como Analytics o reCAPTCHA, permanecen desactivados hasta que los autorices.", "Cookies ki nesesè yo sonje preferans ou. Sèvis ki pa nesesè, tankou analytics oswa reCAPTCHA, rete dezaktive jiskaske ou otorize yo."],
  "Nécessaires : consentement et préférences d’interface. Ils permettent au site de fonctionner.": ["Nécessaires : consentement et préférences d’interface. Ils permettent au site de fonctionner.", "Necessary: consent and interface preferences. They help the site work.", "Necesarias: consentimiento y preferencias de interfaz. Permiten que el sitio funcione.", "Nesesè: konsantman ak preferans entèfas. Yo ede sit la fonksyone."],
  "Non essentiels : aucun service de mesure, publicité ou reCAPTCHA n’est chargé actuellement.": ["Non essentiels : aucun service de mesure, publicité ou reCAPTCHA n’est chargé actuellement.", "Non-essential: no analytics, advertising, or reCAPTCHA service is currently loaded.", "No esenciales: actualmente no se carga ningún servicio de medición, publicidad o reCAPTCHA.", "Ki pa nesesè: kounye a, pa gen sèvis mezi, piblisite oswa reCAPTCHA ki chaje."],
  "Masquer": ["Masquer", "Hide", "Ocultar", "Kache"],
  "Détails": ["Détails", "Details", "Detalles", "Detay"],
  "Refuser": ["Refuser", "Decline", "Rechazar", "Refize"],
  "Autoriser": ["Autoriser", "Allow", "Aceptar", "Otorize"],
  "Conditions générales d’utilisation": ["Conditions générales d’utilisation", "Terms of Use", "Términos de uso", "Kondisyon itilizasyon"],
  "LUST DEV / CGU": ["LUST DEV / CGU", "LUST DEV / TERMS", "LUST DEV / TÉRMINOS", "LUST DEV / KONDISYON"],
  "Ces conditions encadrent l’utilisation du portfolio public de LUST DEV.": ["Ces conditions encadrent l’utilisation du portfolio public de LUST DEV.", "These terms govern the use of the public LUST DEV portfolio.", "Estas condiciones rigen el uso del portfolio público de LUST DEV.", "Kondisyon sa yo esplike kijan pou itilize pòtfèy piblik LUST DEV la."],
  "Politique de confidentialité": ["Politique de confidentialité", "Privacy Policy", "Política de privacidad", "Règleman konfidansyalite"],
  "LUST DEV / CONFIDENTIALITÉ": ["LUST DEV / CONFIDENTIALITÉ", "LUST DEV / PRIVACY", "LUST DEV / PRIVACIDAD", "LUST DEV / KONFIDANSYALITE"],
  "Cette page explique quelles données peuvent être traitées et pourquoi.": ["Cette page explique quelles données peuvent être traitées et pourquoi.", "This page explains what data may be processed and why.", "Esta página explica qué datos pueden tratarse y por qué.", "Paj sa a esplike ki done yo ka trete ak rezon an."],
  "Retour au portfolio": ["Retour au portfolio", "Back to portfolio", "Volver al portfolio", "Retounen nan pòtfèy la"],
  "DOCUMENT PUBLIC": ["DOCUMENT PUBLIC", "PUBLIC DOCUMENT", "DOCUMENTO PÚBLICO", "DOKIMAN PIBLIK"],
  "Dernière mise à jour : 3 octobre 2026 · Lecture claire, sans jargon inutile": ["Dernière mise à jour : 3 octobre 2026 · Lecture claire, sans jargon inutile", "Last updated: October 3, 2026 · Clear language, no unnecessary jargon", "Última actualización: 3 de octubre de 2026 · Claro y sin jerga innecesaria", "Dènye mizajou: 3 oktòb 2026 · Langaj klè, san mo konplike"],
  "Sections de la page": ["Sections de la page", "Page sections", "Secciones de la página", "Seksyon paj la"],
  "INDEX": ["INDEX", "CONTENTS", "ÍNDICE", "ENDÈKS"],
  "Objet": ["Objet", "Purpose", "Propósito", "Objektif"],
  "Utilisation acceptable": ["Utilisation acceptable", "Acceptable use", "Uso aceptable", "Itilizasyon ki akseptab"],
  "Propriété intellectuelle": ["Propriété intellectuelle", "Intellectual property", "Propiedad intelectual", "Pwopriyete entelektyèl"],
  "Liens externes": ["Liens externes", "External links", "Enlaces externos", "Lyen ekstèn"],
  "Disponibilité": ["Disponibilité", "Availability", "Disponibilidad", "Disponibilite"],
  "Contact": ["Contact", "Contact", "Contacto", "Kontak"],
  "Données traitées": ["Données traitées", "Data processed", "Datos tratados", "Done yo trete"],
  "Cookies nécessaires": ["Cookies nécessaires", "Necessary cookies", "Cookies necesarias", "Cookies ki nesesè"],
  "Analytics optionnel": ["Analytics optionnel", "Optional analytics", "Analítica opcional", "Analytics opsyonèl"],
  "Services externes": ["Services externes", "External services", "Servicios externos", "Sèvis ekstèn"],
  "Sécurité et conservation": ["Sécurité et conservation", "Security and retention", "Seguridad y conservación", "Sekirite ak konsèvasyon"],
  "Contact et droits": ["Contact et droits", "Contact and rights", "Contacto y derechos", "Kontak ak dwa"],
  "Le site présente le travail, les projets et les canaux publics de Joseph Lusty Gregoire, connu sous le nom de LUST DEV. La consultation du site est libre et gratuite.": ["Le site présente le travail, les projets et les canaux publics de Joseph Lusty Gregoire, connu sous le nom de LUST DEV. La consultation du site est libre et gratuite.", "This site presents the work, projects, and public channels of Joseph Lusty Gregoire, known as LUST DEV. The site is free to browse.", "Este sitio presenta el trabajo, los proyectos y los canales públicos de Joseph Lusty Gregoire, conocido como LUST DEV. El sitio es de acceso gratuito.", "Sit sa a prezante travay, pwojè ak chanèl piblik Joseph Lusty Gregoire, yo konnen sou non LUST DEV. Nenpòt moun ka vizite sit la gratis."],
  "L’utilisateur s’engage à ne pas perturber le fonctionnement du site, contourner ses mesures de sécurité, envoyer des contenus automatisés abusifs ou tenter d’exploiter une vulnérabilité.": ["L’utilisateur s’engage à ne pas perturber le fonctionnement du site, contourner ses mesures de sécurité, envoyer des contenus automatisés abusifs ou tenter d’exploiter une vulnérabilité.", "Users must not disrupt the site, bypass its security measures, send abusive automated content, or attempt to exploit a vulnerability.", "Los usuarios no deben interrumpir el sitio, eludir sus medidas de seguridad, enviar contenido automatizado abusivo ni intentar explotar vulnerabilidades.", "Itilizatè yo pa dwe deranje sit la, kontoune sekirite li, voye kontni otomatik ki bay pwoblèm, oswa eseye eksplwate yon vilnerabilite."],
  "Les textes, éléments graphiques et créations identifiés comme LUST DEV restent protégés par les droits applicables. Les dépôts GitHub liés conservent leurs propres licences.": ["Les textes, éléments graphiques et créations identifiés comme LUST DEV restent protégés par les droits applicables. Les dépôts GitHub liés conservent leurs propres licences.", "Text, graphics, and work identified as LUST DEV remain protected by applicable rights. Linked GitHub repositories retain their own licenses.", "Los textos, gráficos y creaciones identificados como LUST DEV están protegidos por la legislación aplicable. Los repositorios enlazados conservan sus propias licencias.", "Tèks, grafik ak kreyasyon ki idantifye kòm LUST DEV rete pwoteje dapre lalwa ki aplikab. Repo GitHub ki lye yo kenbe pwòp lisans pa yo."],
  "Les liens vers GitHub, YouTube, Telegram, WhatsApp et d’autres services mènent vers des plateformes tierces soumises à leurs propres conditions et politiques.": ["Les liens vers GitHub, YouTube, Telegram, WhatsApp et d’autres services mènent vers des plateformes tierces soumises à leurs propres conditions et politiques.", "Links to GitHub, YouTube, Telegram, WhatsApp, and other services lead to third-party platforms with their own terms and policies.", "Los enlaces a GitHub, YouTube, Telegram, WhatsApp y otros servicios conducen a plataformas externas con sus propias condiciones y políticas.", "Lyen pou GitHub, YouTube, Telegram, WhatsApp ak lòt sèvis mennen sou platfòm lòt konpayi ki gen pwòp kondisyon ak règleman yo."],
  "Le site est fourni avec une obligation de moyens. Une interruption temporaire peut survenir pour maintenance, déploiement ou incident d’hébergement.": ["Le site est fourni avec une obligation de moyens. Une interruption temporaire peut survenir pour maintenance, déploiement ou incident d’hébergement.", "The site is provided on a best-effort basis. Temporary interruptions may occur for maintenance, deployment, or hosting incidents.", "El sitio se ofrece con los medios disponibles. Puede interrumpirse temporalmente por mantenimiento, despliegues o incidencias del alojamiento.", "Yo fè tout efò rezonab pou sit la mache. Li ka kanpe tanporèman pou antretyen, deplwaman oswa pwoblèm nan hosting."],
  "Pour toute question : {email}.": ["Pour toute question : {email}.", "For questions, contact {email}.", "Para cualquier consulta: {email}.", "Pou nenpòt kesyon: {email}."],
  "Le portfolio ne demande pas de compte et ne contient actuellement aucun formulaire de contact ni base de données. Les informations publiées sont limitées aux coordonnées professionnelles et liens choisis par LUST DEV.": ["Le portfolio ne demande pas de compte et ne contient actuellement aucun formulaire de contact ni base de données. Les informations publiées sont limitées aux coordonnées professionnelles et liens choisis par LUST DEV.", "The portfolio requires no account and currently has no contact form or database. Published information is limited to professional contact details and links chosen by LUST DEV.", "El portfolio no requiere cuenta y actualmente no incluye formulario de contacto ni base de datos. La información publicada se limita a los datos profesionales y enlaces elegidos por LUST DEV.", "Pòtfèy la pa mande kont epi li pa gen fòm kontak ni baz done kounye a. Enfòmasyon ki parèt yo limite ak kontak pwofesyonèl ak lyen LUST DEV chwazi."],
  "Un cookie local nommé lust_cookie_consent mémorise ton choix de consentement pendant 180 jours. Il sert uniquement aux préférences du site.": ["Un cookie local nommé lust_cookie_consent mémorise ton choix de consentement pendant 180 jours. Il sert uniquement aux préférences du site.", "A local cookie named lust_cookie_consent stores your consent choice for 180 days. It is used only for site preferences.", "Una cookie local llamada lust_cookie_consent guarda tu elección durante 180 días. Solo se usa para las preferencias del sitio.", "Yon cookie lokal ki rele lust_cookie_consent sonje chwa konsantman ou pandan 180 jou. Li sèvi sèlman pou preferans sit la."],
  "Google Analytics 4 n’est chargé que si l’identifiant de mesure est configuré et après l’autorisation des cookies non essentiels. L’adresse IP est configurée pour être anonymisée. Sans identifiant ou sans consentement, aucun script Analytics n’est chargé.": ["Google Analytics 4 n’est chargé que si l’identifiant de mesure est configuré et après l’autorisation des cookies non essentiels. L’adresse IP est configurée pour être anonymisée. Sans identifiant ou sans consentement, aucun script Analytics n’est chargé.", "Google Analytics 4 loads only when a measurement ID is configured and non-essential cookies are allowed. IP anonymization is enabled. Without the ID or consent, no Analytics script loads.", "Google Analytics 4 solo se carga si hay un ID de medición configurado y se autorizan las cookies no esenciales. La IP se anonimiza. Sin ID o consentimiento, no se carga Analytics.", "Google Analytics 4 chaje sèlman si yo mete yon ID mezi epi ou aksepte cookies ki pa nesesè. Yo aktive anonimasyon IP. San ID oswa konsantman, okenn script Analytics pa chaje."],
  "Lorsque tu ouvres un lien social, le traitement relève de la politique de la plateforme concernée. Le site ne revend pas de données et n’utilise pas de publicité personnalisée.": ["Lorsque tu ouvres un lien social, le traitement relève de la politique de la plateforme concernée. Le site ne revend pas de données et n’utilise pas de publicité personnalisée.", "When you open a social link, the relevant platform's privacy policy applies. This site does not sell data or use personalized advertising.", "Al abrir un enlace social, se aplica la política de la plataforma correspondiente. El sitio no vende datos ni utiliza publicidad personalizada.", "Lè ou louvri yon lyen sosyal, règleman platfòm sa a aplike. Sit la pa vann done epi li pa sèvi ak piblisite pèsonalize."],
  "Aucune donnée de formulaire n’est stockée par ce site actuellement. Les protections HTTP et les limites anti-abus sont activées côté serveur pour réduire les requêtes malveillantes. reCAPTCHA est préparé pour un futur formulaire, mais n’est pas chargé tant qu’aucune action protégée n’existe.": ["Aucune donnée de formulaire n’est stockée par ce site actuellement. Les protections HTTP et les limites anti-abus sont activées côté serveur pour réduire les requêtes malveillantes. reCAPTCHA est préparé pour un futur formulaire, mais n’est pas chargé tant qu’aucune action protégée n’existe.", "This site does not currently store form data. Server-side HTTP protections and abuse limits help reduce malicious requests. reCAPTCHA is prepared for a future form but is not loaded unless a protected action exists.", "Este sitio no almacena datos de formularios actualmente. Las protecciones HTTP y los límites contra abusos reducen las solicitudes maliciosas. reCAPTCHA está previsto para un formulario futuro, pero no se carga mientras no haya una acción protegida.", "Sit la pa sere done fòm kounye a. Pwoteksyon HTTP ak limit kont abi sou sèvè a ede diminye demann ki danjere. Yo pare reCAPTCHA pou yon fòm alavni, men li pa chaje jiskaske gen yon aksyon ki bezwen pwoteksyon."],
  "Pour une demande liée à la confidentialité : {email}.": ["Pour une demande liée à la confidentialité : {email}.", "For privacy requests, contact {email}.", "Para consultas de privacidad, escribe a {email}.", "Pou demann sou konfidansyalite, ekri {email}."],
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (source: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "lust-dev-language";

function matchLanguage(value: string | null | undefined): Language | null {
  const code = value?.toLowerCase().split(/[-_]/)[0];
  return languageCodes.find((language) => language === code) ?? null;
}

function initialLanguage(): Language {
  if (typeof window === "undefined") return "fr";
  try {
    const stored = matchLanguage(window.localStorage.getItem(STORAGE_KEY));
    if (stored) return stored;
  } catch {
    // Use the browser's language when storage is unavailable.
  }
  for (const preferred of window.navigator.languages ?? [window.navigator.language]) {
    const detected = matchLanguage(preferred);
    if (detected) return detected;
  }
  return "fr";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Language still works for the current page when storage is unavailable.
    }
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    t: (source) => copy[source]?.[languageIndex[language]] ?? source,
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
