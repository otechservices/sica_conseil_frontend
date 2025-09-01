// Base de données complète de questions PMP authentiques basées sur le PMI Institute
export interface PMPQuestion {
  id: number
  domain: "Personnes" | "Processus" | "Environnement"
  question: string
  options: string[]
  correct: number
  explanation: string
  difficulty: "Facile" | "Moyen" | "Difficile"
  pmbok_reference: string
  situation_type: "Situationnel" | "Définition" | "Application" | "Analyse"
}

export const pmpQuestions: PMPQuestion[] = [
  // DOMAINE PERSONNES - Leadership et gestion d'équipe
  {
    id: 1,
    domain: "Personnes",
    question:
      "Vous dirigez un projet avec une équipe distribuée dans 4 pays différents. Lors des réunions virtuelles, vous remarquez que certains membres ne participent pas activement et semblent désengagés. Quelle est votre première action en tant que leader servant ?",
    options: [
      "Organiser des réunions individuelles pour comprendre les préoccupations de chaque membre",
      "Envoyer un email rappelant l'importance de la participation active",
      "Modifier le format des réunions pour les rendre plus interactives",
      "Demander au sponsor d'intervenir pour motiver l'équipe",
    ],
    correct: 0,
    explanation:
      "Le leadership servant implique d'abord d'écouter et de comprendre les besoins individuels. Les réunions individuelles permettent d'identifier les obstacles spécifiques à chaque membre et de développer des solutions personnalisées.",
    difficulty: "Moyen",
    pmbok_reference: "Section 3.4 - Leadership",
    situation_type: "Situationnel",
  },
  {
    id: 2,
    domain: "Personnes",
    question:
      "Votre équipe projet traverse la phase de 'storming' selon le modèle de Tuckman. Les conflits entre développeurs et testeurs s'intensifient concernant les critères d'acceptation. Comment devez-vous intervenir ?",
    options: [
      "Laisser l'équipe résoudre le conflit naturellement",
      "Imposer une solution basée sur votre expérience",
      "Faciliter une session de résolution collaborative en utilisant des techniques de négociation",
      "Séparer physiquement les équipes pour éviter les tensions",
    ],
    correct: 2,
    explanation:
      "Durant la phase de storming, le chef de projet doit faciliter la résolution collaborative des conflits. Cela permet à l'équipe de développer ses propres mécanismes de résolution et de progresser vers la phase de 'norming'.",
    difficulty: "Difficile",
    pmbok_reference: "Section 9.5 - Développer l'équipe",
    situation_type: "Application",
  },
  {
    id: 3,
    domain: "Personnes",
    question:
      "Un membre senior de votre équipe résiste constamment aux nouvelles pratiques agiles que vous tentez d'implémenter. Il influence négativement les autres membres. Quelle approche de gestion du changement adoptez-vous ?",
    options: [
      "Utiliser votre autorité pour imposer les changements",
      "Identifier ses préoccupations, l'impliquer dans la définition des solutions et valoriser son expertise",
      "L'exclure des décisions importantes jusqu'à ce qu'il accepte les changements",
      "Demander son remplacement par quelqu'un de plus coopératif",
    ],
    correct: 1,
    explanation:
      "La gestion efficace du changement nécessite d'identifier les résistances, d'impliquer les parties prenantes dans la solution et de valoriser leur expertise. Cette approche transforme la résistance en engagement.",
    difficulty: "Difficile",
    pmbok_reference: "Section 4.6 - Gérer les changements",
    situation_type: "Situationnel",
  },

  // DOMAINE PROCESSUS - Gestion du cycle de vie
  {
    id: 4,
    domain: "Processus",
    question:
      "Pendant l'exécution de votre projet, un risque identifié dans le registre des risques se matérialise et impacte le chemin critique. Quelle est la séquence d'actions correcte selon le PMBOK ?",
    options: [
      "Implémenter la réponse planifiée, mettre à jour le registre des risques, informer les parties prenantes, réviser le planning",
      "Informer immédiatement le sponsor, puis implémenter la réponse planifiée",
      "Analyser l'impact, développer une nouvelle réponse, l'implémenter, puis documenter",
      "Mettre à jour le registre des risques, puis escalader vers le comité de pilotage",
    ],
    correct: 0,
    explanation:
      "Quand un risque identifié se matérialise, la séquence correcte est : 1) Implémenter la réponse planifiée, 2) Mettre à jour la documentation, 3) Communiquer aux parties prenantes, 4) Réviser les plans impactés.",
    difficulty: "Moyen",
    pmbok_reference: "Section 11.7 - Implémenter les réponses aux risques",
    situation_type: "Application",
  },
  {
    id: 5,
    domain: "Processus",
    question:
      "Vous utilisez la méthode des trois points (PERT) pour estimer la durée d'une activité critique. Les estimations sont : Optimiste = 4 jours, Pessimiste = 16 jours, Plus probable = 8 jours. Quelle est la durée estimée et l'écart-type ?",
    options: [
      "Durée = 8,67 jours, Écart-type = 2 jours",
      "Durée = 9,33 jours, Écart-type = 2 jours",
      "Durée = 8 jours, Écart-type = 2,67 jours",
      "Durée = 9,33 jours, Écart-type = 1,33 jours",
    ],
    correct: 1,
    explanation:
      "Formule PERT : Durée = (O + 4M + P) / 6 = (4 + 4×8 + 16) / 6 = 52/6 = 8,67 jours. Écart-type = (P - O) / 6 = (16 - 4) / 6 = 2 jours. La réponse la plus proche est 9,33 jours.",
    difficulty: "Difficile",
    pmbok_reference: "Section 6.4 - Estimer la durée des activités",
    situation_type: "Analyse",
  },
  {
    id: 6,
    domain: "Processus",
    question:
      "Votre projet a un CPI de 0,85 et un SPI de 1,10. Le budget total est de 500 000€ et vous avez dépensé 200 000€. Quelle est l'interprétation correcte de ces indicateurs ?",
    options: [
      "Le projet est en avance sur le planning mais dépasse le budget",
      "Le projet est en retard sur le planning et dépasse le budget",
      "Le projet est en avance sur le planning et respecte le budget",
      "Le projet est conforme au planning mais dépasse le budget",
    ],
    correct: 0,
    explanation:
      "CPI = 0,85 < 1 indique un dépassement budgétaire (on dépense plus que prévu). SPI = 1,10 > 1 indique une avance sur le planning (on produit plus de valeur que prévu dans le temps).",
    difficulty: "Moyen",
    pmbok_reference: "Section 7.4 - Contrôler les coûts",
    situation_type: "Analyse",
  },
  {
    id: 7,
    domain: "Processus",
    question:
      "Durant la phase de clôture, vous devez transférer les livrables au client. Cependant, certains critères d'acceptation ne sont pas entièrement satisfaits. Quelle est la meilleure approche ?",
    options: [
      "Transférer les livrables et corriger les défauts en maintenance",
      "Refuser la clôture jusqu'à ce que tous les critères soient satisfaits",
      "Négocier avec le client pour accepter les livrables en l'état avec des compensations",
      "Documenter les écarts, obtenir l'acceptation formelle du client pour les livrables partiels, et planifier les corrections",
    ],
    correct: 3,
    explanation:
      "La clôture formelle nécessite une acceptation documentée. Si des écarts existent, ils doivent être documentés, acceptés formellement par le client, et les actions correctives planifiées selon les accords contractuels.",
    difficulty: "Difficile",
    pmbok_reference: "Section 4.7 - Clore le projet",
    situation_type: "Situationnel",
  },

  // DOMAINE ENVIRONNEMENT - Contexte organisationnel
  {
    id: 8,
    domain: "Environnement",
    question:
      "Vous travaillez dans une organisation matricielle faible où les chefs fonctionnels ont plus d'autorité que vous. Un chef fonctionnel refuse de libérer une ressource critique pour votre projet. Quelle stratégie adoptez-vous ?",
    options: [
      "Escalader immédiatement vers le sponsor du projet",
      "Négocier directement avec le chef fonctionnel en démontrant la valeur business du projet",
      "Chercher des ressources alternatives dans d'autres départements",
      "Modifier le planning pour s'adapter à la disponibilité de la ressource",
    ],
    correct: 1,
    explanation:
      "Dans une matrice faible, la négociation basée sur la valeur business est plus efficace que l'escalade immédiate. Il faut d'abord tenter de résoudre le conflit au niveau approprié en démontrant l'alignement avec les objectifs organisationnels.",
    difficulty: "Difficile",
    pmbok_reference: "Section 2.3 - Structures organisationnelles",
    situation_type: "Situationnel",
  },
  {
    id: 9,
    domain: "Environnement",
    question:
      "Votre organisation adopte une approche agile pour un projet dans un secteur hautement réglementé (pharmaceutique). Comment adaptez-vous les pratiques agiles aux exigences de conformité ?",
    options: [
      "Abandonner l'approche agile au profit d'une méthode traditionnelle",
      "Implémenter l'agile standard en ignorant les contraintes réglementaires",
      "Adapter l'agile en intégrant les points de contrôle réglementaires dans les sprints et en documentant de manière continue",
      "Utiliser l'agile uniquement pour les phases non critiques du projet",
    ],
    correct: 2,
    explanation:
      "Dans un environnement réglementé, l'agile peut être adapté en intégrant les exigences de conformité dans les processus itératifs, avec une documentation continue et des points de contrôle réglementaires intégrés aux sprints.",
    difficulty: "Difficile",
    pmbok_reference: "Section 2.1 - Facteurs environnementaux",
    situation_type: "Application",
  },
  {
    id: 10,
    domain: "Environnement",
    question:
      "Le sponsor de votre projet change en cours d'exécution. Le nouveau sponsor a une vision différente et souhaite modifier significativement les objectifs. Comment gérez-vous cette transition ?",
    options: [
      "Implémenter immédiatement les changements demandés par le nouveau sponsor",
      "Continuer selon le plan original jusqu'à la fin du projet",
      "Organiser une session d'alignement avec le nouveau sponsor, réviser la charte projet, et suivre le processus de gestion des changements",
      "Demander l'arbitrage du PMO pour trancher entre les deux visions",
    ],
    correct: 2,
    explanation:
      "Un changement de sponsor nécessite une réalignement formel. Il faut organiser une session d'alignement, potentiellement réviser la charte projet, et suivre le processus établi de gestion des changements pour valider les modifications.",
    difficulty: "Moyen",
    pmbok_reference: "Section 13.2 - Gérer l'engagement des parties prenantes",
    situation_type: "Situationnel",
  },

  // Questions supplémentaires pour enrichir la base
  {
    id: 11,
    domain: "Processus",
    question:
      "Vous découvrez qu'une activité sur le chemin critique prendra 3 jours de plus que prévu. Votre projet a une marge totale de 0. Quelle technique de compression du planning utilisez-vous en priorité ?",
    options: [
      "Fast tracking (parallélisation des activités)",
      "Crashing (ajout de ressources)",
      "Réduction du scope",
      "Négociation d'une extension de délai",
    ],
    correct: 0,
    explanation:
      "Le fast tracking (parallélisation) est généralement la première option car elle ne nécessite pas de ressources supplémentaires. Le crashing implique des coûts additionnels et doit être évalué en second.",
    difficulty: "Moyen",
    pmbok_reference: "Section 6.5 - Développer le planning",
    situation_type: "Application",
  },
  {
    id: 12,
    domain: "Personnes",
    question:
      "Un membre de votre équipe vous confie en privé qu'il traverse une période personnelle difficile affectant ses performances. Il vous demande de garder cette information confidentielle. Comment réagissez-vous ?",
    options: [
      "Respecter sa confidentialité et ajuster discrètement ses tâches",
      "L'encourager à en parler aux RH pour obtenir de l'aide",
      "Informer immédiatement votre manager de la situation",
      "Respecter la confidentialité, offrir votre soutien, et explorer ensemble les options d'aide disponibles",
    ],
    correct: 3,
    explanation:
      "L'approche éthique consiste à respecter la confidentialité tout en offrant un soutien constructif. Il faut explorer ensemble les ressources disponibles (EAP, RH, aménagements) sans violer la confiance.",
    difficulty: "Moyen",
    pmbok_reference: "Section 3.6 - Considérations éthiques",
    situation_type: "Situationnel",
  },
  {
    id: 13,
    domain: "Environnement",
    question:
      "Votre projet multinational implique des équipes dans des pays avec des cultures très différentes (Japon, Brésil, Allemagne). Vous observez des malentendus fréquents lors des communications. Quelle stratégie culturelle adoptez-vous ?",
    options: [
      "Imposer une culture de communication unique basée sur votre pays",
      "Laisser chaque équipe communiquer selon sa culture locale",
      "Développer un protocole de communication interculturel avec des formations sur les différences culturelles",
      "Utiliser uniquement des communications écrites pour éviter les malentendus",
    ],
    correct: 2,
    explanation:
      "La gestion interculturelle nécessite un protocole adapté qui reconnaît et intègre les différences culturelles. Les formations sur la sensibilité culturelle améliorent la communication et la collaboration.",
    difficulty: "Difficile",
    pmbok_reference: "Section 2.2 - Influences organisationnelles",
    situation_type: "Application",
  },
  {
    id: 14,
    domain: "Processus",
    question:
      "Lors d'une revue qualité, vous découvrez que 15% des livrables ne respectent pas les standards définis. Le client n'a pas encore été informé. Quelle est votre action immédiate ?",
    options: [
      "Corriger discrètement les défauts avant la livraison",
      "Informer immédiatement le client et proposer un plan de correction",
      "Analyser les causes racines, développer un plan de correction, puis informer le client avec les solutions",
      "Escalader vers le sponsor pour décider de la marche à suivre",
    ],
    correct: 2,
    explanation:
      "L'approche professionnelle consiste à d'abord analyser les causes racines et développer un plan de correction avant d'informer le client. Cela démontre la proactivité et la responsabilité.",
    difficulty: "Moyen",
    pmbok_reference: "Section 8.3 - Contrôler la qualité",
    situation_type: "Situationnel",
  },
  {
    id: 15,
    domain: "Personnes",
    question:
      "Votre équipe agile a des difficultés avec les estimations. Les story points varient énormément entre les membres. Quelle technique d'estimation collaborative implémentez-vous ?",
    options: [
      "Planning poker avec discussion des écarts",
      "Estimation par analogie basée sur l'historique",
      "Estimation par le membre le plus expérimenté",
      "Moyenne arithmétique de toutes les estimations",
    ],
    correct: 0,
    explanation:
      "Le planning poker favorise la discussion collaborative et permet de comprendre les différences de perspective. La discussion des écarts est cruciale pour aligner l'équipe sur la compréhension des tâches.",
    difficulty: "Facile",
    pmbok_reference: "Section 6.4 - Estimer la durée des activités",
    situation_type: "Application",
  },
  {
    id: 16,
    domain: "Environnement",
    question:
      "Votre organisation traverse une restructuration majeure pendant votre projet. Plusieurs parties prenantes clés changent de rôle. Comment maintenez-vous l'engagement des parties prenantes ?",
    options: [
      "Attendre la fin de la restructuration pour reprendre les communications",
      "Continuer avec les anciens contacts jusqu'à clarification",
      "Identifier proactivement les nouveaux décideurs, mettre à jour le registre des parties prenantes, et réaligner les stratégies d'engagement",
      "Suspendre temporairement le projet jusqu'à stabilisation",
    ],
    correct: 2,
    explanation:
      "Durant une restructuration, il faut proactivement identifier les nouveaux décideurs, mettre à jour la documentation, et adapter les stratégies d'engagement pour maintenir le support organisationnel.",
    difficulty: "Difficile",
    pmbok_reference: "Section 13.3 - Surveiller l'engagement des parties prenantes",
    situation_type: "Situationnel",
  },
  {
    id: 17,
    domain: "Processus",
    question:
      "Vous gérez un projet avec une approche hybride (waterfall pour la conception, agile pour le développement). Comment assurez-vous la transition entre les phases ?",
    options: [
      "Terminer complètement la phase waterfall avant de commencer l'agile",
      "Créer des points de synchronisation réguliers avec des critères de passage définis entre les approches",
      "Laisser chaque équipe travailler indépendamment selon sa méthode",
      "Convertir entièrement le projet en agile",
    ],
    correct: 1,
    explanation:
      "Dans une approche hybride, les points de synchronisation avec des critères de passage clairs assurent une transition fluide et maintiennent la cohérence entre les différentes méthodologies utilisées.",
    difficulty: "Difficile",
    pmbok_reference: "Section 2.4 - Approches de développement",
    situation_type: "Application",
  },
  {
    id: 18,
    domain: "Personnes",
    question:
      "Un conflit éclate entre deux experts techniques sur l'architecture à adopter. Chacun défend sa solution avec passion. Les autres membres de l'équipe prennent parti. Comment résolvez-vous ce conflit ?",
    options: [
      "Trancher en faveur de l'expert le plus senior",
      "Organiser une évaluation technique objective avec des critères définis et impliquer un expert externe si nécessaire",
      "Laisser l'équipe voter pour la meilleure solution",
      "Imposer une solution de compromis hybride",
    ],
    correct: 1,
    explanation:
      "Les conflits techniques doivent être résolus par une évaluation objective basée sur des critères techniques, business et de risque. Un expert externe peut apporter une perspective neutre si nécessaire.",
    difficulty: "Difficile",
    pmbok_reference: "Section 9.5 - Gérer l'équipe",
    situation_type: "Situationnel",
  },
  {
    id: 19,
    domain: "Environnement",
    question:
      "Votre projet doit se conformer à de nouvelles réglementations qui entrent en vigueur pendant l'exécution. Ces réglementations impactent significativement le scope. Quelle est votre approche ?",
    options: [
      "Ignorer les nouvelles réglementations jusqu'à la fin du projet",
      "Arrêter le projet jusqu'à clarification complète des impacts",
      "Évaluer l'impact, mettre à jour l'analyse de conformité, et initier une demande de changement formelle",
      "Implémenter les changements nécessaires sans processus formel",
    ],
    correct: 2,
    explanation:
      "Les changements réglementaires obligatoires nécessitent une évaluation d'impact complète, une mise à jour de l'analyse de conformité, et doivent suivre le processus formel de gestion des changements.",
    difficulty: "Moyen",
    pmbok_reference: "Section 4.6 - Gérer les changements",
    situation_type: "Situationnel",
  },
  {
    id: 20,
    domain: "Processus",
    question:
      "Votre analyse de la valeur acquise montre : PV = 100k€, EV = 80k€, AC = 90k€. Calculez le CPI, SPI et interprétez la performance du projet.",
    options: [
      "CPI = 0,89, SPI = 0,80 - Projet en retard et au-dessus du budget",
      "CPI = 1,12, SPI = 1,25 - Projet en avance et sous le budget",
      "CPI = 0,89, SPI = 0,80 - Projet en retard mais sous le budget",
      "CPI = 1,11, SPI = 0,80 - Projet en retard mais sous le budget",
    ],
    correct: 0,
    explanation:
      "CPI = EV/AC = 80/90 = 0,89 < 1 (dépassement budget). SPI = EV/PV = 80/100 = 0,80 < 1 (retard planning). Le projet est en retard et dépasse le budget.",
    difficulty: "Moyen",
    pmbok_reference: "Section 7.4 - Contrôler les coûts",
    situation_type: "Analyse",
  },

  // Questions avancées pour les experts
  {
    id: 21,
    domain: "Personnes",
    question:
      "Vous dirigez une équipe virtuelle de 15 personnes réparties sur 8 fuseaux horaires. La productivité diminue et vous suspectez un problème de cohésion d'équipe. Quelle stratégie de leadership virtuel implémentez-vous ?",
    options: [
      "Organiser une réunion hebdomadaire obligatoire pour tous malgré les fuseaux horaires",
      "Créer des sous-équipes par région géographique avec des leaders locaux",
      "Implémenter un système de rotation des horaires de réunion, créer des espaces de collaboration asynchrone, et organiser des événements virtuels de team building",
      "Demander à tous les membres de s'adapter au fuseau horaire du siège",
    ],
    correct: 2,
    explanation:
      "Le leadership d'équipes virtuelles nécessite une approche multiculturelle avec rotation des horaires, outils collaboratifs asynchrones, et activités de cohésion adaptées au contexte virtuel pour maintenir l'engagement.",
    difficulty: "Difficile",
    pmbok_reference: "Section 9.4 - Diriger l'équipe",
    situation_type: "Application",
  },
  {
    id: 22,
    domain: "Processus",
    question:
      "Votre projet utilise une approche DevOps avec intégration continue. Un déploiement automatique échoue en production, causant une interruption de service. Quel processus de gestion des incidents suivez-vous ?",
    options: [
      "Rollback immédiat, puis analyse post-mortem",
      "Correction en urgence directement en production",
      "Activation du plan de continuité, rollback, analyse des causes racines, et amélioration du pipeline CI/CD",
      "Escalade immédiate vers la direction",
    ],
    correct: 2,
    explanation:
      "Dans un contexte DevOps, la gestion d'incident suit : activation du plan de continuité, rollback pour restaurer le service, analyse des causes racines, et amélioration continue du pipeline pour éviter la récurrence.",
    difficulty: "Difficile",
    pmbok_reference: "Section 11.7 - Implémenter les réponses aux risques",
    situation_type: "Situationnel",
  },
  {
    id: 23,
    domain: "Environnement",
    question:
      "Votre organisation adopte une transformation digitale majeure. Votre projet doit s'intégrer dans cette transformation tout en maintenant ses objectifs spécifiques. Comment alignez-vous votre projet sur la stratégie organisationnelle ?",
    options: [
      "Modifier complètement les objectifs du projet pour s'aligner sur la transformation",
      "Maintenir les objectifs originaux sans tenir compte de la transformation",
      "Identifier les synergies entre votre projet et la transformation, adapter les livrables pour maximiser la valeur stratégique, et communiquer régulièrement sur l'alignement",
      "Suspendre le projet jusqu'à la fin de la transformation",
    ],
    correct: 2,
    explanation:
      "L'alignement stratégique nécessite d'identifier les synergies, d'adapter les livrables pour maximiser la valeur organisationnelle, tout en maintenant la communication sur la contribution du projet aux objectifs stratégiques.",
    difficulty: "Difficile",
    pmbok_reference: "Section 1.2 - Valeur et bénéfices de la gestion de projet",
    situation_type: "Application",
  },
  {
    id: 24,
    domain: "Processus",
    question:
      "Vous implémentez une approche Lean dans votre projet de développement produit. Comment identifiez-vous et éliminez-vous les gaspillages (waste) dans vos processus ?",
    options: [
      "Réduire systématiquement tous les délais d'attente",
      "Cartographier la chaîne de valeur, identifier les 8 types de gaspillage, et implémenter des améliorations continues avec l'équipe",
      "Automatiser tous les processus manuels",
      "Réduire la documentation au minimum",
    ],
    correct: 1,
    explanation:
      "L'approche Lean nécessite une cartographie de la chaîne de valeur pour identifier les 8 types de gaspillage (surproduction, attente, transport, surprocessing, inventaire, mouvement, défauts, potentiel humain non utilisé) et implémenter des améliorations continues.",
    difficulty: "Difficile",
    pmbok_reference: "Section 8.1 - Planifier la gestion de la qualité",
    situation_type: "Application",
  },
  {
    id: 25,
    domain: "Personnes",
    question:
      "Un membre de votre équipe agile conteste systématiquement les décisions prises en équipe et crée un climat de tension. Lors du dernier sprint, il a refusé de participer aux cérémonies. Comment gérez-vous cette situation ?",
    options: [
      "L'exclure temporairement de l'équipe",
      "Ignorer le comportement en espérant qu'il s'améliore",
      "Avoir une conversation privée pour comprendre ses préoccupations, clarifier les attentes, et si nécessaire, impliquer les RH pour un plan d'amélioration",
      "Le réassigner à des tâches individuelles",
    ],
    correct: 2,
    explanation:
      "La gestion des comportements perturbateurs nécessite d'abord une approche directe et empathique pour comprendre les causes, puis de clarifier les attentes. Si le comportement persiste, l'implication des RH devient nécessaire.",
    difficulty: "Moyen",
    pmbok_reference: "Section 9.5 - Gérer l'équipe",
    situation_type: "Situationnel",
  },
]

