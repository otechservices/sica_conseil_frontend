import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './admin-layout/includes/admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-layout/includes/admin-sidebar/admin-sidebar.component';
import { FormationsAdminComponent } from './pages/formations/formations-admin.component';
import { ServicesAdminComponent } from './pages/services/services-admin.component';
import { TestimonialsAdminComponent } from './pages/testimonials/testimonials-admin.component';
import { TeamMembersAdminComponent } from './pages/team-members/team-members-admin.component';
import { FaqsAdminComponent } from './pages/faqs/faqs-admin.component';
import { ContactInfosAdminComponent } from './pages/contact-infos/contact-infos-admin.component';
import { PageContentsAdminComponent } from './pages/page-contents/page-contents-admin.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    FormationsAdminComponent,
    ServicesAdminComponent,
    TestimonialsAdminComponent,
    TeamMembersAdminComponent,
    FaqsAdminComponent,
    ContactInfosAdminComponent,
    PageContentsAdminComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AdminRoutingModule,
  ]
})
export class AdminModule {}
