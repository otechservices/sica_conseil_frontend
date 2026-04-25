import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from '../../../../core/services/navigation.service';
import { PublicContentService } from '../../../../core/services/public-content.service';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
})
export class FormationsComponent implements OnInit, OnDestroy {

  timeLeft: string | undefined;
  timer: any;

  activeCategory = 'Tous';
  categories: string[] = ['Tous'];
  formations: any[] = [];
  loading = true;

  constructor(
    private navigationService: NavigationService,
    private seoService: SeoService,
    private publicContent: PublicContentService
  ) {}

  ngOnInit(): void {
    this.seoService.setPageMetadata(
      'Formations Certifiantes PMP, PRINCE2, Scrum, Lean Six Sigma | Sica Conseil Int',
      'Formations certifiantes reconnues mondialement : PMP, CAPM, PRINCE2, PSPO, PSM, Lean Six Sigma. E-learning et formation assistée. Taux de réussite 97%.'
    );
    this.seoService.generateWebPageSchema(
      'Formations Certifiantes PMP, PRINCE2, Scrum, Lean Six Sigma',
      'Formations certifiantes reconnues mondialement : PMP, CAPM, PRINCE2, PSPO, PSM, Lean Six Sigma. E-learning et formation assistée. Taux de réussite 97%.',
      '/formations'
    );
    this.seoService.generateBreadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Formations', url: '/formations' }
    ]);

    this.publicContent.getFormations().subscribe({
      next: (res) => {
        this.formations = res.data ?? [];
        const cats = [...new Set(this.formations.map((f: any) => f.category))];
        this.categories = ['Tous', ...cats];
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });

    this.publicContent.getPageContent('formations').subscribe({
      next: (res) => {
        const content = res.data ?? {};
        if (content['formations.countdown.active'] === 'true') {
          const hours = parseInt(content['formations.countdown.hours'] ?? '6', 10);
          const targetTime = new Date().getTime() + hours * 60 * 60 * 1000;
          this.startCountdown(targetTime);
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  get filteredFormations(): any[] {
    if (this.activeCategory === 'Tous') return this.formations;
    return this.formations.filter(f => f.category === this.activeCategory);
  }

  navigate(path: string): void {
    this.navigationService.navigate(path);
  }

  startCountdown(targetTime: number): void {
    this.timer = setInterval(() => {
      const distance = targetTime - new Date().getTime();
      if (distance <= 0) {
        clearInterval(this.timer);
        this.timeLeft = '00d 00h 00m 00s';
        return;
      }
      const days    = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.timeLeft = `${this.pad(days)}d ${this.pad(hours)}h ${this.pad(minutes)}m ${this.pad(seconds)}s`;
    }, 1000);
  }

  private pad(n: number): string {
    return n < 10 ? '0' + n : '' + n;
  }
}
