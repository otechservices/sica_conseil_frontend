import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../../core/services/navigation.service';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
})
export class FormationsComponent implements OnInit {

  timeLeft: string | undefined;
  timer: any;

  isMenuOpen = false;
  activeCategory = 'Tous';

  categories = ['Tous', 'PMP/CAPM', 'PRINCE2', 'Scrum', 'Lean Six Sigma'];

formations = [
  // 🟦 PMP / CAPM
  {
    id: 'pmp-elearning',
    title: '📘 PMP (Project Management Professional) - E-learning',
    category: 'PMP / CAPM',
    level: 'Avancé',
    duration: '35h',
    price: '1890€',
    originalPrice: '2200€',
    rating: 4.9,
    students: 1520,
    description: 'Certification PMP en e-learning avec support complet et garantie de réussite.',
    features: [
      '35h de formation e-learning',
      'Tests blancs illimités',
      'Support personnalisé 24/7',
      'Garantie de réussite',
      'Certificat officiel PMI'
    ],
    instructor: 'Dr. Pierre Martinet',
    image: 'https://readdy.ai/api/search-image?query=PMP%20Project%20Management%20e-learning%20online%20course&width=400&height=250',
    badge: 'Certifiant',
    logo: '📘'
  },

  // 🟥 PRINCE2
  {
    id: 'prince2-foundation',
    title: '🎯 PRINCE2 Foundation',
    category: 'PRINCE2',
    level: 'Débutant',
    duration: '30h',
    price: '1290€',
    originalPrice: '1600€',
    rating: 4.8,
    students: 1100,
    description: 'Maîtrisez les bases de la méthode PRINCE2 pour la gestion de projets structurée.',
    features: ['Accès e-learning complet', 'Simulations d’examen', 'Support pédagogique', 'Certificat reconnu'],
    instructor: 'Jean-Baptiste Kouassi',
    image: 'https://readdy.ai/api/search-image?query=PRINCE2%20foundation%20project%20management%20training&width=400&height=250',
    badge: 'Certifiant',
    logo: '🎯'
  },
  {
    id: 'prince2-practitioner',
    title: '🎯 PRINCE2 Practitioner',
    category: 'PRINCE2',
    level: 'Avancé',
    duration: '40h',
    price: '1490€',
    originalPrice: '1850€',
    rating: 4.9,
    students: 860,
    description: 'Devenez expert dans l’application de la méthodologie PRINCE2 à des projets réels.',
    features: ['Cas pratiques', 'Mentorat individuel', 'Accès examen inclus', 'Certification officielle'],
    instructor: 'Dr. Awa Tchibozo',
    image: 'https://readdy.ai/api/search-image?query=PRINCE2%20practitioner%20advanced%20project%20management&width=400&height=250',
    badge: 'Certifiant',
    logo: '🎯'
  },

  // 🟩 Scrum
  {
    id: 'psm1',
    title: '⚙️ PSM I (Professional Scrum Master I)',
    category: 'Scrum / Agile',
    level: 'Débutant',
    duration: '25h',
    price: '990€',
    originalPrice: '1250€',
    rating: 4.8,
    students: 970,
    description: 'Apprenez les fondamentaux du rôle de Scrum Master et préparez la certification PSM I.',
    features: ['Formation e-learning', 'Quiz & examens blancs', 'Cas pratiques Scrum', 'Accès illimité 1 an'],
    instructor: 'Sophie Ahouansou',
    image: 'https://readdy.ai/api/search-image?query=Scrum%20Master%20training%20online%20course&width=400&height=250',
    badge: 'Certifiant',
    logo: '⚙️'
  },
  {
    id: 'psm2',
    title: '⚙️ PSM II (Professional Scrum Master II)',
    category: 'Scrum / Agile',
    level: 'Intermédiaire',
    duration: '30h',
    price: '1290€',
    originalPrice: '1550€',
    rating: 4.7,
    students: 640,
    description: 'Perfectionnez votre maîtrise de Scrum et du leadership agile avec PSM II.',
    features: ['Cas réels', 'Ateliers pratiques', 'Simulations d’équipe', 'Accès examen inclus'],
    instructor: 'Dr. Pascal Godonou',
    image: 'https://readdy.ai/api/search-image?query=Scrum%20Master%20advanced%20leadership%20training&width=400&height=250',
    badge: 'Certifiant',
    logo: '⚙️'
  },
  {
    id: 'psm3',
    title: '⚙️ PSM III (Professional Scrum Master III)',
    category: 'Scrum / Agile',
    level: 'Expert',
    duration: '35h',
    price: '1690€',
    originalPrice: '1900€',
    rating: 4.9,
    students: 420,
    description: 'Atteignez le plus haut niveau de maîtrise Scrum avec des études de cas complexes.',
    features: ['Coaching personnalisé', 'Projets simulés', 'Préparation examen PSM III'],
    instructor: 'Isabelle Mensah',
    image: 'https://readdy.ai/api/search-image?query=Scrum%20Master%20expert%20training%20workshop&width=400&height=250',
    badge: 'Certifiant',
    logo: '⚙️'
  },

  // 🟨 Product Owner
  {
    id: 'pspo1',
    title: '📊 PSPO I (Professional Scrum Product Owner I)',
    category: 'Scrum / Agile',
    level: 'Débutant',
    duration: '25h',
    price: '950€',
    originalPrice: '1200€',
    rating: 4.7,
    students: 740,
    description: 'Devenez Product Owner certifié et apprenez à maximiser la valeur des produits.',
    features: ['Formation en ligne', 'Accès aux outils Scrum', 'Cas pratiques', 'Examen inclus'],
    instructor: 'Koffi Dossou',
    image: 'https://readdy.ai/api/search-image?query=Product%20Owner%20training%20Scrum%20Agile&width=400&height=250',
    badge: 'Certifiant',
    logo: '📊'
  },
  {
    id: 'pspo2',
    title: '📊 PSPO II (Professional Scrum Product Owner II)',
    category: 'Scrum / Agile',
    level: 'Intermédiaire',
    duration: '30h',
    price: '1190€',
    originalPrice: '1450€',
    rating: 4.8,
    students: 520,
    description: 'Approfondissez votre expertise du rôle de Product Owner et du pilotage Agile.',
    features: ['Cas concrets', 'Coaching individuel', 'Accès e-learning 1 an'],
    instructor: 'Irène Alao',
    image: 'https://readdy.ai/api/search-image?query=Advanced%20Product%20Owner%20training%20Agile%20PSPO%20II&width=400&height=250',
    badge: 'Certifiant',
    logo: '📊'
  },
  {
    id: 'pspo3',
    title: '📊 PSPO III (Professional Scrum Product Owner III)',
    category: 'Scrum / Agile',
    level: 'Expert',
    duration: '35h',
    price: '1590€',
    originalPrice: '1850€',
    rating: 4.9,
    students: 310,
    description: 'Maîtrisez la vision stratégique produit et la gouvernance agile au plus haut niveau.',
    features: ['Mentorat senior', 'Ateliers immersifs', 'Préparation à la certification PSPO III'],
    instructor: 'Fabrice Agossou',
    image: 'https://readdy.ai/api/search-image?query=Expert%20Product%20Owner%20leadership%20training%20PSPO%20III&width=400&height=250',
    badge: 'Certifiant',
    logo: '📊'
  },

  // 🟩 Lean Six Sigma
  {
    id: 'lss-white',
    title: '💡 Lean Six Sigma White Belt',
    category: 'Lean Six Sigma',
    level: 'Initiation',
    duration: '10h',
    price: '490€',
    originalPrice: '650€',
    rating: 4.7,
    students: 780,
    description: 'Introduction aux principes Lean et Six Sigma pour la gestion de la qualité.',
    features: ['Cours interactifs', 'Études de cas', 'Certificat White Belt'],
    instructor: 'Dr. Stéphane Hounkpe',
    image: 'https://readdy.ai/api/search-image?query=Lean%20Six%20Sigma%20White%20Belt%20online%20training&width=400&height=250',
    badge: 'Certifiant',
    logo: '💡'
  },
  {
    id: 'lssyb',
    title: '💡 Lean Six Sigma Yellow Belt',
    category: 'Lean Six Sigma',
    level: 'Débutant',
    duration: '20h',
    price: '690€',
    originalPrice: '890€',
    rating: 4.8,
    students: 620,
    description: 'Apprenez à participer activement aux projets d’amélioration continue.',
    features: ['Formation e-learning', 'Exemples réels', 'Examen inclus'],
    instructor: 'Nathalie Toviho',
    image: 'https://readdy.ai/api/search-image?query=Lean%20Six%20Sigma%20Yellow%20Belt%20training&width=400&height=250',
    badge: 'Certifiant',
    logo: '💡'
  },
  {
    id: 'lssgb',
    title: '💡 Lean Six Sigma Green Belt',
    category: 'Lean Six Sigma',
    level: 'Intermédiaire',
    duration: '35h',
    price: '1290€',
    originalPrice: '1500€',
    rating: 4.9,
    students: 540,
    description: 'Devenez un acteur clé des projets Lean Six Sigma au sein de votre organisation.',
    features: ['Coaching expert', 'Simulations', 'Projet réel', 'Certificat Green Belt'],
    instructor: 'Prof. Jules Boco',
    image: 'https://readdy.ai/api/search-image?query=Lean%20Six%20Sigma%20Green%20Belt%20training&width=400&height=250',
    badge: 'Certifiant',
    logo: '💡'
  },
  {
    id: 'lssbb',
    title: '💡 Lean Six Sigma Black Belt',
    category: 'Lean Six Sigma',
    level: 'Avancé',
    duration: '45h',
    price: '1790€',
    originalPrice: '2100€',
    rating: 4.9,
    students: 320,
    description: 'Devenez expert en excellence opérationnelle et pilotage stratégique de la performance.',
    features: ['Mentorat', 'Projet certifiant', 'Préparation examen Black Belt'],
    instructor: 'Dr. Florent Adjovi',
    image: 'https://readdy.ai/api/search-image?query=Lean%20Six%20Sigma%20Black%20Belt%20training&width=400&height=250',
    badge: 'Certifiant',
    logo: '💡'
  },

  // 🧩 Cisco
  {
    id: 'ccna',
    title: '🌐 Cisco CCNA',
    category: 'Réseaux / Cisco',
    level: 'Intermédiaire',
    duration: '40h',
    price: '1390€',
    originalPrice: '1650€',
    rating: 4.8,
    students: 880,
    description: 'Maîtrisez les fondamentaux du réseau et préparez la certification Cisco CCNA.',
    features: ['Laboratoires virtuels', 'Exercices pratiques', 'Certificat officiel Cisco'],
    instructor: 'Eric Dossa',
    image: 'https://readdy.ai/api/search-image?query=Cisco%20CCNA%20network%20training%20labs&width=400&height=250',
    badge: 'Certifiant',
    logo: '🌐'
  },
  {
    id: 'ccnp-enterprise',
    title: '🌐 Cisco CCNP Enterprise',
    category: 'Réseaux / Cisco',
    level: 'Avancé',
    duration: '50h',
    price: '1790€',
    originalPrice: '2100€',
    rating: 4.9,
    students: 460,
    description: 'Approfondissez vos compétences en conception et gestion d’infrastructures réseau complexes.',
    features: ['Laboratoires avancés', 'Projets réels', 'Accès examen CCNP Enterprise'],
    instructor: 'Lucien Ahossi',
    image: 'https://readdy.ai/api/search-image?query=Cisco%20CCNP%20Enterprise%20advanced%20training&width=400&height=250',
    badge: 'Certifiant',
    logo: '🌐'
  },
  {
    id: 'ccnp-security',
    title: '🌐 Cisco CCNP Security',
    category: 'Réseaux / Cisco',
    level: 'Avancé',
    duration: '50h',
    price: '1890€',
    originalPrice: '2200€',
    rating: 4.9,
    students: 390,
    description: 'Spécialisez-vous dans la sécurité des réseaux Cisco et les solutions d’entreprise.',
    features: ['Formation en ligne', 'Laboratoires sécurisés', 'Préparation examen CCNP Security'],
    instructor: 'Cyrille Komi',
    image: 'https://readdy.ai/api/search-image?query=Cisco%20CCNP%20Security%20training&width=400&height=250',
    badge: 'Certifiant',
    logo: '🌐'
  },

  // 🟪 ITIL
  {
    id: 'itil-v4',
    title: '🧠 ITIL V4 Foundation',
    category: 'ITIL',
    level: 'Débutant',
    duration: '25h',
    price: '1090€',
    originalPrice: '1300€',
    rating: 4.8,
    students: 900,
    description: 'Découvrez les principes clés de la gestion des services IT selon ITIL V4.',
    features: ['Cours e-learning', 'Quiz interactifs', 'Examen inclus'],
    instructor: 'Aline Ayadji',
    image: 'https://readdy.ai/api/search-image?query=ITIL%20V4%20foundation%20training&width=400&height=250',
    badge: 'Certifiant',
    logo: '🧠'
  },
  {
    id: 'itil-mp',
    title: '🧠 ITIL Managing Professional (MP)',
    category: 'ITIL',
    level: 'Intermédiaire',
    duration: '40h',
    price: '1490€',
    originalPrice: '1800€',
    rating: 4.9,
    students: 520,
    description: 'Approfondissez vos compétences pour devenir un professionnel ITIL certifié MP.',
    features: ['Études de cas', 'Simulation d’examen', 'Accès illimité'],
    instructor: 'Patrick Akakpo',
    image: 'https://readdy.ai/api/search-image?query=ITIL%20Managing%20Professional%20training&width=400&height=250',
    badge: 'Certifiant',
    logo: '🧠'
  },
  {
    id: 'itil-sl',
    title: '🧠 ITIL Strategic Leader (SL)',
    category: 'ITIL',
    level: 'Avancé',
    duration: '45h',
    price: '1590€',
    originalPrice: '1900€',
    rating: 4.9,
    students: 380,
    description: 'Maîtrisez la gouvernance stratégique IT et la gestion organisationnelle.',
    features: ['Ateliers pratiques', 'Mentorat', 'Examen inclus'],
    instructor: 'Serge Dovonou',
    image: 'https://readdy.ai/api/search-image?query=ITIL%20Strategic%20Leader%20training&width=400&height=250',
    badge: 'Certifiant',
    logo: '🧠'
  },
  {
    id: 'itil-pm',
    title: '🧠 ITIL Project Manager',
    category: 'ITIL',
    level: 'Intermédiaire',
    duration: '30h',
    price: '1190€',
    originalPrice: '1450€',
    rating: 4.8,
    students: 420,
    description: 'Reliez les bonnes pratiques ITIL à la gestion de projets agile et hybride.',
    features: ['Cas réels', 'Exemples concrets', 'Support en ligne'],
    instructor: 'Noëlla Adjibadé',
    image: 'https://readdy.ai/api/search-image?query=ITIL%20Project%20Management%20training&width=400&height=250',
    badge: 'Certifiant',
    logo: '🧠'
  },
  {
    id: 'itil-mveu',
    title: '🧠 ITIL MVEU (Measuring Value & Experience Utilization)',
    category: 'ITIL',
    level: 'Expert',
    duration: '35h',
    price: '1390€',
    originalPrice: '1650€',
    rating: 4.9,
    students: 240,
    description: 'Évaluez et améliorez la valeur et l’expérience utilisateur des services IT.',
    features: ['Études de cas réels', 'Outils de mesure', 'Certificat officiel'],
    instructor: 'Marie-Céline Tokpo',
    image: 'https://readdy.ai/api/search-image?query=ITIL%20Value%20Experience%20Utilization%20training&width=400&height=250',
    badge: 'Certifiant',
    logo: '🧠'
  },

  // 🧮 Microsoft
  {
    id: 'ms-project',
    title: '📅 Microsoft Project',
    category: 'Microsoft',
    level: 'Intermédiaire',
    duration: '20h',
    price: '890€',
    originalPrice: '1100€',
    rating: 4.7,
    students: 780,
    description: 'Planifiez et pilotez vos projets efficacement avec Microsoft Project.',
    features: ['Cas pratiques', 'Exercices guidés', 'Fichiers modèles inclus'],
    instructor: 'Franck Dégbè',
    image: 'https://readdy.ai/api/search-image?query=Microsoft%20Project%20training%20project%20management&width=400&height=250',
    badge: 'Pratique',
    logo: '📅'
  },
  {
    id: 'ms-excel-debutant',
    title: '📊 Microsoft Excel - Débutant',
    category: 'Microsoft',
    level: 'Débutant',
    duration: '15h',
    price: '490€',
    originalPrice: '650€',
    rating: 4.8,
    students: 950,
    description: 'Découvrez les bases d’Excel et apprenez à manipuler efficacement vos données.',
    features: ['Exercices pratiques', 'Supports PDF', 'Exemples concrets'],
    instructor: 'Carine Ayité',
    image: 'https://readdy.ai/api/search-image?query=Microsoft%20Excel%20beginner%20training&width=400&height=250',
    badge: 'Pratique',
    logo: '📊'
  },
  {
    id: 'ms-excel-avance',
    title: '📊 Microsoft Excel - Avancé',
    category: 'Microsoft',
    level: 'Intermédiaire',
    duration: '20h',
    price: '690€',
    originalPrice: '850€',
    rating: 4.9,
    students: 780,
    description: 'Approfondissez vos compétences Excel avec les fonctions avancées et les tableaux croisés dynamiques.',
    features: ['Fonctions avancées', 'Automatisations', 'Cas d’entreprise'],
    instructor: 'Daniel Adandé',
    image: 'https://readdy.ai/api/search-image?query=Microsoft%20Excel%20advanced%20training&width=400&height=250',
    badge: 'Pratique',
    logo: '📊'
  },
  {
    id: 'ms-excel-expert',
    title: '📊 Microsoft Excel - Expert',
    category: 'Microsoft',
    level: 'Expert',
    duration: '25h',
    price: '890€',
    originalPrice: '1050€',
    rating: 4.9,
    students: 520,
    description: 'Devenez un expert Excel : automatisation VBA, tableaux de bord et analyse de données.',
    features: ['VBA', 'Power Query', 'Dashboards dynamiques'],
    instructor: 'Esther Akowanou',
    image: 'https://readdy.ai/api/search-image?query=Microsoft%20Excel%20expert%20VBA%20training&width=400&height=250',
    badge: 'Pratique',
    logo: '📊'
  },
  {
    id: 'ms-excel-gp',
    title: '📊 Microsoft Excel appliqué à la Gestion de Projet',
    category: 'Microsoft / Gestion de projet',
    level: 'Intermédiaire',
    duration: '18h',
    price: '790€',
    originalPrice: '950€',
    rating: 4.8,
    students: 610,
    description: 'Apprenez à piloter efficacement vos projets avec Excel : planning, coûts et suivi d’avancement.',
    features: ['Modèles de suivi', 'Tableaux dynamiques', 'Analyse de rentabilité'],
    instructor: 'Judicaël Kpeto',
    image: 'https://readdy.ai/api/search-image?query=Microsoft%20Excel%20project%20management%20training&width=400&height=250',
    badge: 'Pratique',
    logo: '📊'
  }
];


