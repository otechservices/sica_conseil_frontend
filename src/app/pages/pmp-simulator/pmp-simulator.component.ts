import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-pmp-simulator',
  templateUrl: './pmp-simulator.component.html',
})
export class PmpSimulatorComponent {
  selectedMode: string | null = null;

  examModes = [
    { id: 'complet', title: 'Examen complet PMP', description: '180 questions - 230 minutes (timing officiel)', questions: 180, duration: '230 min', badge: 'Réel', badgeColor: 'bg-red-500' },
    { id: 'entrainement', title: "Test d'entraînement", description: '50 questions - 90 minutes (confortable)', questions: 50, duration: '90 min', badge: 'Moyen', badgeColor: 'bg-orange-500' },
    { id: 'rapide', title: 'Quiz rapide', description: '20 questions - 35 minutes (détente)', questions: 20, duration: '35 min', badge: 'Facile', badgeColor: 'bg-yellow-500' },
    { id: 'domaine', title: 'Par domaine', description: '30 questions - 55 minutes (approfondi)', questions: 30, duration: '55 min', badge: 'Variable', badgeColor: 'bg-purple-500' }
  ];

  recentResults = [
    { name: 'Test complet', date: '2024-01-18', score: 82, status: 'Passé', color: 'text-green-600' },
    { name: 'Entraînement', date: '2024-01-16', score: 76, status: 'Passé', color: 'text-green-600' },
    { name: 'Quiz rapide', date: '2024-01-10', score: 68, status: 'Échoué', color: 'text-red-600' },
    { name: 'Par domaine', date: '2024-01-08', score: 85, status: 'Passé', color: 'text-green-600' }
  ];

  domainPerformances = [
    { name: 'Personnes', score: 78, questions: 42, color: 'bg-orange-400' },
    { name: 'Processus', score: 82, questions: 50, color: 'bg-blue-400' },
    { name: 'Environnement', score: 75, questions: 88, color: 'bg-green-400' }
  ];

  constructor(private navigationService: NavigationService) {}

  navigate(path: string) {
    this.navigationService.navigate(path);
  }
}
