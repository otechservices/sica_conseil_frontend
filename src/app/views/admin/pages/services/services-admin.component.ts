import { Component, OnInit } from '@angular/core';
import { AdminContentService } from '../../../../core/services/admin-content.service';

@Component({
  selector: 'app-services-admin',
  templateUrl: './services-admin.component.html',
})
export class ServicesAdminComponent implements OnInit {
  services: any[] = [];
  loading = true;
  showForm = false;
  editing: any = null;
  form: any = this.emptyForm();
  activeContext: string = 'service';
  contexts = [
    { value: 'service', label: 'Services (Accueil / Missions)' },
    { value: 'domain',  label: 'Domaines clés (Expertise)' },
    { value: 'secteur', label: 'Secteurs (Expertise)' },
  ];

  constructor(private admin: AdminContentService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.admin.getServices().subscribe({
      next: (res) => { this.services = res.data ?? []; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  openCreate(): void { this.editing = null; this.form = this.emptyForm(); this.showForm = true; }

  openEdit(s: any): void {
    this.editing = s;
    this.form = { title: s.title, description: s.description, icon: s.icon, color: s.color, image_url: s.image_url, features: (s.features ?? []).join('\n'), duration: s.duration, price: s.price, order: s.order, is_active: s.is_active };
    this.showForm = true;
  }

  submit(): void {
    const data = { ...this.form, features: this.form.features ? this.form.features.split('\n').filter((s: string) => s.trim()) : [] };
    const obs = this.editing ? this.admin.updateService(this.editing.id, data) : this.admin.createService(data);
    obs.subscribe({ next: () => { this.showForm = false; this.load(); } });
  }

  toggle(s: any): void { this.admin.toggleService(s.id, s.is_active ? 0 : 1).subscribe(() => this.load()); }

  delete(s: any): void {
    if (confirm(`Supprimer "${s.title}" ?`)) { this.admin.deleteService(s.id).subscribe(() => this.load()); }
  }

  get filteredServices(): any[] {
    return this.services.filter(s => s.context === this.activeContext);
  }

  private emptyForm(): any {
    return { title: '', description: '', icon: 'ri-service-line', color: 'bg-primary-500', image_url: '', features: '', duration: '', price: 'Sur devis', order: 0, is_active: true, context: this.activeContext ?? 'service' };
  }
}
