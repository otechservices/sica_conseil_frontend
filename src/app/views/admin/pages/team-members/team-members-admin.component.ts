import { Component, OnInit } from '@angular/core';
import { AdminContentService } from '../../../../core/services/admin-content.service';

@Component({
  selector: 'app-team-members-admin',
  templateUrl: './team-members-admin.component.html',
})
export class TeamMembersAdminComponent implements OnInit {
  members: any[] = [];
  loading = true;
  showForm = false;
  editing: any = null;
  form: any = this.emptyForm();

  constructor(private admin: AdminContentService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.admin.getTeamMembers().subscribe({
      next: (res) => { this.members = res.data ?? []; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  openCreate(): void { this.editing = null; this.form = this.emptyForm(); this.showForm = true; }

  openEdit(m: any): void {
    this.editing = m;
    this.form = { name: m.name, title: m.title, bio: m.bio, photo: m.photo, linkedin: m.linkedin, certifications: (m.certifications ?? []).join(', '), order: m.order, is_active: m.is_active };
    this.showForm = true;
  }

  submit(): void {
    const data = { ...this.form, certifications: this.form.certifications ? this.form.certifications.split(',').map((s: string) => s.trim()).filter(Boolean) : [] };
    const obs = this.editing ? this.admin.updateTeamMember(this.editing.id, data) : this.admin.createTeamMember(data);
    obs.subscribe({ next: () => { this.showForm = false; this.load(); } });
  }

  toggle(m: any): void { this.admin.toggleTeamMember(m.id, m.is_active ? 0 : 1).subscribe(() => this.load()); }

  delete(m: any): void {
    if (confirm(`Supprimer "${m.name}" ?`)) { this.admin.deleteTeamMember(m.id).subscribe(() => this.load()); }
  }

  private emptyForm(): any {
    return { name: '', title: '', bio: '', photo: '', linkedin: '', certifications: '', order: 0, is_active: true };
  }
}
