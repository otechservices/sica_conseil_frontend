import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Données du simulateur PMP
  simulatorData = {
    correctAnswers: 0,
    totalQuestions: 0,
    timeUsed: '55min',
    successRate: 'NaN%',
    examType: 'Quiz',
    status: 'Échec'
  };

  // Données de performance par domaine
  domainPerformance = [
    { domain: 'Initiation', score: 45, color: '#ef4444' },
    { domain: 'Planification', score: 72, color: '#f59e0b' },
    { domain: 'Exécution', score: 68, color: '#10b981' },
    { domain: 'Surveillance', score: 55, color: '#3b82f6' },
    { domain: 'Clôture', score: 80, color: '#8b5cf6' }
  ];

  // Données d'analyse détaillée
  detailedAnalysis = {
    yourScore: { value: 0, label: 'Votre score', subtitle: 'En dessous du seuil', color: '#3b82f6' },
    passThreshold: { value: 61, label: 'Seuil de réussite', subtitle: 'Standard PMP', color: '#6b7280' },
    averageScore: { value: 78, label: 'Score moyen', subtitle: 'Utilisateurs SICA', color: '#10b981' },
    excellentScore: { value: 85, label: 'Score excellent', subtitle: 'Top 20%', color: '#8b5cf6' }
  };

  // Actions recommandées
  recommendedActions = [
    'Revoir les modules de formation',
    'Pratiquer avec des quiz ciblés',
    'Analyser vos erreurs'
  ];

  // Navigation sidebar
  sidebarItems = [
    { icon: 'grid', label: 'Tableau de bord', active: true },
    { icon: 'document', label: 'Générateur de projets', active: false },
    { icon: 'academic-cap', label: 'Formation PMP', active: false },
    { icon: 'calculator', label: 'Simulateur PMP', active: false },
    { icon: 'chart-bar', label: 'Progression', active: false },
    { icon: 'cog', label: 'Paramètres', active: false }
  ];

  constructor() {}

  onRetakeTest() {
    console.log('Refaire un test');
    // Logique pour refaire un test
  }

  onAccessTraining() {
    console.log('Accéder à la formation');
    // Logique pour accéder à la formation
  }

  onDownloadReport() {
    console.log('Télécharger le rapport');
    // Logique pour télécharger le rapport
  }

  onShareResult() {
    console.log('Partager le résultat');
    // Logique pour partager le résultat
  }

  onViewHistory() {
    console.log('Voir l\'historique');
    // Logique pour voir l'historique
  }

  onLogout() {
    console.log('Déconnexion');
    // Logique de déconnexion
  }

  onSidebarItemClick(item: any) {
    // Désactiver tous les items
    this.sidebarItems.forEach(i => i.active = false);
    // Activer l'item cliqué
    item.active = true;
    console.log('Navigation vers:', item.label);
  }
}