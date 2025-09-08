import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-simulator',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, ProgressBarModule, TagModule],
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent {
  currentView: 'main' | 'history' | 'domainTraining' | 'testResult' = 'main';

  sidebarItems = [
    { icon: 'home', label: 'Tableau de bord', active: false, route: '/dashboard' },
    { icon: 'folder', label: 'Générateur de projets', active: false, route: '/project-generator' },
    { icon: 'book', label: 'Formation PMP', active: false, route: '/training' },
    { icon: 'calculator', label: 'Simulateur PMP', active: true, route: '/simulator' },
    { icon: 'chart-line', label: 'Progression', active: false, route: '#' }, // Should go to history view
    { icon: 'cog', label: 'Paramètres', active: false }
  ];

  examModes = [
    { name: 'Examen complet PMP', details: '180 questions - 230 minutes (timing officiel)', tag: 'Réel', tagSeverity: 'danger' },
    { name: 'Test d\'entrainement', details: '50 questions - 90 minutes (confortable)', tag: 'Moyen', tagSeverity: 'warning' },
    { name: 'Quiz rapide', details: '20 questions - 35 minutes (détendu)', tag: 'Facile', tagSeverity: 'success' },
    { name: 'Par domaine', details: '30 questions - 55 minutes (approfondi)', tag: 'Variable', tagSeverity: 'info' },
  ];

  domainPerformance = [
    { name: 'Personnes', score: 78, questions: 42 },
    { name: 'Processus', score: 82, questions: 50 },
    { name: 'Environnement', score: 75, questions: 88 },
  ];

  detailedHistory = [
    { type: 'Complet', date: '2024-01-15', duration: '180 min', score: 82 },
    { type: 'Entraînement', date: '2024-01-12', duration: '45 min', score: 76 },
    { type: 'Quiz', date: '2024-01-10', duration: '28 min', score: 68 },
    { type: 'Domaine', date: '2024-01-08', duration: '35 min', score: 85 },
    { type: 'Entraînement', date: '2024-01-05', duration: '50 min', score: 72 },
    { type: 'Quiz', date: '2024-01-03', duration: '38 min', score: 64 },
    { type: 'Complet', date: '2024-01-01', duration: '175 min', score: 58 },
  ];

  domainDetails = [
    {
      name: 'Personnes',
      performance: 78,
      subjects: ['Leadership et influence', 'Communication', 'Négociation', 'Développement des compétences']
    },
    {
      name: 'Processus',
      performance: 82,
      subjects: ['Initiation du projet', 'Planification', 'Exécution', 'Surveillance et contrôle', 'Clôture du projet']
    },
    {
      name: 'Environnement',
      performance: 75,
      subjects: ['Structure organisationnelle', 'Gouvernance', 'Conformité et réglementation', 'Stratégie d\'entreprise', 'Gestion du changement']
    },
  ];

  constructor(private router: Router) {}

  setView(view: 'main' | 'history' | 'domainTraining' | 'testResult') {
    this.currentView = view;
  }

  onAccessTraining() {
    this.router.navigate(['/training']);
  }

  onLogout() {
    this.router.navigate(['/']);
  }

  onSidebarItemClick(item: any) {
    this.sidebarItems.forEach(i => i.active = false);
    item.active = true;
    
    if (item.label === 'Progression') {
        this.setView('history');
    } else if (item.route) {
      this.router.navigate([item.route]);
    }
  }
}