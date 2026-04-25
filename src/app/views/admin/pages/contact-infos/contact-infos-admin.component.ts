import { Component, OnInit } from '@angular/core';
import { AdminContentService } from '../../../../core/services/admin-content.service';

@Component({
  selector: 'app-contact-infos-admin',
  templateUrl: './contact-infos-admin.component.html',
})
export class ContactInfosAdminComponent implements OnInit {
  infos: any[] = [];
  loading = true;
  showForm = false;
  editing: any = null;
  form: any = this.emptyForm();
  types = ['phone', 'email', 'address', 'hours', 'whatsapp', 'linkedin'];

  constructor(private admin: AdminContentService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.admin.getContactInfos().subscribe({
      next: (res) => { this.infos = res.data ?? []; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  openCreate(): void { this.editing = null; this.form = this.emptyForm(); this.showForm = true; }

  openEdit(i: any): void {
    this.editing = i;
    this.form = { type: i.type, label: i.label, value: i.value, icon: i.icon, description: i.description, order: i.order, is_active: i.is_active };
    this.showForm = true;
  }

  submit(): void {
    const obs = this.editing ? this.admin.updateContactInfo(this.editing.id, this.form) : this.admin.createContactInfo(this.form);
    obs.subscribe({ next: () => { this.showForm = false; this.load(); } });
  }

  toggle(i: any): void { this.admin.toggleContactInfo(i.id, i.is_active ? 0 : 1).subscribe(() => this.load()); }

  delete(i: any): void {
    if (confirm(`Supprimer "${i.label}" ?`)) { this.admin.deleteContactInfo(i.id).subscribe(() => this.load()); }
  }

  private emptyForm(): any {
    return { type: 'phone', label: '', value: '', icon: 'ri-phone-line', description: '', order: 0, is_active: true };
  }
}
