import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../../core/services/navigation.service';
import { PublicContentService } from '../../../../core/services/public-content.service';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
})
export class MissionsComponent implements OnInit {
  missions: any[] = [];
  testimonials: any[] = [];
  pageContent: any = {};

  constructor(
    private navigationService: NavigationService,
    private seoService: SeoService,
    private publicContent: PublicContentService
  ) {}

  ngOnInit(): void {
    this.seoService.setPageMetadata(
      'Nos Missions - Services de Conseil en Gestion de Projet | Sica Conseil Int',
      "Découvrez nos services d'accompagnement en gestion de projet : conseil stratégique, PMO, formations certifiantes PMP, PRINCE2, transformation organisationnelle."
    );
    this.seoService.generateWebPageSchema(
      'Nos Missions - Services de Conseil en Gestion de Projet',
      "Découvrez nos services d'accompagnement en gestion de projet : conseil stratégique, PMO, formations certifiantes PMP, PRINCE2, transformation organisationnelle.",
      '/missions'
    );
    this.seoService.generateBreadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Nos Missions', url: '/missions' }
    ]);
    this.seoService.generateServiceSchema(
      'Conseil en Gestion de Projet',
      "Services complets d'accompagnement en gestion de projet, PMO, formations certifiantes et transformation organisationnelle",
      '2500'
    );

    this.publicContent.getServices().subscribe({
      next: (res) => { this.missions = res.data ?? []; }
    });

    this.publicContent.getTestimonials().subscribe({
      next: (res) => { this.testimonials = res.data ?? []; }
    });

    this.publicContent.getPageContent('missions').subscribe({
      next: (res) => { this.pageContent = res.data ?? {}; }
    });
  }

  navigate(path: string): void {
    this.navigationService.navigate(path);
  }

  get statsData(): { value: string; label: string }[] {
    return [
      { value: this.pageContent['missions.stats.missions'] ?? '250+', label: 'Missions réalisées' },
      { value: this.pageContent['missions.stats.clients'] ?? '98%', label: 'Clients satisfaits' },
      { value: this.pageContent['missions.stats.years'] ?? '15+', label: "Années d'expérience" },
      { value: this.pageContent['missions.stats.professionals'] ?? '500+', label: 'Professionnels formés' },
    ];
  }
}
