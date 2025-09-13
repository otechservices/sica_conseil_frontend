import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { ThemeService } from '../../services/theme.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(
    private seoService: SeoService,
    private themeService: ThemeService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.themeService.initTheme();
    this.seoService.setPageMetadata(
      "SICA CONSEIL - Gestion de Projet & Formation PMP",
      "Maîtrisez la gestion de projet avec SICA CONSEIL. Génération automatique de projets personnalisés et formation certifiante PMP - Accès gratuit !"
    );
    this.seoService.generateOrganizationSchema();
    this.seoService.generateWebPageSchema(
      "SICA CONSEIL - Gestion de Projet & Formation PMP",
      "Maîtrisez la gestion de projet avec SICA CONSEIL. Génération automatique de projets personnalisés et formation certifiante PMP - Accès gratuit !",
      "/"
    );
  }

  navigate(path: string): void {
    this.navigationService.navigate(path);
  }
}
