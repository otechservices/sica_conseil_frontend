import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { SeoService } from '../../services/seo.service';

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
