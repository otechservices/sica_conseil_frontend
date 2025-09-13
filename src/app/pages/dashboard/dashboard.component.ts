import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  selectedMenu = 'dashboard';

  menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: 'ri-dashboard-line' },
    { id: 'projects', label: 'Générateur de projets', icon: 'ri-file-text-line' },
    { id: 'formation', label: 'Formation PMP', icon: 'ri-book-line' },
    { id: 'simulator', label: 'Simulateur PMP', icon: 'ri-flask-line' },
    { id: 'progress', label: 'Progression', icon: 'ri-bar-chart-line' },
    { id: 'settings', label: 'Paramètres', icon: 'ri-settings-line' }
  ];

  progressData = [
    { label: 'Formation PMP', progress: 53, color: 'bg-orange-500' },
    { label: 'Simulateur d\'examen', progress: 78, color: 'bg-orange-500' },
    { label: 'Projets générés', progress: 100, color: 'bg-orange-500' }
  ];

  recentActivities = [
    {
      icon: 'ri-check-line',
      title: 'Module "Gestion des risques" complété',
      time: 'Il y a 2 heures',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600'
    },
    {
      icon: 'ri-file-line',
      title: 'Projet "Application mobile" généré',
      time: 'Hier',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-600'
    },
    {
      icon: 'ri-award-line',
      title: 'Test PMP réalisé - Score: 82%',
      time: 'Il y a 2 jours',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      iconColor: 'text-yellow-600'
    },
    {
      icon: 'ri-download-line',
      title: 'Certificat de formation téléchargé',
      time: 'Il y a 3 jours',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600'
    }
  ];

  constructor(private navigationService: NavigationService) {}

  navigate(path: string) {
    this.navigationService.navigate(path);
  }

  setSelectedMenu(menuId: string) {
    this.selectedMenu = menuId;
    if (menuId === 'projects') {
      this.navigate('/project-generator');
    }
    // Add other navigation logic if needed
  }
}
