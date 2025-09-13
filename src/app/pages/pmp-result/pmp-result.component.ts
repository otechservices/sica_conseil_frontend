import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-pmp-result',
  templateUrl: './pmp-result.component.html',
})
export class PmpResultComponent {
  testResult = {
    score: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    timeUsed: '55min',
    successRate: 'NaN%',
    testType: 'Quiz',
    status: 'Échec',
    threshold: 61
  };

  domainPerformance = [
    { domain: 'Personnes', score: 0, color: 'text-blue-500' },
    { domain: 'Processus', score: 0, color: 'text-green-500' },
    { domain: 'Environnement', score: 0, color: 'text-purple-500' }
  ];

  recommendations = [
    'Revoir les modules de formation',
    'Pratiquer avec des quiz ciblés',
    'Analyser vos erreurs'
  ];

  analysisData = [
    { label: 'Votre score', value: '%', subtitle: 'En dessous du seuil', color: 'text-blue-500' },
    { label: 'Seuil de réussite', value: '61%', subtitle: 'Standard PMP', color: 'text-gray-600' },
    { label: 'Score moyen', value: '78%', subtitle: 'Utilisateurs SICA', color: 'text-green-500' },
    { label: 'Score excellent', value: '85%', subtitle: 'Top 20%', color: 'text-purple-500' }
  ];

  constructor(private navigationService: NavigationService) {}

  navigate(path: string) {
    this.navigationService.navigate(path);
  }
}
