import { Component, OnInit } from '@angular/core';
import { AdminContentService } from '../../../../core/services/admin-content.service';

@Component({
  selector: 'app-simulator-questions-admin',
  templateUrl: './simulator-questions-admin.component.html',
})
export class SimulatorQuestionsAdminComponent implements OnInit {
  questions: any[] = [];
  stats: any = null;
  loading = true;
  isImporting = false;
  isSaving = false;

  filterDomain = '';
  filterSource = '';
  filterDifficulty = '';
  searchText = '';

  showForm = false;
  showImportModal = false;
  editing: any = null;

  form = this.emptyForm();

  importForm = {
    quiz_id: null as number | null,
    domain: 'processus',
    difficulty: 'moyen',
  };
  importResult: { imported: number; skipped: number } | null = null;
  importError = '';
  moodleEnabled = false;

  domains = [
    { value: 'personnes', label: 'Personnes' },
    { value: 'processus', label: 'Processus' },
    { value: 'environnement', label: "Environnement d'affaires" },
  ];
  difficulties = [
    { value: 'facile', label: 'Facile' },
    { value: 'moyen', label: 'Moyen' },
    { value: 'difficile', label: 'Difficile' },
  ];

  constructor(private admin: AdminContentService) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadQuestions();
  }

  loadStats(): void {
    this.admin.getSimulatorStats().subscribe({
      next: (res) => {
        this.stats = res.data;
        this.moodleEnabled = res.data?.moodle_enabled ?? false;
      },
    });
  }

  loadQuestions(): void {
    this.loading = true;
    const params: any = {};
    if (this.filterDomain) params['domain'] = this.filterDomain;
    if (this.filterDifficulty) params['difficulty'] = this.filterDifficulty;
    if (this.filterSource) params['source'] = this.filterSource;
    if (this.searchText) params['search'] = this.searchText;

    this.admin.getSimulatorQuestions(params).subscribe({
      next: (res) => { this.questions = res.data ?? []; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  openCreate(): void {
    this.editing = null;
    this.form = this.emptyForm();
    this.showForm = true;
  }

  openEdit(q: any): void {
    this.editing = q;
    this.form = {
      domain: q.domain,
      difficulty: q.difficulty,
      question: q.question,
      options: [...q.options],
      correct_answer: q.correct_answer,
      explanation: q.explanation ?? '',
      is_active: q.is_active,
    };
    this.showForm = true;
  }

  addOption(): void {
    if (this.form.options.length < 6) this.form.options.push('');
  }

  removeOption(i: number): void {
    if (this.form.options.length > 2) {
      this.form.options.splice(i, 1);
      if (this.form.correct_answer >= this.form.options.length) {
        this.form.correct_answer = 0;
      }
    }
  }

  submit(): void {
    const data = { ...this.form, options: this.form.options.filter((o: string) => o.trim()) };
    this.isSaving = true;

    const obs = this.editing
      ? this.admin.updateSimulatorQuestion(this.editing.id, data)
      : this.admin.createSimulatorQuestion(data);

    obs.subscribe({
      next: () => { this.showForm = false; this.isSaving = false; this.loadQuestions(); this.loadStats(); },
      error: () => { this.isSaving = false; },
    });
  }

  toggle(q: any): void {
    this.admin.toggleSimulatorQuestion(q.id, q.is_active ? 0 : 1).subscribe(() => this.loadQuestions());
  }

  delete(q: any): void {
    if (confirm(`Supprimer cette question ?\n"${q.question.substring(0, 80)}..."`)) {
      this.admin.deleteSimulatorQuestion(q.id).subscribe(() => { this.loadQuestions(); this.loadStats(); });
    }
  }

  openImport(): void {
    this.importForm = { quiz_id: null, domain: 'processus', difficulty: 'moyen' };
    this.importResult = null;
    this.importError = '';
    this.showImportModal = true;
  }

  runImport(): void {
    if (!this.importForm.quiz_id) return;
    this.isImporting = true;
    this.importResult = null;
    this.importError = '';

    this.admin.importFromMoodle({
      quiz_id: this.importForm.quiz_id,
      domain: this.importForm.domain,
      difficulty: this.importForm.difficulty,
    }).subscribe({
      next: (res) => {
        this.importResult = res.data;
        this.isImporting = false;
        this.loadQuestions();
        this.loadStats();
      },
      error: (err) => {
        this.importError = err?.error?.message ?? 'Erreur lors de l\'import';
        this.isImporting = false;
      },
    });
  }

  closeImport(): void {
    this.showImportModal = false;
    this.importResult = null;
    this.importError = '';
  }

  getDomainLabel(d: string): string {
    return { personnes: 'Personnes', processus: 'Processus', environnement: "Environnement" }[d] ?? d;
  }

  getDifficultyClass(d: string): string {
    return { facile: 'bg-green-100 text-green-700', moyen: 'bg-yellow-100 text-yellow-700', difficile: 'bg-red-100 text-red-700' }[d] ?? '';
  }

  private emptyForm() {
    return { domain: 'processus', difficulty: 'moyen', question: '', options: ['', '', '', ''], correct_answer: 0, explanation: '', is_active: true };
  }
}
