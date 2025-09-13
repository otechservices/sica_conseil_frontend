import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
})
export class MissionsComponent implements OnInit {
  isMenuOpen = false;

  missions = [
    { id: 1, title: 'Conseil stratégique et cadrage de projet', description: 'Accompagnement pour définir votre vision projet et clarifier vos objectifs stratégiques', icon: 'ri-compass-3-line', color: 'bg-blue-500', image: 'https://readdy.ai/api/search-image?query=professional%20business%20executives%20meeting%20strategic%20planning%20corporate%20boardroom%20modern%20office%20environment%20charts%20graphs%20wall%20collaborative%20discussion%20project%20management%20consulting%20whiteboard%20presentation&width=400&height=250&seq=mission1-strategy&orientation=landscape', features: ['Définition de la vision projet', 'Clarification des objectifs et KPI', 'Études de faisabilité complètes', 'Alignement stratégique'], duration: '2-4 semaines', price: 'Sur devis' },
    { id: 2, title: 'Mise en place de méthodologies de gestion de projet', description: "Déploiement des référentiels reconnus adaptés à votre culture d'entreprise", icon: 'ri-settings-4-line', color: 'bg-orange-500', image: 'https://readdy.ai/api/search-image?query=project%20management%20methodology%20training%20session%20professional%20instructor%20teaching%20Agile%20Scrum%20PMBOK%20frameworks%20whiteboard%20diagrams%20corporate%20training%20room%20modern%20office%20business%20education&width=400&height=250&seq=mission2-methodology&orientation=landscape', features: ['PMBOK, Prince2, Agile, Lean Six Sigma', 'Adaptation à votre contexte', 'Formation des équipes', 'Support méthodologique'], duration: '1-3 mois', price: 'À partir de 2500€' },
    { id: 3, title: 'Pilotage opérationnel de projets et programmes', description: "Gestion complète du suivi de vos projets avec mise en place d'outils adaptés", icon: 'ri-dashboard-3-line', color: 'bg-purple-500', image: 'https://readdy.ai/api/search-image?query=PMO%20project%20management%20office%20multiple%20screens%20dashboards%20monitoring%20tools%20modern%20workspace%20professionals%20tracking%20project%20progress%20analytics%20charts%20data%20visualization%20control%20center%20technology&width=400&height=250&seq=mission3-operations&orientation=landscape', features: ['Rôle de PMO (Project Management Office)', 'Suivi délais, budgets, livrables', 'Outils MS Project, Jira, Trello, Asana', 'Animation comités de pilotage'], duration: '3-12 mois', price: 'Sur devis' },
    { id: 4, title: 'Accompagnement du changement', description: "Stratégies pour favoriser l'adhésion et développer une culture projet", icon: 'ri-team-line', color: 'bg-green-500', image: 'https://readdy.ai/api/search-image?query=change%20management%20workshop%20diverse%20team%20collaboration%20facilitator%20leading%20organizational%20transformation%20session%20modern%20conference%20room%20teamwork%20business%20culture%20development%20professional%20training&width=400&height=250&seq=mission4-change&orientation=landscape', features: ['Plans de conduite du changement', 'Communication interne ciblée', 'Formation et coaching équipes', 'Développement culture projet'], duration: '2-6 mois', price: 'À partir de 3000€' },
    { id: 5, title: 'Capitalisation et amélioration continue', description: 'Mise en place de systèmes pour améliorer votre maturité en gestion de projet', icon: 'ri-line-chart-line', color: 'bg-indigo-500', image: 'https://readdy.ai/api/search-image?query=knowledge%20management%20system%20continuous%20improvement%20business%20analytics%20team%20reviewing%20project%20lessons%20learned%20metrics%20performance%20data%20modern%20office%20environment%20professional%20documentation%20process%20optimization&width=400&height=250&seq=mission5-improvement&orientation=landscape', features: ["Organisation des retours d'expérience", 'Gestion des connaissances', 'Amélioration maturité projet', 'Optimisation continue'], duration: '1-4 mois', price: 'À partir de 2000€' },
    { id: 6, title: 'Services spécialisés selon les besoins', description: "Expertise sectorielle et thématique adaptée à vos enjeux spécifiques", icon: 'ri-tools-line', color: 'bg-pink-500', image: 'https://readdy.ai/api/search-image?query=digital%20transformation%20specialized%20services%20high-tech%20innovation%20laboratory%20advanced%20technology%20solutions%20modern%20business%20environment%20artificial%20intelligence%20cloud%20computing%20cybersecurity%20futuristic%20workspace%20professional%20consulting&width=400&height=250&seq=mission6-specialized&orientation=landscape', features: ['Digital & innovation (IA, cloud, cybersécurité)', 'Organisation & gouvernance', 'RSE & conformité (RGPD)', 'Industrie & lean management'], duration: 'Variable', price: 'Sur devis' }
  ];

  testimonials = [
    { name: 'Marie Dubois', position: 'Chef de Projet IT', company: 'TechCorp', text: "Grâce à SICA CONSEIL, j'ai obtenu ma certification PMP en 3 mois. L'accompagnement était parfait !", rating: 5, avatar: 'https://readdy.ai/api/search-image?query=professional%20business%20woman%20smiling%20portrait%20headshot%20corporate%20attire%20confident%20friendly%20modern%20office%20background%20clean%20lighting&width=80&height=80&seq=testimonial1&orientation=squarish' },
    { name: 'Jean Martin', position: 'Directeur Technique', company: 'InnovSoft', text: "L'audit de nos processus a révolutionné notre façon de gérer les projets. ROI exceptionnel.", rating: 5, avatar: 'https://readdy.ai/api/search-image?query=professional%20business%20man%20smiling%20portrait%20headshot%20suit%20tie%20confident%20experienced%20mature%20modern%20office%20background%20clean%20lighting&width=80&height=80&seq=testimonial2&orientation=squarish' },
    { name: 'Sophie Laurent', position: 'PMO Manager', company: 'GlobalTech', text: "Formation sur mesure exceptionnelle. Nos équipes ont gagné en efficacité de 40%.", rating: 5, avatar: 'https://readdy.ai/api/search-image?query=professional%20business%20woman%20confident%20smile%20portrait%20headshot%20blazer%20corporate%20attire%20leadership%20modern%20office%20background%20clean%20lighting&width=80&height=80&seq=testimonial3&orientation=squarish' }
  ];

  constructor(
    private navigationService: NavigationService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.seoService.setPageMetadata(
      "Nos Missions - Services de Conseil en Gestion de Projet | SICA CONSEIL",
      "Découvrez nos services d'accompagnement en gestion de projet : conseil stratégique, PMO, formations certifiantes PMP, PRINCE2, transformation organisationnelle."
    );
    this.seoService.generateWebPageSchema(
      "Nos Missions - Services de Conseil en Gestion de Projet",
      "Découvrez nos services d'accompagnement en gestion de projet : conseil stratégique, PMO, formations certifiantes PMP, PRINCE2, transformation organisationnelle.",
      "/missions"
    );
    this.seoService.generateBreadcrumbSchema([
      { name: "Accueil", url: "/" },
      { name: "Nos Missions", url: "/missions" }
    ]);
    this.seoService.generateServiceSchema(
      "Conseil en Gestion de Projet",
      "Services complets d'accompagnement en gestion de projet, PMO, formations certifiantes et transformation organisationnelle",
      "2500"
    );
  }

  navigate(path: string) {
    this.navigationService.navigate(path);
  }
}
