import { Component, OnInit } from '@angular/core';
import { AdminContentService } from '../../../../core/services/admin-content.service';

@Component({
  selector: 'app-formations-admin',
  templateUrl: './formations-admin.component.html',
})
export class FormationsAdminComponent implements OnInit {
  formations: any[] = [];
  loading = true;
  showForm = false;
  editing: any = null;

  form: any = this.emptyForm();

  constructor(private admin: AdminContentService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.admin.getFormations().subscribe({
      next: (res) => { this.formations = res.data ?? []; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  openCreate(): void { this.editing = null; this.form = this.emptyForm(); this.showForm = true; }

  openEdit(f: any): void {
    this.editing = f;
    this.form = {
      title: f.title, category: f.category, level: f.level,
      duration: f.duration, price: f.price, original_price: f.original_price,
      rating: f.rating, students: f.students, description: f.description,
      features: (f.features ?? []).join('\n'), instructor: f.instructor,
      image_url: f.image_url, badge: f.badge, logo: f.logo,
      order: f.order, is_active: f.is_active
    };
    this.showForm = true;
  }

  submit(): void {
    const data = { ...this.form, features: this.form.features ? this.form.features.split('\n').filter((s: string) => s.trim()) : [] };
    const obs = this.editing
      ? this.admin.updateFormation(this.editing.id, data)
      : this.admin.createFormation(data);
    obs.subscribe({ next: () => { this.showForm = false; this.load(); } });
  }

  toggle(f: any): void {
    this.admin.toggleFormation(f.id, f.is_active ? 0 : 1).subscribe(() => this.load());
  }

  delete(f: any): void {
    if (confirm(`Supprimer "${f.title}" ?`)) {
      this.admin.deleteFormation(f.id).subscribe(() => this.load());
    }
  }

  private emptyForm(): any {
    return { title: '', category: '', level: '', duration: '', price: '', original_price: '', rating: 4.5, students: 0, description: '', features: '', instructor: '', image_url: '', badge: '', logo: '', order: 0, is_active: true };
  }
}
