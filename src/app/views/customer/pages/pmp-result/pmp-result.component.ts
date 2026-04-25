import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../../../core/services/navigation.service';
import { SimulatorService, SimulatorSession, SimulatorQuestion } from '../../../../core/services/simulator.service';

@Component({
  selector: 'app-pmp-result',
  templateUrl: './pmp-result.component.html',
})
export class PmpResultComponent implements OnInit {
  session: SimulatorSession | null = null;
  questions: SimulatorQuestion[] = [];
  isLoading = true;
  hasError = false;
  showReview = false;

  constructor(
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private simulatorService: SimulatorService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = parseInt(params['session'], 10);
      if (id) {
        this.loadSession(id);
      } else {
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  loadSession(id: number): void {
    this.simulatorService.getSession(id).subscribe({
      next: (res) => {
        this.session = res.data;
        this.questions = res.data.questions ?? [];
        this.isLoading = false;
      },
      error: () => { this.hasError = true; this.isLoading = false; },
    });
  }

  get score(): number {
    return Math.round(this.session?.score ?? 0);
  }

  get isPassed(): boolean {
    return this.score >= 61;
  }

  get correctCount(): number {
    return this.session?.correct_count ?? 0;
  }

  get totalQuestions(): number {
    return this.session?.total_questions ?? 0;
  }

  get timeUsedFormatted(): string {
    const secs = this.session?.time_used ?? 0;
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}min${s > 0 ? s + 's' : ''}`;
  }

  get domainPerformance(): { name: string; score: number; color: string }[] {
    const config: { key: string; name: string; color: string }[] = [
      { key: 'personnes', name: 'Personnes', color: 'text-blue-500' },
      { key: 'processus', name: 'Processus', color: 'text-green-500' },
      { key: 'environnement', name: "Environnement d'affaires", color: 'text-purple-500' },
    ];

    return config
      .map(({ key, name, color }) => {
        const qs = this.questions.filter(q => q.domain === key);
        if (qs.length === 0) return null;
        const correct = qs.filter(q => q.is_correct).length;
        return { name, color, score: Math.round((correct / qs.length) * 100) };
      })
      .filter((d): d is { name: string; score: number; color: string } => d !== null);
  }

  navigate(path: string): void {
    this.navigationService.navigate(path);
  }
}
