import { Component } from '@angular/core';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'app-customer-layout',

  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent {
  selectedMenu = 'dashboard';

  menuItems = [
    { id: 'customer/dashboard', label: 'Tableau de bord', icon: 'ri-dashboard-line' },
    { id: 'customer/project-generator', label: 'Générateur de projets', icon: 'ri-file-text-line' },
    { id: 'customer/training', label: 'Formation PMP', icon: 'ri-book-line' },
    { id: 'customer/simulator', label: 'Simulateur PMP', icon: 'ri-flask-line' },
    { id: 'customer/history', label: 'Historique', icon: 'ri-bar-chart-line' },
  ];

    constructor(private navigationService: NavigationService) {}
  
    navigate(path: string) {
      this.navigationService.navigate(path);
    }
  
    setSelectedMenu(menuId: string) {
      // this.selectedMenu = menuId;
      // if (menuId === 'projects') {
      //   this.navigate('/project-generator');
      // }
      this.navigate(menuId);

      // Add other navigation logic if needed
    }

}
