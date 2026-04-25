import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../../core/services/navigation.service';
import { SimulatorService, SimulatorSession, SimulatorStats } from '../../../../core/services/simulator.service';

@Component({
  selector: 'app-pmp-history',
  templateUrl: './pmp-history.component.html',
})
export class PmpHistoryComponent implements OnInit {
  sessions: SimulatorSession[] = [];
  stats: SimulatorStats | null = null;
  isLoading = true;
  filterMode = 'all';

  constructor(
    private navigationService: NavigationService,
    private simulatorService: SimulatorService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    this.simulatorService.getSessions().subscribe({
      next: (res) => { this.sessions = res.data ?? []; },
      error: () => {},
    });

    this.simulatorService.getStats().subscribe({
      next: (res) => { this.stats = res.data; this.isLoading = false; },
      error: () => { this.isLoading = false; },
    });
  }

  get filteredSessions(): SimulatorSession[] {
    if (this.filterMode === 'all') return this.sessions;
    return this.sessions.filter(s => s.mode === this.filterMode);
  }

  get totalTimeFormatted(): string {
    const secs = this.stats?.total_time_seconds ?? 0;
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    return h > 0 ? `${h}h${m > 0 ? m + 'min' : ''}` : `${m}min`;
  }

  getTimeDuration(secs: number): string {
    const m = Math.floor(secs / 60);
    return `${m} min`;
  }

  getStatusBadge(session: SimulatorSession): string {
    const passed = (session.score ?? 0) >= 61;
    return passed
      ? 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'
      : 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium';
  }

  getStatusLabel(session: SimulatorSession): string {
    if (session.status === 'abandoned') return 'Abandonné';
    return (session.score ?? 0) >= 61 ? 'Réussi' : 'Échoué';
  }

  getStatusColor(session: SimulatorSession): string {
    if (session.status === 'abandoned') return 'text-gray-500';
    return (session.score ?? 0) >= 61 ? 'text-green-600' : 'text-red-600';
  }

  viewResult(session: SimulatorSession): void {
    this.navigationService.navigate(`/customer/result?session=${session.id}`);
  }

  navigate(path: string): void {
    this.navigationService.navigate(path);
  }
}
