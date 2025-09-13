import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-pmp-training',
  templateUrl: './pmp-training.component.html',
})
export class PmpTrainingComponent {
  selectedLevel = 'débutant';
  lessonProgress: { [key: string]: boolean } = {};
  showLessonModal = false;
  selectedLesson: any = null;
  showProfileDropdown = false;
  studyModal: string | null = null;
  moduleModal: { domainId: string; moduleIndex: number } | null = null;
  lessonModal: { domainId: string; moduleIndex: number; lessonIndex: number } | null = null;

  constructor(private navigationService: NavigationService, private sanitizer: DomSanitizer) {}

  domains = [
    {
      id: 'personnes',
      title: 'Personnes',
      subtitle: '42% de l\'examen',
      description: 'Leadership, gestion d\'équipe, communication et développement des compétences',
      score: 78,
      level: 'Faible',
      color: 'bg-orange-500',
      icon: 'ri-team-line',
      topics: ['Leadership et influence', 'Gestion d\'équipe', 'Communication', 'Négociation', 'Développement des compétences'],
      studyContent: {
        overview: 'Ce domaine représente 42% de l\'examen PMP et se concentre sur les aspects humains de la gestion de projet. Il couvre les compétences relationnelles, le leadership, la communication et la gestion d\'équipe.',
        keyPoints: [
          'Développer des compétences en leadership pour inspirer et motiver l\'équipe',
          'Gérer efficacement la dynamique d\'équipe et résoudre les conflits',
          'Maîtriser les techniques de communication avec toutes les parties prenantes',
          'Négocier et influencer pour obtenir l\'adhésion et les ressources nécessaires',
          'Développer continuellement les compétences de l\'équipe'
        ],
        modules: [
          { title: 'Leadership et Influence', duration: '45 min', description: 'Techniques de leadership situationnel et d\'influence positive' },
          { title: 'Gestion d\'Équipe', duration: '60 min', description: 'Formation d\'équipes performantes et gestion des conflits' },
          { title: 'Communication Efficace', duration: '40 min', description: 'Plans de communication et techniques de présentation' },
          { title: 'Négociation', duration: '35 min', description: 'Stratégies de négociation et résolution de problèmes' }
        ]
      }
    },
    {
      id: 'processus',
      title: 'Processus',
      subtitle: '50% de l\'examen',
      description: 'Gestion du cycle de vie du projet, planification et contrôle',
      score: 82,
      level: 'Excellent',
      color: 'bg-yellow-500',
      icon: 'ri-settings-line',
      topics: ['Initiation du projet', 'Planification', 'Exécution', 'Surveillance et contrôle', 'Clôture du projet'],
      studyContent: {
        overview: 'Ce domaine représente 50% de l\'examen PMP et couvre l\'ensemble du cycle de vie du projet selon le guide PMBOK. Il inclut tous les processus depuis l\'initiation jusqu\'à la clôture.',
        keyPoints: [
          'Maîtriser les 5 groupes de processus : Initiation, Planification, Exécution, Surveillance/Contrôle, Clôture',
          'Comprendre les 10 domaines de connaissance et leurs interactions',
          'Savoir utiliser les outils et techniques appropriés pour chaque processus',
          'Gérer les changements et maintenir la performance du projet',
          'Assurer la qualité et respecter les contraintes de coût, délai et périmètre'
        ],
        modules: [
          { title: 'Initiation du Projet', duration: '55 min', description: 'Charte projet, identification des parties prenantes' },
          { title: 'Planification Détaillée', duration: '90 min', description: 'Plan de management, WBS, planification des ressources' },
          { title: 'Exécution et Direction', duration: '70 min', description: 'Gestion des livrables et coordination des activités' },
          { title: 'Surveillance et Contrôle', duration: '80 min', description: 'Suivi de la performance et gestion des changements' }
        ]
      }
    },
    {
      id: 'environnement',
      title: 'Environnement',
      subtitle: '8% de l\'examen',
      description: 'Contexte organisationnel, stratégie et conformité',
      score: 75,
      level: 'Faible',
      color: 'bg-green-500',
      icon: 'ri-building-line',
      topics: ['Structure organisationnelle', 'Gouvernance', 'Conformité et réglementation', 'Stratégie d\'entreprise', 'Gestion du changement'],
      studyContent: {
        overview: 'Ce domaine représente 8% de l\'examen PMP et traite du contexte dans lequel évoluent les projets. Il couvre l\'environnement organisationnel, la gouvernance et l\'alignement stratégique.',
        keyPoints: [
          'Comprendre l\'impact de la structure organisationnelle sur les projets',
          'Aligner les projets avec la stratégie d\'entreprise',
          'Respecter les exigences de gouvernance et de conformité',
          'Gérer le changement organisationnel',
          'Naviguer dans les contraintes politiques et culturelles'
        ],
        modules: [
          { title: 'Structures Organisationnelles', duration: '30 min', description: 'Types d\'organisations et leur impact sur les projets' },
          { title: 'Gouvernance de Projet', duration: '40 min', description: 'Cadres de gouvernance et processus de décision' },
          { title: 'Alignement Stratégique', duration: '35 min', description: 'Lien entre projets et objectifs organisationnels' },
          { title: 'Gestion du Changement', duration: '45 min', description: 'Conduite du changement et adoption des solutions' }
        ]
      }
    }
  ];

