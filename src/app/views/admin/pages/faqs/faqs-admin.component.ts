import { Component, OnInit } from '@angular/core';
import { AdminContentService } from '../../../../core/services/admin-content.service';

@Component({
  selector: 'app-faqs-admin',
  templateUrl: './faqs-admin.component.html',
})
export class FaqsAdminComponent implements OnInit {
  faqs: any[] = [];
  loading = true;
  showForm = false;
  editing: any = null;
  form: any = this.emptyForm();
  pages = ['contact', 'home', 'formations', 'missions', 'expertise'];

  constructor(private admin: AdminContentService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.admin.getFaqs().subscribe({
      next: (res) => { this.faqs = res.data ?? []; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  openCreate(): void { this.editing = null; this.form = this.emptyForm(); this.showForm = true; }

  openEdit(f: any): void {
    this.editing = f;
    this.form = { question: f.question, answer: f.answer, page: f.page, order: f.order, is_active: f.is_active };
    this.showForm = true;
  }

  submit(): void {
    const obs = this.editing ? this.admin.updateFaq(this.editing.id, this.form) : this.admin.createFaq(this.form);
    obs.subscribe({ next: () => { this.showForm = false; this.load(); } });
  }

  toggle(f: any): void { this.admin.toggleFaq(f.id, f.is_active ? 0 : 1).subscribe(() => this.load()); }

  delete(f: any): void {
    if (confirm('Supprimer cette FAQ ?')) { this.admin.deleteFaq(f.id).subscribe(() => this.load()); }
  }

  private emptyForm(): any {
    return { question: '', answer: '', page: 'contact', order: 0, is_active: true };
  }
}
