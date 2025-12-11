import { Component } from '@angular/core';
import { NavigationService } from '../../../../core/services/navigation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  progressData = [
    { label: 'Formation PMP', progress: 53, color: 'bg-primary-500' },
    { label: 'Simulateur d\'examen', progress: 78, color: 'bg-primary-500' },
    { label: 'Projets générés', progress: 100, color: 'bg-primary-500' }
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
      bgColor: 'bg-primary-100 dark:bg-primary-900/30',
      iconColor: 'text-primary-600'
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

}