  instructors = [
    { name: 'Dr. Pierre Martinet', title: 'Expert PMP Senior', experience: '15+ années', certifications: ['PMP', 'PMI-ACP', 'PMI-RMP'], image: 'https://readdy.ai/api/search-image?query=professional%20instructor%20expert%20consultant%20mature%20man%20suit%20confident%20smile%20teaching%20experience%20corporate%20trainer%20business%20coach&width=150&height=150&seq=instructor1&orientation=squarish', rating: 4.9, courses: 12 },
    // ... (all other instructors)
  ];

  constructor(
    private navigationService: NavigationService,
    private seoService: SeoService
  ) {
      const targetTime = new Date().getTime() + 6 * 60 * 60 * 1000 + 23 * 60 * 1000 + 44 * 1000; // 6 hours, 23 minutes, 44 seconds
    this.startCountdown(targetTime);
  }

  ngOnInit(): void {
    this.seoService.setPageMetadata(
      "Formations Certifiantes PMP, PRINCE2, Scrum, Lean Six Sigma | Sica Conseil Int",
      "Formations certifiantes reconnues mondialement : PMP, CAPM, PRINCE2, PSPO, PSM, Lean Six Sigma. E-learning et formation assistée. Taux de réussite 97%."
    );
    this.seoService.generateWebPageSchema(
      "Formations Certifiantes PMP, PRINCE2, Scrum, Lean Six Sigma",
      "Formations certifiantes reconnues mondialement : PMP, CAPM, PRINCE2, PSPO, PSM, Lean Six Sigma. E-learning et formation assistée. Taux de réussite 97%.",
      "/formations"
    );
    this.seoService.generateBreadcrumbSchema([
      { name: "Accueil", url: "/" },
      { name: "Formations", url: "/formations" }
    ]);
    this.seoService.generateCourseSchema(
      "Formation PMP (Project Management Professional)",
      "Certification PMP reconnue internationalement avec support complet et garantie de réussite",
      "1890",
      "35h"
    );
  }

  get filteredFormations() {
    return this.formations.filter(formation =>
      this.activeCategory === 'Tous' || formation.category === this.activeCategory
    );
  }

  navigate(path: string) {
    this.navigationService.navigate(path);
  }

    startCountdown(targetTime: number): void {
    this.timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance <= 0) {
        clearInterval(this.timer);
        this.timeLeft = "00:00:00:00"; // Countdown finished
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.timeLeft = `${this.formatTime(days)}d ${this.formatTime(hours)}h ${this.formatTime(minutes)}m ${this.formatTime(seconds)}s`;
      }
    }, 1000);
  }

  formatTime(time: number): string {
    return time < 10 ? '0' + time : time.toString();
  }
}