  lessons = [
    { title: 'Concepts fondamentaux', duration: '15 min', icon: 'ri-play-circle-line', content: { introduction: 'Cette leçon couvre les concepts fondamentaux et les définitions clés.', keyPoints: ['Terminologie PMI', 'Meilleures pratiques', 'Exemples concrets'], detailedContent: `<h3>Introduction aux concepts fondamentaux</h3>...` } },
    { title: 'Outils et techniques', duration: '20 min', icon: 'ri-tools-line', content: { introduction: 'Découverte des outils pratiques et des techniques spécifiques au domaine.', keyPoints: ['Outils standards PMI', 'Techniques d\'optimisation', 'Cas d\'usage pratiques'], detailedContent: `<h3>Outils et techniques essentiels</h3>...` } },
    { title: 'Cas pratiques et exercices', duration: '15 min', icon: 'ri-lightbulb-line', content: { introduction: 'Mise en pratique avec des exercices interactifs et des études de cas réels.', keyPoints: ['Quiz interactifs', 'Études de cas', 'Exercices pratiques'], detailedContent: `<h3>Application pratique des connaissances</h3>...` } }
  ];

  getScoreColor = (score: number) => score >= 80 ? 'text-green-600' : score >= 70 ? 'text-yellow-600' : 'text-red-600';
  getScoreBarColor = (score: number) => score >= 80 ? 'bg-green-500' : score >= 70 ? 'bg-yellow-500' : 'bg-red-500';

  openStudyModal = (domainId: string) => this.studyModal = domainId;
  closeStudyModal = () => this.studyModal = null;

  openModuleModal = (domainId: string, moduleIndex: number) => { this.moduleModal = { domainId, moduleIndex }; this.studyModal = null; };
  closeModuleModal = () => this.moduleModal = null;

  openLessonModal = (domainId: string, moduleIndex: number, lessonIndex: number) => { this.lessonModal = { domainId, moduleIndex, lessonIndex }; this.moduleModal = null; };
  closeLessonModal = () => this.lessonModal = null;

  completeLesson = (domainId: string, moduleIndex: number, lessonIndex: number) => this.lessonProgress[`${domainId}-${moduleIndex}-${lessonIndex}`] = true;
  isLessonCompleted = (domainId: string, moduleIndex: number, lessonIndex: number) => this.lessonProgress[`${domainId}-${moduleIndex}-${lessonIndex}`] === true;
  isLessonUnlocked = (domainId: string, moduleIndex: number, lessonIndex: number) => lessonIndex === 0 || this.isLessonCompleted(domainId, moduleIndex, lessonIndex - 1);

  getModuleProgress(domainId: string, moduleIndex: number) {
    const totalLessons = 3;
    let completedLessons = 0;
    for (let i = 0; i < totalLessons; i++) {
      if (this.isLessonCompleted(domainId, moduleIndex, i)) completedLessons++;
    }
    return Math.round((completedLessons / totalLessons) * 100);
  }

  get currentDomain() {
    return this.domains.find(d => d.id === this.studyModal);
  }

  get currentModule() {
    return this.moduleModal ? this.domains.find(d => d.id === this.moduleModal!.domainId)?.studyContent.modules[this.moduleModal!.moduleIndex] : null;
  }

  get currentModuleDomain() {
    return this.moduleModal ? this.domains.find(d => d.id === this.moduleModal!.domainId) : null;
  }

  get currentLessonData() {
    if (!this.lessonModal) return null;
    const domain = this.domains.find(d => d.id === this.lessonModal!.domainId);
    const module = domain?.studyContent.modules[this.lessonModal!.moduleIndex];
    return { domain, module, lessonIndex: this.lessonModal!.lessonIndex };
  }

  getSanitizedHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  handleProfileClick = () => this.showProfileDropdown = !this.showProfileDropdown;
  handleLogout = () => { this.showProfileDropdown = false; this.navigate('/login'); };
  handleGoToDashboard = () => { this.showProfileDropdown = false; this.navigate('/dashboard'); };
  handleGoToProfile = () => { this.showProfileDropdown = false; this.navigate('/dashboard'); };

  navigate(path: string) {
    this.navigationService.navigate(path);
  }

  goBackToModuleFromLesson() {
    if (this.lessonModal) {
      const domainId = this.lessonModal.domainId;
      const moduleIndex = this.lessonModal.moduleIndex;
      this.closeLessonModal();
      this.openModuleModal(domainId, moduleIndex);
    }
  }
}
