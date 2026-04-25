import { Component, OnInit } from '@angular/core';
import { AdminContentService } from '../../../../core/services/admin-content.service';

@Component({
  selector: 'app-testimonials-admin',
  templateUrl: './testimonials-admin.component.html',
})
export class TestimonialsAdminComponent implements OnInit {
  testimonials: any[] = [];
  loading = true;
  showForm = false;
  editing: any = null;
  form: any = this.emptyForm();

  constructor(private admin: AdminContentService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.admin.getTestimonials().subscribe({
      next: (res) => { this.testimonials = res.data ?? []; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  openCreate(): void { this.editing = null; this.form = this.emptyForm(); this.showForm = true; }

  openEdit(t: any): void {
    this.editing = t;
    this.form = { name: t.name, position: t.position, company: t.company, text: t.text, rating: t.rating, avatar: t.avatar, order: t.order, is_active: t.is_active };
    this.showForm = true;
  }

  submit(): void {
    const obs = this.editing ? this.admin.updateTestimonial(this.editing.id, this.form) : this.admin.createTestimonial(this.form);
    obs.subscribe({ next: () => { this.showForm = false; this.load(); } });
  }

  toggle(t: any): void { this.admin.toggleTestimonial(t.id, t.is_active ? 0 : 1).subscribe(() => this.load()); }

  delete(t: any): void {
    if (confirm(`Supprimer le témoignage de "${t.name}" ?`)) { this.admin.deleteTestimonial(t.id).subscribe(() => this.load()); }
  }

  private emptyForm(): any {
    return { name: '', position: '', company: '', text: '', rating: 5, avatar: '', order: 0, is_active: true };
  }
}