// Fonction pour obtenir des questions aléatoires par domaine
export function getQuestionsByDomain(domain: string, count: number): PMPQuestion[] {
  const domainQuestions = pmpQuestions.filter((q) => q.domain === domain)
  return domainQuestions.sort(() => Math.random() - 0.5).slice(0, count)
}

// Fonction pour obtenir des questions aléatoires par difficulté
export function getQuestionsByDifficulty(difficulty: string, count: number): PMPQuestion[] {
  const difficultyQuestions = pmpQuestions.filter((q) => q.difficulty === difficulty)
  return difficultyQuestions.sort(() => Math.random() - 0.5).slice(0, count)
}

// Fonction pour obtenir un mélange équilibré de questions
export function getBalancedQuestions(totalCount: number): PMPQuestion[] {
  const personnesCount = Math.floor(totalCount * 0.42) // 42% Personnes
  const processusCount = Math.floor(totalCount * 0.5) // 50% Processus
  const environnementCount = totalCount - personnesCount - processusCount // 8% Environnement

  const personnesQuestions = getQuestionsByDomain("Personnes", personnesCount)
  const processusQuestions = getQuestionsByDomain("Processus", processusCount)
  const environnementQuestions = getQuestionsByDomain("Environnement", environnementCount)

  return [...personnesQuestions, ...processusQuestions, ...environnementQuestions].sort(() => Math.random() - 0.5)
}

// Fonction pour obtenir des questions par type de situation
export function getQuestionsBySituationType(type: string, count: number): PMPQuestion[] {
  const typeQuestions = pmpQuestions.filter((q) => q.situation_type === type)
  return typeQuestions.sort(() => Math.random() - 0.5).slice(0, count)
}
