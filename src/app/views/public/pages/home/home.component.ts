import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../../core/services/navigation.service';
import { PublicContentService } from '../../../../core/services/public-content.service';
import { SeoService } from '../../../../core/services/seo.service';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  missions: any[] = [];
  pageContent: any = {};
  loading = true;

  constructor(
    private seoService: SeoService,
    private themeService: ThemeService,
    private navigationService: NavigationService,
    private publicContent: PublicContentService
  ) {}

  ngOnInit(): void {
    this.themeService.initTheme();
    this.seoService.setPageMetadata(
      'Sica Conseil Int - Gestion de Projet & Formation PMP',
      'Maîtrisez la gestion de projet avec Sica Conseil Int. Génération automatique de projets personnalisés et formation certifiante PMP - Accès gratuit !'
    );
    this.seoService.generateOrganizationSchema();
    this.seoService.generateWebPageSchema(
      'Sica Conseil Int - Gestion de Projet & Formation PMP',
      'Maîtrisez la gestion de projet avec Sica Conseil Int. Génération automatique de projets personnalisés et formation certifiante PMP - Accès gratuit !',
      '/'
    );

    this.publicContent.getServices().subscribe({
      next: (res) => { this.missions = res.data ?? []; this.loading = false; },
      error: () => { this.loading = false; }
    });

    this.publicContent.getPageContent('home').subscribe({
      next: (res) => { this.pageContent = res.data ?? {}; }
    });
  }

  navigate(path: string): void {
    this.navigationService.navigate(path);
  }

  get heroCtaLabel(): string {
    return this.pageContent['home.hero.cta_label'] ?? 'Devenez certifié à partir de 800F CFA';
  }

  get statsProjects(): string { return this.pageContent['home.stats.projects'] ?? '500+'; }
  get statsProjectsLabel(): string { return this.pageContent['home.stats.projects_label'] ?? 'Projets générés'; }
  get statsSuccessRate(): string { return this.pageContent['home.stats.success_rate'] ?? '95%'; }
  get statsSuccessRateLabel(): string { return this.pageContent['home.stats.success_rate_label'] ?? 'Taux de réussite PMP'; }
  get statsUsers(): string { return this.pageContent['home.stats.users'] ?? '1000+'; }
  get statsUsersLabel(): string { return this.pageContent['home.stats.users_label'] ?? 'Utilisateurs actifs'; }
  get ctaTitle(): string { return this.pageContent['home.cta.title'] ?? 'Prêt à transformer votre approche de la gestion de projet ?'; }
  get ctaSubtitle(): string { return this.pageContent['home.cta.subtitle'] ?? 'Rejoignez des milliers de professionnels qui font confiance à Sica Conseil Int'; }
}
