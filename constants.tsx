
import { Workshop, FAQItem } from './types.ts';

export const STRIPE_URL = "https://book.stripe.com/bJe4gAcgz3oPcvvf2Offy0y";
export const EMAIL_CONTACT = "hello@dhcompany.pro";
export const PHONE_CONTACT = "+32465557109";

export const LEGAL_MENTIONS = {
  title: "Mentions Légales",
  content: `AXIA Académie est une marque de DH Company.
  Siège social : Bruxelles, Belgique.
  Coordinateur des formations : Joël Parfait Kuate.
  Hébergement : Vercel Inc.
  Contact : hello@dhcompany.pro
  
  L'utilisation de ce site implique l'acceptation pleine et entière des conditions générales d'utilisation. Toutes les formations dispensées sont soumises à nos conditions générales de vente.`
};

export const CONFIDENTIALITY_POLICY = {
  title: "Politique de Confidentialité",
  content: `Nous accordons une importance capitale à la protection de vos données. 
  Les informations recueillies via nos formulaires de contact ou lors de vos inscriptions sont exclusivement destinées à la gestion de vos formations et à notre communication interne.
  Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles sur simple demande à hello@dhcompany.pro.`
};

export const WORKSHOPS: Workshop[] = [
  // NIVEAU 1
  {
    id: 'w1',
    title: "IA & Veille stratégique pour dirigeants et managers",
    level: 1,
    levelLabel: "Veille IA métier",
    inspiration: "Executive Programs (MIT, INSEAD)",
    goal: "Savoir décider sans subir la hype.",
    objectives: [
      "Identifier les ruptures technologiques majeures de votre secteur",
      "Évaluer le potentiel de ROI des outils IA actuels",
      "Cartographier les risques juridiques et éthiques (IA Act)",
      "Définir une feuille de route IA cohérente avec votre vision"
    ],
    veille: "Analyse des tendances 2025, signaux faibles sectoriels and risques cyber.",
    practice: "Construction d'un tableau de décision personnalisé (Buy vs Build).",
    deliverable: "Grille de priorisation ROI / Risques actionnable immédiatement.",
    colorTheme: 'emerald'
  },
  {
    id: 'w2',
    title: "IA & Veille marketing / communication",
    level: 1,
    levelLabel: "Veille IA métier",
    inspiration: "Growth Labs US",
    goal: "Suivre les bons outils, pas les buzz.",
    objectives: [
      "Maîtriser les outils de génération de contenu (Texte, Image, Vidéo)",
      "Optimiser son SEO grâce à l'IA générative",
      "Automatiser sa veille concurrentielle en temps réel",
      "Personnaliser les campagnes publicitaires à l'échelle"
    ],
    veille: "Évolution des algorithmes social media et outils de production IA.",
    practice: "Mise en place d'un mini-système de production autonome.",
    deliverable: "Plan marketing augmenté prêt pour 1 mois de diffusion.",
    colorTheme: 'emerald'
  },
  {
    id: 'w3',
    title: "IA & Veille pour fonctions support (RH, admin, finance)",
    level: 1,
    levelLabel: "Veille IA métier",
    inspiration: "Corporate Productivity Labs",
    goal: "Réduire le travail invisible.",
    objectives: [
      "Automatiser la saisie et le tri documentaire",
      "Générer des reportings financiers commentés en 1 clic",
      "Optimiser le sourcing et le filtrage des talents (RH)",
      "Centraliser la connaissance interne pour un accès rapide"
    ],
    veille: "L'IA dans les ERP et outils de bureautique (Copilot, Gemini).",
    practice: "Automatisation concrète de 2 processus chronophages réels.",
    deliverable: "Tableau de gain de temps et process automatisés.",
    colorTheme: 'emerald'
  },
  // NIVEAU 2
  {
    id: 'w4',
    title: "IA pour la relation client & le support",
    level: 2,
    levelLabel: "IA appliquée",
    inspiration: "CX Automation Programs",
    goal: "Créer un support disponible 24/7.",
    objectives: [
      "Concevoir un agent conversationnel empathique et précis",
      "Réduire le temps de résolution (First Call Resolution)",
      "Connecter l'IA à vos bases de connaissances existantes",
      "Gérer les escalades intelligentes vers l'humain"
    ],
    veille: "Anatomie des agents intelligents et des chatbots de 3ème génération.",
    practice: "Déploiement d'un agent de support supervisé sur vos données.",
    deliverable: "Agent IA fonctionnel et règles d'escalade.",
    colorTheme: 'amber'
  },
  {
    id: 'w5',
    title: "IA pour la vente & la prospection",
    level: 2,
    levelLabel: "IA appliquée",
    inspiration: "Sales Enablement Labs",
    goal: "Personnaliser à l'échelle pour convertir.",
    objectives: [
      "Automatiser la recherche de prospects ultra-ciblés",
      "Rédiger des séquences emails personnalisées indétectables",
      "Optimiser le scoring des leads en temps réel",
      "Accélérer le closing grâce aux insights prédictifs"
    ],
    veille: "Techniques de Sales Intelligence et personnalisation multicanale.",
    practice: "Création d'une séquence de prospection complète avec IA.",
    deliverable: "Pipeline commercial optimisé et scripts de vente.",
    colorTheme: 'amber'
  },
  {
    id: 'w6',
    title: "IA pour PME & opérations internes",
    level: 2,
    levelLabel: "IA appliquée",
    inspiration: "SME Automation Playbooks",
    goal: "Fluidifier les process quotidiens.",
    objectives: [
      "Interconnecter les outils existants (Zapier/Make + IA)",
      "Automatiser la gestion des stocks et de la logistique",
      "Mettre en place un assistant de facturation intelligent",
      "Simplifier la gestion de projets avec l'aide de l'IA"
    ],
    veille: "Écosystème des outils d'automatisation no-code IA.",
    practice: "Création de workflows transverses entre vos applications.",
    deliverable: "Workflow opérationnel automatisé de bout en bout.",
    colorTheme: 'amber'
  },
  {
    id: 'w7',
    title: "IA pour la création, UX/UI & produit",
    level: 2,
    levelLabel: "IA appliquée",
    inspiration: "Product & Design Sprints IA",
    goal: "Accélérer le cycle de conception.",
    objectives: [
      "Générer des wireframes et prototypes en quelques minutes",
      "Automatiser la création d'assets visuels et d'icônes",
      "Utiliser l'IA pour simuler des tests utilisateurs",
      "Affiner le tone-of-voice produit avec des LLMs"
    ],
    veille: "Prototypage rapide et design system assisté par IA.",
    practice: "Design d'une interface complète à partir d'un prompt.",
    deliverable: "Prototype haute fidélité et assets créatifs.",
    colorTheme: 'amber'
  },
  // NIVEAU 3
  {
    id: 'w8',
    title: "IA & données internes pour métiers réglementés",
    level: 3,
    levelLabel: "Données & intelligence",
    inspiration: "Legal, RH & Finance Sectors",
    goal: "Sécuriser et exploiter vos savoirs.",
    objectives: [
      "Comprendre le fonctionnement du RAG (Retrieval Augmented Generation)",
      "Assurer la confidentialité stricte des données sensibles",
      "Mettre en place une recherche sémantique documentaire",
      "Former l'IA sur vos procédures et contrats spécifiques"
    ],
    veille: "Gouvernance des données, stockage local (on-premise) et sécurité.",
    practice: "Configuration d'un moteur de recherche intelligent sur PDF métier.",
    deliverable: "Assistant documentaire interne ultra-sécurisé.",
    colorTheme: 'orange'
  },
  {
    id: 'w9',
    title: "IA & reporting intelligent",
    level: 3,
    levelLabel: "Données & intelligence",
    inspiration: "Analytics & BI Augmentés",
    goal: "Rendre la donnée intelligible.",
    objectives: [
      "Transformer des tableaux bruts en récits stratégiques",
      "Prédire les tendances futures à partir de l'historique",
      "Automatiser la génération de dashboards narratifs",
      "Détecter les anomalies et opportunités cachées"
    ],
    veille: "Fusion de l'IA et de la Data Intelligence (Analytics prédictifs).",
    practice: "Génération automatique d'un rapport de performance commenté.",
    deliverable: "Système de reporting qui analyse et propose.",
    colorTheme: 'orange'
  },
  // NIVEAU 4
  {
    id: 'w10',
    title: "IA pour équipes IT & product",
    level: 4,
    levelLabel: "Technique & Architecture",
    inspiration: "IT Architect foundations",
    goal: "Intégrer l'IA sous le capot.",
    objectives: [
      "Maîtriser les appels API (OpenAI, Anthropic, Mistral)",
      "Comprendre les paramètres techniques (Température, Top-P)",
      "Gérer le streaming de réponses et la latence",
      "Calculer et optimiser les coûts de tokens"
    ],
    veille: "Architecture des LLMs, benchmarks et limites techniques.",
    practice: "Développement d'une intégration API simple dans une App.",
    deliverable: "Compréhension technique profonde sans bullshit.",
    colorTheme: 'rose'
  },
  {
    id: 'w11',
    title: "Agents IA métier codés (Python)",
    level: 4,
    levelLabel: "Technique & Architecture",
    inspiration: "Agentic IA Labs",
    goal: "Développer l'autonomie machine.",
    objectives: [
      "Coder des agents capables d'utiliser des outils (Function Calling)",
      "Mettre en place une mémoire à long terme pour vos agents",
      "Orchestrer plusieurs agents pour des tâches complexes",
      "Monitorer les décisions prises par l'IA"
    ],
    veille: "Frameworks agentiques (CrewAI, AutoGen, LangChain).",
    practice: "Codage d'un agent capable de planifier et d'exécuter.",
    deliverable: "Agent Python fonctionnel et script d'orchestration.",
    colorTheme: 'rose'
  },
  {
    id: 'w12',
    title: "Architecture IA sectorielle & scale",
    level: 4,
    levelLabel: "Technique & Architecture",
    inspiration: "Cloud & AI Architecture Programs",
    goal: "Industrialiser vos projets IA.",
    objectives: [
      "Designer une architecture cloud hybride pour l'IA",
      "Mettre en place un cycle MLOps / LLMOps",
      "Assurer la scalabilité et la haute disponibilité",
      "Gérer la conformité et le monitoring à grande échelle"
    ],
    veille: "Infrastructure IA, GPU, Cloud Providers et coûts de scale.",
    practice: "Design complet d'une architecture IA pour une PME/ETI.",
    deliverable: "Blueprint d'architecture prêt pour déploiement.",
    colorTheme: 'rose'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: "Puis-je financer cette formation ?",
    answer: "Oui, nous travaillons avec plusieurs organismes de formation et partenaires sectoriels. Contactez-nous pour connaître les modalités spécifiques à votre situation."
  },
  {
    question: "L'IA est-elle compliquée à prendre en main ?",
    answer: "C'est l'outil le plus accessible jamais créé car il comprend le langage naturel. Nous vous apprenons à 'piloter' plutôt qu'à programmer, ce qui rend l'apprentissage rapide et ludique."
  },
  {
    question: "Quelle est votre politique en cas d'annulation ?",
    answer: "En cas d'annulation de votre part ou d'imprévu, le montant versé n'est pas perdu : il est crédité sous forme d'avoir, valable sur n'importe quelle autre formation ou atelier de notre catalogue."
  },
  {
    question: "Comment sont fixées les dates des ateliers ?",
    answer: "Pour garantir une dynamique de groupe optimale et des échanges de qualité, les sessions sont programmées dès que le seuil de 5 participants est atteint pour un atelier spécifique."
  },
  {
    question: "Est-ce un investissement rentable ?",
    answer: "Absolument. En moyenne, nos participants économisent 8h de travail par semaine après un seul atelier. L'investissement est généralement récupéré en moins de 3 jours de travail grâce au gain de temps généré."
  }
];
