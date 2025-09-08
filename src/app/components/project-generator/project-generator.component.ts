import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-project-generator',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, InputTextModule, TagModule],
  templateUrl: './project-generator.component.html',
  styleUrls: []
})
export class ProjectGeneratorComponent {
  templates = [
    { name: 'Application Web', category: 'Développement', description: 'Développement d\'une application web moderne', duration: '4-8 mois', complexity: 'Moyenne' },
    { name: 'Application Mobile', category: 'Développement', description: 'Création d\'une app mobile native ou hybride', duration: '3-6 mois', complexity: 'Élevée' },
    { name: 'Infrastructure IT', category: 'Infrastructure', description: 'Mise en place ou migration d\'infrastructure', duration: '2-4 mois', complexity: 'Élevée' },
    { name: 'Campagne Marketing', category: 'Marketing', description: 'Lancement d\'une campagne marketing digitale', duration: '1-3 mois', complexity: 'Faible' },
    { name: 'Programme de Formation', category: 'Formation', description: 'Développement et déploiement de formations', duration: '2-4 mois', complexity: 'Moyenne' },
    { name: 'Site E-commerce', category: 'Développement', description: 'Création d\'une plateforme de vente en ligne', duration: '3-5 mois', complexity: 'Moyenne' },
  ];

  recentProjects = [
    { name: 'Application Mobile E-commerce', date: '2024-01-15', cost: '50 000€', duration: '6 mois', status: 'Complété' },
    { name: 'Migration Cloud Infrastructure', date: '2024-01-12', cost: '75 000€', duration: '4 mois', status: 'En cours' },
    { name: 'Formation Équipe Marketing', date: '2024-01-10', cost: '15 000€', duration: '2 mois', status: 'Planifié' },
  ];

  getSeverity(category: string): any {
    switch (category) {
      case 'Développement': return 'info';
      case 'Infrastructure': return 'danger';
      case 'Marketing': return 'success';
      case 'Formation': return 'warning';
      case 'Complété': return 'success';
      case 'En cours': return 'warning';
      case 'Planifié': return 'info';
    }
  }

  getComplexityColor(complexity: string): string {
    switch (complexity) {
      case 'Faible': return 'success';
      case 'Moyenne': return 'warning';
      case 'Élevée': return 'danger';
      default: return 'secondary';
    }
  }
}
