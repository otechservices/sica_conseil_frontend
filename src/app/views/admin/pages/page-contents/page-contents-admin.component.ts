import { Component, OnInit } from '@angular/core';
import { AdminContentService } from '../../../../core/services/admin-content.service';

@Component({
  selector: 'app-page-contents-admin',
  templateUrl: './page-contents-admin.component.html',
})
export class PageContentsAdminComponent implements OnInit {
  contents: any[] = [];
  loading = true;
  saving = false;
  activePageFilter = 'home';
  pages = ['home', 'missions', 'formations', 'expertise', 'contact'];

  constructor(private admin: AdminContentService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.admin.getPageContents().subscribe({
      next: (res) => { this.contents = res.data ?? []; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  get filteredContents(): any[] {
    return this.contents.filter(c => c.page === this.activePageFilter);
  }

  saveAll(): void {
    this.saving = true;
    const items = this.filteredContents.map(c => ({ key: c.key, value: c.value, page: c.page, type: c.type }));
    this.admin.bulkUpdatePageContents(items).subscribe({
      next: () => { this.saving = false; },
      error: () => { this.saving = false; }
    });
  }
}
