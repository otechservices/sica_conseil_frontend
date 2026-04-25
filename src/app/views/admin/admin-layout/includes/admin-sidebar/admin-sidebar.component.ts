import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
})
export class AdminSidebarComponent {
  menu = [
    { label: 'Formations',       icon: 'ri-graduation-cap-line', route: '/admin/formations' },
    { label: 'Services',         icon: 'ri-briefcase-line',       route: '/admin/services' },
    { label: 'Témoignages',      icon: 'ri-chat-quote-line',      route: '/admin/testimonials' },
    { label: 'Équipe',           icon: 'ri-team-line',            route: '/admin/team-members' },
    { label: 'FAQs',             icon: 'ri-question-line',        route: '/admin/faqs' },
    { label: 'Contact',          icon: 'ri-map-pin-line',         route: '/admin/contact-infos' },
    { label: 'Contenu des pages',icon: 'ri-file-edit-line',       route: '/admin/page-contents' },
  ];
}
