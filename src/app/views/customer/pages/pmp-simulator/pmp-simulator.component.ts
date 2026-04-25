import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../../core/services/navigation.service';
import { SimulatorService, SimulatorStats } from '../../../../core/services/simulator.service';

@Component({
  selector: 'app-pmp-simulator',
  templateUrl: './pmp-simulator.component.html',
})
export class PmpSimulatorComponent implements OnInit {
  selectedMode: string | null = null;
  selectedDomain: string | null = null;
  isStarting = false;
  stats: SimulatorStats | null = null;
  isLoadingStats = true;

  examModes = [
    { id: 'complet', title: 'Examen complet PMP', description: '180 questions - 230 minutes (timing officiel)', questions: 180, duration: '230 min', badge: 'Réel', badgeColor: 'bg-red-500' },
    { id: 'entrainement', title: "Test d'entraînement", description: '50 questions - 90 minutes (confortable)', questions: 50, duration: '90 min', badge: 'Moyen', badgeColor: 'bg-primary-500' },
    { id: 'rapide', title: 'Quiz rapide', description: '20 questions - 35 minutes (détente)', questions: 20, duration: '35 min', badge: 'Facile', badgeColor: 'bg-yellow-500' },
    { id: 'domaine', title: 'Par domaine', description: '30 questions - 55 minutes (approfondi)', questions: 30, duration: '55 min', badge: 'Variable', badgeColor: 'bg-purple-500' },
  ];

  domains = [
    { id: 'personnes', label: 'Personnes', icon: 'ri-team-line' },
    { id: 'processus', label: 'Processus', icon: 'ri-settings-line' },
    { id: 'environnement', label: "Environnement d'affaires", icon: 'ri-building-line' },
  ];

  constructor(
    private navigationService: NavigationService,
    private simulatorService: SimulatorService,
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.simulatorService.getStats().subscribe({
      next: (res) => {
        this.stats = res.data;
        this.isLoadingStats = false;
      },
      error: () => { this.isLoadingStats = false; },
    });
  }

  selectMode(id: string): void {
    this.selectedMode = id;
    if (id !== 'domaine') {
      this.selectedDomain = null;
    }
  }

  get canStart(): boolean {
    if (!this.selectedMode) return false;
    if (this.selectedMode === 'domaine' && !this.selectedDomain) return false;
    return true;
  }

  startExam(): void {
    if (!this.canStart || this.isStarting) return;
    this.isStarting = true;

    this.simulatorService.startSession(this.selectedMode!, this.selectedDomain || undefined).subscribe({
      next: (res) => {
        const sessionId = res.data?.id;
        this.navigationService.navigate(`/customer/test?session=${sessionId}`);
      },
      error: () => { this.isStarting = false; },
    });
  }

  get totalTimeHours(): string {
    const secs = this.stats?.total_time_seconds ?? 0;
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    return h > 0 ? `${h}h${m > 0 ? m + 'min' : ''}` : `${m}min`;
  }

  navigate(path: string): void {
    this.navigationService.navigate(path);
  }
}
