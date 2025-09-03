import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, ProgressBarModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Statistiques principales
  statistics = [
    { label: 'Projets générés', value: '12', icon: 'folder', color: '#f59e0b' },
    { label: 'Modules complétés', value: '8/15', icon: 'book', color: '#3b82f6' },
    { label: 'Score moyen PMP', value: '78%', icon: 'chart-line', color: '#10b981' },
    { label: 'Temps d\'étude', value: '24h', icon: 'clock', color: '#ef4444' }
  ];

  // Données de progression
  progressData = [
    { label: 'Formation PMP', value: 53, color: '#f59e0b' },
    { label: 'Simulateur d\'examen', value: 78, color: '#f59e0b' },
    { label: 'Projets générés', value: 100, color: '#f59e0b' }
  ];

  // Activité récente
  recentActivity = [
    { title: 'Module "Gestion des risques" complété', time: 'Il y a 2 heures', icon: 'check-circle', color: '#10b981' },
    { title: 'Projet "Application mobile" généré', time: 'Hier', icon: 'folder-plus', color: '#f59e0b' },
    { title: 'Test PMP réalisé - Score: 82%', time: 'Il y a 2 jours', icon: 'calculator', color: '#3b82f6' },
    { title: 'Certificat de formation téléchargé', time: 'Il y a 3 jours', icon: 'download', color: '#8b5cf6' }
  ];

  // Actions rapides
  quickActions = [
    { title: 'Nouveau projet', description: 'Créer un nouveau projet', icon: 'plus', color: '#f59e0b', action: 'new-project' },
    { title: 'Continuer la formation', description: 'Reprendre où vous vous êtes arrêté', icon: 'play', color: '#3b82f6', action: 'continue-training' },
    { title: 'Test PMP', description: 'Évaluer vos connaissances', icon: 'calculator', color: '#10b981', action: 'pmp-test' }
  ];

  // Navigation sidebar
  sidebarItems = [
    { icon: 'home', label: 'Tableau de bord', active: true, route: '/dashboard' },
    { icon: 'folder', label: 'Générateur de projets', active: false, route: '/project-generator' },
    { icon: 'book', label: 'Formation PMP', active: false, route: '/training' },
    { icon: 'calculator', label: 'Simulateur PMP', active: false, route: '/simulator' },
    { icon: 'chart-line', label: 'Progression', active: false, route: '/history' },
    { icon: 'cog', label: 'Paramètres', active: false }
  ];

  constructor(private router: Router) {}

  onGenerateProject() {
    this.router.navigate(['/project-generator']);
  }

  onAccessSimulator() {
    this.router.navigate(['/simulator']);
  }

  onQuickAction(action: string) {
    switch(action) {
      case 'new-project':
        this.router.navigate(['/project-generator']);
        break;
      case 'continue-training':
        this.router.navigate(['/training']);
        break;
      case 'pmp-test':
        this.router.navigate(['/simulator']);
        break;
    }
  }

  onLogout() {
    this.router.navigate(['/']);
  }

  onSidebarItemClick(item: any) {
    // Désactiver tous les items
    this.sidebarItems.forEach(i => i.active = false);
    // Activer l'item cliqué
    item.active = true;
    
    if (item.route) {
      this.router.navigate([item.route]);
    }
  }
}