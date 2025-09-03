import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, ProgressBarModule],
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent {
  // Données des domaines principaux
  domains = [
    {
      id: 'personnes',
      name: 'Personnes',
      iconText: 'P',
      percentage: 42,
      examPercentage: 42,
      description: 'Leadership, gestion d\'équipe, communication et développement des compétences',
      currentScore: 78,
      threshold: 61,
      level: 'Bon niveau',
      color: '#f59e0b',
      questions: 42,
      subjects: [
        'Leadership et influence',
        'Gestion d\'équipe',
        'Communication',
        'Négociation',
        'Développement des compétences'
      ]
    },
    {
      id: 'processus',
      name: 'Processus',
      iconText: 'P',
      percentage: 50,
      examPercentage: 50,
      description: 'Gestion du cycle de vie du projet, planification et contrôle',
      currentScore: 82,
      threshold: 61,
      level: 'Excellent niveau',
      color: '#f59e0b',
      questions: 50,
      subjects: [
        'Initiation du projet',
        'Planification',
        'Exécution',
        'Surveillance et contrôle',
        'Clôture du projet'
      ]
    },
    {
      id: 'environnement',
      name: 'Environnement',
      iconText: 'E',
      percentage: 8,
      examPercentage: 8,
      description: 'Contexte organisationnel, stratégie et conformité',
      currentScore: 75,
      threshold: 61,
      level: 'Bon niveau',
      color: '#f59e0b',
      questions: 8,
      subjects: [
        'Structure organisationnelle',
        'Gouvernance',
        'Conformité et réglementation',
        'Stratégie d\'entreprise',
        'Gestion du changement'
      ]
    }
  ];

  // Stratégie d'entraînement recommandée
  trainingStrategy = [
    {
      step: 1,
      title: 'Identifiez vos faiblesses',
      description: 'Concentrez-vous sur les domaines où votre score est inférieur à 75%',
      icon: '🔍',
      color: '#f59e0b'
    },
    {
      step: 2,
      title: 'Étudiez puis pratiquez',
      description: 'Alternez entre formation théorique et tests pratiques',
      icon: '📚',
      color: '#3b82f6'
    },
    {
      step: 3,
      title: 'Testez régulièrement',
      description: 'Faites des tests courts mais fréquents pour maintenir votre niveau',
      icon: '▶️',
      color: '#8b5cf6'
    }
  ];

  // Navigation sidebar
  sidebarItems = [
    { icon: 'home', label: 'Tableau de bord', active: false, route: '/dashboard' },
    { icon: 'folder', label: 'Générateur de projets', active: false, route: '/project-generator' },
    { icon: 'book', label: 'Formation PMP', active: true, route: '/training' },
    { icon: 'calculator', label: 'Simulateur PMP', active: false },
    { icon: 'chart-line', label: 'Progression', active: false, route: '/history' },
    { icon: 'cog', label: 'Paramètres', active: false }
  ];

  constructor(private router: Router) {}

  onTrainDomain(domainId: string) {
    console.log('S\'entraîner sur le domaine:', domainId);
    // Logique pour démarrer l'entraînement sur un domaine
  }

  onTakeTest(domainId: string) {
    console.log('Test approfondi pour le domaine:', domainId);
    // Logique pour démarrer un test approfondi
  }

  onStudyDomain(domainId: string) {
    console.log('Étudier le domaine:', domainId);
    // Logique pour accéder aux ressources d'étude
  }

  onReturnToSimulator() {
    this.router.navigate(['/simulator']);
  }

  onAccessFormation() {
    console.log('Accéder à la formation');
    // Logique pour accéder à la formation complète
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

  getScoreColor(score: number): string {
    if (score >= 80) return '#10b981'; // Vert
    if (score >= 70) return '#f59e0b'; // Orange
    return '#ef4444'; // Rouge
  }

  getProgressWidth(score: number): number {
    return Math.min(score, 100);
  }
}