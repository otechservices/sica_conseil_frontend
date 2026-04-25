import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { NavigationService } from '../../../../core/services/navigation.service';
import { SimulatorService, SimulatorSession, SimulatorQuestion } from '../../../../core/services/simulator.service';

@Component({
  selector: 'app-pmp-test',
  templateUrl: './pmp-test.component.html',
})
export class PmpTestComponent implements OnInit, OnDestroy {
  session: SimulatorSession | null = null;
  questions: SimulatorQuestion[] = [];
  sessionId: number | null = null;

  isLoading = true;
  isTestStarted = false;
  isSubmitting = false;
  showResults = false;
  hasError = false;

  currentQuestion = 0;
  selectedAnswers: Record<number, number> = {};
  showExplanation = false;

  timeLeft = 0;
  private timerSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private simulatorService: SimulatorService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = parseInt(params['session'], 10);
      if (id) {
        this.sessionId = id;
        this.loadSession(id);
      } else {
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
  }

  loadSession(id: number): void {
    this.simulatorService.getSession(id).subscribe({
      next: (res) => {
        this.session = res.data;
        this.questions = res.data.questions ?? [];
        this.timeLeft = res.data.time_limit;

        if (res.data.status === 'completed') {
          this.showResults = true;
          this.isTestStarted = false;
          this.restoreAnswers();
        } else if (res.data.status === 'in_progress') {
          this.isTestStarted = false;
        } else {
          this.hasError = true;
        }
        this.isLoading = false;
      },
      error: () => { this.hasError = true; this.isLoading = false; },
    });
  }

  private restoreAnswers(): void {
    this.questions.forEach(q => {
      if (q.selected_answer !== null && q.selected_answer !== undefined) {
        this.selectedAnswers[q.id] = q.selected_answer;
      }
    });
  }

  handleStartTest(): void {
    this.isTestStarted = true;
    this.currentQuestion = 0;
    this.selectedAnswers = {};
    this.showResults = false;
    this.timeLeft = this.session?.time_limit ?? 3600;
    this.startTimer();
  }

  private startTimer(): void {
    this.timerSubscription?.unsubscribe();
    this.timerSubscription = timer(0, 1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.handleSubmitTest();
      }
    });
  }

  handleAnswerSelect(questionId: number, answerIndex: number): void {
    this.selectedAnswers[questionId] = answerIndex;
  }

  handleNextQuestion(): void {
    if (this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion++;
      this.showExplanation = false;
    }
  }

  handlePreviousQuestion(): void {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
      this.showExplanation = false;
    }
  }

  handleSubmitTest(): void {
    if (this.isSubmitting || !this.sessionId) return;
    this.isSubmitting = true;
    this.timerSubscription?.unsubscribe();

    const timeUsed = (this.session?.time_limit ?? 0) - this.timeLeft;

    this.simulatorService.submitSession(this.sessionId, this.selectedAnswers, timeUsed).subscribe({
      next: (res) => {
        this.session = res.data;
        this.questions = res.data.questions ?? [];
        this.restoreAnswers();
        this.showResults = true;
        this.isTestStarted = false;
        this.isSubmitting = false;
        this.navigationService.navigate(`/customer/result?session=${this.sessionId}`);
      },
      error: () => { this.isSubmitting = false; },
    });
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  get currentQ(): SimulatorQuestion {
    return this.questions[this.currentQuestion];
  }

  get progress(): number {
    return this.questions.length > 0
      ? ((this.currentQuestion + 1) / this.questions.length) * 100
      : 0;
  }

  get answeredCount(): number {
    return Object.keys(this.selectedAnswers).length;
  }

  get correctCount(): number {
    return this.questions.filter(q => q.is_correct).length;
  }

  get score(): number {
    if (!this.session?.score) return 0;
    return Math.round(this.session.score);
  }

  get isPassed(): boolean {
    return this.score >= 61;
  }

  get timeUsedFormatted(): string {
    const used = (this.session?.time_limit ?? 0) - this.timeLeft;
    return this.formatTime(used);
  }

  navigate(path: string): void {
    this.navigationService.navigate(path);
  }
}
