import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-expertise',
  templateUrl: './expertise.component.html',
})
export class ExpertiseComponent implements OnInit {
  activeTab = 'expertise';

  domainesCles = [
    { id: 1, title: 'Gouvernance & méthodologies', description: 'Cadrage, choix des approches (PMP®, PRINCE2®, Agile, Lean Six Sigma), kits de gouvernance et standards.', icon: 'ri-settings-3-line', color: 'bg-blue-500', image: 'https://readdy.ai/api/search-image?query=business%20governance%20methodology%20frameworks%20meeting%20room%20professionals%20discussing%20project%20management%20standards%20agile%20scrum%20prince2%20whiteboard%20charts%20modern%20office%20environment%20collaborative%20workspace%20strategic%20planning&width=400&height=250&seq=governance1&orientation=landscape' },
    { id: 2, title: 'Mise en place et accompagnement de PMO/DPMO', description: 'Diagnostic de maturité, conception de la cible, processus et modèles, outillage PPM, tableaux de bord et reporting.', icon: 'ri-building-line', color: 'bg-purple-500', image: 'https://readdy.ai/api/search-image?query=PMO%20office%20setup%20project%20management%20office%20professionals%20working%20with%20dashboards%20monitors%20data%20analytics%20reporting%20tools%20modern%20business%20environment%20team%20collaboration%20strategic%20oversight%20digital%20displays&width=400&height=250&seq=pmo1&orientation=landscape' },
    { id: 3, title: 'Gestion de portefeuille & programmes (PPM)', description: 'Priorisation, arbitrage budgétaire, capacity planning, feuille de route, suivi des bénéfices.', icon: 'ri-briefcase-line', color: 'bg-green-500', image: 'https://readdy.ai/api/search-image?query=portfolio%20management%20executives%20reviewing%20project%20portfolios%20financial%20planning%20budget%20allocation%20capacity%20planning%20strategic%20roadmap%20business%20meeting%20conference%20room%20professional%20analysis%20charts%20graphs&width=400&height=250&seq=portfolio1&orientation=landscape' },
    { id: 4, title: 'Pilotage de projets', description: 'PMO opérationnel, gestion des risques, qualité, coûts et délais, animation des comités.', icon: 'ri-dashboard-line', color: 'bg-orange-500', image: 'https://readdy.ai/api/search-image?query=project%20management%20steering%20committee%20meeting%20professionals%20discussing%20risks%20quality%20costs%20timeline%20operational%20pmo%20dashboard%20monitoring%20tools%20business%20meeting%20room%20strategic%20oversight&width=400&height=250&seq=pilotage1&orientation=landscape' },
    { id: 5, title: 'Conduite du changement', description: 'Communication, formation, coaching et adoption des nouvelles pratiques.', icon: 'ri-arrow-right-up-line', color: 'bg-indigo-500', image: 'https://readdy.ai/api/search-image?query=change%20management%20workshop%20diverse%20team%20transformation%20coaching%20communication%20training%20session%20facilitator%20leading%20organizational%20change%20adoption%20new%20practices%20collaborative%20environment%20professional%20development&width=400&height=250&seq=change1&orientation=landscape' },
    { id: 6, title: 'Suivi-évaluation & performance', description: 'Cadres logiques, KPI/OKR, data & insights pour la décision.', icon: 'ri-line-chart-line', color: 'bg-red-500', image: 'https://readdy.ai/api/search-image?query=performance%20monitoring%20analytics%20dashboard%20KPI%20OKR%20data%20insights%20business%20intelligence%20reporting%20tools%20executives%20analyzing%20metrics%20decision%20making%20modern%20office%20environment%20professional%20analysis&width=400&height=250&seq=performance1&orientation=landscape' },
    { id: 7, title: 'Formations certifiantes', description: 'PMP®, PRINCE2®, PSM, Lean Six Sigma (Green/Black Belt).', icon: 'ri-graduation-cap-line', color: 'bg-teal-500', image: 'https://readdy.ai/api/search-image?query=professional%20certification%20training%20classroom%20instructor%20teaching%20PMP%20PRINCE2%20PSM%20Lean%20Six%20Sigma%20students%20learning%20project%20management%20certification%20course%20modern%20training%20facility%20educational%20environment&width=400&height=250&seq=formation1&orientation=landscape' }
  ];

  secteurs = [
    { name: 'Industrie', projects: 45, icon: 'ri-factory-line' }, { name: 'Énergie', projects: 32, icon: 'ri-flashlight-line' },
    { name: 'Finance', projects: 28, icon: 'ri-bank-line' }, { name: 'IT & Digital', projects: 52, icon: 'ri-computer-line' },
    { name: 'Secteur Public', projects: 38, icon: 'ri-government-line' }
  ];

  certifications = [
    { name: 'PMP®', count: 15, color: 'bg-orange-500' }, { name: 'PRINCE2®', count: 12, color: 'bg-purple-500' },
    { name: 'PSM', count: 10, color: 'bg-blue-500' }, { name: 'Lean Six Sigma', count: 8, color: 'bg-green-500' }
  ];

  constructor(
    private navigationService: NavigationService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.seoService.setPageMetadata(
      "Notre Expertise en Gestion de Projet et Transformation | SICA CONSEIL",
      "Expertise éprouvée en gestion de projets, gouvernance, PMO/DPMO, transformation organisationnelle. 15+ années d'expérience, 25+ experts certifiés."
    );
    this.seoService.generateWebPageSchema(
      "Notre Expertise en Gestion de Projet et Transformation",
      "Expertise éprouvée en gestion de projets, gouvernance, PMO/DPMO, transformation organisationnelle. 15+ années d'expérience, 25+ experts certifiés.",
      "/expertise"
    );
    this.seoService.generateBreadcrumbSchema([
      { name: "Accueil", url: "/" },
      { name: "Notre Expertise", url: "/expertise" }
    ]);
  }

  navigate(path: string) {
    this.navigationService.navigate(path);
  }
}
