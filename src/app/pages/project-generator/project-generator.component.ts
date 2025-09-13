import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-project-generator',
  templateUrl: './project-generator.component.html',
})
export class ProjectGeneratorComponent {
  selectedTemplate: string | null = null;
  searchTerm = '';
  activeCategory = 'Tous';

  templates = [
    { id: 'web-app', title: 'Application Web', category: 'Développement', description: 'Développement d\'une application web moderne', duration: '4-8 mois', complexity: 'Moyenne', complexityColor: 'text-yellow-600', icon: 'ri-window-line', color: 'bg-blue-500' },
    { id: 'mobile-app', title: 'Application Mobile', category: 'Développement', description: 'Création d\'une app mobile native ou hybride', duration: '3-6 mois', complexity: 'Élevée', complexityColor: 'text-red-600', icon: 'ri-smartphone-line', color: 'bg-purple-500' },
    { id: 'infrastructure', title: 'Infrastructure IT', category: 'Infrastructure', description: 'Mise en place ou migration d\'infrastructure', duration: '2-4 mois', complexity: 'Élevée', complexityColor: 'text-red-600', icon: 'ri-server-line', color: 'bg-green-500' },
    { id: 'marketing-campaign', title: 'Campagne Marketing', category: 'Marketing', description: 'Lancement d\'une campagne marketing digitale', duration: '1-3 mois', complexity: 'Faible', complexityColor: 'text-green-600', icon: 'ri-megaphone-line', color: 'bg-pink-500' },
    { id: 'training-program', title: 'Programme de Formation', category: 'Formation', description: 'Développement et déploiement de formation', duration: '2-4 mois', complexity: 'Moyenne', complexityColor: 'text-yellow-600', icon: 'ri-graduation-cap-line', color: 'bg-indigo-500' },
    { id: 'ecommerce-site', title: 'Site E-commerce', category: 'Développement', description: 'Création d\'une plateforme de vente en ligne', duration: '3-5 mois', complexity: 'Moyenne', complexityColor: 'text-yellow-600', icon: 'ri-shopping-cart-line', color: 'bg-orange-500' }
  ];

  recentProjects = [
    { id: 1, title: 'Application Mobile E-commerce', category: 'Développement', date: '2024-01-15', budget: '50 000€', duration: '6 mois', status: 'Complété', statusColor: 'bg-green-100 text-green-800' },
    { id: 2, title: 'Migration Cloud Infrastructure', category: 'Infrastructure', date: '2024-01-12', budget: '75 000€', duration: '4 mois', status: 'En cours', statusColor: 'bg-orange-100 text-orange-800' },
    { id: 3, title: 'Formation Équipe Marketing', category: 'Formation', date: '2024-01-10', budget: '15 000€', duration: '2 mois', status: 'Planifié', statusColor: 'bg-blue-100 text-blue-800' }
  ];

  categories = ['Tous', 'Développement', 'Infrastructure', 'Marketing', 'Formation'];

  constructor(private navigationService: NavigationService) {}

  get filteredTemplates() {
    return this.templates.filter(template => {
      const matchesCategory = this.activeCategory === 'Tous' || template.category === this.activeCategory;
      const matchesSearch = template.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           template.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  navigate(path: string) {
    this.navigationService.navigate(path);
  }
}
