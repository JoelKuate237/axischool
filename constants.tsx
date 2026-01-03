
import { Workshop, FAQItem } from './types';

export const STRIPE_URL = "https://buy.stripe.com/5kQ9ATf6DeY5euj66caIM09";
export const EMAIL_CONTACT = "hello@dhcompany.pro";
export const PHONE_CONTACT = "+32465557109";

export const WORKSHOPS: Workshop[] = [
  {
    id: 'zeros',
    title: "L'IA pour tous ! Découvrez comment ça marche (pour les Zéros)",
    promise: "Une immersion totale pour comprendre enfin l'IA sans jargon. Apprenez les bases solides pour ne plus jamais être dépassé par la technologie.",
    colorTheme: 'amber',
    forWhom: ["Débutants complets", "Indépendants", "Curieux"],
    expectedResults: [
      "Maîtrise des concepts clés de l'IA générative",
      "Configuration optimale de ChatGPT",
      "Identification des meilleurs outils gratuits pour votre usage"
    ],
    deliverables: ["Guide de démarrage rapide", "Liste d'outils indispensables"],
    prerequisites: ["Aucun prérequis technique"],
    timeline: [
      { time: "00:00", activity: "Démystification : l'IA en langage humain" },
      { time: "01:30", activity: "Atelier pratique : vos premières requêtes efficaces" },
      { time: "03:00", activity: "Sécuriser ses données et éviter les erreurs classiques" }
    ]
  },
  {
    id: 'support',
    title: "Automatiser le support client avec un agent IA",
    promise: "Transformez votre service client en une machine de guerre disponible 24/7. L'IA gère les questions répétitives pour vous laisser vous concentrer sur l'essentiel.",
    colorTheme: 'indigo',
    forWhom: ["E-commerçants", "Agences", "Managers de support"],
    expectedResults: [
      "Réponses instantanées et précises aux clients",
      "Réduction drastique du temps de traitement des tickets",
      "Amélioration de la satisfaction client globale"
    ],
    deliverables: ["Agent IA configuré", "Protocole de réponse"],
    prerequisites: ["Posséder un site web ou un volume de requêtes client"],
    timeline: [
      { time: "00:00", activity: "Audit de vos questions récurrentes" },
      { time: "01:30", activity: "Construction de l'agent intelligent personnalisé" },
      { time: "03:00", activity: "Déploiement et tests en situation réelle" }
    ]
  },
  {
    id: 'marketing',
    title: "AI appliqué au marketing (Outils et scénarios)",
    promise: "Générez du contenu de haute qualité en masse. De la stratégie social media à la rédaction de publicités, l'IA devient votre meilleur copywriter.",
    colorTheme: 'rose',
    forWhom: ["Responsables Marketing", "Freelances", "Créateurs de contenu"],
    expectedResults: [
      "Production de contenu 10x plus rapide",
      "Optimisation des campagnes publicitaires par l'IA",
      "Création de visuels et textes à haute conversion"
    ],
    deliverables: ["Bibliothèque de prompts marketing", "Plan de contenu IA"],
    prerequisites: ["Avoir une marque ou un service à promouvoir"],
    timeline: [
      { time: "00:00", activity: "Stratégie de contenu assistée par IA" },
      { time: "01:30", activity: "Atelier rédactionnel et visuel (Copywriting + Image)" },
      { time: "03:00", activity: "Automatisation de la diffusion marketing" }
    ]
  },
  {
    id: 'rag',
    title: "Créer un assistant interne sur vos données - (RAG)",
    promise: "Faites parler vos propres documents. Un moteur de recherche privé qui connaît tout de votre entreprise, de vos contrats à vos procédures.",
    colorTheme: 'emerald',
    forWhom: ["RH", "Juristes", "Gestionnaires de connaissances"],
    expectedResults: [
      "Accès immédiat à l'information interne complexe",
      "Zéro perte de temps à chercher dans les dossiers",
      "Confidentialité totale de vos données"
    ],
    deliverables: ["Base de connaissances IA active", "Guide de maintenance"],
    prerequisites: ["Avoir des documents internes exploitables (PDF, Word, etc.)"],
    timeline: [
      { time: "00:00", activity: "Préparation et nettoyage des données internes" },
      { time: "01:30", activity: "Mise en place de l'assistant sur-mesure" },
      { time: "03:00", activity: "Tests de pertinence et sécurité data" }
    ]
  },
  {
    id: 'uxui',
    title: "UX/UI et IA (Outils et applications)",
    promise: "Boostez votre workflow créatif. Utilisez l'IA pour le prototypage rapide, la génération d'assets et l'optimisation de vos interfaces.",
    colorTheme: 'violet',
    forWhom: ["UX/UI Designers", "Graphistes", "Développeurs Front-end"],
    expectedResults: [
      "Création d'assets graphiques uniques en secondes",
      "Rédaction de contenus UX intelligents",
      "Vitesse de prototypage multipliée par 5"
    ],
    deliverables: ["Kit d'outils design IA", "Workflow Figma optimisé"],
    prerequisites: ["Connaissance de base de Figma"],
    timeline: [
      { time: "00:00", activity: "IA générative pour le design (Images & Icônes)" },
      { time: "01:30", activity: "Optimisation de l'UX Writing avec l'IA" },
      { time: "03:00", activity: "Du prototype à la maquette finale avec IA" }
    ]
  },
  {
    id: 'nocode',
    title: "Automatisez avec l'IA (sans coder)",
    promise: "Éliminez les tâches manuelles invisibles. Connectez vos outils préférés à l'IA pour créer des processus automatiques qui travaillent pendant que vous dormez.",
    colorTheme: 'sky',
    forWhom: ["Opérations", "Chefs de projet", "Administrateurs"],
    expectedResults: [
      "Zéro ressaisie de données manuelle",
      "Processus fluides entre vos applications",
      "Réduction des erreurs humaines de 90%"
    ],
    deliverables: ["Schéma d'automatisation actif", "Accès aux templates"],
    prerequisites: ["Utiliser des outils cloud (Google Suite, Slack, :etc.)"],
    timeline: [
      { time: "00:00", activity: "Cartographie de vos flux de travail actuels" },
      { time: "01:30", activity: "Construction d'automatisations No-Code" },
      { time: "03:00", activity: "Mise en production et surveillance" }
    ]
  },
  {
    id: 'productivity',
    title: "Arrêtez les tâches répétitives ! Automatisez votre travail avec l'IA (sans coder)",
    promise: "Gagnez un jour complet de liberté par semaine. Automatisez vos emails, vos comptes-rendus et votre organisation personnelle.",
    colorTheme: 'orange',
    forWhom: ["Managers", "Assistants de direction", "Solopreneurs"],
    expectedResults: [
      "Email inbox gérée intelligemment",
      "Réunions synthétisées en un clic",
      "Gestion d'agenda optimisée par l'IA"
    ],
    deliverables: ["Pack de productivité personnalisé", "Cheat sheet de prompts"],
    prerequisites: ["Vouloir simplifier radicalement son quotidien"],
    timeline: [
      { time: "00:00", activity: "Audit de votre temps de travail" },
      { time: "01:30", activity: "Déploiement de vos assistants personnels" },
      { time: "03:00", activity: "Optimisation de votre routine de productivité" }
    ]
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: "Est-ce un investissement rentable ?",
    answer: "Absolument. En moyenne, nos participants économisent 8h de travail par semaine après un seul atelier. L'investissement est généralement récupéré en moins de 3 jours de travail grâce au gain de temps généré."
  },
  {
    question: "Comment sont fixées les dates des ateliers ?",
    answer: "Pour garantir une dynamique de groupe optimale et des échanges de qualité, les sessions sont programmées dès que le seuil de 5 participants est atteint pour un atelier spécifique."
  },
  {
    question: "Quelle est votre politique en cas d'annulation ?",
    answer: "En cas d'annulation de votre part ou d'imprévu, le montant versé n'est pas perdu : il est crédité sous forme d'avoir, valable sur n'importe quelle autre formation ou atelier de notre catalogue."
  },
  {
    question: "L'IA est-elle compliquée à prendre en main ?",
    answer: "C'est l'outil le plus accessible jamais créé car il comprend le langage naturel. Nous vous apprenons à 'piloter' plutôt qu'à programmer, ce qui rend l'apprentissage rapide et ludique."
  },
  {
    question: "Puis-je financer cette formation ?",
    answer: "Oui, nous travaillons avec plusieurs organismes de formation et partenaires sectoriels. Contactez-nous pour connaître les modalités spécifiques à votre situation."
  }
];
