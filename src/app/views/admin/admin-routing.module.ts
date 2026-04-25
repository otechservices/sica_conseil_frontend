import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../../core/guards/admin.guard';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FormationsAdminComponent } from './pages/formations/formations-admin.component';
import { ServicesAdminComponent } from './pages/services/services-admin.component';
import { TestimonialsAdminComponent } from './pages/testimonials/testimonials-admin.component';
import { TeamMembersAdminComponent } from './pages/team-members/team-members-admin.component';
import { FaqsAdminComponent } from './pages/faqs/faqs-admin.component';
import { ContactInfosAdminComponent } from './pages/contact-infos/contact-infos-admin.component';
import { PageContentsAdminComponent } from './pages/page-contents/page-contents-admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'formations', pathMatch: 'full' },
      { path: 'formations',    component: FormationsAdminComponent },
      { path: 'services',      component: ServicesAdminComponent },
      { path: 'testimonials',  component: TestimonialsAdminComponent },
      { path: 'team-members',  component: TeamMembersAdminComponent },
      { path: 'faqs',          component: FaqsAdminComponent },
      { path: 'contact-infos', component: ContactInfosAdminComponent },
      { path: 'page-contents', component: PageContentsAdminComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
