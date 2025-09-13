import { Component } from '@angular/core';

@Component({
  selector: 'app-pmp-history',
  templateUrl: './pmp-history.component.html',
})
export class PmpHistoryComponent {
  filterType = 'all';

  historyData = [
    { id: 1, type: 'Complet', date: '2024-01-15', score: 82, duration: 180, status: 'Réussi' },
    { id: 2, type: 'Entraînement', date: '2024-01-14', score: 76, duration: 45, status: 'Réussi' },
    { id: 3, type: 'Quiz', date: '2024-01-10', score: 68, duration: 20, status: 'Échoué' },
    { id: 4, type: 'Domaine', date: '2024-01-08', score: 85, duration: 35, status: 'Réussi' },
    { id: 5, type: 'Entraînement', date: '2024-01-06', score: 72, duration: 50, status: 'Réussi' },
    { id: 6, type: 'Quiz', date: '2024-01-03', score: 64, duration: 18, status: 'Réussi' },
    { id: 7, type: 'Complet', date: '2024-01-01', score: 58, duration: 175, status: 'Échoué' }
  ];

  chartData = [
    { month: 1, score: 58 }, { month: 2, score: 64 }, { month: 3, score: 68 },
    { month: 4, score: 78 }, { month: 5, score: 72 }, { month: 6, score: 82 }
  ];

  domainScores = [
    { name: 'Personnes', score: 78 },
    { name: 'Processus', score: 85 },
    { name: 'Environnement', score: 72 }
  ];

  getStatusColor(status: string): string {
    return status === 'Réussi' ? 'text-green-600' : 'text-red-600';
  }

  getStatusBadge(status: string): string {
    return status === 'Réussi'
      ? 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'
      : 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium';
  }
}
