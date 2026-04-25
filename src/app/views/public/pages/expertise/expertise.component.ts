import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../../core/services/navigation.service';
import { PublicContentService } from '../../../../core/services/public-content.service';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-expertise',
  templateUrl: './expertise.component.html',
})
export class ExpertiseComponent implements OnInit {
  activeTab = 'expertise';
  domainesCles: any[] = [];
  secteurs: any[] = [];
  teamMembers: any[] = [];
  pageContent: any = {};

  // Certifications restent statiques (données structurelles rarement modifiées)
  certifications = [
    { name: 'PMP®',          count: 15, color: 'bg-primary-500' },
    { name: 'PRINCE2®',      count: 12, color: 'bg-purple-500' },
    { name: 'PSM',           count: 10, color: 'bg-blue-500' },
    { name: 'Lean Six Sigma', count: 8, color: 'bg-green-500' },
  ];

  constructor(
    private navigationService: NavigationService,
    private seoService: SeoService,
    private publicContent: PublicContentService
  ) {}

  ngOnInit(): void {
    this.seoService.setPageMetadata(
      'Notre Expertise en Gestion de Projet et Transformation | Sica Conseil Int',
      "Expertise éprouvée en gestion de projets, gouvernance, PMO/DPMO, transformation organisationnelle. 15+ années d'expérience, 25+ experts certifiés."
    );
    this.seoService.generateWebPageSchema(
      'Notre Expertise en Gestion de Projet et Transformation',
      "Expertise éprouvée en gestion de projets, gouvernance, PMO/DPMO, transformation organisationnelle. 15+ années d'expérience, 25+ experts certifiés.",
      '/expertise'
    );
    this.seoService.generateBreadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Notre Expertise', url: '/expertise' }
    ]);

    this.publicContent.getServices('domain').subscribe({
      next: (res) => { this.domainesCles = res.data ?? []; }
    });

    this.publicContent.getServices('secteur').subscribe({
      next: (res) => { this.secteurs = res.data ?? []; }
    });

    this.publicContent.getTeam().subscribe({
      next: (res) => { this.teamMembers = res.data ?? []; }
    });

    this.publicContent.getPageContent('expertise').subscribe({
      next: (res) => { this.pageContent = res.data ?? {}; }
    });
  }

  navigate(path: string): void {
    this.navigationService.navigate(path);
  }

  get statsProjects(): string  { return this.pageContent['expertise.stats.projects']     ?? '200+'; }
  get statsYears(): string     { return this.pageContent['expertise.stats.years']        ?? '15+'; }
  get statsExperts(): string   { return this.pageContent['expertise.stats.experts']      ?? '25+'; }
  get statsSuccess(): string   { return this.pageContent['expertise.stats.success_rate'] ?? '95%'; }
}
