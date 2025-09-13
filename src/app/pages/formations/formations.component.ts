import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
})
export class FormationsComponent implements OnInit {
  isMenuOpen = false;
  activeCategory = 'Tous';

  categories = ['Tous', 'PMP/CAPM', 'PRINCE2', 'Scrum', 'Lean Six Sigma'];

  formations = [
    { id: 'pmp-elearning', title: '📘 PMP (Project Management Professional) - E-learning', category: 'PMP/CAPM', level: 'Avancé', duration: '35h', price: '1890€', originalPrice: '2200€', rating: 4.9, students: 1520, description: 'Certification PMP en e-learning avec support complet et garantie de réussite', features: ['35h de formation e-learning', 'Tests blancs illimités', 'Support personnalisé 24/7', 'Garantie de réussite', 'Certificat officiel PMI'], instructor: 'Dr. Pierre Martinet', image: 'https://readdy.ai/api/search-image?query=professional%20project%20management%20online%20e-learning%20computer%20screen%20modern%20office%20PMP%20certification%20digital%20training%20course%20interactive%20modules&width=400&height=250&seq=pmp-elearning&orientation=landscape', badge: 'Certifiant', logo: '📘' },
    // ... (all other formations from the provided code)
  ];

  instructors = [
    { name: 'Dr. Pierre Martinet', title: 'Expert PMP Senior', experience: '15+ années', certifications: ['PMP', 'PMI-ACP', 'PMI-RMP'], image: 'https://readdy.ai/api/search-image?query=professional%20instructor%20expert%20consultant%20mature%20man%20suit%20confident%20smile%20teaching%20experience%20corporate%20trainer%20business%20coach&width=150&height=150&seq=instructor1&orientation=squarish', rating: 4.9, courses: 12 },
    // ... (all other instructors)
  ];

  constructor(
    private navigationService: NavigationService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.seoService.setPageMetadata(
      "Formations Certifiantes PMP, PRINCE2, Scrum, Lean Six Sigma | SICA CONSEIL",
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
}
