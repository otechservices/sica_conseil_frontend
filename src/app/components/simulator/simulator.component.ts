import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-simulator',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule],
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent {
  // Navigation sidebar
  sidebarItems = [
    { icon: 'home', label: 'Tableau de bord', active: false, route: '/dashboard' },
    { icon: 'folder', label: 'Générateur de projets', active: false, route: '/project-generator' },
    { icon: 'book', label: 'Formation PMP', active: false, route: '/training' },
    { icon: 'calculator', label: 'Simulateur PMP', active: true, route: '/simulator' },
    { icon: 'chart-line', label: 'Progression', active: false, route: '/history' },
    { icon: 'cog', label: 'Paramètres', active: false }
  ];

  constructor(private router: Router) {}

  onReturnToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  onAccessTraining() {
    this.router.navigate(['/training']);
  }

  onLogout() {
    this.router.navigate(['/']);
  }

  onSidebarItemClick(item: any) {
    // Désactiver tous les items
    this.sidebarItems.forEach(i => i.active = false);
    // Activer l'item cliqué
    item.active = true;
    
    if (item.route) {
      this.router.navigate([item.route]);
    }
  }
}